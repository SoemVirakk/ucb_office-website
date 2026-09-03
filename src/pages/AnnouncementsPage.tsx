import { useState } from "react"
import {
  announcements,
  priorityConfig,
  typeConfig,
  isActive,
  type Announcement,
  type AnnouncementType,
} from "../data/announcements"
import type { Page } from "../types/navigation"


interface AnnouncementsPageProps {
  navigate: (p: Page) => void
}

type FilterType = "all" | AnnouncementType

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function formatDateTime(d: string) {
  return (
    new Date(d).toLocaleString("en-GB", {
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

export default function AnnouncementsPage({
  navigate,
}: AnnouncementsPageProps) {
  const [filter, setFilter] = useState<FilterType>("all")
  const [selected, setSelected] = useState<Announcement | null>(null)

  const filtered = announcements.filter(
    (a) => a.status === "published" && (filter === "all" || a.type === filter),
  )

  const typeFilters: { id: FilterType label: string icon: string }[] = [
    { id: "all", label: "All", icon: "📋" },
    { id: "maintenance", label: "Maintenance", icon: "🔧" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "holiday", label: "Holiday", icon: "🏖️" },
    { id: "service-update", label: "Service Update", icon: "⚡" },
    { id: "regulatory", label: "Regulatory", icon: "📜" },
  ]

  if (selected) {
    const pc = priorityConfig[selected.priority]
    const tc = typeConfig[selected.type]
    return (
      <div style={{ background: "#F4F6F8", minHeight: "100vh" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
            padding: "3rem 0 2rem",
          }}
        >
          <div className="container" style={{ maxWidth: 820 }}>
            <button
              onClick={() => setSelected(null)}
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
              ← Back to Announcements
            </button>

            {/* Priority bar */}
            <div
              style={{
                background: pc.bg,
                border: `2px solid ${pc.border}`,
                borderRadius: 10,
                padding: "0.875rem 1.25rem",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 20 }}>{pc.icon}</span>
              <div>
                <span
                  style={{ fontSize: 13, fontWeight: 800, color: pc.color }}
                >
                  {pc.label} Notice
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: pc.color,
                    marginLeft: 8,
                    opacity: 0.8,
                  }}
                >
                  {selected.type === "maintenance" && selected.maintenanceStart
                    ? `Maintenance: ${formatDateTime(selected.maintenanceStart)} – ${formatDateTime(selected.maintenanceEnd!)}`
                    : `Effective: ${formatDate(selected.startDate)} – ${formatDate(selected.endDate)}`}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: "0.875rem" }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: tc.color,
                  background: `${tc.color}18`,
                  padding: "3px 10px",
                  borderRadius: 20,
                }}
              >
                {tc.icon} {tc.label}
              </span>
              {isActive(selected) && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#065F46",
                    background: "#D1FAE5",
                    padding: "3px 10px",
                    borderRadius: 20,
                  }}
                >
                  ● Active
                </span>
              )}
            </div>

            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.3,
              }}
            >
              {selected.title}
            </h1>
            {selected.titleKm && (
              <p
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.65)",
                  marginTop: 8,
                  fontFamily: "'Noto Sans Khmer', sans-serif",
                }}
              >
                {selected.titleKm}
              </p>
            )}
          </div>
        </div>

        <div
          className="container"
          style={{ maxWidth: 820, padding: "2rem 1.5rem 4rem" }}
        >
          <div style={{ display: "grid", gap: "1.25rem" }}>
            {/* Summary card */}
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
                Summary
              </h2>
              <p style={{ fontSize: 15, color: "#1F2937", lineHeight: 1.8 }}>
                {selected.summary}
              </p>
              {selected.summaryKm && (
                <p
                  style={{
                    fontSize: 14,
                    color: "#6B7280",
                    lineHeight: 1.8,
                    marginTop: "0.75rem",
                    fontFamily: "'Noto Sans Khmer', sans-serif",
                    borderTop: "1px solid #F3F4F6",
                    paddingTop: "0.75rem",
                  }}
                >
                  {selected.summaryKm}
                </p>
              )}
            </div>

            {/* Maintenance timeline */}
            {selected.type === "maintenance" && selected.maintenanceStart && (
              <div
                style={{
                  background: "#FDF4FF",
                  borderRadius: 14,
                  padding: "1.5rem",
                  border: "1px solid #E9D5FF",
                }}
              >
                <h2
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#7C3AED",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "1rem",
                  }}
                >
                  🔧 Maintenance Schedule
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#6B7280",
                        fontWeight: 600,
                        marginBottom: 4,
                        textTransform: "uppercase",
                      }}
                    >
                      Start Time
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#7C3AED",
                      }}
                    >
                      {formatDateTime(selected.maintenanceStart)}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#6B7280",
                        fontWeight: 600,
                        marginBottom: 4,
                        textTransform: "uppercase",
                      }}
                    >
                      End Time
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#7C3AED",
                      }}
                    >
                      {formatDateTime(selected.maintenanceEnd!)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Affected services */}
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
                Affected Services
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {selected.affectedServices.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: 13,
                      background: "#FEF3C7",
                      color: "#92400E",
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontWeight: 500,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              {selected.affectedChannels && (
                <div style={{ marginTop: "0.875rem" }}>
                  <div
                    style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 6 }}
                  >
                    Affected Channels:
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                  >
                    {selected.affectedChannels.map((c) => (
                      <span
                        key={c}
                        style={{
                          fontSize: 12,
                          background: "#EDE9FE",
                          color: "#5B21B6",
                          padding: "3px 10px",
                          borderRadius: 20,
                          fontWeight: 500,
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Full content */}
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
                Full Details
              </h2>
              <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.9 }}>
                {selected.content}
              </p>
            </div>

            {/* Customer action */}
            <div
              style={{
                background: "#E6F7F7",
                borderRadius: 14,
                padding: "1.5rem",
                border: "1.5px solid #009C9F",
              }}
            >
              <h2
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#007B7E",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.75rem",
                }}
              >
                What You Should Do
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "#0A2540",
                  lineHeight: 1.7,
                  fontWeight: 500,
                }}
              >
                {selected.customerAction}
              </p>
            </div>

            {/* Support CTA */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                className="btn-primary"
                onClick={() => navigate("contact")}
              >
                Contact Customer Support
              </button>
              <button className="btn-outline" onClick={() => setSelected(null)}>
                ← Back to Announcements
              </button>
              {selected.priority === "critical" && (
                <button
                  style={{
                    padding: "0.625rem 1.25rem",
                    borderRadius: 8,
                    border: "none",
                    background: "#DC2626",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  🚨 Call Fraud Hotline: +855 23 999 911
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: "#F4F6F8", minHeight: "100vh" }}>
      {/* Page header */}
      <section
        style={{
          background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
          padding: "4rem 0 3rem",
        }}
      >
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 36 }}>📢</span>
            <div>
              <h1
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                Announcements
              </h1>
              <p
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.7)",
                  marginTop: 6,
                }}
              >
                Maintenance notices, security alerts, holidays, and service
                updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Active critical alerts pinned at top */}
      {announcements
        .filter((a) => a.priority === "critical" && isActive(a))
        .map((ann) => {
          const pc = priorityConfig[ann.priority]
          return (
            <div
              key={ann.id}
              style={{
                background: pc.bg,
                borderBottom: `2px solid ${pc.border}`,
                padding: "1rem 0",
              }}
            >
              <div className="container">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: 20 }}>{pc.icon}</span>
                  <div style={{ flex: 1 }}>
                    <span
                      style={{ fontSize: 13, fontWeight: 800, color: pc.color }}
                    >
                      {pc.label}:{" "}
                    </span>
                    <span style={{ fontSize: 13, color: pc.color }}>
                      {ann.summary}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelected(ann)}
                    style={{
                      background: pc.border,
                      border: "none",
                      color: pc.color,
                      fontWeight: 700,
                      fontSize: 12,
                      padding: "0.375rem 0.875rem",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )
        })}

      {/* Type filters */}
      <div className="container" style={{ padding: "1.5rem 1.5rem 1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {typeFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: 20,
                border: `2px solid ${filter === f.id ? "#009C9F" : "#E5E7EB"}`,
                background: filter === f.id ? "#009C9F" : "#fff",
                color: filter === f.id ? "#fff" : "#374151",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 150ms",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements list */}
      <div className="container" style={{ padding: "0.5rem 1.5rem 4rem" }}>
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem",
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #E5E7EB",
            }}
          >
            <div style={{ fontSize: 44, marginBottom: "1rem" }}>📭</div>
            <p style={{ fontSize: 15, color: "#6B7280" }}>
              No announcements in this category at this time.
            </p>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {filtered
              .sort((a, b) => {
                const order = { critical: 0, high: 1, normal: 2 }
                return order[a.priority] - order[b.priority]
              })
              .map((ann) => {
                const pc = priorityConfig[ann.priority]
                const tc = typeConfig[ann.type]
                const active = isActive(ann)
                return (
                  <button
                    key={ann.id}
                    onClick={() => setSelected(ann)}
                    style={{
                      textAlign: "left",
                      background: "#fff",
                      border: `2px solid ${
                        ann.priority === "critical" ? pc.border : "#E5E7EB"
                      }`,
                      borderRadius: 14,
                      padding: "1.5rem",
                      cursor: "pointer",
                      transition: "all 150ms",
                      borderLeft: `4px solid ${
                        ann.priority === "critical"
                          ? pc.color
                          : ann.priority === "high"
                            ? "#EA580C"
                            : "#009C9F"
                      }`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-1px)"
                      e.currentTarget.style.boxShadow =
                        "0 4px 16px rgba(0,0,0,0.08)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none"
                      e.currentTarget.style.boxShadow = "none"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                      }}
                    >
                      <div style={{ flexShrink: 0 }}>
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 10,
                            background: `${tc.color}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 20,
                          }}
                        >
                          {tc.icon}
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            marginBottom: "0.5rem",
                            flexWrap: "wrap",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 800,
                              color: pc.color,
                              background: pc.bg,
                              border: `1px solid ${pc.border}`,
                              padding: "2px 8px",
                              borderRadius: 20,
                            }}
                          >
                            {pc.icon} {pc.label}
                          </span>
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              color: tc.color,
                              background: `${tc.color}15`,
                              padding: "2px 8px",
                              borderRadius: 20,
                            }}
                          >
                            {tc.label}
                          </span>
                          {active && (
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "#065F46",
                                background: "#D1FAE5",
                                padding: "2px 8px",
                                borderRadius: 20,
                              }}
                            >
                              ● Active Now
                            </span>
                          )}
                        </div>
                        <h3
                          style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: "#0A2540",
                            lineHeight: 1.4,
                            marginBottom: "0.5rem",
                          }}
                        >
                          {ann.title}
                        </h3>
                        {ann.titleKm && (
                          <p
                            style={{
                              fontSize: 13,
                              color: "#6B7280",
                              marginBottom: "0.5rem",
                              fontFamily: "'Noto Sans Khmer', sans-serif",
                            }}
                          >
                            {ann.titleKm}
                          </p>
                        )}
                        <p
                          style={{
                            fontSize: 13,
                            color: "#6B7280",
                            lineHeight: 1.6,
                            marginBottom: "0.75rem",
                          }}
                        >
                          {ann.summary}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            fontSize: 12,
                            color: "#9CA3AF",
                          }}
                        >
                          <span>
                            {ann.type === "maintenance" && ann.maintenanceStart
                              ? `Maintenance: ${formatDateTime(ann.maintenanceStart)}`
                              : `${formatDate(ann.startDate)} – ${formatDate(ann.endDate)}`}
                          </span>
                          <span style={{ color: "#009C9F", fontWeight: 600 }}>
                            View Details →
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}
