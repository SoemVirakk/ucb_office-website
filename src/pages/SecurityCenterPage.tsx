import { useState, type FormEvent } from "react"

import type { Page } from "../types/navigation"

interface SecurityCenterPageProps {
  navigate: (p: Page) => void
}

const tips = [
  {
    icon: "🔐",
    title: "Protect Your Password",
    body: "Use a unique, complex password (12+ characters) for your UCB Internet Banking. Never reuse it on other websites. Change it every 3–6 months.",
  },
  {
    icon: "📱",
    title: "Enable Two-Factor Authentication",
    body: "Turn on OTP verification for all transactions. UCB sends a one-time password to your registered phone number for transactions above USD 100.",
  },
  {
    icon: "🚫",
    title: "Never Share Your Credentials",
    body: "UCB staff will NEVER ask for your username, password, PIN, or OTP — by phone, email, SMS, or in person. Anyone who does is a scammer.",
  },
  {
    icon: "🔗",
    title: "Check the URL",
    body: "Always verify you are on ucb.com.kh before logging in. Look for the padlock icon (HTTPS) in your browser. Bookmark the official URL.",
  },
  {
    icon: "📧",
    title: "Beware of Phishing Emails",
    body: "Scammers send emails pretending to be UCB. Check the sender's address carefully. UCB emails only come from @ucb.com.kh. Do not click suspicious links.",
  },
  {
    icon: "📶",
    title: "Use Secure Networks",
    body: "Avoid logging into Internet Banking on public Wi-Fi (cafes, hotels, airports). Use your mobile data or a trusted home/office network.",
  },
  {
    icon: "🖥️",
    title: "Keep Devices Updated",
    body: "Ensure your phone and computer have the latest operating system and security updates. Run antivirus software and keep it up to date.",
  },
  {
    icon: "🔔",
    title: "Enable Transaction Alerts",
    body: "Set up instant SMS and push notifications for every transaction on your account in UCB Mobile App. Review unusual activity immediately.",
  },
  {
    icon: "🔓",
    title: "Always Log Out",
    body: "Log out from Internet Banking after every session. Never save your banking password in a browser on a shared or public computer.",
  },
]

const fraudTypes = [
  {
    icon: "📞",
    title: "Phone Scams (Vishing)",
    severity: "High",
    desc: "Scammers call posing as UCB staff, police, or government officials and pressure you to transfer money or share your OTP. Hang up immediately and call us to verify.",
  },
  {
    icon: "💬",
    title: "SMS Phishing (Smishing)",
    severity: "High",
    desc: "Fake SMS messages with links to fraudulent websites that look like UCB. Never click links in unsolicited SMS. Always go directly to ucb.com.kh.",
  },
  {
    icon: "📧",
    title: "Email Phishing",
    severity: "Medium",
    desc: 'Fraudulent emails that mimic UCB branding, asking you to "verify" your account or update details. Report any suspicious emails to security@ucb.com.kh.',
  },
  {
    icon: "🤝",
    title: "Impersonation Fraud",
    severity: "High",
    desc: "Fraudsters pose as UCB employees on Facebook, Telegram, or WhatsApp and offer loans, promotions, or account upgrades. UCB does not initiate unsolicited offers through social media.",
  },
  {
    icon: "💸",
    title: "Money Mule Recruitment",
    severity: "Medium",
    desc: "Criminals recruit victims to receive and forward illicit funds through their account. This is illegal in Cambodia — report any suspicious job offers promising easy money.",
  },
  {
    icon: "🏧",
    title: "ATM Skimming",
    severity: "Medium",
    desc: "Devices attached to ATMs to steal card data. Always cover the keypad when entering your PIN. Report any unusual ATM device immediately to +855 23 999 911.",
  },
]

const checklist = [
  {
    id: "c1",
    text: "I use a unique, complex password for UCB Internet Banking.",
  },
  { id: "c2", text: "I have enabled biometric login on UCB Mobile App." },
  { id: "c3", text: "I have set up transaction SMS / push notifications." },
  { id: "c4", text: "I never share my password, PIN, or OTP with anyone." },
  { id: "c5", text: "I always log out after each Internet Banking session." },
  { id: "c6", text: "I verify the URL is ucb.com.kh before logging in." },
  {
    id: "c7",
    text: "I have a secure, updated phone with screen lock enabled.",
  },
  { id: "c8", text: "I know the UCB fraud hotline: +855 23 999 911." },
]

const alerts = [
  {
    type: "info",
    date: "2026-09-01",
    title: "Scheduled Maintenance Notice",
    body: "UCB Mobile App and Internet Banking will be unavailable on Sunday 6 September 2026, from 2:00 AM – 5:00 AM for system upgrades. We apologise for the inconvenience.",
  },
  {
    type: "warning",
    date: "2026-08-25",
    title: "New Phishing Campaign Detected",
    body: "We have received reports of fake UCB SMS messages directing customers to a fraudulent website. UCB.com.kh is the only official website. Do not enter your details on any other site claiming to be UCB.",
  },
]

const severityColor: Record<string, string> = {
  High: "#DC2626",
  Medium: "#F59E0B",
  Low: "#10B981",
}

export default function SecurityCenterPage({
  navigate,
}: SecurityCenterPageProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [reportForm, setReportForm] = useState({
    name: "",
    phone: "",
    email: "",
    incidentType: "",
    description: "",
    dateOccurred: "",
  })
  const [reportSubmitted, setReportSubmitted] = useState(false)

  const toggle = (id: string) => setChecked((c) => ({ ...c, [id]: !c[id] }))
  const checkedCount = Object.values(checked).filter(Boolean).length

  const handleReport = (e: FormEvent) => {
    e.preventDefault()
    setReportSubmitted(true)
  }

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
          padding: "4rem 0 3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,156,159,0.07) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#fff",
              marginBottom: "0.75rem",
            }}
          >
            Security Center
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 560,
            }}
          >
            Protecting your money and personal data is our top priority. Learn
            how to bank safely and report suspicious activity.
          </p>
        </div>
      </section>

      {/* Security Alerts */}
      <div className="container" style={{ padding: "2rem 1.5rem 0" }}>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#0A2540",
            marginBottom: "1rem",
          }}
        >
          🔔 Security Alerts
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.875rem",
            marginBottom: "0.5rem",
          }}
        >
          {alerts.map((a, i) => (
            <div
              key={i}
              style={{
                padding: "1.25rem",
                background: a.type === "warning" ? "#FFFBEB" : "#EFF6FF",
                border: `1.5px solid ${
                  a.type === "warning" ? "#FDE68A" : "#BFDBFE"
                }`,
                borderRadius: 12,
              }}
            >
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{ fontSize: 22 }}>
                  {a.type === "warning" ? "⚠️" : "ℹ️"}
                </span>
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: "#0A2540",
                      }}
                    >
                      {a.title}
                    </span>
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>
                      {a.date}
                    </span>
                  </div>
                  <p
                    style={{ fontSize: 14, color: "#374151", lineHeight: 1.6 }}
                  >
                    {a.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Card Section */}
      <div className="container" style={{ padding: "1.5rem 1.5rem 0" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #DC2626, #B91C1C)",
            borderRadius: 16,
            padding: "2rem",
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontSize: 52, flexShrink: 0 }}>🚨</div>
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#fff",
                marginBottom: "0.5rem",
              }}
            >
              Lost or Stolen Card?
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.85)",
                marginBottom: "1rem",
              }}
            >
              Call our 24-hour fraud hotline immediately. We will block your
              card within minutes. You can also freeze your card instantly in
              UCB Mobile App.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href="tel:+85523999911"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#fff",
                  color: "#DC2626",
                  borderRadius: 8,
                  padding: "0.75rem 1.5rem",
                  fontWeight: 800,
                  fontSize: 18,
                  textDecoration: "none",
                }}
              >
                📞 +855 23 999 911
              </a>
              <button
                className="btn-outline"
                style={{ color: "#fff", borderColor: "#fff", fontSize: 14 }}
                onClick={() => navigate("digital-banking")}
              >
                Freeze Card in App
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "2.5rem 1.5rem" }}>
        <div
          className="grid-2-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* Left column */}
          <div>
            {/* Security Tips */}
            <section style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: "0.75rem",
                }}
              >
                Security Tips
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                  marginBottom: "1.5rem",
                }}
              >
                Follow these best practices to keep your account secure.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem",
                }}
              >
                {tips.map((tip, i) => (
                  <div
                    key={i}
                    className="card"
                    style={{ padding: "1.25rem", display: "flex", gap: 14 }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: "#E6F7F7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        flexShrink: 0,
                      }}
                    >
                      {tip.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: "#0A2540",
                          marginBottom: 4,
                        }}
                      >
                        {tip.title}
                      </div>
                      <p
                        style={{
                          fontSize: 13,
                          color: "#6B7280",
                          lineHeight: 1.6,
                        }}
                      >
                        {tip.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Safety Checklist */}
            <section>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: "0.75rem",
                }}
              >
                Online Banking Safety Checklist
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                  marginBottom: "1.5rem",
                }}
              >
                Tick each item to verify your account security posture.
              </p>
              <div className="card" style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: 8,
                      background: "#E5E7EB",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${(checkedCount / checklist.length) * 100}%`,
                        background: "#009C9F",
                        borderRadius: 4,
                        transition: "width 300ms",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#009C9F",
                      flexShrink: 0,
                    }}
                  >
                    {checkedCount}/{checklist.length}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {checklist.map((item) => (
                    <label
                      key={item.id}
                      style={{
                        display: "flex",
                        gap: 12,
                        cursor: "pointer",
                        alignItems: "flex-start",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={!!checked[item.id]}
                        onChange={() => toggle(item.id)}
                        style={{
                          marginTop: 2,
                          accentColor: "#009C9F",
                          flexShrink: 0,
                          width: 16,
                          height: 16,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 14,
                          color: checked[item.id] ? "#009C9F" : "#374151",
                          textDecoration: checked[item.id]
                            ? "line-through"
                            : "none",
                          lineHeight: 1.5,
                          transition: "color 150ms",
                        }}
                      >
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
                {checkedCount === checklist.length && (
                  <div
                    style={{
                      marginTop: "1.25rem",
                      padding: "0.875rem",
                      background: "#E6F7F7",
                      borderRadius: 10,
                      fontSize: 14,
                      color: "#007B7E",
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    ✅ Great job! Your banking security is up to date.
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right column */}
          <div>
            {/* Fraud Types */}
            <section style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: "0.75rem",
                }}
              >
                Common Fraud Types
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                  marginBottom: "1.5rem",
                }}
              >
                Know what to watch out for.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem",
                }}
              >
                {fraudTypes.map((f, i) => (
                  <div key={i} className="card" style={{ padding: "1.25rem" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                      }}
                    >
                      <span style={{ fontSize: 22, flexShrink: 0 }}>
                        {f.icon}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 6,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: "#0A2540",
                            }}
                          >
                            {f.title}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: severityColor[f.severity],
                              background: `${severityColor[f.severity]}15`,
                              padding: "1px 8px",
                              borderRadius: 4,
                            }}
                          >
                            {f.severity} Risk
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: 13,
                            color: "#6B7280",
                            lineHeight: 1.6,
                          }}
                        >
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Report Phishing Form */}
            <section>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: "0.75rem",
                }}
              >
                Report Phishing / Scam
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                  marginBottom: "1.5rem",
                }}
              >
                Help protect other customers by reporting any suspicious
                messages, calls, or websites pretending to be UCB.
              </p>
              {reportSubmitted ? (
                <div
                  style={{
                    padding: "2rem",
                    textAlign: "center",
                    background: "#F0FDF4",
                    borderRadius: 16,
                    border: "1px solid #BBF7D0",
                  }}
                >
                  <div style={{ fontSize: 40, marginBottom: "0.75rem" }}>
                    ✅
                  </div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#166534",
                      marginBottom: 8,
                    }}
                  >
                    Report Received
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#374151",
                      marginBottom: "1.25rem",
                    }}
                  >
                    Thank you for your report. Our security team will
                    investigate and take action. If you are in immediate danger
                    of financial loss, call <strong>+855 23 999 911</strong>.
                  </p>
                  <button
                    className="btn-outline"
                    onClick={() => {
                      setReportSubmitted(false)
                      setReportForm({
                        name: "",
                        phone: "",
                        email: "",
                        incidentType: "",
                        description: "",
                        dateOccurred: "",
                      })
                    }}
                  >
                    Submit Another Report
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReport} noValidate>
                  <div className="card" style={{ padding: "1.5rem" }}>
                    <div
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
                          Your Name
                        </label>
                        <input
                          value={reportForm.name}
                          onChange={(e) =>
                            setReportForm((f) => ({
                              ...f,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Optional"
                          style={{
                            width: "100%",
                            padding: "0.75rem 1rem",
                            border: "1.5px solid #D1D5DB",
                            borderRadius: 8,
                            fontSize: 14,
                            outline: "none",
                            fontFamily: "inherit",
                          }}
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
                          Your Phone
                        </label>
                        <input
                          type="tel"
                          value={reportForm.phone}
                          onChange={(e) =>
                            setReportForm((f) => ({
                              ...f,
                              phone: e.target.value,
                            }))
                          }
                          placeholder="Optional"
                          style={{
                            width: "100%",
                            padding: "0.75rem 1rem",
                            border: "1.5px solid #D1D5DB",
                            borderRadius: 8,
                            fontSize: 14,
                            outline: "none",
                            fontFamily: "inherit",
                          }}
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
                        Incident Type *
                      </label>
                      <select
                        required
                        value={reportForm.incidentType}
                        onChange={(e) =>
                          setReportForm((f) => ({
                            ...f,
                            incidentType: e.target.value,
                          }))
                        }
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          border: "1.5px solid #D1D5DB",
                          borderRadius: 8,
                          fontSize: 14,
                          background: "#fff",
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        <option value="">Select type...</option>
                        {[
                          "Phishing Email",
                          "Fake SMS",
                          "Phone Scam",
                          "Fake Website",
                          "Fake Social Media Account",
                          "ATM Tampering",
                          "Suspicious Transaction",
                          "Other",
                        ].map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
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
                        Date Incident Occurred
                      </label>
                      <input
                        type="date"
                        value={reportForm.dateOccurred}
                        onChange={(e) =>
                          setReportForm((f) => ({
                            ...f,
                            dateOccurred: e.target.value,
                          }))
                        }
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          border: "1.5px solid #D1D5DB",
                          borderRadius: 8,
                          fontSize: 14,
                          outline: "none",
                          fontFamily: "inherit",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#009C9F")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                      />
                    </div>
                    <div style={{ marginBottom: "1.25rem" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#374151",
                          marginBottom: 6,
                        }}
                      >
                        Description *
                      </label>
                      <textarea
                        required
                        value={reportForm.description}
                        onChange={(e) =>
                          setReportForm((f) => ({
                            ...f,
                            description: e.target.value,
                          }))
                        }
                        rows={4}
                        placeholder="Describe what happened in as much detail as possible. Include any phone numbers, URLs, or names used by the scammer."
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          border: "1.5px solid #D1D5DB",
                          borderRadius: 8,
                          fontSize: 14,
                          outline: "none",
                          fontFamily: "inherit",
                          resize: "vertical",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#009C9F")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      Submit Security Report
                    </button>
                  </div>
                </form>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
