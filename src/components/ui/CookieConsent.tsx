import { useState, useEffect } from "react"

const STORAGE_KEY = "ucb_cookie_consent"

/** Renders cookie consent and preference controls. */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [prefs, setPrefs] = useState({
    analytics: true,
    marketing: false,
    functional: true,
  })

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  /** Saves cookie preferences and hides the consent prompt. */
  const accept = (all: boolean) => {
    const consent = all
      ? { analytics: true, marketing: true, functional: true }
      : { ...prefs, essential: true }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="cookie-consent"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "#fff",
        borderTop: "1px solid #E5E7EB",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.12)",
        padding: "1.25rem 1.5rem",
      }}
    >
      <div className="container">
        {!showPreferences ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: 4,
                }}
              >
                🍪 We use cookies
              </div>
              <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>
                UCB uses essential cookies for security and functionality, and
                optional cookies to improve your browsing experience. See our{" "}
                <a
                  href="#"
                  style={{
                    color: "#009C9F",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  Privacy Policy
                </a>{" "}
                for details.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => setShowPreferences(true)}
                style={{
                  background: "none",
                  border: "1.5px solid #D1D5DB",
                  borderRadius: 8,
                  padding: "0.5rem 1.125rem",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#374151",
                  cursor: "pointer",
                }}
              >
                Preferences
              </button>
              <button
                onClick={() => accept(false)}
                style={{
                  background: "none",
                  border: "1.5px solid #009C9F",
                  borderRadius: 8,
                  padding: "0.5rem 1.125rem",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#009C9F",
                  cursor: "pointer",
                }}
              >
                Essential Only
              </button>
              <button
                onClick={() => accept(true)}
                className="btn-primary"
                style={{ fontSize: 13, padding: "0.5rem 1.25rem" }}
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#0A2540",
                marginBottom: "1rem",
              }}
            >
              Cookie Preferences
            </div>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                flexWrap: "wrap",
                marginBottom: "1.25rem",
              }}
            >
              {[
                {
                  id: "essential",
                  label: "Essential",
                  desc: "Required for login, security, and basic site functionality. Cannot be disabled.",
                  locked: true,
                  value: true,
                },
                {
                  id: "functional",
                  label: "Functional",
                  desc: "Remembers your preferences (language, region). Improves your experience.",
                  locked: false,
                  value: prefs.functional,
                },
                {
                  id: "analytics",
                  label: "Analytics",
                  desc: "Helps us understand how you use the site so we can improve it. Anonymised.",
                  locked: false,
                  value: prefs.analytics,
                },
                {
                  id: "marketing",
                  label: "Marketing",
                  desc: "Used to show you relevant UCB promotions on other websites.",
                  locked: false,
                  value: prefs.marketing,
                },
              ].map((cat) => (
                <div
                  key={cat.id}
                  style={{
                    flex: "1 1 200px",
                    padding: "1rem",
                    background: "#F4F6F8",
                    borderRadius: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
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
                      {cat.label}
                    </span>
                    <label
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: 36,
                        height: 20,
                        flexShrink: 0,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={cat.value}
                        disabled={cat.locked}
                        onChange={(e) => {
                          if (!cat.locked)
                            setPrefs((p) => ({
                              ...p,
                              [cat.id]: e.target.checked,
                            }))
                        }}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          cursor: cat.locked ? "not-allowed" : "pointer",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: cat.value ? "#009C9F" : "#D1D5DB",
                          borderRadius: 20,
                          transition: "background 150ms",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            height: 14,
                            width: 14,
                            left: cat.value ? 18 : 3,
                            bottom: 3,
                            background: "#fff",
                            borderRadius: "50%",
                            transition: "left 150ms",
                          }}
                        />
                      </span>
                    </label>
                  </div>
                  <p
                    style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.4 }}
                  >
                    {cat.desc}
                  </p>
                  {cat.locked && (
                    <span style={{ fontSize: 11, color: "#9CA3AF" }}>
                      Always active
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => setShowPreferences(false)}
                style={{
                  background: "none",
                  border: "1.5px solid #D1D5DB",
                  borderRadius: 8,
                  padding: "0.5rem 1.125rem",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#374151",
                  cursor: "pointer",
                }}
              >
                Back
              </button>
              <button
                onClick={() => accept(false)}
                className="btn-primary"
                style={{ fontSize: 13, padding: "0.5rem 1.25rem" }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
