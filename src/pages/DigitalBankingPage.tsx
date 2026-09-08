import { FeatureCard, SectionHeader } from "../components/cards/UcbCardSystem"
import { mobileBankingFeatures } from "../data/digitalBankingCards"

interface DigitalBankingPageProps {
  navigate: (p: Page) => void
}

const internetFeatures = [
  {
    icon: "🏢",
    title: "Business Dashboard",
    desc: "Manage multiple accounts, view consolidated balances, and generate detailed reports.",
  },
  {
    icon: "📤",
    title: "Bulk Payments",
    desc: "Upload payroll or supplier payments via Excel/CSV. Process hundreds of transfers in one click.",
  },
  {
    icon: "📅",
    title: "Scheduled Transfers",
    desc: "Set recurring transfers and bill payments. Never miss a deadline.",
  },
  {
    icon: "📜",
    title: "Statement Download",
    desc: "Download statements in PDF or Excel format for up to 5 years of transaction history.",
  },
]

const securityFeatures = [
  {
    icon: "🔐",
    title: "Biometric Login",
    desc: "Fingerprint and Face ID authentication — your face and fingerprint are your password.",
  },
  {
    icon: "🔔",
    title: "OTP Verification",
    desc: "All transactions above USD 100 require One-Time Password verification to your registered number.",
  },
  {
    icon: "📳",
    title: "Instant Notifications",
    desc: "Real-time SMS and push notifications for every debit, credit, and login event on your account.",
  },
  {
    icon: "🛡️",
    title: "256-bit Encryption",
    desc: "Bank-grade SSL encryption protects all your data and transactions end-to-end.",
  },
]

/** Renders digital banking features, app benefits, and support calls to action. */
export default function DigitalBankingPage({
  navigate,
}: DigitalBankingPageProps) {
  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #0A2540 0%, #1A3D5C 100%)",
          padding: "5rem 0",
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
              "radial-gradient(circle at 1px 1px, rgba(0,156,159,0.1) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            className="grid-2-col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(0,156,159,0.2)",
                  borderRadius: 20,
                  padding: "4px 14px",
                  marginBottom: "1.25rem",
                }}
              >
                <span style={{ fontSize: 14 }}>📱</span>
                <span
                  style={{ fontSize: 12, fontWeight: 600, color: "#009C9F" }}
                >
                  UCB Mobile App v3.0
                </span>
              </div>
              <h1
                style={{
                  fontSize: 42,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.15,
                  marginBottom: "1.25rem",
                }}
              >
                Full Banking,
                <br />
                <span style={{ color: "#009C9F" }}>In Your Pocket</span>
              </h1>
              <p
                style={{
                  fontSize: 17,
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                }}
              >
                UCB Mobile App and Internet Banking give you complete control
                over your finances — anywhere, anytime, in English or Khmer.
              </p>
              <div
                id="app-downloads"
                style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
              >
                <a
                  href="https://apps.apple.com/cy/app/ucb-e-banking-kh/id1441385292"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: "#fff",
                    color: "#0A2540",
                    borderRadius: 10,
                    padding: "10px 18px",
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "transform 150ms",
                  }}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-.99-.46-2.08-.48-3.12 0-1.3.6-1.99.43-2.87-.35C3.79 15.25 4.51 7.59 9.05 7.31c1.1.06 1.87.61 2.53.66.99-.2 1.94-.77 3-.7 1.27.1 2.23.61 2.86 1.51-2.64 1.58-2.02 5.05.41 6.02-.49 1.29-1.13 2.58-2.05 3.49l1.25 1.99ZM12.03 7.25C11.88 4.87 13.8 2.92 16.05 2.8c.31 2.73-2.48 4.77-4.02 4.45Z" />
                  </svg>
                  <div>
                    <div style={{ fontSize: 9, color: "#6B7280" }}>
                      Download on the
                    </div>
                    <div>App Store</div>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=kh.com.ucb.ebank.mobilebanking&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: "#009C9F",
                    color: "#fff",
                    borderRadius: 10,
                    padding: "10px 18px",
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "transform 150ms",
                  }}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
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
                      style={{ fontSize: 9, color: "rgba(255,255,255,0.7)" }}
                    >
                      Get it on
                    </div>
                    <div>Google Play</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Phone mockup */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1.5rem",
              }}
            >
              {[
                {
                  bg: "#1A3D5C",
                  img: "/assets/digitalbanking/mobile2.webp",
                  alt: "UCB Mobile App dashboard",
                },
                {
                  bg: "#007B7E",
                  img: "/assets/digitalbanking/mobile1.webp",
                  alt: "UCB Mobile App transfer screen",
                  transform: "translateY(24px)",
                },
              ].map((phone, i) => (
                <div
                  key={i}
                  style={{
                    width: 200,
                    height: 400,
                    borderRadius: 32,
                    border: "8px solid rgba(255,255,255,0.15)",
                    overflow: "hidden",
                    background: phone.bg,
                    transform: phone.transform ?? "none",
                    boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
                  }}
                >
                  <img
                    src={phone.img}
                    alt={phone.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile features */}
      <section className="page-section" id="mobile-banking-features">
        <div className="container">
          <SectionHeader
            title="UCB Mobile Banking"
            subtitle="Everyday mobile banking capabilities grouped under one UCB Mobile Banking product."
          />
          <div className="ucb-feature-grid" aria-label="UCB Mobile Banking capabilities">
            {mobileBankingFeatures.map((feature) => (
              <FeatureCard feature={feature} key={feature.title} />
            ))}
          </div>
          <div className="digital-register-action">
            <a
              className="btn-primary digital-register-action__button"
              href="/contact?subject=Digital%20Banking%20Support&message=I%20would%20like%20to%20register%20for%20UCB%20Mobile%20Banking.#contact-form"
            >
              Register for Mobile Banking
            </a>
          </div>
        </div>
      </section>

      {/* Internet banking */}
      <section className="page-section" style={{ background: "#F4F6F8" }}>
        <div className="container">
          <div
            className="grid-2-col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            <div>
              <h2 className="section-title" style={{ marginBottom: "1rem" }}>
                UCB Internet Banking
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: "#6B7280",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                }}
              >
                Powerful desktop banking for individuals and businesses. Manage
                accounts, authorise payments, download reports, and more —
                directly from your browser.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                {internetFeatures.map((f) => (
                  <div key={f.title} style={{ display: "flex", gap: 14 }}>
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        background: "#E6F7F7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        flexShrink: 0,
                      }}
                    >
                      {f.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 15,
                          color: "#0A2540",
                          marginBottom: 4,
                        }}
                      >
                        {f.title}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "#6B7280",
                          lineHeight: 1.5,
                        }}
                      >
                        {f.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={() => navigate("login")}>
                Access Internet Banking →
              </button>
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, #E6F7F7, #F4F6F8)",
                borderRadius: 20,
                padding: "2.5rem",
                border: "1px solid #D1D5DB",
                minHeight: 360,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=480&h=320&fit=crop&auto=format"
                alt="UCB Internet Banking dashboard on laptop"
                style={{
                  width: "100%",
                  borderRadius: 12,
                  boxShadow: "0 16px 48px rgba(0,0,0,0.15)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="page-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="section-title">Your Security, Our Priority</h2>
            <p className="section-subtitle">
              Bank with confidence knowing every transaction is protected by
              multiple layers of security.
            </p>
          </div>
          <div
            className="grid-4"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.25rem",
            }}
          >
            {securityFeatures.map((f) => (
              <div
                key={f.title}
                style={{
                  padding: "1.75rem 1.25rem",
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid #E5E7EB",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 20,
                    background: "#E6F7F7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 30,
                    margin: "0 auto 1rem",
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: 8,
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section style={{ background: "#009C9F", padding: "4rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            Ready to go digital?
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.85)",
              marginBottom: "2rem",
            }}
          >
            Download UCB Mobile App or register for Internet Banking — free for
            all UCB account holders.
          </p>
          <div className="digital-cta-actions">
            <a className="btn-white digital-cta-actions__button" href="#app-downloads">
              Download the App
            </a>
            <a
              className="btn-outline digital-cta-actions__button digital-cta-actions__button--outline"
              href="/contact?subject=Digital%20Banking%20Support&message=I%20would%20like%20to%20register%20for%20UCB%20Internet%20Banking.#contact-form"
            >
              Register for Internet Banking
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}



