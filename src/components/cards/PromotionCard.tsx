import Badge from "../ui/Badge"
import type { Promotion } from "../../data/promotions"

interface PromotionCardProps {
  promo: Promotion
  onClick?: () => void
}

export default function PromotionCard({ promo, onClick }: PromotionCardProps) {
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(promo.expiresAt).getTime() - Date.now()) / 86400000),
  )

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
      <div
        style={{
          position: "relative",
          height: 180,
          background: "#E6F7F7",
          overflow: "hidden",
        }}
      >
        <img
          src={promo.image}
          alt={promo.title}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {promo.badge && (
          <div style={{ position: "absolute", top: 12, left: 12 }}>
            <Badge label={promo.badge} variant={promo.badgeColor ?? "teal"} />
          </div>
        )}
        {promo.status === "upcoming" && (
          <div style={{ position: "absolute", top: 12, right: 12 }}>
            <Badge label="Coming Soon" variant="navy" />
          </div>
        )}
      </div>
      <div style={{ padding: "1.25rem" }}>
        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#0A2540",
            marginBottom: 8,
            lineHeight: 1.4,
          }}
        >
          {promo.title}
        </h3>
        <p
          style={{
            fontSize: 13,
            color: "#6B7280",
            lineHeight: 1.6,
            marginBottom: "0.875rem",
          }}
        >
          {promo.summary}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: daysLeft <= 7 ? "#991B1B" : "#9CA3AF",
            }}
          >
            {promo.status === "upcoming"
              ? `Starts ${new Date(promo.expiresAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
              : daysLeft > 0
                ? `${daysLeft} days left`
                : "Ended"}
          </span>
          <button
            className="btn-ghost"
            style={{
              fontSize: 12,
              padding: "0.25rem 0.5rem",
              color: "#009C9F",
            }}
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  )
}
