import { useState, type FormEvent } from "react"
import { branches } from "../data/branches"
import type { Page } from "../types/navigation"

interface OnlineServicesPageProps {
  navigate: (p: Page) => void
}

type ServiceTab = "account" | "loan" | "card" | "appointment" | "inquiry" | "track"

const services: { id: ServiceTab icon: string label: string desc: string }[] = [
  {
    id: "account",
    icon: "🏦",
    label: "Open an Account",
    desc: "Start your account opening request online.",
  },
  {
    id: "loan",
    icon: "💰",
    label: "Loan Application",
    desc: "Apply for a home, personal, or business loan.",
  },
  {
    id: "card",
    icon: "💳",
    label: "Card Request",
    desc: "Request a new or replacement card.",
  },
  {
    id: "appointment",
    icon: "📅",
    label: "Book Appointment",
    desc: "Schedule a visit to any UCB branch.",
  },
  {
    id: "inquiry",
    icon: "💬",
    label: "Inquiry & Complaint",
    desc: "Submit a question or formal complaint.",
  },
  {
    id: "track",
    icon: "🔍",
    label: "Track Application",
    desc: "Check the status of your application.",
  },
]

const mockStatuses: Record<string, {
  status: string
  step: string
  updatedAt: string
  color: string
}> = {
  "UCB-2026-001234": {
    status: "In Review",
    step: "Credit Assessment",
    updatedAt: "2026-09-01",
    color: "#F59E0B",
  },
  "UCB-2026-005678": {
    status: "Approved",
    step: "Document Signing",
    updatedAt: "2026-08-30",
    color: "#10B981",
  },
  "UCB-2026-009999": {
    status: "Pending Documents",
    step: "Document Upload Required",
    updatedAt: "2026-08-28",
    color: "#EF4444",
  },
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
]

/** Displays a submitted online-service request confirmation. */
function SuccessCard({
  title,
  ref_,
  onReset,
}: {
  title: string
  ref_: string
  onReset: () => void
}) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "3rem 2rem",
        background: "#F0FDF4",
        borderRadius: 16,
        border: "1px solid #BBF7D0",
      }}
    >
      <div style={{ fontSize: 48, marginBottom: "1rem" }}>✅</div>
      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "#166534",
          marginBottom: "0.75rem",
        }}
      >
        {title}
      </h3>
      <div
        style={{
          display: "inline-block",
          background: "#fff",
          borderRadius: 8,
          padding: "0.5rem 1.25rem",
          marginBottom: "1.25rem",
          border: "1px solid #BBF7D0",
        }}
      >
        <span style={{ fontSize: 12, color: "#6B7280" }}>Reference: </span>
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#0A2540",
            fontFamily: "monospace",
          }}
        >
          {ref_}
        </span>
      </div>
      <p style={{ fontSize: 14, color: "#374151", marginBottom: "1.5rem" }}>
        Save your reference number to track your application status.
      </p>
      <button
        className="btn-outline"
        onClick={onReset}
        style={{ fontSize: 14 }}
      >
        Submit Another Request
      </button>
    </div>
  )
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem 1rem",
  border: "1.5px solid #D1D5DB",
  borderRadius: 8,
  fontSize: 14,
  outline: "none",
  fontFamily: "inherit",
}

/** Generates a short local reference number for submitted service requests. */
function genRef() {
  return "UCB-2026-" + String(Math.floor(100000 + Math.random() * 900000))
}

/** Renders online application, appointment, inquiry, and tracking workflows. */
export default function OnlineServicesPage({
  navigate,
}: OnlineServicesPageProps) {
  const [activeTab, setActiveTab] = useState<ServiceTab>("account")
  const [submitted, setSubmitted] = useState(false)
  const [refNum, setRefNum] = useState("")

  // Account form
  const [acct, setAcct] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
    idType: "",
    idNumber: "",
    accountType: "",
  })
  // Loan form
  const [loan, setLoan] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    loanType: "",
    amount: "",
    purpose: "",
    employment: "",
  })
  // Card form
  const [card, setCard] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    cardType: "",
    requestType: "",
    reason: "",
  })
  // Appointment form
  const [appt, setAppt] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    branch: "",
    date: "",
    time: "",
    purpose: "",
  })
  // Inquiry form
  const [inquiry, setInquiry] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    type: "",
    subject: "",
    message: "",
    consent: false,
  })
  // Track
  const [trackRef, setTrackRef] = useState("")
  const [trackResult, setTrackResult] =
    useState<typeof mockStatuses[string] | null | "not-found">(null)

  /** Clears the current online-service form state after submission. */
  const reset = () => {
    setSubmitted(false)
    setRefNum("")
  }

  /** Handles the current online-service form submission. */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setRefNum(genRef())
    setSubmitted(true)
    window.scrollTo({ top: 200, behavior: "smooth" })
  }

  /** Looks up a submitted service request by reference number. */
  const handleTrack = () => {
    const result = mockStatuses[trackRef.trim().toUpperCase()]
    setTrackResult(result ?? "not-found")
  }

  const successTitles: Record<ServiceTab, string> = {
    account: "Account Request Submitted!",
    loan: "Loan Application Submitted!",
    card: "Card Request Submitted!",
    appointment: "Appointment Booked!",
    inquiry: "Inquiry Submitted!",
    track: "",
  }

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
          padding: "4rem 0 3rem",
        }}
      >
        <div className="container">
          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#fff",
              marginBottom: "0.75rem",
            }}
          >
            Online Services
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>
            Complete your banking requests securely online — anytime, from
            anywhere.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "2.5rem 1.5rem" }}>
        <div
          className="sidebar-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Service nav */}
          <div style={{ position: "sticky", top: 88 }}>
            <div className="card" style={{ padding: "0.75rem" }}>
              {services.map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => {
                    setActiveTab(svc.id)
                    setSubmitted(false)
                  }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    width: "100%",
                    textAlign: "left",
                    padding: "0.875rem",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    background:
                      activeTab === svc.id ? "#E6F7F7" : "transparent",
                    marginBottom: 2,
                    transition: "all 150ms",
                  }}
                >
                  <span style={{ fontSize: 20 }}>{svc.icon}</span>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: activeTab === svc.id ? 700 : 600,
                        color: activeTab === svc.id ? "#007B7E" : "#0A2540",
                      }}
                    >
                      {svc.label}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#9CA3AF",
                        lineHeight: 1.4,
                        marginTop: 2,
                      }}
                    >
                      {svc.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form area */}
          <div>
            {/* Anti-bot notice */}
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                padding: "0.75rem 1rem",
                background: "#F4F6F8",
                borderRadius: 10,
                marginBottom: "1.5rem",
                fontSize: 13,
                color: "#6B7280",
              }}
            >
              <span style={{ fontSize: 18 }}>🔒</span>
              This form is secured with SSL encryption. Your information is
              protected.
            </div>

            {/* Account Opening */}
            {activeTab === "account" &&
              (submitted ? (
                <SuccessCard
                  title={successTitles.account}
                  ref_={refNum}
                  onReset={reset}
                />
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#0A2540",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Account Opening Request
                  </h2>
                  <div
                    className="card"
                    style={{ padding: "1.75rem", marginBottom: "1.5rem" }}
                  >
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#0A2540",
                        marginBottom: "1.25rem",
                      }}
                    >
                      Personal Details
                    </h3>
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          First Name *
                        </label>
                        <input
                          required
                          value={acct.firstName}
                          onChange={(e) =>
                            setAcct((a) => ({
                              ...a,
                              firstName: e.target.value,
                            }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Last Name *
                        </label>
                        <input
                          required
                          value={acct.lastName}
                          onChange={(e) =>
                            setAcct((a) => ({ ...a, lastName: e.target.value }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                    </div>
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          required
                          value={acct.dob}
                          onChange={(e) =>
                            setAcct((a) => ({ ...a, dob: e.target.value }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={acct.phone}
                          placeholder="+855 12 000 000"
                          onChange={(e) =>
                            setAcct((a) => ({ ...a, phone: e.target.value }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#374151",
                          marginBottom: 6,
                        }}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={acct.email}
                        onChange={(e) =>
                          setAcct((a) => ({ ...a, email: e.target.value }))
                        }
                        style={inputStyle}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#009C9F")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                      />
                    </div>
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          ID Type *
                        </label>
                        <select
                          required
                          value={acct.idType}
                          onChange={(e) =>
                            setAcct((a) => ({ ...a, idType: e.target.value }))
                          }
                          style={{
                            ...inputStyle,
                            background: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          <option value="">Select...</option>
                          {["National ID", "Passport", "Driver's Licence"].map(
                            (o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ),
                          )}
                        </select>
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          ID Number *
                        </label>
                        <input
                          required
                          value={acct.idNumber}
                          onChange={(e) =>
                            setAcct((a) => ({ ...a, idNumber: e.target.value }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="card"
                    style={{ padding: "1.75rem", marginBottom: "1.5rem" }}
                  >
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#0A2540",
                        marginBottom: "1rem",
                      }}
                    >
                      Account Type *
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                      }}
                    >
                      {[
                        "Savings Account (USD)",
                        "Savings Account (KHR)",
                        "Current Account",
                        "Fixed Deposit Account",
                        "UCB Junior Savings",
                      ].map((t) => (
                        <label
                          key={t}
                          style={{
                            display: "flex",
                            gap: 10,
                            cursor: "pointer",
                            fontSize: 14,
                            color: "#374151",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="radio"
                            name="accountType"
                            value={t}
                            checked={acct.accountType === t}
                            onChange={() =>
                              setAcct((a) => ({ ...a, accountType: t }))
                            }
                            style={{ accentColor: "#009C9F" }}
                          />
                          {t}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "1rem",
                      background: "#FDF6E3",
                      borderRadius: 10,
                      marginBottom: "1.5rem",
                      fontSize: 13,
                      color: "#92400E",
                    }}
                  >
                    ℹ️ A UCB representative will contact you within 2 business
                    days to complete identity verification. Please have your
                    original ID documents ready.
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: "1.25rem",
                      border: "1.5px solid #D1D5DB",
                      borderRadius: 8,
                      padding: "0.875rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      readOnly
                      checked
                      style={{ accentColor: "#009C9F" }}
                    />
                    <span style={{ fontSize: 13, color: "#374151" }}>
                      I confirm I am not a robot and consent to UCB processing
                      my personal data for account opening purposes.
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      padding: "0.875rem",
                      fontSize: 16,
                    }}
                  >
                    Submit Account Request
                  </button>
                </form>
              ))}

            {/* Loan Application */}
            {activeTab === "loan" &&
              (submitted ? (
                <SuccessCard
                  title={successTitles.loan}
                  ref_={refNum}
                  onReset={reset}
                />
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#0A2540",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Loan Application Request
                  </h2>
                  <div
                    className="card"
                    style={{ padding: "1.75rem", marginBottom: "1.5rem" }}
                  >
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          First Name *
                        </label>
                        <input
                          required
                          value={loan.firstName}
                          onChange={(e) =>
                            setLoan((l) => ({
                              ...l,
                              firstName: e.target.value,
                            }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Last Name *
                        </label>
                        <input
                          required
                          value={loan.lastName}
                          onChange={(e) =>
                            setLoan((l) => ({ ...l, lastName: e.target.value }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                    </div>
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={loan.phone}
                          onChange={(e) =>
                            setLoan((l) => ({ ...l, phone: e.target.value }))
                          }
                          placeholder="+855 12 000 000"
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={loan.email}
                          onChange={(e) =>
                            setLoan((l) => ({ ...l, email: e.target.value }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                    </div>
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Loan Type *
                        </label>
                        <select
                          required
                          value={loan.loanType}
                          onChange={(e) =>
                            setLoan((l) => ({ ...l, loanType: e.target.value }))
                          }
                          style={{
                            ...inputStyle,
                            background: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          <option value="">Select...</option>
                          {[
                            "Home Loan",
                            "Personal Loan",
                            "Auto Loan",
                            "SME Business Loan",
                            "Agricultural Loan",
                            "Education Loan",
                          ].map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Requested Amount (USD) *
                        </label>
                        <input
                          required
                          type="number"
                          value={loan.amount}
                          onChange={(e) =>
                            setLoan((l) => ({ ...l, amount: e.target.value }))
                          }
                          placeholder="e.g. 25000"
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#374151",
                          marginBottom: 6,
                        }}
                      >
                        Employment Status *
                      </label>
                      <select
                        required
                        value={loan.employment}
                        onChange={(e) =>
                          setLoan((l) => ({ ...l, employment: e.target.value }))
                        }
                        style={{
                          ...inputStyle,
                          background: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        <option value="">Select...</option>
                        {[
                          "Employed (Full-time)",
                          "Self-Employed / Business Owner",
                          "Government Employee",
                          "Retired",
                          "Other",
                        ].map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#374151",
                          marginBottom: 6,
                        }}
                      >
                        Loan Purpose *
                      </label>
                      <textarea
                        required
                        value={loan.purpose}
                        onChange={(e) =>
                          setLoan((l) => ({ ...l, purpose: e.target.value }))
                        }
                        rows={3}
                        placeholder="Briefly describe how you intend to use the loan..."
                        style={{ ...inputStyle, resize: "vertical" }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#009C9F")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "1rem",
                      background: "#E6F7F7",
                      borderRadius: 10,
                      marginBottom: "1.5rem",
                      fontSize: 13,
                      color: "#007B7E",
                    }}
                  >
                    ✅ Submitting this form does not commit UCB or yourself to
                    any loan agreement. A credit officer will contact you to
                    discuss your application and required documentation.
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: "1.25rem",
                      border: "1.5px solid #D1D5DB",
                      borderRadius: 8,
                      padding: "0.875rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      readOnly
                      checked
                      style={{ accentColor: "#009C9F" }}
                    />
                    <span style={{ fontSize: 13, color: "#374151" }}>
                      I consent to UCB processing my personal data for loan
                      assessment purposes.
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      padding: "0.875rem",
                      fontSize: 16,
                    }}
                  >
                    Submit Loan Request
                  </button>
                </form>
              ))}

            {/* Card Request */}
            {activeTab === "card" &&
              (submitted ? (
                <SuccessCard
                  title={successTitles.card}
                  ref_={refNum}
                  onReset={reset}
                />
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#0A2540",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Card Request
                  </h2>
                  <div
                    className="card"
                    style={{ padding: "1.75rem", marginBottom: "1.5rem" }}
                  >
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          First Name *
                        </label>
                        <input
                          required
                          value={card.firstName}
                          onChange={(e) =>
                            setCard((c) => ({
                              ...c,
                              firstName: e.target.value,
                            }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Last Name *
                        </label>
                        <input
                          required
                          value={card.lastName}
                          onChange={(e) =>
                            setCard((c) => ({ ...c, lastName: e.target.value }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                    </div>
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Card Type *
                        </label>
                        <select
                          required
                          value={card.cardType}
                          onChange={(e) =>
                            setCard((c) => ({ ...c, cardType: e.target.value }))
                          }
                          style={{
                            ...inputStyle,
                            background: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          <option value="">Select...</option>
                          {[
                            "UCB Visa Classic Debit",
                            "UCB Visa Platinum Debit",
                            "UCB Visa Classic Credit",
                            "UCB Visa Platinum Credit",
                            "UCB Visa Infinite Credit",
                          ].map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Request Type *
                        </label>
                        <select
                          required
                          value={card.requestType}
                          onChange={(e) =>
                            setCard((c) => ({
                              ...c,
                              requestType: e.target.value,
                            }))
                          }
                          style={{
                            ...inputStyle,
                            background: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          <option value="">Select...</option>
                          {[
                            "New Card",
                            "Replacement — Lost Card",
                            "Replacement — Damaged Card",
                            "Replacement — Expired Card",
                            "Additional Card",
                          ].map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={card.phone}
                          onChange={(e) =>
                            setCard((c) => ({ ...c, phone: e.target.value }))
                          }
                          placeholder="+855 12 000 000"
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={card.email}
                          onChange={(e) =>
                            setCard((c) => ({ ...c, email: e.target.value }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: "1.25rem",
                      border: "1.5px solid #D1D5DB",
                      borderRadius: 8,
                      padding: "0.875rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      readOnly
                      checked
                      style={{ accentColor: "#009C9F" }}
                    />
                    <span style={{ fontSize: 13, color: "#374151" }}>
                      I consent to UCB processing my personal data for this card
                      request.
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      padding: "0.875rem",
                      fontSize: 16,
                    }}
                  >
                    Submit Card Request
                  </button>
                </form>
              ))}

            {/* Appointment */}
            {activeTab === "appointment" &&
              (submitted ? (
                <SuccessCard
                  title={successTitles.appointment}
                  ref_={refNum}
                  onReset={reset}
                />
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#0A2540",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Book a Branch Appointment
                  </h2>
                  <div
                    className="card"
                    style={{ padding: "1.75rem", marginBottom: "1.5rem" }}
                  >
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          First Name *
                        </label>
                        <input
                          required
                          value={appt.firstName}
                          onChange={(e) =>
                            setAppt((a) => ({
                              ...a,
                              firstName: e.target.value,
                            }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Last Name *
                        </label>
                        <input
                          required
                          value={appt.lastName}
                          onChange={(e) =>
                            setAppt((a) => ({ ...a, lastName: e.target.value }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                    </div>
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={appt.phone}
                          onChange={(e) =>
                            setAppt((a) => ({ ...a, phone: e.target.value }))
                          }
                          placeholder="+855 12 000 000"
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          value={appt.email}
                          onChange={(e) =>
                            setAppt((a) => ({ ...a, email: e.target.value }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#374151",
                          marginBottom: 6,
                        }}
                      >
                        Select Branch *
                      </label>
                      <select
                        required
                        value={appt.branch}
                        onChange={(e) =>
                          setAppt((a) => ({ ...a, branch: e.target.value }))
                        }
                        style={{
                          ...inputStyle,
                          background: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        <option value="">Select a branch...</option>
                        {branches
                          .filter((b) => b.type === "branch")
                          .map((b) => (
                            <option key={b.id} value={b.name}>
                              {b.name} — {b.province}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={appt.date}
                          onChange={(e) =>
                            setAppt((a) => ({ ...a, date: e.target.value }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Preferred Time *
                        </label>
                        <select
                          required
                          value={appt.time}
                          onChange={(e) =>
                            setAppt((a) => ({ ...a, time: e.target.value }))
                          }
                          style={{
                            ...inputStyle,
                            background: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          <option value="">Select time...</option>
                          {timeSlots.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#374151",
                          marginBottom: 6,
                        }}
                      >
                        Purpose of Visit *
                      </label>
                      <select
                        required
                        value={appt.purpose}
                        onChange={(e) =>
                          setAppt((a) => ({ ...a, purpose: e.target.value }))
                        }
                        style={{
                          ...inputStyle,
                          background: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        <option value="">Select purpose...</option>
                        {[
                          "Open a New Account",
                          "Loan Consultation",
                          "Card Services",
                          "Foreign Currency Exchange",
                          "General Banking Inquiry",
                          "Business Banking",
                          "Other",
                        ].map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      padding: "0.875rem",
                      fontSize: 16,
                    }}
                  >
                    Book Appointment
                  </button>
                </form>
              ))}

            {/* Inquiry */}
            {activeTab === "inquiry" &&
              (submitted ? (
                <SuccessCard
                  title={successTitles.inquiry}
                  ref_={refNum}
                  onReset={reset}
                />
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#0A2540",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Customer Inquiry & Complaint
                  </h2>
                  <div
                    className="card"
                    style={{ padding: "1.75rem", marginBottom: "1.5rem" }}
                  >
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          First Name *
                        </label>
                        <input
                          required
                          value={inquiry.firstName}
                          onChange={(e) =>
                            setInquiry((i) => ({
                              ...i,
                              firstName: e.target.value,
                            }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Last Name *
                        </label>
                        <input
                          required
                          value={inquiry.lastName}
                          onChange={(e) =>
                            setInquiry((i) => ({
                              ...i,
                              lastName: e.target.value,
                            }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                    </div>
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={inquiry.phone}
                          onChange={(e) =>
                            setInquiry((i) => ({ ...i, phone: e.target.value }))
                          }
                          placeholder="+855 12 000 000"
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={inquiry.email}
                          onChange={(e) =>
                            setInquiry((i) => ({ ...i, email: e.target.value }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                    </div>
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Type *
                        </label>
                        <select
                          required
                          value={inquiry.type}
                          onChange={(e) =>
                            setInquiry((i) => ({ ...i, type: e.target.value }))
                          }
                          style={{
                            ...inputStyle,
                            background: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          <option value="">Select...</option>
                          {[
                            "General Inquiry",
                            "Formal Complaint",
                            "Service Feedback",
                            "Dispute / Transaction Issue",
                            "Staff Compliment",
                            "Other",
                          ].map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: 6,
                          }}
                        >
                          Subject *
                        </label>
                        <input
                          required
                          value={inquiry.subject}
                          onChange={(e) =>
                            setInquiry((i) => ({
                              ...i,
                              subject: e.target.value,
                            }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#009C9F")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#D1D5DB")
                          }
                        />
                      </div>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#374151",
                          marginBottom: 6,
                        }}
                      >
                        Message *
                      </label>
                      <textarea
                        required
                        value={inquiry.message}
                        onChange={(e) =>
                          setInquiry((i) => ({ ...i, message: e.target.value }))
                        }
                        rows={5}
                        placeholder="Please describe your inquiry or complaint in detail..."
                        style={{ ...inputStyle, resize: "vertical" }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#009C9F")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                      />
                    </div>
                    <label
                      style={{
                        display: "flex",
                        gap: 10,
                        cursor: "pointer",
                        fontSize: 13,
                        color: "#374151",
                        alignItems: "flex-start",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={inquiry.consent}
                        onChange={(e) =>
                          setInquiry((i) => ({
                            ...i,
                            consent: e.target.checked,
                          }))
                        }
                        style={{
                          marginTop: 2,
                          accentColor: "#009C9F",
                          flexShrink: 0,
                        }}
                      />
                      I consent to UCB processing my personal data to handle
                      this inquiry. For complaints, I understand UCB will
                      respond within 5 business days. *
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={!inquiry.consent}
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      padding: "0.875rem",
                      fontSize: 16,
                    }}
                  >
                    Submit Inquiry
                  </button>
                </form>
              ))}

            {/* Track Application */}
            {activeTab === "track" && (
              <div>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: "0.5rem",
                  }}
                >
                  Track Your Application
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    color: "#6B7280",
                    marginBottom: "1.5rem",
                  }}
                >
                  Enter your reference number to check the status of your
                  request.
                </p>
                <div
                  className="card"
                  style={{ padding: "1.75rem", marginBottom: "1.5rem" }}
                >
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: 6,
                    }}
                  >
                    Reference Number
                  </label>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <input
                      value={trackRef}
                      onChange={(e) => setTrackRef(e.target.value)}
                      placeholder="e.g. UCB-2026-001234"
                      style={{
                        ...inputStyle,
                        fontFamily: "monospace",
                        fontSize: 15,
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#009C9F")}
                      onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                      onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                    />
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={handleTrack}
                      style={{ flexShrink: 0 }}
                    >
                      Track →
                    </button>
                  </div>
                  <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 8 }}>
                    Try: UCB-2026-001234 / UCB-2026-005678 / UCB-2026-009999
                  </p>
                </div>

                {trackResult && trackResult !== "not-found" && (
                  <div
                    className="card"
                    style={{
                      padding: "1.75rem",
                      borderLeft: `4px solid ${trackResult.color}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: "1.25rem",
                      }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          background: trackResult.color,
                          flexShrink: 0,
                        }}
                      />
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 800,
                          color: "#0A2540",
                        }}
                      >
                        {trackResult.status}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                      }}
                    >
                      {[
                        { label: "Reference", value: trackRef.toUpperCase() },
                        { label: "Current Step", value: trackResult.step },
                        { label: "Last Updated", value: trackResult.updatedAt },
                        {
                          label: "Next Step",
                          value: "UCB will contact you within 2 business days",
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          style={{
                            padding: "0.875rem",
                            background: "#F4F6F8",
                            borderRadius: 10,
                          }}
                        >
                          <div
                            style={{
                              fontSize: 12,
                              color: "#9CA3AF",
                              marginBottom: 4,
                            }}
                          >
                            {item.label}
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "#0A2540",
                            }}
                          >
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {trackResult === "not-found" && (
                  <div
                    style={{
                      padding: "2rem",
                      textAlign: "center",
                      background: "#FFF5F5",
                      borderRadius: 16,
                      border: "1px solid #FCA5A5",
                    }}
                  >
                    <div style={{ fontSize: 36, marginBottom: "0.75rem" }}>
                      🔍
                    </div>
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#DC2626",
                        marginBottom: 8,
                      }}
                    >
                      Reference Not Found
                    </h3>
                    <p style={{ fontSize: 14, color: "#374151" }}>
                      We could not find an application with that reference
                      number. Please check and try again, or contact our support
                      team.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
