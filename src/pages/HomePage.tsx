import { useState, useEffect, useRef } from "react"
import QuickActions from "../components/widgets/QuickActions"
import ExchangeRateWidget from "../components/widgets/ExchangeRateWidget"
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

function HeroCarousel({ navigate }: { navigate: (p: Page) => void }) {
  const activeBanners = banners
    .filter((b) => b.status === "published" && b.placement === "homepage-hero")
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

  const goPrev = () => {
    setCurrent((c) => (c - 1 + activeBanners.length) % activeBanners.length)
  }
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
          >
            <div>
              <h2 className="section-title">Latest Promotions</h2>
              <p className="section-subtitle">
                Don't miss out on exclusive offers from UCB.
              </p>
            </div>
            <button
              className="btn-outline"
              onClick={() => navigate("promotions")}
              style={{ flexShrink: 0 }}
            >
              See All Offers →
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

      {/* Exchange rate + Branch locator */}
      <section className="page-section" style={{ background: "#F4F6F8" }}>
        <div className="container">
          <div
            className="grid-2-col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2.5rem",
              alignItems: "start",
            }}
          >
            <div>
              <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
                Exchange Rates
              </h2>
              <ExchangeRateWidget compact />
            </div>
            <div>
              <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
                Find a Branch or ATM
              </h2>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: 220,
                    background: "linear-gradient(135deg, #E6F7F7, #F4F6F8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 12,
                    borderBottom: "1px solid #E5E7EB",
                  }}
                >
                  <span style={{ fontSize: 48 }}>🗺️</span>
                  <span
                    style={{ fontSize: 14, color: "#6B7280", fontWeight: 500 }}
                  >
                    Interactive map
                  </span>
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#374151",
                      marginBottom: "1rem",
                      lineHeight: 1.6,
                    }}
                  >
                    Find UCB branches and ATMs across Cambodia — open 6 days a
                    week, with 24-hour ATMs available in major cities.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {["28 Branches", "45+ ATMs", "6 Provinces"].map((stat) => (
                      <div
                        key={stat}
                        style={{
                          flex: 1,
                          textAlign: "center",
                          padding: "0.625rem",
                          background: "#F4F6F8",
                          borderRadius: 8,
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#0A2540",
                        }}
                      >
                        {stat}
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => navigate("branches")}
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Find Nearest Branch →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="page-section">
        <div className="container">
          <div
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
          </div>
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

      {/* Security tips */}
      <section style={{ background: "#FDF6E3", padding: "3rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "2rem",
              background: "#fff",
              borderRadius: 16,
              padding: "2rem",
              border: "1px solid #FDE68A",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: "#FDF6E3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                flexShrink: 0,
              }}
            >
              🔒
            </div>
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: "0.75rem",
                }}
              >
                Stay Safe — Banking Security Tips
              </h2>
              <div
                className="grid-3"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1.5rem",
                }}
              >
                {[
                  {
                    icon: "🚫",
                    title: "Never share your PIN or OTP",
                    desc: "UCB staff will never ask for your PIN, OTP, or full card number by phone or email.",
                  },
                  {
                    icon: "🔗",
                    title: "Check the website URL",
                    desc: "Always verify you are on www.ucb.com.kh before entering any login credentials.",
                  },
                  {
                    icon: "📱",
                    title: "Enable biometric login",
                    desc: "Use fingerprint or face ID in UCB Mobile App for an extra layer of security.",
                  },
                ].map((tip) => (
                  <div key={tip.title} style={{ display: "flex", gap: 12 }}>
                    <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>
                      {tip.icon}
                    </span>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          color: "#0A2540",
                          marginBottom: 4,
                        }}
                      >
                        {tip.title}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "#6B7280",
                          lineHeight: 1.6,
                        }}
                      >
                        {tip.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1.25rem" }}>
                <button
                  className="btn-outline"
                  onClick={() => navigate("security")}
                  style={{ fontSize: 13 }}
                >
                  Visit Security Center →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
