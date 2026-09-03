import { useState } from "react"
import Alert from "../components/ui/Alert"
import type { Page } from "../types/navigation"


interface LoginPageProps {
  navigate: (p: Page) => void
}

type BankingType = "personal" | "business" | null

export default function LoginPage({ navigate }: LoginPageProps) {
  const [selected, setSelected] = useState<BankingType>(null)

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F4F6F8",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          background: "#0A2540",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => navigate("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Return to UCB Home"
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "linear-gradient(135deg, #009C9F, #007B7E)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            UCB
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>
              Union Commercial Bank
            </div>
            <div style={{ fontSize: 10, color: "#009C9F", letterSpacing: 0.5 }}>
              SECURE LOGIN
            </div>
          </div>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>🔒</span>
          <span style={{ fontSize: 12, color: "#94A3B8" }}>
            256-bit SSL Encrypted Connection
          </span>
        </div>
      </div>

      {/* Main */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1.5rem",
        }}
      >
        <div style={{ width: "100%", maxWidth: 580 }}>
          {/* Phishing warning */}
          <div style={{ marginBottom: "1.5rem" }}>
            <Alert
              type="warning"
              title="Protect yourself from phishing"
              message="UCB will never ask for your password, PIN, or OTP by phone, email, or SMS. Always check that the URL is www.ucb.com.kh before logging in. If in doubt, do not proceed — call +855 23 999 001."
            />
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
                padding: "2.5rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: "0.75rem" }}>🔐</div>
              <h1
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: 8,
                }}
              >
                Internet Banking
              </h1>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                Select your banking profile to continue
              </p>
            </div>

            <div style={{ padding: "2.5rem" }}>
              {/* Banking type choice */}
              <div style={{ marginBottom: "2rem" }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#6B7280",
                    marginBottom: "1rem",
                    textAlign: "center",
                    letterSpacing: 0.3,
                  }}
                >
                  I AM LOGGING IN AS
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  {[
                    {
                      id: "personal" as const,
                      icon: "👤",
                      title: "Personal Banking",
                      sub: "Individual account holders",
                    },
                    {
                      id: "business" as const,
                      icon: "🏢",
                      title: "Business Banking",
                      sub: "Corporate and SME customers",
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelected(opt.id)}
                      aria-pressed={selected === opt.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 10,
                        padding: "1.5rem 1rem",
                        border: `2px solid ${
                          selected === opt.id ? "#009C9F" : "#E5E7EB"
                        }`,
                        borderRadius: 14,
                        background: selected === opt.id ? "#E6F7F7" : "#FAFAFA",
                        cursor: "pointer",
                        transition: "all 150ms",
                      }}
                    >
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 14,
                          background:
                            selected === opt.id ? "#009C9F" : "#F4F6F8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 26,
                          transition: "all 150ms",
                        }}
                      >
                        {opt.icon}
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 15,
                            color: selected === opt.id ? "#007B7E" : "#0A2540",
                            marginBottom: 4,
                          }}
                        >
                          {opt.title}
                        </div>
                        <div style={{ fontSize: 12, color: "#6B7280" }}>
                          {opt.sub}
                        </div>
                      </div>
                      {selected === opt.id && (
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background: "#009C9F",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          ✓
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Proceed button */}
              <button
                className="btn-primary"
                disabled={!selected}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "0.875rem",
                  marginBottom: "1.5rem",
                  fontSize: 16,
                }}
                onClick={() =>
                  selected &&
                  alert(
                    `Redirecting to UCB ${
                      selected === "personal" ? "Personal" : "Business"
                    } Internet Banking portal...`,
                  )
                }
              >
                {selected
                  ? `Proceed to ${
                      selected === "personal" ? "Personal" : "Business"
                    } Banking →`
                  : "Select a Banking Profile to Continue"}
              </button>

              {/* Security reminder */}
              <div
                style={{
                  padding: "1rem",
                  background: "#F4F6F8",
                  borderRadius: 10,
                }}
              >
                <div
                  style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.7 }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      color: "#0A2540",
                      marginBottom: 6,
                    }}
                  >
                    🛡️ Security Reminder
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <li>
                      Never share your username, password, or OTP with anyone.
                    </li>
                    <li>
                      UCB will never call you to request your login credentials.
                    </li>
                    <li>
                      Always log out when finished, especially on shared
                      devices.
                    </li>
                    <li>
                      Contact us immediately if you suspect unauthorized access.
                    </li>
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                <span style={{ fontSize: 13, color: "#6B7280" }}>
                  Don't have an account?{" "}
                </span>
                <button
                  onClick={() => navigate("products")}
                  style={{
                    fontSize: 13,
                    color: "#009C9F",
                    fontWeight: 600,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Open an Account →
                </button>
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <button
              onClick={() => navigate("contact")}
              style={{
                fontSize: 13,
                color: "#6B7280",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Help & Support
            </button>
            <span style={{ color: "#D1D5DB", margin: "0 0.75rem" }}>|</span>
            <button
              onClick={() => navigate("home")}
              style={{
                fontSize: 13,
                color: "#6B7280",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Return to Homepage
            </button>
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: "1rem",
              fontSize: 11,
              color: "#9CA3AF",
            }}
          >
            © 2026 Union Commercial Bank (Cambodia) Plc. Licensed by the
            National Bank of Cambodia.
          </div>
        </div>
      </div>
    </div>
  )
}
