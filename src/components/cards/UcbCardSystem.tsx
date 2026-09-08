import { ArrowRight, Check, type LucideIcon } from "lucide-react"
import { siteHref } from "../../utils/assets"

interface CardIconProps {
  icon: LucideIcon
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
}

export interface ProductServiceCardData {
  icon: LucideIcon
  title: string
  description: string
  benefits: string[]
  href: string
  badge?: string
}

export interface FeatureCardData {
  icon: LucideIcon
  title: string
  description: string
  href?: string
  badge?: string
  ctaLabel?: string
}

/** Renders the shared UCB icon treatment for product and feature cards. */
export function CardIcon({ icon: Icon }: CardIconProps) {
  return (
    <span className="ucb-card-icon" aria-hidden="true">
      <Icon size={24} strokeWidth={2.25} />
    </span>
  )
}

/** Renders a consistent centered heading block for card sections. */
export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <header className="ucb-section-header">
      <h2 className="ucb-section-header__title">{title}</h2>
      {subtitle ? <p className="ucb-section-header__subtitle">{subtitle}</p> : null}
    </header>
  )
}

/** Renders a Digital Banking product/service card with benefits and a real link. */
export function ProductServiceCard({ product }: { product: ProductServiceCardData }) {
  return (
    <a
      className="ucb-product-service-card"
      href={siteHref(product.href)}
      aria-label={`Learn more about ${product.title}`}
    >
      <div className="ucb-card-topline">
        <CardIcon icon={product.icon} />
        {product.badge ? <span className="ucb-card-badge">{product.badge}</span> : null}
      </div>

      <h3 className="ucb-card-title">{product.title}</h3>
      <p className="ucb-card-description">{product.description}</p>

      <ul className="ucb-product-service-card__benefits" aria-label={`${product.title} benefits`}>
        {product.benefits.slice(0, 3).map((benefit) => (
          <li key={benefit}>
            <Check size={16} strokeWidth={2.5} aria-hidden="true" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <span className="ucb-card-cta" aria-hidden="true">
        Learn more
        <ArrowRight size={16} strokeWidth={2.25} />
      </span>
    </a>
  )
}

/** Renders a compact capability card for features below a product detail. */
export function FeatureCard({ feature }: { feature: FeatureCardData }) {
  const content = (
    <>
      <div className="ucb-card-topline">
        <CardIcon icon={feature.icon} />
        {feature.badge ? <span className="ucb-card-badge">{feature.badge}</span> : null}
      </div>
      <h3 className="ucb-card-title">{feature.title}</h3>
      <p className="ucb-card-description">{feature.description}</p>
      {feature.ctaLabel ? (
        <span className="ucb-card-cta" aria-hidden="true">
          {feature.ctaLabel}
          <ArrowRight size={16} strokeWidth={2.25} />
        </span>
      ) : null}
    </>
  )

  return feature.href ? (
    <a
      className="ucb-feature-card"
      href={siteHref(feature.href)}
      aria-label={`${feature.ctaLabel ?? "Learn more"} about ${feature.title}`}
    >
      {content}
    </a>
  ) : (
    <article className="ucb-feature-card">{content}</article>
  )
}
