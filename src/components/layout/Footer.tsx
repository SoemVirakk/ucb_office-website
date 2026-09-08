import { useState, type FormEvent } from "react"
import type { Page } from "../../types/navigation"

interface FooterProps {
  navigate: (p: Page) => void
}

const cols = [
  {
    title: "Personal Banking",
    links: [
      { label: "Savings Account", page: "products" as Page },
      { label: "Current Account", page: "products" as Page },
      { label: "Fixed Deposit", page: "products" as Page },
      { label: "Personal Loan", page: "products" as Page },
      { label: "Credit & Debit Cards", page: "products" as Page },
      { label: "Rates & Calculators", page: "rates" as Page },
    ],
  },
  {
    title: "Business Banking",
    links: [
      { label: "Business Account", page: "products" as Page },
      { label: "SME Loans", page: "products" as Page },
      { label: "Corporate Loans", page: "products" as Page },
      { label: "Trade Finance", page: "products" as Page },
      { label: "Payroll Services", page: "products" as Page },
      { label: "Online Services", page: "online-services" as Page },
    ],
  },
  {
    title: "Digital Banking",
    links: [
      { label: "UCB Mobile App", page: "digital-banking" as Page },
      { label: "Internet Banking", page: "login" as Page },
      { label: "International Remittance", page: "products" as Page },
      { label: "QR Payments", page: "digital-banking" as Page },
      { label: "Security Center", page: "security" as Page },
      { label: "Branches & ATMs", page: "branches" as Page },
    ],
  },
  {
    title: "About UCB",
    links: [
      { label: "About Us", page: "about" as Page },
      { label: "Leadership", page: "about" as Page },
      { label: "Careers", page: "careers" as Page },
      { label: "Promotions", page: "promotions" as Page },
      { label: "News & Updates", page: "news" as Page },
      { label: "Announcements", page: "announcements" as Page },
      { label: "Help & Support", page: "contact" as Page },
      { label: "⚙️ CMS Admin", page: "cms" as Page },
      // { label: "🎨 Design System", page: "design-system" as Page },
    ],
  },
]

/** Renders the public footer navigation, newsletter form, and contact links. */
export default function Footer({ navigate }: FooterProps) {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  /** Validates the newsletter email and shows the subscribed state. */
  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault()
    if (email.includes("@")) setSubscribed(true)
  }

  return (
    <footer style={{ background: "#0A2540", color: "#fff" }}>
      {/* Newsletter bar */}
      <div style={{ background: "#1A3D5C", borderBottom: "1px solid #0A2540" }}>
        <div className="container" style={{ padding: "1.75rem 1.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 4,
                }}
              >
                Stay Updated
              </div>
              <p style={{ fontSize: 13, color: "#94A3B8" }}>
                Get UCB promotions, rate updates, and financial tips — straight
                to your inbox.
              </p>
            </div>
            {subscribed ? (
              <div style={{ fontSize: 14, color: "#009C9F", fontWeight: 600 }}>
                ✅ You are subscribed! Thank you.
              </div>
            ) : (
              <form
                className="footer-subscribe-form"
                onSubmit={handleSubscribe}
                style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  style={{
                    padding: "0.625rem 1rem",
                    borderRadius: 8,
                    border: "none",
                    fontSize: 14,
                    minWidth: 240,
                    fontFamily: "inherit",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    fontSize: 13,
                    padding: "0.625rem 1.25rem",
                    flexShrink: 0,
                  }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{ paddingTop: "4rem", paddingBottom: "3rem" }}
      >
        {/* Top row */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #009C9F, #007B7E)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 14,
                }}
              >
                UCB
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>
                  Union Commercial Bank
                </div>
                <div
                  style={{ fontSize: 11, color: "#009C9F", letterSpacing: 0.5 }}
                >
                  CAMBODIA
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "#94A3B8",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
              Licensed by the National Bank of Cambodia (NBC). Serving Cambodia
              since 2008 with trusted, modern banking services for individuals,
              families, and businesses.
            </p>
            {/* Social */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "1.25rem",
              }}
            >
              {[
                { label: "Facebook", icon: "f" },
                { label: "Telegram", icon: "✈" },
                { label: "YouTube", icon: "▶" },
                { label: "LinkedIn", icon: "in" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "#1A3D5C",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94A3B8",
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: "none",
                    transition: "background 150ms, color 150ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#009C9F"
                    e.currentTarget.style.color = "#fff"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#1A3D5C"
                    e.currentTarget.style.color = "#94A3B8"
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            {/* App download */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#1A3D5C",
                  borderRadius: 8,
                  padding: "8px 14px",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-.99-.46-2.08-.48-3.12 0-1.3.6-1.99.43-2.87-.35C3.79 15.25 4.51 7.59 9.05 7.31c1.1.06 1.87.61 2.53.66.99-.2 1.94-.77 3-.7 1.27.1 2.23.61 2.86 1.51-2.64 1.58-2.02 5.05.41 6.02-.49 1.29-1.13 2.58-2.05 3.49l1.25 1.99ZM12.03 7.25C11.88 4.87 13.8 2.92 16.05 2.8c.31 2.73-2.48 4.77-4.02 4.45Z" />
                </svg>
                <div>
                  <div
                    style={{
                      fontSize: 9,
                      color: "#94A3B8",
                      letterSpacing: 0.5,
                    }}
                  >
                    Download on the
                  </div>
                  <div>App Store</div>
                </div>
              </a>
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#1A3D5C",
                  borderRadius: 8,
                  padding: "8px 14px",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path
                    fill="#fff"
                    d="M3.18 1.04A1.99 1.99 0 0 0 2 2.95v18.1c0 .78.45 1.49 1.18 1.91L13.3 12 3.18 1.04Z"
                  />
                  <path
                    fill="#d7f9df"
                    d="m14.05 12.8 2.75 2.98-9.92 5.7a2.1 2.1 0 0 1-1.8.13l8.97-8.81Z"
                  />
                  <path
                    fill="#e8f7ff"
                    d="m14.05 11.2 2.75-2.98-9.92-5.7a2.1 2.1 0 0 0-1.8-.13l8.97 8.81Z"
                  />
                  <path
                    fill="#b8f0c8"
                    d="m17.72 15.78 2.48-1.42c.98-.56.98-1.98 0-2.54l-2.48-1.42L14.7 12l3.02 3.78Z"
                  />
                </svg>
                <div>
                  <div
                    style={{
                      fontSize: 9,
                      color: "#94A3B8",
                      letterSpacing: 0.5,
                    }}
                  >
                    Get it on
                  </div>
                  <div>Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "1rem",
                  letterSpacing: 0.3,
                }}
              >
                {col.title}
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.page)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#94A3B8",
                        fontSize: 13,
                        padding: 0,
                        textAlign: "left",
                        transition: "color 150ms",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#fff")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#94A3B8")
                      }
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div
          style={{
            borderTop: "1px solid #1A3D5C",
            paddingTop: "2rem",
            marginBottom: "2rem",
            display: "flex",
            gap: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { icon: "📞", label: "Call Center", value: "+855 23 999 001" },
            {
              icon: "🚨",
              label: "Fraud Hotline (24/7)",
              value: "+855 23 999 911",
            },
            { icon: "✉️", label: "Email", value: "info@ucb.com.kh" },
            {
              icon: "📍",
              label: "Head Office",
              value: "No. 70, Norodom Blvd, Phnom Penh",
            },
          ].map((c) => (
            <div
              key={c.label}
              style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
            >
              <span style={{ fontSize: 18, marginTop: 1 }}>{c.icon}</span>
              <div>
                <div
                  style={{ fontSize: 11, color: "#64748B", marginBottom: 2 }}
                >
                  {c.label}
                </div>
                <div
                  style={{ fontSize: 13, color: "#E2E8F0", fontWeight: 500 }}
                >
                  {c.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #1A3D5C",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: 12, color: "#64748B" }}>
            © 2026 Union Commercial Bank (Cambodia) Plc. All rights reserved.
            Regulated by the National Bank of Cambodia.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              "Privacy Policy",
              "Terms of Use",
              "Regulatory Disclosures",
              "Sitemap",
            ].map((label) => (
              <a
                key={label}
                href="#"
                style={{
                  fontSize: 12,
                  color: "#64748B",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#94A3B8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
