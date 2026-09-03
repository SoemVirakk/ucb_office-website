import { useState, useMemo } from "react"
import Badge from "../components/ui/Badge"
import Pagination from "../components/ui/Pagination"
import { promotions, type Promotion } from "../data/promotions"
import type { Page } from "../types/navigation"

interface PromotionsPageProps {
  navigate: (p: Page) => void
}

type Cat = "all" | "retail" | "digital" | "loan" | "card" | "deposit"
type StatusFilter = "all" | "active" | "upcoming" | "ended"
const PER_PAGE = 6

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function isExpired(p: Promotion) {
  return new Date(p.expiresAt) < new Date() || p.status === "ended"
}

const promotionDetails: Record<string, {
  benefits: string[]
  eligibility: string[]
  terms: string
  branches: string[]
  ctaLabel: string
  relatedIds: string[]
}> = {
  "zero-fee-transfer": {
    benefits: [
      "Zero domestic transfer fees",
      "Works 24/7 via Mobile App and Internet Banking",
      "Applies to any bank in Cambodia",
      "No minimum or maximum transfer amount",
    ],
    eligibility: [
      "All UCB account holders",
      "UCB Mobile App or Internet Banking registered users",
      "Valid for September 2026 only",
    ],
    terms:
      "Promotion valid September 1–30, 2026. Applies to domestic FAST transfers and UCB internal transfers only. International wire transfers and SWIFT are excluded. No limit on number of transactions. Subject to normal transaction limits.",
    branches: ["All UCB Branches", "UCB Mobile App", "UCB Internet Banking"],
    ctaLabel: "Register for Digital Banking",
    relatedIds: ["digital-onboarding", "referral-reward"],
  },
  "credit-cashback": {
    benefits: [
      "5% cashback on dining and online shopping",
      "Up to USD 50 cashback per month",
      "Auto-credited at month-end",
      "Works worldwide at Visa merchants",
    ],
    eligibility: [
      "UCB Platinum Credit Card holders",
      "Card account in good standing",
      "Minimum USD 20 spend per transaction to qualify",
    ],
    terms:
      "Cashback is calculated on net purchases at dining establishments and online merchants. Maximum cashback is USD 50 per calendar month. Cashback is automatically credited to the card account at the end of each billing cycle. Cash advances, balance transfers, and UCB internal payments are excluded.",
    branches: ["All UCB Branches", "Online", "UCB Mobile App"],
    ctaLabel: "Apply for Platinum Card",
    relatedIds: ["referral-reward", "sme-package"],
  },
  "home-loan-rate": {
    benefits: [
      "Fixed rate of 7.99% p.a. for first 3 years",
      "Free professional property valuation",
      "Finance up to 70% of property value",
      "Loan tenure up to 20 years",
      "No early repayment penalty after Year 3",
    ],
    eligibility: [
      "Cambodian nationals and foreign residents",
      "Minimum income USD 1,000/month",
      "Property located in Cambodia",
      "Application approved before October 31, 2026",
    ],
    terms:
      "Fixed rate applies for the first 36 months from loan disbursement. Thereafter, rate reverts to UCB's standard variable home loan rate. Free valuation applies to properties in Phnom Penh, Siem Reap, and Sihanoukville only. Standard credit assessment and income verification required.",
    branches: ["All UCB Branches", "UCB Online Services"],
    ctaLabel: "Apply for Home Loan",
    relatedIds: ["digital-onboarding", "sme-package"],
  },
  "deposit-bonus": {
    benefits: [
      "7.5% p.a. bonus rate (standard: up to 6.5%)",
      "Minimum deposit USD 5,000",
      "Guaranteed return for 12 months",
      "Interest paid monthly or at maturity",
    ],
    eligibility: [
      "New UCB time deposit accounts only",
      "Minimum deposit amount: USD 5,000",
      "Opened September 1–30, 2026",
      "USD currency only",
    ],
    terms:
      "Bonus rate applies to new UCB USD Fixed Deposit accounts with minimum USD 5,000 opened during September 2026 promotion period. Existing accounts are not eligible. Early withdrawal prior to maturity will forfeit the bonus rate differential and a penalty may apply. Subject to Cambodia deposit insurance regulations.",
    branches: ["All UCB Branches", "UCB Internet Banking"],
    ctaLabel: "Open Fixed Deposit",
    relatedIds: ["home-loan-rate", "zero-fee-transfer"],
  },
  "digital-onboarding": {
    benefits: [
      "100% digital — no branch visit needed",
      "Account ready in under 10 minutes",
      "Available 24/7 on iOS and Android",
      "Immediate access to UCB Mobile Banking",
      "Free UCB Visa Debit Card mailed to you",
    ],
    eligibility: [
      "Cambodian nationals with valid National ID",
      "Minimum age 18 years",
      "Valid mobile phone number in Cambodia",
    ],
    terms:
      "Digital account opening subject to eKYC verification. UCB reserves the right to request additional documents if automated verification is inconclusive. Debit card delivery typically takes 5–7 business days. Account opening bonus (where applicable) is credited within 3 business days of first transaction.",
    branches: ["UCB Mobile App", "UCB Internet Banking"],
    ctaLabel: "Download UCB App",
    relatedIds: ["referral-reward", "zero-fee-transfer"],
  },
  "sme-package": {
    benefits: [
      "Zero business current account fees for 12 months",
      "Free payroll disbursement for up to 20 employees",
      "Free 2 chequebooks per year",
      "Dedicated relationship manager",
      "Priority SME loan processing",
    ],
    eligibility: [
      "Businesses registered in 2025 or 2026",
      "Valid business registration certificate required",
      "Minimum 2 directors/shareholders",
      "UCB Business Current Account required",
    ],
    terms:
      "SME Starter Package valid for new UCB Business Current Account holders with businesses registered in 2025–2026. Monthly account fee waiver applies for 12 months from account opening. Payroll service includes up to 20 employee disbursements per month. Additional employees charged at standard rates.",
    branches: [
      "UCB Head Office — SME Centre",
      "Phnom Penh Branches",
      "Siem Reap Branches",
    ],
    ctaLabel: "Open Business Account",
    relatedIds: ["home-loan-rate", "digital-onboarding"],
  },
  "referral-reward": {
    benefits: [
      "USD 10 for you + USD 10 for your friend",
      "No limit on referrals",
      "Credited within 3 business days",
      "Friend just needs to open account and transfer USD 10",
    ],
    eligibility: [
      "Existing UCB Mobile App users",
      "Referee must be a new UCB customer",
      "First qualifying transfer of at least USD 10 must be completed",
    ],
    terms:
      "Referral reward is credited when the referred friend opens a UCB account via the referral link/code, completes eKYC, and makes their first transfer of at least USD 10. Both referrer and referee receive USD 10 cashback. Reward credited to UCB Savings Account. Maximum 50 referrals per customer.",
    branches: ["UCB Mobile App"],
    ctaLabel: "Share Your Code",
    relatedIds: ["digital-onboarding", "zero-fee-transfer"],
  },
  "festive-exchange": {
    benefits: [
      "Zero FX margin on USD/KHR (USD 500+ exchanges)",
      "Reduced margin on USD/THB and USD/CNY",
      "Available at all branches and Internet Banking",
      "Valid April 10–16, 2027",
    ],
    eligibility: [
      "All UCB account holders",
      "Applicable to walk-in customers at branches for amounts USD 500+",
      "Internet Banking: amounts USD 200+",
    ],
    terms:
      "Special FX rates apply April 10–16, 2027 (Khmer New Year period). Zero margin applies to USD/KHR for exchanges of USD 500 or equivalent and above. Reduced margin for USD/THB and USD/CNY applies to exchanges of USD 200 and above. Standard rates apply to amounts below these thresholds.",
    branches: ["All UCB Branches", "UCB Internet Banking"],
    ctaLabel: "Check Exchange Rates",
    relatedIds: ["zero-fee-transfer", "digital-onboarding"],
  },
}

const catOptions: { id: Cat label: string icon: string }[] = [
  { id: "all", label: "All Promotions", icon: "🎁" },
  { id: "digital", label: "Digital Banking", icon: "📱" },
  { id: "card", label: "Cards", icon: "💳" },
  { id: "loan", label: "Loans", icon: "🏠" },
  { id: "deposit", label: "Deposits", icon: "💰" },
  { id: "retail", label: "Retail Banking", icon: "🏦" },
]

const statusOptions: { id: StatusFilter label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "upcoming", label: "Upcoming" },
  { id: "ended", label: "Ended" },
]

export default function PromotionsPage({ navigate }: PromotionsPageProps) {
  const [cat, setCat] = useState<Cat>("all")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null)

  const featured = promotions.find((p) => p.featured && p.status === "active")

  const filtered = useMemo(
    () =>
      promotions.filter((p) => {
        const matchCat = cat === "all" || p.category === cat
        const matchStatus = statusFilter === "all" || p.status === statusFilter
        const matchSearch =
          !search ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.summary.toLowerCase().includes(search.toLowerCase())
        return matchCat && matchStatus && matchSearch
      }),
    [cat, statusFilter, search],
  )

  const paged = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  )

  if (selectedPromo) {
    const expired = isExpired(selectedPromo)
    const details = promotionDetails[selectedPromo.id]
    const related = details
      ? promotions.filter((p) => details.relatedIds.includes(p.id))
      : []
    return (
      <div style={{ background: "#F4F6F8", minHeight: "100vh" }}>
        {/* Expired banner */}
        {expired && (
          <div
            style={{
              background: "#FEE2E2",
              borderBottom: "2px solid #FCA5A5",
              padding: "0.875rem 0",
            }}
          >
            <div className="container">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 16 }}>⏰</span>
                <span
                  style={{ fontSize: 13, fontWeight: 700, color: "#991B1B" }}
                >
                  This promotion has ended. Terms no longer apply.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Promo header */}
        <div
          style={{
            background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
            padding: "3rem 0 0",
          }}
        >
          <div className="container" style={{ maxWidth: 900 }}>
            <button
              onClick={() => setSelectedPromo(null)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 500,
                marginBottom: "1.5rem",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              ← Back to Promotions
            </button>
            <div style={{ display: "flex", gap: 8, marginBottom: "0.875rem" }}>
              {selectedPromo.badge && (
                <Badge
                  label={selectedPromo.badge}
                  variant={selectedPromo.badgeColor ?? "teal"}
                />
              )}
              {expired ? (
                <Badge label="Expired" variant="gray" />
              ) : (
                <Badge
                  label={`Ends ${formatDate(selectedPromo.expiresAt)}`}
                  variant="teal"
                />
              )}
            </div>
            <h1
              style={{
                fontSize: 30,
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.3,
                marginBottom: "0.75rem",
              }}
            >
              {selectedPromo.title}
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.7,
                marginBottom: "2rem",
                maxWidth: 700,
              }}
            >
              {selectedPromo.summary}
            </p>
          </div>
        </div>

        <div
          className="container"
          style={{ maxWidth: 900, padding: "0 1.5rem 4rem" }}
        >
          {/* Hero image */}
          <div
            style={{
              marginTop: "-2rem",
              marginBottom: "2rem",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={selectedPromo.image}
                alt={selectedPromo.title}
                style={{
                  width: "100%",
                  height: 320,
                  objectFit: "cover",
                  display: "block",
                  filter: expired ? "grayscale(60%)" : "none",
                }}
              />
              {expired && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(0,0,0,0.7)",
                      color: "#fff",
                      padding: "0.75rem 2rem",
                      borderRadius: 8,
                      fontSize: 20,
                      fontWeight: 800,
                      letterSpacing: 2,
                    }}
                  >
                    PROMOTION ENDED
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 300px",
              gap: "1.5rem",
              alignItems: "start",
            }}
          >
            <div style={{ display: "grid", gap: "1.25rem" }}>
              {/* Description */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "1.5rem",
                  border: "1px solid #E5E7EB",
                }}
              >
                <h2
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "0.875rem",
                  }}
                >
                  About This Offer
                </h2>
                <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.9 }}>
                  {selectedPromo.description}
                </p>
              </div>

              {/* Benefits */}
              {details && (
                <div
                  style={{
                    background: "#E6F7F7",
                    borderRadius: 14,
                    padding: "1.5rem",
                    border: "1px solid #009C9F",
                  }}
                >
                  <h2
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#007B7E",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "0.875rem",
                    }}
                  >
                    ✨ Key Benefits
                  </h2>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "grid",
                      gap: 8,
                    }}
                  >
                    {details.benefits.map((b, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            color: "#009C9F",
                            fontWeight: 800,
                            flexShrink: 0,
                            marginTop: 2,
                          }}
                        >
                          ✓
                        </span>
                        <span
                          style={{
                            fontSize: 14,
                            color: "#0A2540",
                            fontWeight: 500,
                          }}
                        >
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Eligibility */}
              {details && (
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    padding: "1.5rem",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <h2
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "0.875rem",
                    }}
                  >
                    Eligibility Criteria
                  </h2>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "grid",
                      gap: 6,
                    }}
                  >
                    {details.eligibility.map((e, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            color: "#C9A84C",
                            fontWeight: 800,
                            flexShrink: 0,
                          }}
                        >
                          •
                        </span>
                        <span style={{ fontSize: 14, color: "#374151" }}>
                          {e}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Terms */}
              {details && (
                <div
                  style={{
                    background: "#F9FAFB",
                    borderRadius: 14,
                    padding: "1.5rem",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <h2
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "0.875rem",
                    }}
                  >
                    Terms & Conditions
                  </h2>
                  <p
                    style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.9 }}
                  >
                    {details.terms}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div
              style={{
                display: "grid",
                gap: "1rem",
                position: "sticky",
                top: "80px",
              }}
            >
              {/* Dates */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "1.25rem",
                  border: "1px solid #E5E7EB",
                }}
              >
                <h3
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "0.875rem",
                  }}
                >
                  Campaign Period
                </h3>
                <div style={{ display: "grid", gap: 8 }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>
                      Starts
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#0A2540",
                      }}
                    >
                      {formatDate("2026-01-01")}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>Ends</span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: expired ? "#DC2626" : "#0A2540",
                      }}
                    >
                      {formatDate(selectedPromo.expiresAt)}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>
                      Status
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: expired
                          ? "#DC2626"
                          : selectedPromo.status === "upcoming"
                            ? "#5B21B6"
                            : "#065F46",
                        background: expired
                          ? "#FEE2E2"
                          : selectedPromo.status === "upcoming"
                            ? "#EDE9FE"
                            : "#D1FAE5",
                        padding: "2px 8px",
                        borderRadius: 20,
                      }}
                    >
                      {expired
                        ? "Expired"
                        : selectedPromo.status === "upcoming"
                          ? "Upcoming"
                          : "Active"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Channels */}
              {details && (
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    padding: "1.25rem",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Available At
                  </h3>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    {details.branches.map((b) => (
                      <div
                        key={b}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span style={{ color: "#009C9F", fontSize: 12 }}>
                          ✓
                        </span>
                        <span style={{ fontSize: 12, color: "#374151" }}>
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              {!expired ? (
                <div style={{ display: "grid", gap: 8 }}>
                  <button
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                    onClick={() => navigate("online-services")}
                  >
                    {details?.ctaLabel ?? "Apply Now"} →
                  </button>
                  <button
                    className="btn-outline"
                    style={{ width: "100%", justifyContent: "center" }}
                    onClick={() => navigate("contact")}
                  >
                    Contact Us
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    background: "#F9FAFB",
                    borderRadius: 12,
                    padding: "1rem",
                    textAlign: "center",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 8 }}>⏰</div>
                  <p
                    style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.5 }}
                  >
                    This promotion has ended. Browse active offers below.
                  </p>
                  <button
                    className="btn-outline"
                    style={{ marginTop: "0.75rem", fontSize: 13 }}
                    onClick={() => setSelectedPromo(null)}
                  >
                    View All Promotions
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Related promotions */}
          {related.length > 0 && (
            <div style={{ marginTop: "3rem" }}>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: "1.25rem",
                }}
              >
                Related Promotions
              </h2>
              <div
                className="grid-3"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1.25rem",
                }}
              >
                {related.map((p) => {
                  const exp = isExpired(p)
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedPromo(p)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                      style={{
                        textAlign: "left",
                        background: "#fff",
                        border: "1px solid #E5E7EB",
                        borderRadius: 14,
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "all 150ms",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#009C9F"
                        e.currentTarget.style.transform = "translateY(-2px)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#E5E7EB"
                        e.currentTarget.style.transform = "none"
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{
                          width: "100%",
                          height: 130,
                          objectFit: "cover",
                          display: "block",
                          filter: exp ? "grayscale(60%)" : "none",
                        }}
                      />
                      <div style={{ padding: "0.875rem" }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: exp ? "#9CA3AF" : "#009C9F",
                            marginBottom: 4,
                          }}
                        >
                          {exp ? "Ended" : `Until ${formatDate(p.expiresAt)}`}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#0A2540",
                            lineHeight: 1.4,
                          }}
                        >
                          {p.title}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: "#F4F6F8", minHeight: "100vh" }}>
      {/* Header */}
      <section
        style={{
          background: "linear-gradient(135deg, #0A2540, #009C9F)",
          padding: "4rem 0 3rem",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: "1rem",
            }}
          >
            <span style={{ fontSize: 36 }}>🎁</span>
            <div>
              <h1
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                Promotions & Offers
              </h1>
              <p
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.75)",
                  marginTop: 6,
                }}
              >
                Exclusive deals for UCB customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <div className="container" style={{ padding: "2rem 1.5rem 0" }}>
          <button
            onClick={() => setSelectedPromo(featured)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              borderRadius: 20,
              overflow: "hidden",
              position: "relative",
              height: 300,
              cursor: "pointer",
              border: "none",
              padding: 0,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            <img
              src={featured.image}
              alt={featured.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(10,37,64,0.88) 0%, rgba(10,37,64,0.25) 100%)",
                display: "flex",
                alignItems: "center",
                padding: "2.5rem",
              }}
            >
              <div>
                <div
                  style={{ display: "flex", gap: 8, marginBottom: "0.75rem" }}
                >
                  {featured.badge && (
                    <Badge
                      label={featured.badge}
                      variant={featured.badgeColor ?? "teal"}
                    />
                  )}
                  <Badge label="Featured" variant="gold" />
                </div>
                <h2
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#fff",
                    lineHeight: 1.2,
                    maxWidth: 480,
                    marginBottom: "0.75rem",
                  }}
                >
                  {featured.title}
                </h2>
                <p
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.8)",
                    maxWidth: 420,
                    marginBottom: "1.25rem",
                  }}
                >
                  {featured.summary}
                </p>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span className="btn-primary">View Offer →</span>
                  <span
                    style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}
                  >
                    Ends {formatDate(featured.expiresAt)}
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="container" style={{ padding: "2rem 1.5rem 1rem" }}>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "0.75rem",
          }}
        >
          {catOptions.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setCat(c.id)
                setCurrentPage(1)
              }}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: 20,
                border: `2px solid ${cat === c.id ? "#009C9F" : "#E5E7EB"}`,
                background: cat === c.id ? "#009C9F" : "#fff",
                color: cat === c.id ? "#fff" : "#374151",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 150ms",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {statusOptions.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setStatusFilter(s.id)
                  setCurrentPage(1)
                }}
                style={{
                  padding: "0.3rem 0.875rem",
                  borderRadius: 20,
                  border: `1.5px solid ${
                    statusFilter === s.id ? "#0A2540" : "#E5E7EB"
                  }`,
                  background: statusFilter === s.id ? "#0A2540" : "#fff",
                  color: statusFilter === s.id ? "#fff" : "#374151",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          <input
            type="search"
            placeholder="Search promotions..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: 20,
              border: "2px solid #E5E7EB",
              fontSize: 13,
              outline: "none",
              minWidth: 200,
              fontFamily: "inherit",
            }}
            aria-label="Search promotions"
          />
          <span style={{ fontSize: 13, color: "#9CA3AF", marginLeft: 4 }}>
            {filtered.length} offer{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Card grid */}
      <div className="container" style={{ padding: "0 1.5rem 3rem" }}>
        {paged.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem",
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #E5E7EB",
            }}
          >
            <div style={{ fontSize: 44, marginBottom: "1rem" }}>🎁</div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#0A2540",
                marginBottom: 8,
              }}
            >
              No promotions found
            </h3>
            <p style={{ fontSize: 14, color: "#6B7280" }}>
              Try a different category or search term.
            </p>
          </div>
        ) : (
          <div
            className="grid-3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.25rem",
              marginBottom: "2.5rem",
            }}
          >
            {paged.map((p) => {
              const exp = isExpired(p)
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPromo(p)}
                  style={{
                    textAlign: "left",
                    background: "#fff",
                    border: `1px solid ${exp ? "#E5E7EB" : "#E5E7EB"}`,
                    borderRadius: 16,
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 150ms",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#009C9F"
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.10)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#E5E7EB"
                    e.currentTarget.style.transform = "none"
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.04)"
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <img
                      src={p.image}
                      alt={p.title}
                      style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        display: "block",
                        filter: exp ? "grayscale(60%) opacity(0.7)" : "none",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        display: "flex",
                        gap: 4,
                      }}
                    >
                      {p.badge && (
                        <Badge
                          label={p.badge}
                          variant={p.badgeColor ?? "teal"}
                        />
                      )}
                      {exp && <Badge label="Ended" variant="gray" />}
                      {p.status === "upcoming" && (
                        <Badge label="Upcoming" variant="blue" />
                      )}
                    </div>
                    {exp && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(0,0,0,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            background: "rgba(0,0,0,0.65)",
                            color: "#fff",
                            fontSize: 11,
                            fontWeight: 800,
                            padding: "4px 12px",
                            borderRadius: 6,
                            letterSpacing: 1,
                          }}
                        >
                          EXPIRED
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "1rem 1.125rem 1.25rem" }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: exp
                          ? "#DC2626"
                          : p.status === "upcoming"
                            ? "#5B21B6"
                            : "#059669",
                        fontWeight: 700,
                        marginBottom: 6,
                      }}
                    >
                      {exp
                        ? `Ended ${formatDate(p.expiresAt)}`
                        : p.status === "upcoming"
                          ? "Upcoming"
                          : `Until ${formatDate(p.expiresAt)}`}
                    </div>
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: exp ? "#9CA3AF" : "#0A2540",
                        lineHeight: 1.5,
                        marginBottom: 8,
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 12,
                        color: "#6B7280",
                        lineHeight: 1.6,
                      }}
                    >
                      {p.summary}
                    </p>
                    <div
                      style={{
                        marginTop: "0.875rem",
                        fontSize: 12,
                        color: exp ? "#9CA3AF" : "#009C9F",
                        fontWeight: 600,
                      }}
                    >
                      {exp ? "View Details" : "View Offer"} →
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
        <Pagination
          total={filtered.length}
          perPage={PER_PAGE}
          current={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
