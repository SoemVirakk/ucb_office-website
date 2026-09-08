import Badge from "../ui/Badge"
import type { Promotion } from "../../data/promotions"

interface PromotionCardProps {
  promo: Promotion
  onClick?: () => void
}

/** Renders a clickable promotion summary card. */
export default function PromotionCard({ promo, onClick }: PromotionCardProps) {
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(promo.expiresAt).getTime() - Date.now()) / 86400000),
  )

 return (
  <article className="promotion-card">
    <div className="promotion-card__media">
      <img
        src={promo.image}
        alt={promo.title}
        loading="lazy"
        className="promotion-card__image"
      />

      {promo.badge && (
        <div className="promotion-card__badge promotion-card__badge--left">
          <Badge label={promo.badge} variant={promo.badgeColor ?? "teal"} />
        </div>
      )}

      {promo.status === "upcoming" && (
        <div className="promotion-card__badge promotion-card__badge--right">
          <Badge label="Coming Soon" variant="navy" />
        </div>
      )}
    </div>

    <div className="promotion-card__content">
      <h3 className="promotion-card__title">{promo.title}</h3>

      <p className="promotion-card__summary">{promo.summary}</p>

      <div className="promotion-card__footer">
        <span
          className={`promotion-card__date ${
            daysLeft <= 7 && daysLeft > 0 ? "is-ending-soon" : ""
          }`}
        >
          {promo.status === "upcoming"
            ? `Starts ${new Date(promo.startsAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}`
            : daysLeft > 0
              ? `${daysLeft} days left`
              : "Ended"}
        </span>

        <button
          type="button"
          className="btn-ghost promotion-card__action"
          onClick={onClick}
        >
          View Details <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  </article>
);
}
