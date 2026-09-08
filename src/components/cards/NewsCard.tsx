import Badge from "../ui/Badge"
import type { NewsItem } from "../../data/news"

interface NewsCardProps {
  item: NewsItem
  onClick?: () => void
}

const categoryConfig: Record<string, {
  label: string
  variant: "teal" | "gold" | "blue" | "gray" | "navy"
}> = {
  announcement: { label: "Announcement", variant: "teal" },
  financial: { label: "Financial Results", variant: "navy" },
  community: { label: "Community", variant: "gold" },
  award: { label: "Award", variant: "gold" },
  technology: { label: "Technology", variant: "blue" },
  partnership: { label: "Partnership", variant: "gray" },
}

/** Renders a clickable news summary card. */
export default function NewsCard({ item, onClick }: NewsCardProps) {
  const cat = categoryConfig[item.category] ?? {
    label: item.category,
    variant: "gray" as const,
  }
  const formattedDate = new Date(item.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div
      className="card"
      style={{
        cursor: "pointer",
        transition: "transform 150ms, box-shadow 150ms",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = "translateY(-3px)"
        el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = "none"
        el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)"
      }}
      onClick={onClick}
      role="article"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <div style={{ height: 180, background: "#F4F6F8", overflow: "hidden" }}>
        <img
          src={item.thumbnail}
          alt={item.title}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{ padding: "1.25rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: "0.75rem",
          }}
        >
          <Badge label={cat.label} variant={cat.variant} />
          <span style={{ fontSize: 11, color: "#9CA3AF" }}>
            {item.readTime}
          </span>
        </div>
        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#0A2540",
            marginBottom: 8,
            lineHeight: 1.4,
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontSize: 13,
            color: "#6B7280",
            lineHeight: 1.6,
            marginBottom: "0.875rem",
          }}
        >
          {item.excerpt}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 12, color: "#9CA3AF" }}>
            {formattedDate}
          </span>
          <button
            className="btn-ghost"
            style={{
              fontSize: 12,
              padding: "0.25rem 0.5rem",
              color: "#009C9F",
            }}
          >
            Read More →
          </button>
        </div>
      </div>
    </div>
  )
}
