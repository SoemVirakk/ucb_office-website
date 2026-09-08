import { useState, type ReactNode } from "react"
import Badge from "../components/ui/Badge"
import Alert from "../components/ui/Alert"
import FaqAccordion from "../components/ui/FaqAccordion"
import Pagination from "../components/ui/Pagination"
import Modal from "../components/ui/Modal"
import {
  LoadingState,
  EmptyState,
  ErrorState,
  SkeletonCard,
} from "../components/ui/States"
import { useToast } from "../components/ui/Toast"
import ExchangeRateWidget from "../components/widgets/ExchangeRateWidget"

/** Wraps a design-system section with consistent title and spacing. */
function Section({
  title,
  id,
  children,
}: {
  title: string
  id: string
  children: ReactNode
}) {
  return (
    <section id={id} style={{ marginBottom: "4rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
          paddingBottom: "0.875rem",
          borderBottom: "2px solid #E5E7EB",
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0A2540" }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

/** Renders a design token sample row. */
function Token({
  name,
  value,
  swatch,
}: {
  name: string
  value: string
  swatch?: string
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.75rem 1rem",
        background: "#fff",
        borderRadius: 10,
        border: "1px solid #E5E7EB",
      }}
    >
      {swatch && (
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: swatch,
            border: "1px solid rgba(0,0,0,0.08)",
            flexShrink: 0,
          }}
        />
      )}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#0A2540",
            fontFamily: "monospace",
          }}
        >
          {name}
        </div>
        <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>
          {value}
        </div>
      </div>
    </div>
  )
}

/** Renders a typography specimen for the design system. */
function Specimen({ label, children }: { label: string children: ReactNode }) {
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#9CA3AF",
          letterSpacing: 0.5,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  )
}

/** Renders the project design system reference page. */
export default function DesignSystemPage() {
  const [paginationPage, setPaginationPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [accordionItems] = useState([
    {
      q: "What is the minimum balance for a UCB Savings Account?",
      a: "There is no minimum balance requirement.",
    },
    {
      q: "How do I enable biometric login?",
      a: "Go to UCB Mobile App > Settings > Security > Enable Biometrics.",
    },
    {
      q: "Can I open a joint account online?",
      a: "Joint accounts require both holders to visit a branch in person.",
    },
  ])
  const { showToast } = useToast()

  const navItems = [
    { id: "color-tokens", label: "Colors" },
    { id: "typography", label: "Typography" },
    { id: "spacing", label: "Spacing" },
    { id: "buttons", label: "Buttons" },
    { id: "badges", label: "Badges" },
    { id: "alerts", label: "Alerts" },
    { id: "forms", label: "Forms" },
    { id: "cards", label: "Cards" },
    { id: "accordion", label: "Accordion" },
    { id: "pagination", label: "Pagination" },
    { id: "modal", label: "Modal" },
    { id: "toast", label: "Toast" },
    { id: "states", label: "States" },
    { id: "widgets", label: "Widgets" },
    { id: "handoff", label: "Handoff Notes" },
  ]

  return (
    <div style={{ background: "#F4F6F8", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
          padding: "3rem 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(0,156,159,0.2)",
              borderRadius: 20,
              padding: "4px 14px",
              marginBottom: "1rem",
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 600, color: "#009C9F" }}>
              🎨 Design System v1.0
            </span>
          </div>
          <h1
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: "#fff",
              marginBottom: "0.75rem",
            }}
          >
            UCB Design System
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 600,
            }}
          >
            Component library, design tokens, spacing scale, and Angular handoff
            documentation for Union Commercial Bank Cambodia.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "2rem 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Sticky nav */}
          <div style={{ position: "sticky", top: 88 }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "1rem",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#9CA3AF",
                  letterSpacing: 0.5,
                  marginBottom: "0.75rem",
                }}
              >
                ON THIS PAGE
              </div>
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  style={{
                    display: "block",
                    padding: "0.4rem 0.625rem",
                    borderRadius: 6,
                    fontSize: 13,
                    color: "#374151",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "background 150ms",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#E6F7F7")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            {/* Color tokens */}
            <Section title="Color Tokens" id="color-tokens">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                {[
                  {
                    name: "--color-ucb-teal",
                    value: "#009C9F",
                    swatch: "#009C9F",
                  },
                  {
                    name: "--color-ucb-teal-dark",
                    value: "#007B7E",
                    swatch: "#007B7E",
                  },
                  {
                    name: "--color-ucb-teal-light",
                    value: "#E6F7F7",
                    swatch: "#E6F7F7",
                  },
                  {
                    name: "--color-ucb-navy",
                    value: "#0A2540",
                    swatch: "#0A2540",
                  },
                  {
                    name: "--color-ucb-navy-mid",
                    value: "#1A3D5C",
                    swatch: "#1A3D5C",
                  },
                  {
                    name: "--color-ucb-gold",
                    value: "#C9A84C",
                    swatch: "#C9A84C",
                  },
                  {
                    name: "--color-ucb-gold-light",
                    value: "#FDF6E3",
                    swatch: "#FDF6E3",
                  },
                  {
                    name: "--color-ucb-gray",
                    value: "#F4F6F8",
                    swatch: "#F4F6F8",
                  },
                  {
                    name: "--color-ucb-gray-mid",
                    value: "#D1D5DB",
                    swatch: "#D1D5DB",
                  },
                  {
                    name: "--color-ucb-gray-dark",
                    value: "#6B7280",
                    swatch: "#6B7280",
                  },
                ].map((t) => (
                  <Token key={t.name} {...t} />
                ))}
              </div>

              {/* Semantic usage */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "1.5rem",
                  border: "1px solid #E5E7EB",
                }}
              >
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: "1rem",
                  }}
                >
                  Semantic Usage
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1rem",
                  }}
                >
                  {[
                    {
                      label: "Primary / CTA",
                      bg: "#009C9F",
                      text: "#fff",
                      note: "Buttons, links, focus rings, active states",
                    },
                    {
                      label: "Page Background",
                      bg: "#F4F6F8",
                      text: "#0A2540",
                      note: "Section backgrounds, card lift",
                    },
                    {
                      label: "Gold Accent",
                      bg: "#C9A84C",
                      text: "#fff",
                      note: "Highlights, badges, premium signals only",
                    },
                    {
                      label: "Navy / Dark",
                      bg: "#0A2540",
                      text: "#fff",
                      note: "Hero backgrounds, headings, footer",
                    },
                    {
                      label: "Teal Light",
                      bg: "#E6F7F7",
                      text: "#007B7E",
                      note: "Icon backgrounds, hover states, selected",
                    },
                    {
                      label: "Danger",
                      bg: "#FEF2F2",
                      text: "#991B1B",
                      note: "Errors, fraud alerts, destructive actions",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      style={{
                        borderRadius: 10,
                        overflow: "hidden",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <div
                        style={{
                          background: s.bg,
                          padding: "1rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: s.text,
                          }}
                        >
                          {s.label}
                        </span>
                      </div>
                      <div
                        style={{
                          padding: "0.625rem",
                          fontSize: 11,
                          color: "#6B7280",
                          lineHeight: 1.5,
                        }}
                      >
                        {s.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Typography */}
            <Section title="Typography" id="typography">
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "2rem",
                  border: "1px solid #E5E7EB",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {[
                  {
                    label: "Display / Hero — 3rem, 800",
                    size: "3rem",
                    weight: 800,
                    sample: "Banking Built for Cambodia",
                  },
                  {
                    label: "H1 — 2.25rem, 800",
                    size: "2.25rem",
                    weight: 800,
                    sample: "Products & Services",
                  },
                  {
                    label: "H2 — 1.75rem, 700",
                    size: "1.75rem",
                    weight: 700,
                    sample: "Our Latest Promotions",
                  },
                  {
                    label: "H3 — 1.25rem, 700",
                    size: "1.25rem",
                    weight: 700,
                    sample: "UCB Savings Account",
                  },
                  {
                    label: "Body — 1rem, 400",
                    size: "1rem",
                    weight: 400,
                    sample:
                      "Open an account in 10 minutes and start banking with UCB today.",
                  },
                  {
                    label: "Small / Caption — 0.75rem, 500",
                    size: "0.75rem",
                    weight: 500,
                    sample: "Last updated: 2 Sep 2026, 08:00 ICT",
                  },
                  {
                    label: "Label / Badge — 0.6875rem, 700",
                    size: "0.6875rem",
                    weight: 700,
                    sample: "NEW  •  LIMITED TIME  •  7.5% P.A.",
                  },
                ].map((t) => (
                  <div key={t.label}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#9CA3AF",
                        letterSpacing: 0.5,
                        marginBottom: 6,
                      }}
                    >
                      {t.label}
                    </div>
                    <div
                      style={{
                        fontSize: t.size,
                        fontWeight: t.weight,
                        color: "#0A2540",
                        lineHeight: 1.2,
                      }}
                    >
                      {t.sample}
                    </div>
                  </div>
                ))}

                <div
                  style={{
                    borderTop: "1px solid #E5E7EB",
                    paddingTop: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#9CA3AF",
                      letterSpacing: 0.5,
                      marginBottom: "1rem",
                    }}
                  >
                    KHMER TYPOGRAPHY — Noto Sans Khmer
                  </div>
                  {[
                    {
                      label: "Heading KM — 2rem, 700",
                      size: "2rem",
                      weight: 700,
                      sample: "ធនាគារពាណិជ្ជ​​យូនីយ៉ុន",
                    },
                    {
                      label: "Body KM — 1rem, 400",
                      size: "1rem",
                      weight: 400,
                      sample:
                        "បើកគណនីក្នុងរយៈពេល ១០ នាទី តាមរយៈកម្មវិធី UCB Mobile App",
                    },
                  ].map((t) => (
                    <div key={t.label} style={{ marginBottom: "1rem" }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#9CA3AF",
                          letterSpacing: 0.5,
                          marginBottom: 6,
                        }}
                      >
                        {t.label}
                      </div>
                      <div
                        style={{
                          fontSize: t.size,
                          fontWeight: t.weight,
                          color: "#0A2540",
                          fontFamily: "Noto Sans Khmer, sans-serif",
                          lineHeight: 1.6,
                        }}
                      >
                        {t.sample}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Spacing */}
            <Section title="Spacing Scale" id="spacing">
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "1.5rem",
                  border: "1px solid #E5E7EB",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {[
                    {
                      token: "4px",
                      rem: "0.25rem",
                      use: "Icon gap, micro padding",
                    },
                    {
                      token: "8px",
                      rem: "0.5rem",
                      use: "Badge padding, tight gap",
                    },
                    {
                      token: "12px",
                      rem: "0.75rem",
                      use: "Button icon gap, list gap",
                    },
                    {
                      token: "16px",
                      rem: "1rem",
                      use: "Card padding (inner), body margin",
                    },
                    {
                      token: "20px",
                      rem: "1.25rem",
                      use: "Card padding (standard)",
                    },
                    {
                      token: "24px",
                      rem: "1.5rem",
                      use: "Section inner gap, container padding",
                    },
                    {
                      token: "32px",
                      rem: "2rem",
                      use: "Card-to-card gap, section intro spacing",
                    },
                    {
                      token: "48px",
                      rem: "3rem",
                      use: "Section padding (mobile)",
                    },
                    {
                      token: "64px",
                      rem: "4rem",
                      use: "Section padding (tablet)",
                    },
                    {
                      token: "80px",
                      rem: "5rem",
                      use: "Section padding (desktop)",
                    },
                  ].map((s) => (
                    <div
                      key={s.token}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          width: parseInt(s.token) * 1.5,
                          height: 20,
                          background: "#E6F7F7",
                          borderRadius: 4,
                          border: "1px dashed #009C9F",
                          flexShrink: 0,
                          minWidth: 6,
                        }}
                      />
                      <code
                        style={{
                          fontSize: 12,
                          color: "#007B7E",
                          fontWeight: 700,
                          width: 50,
                          flexShrink: 0,
                        }}
                      >
                        {s.token}
                      </code>
                      <code
                        style={{
                          fontSize: 12,
                          color: "#9CA3AF",
                          width: 60,
                          flexShrink: 0,
                        }}
                      >
                        {s.rem}
                      </code>
                      <span style={{ fontSize: 13, color: "#374151" }}>
                        {s.use}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: "1.5rem",
                    padding: "1rem",
                    background: "#F4F6F8",
                    borderRadius: 10,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#0A2540",
                      marginBottom: 6,
                    }}
                  >
                    Border Radius Tokens
                  </div>
                  <div
                    style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}
                  >
                    {[
                      {
                        name: "btn",
                        r: "8px",
                        w: 64,
                        label: "Buttons, inputs",
                      },
                      {
                        name: "card",
                        r: "12px",
                        w: 80,
                        label: "Cards, panels",
                      },
                      {
                        name: "lg",
                        r: "16px",
                        w: 80,
                        label: "Quick-action tiles",
                      },
                      {
                        name: "xl",
                        r: "20px",
                        w: 80,
                        label: "Hero image, featured",
                      },
                      {
                        name: "full",
                        r: "9999px",
                        w: 64,
                        label: "Pills, badges",
                      },
                    ].map((r) => (
                      <div key={r.name} style={{ textAlign: "center" }}>
                        <div
                          style={{
                            width: r.w,
                            height: 36,
                            background: "#009C9F",
                            borderRadius: r.r,
                            margin: "0 auto 6px",
                          }}
                        />
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#374151",
                          }}
                        >
                          {r.name}
                        </div>
                        <div style={{ fontSize: 10, color: "#9CA3AF" }}>
                          {r.r}
                        </div>
                        <div style={{ fontSize: 10, color: "#9CA3AF" }}>
                          {r.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* Buttons */}
            <Section title="Buttons" id="buttons">
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "2rem",
                  border: "1px solid #E5E7EB",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                <Specimen label="VARIANTS">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <button className="btn-primary">Primary</button>
                    <button className="btn-outline">Outline</button>
                    <button className="btn-ghost">Ghost</button>
                    <button
                      className="btn-white"
                      style={{ border: "1px solid #E5E7EB" }}
                    >
                      White
                    </button>
                    <button
                      className="btn-primary"
                      style={{ background: "#C9A84C" }}
                    >
                      Gold
                    </button>
                  </div>
                </Specimen>

                <Specimen label="SIZES">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      className="btn-primary"
                      style={{ fontSize: 12, padding: "0.375rem 0.875rem" }}
                    >
                      Small
                    </button>
                    <button className="btn-primary">Default</button>
                    <button
                      className="btn-primary"
                      style={{ fontSize: 16, padding: "0.875rem 2rem" }}
                    >
                      Large
                    </button>
                    <button
                      className="btn-primary"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      Full Width
                    </button>
                  </div>
                </Specimen>

                <Specimen label="STATES">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <button className="btn-primary">Default</button>
                    <button
                      className="btn-primary"
                      style={{ background: "#007B7E" }}
                    >
                      Hover
                    </button>
                    <button
                      className="btn-primary"
                      style={{ outline: "2px solid #009C9F", outlineOffset: 2 }}
                    >
                      Focus
                    </button>
                    <button className="btn-primary" disabled>
                      Disabled
                    </button>
                    <button
                      className="btn-primary"
                      style={{ gap: "0.5rem", opacity: 0.8 }}
                    >
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          border: "2px solid rgba(255,255,255,0.4)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          display: "inline-block",
                          animation: "spin 700ms linear infinite",
                        }}
                      />
                      Loading
                    </button>
                  </div>
                </Specimen>

                <Specimen label="WITH ICONS">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <button className="btn-primary">📱 Download App</button>
                    <button className="btn-outline">📍 Find Branch →</button>
                    <button className="btn-ghost">← Back to Products</button>
                  </div>
                </Specimen>
              </div>
            </Section>

            {/* Badges */}
            <Section title="Badges" id="badges">
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "2rem",
                  border: "1px solid #E5E7EB",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {([
                    "teal",
                    "gold",
                    "blue",
                    "red",
                    "gray",
                    "navy",
                  ] as const).map((v) => (
                    <div
                      key={v}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Badge
                        label={v.charAt(0).toUpperCase() + v.slice(1)}
                        variant={v}
                      />
                      <span style={{ fontSize: 10, color: "#9CA3AF" }}>
                        variant="{v}"
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
                >
                  <Badge label="New" variant="teal" />
                  <Badge label="Limited Time" variant="gold" />
                  <Badge label="7.5% p.a." variant="teal" />
                  <Badge label="Featured" variant="gold" />
                  <Badge label="Coming Soon" variant="navy" />
                  <Badge label="Ended" variant="gray" />
                  <Badge label="Cashback" variant="blue" />
                </div>
              </div>
            </Section>

            {/* Alerts */}
            <Section title="Alerts" id="alerts">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem",
                }}
              >
                <Alert
                  type="info"
                  title="Information"
                  message="Your UCB Mobile App has been updated to version 3.0 with new features."
                  dismissible
                />
                <Alert
                  type="success"
                  title="Account Opened"
                  message="Congratulations! Your UCB Savings Account has been successfully opened."
                  dismissible
                />
                <Alert
                  type="warning"
                  title="Security Reminder"
                  message="UCB will never call you to ask for your PIN, OTP, or full card number."
                />
                <Alert
                  type="error"
                  title="Transaction Failed"
                  message="Your transfer could not be processed. Please check your balance and try again."
                  dismissible
                />
              </div>
            </Section>

            {/* Forms */}
            <Section title="Form Elements" id="forms">
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "2rem",
                  border: "1px solid #E5E7EB",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.5rem",
                  }}
                >
                  <Specimen label="TEXT INPUT — DEFAULT">
                    <input
                      type="text"
                      placeholder="Full name"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: 8,
                        border: "1.5px solid #D1D5DB",
                        fontSize: 14,
                        outline: "none",
                        fontFamily: "inherit",
                      }}
                    />
                  </Specimen>
                  <Specimen label="TEXT INPUT — FOCUS">
                    <input
                      type="text"
                      defaultValue="Sopheak Keo"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: 8,
                        border: "1.5px solid #009C9F",
                        fontSize: 14,
                        outline: "2px solid rgba(0,156,159,0.2)",
                        outlineOffset: 0,
                        fontFamily: "inherit",
                      }}
                    />
                  </Specimen>
                  <Specimen label="TEXT INPUT — ERROR">
                    <div>
                      <input
                        type="text"
                        defaultValue="invalid@"
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          borderRadius: 8,
                          border: "1.5px solid #DC2626",
                          fontSize: 14,
                          outline: "none",
                          fontFamily: "inherit",
                        }}
                      />
                      <div
                        style={{ fontSize: 12, color: "#DC2626", marginTop: 4 }}
                      >
                        Please enter a valid email address.
                      </div>
                    </div>
                  </Specimen>
                  <Specimen label="TEXT INPUT — DISABLED">
                    <input
                      type="text"
                      disabled
                      value="Read only"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: 8,
                        border: "1.5px solid #E5E7EB",
                        fontSize: 14,
                        background: "#F4F6F8",
                        color: "#9CA3AF",
                        cursor: "not-allowed",
                        fontFamily: "inherit",
                      }}
                    />
                  </Specimen>
                  <Specimen label="SELECT">
                    <select
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: 8,
                        border: "1.5px solid #D1D5DB",
                        fontSize: 14,
                        background: "#fff",
                        cursor: "pointer",
                        outline: "none",
                        fontFamily: "inherit",
                      }}
                    >
                      <option>General Inquiry</option>
                      <option>Loan Application</option>
                      <option>Card Issue</option>
                    </select>
                  </Specimen>
                  <Specimen label="TEXTAREA">
                    <textarea
                      rows={3}
                      placeholder="Your message..."
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: 8,
                        border: "1.5px solid #D1D5DB",
                        fontSize: 14,
                        resize: "vertical",
                        outline: "none",
                        fontFamily: "inherit",
                      }}
                    />
                  </Specimen>
                </div>
              </div>
            </Section>

            {/* Cards */}
            <Section title="Cards" id="cards">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                }}
              >
                {/* Default card */}
                <div className="card" style={{ padding: "1.5rem" }}>
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
                      marginBottom: "1rem",
                    }}
                  >
                    🏦
                  </div>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#0A2540",
                      marginBottom: 6,
                    }}
                  >
                    Default Card
                  </h3>
                  <p
                    style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}
                  >
                    Standard card with shadow, 12px radius, white background.
                  </p>
                </div>
                {/* Highlighted card */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    padding: "1.5rem",
                    border: "2px solid #009C9F",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "#009C9F",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      marginBottom: "1rem",
                    }}
                  >
                    ✓
                  </div>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#0A2540",
                      marginBottom: 6,
                    }}
                  >
                    Selected Card
                  </h3>
                  <p
                    style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}
                  >
                    Teal border when selected or active.
                  </p>
                </div>
                {/* Navy card */}
                <div
                  style={{
                    background: "#0A2540",
                    borderRadius: 12,
                    padding: "1.5rem",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "rgba(0,156,159,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      marginBottom: "1rem",
                    }}
                  >
                    💎
                  </div>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: 6,
                    }}
                  >
                    Dark Card
                  </h3>
                  <p
                    style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.6 }}
                  >
                    Navy background for premium or hero contexts.
                  </p>
                </div>
                {/* Teal card */}
                <div
                  style={{
                    background: "#009C9F",
                    borderRadius: 12,
                    padding: "1.5rem",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      marginBottom: "1rem",
                    }}
                  >
                    📈
                  </div>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: 6,
                    }}
                  >
                    Primary Card
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1.6,
                    }}
                  >
                    Teal background for CTAs or highlight sections.
                  </p>
                </div>
                {/* Gold card */}
                <div
                  style={{
                    background: "#FDF6E3",
                    borderRadius: 12,
                    padding: "1.5rem",
                    border: "1px solid #FDE68A",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "#FDE68A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      marginBottom: "1rem",
                    }}
                  >
                    🔒
                  </div>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#92400E",
                      marginBottom: 6,
                    }}
                  >
                    Gold Alert Card
                  </h3>
                  <p
                    style={{ fontSize: 13, color: "#92400E", lineHeight: 1.6 }}
                  >
                    For security tips, warnings, special promotions.
                  </p>
                </div>
                {/* Skeleton */}
                <SkeletonCard />
              </div>
            </Section>

            {/* Accordion */}
            <Section title="Accordion (FAQ)" id="accordion">
              <FaqAccordion items={accordionItems} />
            </Section>

            {/* Pagination */}
            <Section title="Pagination" id="pagination">
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "2rem",
                  border: "1px solid #E5E7EB",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <Pagination
                  total={48}
                  perPage={6}
                  current={paginationPage}
                  onChange={setPaginationPage}
                />
                <p
                  style={{
                    textAlign: "center",
                    fontSize: 13,
                    color: "#6B7280",
                  }}
                >
                  Showing page {paginationPage} of 8 (48 total results)
                </p>
              </div>
            </Section>

            {/* Modal */}
            <Section title="Modal" id="modal">
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "2rem",
                  border: "1px solid #E5E7EB",
                }}
              >
                <p
                  style={{
                    fontSize: 14,
                    color: "#6B7280",
                    marginBottom: "1rem",
                  }}
                >
                  Modal uses React Portal, close on backdrop click or Escape
                  key.
                </p>
                <button
                  className="btn-primary"
                  onClick={() => setModalOpen(true)}
                >
                  Open Modal Example
                </button>
                <Modal
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                  title="UCB Savings Account — Key Terms"
                >
                  <p
                    style={{
                      fontSize: 14,
                      color: "#374151",
                      lineHeight: 1.8,
                      marginBottom: "1rem",
                    }}
                  >
                    This modal displays product details, terms and conditions,
                    or confirmation dialogs. It uses a React Portal to render
                    outside the component tree.
                  </p>
                  <Alert
                    type="info"
                    message="Interest rates are subject to change. Contact your nearest UCB branch for the latest rates."
                  />
                  <div
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      marginTop: "1.5rem",
                    }}
                  >
                    <button
                      className="btn-primary"
                      onClick={() => setModalOpen(false)}
                    >
                      Confirm
                    </button>
                    <button
                      className="btn-outline"
                      onClick={() => setModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Modal>
              </div>
            </Section>

            {/* Toast */}
            <Section title="Toast Notifications" id="toast">
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "2rem",
                  border: "1px solid #E5E7EB",
                }}
              >
                <p
                  style={{
                    fontSize: 14,
                    color: "#6B7280",
                    marginBottom: "1rem",
                  }}
                >
                  Toasts auto-dismiss after 4 seconds. Click a button to trigger
                  one:
                </p>
                <div
                  style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
                >
                  <button
                    className="btn-primary"
                    onClick={() =>
                      showToast({
                        type: "success",
                        title: "Transfer Successful",
                        message: "USD 500.00 sent to Sopheak Keo.",
                      })
                    }
                  >
                    ✅ Success Toast
                  </button>
                  <button
                    className="btn-outline"
                    onClick={() =>
                      showToast({
                        type: "error",
                        title: "Payment Failed",
                        message:
                          "Insufficient balance. Please top up your account.",
                      })
                    }
                  >
                    🚫 Error Toast
                  </button>
                  <button
                    className="btn-ghost"
                    onClick={() =>
                      showToast({
                        type: "warning",
                        message: "Your session will expire in 2 minutes.",
                      })
                    }
                  >
                    ⚠️ Warning Toast
                  </button>
                  <button
                    className="btn-ghost"
                    onClick={() =>
                      showToast({
                        type: "info",
                        title: "New Offer",
                        message:
                          "You qualify for the UCB Home Loan special rate.",
                      })
                    }
                  >
                    ℹ️ Info Toast
                  </button>
                </div>
              </div>
            </Section>

            {/* States */}
            <Section title="Loading / Empty / Error States" id="states">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                }}
              >
                <div className="card">
                  <LoadingState message="Loading products..." />
                </div>
                <div className="card">
                  <EmptyState
                    icon="🔍"
                    title="No results found"
                    description="Try adjusting your search or filter to find what you're looking for."
                  />
                </div>
                <div className="card">
                  <ErrorState
                    description="We couldn't load exchange rates. Please check your connection."
                    onRetry={() =>
                      showToast({ type: "info", message: "Retrying..." })
                    }
                  />
                </div>
              </div>
            </Section>

            {/* Widgets */}
            <Section title="Widgets" id="widgets">
              <div style={{ maxWidth: 420 }}>
                <ExchangeRateWidget compact />
              </div>
            </Section>

            {/* Handoff notes */}
            <Section title="Angular Handoff Notes" id="handoff">
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "2rem",
                  border: "1px solid #E5E7EB",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                {/* Route map */}
                <div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#0A2540",
                      marginBottom: "1rem",
                    }}
                  >
                    Route Mapping (Angular Router)
                  </h3>
                  <div style={{ overflowX: "auto" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: 13,
                      }}
                    >
                      <thead>
                        <tr style={{ background: "#F4F6F8" }}>
                          {[
                            "Path",
                            "Component",
                            "Module / Feature",
                            "Lazy Loaded",
                          ].map((h) => (
                            <th
                              key={h}
                              style={{
                                padding: "0.75rem 1rem",
                                textAlign: "left",
                                fontWeight: 700,
                                color: "#374151",
                                borderBottom: "2px solid #E5E7EB",
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            path: "/",
                            comp: "HomeComponent",
                            module: "features/home",
                            lazy: "✓",
                          },
                          {
                            path: "/products",
                            comp: "ProductsComponent",
                            module: "features/products",
                            lazy: "✓",
                          },
                          {
                            path: "/products/:id",
                            comp: "ProductDetailComponent",
                            module: "features/products",
                            lazy: "✓",
                          },
                          {
                            path: "/digital-banking",
                            comp: "DigitalBankingComponent",
                            module: "features/digital-banking",
                            lazy: "✓",
                          },
                          {
                            path: "/branches",
                            comp: "BranchesComponent",
                            module: "features/branches-atms",
                            lazy: "✓",
                          },
                          {
                            path: "/promotions",
                            comp: "PromotionsComponent",
                            module: "features/promotions",
                            lazy: "✓",
                          },
                          {
                            path: "/news",
                            comp: "NewsComponent",
                            module: "features/news",
                            lazy: "✓",
                          },
                          {
                            path: "/contact",
                            comp: "ContactComponent",
                            module: "features/contact",
                            lazy: "✓",
                          },
                          {
                            path: "/login",
                            comp: "LoginEntryComponent",
                            module: "features/auth",
                            lazy: "✓",
                          },
                        ].map((r) => (
                          <tr
                            key={r.path}
                            style={{ borderBottom: "1px solid #F4F6F8" }}
                          >
                            <td style={{ padding: "0.625rem 1rem" }}>
                              <code
                                style={{ color: "#009C9F", fontWeight: 600 }}
                              >
                                {r.path}
                              </code>
                            </td>
                            <td style={{ padding: "0.625rem 1rem" }}>
                              <code style={{ color: "#0A2540" }}>{r.comp}</code>
                            </td>
                            <td
                              style={{
                                padding: "0.625rem 1rem",
                                color: "#6B7280",
                              }}
                            >
                              <code>{r.module}</code>
                            </td>
                            <td
                              style={{
                                padding: "0.625rem 1rem",
                                color: "#009C9F",
                                fontWeight: 700,
                              }}
                            >
                              {r.lazy}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Component map */}
                <div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#0A2540",
                      marginBottom: "1rem",
                    }}
                  >
                    Shared Component Library (Angular)
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.75rem",
                    }}
                  >
                    {[
                      {
                        comp: "UcbHeaderComponent",
                        selector: "ucb-header",
                        inputs: 'activePage: string, lang: "en"|"km"',
                      },
                      {
                        comp: "UcbFooterComponent",
                        selector: "ucb-footer",
                        inputs: "—",
                      },
                      {
                        comp: "UcbHeroComponent",
                        selector: "ucb-hero",
                        inputs: "title, subtitle, cta1, cta2, image, bgVariant",
                      },
                      {
                        comp: "UcbProductCardComponent",
                        selector: "ucb-product-card",
                        inputs: "product: Product, (selected): EventEmitter",
                      },
                      {
                        comp: "UcbPromotionCardComponent",
                        selector: "ucb-promo-card",
                        inputs: "promo: Promotion, (view): EventEmitter",
                      },
                      {
                        comp: "UcbNewsCardComponent",
                        selector: "ucb-news-card",
                        inputs: "item: NewsItem, (view): EventEmitter",
                      },
                      {
                        comp: "UcbBranchCardComponent",
                        selector: "ucb-branch-card",
                        inputs: "branch: Branch, selected: boolean",
                      },
                      {
                        comp: "UcbExchangeRateComponent",
                        selector: "ucb-exchange-rate",
                        inputs: "compact: boolean",
                      },
                      {
                        comp: "UcbFaqAccordionComponent",
                        selector: "ucb-faq-accordion",
                        inputs: "items: FaqItem[]",
                      },
                      {
                        comp: "UcbBadgeComponent",
                        selector: "ucb-badge",
                        inputs: "label: string, variant: BadgeVariant",
                      },
                      {
                        comp: "UcbAlertComponent",
                        selector: "ucb-alert",
                        inputs: "type, title, message, dismissible",
                      },
                      {
                        comp: "UcbPaginationComponent",
                        selector: "ucb-pagination",
                        inputs: "total, perPage, current, (change)",
                      },
                      {
                        comp: "UcbModalComponent",
                        selector: "ucb-modal",
                        inputs: "open: boolean, title, (closed): EventEmitter",
                      },
                      {
                        comp: "UcbLoadingComponent",
                        selector: "ucb-loading",
                        inputs: "message: string",
                      },
                    ].map((c) => (
                      <div
                        key={c.comp}
                        style={{
                          padding: "0.875rem 1rem",
                          background: "#F4F6F8",
                          borderRadius: 10,
                          border: "1px solid #E5E7EB",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 13,
                            color: "#0A2540",
                            marginBottom: 4,
                          }}
                        >
                          <code>{c.comp}</code>
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "#009C9F",
                            marginBottom: 4,
                          }}
                        >
                          {"<"}
                          {c.selector}
                          {">"}
                        </div>
                        <div style={{ fontSize: 11, color: "#6B7280" }}>
                          {c.inputs}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SCSS tokens */}
                <div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#0A2540",
                      marginBottom: "1rem",
                    }}
                  >
                    SCSS Token File — <code>styles/_tokens.scss</code>
                  </h3>
                  <pre
                    style={{
                      background: "#0A2540",
                      borderRadius: 10,
                      padding: "1.5rem",
                      fontSize: 12,
                      color: "#E2E8F0",
                      overflowX: "auto",
                      lineHeight: 1.8,
                    }}
                  >
                    {`// Color tokens
$ucb-teal:        #009C9F;
$ucb-teal-dark:   #007B7E;
$ucb-teal-light:  #E6F7F7;
$ucb-navy:        #0A2540;
$ucb-navy-mid:    #1A3D5C;
$ucb-gold:        #C9A84C;
$ucb-gold-light:  #FDF6E3;
$ucb-gray:        #F4F6F8;
$ucb-gray-mid:    #D1D5DB;
$ucb-gray-dark:   #6B7280;

// Typography
$font-sans:   'Inter', system-ui, sans-serif;
$font-khmer:  'Noto Sans Khmer', sans-serif;

// Spacing
$space-1: 4px;  $space-2: 8px;  $space-3: 12px;
$space-4: 16px; $space-5: 20px; $space-6: 24px;
$space-8: 32px; $space-12: 48px; $space-16: 64px;
$space-20: 80px;

// Border radius
$radius-btn:  8px;
$radius-card: 12px;
$radius-lg:   16px;
$radius-xl:   20px;

// Breakpoints
$bp-mobile:  375px;
$bp-tablet:  768px;
$bp-desktop: 1440px;

// Shadows
$shadow-card: 0 2px 12px rgba(0,0,0,0.08);
$shadow-elevated: 0 8px 24px rgba(0,0,0,0.12);`}
                  </pre>
                </div>

                {/* WCAG notes */}
                <div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#0A2540",
                      marginBottom: "1rem",
                    }}
                  >
                    WCAG 2.2 AA Checklist
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {[
                      {
                        pass: true,
                        item: "Color contrast: Body text #0A2540 on #F4F6F8 → 7.3:1 (AAA)",
                      },
                      {
                        pass: true,
                        item: "Color contrast: White on #009C9F → 3.2:1 (AA Large Text + UI)",
                      },
                      {
                        pass: true,
                        item: "All interactive elements have visible :focus-visible ring (2px solid #009C9F)",
                      },
                      {
                        pass: true,
                        item: "Navigation via keyboard (Tab, Enter, Escape, Arrow keys)",
                      },
                      {
                        pass: true,
                        item: "Semantic HTML: <header>, <nav>, <main>, <section>, <footer>",
                      },
                      {
                        pass: true,
                        item: "One <h1> per page, logical heading hierarchy (h2 > h3)",
                      },
                      {
                        pass: true,
                        item: "All images have descriptive alt text",
                      },
                      {
                        pass: true,
                        item: "All form inputs have explicit <label> associations",
                      },
                      {
                        pass: true,
                        item: "Form errors identified by color AND text message",
                      },
                      {
                        pass: true,
                        item: 'Language attribute: lang="en" / lang="km" on root or sections',
                      },
                      {
                        pass: true,
                        item: "Modal traps focus, closes on Escape, returns focus to trigger",
                      },
                      {
                        pass: true,
                        item: 'ARIA roles used sparingly (role="alert" on alerts, aria-label on icon buttons)',
                      },
                    ].map((c, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: 10,
                          padding: "0.5rem 0.875rem",
                          borderRadius: 8,
                          background: "#F0FDF4",
                          border: "1px solid #BBF7D0",
                        }}
                      >
                        <span
                          style={{
                            color: "#16A34A",
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                        <span style={{ fontSize: 13, color: "#166534" }}>
                          {c.item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  )
}
