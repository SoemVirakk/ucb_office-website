import { useState, useEffect, useRef } from "react"
import QuickActions from "../components/widgets/QuickActions"
import ExchangeRateWidget from "../components/widgets/ExchangeRateWidget"
import ExchangeRateTicker from "../components/widgets/ExchangeRateTicker.jsx"
import ProductCard from "../components/cards/ProductCard"
import PromotionCard from "../components/cards/PromotionCard"
import NewsCard from "../components/cards/NewsCard"
import { products } from "../data/products"
import { promotions } from "../data/promotions"
import { news } from "../data/news"
import { banners } from "../data/banners"
import { announcements, priorityConfig, isActive } from "../data/announcements"
import type { LocaleCode } from "../types/localization"
import type { Page } from "../types/navigation"
import { routeForPage } from "../types/navigation"

interface HomePageProps {
  navigate: (p: Page, id?: string) => void
  lang: LocaleCode
}

const productCategories = [
  {
    id: "personal",
    icon: "👤",
    label: "Accounts & Deposits",
    labelKm: "គណនី & ប្រាក់បញ្ញើ",
    desc: "Savings, current, and fixed deposit accounts",
  },
  {
    id: "loans",
    icon: "💰",
    label: "Loans",
    labelKm: "ប្រាក់កម្ចី",
    desc: "Home, auto, SME, and personal loans",
  },
  {
    id: "cards",
    icon: "💳",
    label: "Cards",
    labelKm: "កាត",
    desc: "Visa credit and debit cards with rewards",
  },
  {
    id: "digital",
    icon: "📱",
    label: "Digital Banking",
    labelKm: "ធនាគារឌីជីថល",
    desc: "Mobile and internet banking solutions",
  },
  {
    id: "business",
    icon: "🏢",
    label: "Business Banking",
    labelKm: "ធនាគារអាជីវកម្ម",
    desc: "Accounts, trade finance, and payroll",
  },
]

/** Renders the dismissible high-priority announcement strip. */
function AnnouncementBar({ navigate }: { navigate: (p: Page) => void }) {
  const [dismissed, setDismissed] = useState<string[]>([])
  const activeAlerts = announcements.filter(
    (a) =>
      isActive(a) &&
      (a.priority === "critical" || a.priority === "high") &&
      !dismissed.includes(a.id),
  )
  if (activeAlerts.length === 0) return null
  const ann = activeAlerts[0]
  const pc = priorityConfig[ann.priority]
  return (
    <div
      style={{
        background: pc.bg,
        borderBottom: `2px solid ${pc.border}`,
        padding: "0.75rem 0",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 18, flexShrink: 0 }}>{pc.icon}</span>
        <div style={{ flex: 1, minWidth: 200 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: pc.color }}>
            {ann.priority === "critical" ? "CRITICAL: " : ""}
          </span>
          <span style={{ fontSize: 13, color: pc.color }}>{ann.summary}</span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => navigate("announcements")}
            style={{
              background: pc.border,
              border: "none",
              color: pc.color,
              fontWeight: 700,
              fontSize: 12,
              padding: "0.3rem 0.875rem",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Details →
          </button>
          <button
            onClick={() => setDismissed((d) => [...d, ann.id])}
            aria-label="Dismiss announcement"
            style={{
              background: "none",
              border: "none",
              color: pc.color,
              cursor: "pointer",
              fontSize: 16,
              opacity: 0.6,
              padding: "0 4px",
            }}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

/** Renders the rotating homepage banner carousel with controls. */
function HeroCarousel({ navigate }: { navigate: (p: Page) => void }) {
  const validBannerTargets = new Set(Object.keys(routeForPage))
  const activeBanners = banners
    .filter(
      (b) =>
        b.status === "published" &&
        b.placement === "homepage-hero" &&
        validBannerTargets.has(b.ctaTarget),
    )
    .sort((a, b) => a.displayOrder - b.displayOrder)
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!paused && activeBanners.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrent((c) => (c + 1) % activeBanners.length)
      }, 5000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [paused, activeBanners.length])

  if (activeBanners.length === 0) return null
  const banner = activeBanners[current]

  /** Moves the homepage carousel to the previous banner. */
  const goPrev = () => {
    setCurrent((c) => (c - 1 + activeBanners.length) % activeBanners.length)
  }
  /** Moves the homepage carousel to the next banner. */
  const goNext = () => {
    setCurrent((c) => (c + 1) % activeBanners.length)
  }

  return (
    <section
      style={{
        position: "relative",
        height: 520,
        overflow: "hidden",
        background: "#0A2540",
      }}
    >
      <ExchangeRateTicker />
      <style>{`
        @keyframes kenBurns { from { transform: scale(1.04); } to { transform: scale(1); } }
        @media (max-width: 600px) { .carousel-content-inner { padding: 1.5rem !important; } .carousel-title { font-size: 22px !important; } .carousel-subtitle { font-size: 13px !important; } }
        @media (max-width: 600px) { .carousel-h { height: 400px !important; } }
      `}</style>
      {/* Background image */}
      <div
        className="carousel-h"
        style={{ position: "absolute", inset: 0, height: 520 }}
      >
        <img
          key={banner.id}
          src={banner.desktopImage}
          alt={banner.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            animation: "kenBurns 5s ease-out forwards",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(10,37,64,0.88) 0%, rgba(10,37,64,0.45) 60%, rgba(10,37,64,0.1) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="container carousel-h"
        style={{
          position: "relative",
          zIndex: 2,
          height: 520,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="carousel-content-inner"
          style={{ maxWidth: 600, padding: "0 1.5rem" }}
        >
          <div
            style={{
              display: "inline-flex",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 20,
              padding: "4px 14px",
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
              marginBottom: "1rem",
              letterSpacing: 0.5,
            }}
          >
            {current + 1} / {activeBanners.length} — UCB Special Offer
          </div>
          <h2
            className="carousel-title"
            style={{
              fontSize: 38,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: "1rem",
              letterSpacing: -0.5,
            }}
          >
            {banner.title}
          </h2>
          <p
            className="carousel-subtitle"
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.7,
              marginBottom: "1.75rem",
              maxWidth: 480,
            }}
          >
            {banner.subtitle}
          </p>
          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => navigate(banner.ctaTarget as Page)}
              className="btn-primary"
            >
              {banner.ctaLabel} →
            </button>
            <button
              onClick={() => navigate("promotions")}
              style={{
                padding: "0.625rem 1.25rem",
                borderRadius: 8,
                border: "2px solid rgba(255,255,255,0.5)",
                background: "transparent",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              All Promotions
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      {activeBanners.length > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous banner"
            style={{
              position: "absolute",
              left: 24,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 3,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              cursor: "pointer",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}
          >
            ‹
          </button>
          <button
            onClick={goNext}
            aria-label="Next banner"
            style={{
              position: "absolute",
              right: 24,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 3,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              cursor: "pointer",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}
          >
            ›
          </button>

          {/* Dots + pause */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              {activeBanners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: current === i ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background:
                      current === i ? "#fff" : "rgba(255,255,255,0.4)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 300ms",
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play carousel" : "Pause carousel"}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                width: 28,
                height: 28,
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {paused ? "▶" : "⏸"}
            </button>
          </div>
        </>
      )}
    </section>
  )
}

/** Renders the public website home page sections. */
export default function HomePage({ navigate, lang }: HomePageProps) {
  const featuredProducts = products.filter((p) =>
    [
      "savings-account",
      "home-loan",
      "credit-card",
      "ucb-mobile",
      "business-current",
    ].includes(p.id),
  )
  const featuredPromos = promotions
    .filter((p) => p.status === "active")
    .slice(0, 3)
  const featuredNews = news.slice(0, 3)

  return (
    <div>
      {/* Announcement alert bar */}
      <AnnouncementBar navigate={navigate} />

      {/* Hero banner carousel */}
      <HeroCarousel navigate={navigate} />

      {/* Quick actions */}
      <QuickActions navigate={navigate} lang={lang} />

      {/* Product categories */}
      <section className="page-section" style={{ background: "#F4F6F8" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="section-title">Our Products & Services</h2>
            <p className="section-subtitle">
              Everything you need to bank smarter, wherever you are in Cambodia.
            </p>
          </div>
          <div
            className="grid-5"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "1rem",
            }}
          >
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate("products")}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  padding: "1.75rem 1rem",
                  background: "#fff",
                  border: "2px solid transparent",
                  borderRadius: 16,
                  cursor: "pointer",
                  transition: "all 150ms",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.borderColor = "#009C9F"
                  el.style.transform = "translateY(-4px)"
                  el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.borderColor = "transparent"
                  el.style.transform = "none"
                  el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"
                }}
              >
                <div style={{ fontSize: 36 }}>{cat.icon}</div>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#0A2540",
                      marginBottom: 4,
                    }}
                  >
                    {lang === "km" ? cat.labelKm : cat.label}
                  </div>
                  <div
                    style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.4 }}
                  >
                    {cat.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Featured products */}
          <div style={{ marginTop: "3rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0A2540" }}>
                Popular Products
              </h3>
              <button
                className="btn-outline"
                onClick={() => navigate("products")}
                style={{ fontSize: 13, padding: "0.4rem 1rem" }}
              >
                View All Products →
              </button>
            </div>
            <div
              className="grid-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.25rem",
              }}
            >
              {featuredProducts.slice(0, 3).map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelect={(id) => navigate("products", id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="page-section">
        <div className="container">
          <div className="banking-tools-section__header">
            <div>
              <h2 className="section-title">Latest Promotions</h2>
              <p className="section-subtitle">
                Don't miss out on exclusive offers from UCB.
              </p>
            </div>
            <button
              type="button"
              className="btn-outline banking-tools-section__action"
              onClick={() => navigate("branches")}
            >
              View all exchange rates <span aria-hidden="true">→</span>
            </button>
          </div>
          <div
            className="grid-3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.25rem",
            }}
          >
            {featuredPromos.map((promo) => (
              <PromotionCard key={promo.id} promo={promo} />
            ))}
          </div>
        </div>
      </section>


      {/* Exchange Rates */}
      <section className="page-section banking-tools-section">
        <div className="container">
          <div className="banking-tools-section__header">
            <div>
              <h2 className="section-title">Exchange Rates</h2>
              <p className="section-subtitle">
                Indicative foreign exchange rates. Final rates apply at the time of transaction.
              </p>
            </div>

            <button
              type="button"
              className="btn-outline banking-tools-section__action"
              onClick={() => navigate("exchange-rates")}
            >
              View all exchange rates <span aria-hidden="true">→</span>
            </button>
          </div>

          <ExchangeRateWidget compact />
        </div>
      </section>


      {/* Branch / ATM Locator */}
      <section className="page-section">
        <div className="container">
          <div className="banking-tools-section__header">
            <div>
              <h2 className="section-title">Find a Branch or ATM</h2>
              <p className="section-subtitle">
                Search UCB locations and find services near you.
              </p>
            </div>

            <button
              type="button"
              className="btn-outline banking-tools-section__action"
              onClick={() => navigate("branches")}
            >
              View all exchange rates <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="location-finder">
            <div className="location-finder__list">
              <label className="sr-only" htmlFor="location-search">
                Search branch or ATM
              </label>

              <input
                id="location-search"
                className="location-finder__search"
                type="search"
                placeholder="Search branch, ATM, or city"
              />

              <div className="location-finder__tabs" role="tablist" aria-label="Location type">
                <button type="button" className="is-active" role="tab">
                  All locations
                </button>
                <button type="button" role="tab">Branches</button>
                <button type="button" role="tab">ATMs</button>
              </div>

              <div className="location-finder__results">
                <button type="button" className="location-result">
                  <span className="location-result__icon">🏦</span>
                  <span>
                    <strong>UCB Main Branch</strong>
                    <small>Phnom Penh · Open today</small>
                  </span>
                  <span aria-hidden="true">›</span>
                </button>

                <button type="button" className="location-result">
                  <span className="location-result__icon">🏧</span>
                  <span>
                    <strong>Central Market ATM</strong>
                    <small>Phnom Penh · 24 hours</small>
                  </span>
                  <span aria-hidden="true">›</span>
                </button>

                <button type="button" className="location-result">
                  <span className="location-result__icon">🏦</span>
                  <span>
                    <strong>Siem Reap Branch</strong>
                    <small>Siem Reap · Open today</small>
                  </span>
                  <span aria-hidden="true">›</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              className="location-finder__map"
              onClick={() => navigate("branches")}
              aria-label="Open branch and ATM map"
            >
              <span className="location-finder__map-icon">🗺️</span>
              <strong>Open interactive map</strong>
              <span>View nearby UCB branches and ATMs</span>
            </button>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="page-section">
        <div className="container">

          <div className="banking-tools-section__header">
            <div>
              <h2 className="section-title">Find a Branch or ATM</h2>
              <p className="section-subtitle">
                Search UCB locations and find services near you.
              </p>
            </div>

            <button
              type="button"
              className="btn-outline banking-tools-section__action"
              onClick={() => navigate("branches")}
            >
              View all exchange rates <span aria-hidden="true">→</span>
            </button>
          </div>

          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
          >
            <div>
              <h2 className="section-title">News & Updates</h2>
              <p className="section-subtitle">
                Stay informed about UCB and the Cambodian banking sector.
              </p>
            </div>
            <button
              className="btn-outline"
              onClick={() => navigate("news")}
              style={{ flexShrink: 0 }}
            >
              All News →
            </button>
          </div> */}
          <div
            className="grid-3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.25rem",
            }}
          >
            {featuredNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Announcements teaser */}
      <section
        style={{
          background: "#FDF4FF",
          padding: "2.5rem 0",
          borderTop: "1px solid #E9D5FF",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "#EDE9FE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                }}
              >
                📢
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: 4,
                  }}
                >
                  Announcements & Service Notices
                </h3>
                <p style={{ fontSize: 13, color: "#6B7280" }}>
                  Maintenance windows, security alerts, holiday hours, and
                  regulatory updates.
                </p>
              </div>
            </div>
            <button
              className="btn-outline"
              onClick={() => navigate("announcements")}
              style={{ flexShrink: 0 }}
            >
              View Announcements →
            </button>
          </div>
        </div>
      </section>


      <section className="security-tips-section">
        <div className="container">
        <div className="security-tips-card">
          <div className="security-tips-card__icon" aria-hidden="true">
            🔒
          </div>

          <div className="security-tips-card__content">
            <h2 id="security-tips-title" className="security-tips-card__title">
              Stay Safe — Banking Security Tips
            </h2>

            <div className="security-tips-card__grid">
              <article className="security-tip">
                <span className="security-tip__icon" aria-hidden="true">🚫</span>
                <div>
                  <h3>Never share your PIN or OTP</h3>
                  <p>UCB will never ask for your PIN, OTP, password, or full card number by phone, email, or social media.</p>
                </div>
              </article>

              <article className="security-tip">
                <span className="security-tip__icon" aria-hidden="true">🔗</span>
                <div>
                  <h3>Check the website URL</h3>
                  <p>Verify that you are on the official UCB website before entering login credentials.</p>
                </div>
              </article>

              <article className="security-tip">
                <span className="security-tip__icon" aria-hidden="true">📱</span>
                <div>
                  <h3>Enable biometric login</h3>
                  <p>Use fingerprint or Face ID in UCB Mobile App for an additional layer of protection.</p>
                </div>
              </article>
            </div>

            <div className="security-tips-card__action">
              <button
                type="button"
                className="btn-outline security-tips-card__button"
                onClick={() => navigate("security")}
              >
                Visit Security Center <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
         </div>
      </section>
    </div>
  )
}
