import { useState } from "react"
import { leadership } from "../data/leadership"
import { milestones } from "../data/milestones"
import type { Page } from "../types/navigation"


interface AboutPageProps {
  navigate: (p: Page) => void
}

type Tab = "overview" | "leadership" | "timeline" | "governance"

const values = [
  {
    icon: "🤝",
    title: "Trust",
    desc: "We earn trust through transparency, consistency, and always acting in the best interest of our customers and communities.",
  },
  {
    icon: "💡",
    title: "Innovation",
    desc: "We embrace technology and new ideas to deliver faster, simpler, and smarter banking for every Cambodian.",
  },
  {
    icon: "🌱",
    title: "Sustainability",
    desc: "We support responsible economic growth and invest in the long-term prosperity of Cambodia.",
  },
  {
    icon: "🌏",
    title: "Inclusion",
    desc: "We serve everyone — regardless of background, location, or income level — with equal dignity and access to financial services.",
  },
  {
    icon: "⭐",
    title: "Excellence",
    desc: "We hold ourselves to the highest standards in everything we do, from customer service to risk management.",
  },
]

const awards = [
  {
    year: "2026",
    title: "Best Digital Bank Cambodia",
    body: "Global Finance Magazine",
  },
  {
    year: "2025",
    title: "Excellence in Financial Inclusion",
    body: "Asian Banking & Finance Awards",
  },
  { year: "2025", title: "Top Employer Cambodia", body: "CRF Institute" },
  {
    year: "2024",
    title: "Best SME Bank Cambodia",
    body: "The Asian Banker Awards",
  },
  { year: "2024", title: "ISO 27001 Certified", body: "Bureau Veritas" },
  {
    year: "2023",
    title: "Cambodia Green Bank of the Year",
    body: "Global Banking & Finance Review",
  },
]

const governanceDocs = [
  { title: "Annual Report 2025", size: "4.2 MB", type: "PDF", icon: "📊" },
  { title: "Annual Report 2024", size: "3.8 MB", type: "PDF", icon: "📊" },
  { title: "Annual Report 2023", size: "3.5 MB", type: "PDF", icon: "📊" },
  {
    title: "Sustainability Report 2025",
    size: "2.1 MB",
    type: "PDF",
    icon: "🌱",
  },
  {
    title: "Corporate Governance Framework",
    size: "1.4 MB",
    type: "PDF",
    icon: "📋",
  },
  { title: "Board Charter", size: "0.8 MB", type: "PDF", icon: "📋" },
  { title: "Code of Conduct", size: "1.2 MB", type: "PDF", icon: "⚖️" },
  {
    title: "Anti-Bribery & Corruption Policy",
    size: "0.6 MB",
    type: "PDF",
    icon: "🔒",
  },
  {
    title: "Environmental Policy Statement",
    size: "0.5 MB",
    type: "PDF",
    icon: "🌿",
  },
]

const csrItems = [
  {
    icon: "🎓",
    title: "UCB Scholarship Programme",
    desc: "Annual scholarships for 50 outstanding students from underprivileged backgrounds to study finance and technology.",
  },
  {
    icon: "🌾",
    title: "Rural Financial Inclusion",
    desc: "Mobile banking agents serving 60 rural communes with no physical bank access across Kampong Thom, Prey Veng, and Svay Rieng.",
  },
  {
    icon: "🌳",
    title: "Green Banking Commitment",
    desc: "Paperless banking initiatives, solar-powered branch operations, and a USD 10 million green loan facility for sustainable projects.",
  },
  {
    icon: "💊",
    title: "Employee Wellness Fund",
    desc: "Support for staff and their families facing medical emergencies, contributing to UCB's commitment to people-first culture.",
  },
]

export default function AboutPage({ navigate }: AboutPageProps) {
  const [tab, setTab] = useState<Tab>("overview")
  const [expandedMember, setExpandedMember] = useState<string | null>(null)

  const tabs: { id: Tab label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "leadership", label: "Leadership" },
    { id: "timeline", label: "Our Journey" },
    { id: "governance", label: "Governance & Reports" },
  ]

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
              "radial-gradient(circle at 1px 1px, rgba(0,156,159,0.08) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="container"
          style={{ position: "relative", zIndex: 1, maxWidth: 760 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(201,168,76,0.2)",
              borderRadius: 20,
              padding: "4px 14px",
              marginBottom: "1.25rem",
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 600, color: "#C9A84C" }}>
              Founded 2008 · Licensed by NBC
            </span>
          </div>
          <h1
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
            }}
          >
            Cambodia's Bank for the
            <br />
            <span style={{ color: "#009C9F" }}>Next Generation</span>
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7,
            }}
          >
            Union Commercial Bank (UCB) was founded with a clear purpose: to
            make world-class banking accessible to every Cambodian — from the
            cities to the countryside, from large corporations to small family
            businesses.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background: "#009C9F", padding: "2rem 0" }}>
        <div className="container">
          <div
            className="grid-4"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
              textAlign: "center",
            }}
          >
            {[
              { value: "200,000+", label: "Active Customers" },
              { value: "28", label: "Branch Locations" },
              { value: "85+", label: "ATMs Nationwide" },
              { value: "800+", label: "Team Members" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: "#fff",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #E5E7EB",
          position: "sticky",
          top: 68,
          zIndex: 10,
        }}
      >
        <div className="container">
          <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  padding: "1.125rem 1.5rem",
                  fontSize: 14,
                  fontWeight: tab === t.id ? 700 : 500,
                  color: tab === t.id ? "#009C9F" : "#6B7280",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  borderBottom:
                    tab === t.id
                      ? "3px solid #009C9F"
                      : "3px solid transparent",
                  whiteSpace: "nowrap",
                  transition: "all 150ms",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overview Tab */}
      {tab === "overview" && (
        <div>
          <section className="page-section">
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
                  <h2
                    className="section-title"
                    style={{ marginBottom: "1rem" }}
                  >
                    Our Vision
                  </h2>
                  <p
                    style={{
                      fontSize: 16,
                      color: "#374151",
                      lineHeight: 1.8,
                      marginBottom: "1.75rem",
                    }}
                  >
                    To be Cambodia's most trusted, innovative, and inclusive
                    bank — a financial institution that uplifts every Cambodian
                    family and powers every Cambodian business.
                  </p>
                  <h2
                    className="section-title"
                    style={{ marginBottom: "1rem" }}
                  >
                    Our Mission
                  </h2>
                  <p
                    style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}
                  >
                    We deliver simple, secure, and accessible banking services
                    that help people save, borrow, transact, and grow — powered
                    by technology, guided by trust, and anchored in Cambodia.
                  </p>
                </div>
                <div
                  style={{ borderRadius: 20, overflow: "hidden", height: 400 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=640&h=460&fit=crop&auto=format"
                    alt="Phnom Penh cityscape"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="page-section" style={{ background: "#F4F6F8" }}>
            <div className="container">
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h2 className="section-title">Our Values</h2>
                <p className="section-subtitle">
                  Five principles that guide every decision we make.
                </p>
              </div>
              <div
                className="grid-5"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "1.25rem",
                }}
              >
                {values.map((v) => (
                  <div
                    key={v.title}
                    style={{
                      padding: "1.75rem 1.25rem",
                      background: "#fff",
                      borderRadius: 16,
                      textAlign: "center",
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: "0.875rem" }}>
                      {v.icon}
                    </div>
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#0A2540",
                        marginBottom: 8,
                      }}
                    >
                      {v.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#6B7280",
                        lineHeight: 1.6,
                      }}
                    >
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CSR */}
          <section className="page-section">
            <div className="container">
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h2 className="section-title">Community & Sustainability</h2>
                <p className="section-subtitle">
                  Banking with purpose — giving back to Cambodia.
                </p>
              </div>
              <div
                className="grid-4"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "1.5rem",
                }}
              >
                {csrItems.map((item) => (
                  <div
                    key={item.title}
                    style={{
                      padding: "1.5rem",
                      background: "#fff",
                      borderRadius: 16,
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: "0.875rem" }}>
                      {item.icon}
                    </div>
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#0A2540",
                        marginBottom: 8,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#6B7280",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Awards */}
          <section className="page-section" style={{ background: "#F4F6F8" }}>
            <div className="container">
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h2 className="section-title">Awards & Recognition</h2>
                <p className="section-subtitle">
                  Independently recognised for excellence in banking.
                </p>
              </div>
              <div
                className="grid-3"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1.25rem",
                }}
              >
                {awards.map((a, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "1.5rem",
                      background: "#fff",
                      borderRadius: 16,
                      border: "1px solid #E5E7EB",
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: "#FDF6E3",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                        flexShrink: 0,
                      }}
                    >
                      🏆
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#C9A84C",
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        {a.year}
                      </div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: "#0A2540",
                          marginBottom: 4,
                        }}
                      >
                        {a.title}
                      </div>
                      <div style={{ fontSize: 13, color: "#6B7280" }}>
                        {a.body}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Leadership Tab */}
      {tab === "leadership" && (
        <section className="page-section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 className="section-title">Executive Leadership</h2>
              <p className="section-subtitle">
                The experienced team guiding UCB's strategy and operations.
              </p>
            </div>

            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#6B7280",
                letterSpacing: 0.5,
                marginBottom: "1.5rem",
              }}
            >
              EXECUTIVE COMMITTEE
            </h3>
            <div
              className="grid-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5rem",
                marginBottom: "3rem",
              }}
            >
              {leadership
                .filter((m) => m.category === "executive")
                .map((member) => (
                  <div
                    key={member.id}
                    className="card"
                    style={{ padding: "1.5rem", cursor: "pointer" }}
                    onClick={() =>
                      setExpandedMember(
                        expandedMember === member.id ? null : member.id,
                      )
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: "50%",
                          objectFit: "cover",
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 16,
                            color: "#0A2540",
                          }}
                        >
                          {member.name}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            color: "#009C9F",
                            fontWeight: 500,
                            lineHeight: 1.4,
                          }}
                        >
                          {member.title}
                        </div>
                      </div>
                    </div>
                    {expandedMember === member.id && (
                      <p
                        style={{
                          fontSize: 13,
                          color: "#6B7280",
                          lineHeight: 1.7,
                          borderTop: "1px solid #F4F6F8",
                          paddingTop: "1rem",
                        }}
                      >
                        {member.bio}
                      </p>
                    )}
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#009C9F",
                        fontSize: 12,
                        cursor: "pointer",
                        padding: 0,
                        marginTop: 4,
                      }}
                    >
                      {expandedMember === member.id ? "▲ Less" : "▼ Read bio"}
                    </button>
                  </div>
                ))}
            </div>

            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#6B7280",
                letterSpacing: 0.5,
                marginBottom: "1.5rem",
              }}
            >
              BOARD OF DIRECTORS
            </h3>
            <div
              className="grid-2"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
            >
              {leadership
                .filter((m) => m.category === "board")
                .map((member) => (
                  <div
                    key={member.id}
                    className="card"
                    style={{ padding: "1.5rem" }}
                  >
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <img
                        src={member.image}
                        alt={member.name}
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: "50%",
                          objectFit: "cover",
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 16,
                            color: "#0A2540",
                            marginBottom: 4,
                          }}
                        >
                          {member.name}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            color: "#009C9F",
                            fontWeight: 500,
                            marginBottom: 8,
                          }}
                        >
                          {member.title}
                        </div>
                        <p
                          style={{
                            fontSize: 13,
                            color: "#6B7280",
                            lineHeight: 1.6,
                          }}
                        >
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Timeline Tab */}
      {tab === "timeline" && (
        <section className="page-section">
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <h2 className="section-title">UCB's Journey</h2>
              <p className="section-subtitle">
                From a single branch in 2008 to Cambodia's digital banking
                leader.
              </p>
            </div>
            <div style={{ position: "relative", paddingLeft: 24 }}>
              {/* Vertical line */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: "linear-gradient(to bottom, #009C9F, #E5E7EB)",
                }}
              />
              {milestones.map((m, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    marginBottom: "2rem",
                    paddingLeft: "2rem",
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: -11,
                      top: 6,
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: m.highlight ? "#009C9F" : "#fff",
                      border: `3px solid ${
                        m.highlight ? "#009C9F" : "#D1D5DB"
                      }`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                    }}
                  />
                  <div
                    className="card"
                    style={{
                      padding: "1.25rem 1.5rem",
                      borderLeft: m.highlight ? "4px solid #009C9F" : "none",
                      background: m.highlight ? "#E6F7F7" : "#fff",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{m.icon}</span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: m.highlight ? "#007B7E" : "#9CA3AF",
                          letterSpacing: 0.5,
                        }}
                      >
                        {m.year}
                      </span>
                      {m.highlight && (
                        <span
                          style={{
                            fontSize: 11,
                            background: "#009C9F",
                            color: "#fff",
                            borderRadius: 4,
                            padding: "1px 6px",
                            fontWeight: 600,
                          }}
                        >
                          MILESTONE
                        </span>
                      )}
                    </div>
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#0A2540",
                        marginBottom: 6,
                      }}
                    >
                      {m.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "#6B7280",
                        lineHeight: 1.6,
                      }}
                    >
                      {m.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Governance Tab */}
      {tab === "governance" && (
        <section className="page-section">
          <div className="container">
            <div
              className="grid-2-col"
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "3rem",
                alignItems: "start",
              }}
            >
              <div>
                <h2
                  className="section-title"
                  style={{ marginBottom: "0.75rem" }}
                >
                  Corporate Governance
                </h2>
                <p
                  style={{
                    fontSize: 15,
                    color: "#6B7280",
                    lineHeight: 1.7,
                    marginBottom: "2rem",
                  }}
                >
                  UCB is fully licensed and regulated by the National Bank of
                  Cambodia (NBC). We are committed to the highest standards of
                  corporate governance, financial transparency, and responsible
                  banking.
                </p>

                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: "1.25rem",
                  }}
                >
                  Annual Reports & Documents
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    marginBottom: "3rem",
                  }}
                >
                  {governanceDocs.map((doc, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "1rem 1.25rem",
                        background: "#fff",
                        borderRadius: 12,
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: 12,
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontSize: 20 }}>{doc.icon}</span>
                        <div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "#0A2540",
                            }}
                          >
                            {doc.title}
                          </div>
                          <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                            {doc.type} · {doc.size}
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn-outline"
                        style={{ fontSize: 12, padding: "0.375rem 0.875rem" }}
                      >
                        ⬇ Download
                      </button>
                    </div>
                  ))}
                </div>

                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: "1.25rem",
                  }}
                >
                  Regulatory Disclosures
                </h3>
                <div
                  style={{
                    padding: "1.25rem",
                    background: "#E6F7F7",
                    borderRadius: 12,
                    border: "1px solid #B2E4E5",
                  }}
                >
                  <p
                    style={{ fontSize: 14, color: "#007B7E", lineHeight: 1.7 }}
                  >
                    Union Commercial Bank (Cambodia) Plc. is licensed by the
                    National Bank of Cambodia (NBC). Banking Licence No.
                    NBC-B00056. Registered under the Ministry of Commerce,
                    Cambodia. Registration No. Co-1234 / 2008. Member of the
                    Cambodia Deposit Guarantee Corporation (CDGC) — deposits
                    insured up to KHR 30,000,000 (approximately USD 7,500).
                  </p>
                </div>
              </div>

              <div>
                <div
                  className="card"
                  style={{ padding: "1.5rem", marginBottom: "1rem" }}
                >
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#0A2540",
                      marginBottom: "1rem",
                    }}
                  >
                    Board Committees
                  </h3>
                  {[
                    { name: "Board Audit Committee", chair: "Dr. Piseth Lim" },
                    { name: "Board Risk Committee", chair: "H.E. Bopha Meas" },
                    {
                      name: "Board Remuneration Committee",
                      chair: "Dr. Piseth Lim",
                    },
                    {
                      name: "Board Credit Committee",
                      chair: "H.E. Bopha Meas",
                    },
                  ].map((c) => (
                    <div
                      key={c.name}
                      style={{
                        padding: "0.75rem 0",
                        borderBottom: "1px solid #F4F6F8",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#0A2540",
                        }}
                      >
                        {c.name}
                      </div>
                      <div
                        style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}
                      >
                        Chair: {c.chair}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card" style={{ padding: "1.5rem" }}>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#0A2540",
                      marginBottom: "1rem",
                    }}
                  >
                    Whistle-blower Channel
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#6B7280",
                      lineHeight: 1.6,
                      marginBottom: "1rem",
                    }}
                  >
                    UCB encourages staff, customers, and the public to report
                    suspected misconduct, fraud, or ethical violations
                    confidentially.
                  </p>
                  <button
                    className="btn-outline"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      fontSize: 13,
                    }}
                    onClick={() => navigate("contact")}
                  >
                    Submit a Report →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
