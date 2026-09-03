
interface MaintenancePageProps {
  navigate: (p: Page) => void
  startTime?: string
  endTime?: string
  affectedServices?: string[]
  title?: string
  message?: string
}

function formatTime(iso: string) {
  return (
    new Date(iso).toLocaleString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Phnom_Penh",
    }) + " (ICT)"
  )
}

function CountdownUnit({ value, label }: { value: number label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: 40,
          fontWeight: 900,
          color: "#0A2540",
          lineHeight: 1,
          background: "#fff",
          borderRadius: 12,
          padding: "1rem 1.25rem",
          minWidth: 72,
          border: "1px solid #E5E7EB",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <div
        style={{
          fontSize: 12,
          color: "#6B7280",
          fontWeight: 600,
          marginTop: 6,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {label}
      </div>
    </div>
  )
}

export default function MaintenancePage({
  navigate,
  startTime = "2026-10-05T01:00:00+07:00",
  endTime = "2026-10-05T05:00:00+07:00",
  affectedServices = [
    "UCB Mobile App",
    "Internet Banking Portal",
    "QR Payment Processing",
    "Card-to-Card Transfers",
  ],
  title = "Scheduled System Maintenance",
  message = "We are performing critical infrastructure upgrades to improve the speed, security, and reliability of your banking experience. We apologise for any inconvenience.",
}: MaintenancePageProps) {
  const available = [
    { icon: "🏧", label: "ATMs", detail: "All ATMs remain available 24/7" },
    {
      icon: "🏦",
      label: "Branches",
      detail: "All branches open during normal hours",
    },
    {
      icon: "💳",
      label: "Card Payments",
      detail: "POS terminals and contactless payments work normally",
    },
    {
      icon: "📞",
      label: "Customer Service",
      detail: "+855 23 999 001 (Mon–Sat, 8AM–6PM)",
    },
  ]

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F4F6F8",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(44px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(44px) rotate(-360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0,156,159,0.4); }
          70% { transform: scale(1); box-shadow: 0 0 0 16px rgba(0,156,159,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0,156,159,0); }
        }
      `}</style>

      {/* Top banner */}
      <div
        style={{
          background: "#FEF3C7",
          borderBottom: "2px solid #FDE68A",
          padding: "0.75rem 0",
        }}
      >
        <div
          className="container"
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <span style={{ fontSize: 18 }}>🔧</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#92400E" }}>
            Maintenance Notice — UCB digital services will be temporarily
            unavailable.
          </span>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: 760, width: "100%" }}>
          {/* Animation + heading */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div
              style={{
                position: "relative",
                display: "inline-block",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #009C9F, #007B7E)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 42,
                  animation: "pulse-ring 2s ease-in-out infinite",
                  margin: "0 auto",
                }}
              >
                🔧
              </div>
            </div>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: "#0A2540",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "#374151",
                lineHeight: 1.8,
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              {message}
            </p>
          </div>

          {/* Schedule */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "2rem",
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              marginBottom: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "1.25rem",
                textAlign: "center",
              }}
            >
              Maintenance Schedule (ICT, GMT+7)
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                gap: "1rem",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  background: "#F4F6F8",
                  borderRadius: 12,
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#9CA3AF",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Starts
                </div>
                <div
                  style={{ fontSize: 15, fontWeight: 700, color: "#0A2540" }}
                >
                  {formatTime(startTime)}
                </div>
              </div>
              <div style={{ fontSize: 24, color: "#009C9F", fontWeight: 800 }}>
                →
              </div>
              <div
                style={{
                  background: "#E6F7F7",
                  borderRadius: 12,
                  padding: "1rem",
                  textAlign: "center",
                  border: "1.5px solid #009C9F",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#007B7E",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Ends
                </div>
                <div
                  style={{ fontSize: 15, fontWeight: 700, color: "#0A2540" }}
                >
                  {formatTime(endTime)}
                </div>
              </div>
            </div>

            {/* Affected services */}
            <div
              style={{ borderTop: "1px solid #F3F4F6", paddingTop: "1.25rem" }}
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
                ⚡ Temporarily Unavailable
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {affectedServices.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: 13,
                      background: "#FEF3C7",
                      color: "#92400E",
                      border: "1px solid #FDE68A",
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <span style={{ fontSize: 10 }}>✕</span> {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* What still works */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "2rem",
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              marginBottom: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#065F46",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "1.25rem",
              }}
            >
              ✅ Still Available
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {available.map((a) => (
                <div
                  key={a.label}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "0.75rem",
                    background: "#F0FDF4",
                    borderRadius: 10,
                    border: "1px solid #BBF7D0",
                  }}
                >
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{a.icon}</span>
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#065F46",
                      }}
                    >
                      {a.label}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#374151",
                        lineHeight: 1.5,
                      }}
                    >
                      {a.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Khmer notice */}
          <div
            style={{
              background: "#EDE9FE",
              borderRadius: 14,
              padding: "1.25rem 1.5rem",
              border: "1px solid #DDD6FE",
              marginBottom: "1.5rem",
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "#5B21B6",
                lineHeight: 2,
                fontFamily: "'Noto Sans Khmer', sans-serif",
                margin: 0,
              }}
            >
              <strong>ជូនដំណឹង:</strong> UCB Mobile App និង Internet Banking
              នឹងមិនអាចប្រើបានជាបណ្ដោះអាសន្នក្នុងអំឡុងពេលថែទាំប្រព័ន្ធ។ ម៉ាស៊ីន ATM និងសាខា UCB
              ទាំងអស់ នៅតែបើកដំណើរការធម្មតា។
            </p>
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn-primary"
              onClick={() => navigate("announcements")}
            >
              View Announcement Details
            </button>
            <button
              className="btn-outline"
              onClick={() => navigate("branches")}
            >
              📍 Find Nearest Branch
            </button>
            <button className="btn-ghost" onClick={() => navigate("home")}>
              ← Return to Homepage
            </button>
          </div>

          {/* Emergency contact */}
          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
              padding: "1.25rem",
              background: "#0A2540",
              borderRadius: 14,
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
                marginBottom: 6,
              }}
            >
              Emergency? Lost card or fraud?
            </p>
            <p style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>
              🚨 Fraud Hotline:{" "}
              <span style={{ color: "#009C9F" }}>+855 23 999 911</span>{" "}
              <span
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 13,
                  fontWeight: 400,
                }}
              >
                — Available 24/7
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
