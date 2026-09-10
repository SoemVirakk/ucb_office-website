import { ArrowRight, ChevronRight } from "lucide-react"
import { publicAsset, siteHref } from "../../utils/assets"

/** Renders the decorative business growth chart used by the Business Banking hero. */
function BusinessGrowthGraphic() {
  return (
    <div className="business-growth-graphic">
      <div className="business-growth-graphic__card">
        <div className="business-growth-graphic__header">
          <span />
          <span />
          <span />
        </div>
        <svg
          className="business-growth-graphic__chart"
          viewBox="0 0 360 220"
          role="img"
          aria-label="Decorative business growth chart"
        >
          <defs>
            <linearGradient id="businessChartArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#8DE1DF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#8DE1DF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="business-growth-graphic__grid"
            d="M40 40H330M40 85H330M40 130H330M40 175H330"
          />
          <path
            className="business-growth-graphic__axis"
            d="M40 28V184H332"
          />
          <path
            className="business-growth-graphic__area"
            d="M54 164C86 152 96 134 124 138C154 142 164 102 194 104C232 106 239 64 270 70C294 75 306 48 328 38V184H54Z"
          />
          <path
            className="business-growth-graphic__line"
            d="M54 164C86 152 96 134 124 138C154 142 164 102 194 104C232 106 239 64 270 70C294 75 306 48 328 38"
          />
          {[54, 124, 194, 270, 328].map((x, index) => (
            <circle
              className="business-growth-graphic__point"
              cx={x}
              cy={[164, 138, 104, 70, 38][index]}
              key={x}
              r="5"
            />
          ))}
        </svg>
      </div>
    </div>
  )
}

/** Renders a compact UCB page hero with accessible breadcrumb navigation. */
export default function PageHero({
  breadcrumbs,
  title,
  subtitle,
  eyebrow,
  actions,
  variant,
  children,
}) {
  const finalIndex = breadcrumbs.length - 1
  const isBusinessHero = variant === "business"
  const isPersonalHero = variant === "personal"
  const heroImage = isBusinessHero
    ? publicAsset("assets/images/heroes/business-banking-hero.jpg")
    : isPersonalHero
      ? publicAsset("assets/images/heroes/personal-banking-hero.jpg")
      : undefined

  return (
    <section
      className={`page-hero${isBusinessHero ? " page-hero--business" : ""}${isPersonalHero ? " page-hero--personal" : ""}`}
      aria-labelledby="page-hero-title"
      style={heroImage ? { "--page-hero-bg-image": `url("${heroImage}")` } : undefined}
    >
      {isPersonalHero && <div className="page-hero__overlay" aria-hidden="true" />}

      {/* {isBusinessHero && (
        // <div className="page-hero__visual" aria-hidden="true">
        //   <BusinessGrowthGraphic />
        // </div>
      )} */}

      <div className="container page-hero__container">
        <nav className="page-hero__breadcrumb" aria-label="Breadcrumb">
          <ol className="breadcrumb__list">
            {breadcrumbs.map((crumb, index) => {
              const isCurrent = index === finalIndex

              return (
                <li className="breadcrumb__item" key={`${crumb.label}-${index}`}>
                  {crumb.href && !isCurrent ? (
                    <a className="breadcrumb__link" href={siteHref(crumb.href)}>
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="breadcrumb__current" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                  {!isCurrent && (
                    <ChevronRight
                      className="breadcrumb__separator"
                      size={14}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        {eyebrow ? <p className="page-hero__eyebrow">{eyebrow}</p> : null}
        <h1 className="page-hero__title" id="page-hero-title">
          {title}
        </h1>
        <p className="page-hero__subtitle">{subtitle}</p>
        {actions?.length ? (
          <div className="page-hero__actions">
            {actions.map((action) => (
              <a
                className={`page-hero__action page-hero__action--${action.variant ?? "primary"}`}
                href={siteHref(action.href)}
                key={`${action.href}-${action.label}`}
              >
                {action.label}
                <ArrowRight aria-hidden="true" size={18} />
              </a>
            ))}
          </div>
        ) : children ? (
          <div className="page-hero__actions">{children}</div>
        ) : null}
      </div>
    </section>
  )
}
