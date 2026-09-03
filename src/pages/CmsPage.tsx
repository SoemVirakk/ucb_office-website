import { useState } from "react"
import {
  banners,
  statusColors,
  type Banner,
  type ContentStatus,
} from "../data/banners"
import {
  announcements,
  priorityConfig,
  typeConfig,
  type Announcement,
  type AnnouncementPriority,
  type AnnouncementType,
} from "../data/announcements"
import { promotions, type Promotion } from "../data/promotions"
import { news, type NewsItem } from "../data/news"

type CmsSection = "dashboard" | "banners" | "promotions" | "news" | "announcements"
type BannerView = "list" | "create" | "preview"
type PromoView = "list" | "edit"
type NewsView = "list" | "edit"
type AnnView = "list" | "create" | "confirm-critical"

interface CmsPageProps {
  navigate: (
    p: "home" | "products" | "digital-banking" | "branches" | "promotions" | "contact" | "login" | "design-system" | "careers" | "about" | "rates" | "online-services" | "security" | "search" | "not-found" | "news" | "announcements" | "cms",
  ) => void
}

const navItems: { id: CmsSection label: string icon: string }[] = [
  { id: "dashboard", label: "Content Dashboard", icon: "📊" },
  { id: "banners", label: "Banner Management", icon: "🖼️" },
  { id: "promotions", label: "Promotions", icon: "🎁" },
  { id: "news", label: "News Articles", icon: "📰" },
  { id: "announcements", label: "Announcements", icon: "📢" },
]

function StatusBadge({ status }: { status: ContentStatus }) {
  const cfg = statusColors[status]
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: cfg.color,
        background: cfg.bg,
        padding: "2px 8px",
        borderRadius: 20,
        whiteSpace: "nowrap",
      }}
    >
      {cfg.label}
    </span>
  )
}

function KpiCard({
  icon,
  label,
  value,
  delta,
  color,
}: {
  icon: string
  label: string
  value: string | number
  delta?: string
  color: string
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: "1.25rem 1.5rem",
        border: "1px solid #E5E7EB",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "0.75rem",
        }}
      >
        <div
          style={{
            fontSize: 22,
            width: 44,
            height: 44,
            borderRadius: 10,
            background: `${color}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        {delta && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: delta.startsWith("+") ? "#059669" : "#DC2626",
              background: delta.startsWith("+") ? "#D1FAE5" : "#FEE2E2",
              padding: "2px 8px",
              borderRadius: 20,
            }}
          >
            {delta}
          </span>
        )}
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: "#0A2540",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>
        {label}
      </div>
    </div>
  )
}

function ContentDashboard({
  setSection,
}: {
  setSection: (s: CmsSection) => void
}) {
  const published = [
    ...banners.filter((b) => b.status === "published"),
    ...promotions.filter((p) => p.status === "active"),
    ...announcements.filter((a) => a.status === "published"),
    ...news,
  ].length
  const draft = [...banners, ...announcements].filter(
    (i) => i.status === "draft",
  ).length
  const scheduled = announcements.filter((a) => a.status === "scheduled").length
  const pending = 3

  const recentActivity = [
    {
      type: "Banner",
      action: "Published",
      item: "Zero Transfer Fees — September Campaign",
      time: "2 hours ago",
      user: "Admin",
    },
    {
      type: "Announcement",
      action: "Published",
      item: "Security Alert: Phishing Campaign",
      time: "4 hours ago",
      user: "Compliance Team",
    },
    {
      type: "News",
      action: "Draft saved",
      item: "UCB Opens 29th Branch in Battambang",
      time: "6 hours ago",
      user: "Communications",
    },
    {
      type: "Promotion",
      action: "Submitted for approval",
      item: "Q4 Deposit Bonus Rate — 8.0% p.a.",
      time: "1 day ago",
      user: "Marketing",
    },
    {
      type: "Banner",
      action: "Scheduled",
      item: "Khmer New Year 2027 Campaign",
      time: "2 days ago",
      user: "Admin",
    },
  ]

  const typeColors: Record<string, string> = {
    Banner: "#7C3AED",
    Announcement: "#DC2626",
    News: "#2563EB",
    Promotion: "#D97706",
  }

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0A2540" }}>
          Content Dashboard
        </h1>
        <p style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>
          Overview of all content across UCB public website channels.
        </p>
      </div>

      {/* KPIs */}
      <div
        className="grid-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <KpiCard
          icon="✅"
          label="Published Content"
          value={published}
          delta="+3 this week"
          color="#059669"
        />
        <KpiCard
          icon="📝"
          label="Draft Content"
          value={draft}
          color="#6B7280"
        />
        <KpiCard
          icon="⏰"
          label="Scheduled Items"
          value={scheduled}
          color="#7C3AED"
        />
        <KpiCard
          icon="🔔"
          label="Pending Approvals"
          value={pending}
          delta="Action needed"
          color="#EA580C"
        />
      </div>

      {/* Quick actions */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: "1.5rem",
          border: "1px solid #E5E7EB",
          marginBottom: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#0A2540",
            marginBottom: "1rem",
          }}
        >
          Quick Actions
        </h2>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {[
            {
              icon: "🖼️",
              label: "Create Banner",
              section: "banners" as CmsSection,
            },
            {
              icon: "🎁",
              label: "Create Promotion",
              section: "promotions" as CmsSection,
            },
            {
              icon: "📰",
              label: "Write News Article",
              section: "news" as CmsSection,
            },
            {
              icon: "📢",
              label: "Post Announcement",
              section: "announcements" as CmsSection,
            },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => setSection(a.section)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "0.625rem 1.25rem",
                borderRadius: 10,
                border: "1.5px solid #E5E7EB",
                background: "#F9FAFB",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                color: "#0A2540",
                transition: "all 150ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#009C9F"
                e.currentTarget.style.background = "#E6F7F7"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E5E7EB"
                e.currentTarget.style.background = "#F9FAFB"
              }}
            >
              {a.icon} {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content lifecycle legend */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: "1.25rem 1.5rem",
          border: "1px solid #E5E7EB",
          marginBottom: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#0A2540",
            marginBottom: "0.875rem",
          }}
        >
          Content Lifecycle
        </h2>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {([
            "draft",
            "pending",
            "scheduled",
            "published",
            "expired",
            "archived",
          ] as ContentStatus[]).map((s, i, arr) => (
            <>
              <StatusBadge key={s} status={s} />
              {i < arr.length - 1 && (
                <span
                  key={`arrow-${s}`}
                  style={{ color: "#D1D5DB", fontSize: 14 }}
                >
                  →
                </span>
              )}
            </>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          border: "1px solid #E5E7EB",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0A2540" }}>
            Recent Activity
          </h2>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9FAFB" }}>
              {["Type", "Action", "Content", "By", "When"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "0.625rem 1rem",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    textAlign: "left",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((row, i) => (
              <tr
                key={i}
                style={{ borderTop: "1px solid #F3F4F6" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#F9FAFB")
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = "")}
              >
                <td style={{ padding: "0.875rem 1rem" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: typeColors[row.type],
                      background: `${typeColors[row.type]}15`,
                      padding: "2px 8px",
                      borderRadius: 20,
                    }}
                  >
                    {row.type}
                  </span>
                </td>
                <td
                  style={{
                    padding: "0.875rem 1rem",
                    fontSize: 13,
                    color: "#374151",
                    fontWeight: 500,
                  }}
                >
                  {row.action}
                </td>
                <td
                  style={{
                    padding: "0.875rem 1rem",
                    fontSize: 13,
                    color: "#0A2540",
                    maxWidth: 240,
                  }}
                >
                  {row.item}
                </td>
                <td
                  style={{
                    padding: "0.875rem 1rem",
                    fontSize: 12,
                    color: "#6B7280",
                  }}
                >
                  {row.user}
                </td>
                <td
                  style={{
                    padding: "0.875rem 1rem",
                    fontSize: 12,
                    color: "#9CA3AF",
                  }}
                >
                  {row.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function BannerManagement() {
  const [view, setView] = useState<BannerView>("list")
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">(
    "desktop",
  )
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    ctaLabel: "Learn More",
    ctaTarget: "promotions",
    placement: "homepage-hero",
    displayOrder: 1,
    status: "draft" as ContentStatus,
    startDate: "",
    endDate: "",
    desktopImageUrl:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1440&h=600&fit=crop&auto=format",
    mobileImageUrl:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=768&h=500&fit=crop&auto=format",
  })

  if (view === "preview") {
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: "1.5rem",
          }}
        >
          <button
            onClick={() => setView("create")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#009C9F",
              fontSize: 14,
              fontWeight: 600,
              padding: 0,
            }}
          >
            ← Back to Edit
          </button>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A2540" }}>
            Banner Preview
          </h2>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
          {(["desktop", "mobile"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setPreviewDevice(d)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: 20,
                border: `2px solid ${
                  previewDevice === d ? "#009C9F" : "#E5E7EB"
                }`,
                background: previewDevice === d ? "#009C9F" : "#fff",
                color: previewDevice === d ? "#fff" : "#374151",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {d === "desktop" ? "🖥 Desktop" : "📱 Mobile"}
            </button>
          ))}
        </div>
        <div
          style={{
            maxWidth: previewDevice === "mobile" ? 375 : "100%",
            margin: "0 auto",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            border: "2px solid #E5E7EB",
          }}
        >
          <div
            style={{
              position: "relative",
              height: previewDevice === "mobile" ? 300 : 400,
            }}
          >
            <img
              src={
                previewDevice === "mobile"
                  ? form.mobileImageUrl
                  : form.desktopImageUrl
              }
              alt={form.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(10,37,64,0.85) 0%, rgba(10,37,64,0.3) 100%)",
                display: "flex",
                alignItems: "center",
                padding: previewDevice === "mobile" ? "1.5rem" : "3rem",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: previewDevice === "mobile" ? 20 : 32,
                    fontWeight: 800,
                    color: "#fff",
                    lineHeight: 1.2,
                    marginBottom: "0.75rem",
                  }}
                >
                  {form.title || "Banner Title"}
                </h2>
                <p
                  style={{
                    fontSize: previewDevice === "mobile" ? 13 : 16,
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.6,
                    marginBottom: "1rem",
                    maxWidth: 420,
                  }}
                >
                  {form.subtitle || "Banner subtitle text goes here."}
                </p>
                <button
                  style={{
                    padding: "0.625rem 1.25rem",
                    borderRadius: 8,
                    border: "none",
                    background: "#009C9F",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {form.ctaLabel} →
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <button
            className="btn-primary"
            onClick={() => {
              setView("list")
            }}
          >
            Publish Banner
          </button>
        </div>
      </div>
    )
  }

  if (view === "create") {
    const Field = ({
      label,
      children,
      required,
    }: {
      label: string
      children: React.ReactNode
      required?: boolean
    }) => (
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
          {label}
          {required && <span style={{ color: "#DC2626" }}> *</span>}
        </label>
        {children}
      </div>
    )
    const inputStyle: React.CSSProperties = {
      width: "100%",
      padding: "0.625rem 0.875rem",
      borderRadius: 8,
      border: "1.5px solid #E5E7EB",
      fontSize: 14,
      outline: "none",
      fontFamily: "inherit",
      boxSizing: "border-box",
    }
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: "1.5rem",
          }}
        >
          <button
            onClick={() => setView("list")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#009C9F",
              fontSize: 14,
              fontWeight: 600,
              padding: 0,
            }}
          >
            ← Back to Banners
          </button>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A2540" }}>
            Create Banner
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "1.5rem",
            alignItems: "start",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "1.5rem",
              border: "1px solid #E5E7EB",
              display: "grid",
              gap: "1.25rem",
            }}
          >
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                margin: 0,
              }}
            >
              Content
            </h3>
            <Field label="Banner Title" required>
              <input
                style={inputStyle}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Zero Transfer Fees — All of September"
              />
            </Field>
            <Field label="Subtitle / Description">
              <textarea
                style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="Short descriptive text shown below the title."
              />
            </Field>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <Field label="CTA Button Label" required>
                <input
                  style={inputStyle}
                  value={form.ctaLabel}
                  onChange={(e) =>
                    setForm({ ...form, ctaLabel: e.target.value })
                  }
                  placeholder="e.g. Learn More"
                />
              </Field>
              <Field label="Link Target">
                <select
                  style={inputStyle}
                  value={form.ctaTarget}
                  onChange={(e) =>
                    setForm({ ...form, ctaTarget: e.target.value })
                  }
                >
                  <option value="promotions">Promotions Page</option>
                  <option value="products">Products Page</option>
                  <option value="digital-banking">Digital Banking</option>
                  <option value="online-services">Online Services</option>
                  <option value="rates">Rates & Calculators</option>
                  <option value="contact">Contact Us</option>
                </select>
              </Field>
            </div>

            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                margin: "0.5rem 0 0",
              }}
            >
              Images
            </h3>
            <Field label="Desktop Image URL (1440×600px recommended)" required>
              <input
                style={inputStyle}
                value={form.desktopImageUrl}
                onChange={(e) =>
                  setForm({ ...form, desktopImageUrl: e.target.value })
                }
                placeholder="https://..."
              />
            </Field>
            <Field label="Mobile Image URL (768×500px recommended)">
              <input
                style={inputStyle}
                value={form.mobileImageUrl}
                onChange={(e) =>
                  setForm({ ...form, mobileImageUrl: e.target.value })
                }
                placeholder="https://..."
              />
            </Field>
            <div
              style={{
                background: "#F4F6F8",
                borderRadius: 10,
                padding: "0.75rem",
                fontSize: 12,
                color: "#6B7280",
                lineHeight: 1.6,
              }}
            >
              💡 Upload images to your CDN and paste the URL above. Recommended
              formats: WebP or JPG. Max file size: 500KB per image.
            </div>
          </div>

          <div style={{ display: "grid", gap: "1rem" }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "1.25rem",
                border: "1px solid #E5E7EB",
                display: "grid",
                gap: "1rem",
              }}
            >
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#6B7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  margin: 0,
                }}
              >
                Settings
              </h3>
              <Field label="Placement">
                <select
                  style={inputStyle}
                  value={form.placement}
                  onChange={(e) =>
                    setForm({ ...form, placement: e.target.value })
                  }
                >
                  <option value="homepage-hero">Homepage Hero Carousel</option>
                  <option value="homepage-section">Homepage Section</option>
                  <option value="product-page">Product Page</option>
                </select>
              </Field>
              <Field label="Display Order">
                <input
                  type="number"
                  style={inputStyle}
                  value={form.displayOrder}
                  onChange={(e) =>
                    setForm({ ...form, displayOrder: +e.target.value })
                  }
                  min={1}
                  max={20}
                />
              </Field>
              <Field label="Status">
                <select
                  style={inputStyle}
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as ContentStatus,
                    })
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="pending">Submit for Approval</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Publish Now</option>
                </select>
              </Field>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                }}
              >
                <Field label="Start Date">
                  <input
                    type="date"
                    style={inputStyle}
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                  />
                </Field>
                <Field label="End Date">
                  <input
                    type="date"
                    style={inputStyle}
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                  />
                </Field>
              </div>
            </div>
            <button
              className="btn-outline"
              onClick={() => setView("preview")}
              style={{ width: "100%", justifyContent: "center" }}
            >
              🖥 Preview Banner
            </button>
            <button
              className="btn-primary"
              onClick={() => setView("list")}
              style={{ width: "100%", justifyContent: "center" }}
            >
              Save Banner
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0A2540" }}>
          Banner Management
        </h1>
        <button className="btn-primary" onClick={() => setView("create")}>
          + Create Banner
        </button>
      </div>
      <div style={{ display: "grid", gap: "1rem" }}>
        {banners.map((b) => (
          <div
            key={b.id}
            style={{
              background: "#fff",
              borderRadius: 12,
              border: "1px solid #E5E7EB",
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "160px 1fr auto",
              alignItems: "center",
            }}
          >
            <img
              src={b.mobileImage}
              alt={b.title}
              style={{
                width: "100%",
                height: 80,
                objectFit: "cover",
                display: "block",
              }}
            />
            <div style={{ padding: "1rem 1.25rem" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                <StatusBadge status={b.status} />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#7C3AED",
                    background: "#F3E8FF",
                    padding: "2px 8px",
                    borderRadius: 20,
                  }}
                >
                  {b.placement === "homepage-hero"
                    ? "Homepage Hero"
                    : b.placement === "homepage-section"
                      ? "Homepage Section"
                      : "Product Page"}
                </span>
                <span
                  style={{ fontSize: 11, fontWeight: 600, color: "#6B7280" }}
                >
                  Order #{b.displayOrder}
                </span>
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: 4,
                }}
              >
                {b.title}
              </div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>
                {b.startDate} — {b.endDate}
              </div>
            </div>
            <div style={{ padding: "1rem", display: "flex", gap: 8 }}>
              <button
                onClick={() => setView("create")}
                style={{
                  padding: "0.4rem 0.875rem",
                  borderRadius: 8,
                  border: "1.5px solid #E5E7EB",
                  background: "#fff",
                  fontSize: 12,
                  cursor: "pointer",
                  fontWeight: 600,
                  color: "#374151",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => setView("preview")}
                style={{
                  padding: "0.4rem 0.875rem",
                  borderRadius: 8,
                  border: "1.5px solid #009C9F",
                  background: "#E6F7F7",
                  fontSize: 12,
                  cursor: "pointer",
                  fontWeight: 600,
                  color: "#007B7E",
                }}
              >
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PromotionManagement() {
  const [view, setView] = useState<PromoView>("list")
  const [selected, setSelected] = useState<Promotion | null>(null)
  const [form, setForm] = useState({
    title: "",
    summary: "",
    description: "",
    ctaLabel: "Apply Now",
    status: "draft" as ContentStatus,
    startDate: "",
    endDate: "",
  })
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.625rem 0.875rem",
    borderRadius: 8,
    border: "1.5px solid #E5E7EB",
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  }

  if (view === "edit") {
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: "1.5rem",
          }}
        >
          <button
            onClick={() => setView("list")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#009C9F",
              fontSize: 14,
              fontWeight: 600,
              padding: 0,
            }}
          >
            ← Back to Promotions
          </button>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A2540" }}>
            {selected ? `Edit: ${selected.title}` : "Create Promotion"}
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 280px",
            gap: "1.5rem",
            alignItems: "start",
          }}
        >
          <div style={{ display: "grid", gap: "1.25rem" }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "1.5rem",
                border: "1px solid #E5E7EB",
                display: "grid",
                gap: "1rem",
              }}
            >
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#6B7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  margin: 0,
                }}
              >
                Basic Information
              </h3>
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
                  Promotion Title *
                </label>
                <input
                  style={inputStyle}
                  value={selected?.title ?? form.title}
                  placeholder="e.g. 5% Cashback on Dining"
                  readOnly={!!selected}
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
                  Short Summary (shown on cards)
                </label>
                <input
                  style={inputStyle}
                  value={selected?.summary ?? form.summary}
                  placeholder="One-line description"
                  readOnly={!!selected}
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
                  Full Description (rich content)
                </label>
                <textarea
                  style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
                  defaultValue={selected?.description ?? ""}
                  placeholder="Full promotion details..."
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
                  Eligibility Criteria
                </label>
                <textarea
                  style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                  placeholder="Enter each criterion on a new line..."
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
                  Terms & Conditions
                </label>
                <textarea
                  style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                  placeholder="Full legal terms and conditions..."
                />
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "1.25rem",
                border: "1px solid #E5E7EB",
                display: "grid",
                gap: "0.875rem",
              }}
            >
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#6B7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  margin: 0,
                }}
              >
                Settings
              </h3>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 4,
                  }}
                >
                  CTA Label
                </label>
                <input style={inputStyle} defaultValue={form.ctaLabel} />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 4,
                  }}
                >
                  Status
                </label>
                <select style={inputStyle}>
                  <option>Draft</option>
                  <option>Submit for Approval</option>
                  <option>Scheduled</option>
                  <option>Published</option>
                </select>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.5rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: 4,
                    }}
                  >
                    Start
                  </label>
                  <input type="date" style={inputStyle} />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: 4,
                    }}
                  >
                    End
                  </label>
                  <input type="date" style={inputStyle} />
                </div>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 4,
                  }}
                >
                  Category
                </label>
                <select style={inputStyle}>
                  <option value="digital">Digital Banking</option>
                  <option value="card">Cards</option>
                  <option value="loan">Loans</option>
                  <option value="deposit">Deposits</option>
                  <option value="retail">Retail Banking</option>
                </select>
              </div>
            </div>
            <button
              className="btn-primary"
              onClick={() => setView("list")}
              style={{ width: "100%", justifyContent: "center" }}
            >
              Save Promotion
            </button>
            <button
              className="btn-outline"
              onClick={() => setView("list")}
              style={{ width: "100%", justifyContent: "center" }}
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0A2540" }}>
          Promotions
        </h1>
        <button
          className="btn-primary"
          onClick={() => {
            setSelected(null)
            setView("edit")
          }}
        >
          + Create Promotion
        </button>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          border: "1px solid #E5E7EB",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9FAFB" }}>
              {["", "Title", "Category", "Period", "Status", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "0.75rem 1rem",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      textAlign: "left",
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {promotions.map((p) => (
              <tr
                key={p.id}
                style={{ borderTop: "1px solid #F3F4F6" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#F9FAFB")
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = "")}
              >
                <td style={{ padding: "0.75rem 1rem", width: 60 }}>
                  <img
                    src={p.image}
                    alt=""
                    style={{
                      width: 48,
                      height: 36,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: "#0A2540" }}
                  >
                    {p.title}
                  </div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
                    {p.summary.slice(0, 60)}...
                  </div>
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#7C3AED",
                      background: "#F3E8FF",
                      padding: "2px 8px",
                      borderRadius: 20,
                    }}
                  >
                    {p.category.charAt(0).toUpperCase() + p.category.slice(1)}
                  </span>
                </td>
                <td
                  style={{
                    padding: "0.75rem 1rem",
                    fontSize: 12,
                    color: "#6B7280",
                  }}
                >
                  Until {p.expiresAt}
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <StatusBadge
                    status={
                      p.status === "active"
                        ? "published"
                        : p.status === "upcoming"
                          ? "scheduled"
                          : "expired"
                    }
                  />
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => {
                        setSelected(p)
                        setView("edit")
                      }}
                      style={{
                        padding: "0.35rem 0.75rem",
                        borderRadius: 6,
                        border: "1.5px solid #E5E7EB",
                        background: "#fff",
                        fontSize: 11,
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function NewsManagement() {
  const [view, setView] = useState<NewsView>("list")
  const [selected, setSelected] = useState<NewsItem | null>(null)
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.625rem 0.875rem",
    borderRadius: 8,
    border: "1.5px solid #E5E7EB",
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  }

  if (view === "edit") {
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: "1.5rem",
          }}
        >
          <button
            onClick={() => setView("list")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#009C9F",
              fontSize: 14,
              fontWeight: 600,
              padding: 0,
            }}
          >
            ← Back to Articles
          </button>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A2540" }}>
            {selected
              ? `Edit: ${selected.title.slice(0, 40)}...`
              : "New Article"}
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 260px",
            gap: "1.5rem",
            alignItems: "start",
          }}
        >
          <div style={{ display: "grid", gap: "1.25rem" }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "1.5rem",
                border: "1px solid #E5E7EB",
                display: "grid",
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
                  Article Title *
                </label>
                <input
                  style={{ ...inputStyle, fontSize: 17, fontWeight: 700 }}
                  defaultValue={selected?.title ?? ""}
                  placeholder="Enter a compelling headline..."
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.875rem",
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
                    URL Slug
                  </label>
                  <input
                    style={inputStyle}
                    defaultValue={selected?.id ?? ""}
                    placeholder="article-url-slug"
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
                    Category
                  </label>
                  <select style={inputStyle}>
                    <option value="announcement">Bank News</option>
                    <option value="financial">Financial</option>
                    <option value="community">Community</option>
                    <option value="technology">Digital Banking</option>
                    <option value="award">Awards</option>
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
                  Cover Image URL
                </label>
                <input
                  style={inputStyle}
                  defaultValue={selected?.thumbnail ?? ""}
                  placeholder="https://..."
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
                  Summary / Excerpt *
                </label>
                <textarea
                  style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                  defaultValue={selected?.excerpt ?? ""}
                  placeholder="Two-sentence summary shown on listing and social media..."
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
                  Article Body
                </label>
                <div
                  style={{
                    border: "1.5px solid #E5E7EB",
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      background: "#F9FAFB",
                      borderBottom: "1px solid #E5E7EB",
                      padding: "0.5rem 0.875rem",
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    {[
                      "Bold",
                      "Italic",
                      "H2",
                      "H3",
                      "List",
                      "Link",
                      "Image",
                    ].map((t) => (
                      <button
                        key={t}
                        style={{
                          padding: "2px 8px",
                          borderRadius: 4,
                          border: "1px solid #E5E7EB",
                          background: "#fff",
                          fontSize: 11,
                          cursor: "pointer",
                          fontWeight: 600,
                          color: "#374151",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <textarea
                    style={{
                      ...inputStyle,
                      minHeight: 200,
                      border: "none",
                      resize: "vertical",
                      borderRadius: 0,
                    }}
                    defaultValue={selected?.content ?? ""}
                    placeholder="Write your article here..."
                  />
                </div>
              </div>
            </div>

            {/* SEO */}
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "1.5rem",
                border: "1px solid #E5E7EB",
                display: "grid",
                gap: "0.875rem",
              }}
            >
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#6B7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  margin: 0,
                }}
              >
                SEO Settings
              </h3>
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
                  SEO Title
                </label>
                <input
                  style={inputStyle}
                  placeholder="Optimized page title (50–60 chars)"
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
                  Meta Description
                </label>
                <textarea
                  style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
                  placeholder="Meta description (150–160 chars)"
                />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gap: "1rem" }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "1.25rem",
                border: "1px solid #E5E7EB",
                display: "grid",
                gap: "0.875rem",
              }}
            >
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#6B7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  margin: 0,
                }}
              >
                Publish
              </h3>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 4,
                  }}
                >
                  Status
                </label>
                <select style={inputStyle}>
                  <option>Draft</option>
                  <option>Submit for Approval</option>
                  <option>Scheduled</option>
                  <option>Published</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 4,
                  }}
                >
                  Publish Date
                </label>
                <input
                  type="datetime-local"
                  style={inputStyle}
                  defaultValue={selected?.date ?? ""}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 4,
                  }}
                >
                  Author
                </label>
                <input
                  style={inputStyle}
                  defaultValue={selected?.author ?? ""}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 4,
                  }}
                >
                  Read Time
                </label>
                <input
                  style={inputStyle}
                  defaultValue={selected?.readTime ?? ""}
                  placeholder="e.g. 3 min read"
                />
              </div>
            </div>
            <button
              className="btn-primary"
              onClick={() => setView("list")}
              style={{ width: "100%", justifyContent: "center" }}
            >
              Save & Preview
            </button>
            <button
              style={{
                width: "100%",
                padding: "0.625rem",
                borderRadius: 8,
                border: "1.5px solid #E5E7EB",
                background: "#fff",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                color: "#374151",
              }}
              onClick={() => setView("list")}
            >
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0A2540" }}>
          News Articles
        </h1>
        <button
          className="btn-primary"
          onClick={() => {
            setSelected(null)
            setView("edit")
          }}
        >
          + Write Article
        </button>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          border: "1px solid #E5E7EB",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9FAFB" }}>
              {[
                "",
                "Title",
                "Category",
                "Author",
                "Published",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "0.75rem 1rem",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    textAlign: "left",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr
                key={item.id}
                style={{ borderTop: "1px solid #F3F4F6" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#F9FAFB")
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = "")}
              >
                <td style={{ padding: "0.75rem 1rem", width: 60 }}>
                  <img
                    src={item.thumbnail}
                    alt=""
                    style={{
                      width: 48,
                      height: 36,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                </td>
                <td style={{ padding: "0.75rem 1rem", maxWidth: 240 }}>
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: "#0A2540" }}
                  >
                    {item.title}
                  </div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
                    {item.readTime}
                  </div>
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#2563EB",
                      background: "#EFF6FF",
                      padding: "2px 8px",
                      borderRadius: 20,
                    }}
                  >
                    {item.category.charAt(0).toUpperCase() +
                      item.category.slice(1)}
                  </span>
                </td>
                <td
                  style={{
                    padding: "0.75rem 1rem",
                    fontSize: 12,
                    color: "#6B7280",
                  }}
                >
                  {item.author}
                </td>
                <td
                  style={{
                    padding: "0.75rem 1rem",
                    fontSize: 12,
                    color: "#6B7280",
                  }}
                >
                  {item.date}
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <StatusBadge status="published" />
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => {
                        setSelected(item)
                        setView("edit")
                      }}
                      style={{
                        padding: "0.35rem 0.75rem",
                        borderRadius: 6,
                        border: "1.5px solid #E5E7EB",
                        background: "#fff",
                        fontSize: 11,
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AnnouncementManagement() {
  const [view, setView] = useState<AnnView>("list")
  const [pendingPublish, setPendingPublish] = useState<null | {
    priority: AnnouncementPriority
  }>(null)
  const [form, setForm] = useState({
    title: "",
    titleKm: "",
    type: "maintenance" as AnnouncementType,
    priority: "normal" as AnnouncementPriority,
    summary: "",
    content: "",
    status: "draft" as ContentStatus,
    startDate: "",
    endDate: "",
    affectedServices: "",
    customerAction: "",
    maintenanceStart: "",
    maintenanceEnd: "",
  })
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.625rem 0.875rem",
    borderRadius: 8,
    border: "1.5px solid #E5E7EB",
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  }

  if (view === "confirm-critical") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 400,
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "2.5rem",
            border: "2px solid #FCA5A5",
            maxWidth: 480,
            textAlign: "center",
            boxShadow: "0 16px 48px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ fontSize: 52, marginBottom: "1rem" }}>🚨</div>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#DC2626",
              marginBottom: "0.75rem",
            }}
          >
            Publish Critical Announcement?
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "#374151",
              lineHeight: 1.7,
              marginBottom: "1.5rem",
            }}
          >
            This announcement is marked <strong>Critical Priority</strong>. It
            will appear immediately as a red banner on the homepage and all
            public pages.
            <br />
            <br />
            This action will notify <strong>all website visitors</strong>.
            Please confirm you have reviewed and approved this content before
            publishing.
          </p>
          <div
            style={{
              background: "#FEF2F2",
              borderRadius: 10,
              padding: "1rem",
              border: "1px solid #FCA5A5",
              marginBottom: "1.5rem",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#DC2626",
                marginBottom: 6,
              }}
            >
              Before publishing, confirm:
            </div>
            {[
              "Content reviewed and approved by Compliance",
              "Customer Action is clear and actionable",
              "Contact details are correct and current",
              "Affected channels and services listed accurately",
            ].map((c) => (
              <label
                key={c}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  marginBottom: 6,
                  cursor: "pointer",
                }}
              >
                <input type="checkbox" style={{ marginTop: 2 }} />
                <span style={{ fontSize: 12, color: "#374151" }}>{c}</span>
              </label>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={() => setView("create")}
              style={{
                flex: 1,
                padding: "0.75rem",
                borderRadius: 10,
                border: "1.5px solid #E5E7EB",
                background: "#fff",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Back to Edit
            </button>
            <button
              onClick={() => setView("list")}
              style={{
                flex: 1,
                padding: "0.75rem",
                borderRadius: 10,
                border: "none",
                background: "#DC2626",
                color: "#fff",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              🚨 Publish Now
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (view === "create") {
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: "1.5rem",
          }}
        >
          <button
            onClick={() => setView("list")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#009C9F",
              fontSize: 14,
              fontWeight: 600,
              padding: 0,
            }}
          >
            ← Back
          </button>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A2540" }}>
            Create Announcement
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 260px",
            gap: "1.5rem",
            alignItems: "start",
          }}
        >
          <div style={{ display: "grid", gap: "1.25rem" }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "1.5rem",
                border: "1px solid #E5E7EB",
                display: "grid",
                gap: "1rem",
              }}
            >
              <div
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
                    Type *
                  </label>
                  <select
                    style={inputStyle}
                    value={form.type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type: e.target.value as AnnouncementType,
                      })
                    }
                  >
                    {Object.entries(typeConfig).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.icon} {v.label}
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
                    Priority *
                  </label>
                  <select
                    style={inputStyle}
                    value={form.priority}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        priority: e.target.value as AnnouncementPriority,
                      })
                    }
                  >
                    <option value="normal">🔵 Normal</option>
                    <option value="high">🟠 High Priority</option>
                    <option value="critical">🔴 Critical</option>
                  </select>
                </div>
              </div>
              {form.priority === "critical" && (
                <div
                  style={{
                    background: "#FEF2F2",
                    borderRadius: 10,
                    padding: "0.875rem",
                    border: "1px solid #FCA5A5",
                    display: "flex",
                    gap: 8,
                  }}
                >
                  <span>🚨</span>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#DC2626",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    <strong>Critical announcements</strong> will display as a
                    red banner on all public pages immediately upon publishing
                    and require an additional confirmation step.
                  </p>
                </div>
              )}
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
                  Title (English) *
                </label>
                <input
                  style={inputStyle}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Clear, descriptive announcement title"
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
                  Title (ខ្មែរ)
                </label>
                <input
                  style={{
                    ...inputStyle,
                    fontFamily: "'Noto Sans Khmer', sans-serif",
                  }}
                  value={form.titleKm}
                  onChange={(e) =>
                    setForm({ ...form, titleKm: e.target.value })
                  }
                  placeholder="ចំណងជើងជាភាសាខ្មែរ"
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
                  Summary (shown in alert bar) *
                </label>
                <input
                  style={inputStyle}
                  value={form.summary}
                  onChange={(e) =>
                    setForm({ ...form, summary: e.target.value })
                  }
                  placeholder="One sentence shown prominently in the announcement bar"
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
                  Full Content
                </label>
                <textarea
                  style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  placeholder="Detailed announcement text..."
                />
              </div>

              {form.type === "maintenance" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    background: "#F5F3FF",
                    borderRadius: 10,
                    padding: "1rem",
                    border: "1px solid #DDD6FE",
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
                      Maintenance Start *
                    </label>
                    <input
                      type="datetime-local"
                      style={inputStyle}
                      value={form.maintenanceStart}
                      onChange={(e) =>
                        setForm({ ...form, maintenanceStart: e.target.value })
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
                      Maintenance End *
                    </label>
                    <input
                      type="datetime-local"
                      style={inputStyle}
                      value={form.maintenanceEnd}
                      onChange={(e) =>
                        setForm({ ...form, maintenanceEnd: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

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
                  Affected Services (comma-separated)
                </label>
                <input
                  style={inputStyle}
                  value={form.affectedServices}
                  onChange={(e) =>
                    setForm({ ...form, affectedServices: e.target.value })
                  }
                  placeholder="e.g. UCB Mobile App, Internet Banking, ATM"
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
                  Customer Action
                </label>
                <textarea
                  style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
                  value={form.customerAction}
                  onChange={(e) =>
                    setForm({ ...form, customerAction: e.target.value })
                  }
                  placeholder="What should customers do? Be specific and actionable."
                />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gap: "1rem" }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "1.25rem",
                border: "1px solid #E5E7EB",
                display: "grid",
                gap: "0.875rem",
              }}
            >
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#6B7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  margin: 0,
                }}
              >
                Publish Settings
              </h3>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 4,
                  }}
                >
                  Status
                </label>
                <select
                  style={inputStyle}
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as ContentStatus,
                    })
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="pending">Submit for Approval</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Publish Now</option>
                </select>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.5rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: 4,
                    }}
                  >
                    Start
                  </label>
                  <input
                    type="date"
                    style={inputStyle}
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: 4,
                    }}
                  >
                    End
                  </label>
                  <input
                    type="date"
                    style={inputStyle}
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <button
              className={form.priority === "critical" ? "" : "btn-primary"}
              onClick={() => {
                if (
                  form.priority === "critical" &&
                  form.status === "published"
                ) {
                  setView("confirm-critical")
                } else {
                  setView("list")
                }
              }}
              style={
                form.priority === "critical"
                  ? {
                      padding: "0.625rem 1.25rem",
                      borderRadius: 8,
                      border: "none",
                      background: "#DC2626",
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                      width: "100%",
                    }
                  : { width: "100%", justifyContent: "center" }
              }
            >
              {form.priority === "critical"
                ? "🚨 Publish Critical Alert"
                : "Save Announcement"}
            </button>
            <button
              className="btn-outline"
              onClick={() => setView("list")}
              style={{ width: "100%", justifyContent: "center" }}
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0A2540" }}>
          Announcements
        </h1>
        <button className="btn-primary" onClick={() => setView("create")}>
          + Post Announcement
        </button>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}
      >
        {announcements.map((ann) => {
          const pc = priorityConfig[ann.priority]
          const tc = typeConfig[ann.type]
          return (
            <div
              key={ann.id}
              style={{
                background: "#fff",
                borderRadius: 12,
                border: `1.5px solid ${
                  ann.priority === "critical" ? "#FCA5A5" : "#E5E7EB"
                }`,
                padding: "1rem 1.25rem",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "1rem",
                alignItems: "center",
                borderLeft: `4px solid ${pc.color}`,
              }}
            >
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
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
                    {tc.icon} {tc.label}
                  </span>
                  <StatusBadge status={ann.status} />
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: 4,
                  }}
                >
                  {ann.title}
                </div>
                <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                  {ann.startDate} — {ann.endDate}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setView("create")}
                  style={{
                    padding: "0.4rem 0.875rem",
                    borderRadius: 8,
                    border: "1.5px solid #E5E7EB",
                    background: "#fff",
                    fontSize: 12,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function CmsPage({ navigate }: CmsPageProps) {
  const [section, setSection] = useState<CmsSection>("dashboard")

  return (
    <div style={{ background: "#F4F6F8", minHeight: "100vh", display: "flex" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          background: "#0A2540",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "1.5rem 1.25rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}
          >
            UCB Content Studio
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>
            CMS Dashboard
          </div>
        </div>
        <nav style={{ flex: 1, padding: "1rem 0" }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: "0.75rem 1.25rem",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                background:
                  section === item.id ? "rgba(0,156,159,0.15)" : "transparent",
                borderRight:
                  section === item.id
                    ? "3px solid #009C9F"
                    : "3px solid transparent",
                color: section === item.id ? "#fff" : "rgba(255,255,255,0.6)",
                fontSize: 13,
                fontWeight: section === item.id ? 700 : 400,
                transition: "all 150ms",
              }}
              onMouseEnter={(e) => {
                if (section !== item.id)
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)"
              }}
              onMouseLeave={(e) => {
                if (section !== item.id)
                  e.currentTarget.style.background = "transparent"
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div
          style={{
            padding: "1rem 1.25rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <button
            onClick={() => navigate("home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              fontSize: 12,
              padding: 0,
            }}
          >
            ← Back to Website
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "2rem 2.5rem", overflow: "auto" }}>
        {section === "dashboard" && (
          <ContentDashboard setSection={setSection} />
        )}
        {section === "banners" && <BannerManagement />}
        {section === "promotions" && <PromotionManagement />}
        {section === "news" && <NewsManagement />}
        {section === "announcements" && <AnnouncementManagement />}
      </main>
    </div>
  )
}
