import type { Page } from "../../types/navigation"

interface HeroProps {
  title: string
  titleHighlight?: string
  subtitle: string
  cta1?: { label: string page: Page }
  cta2?: { label: string page: Page }
  image?: string
  imageAlt?: string
  bgVariant?: "teal" | "navy" | "teal-right"
  navigate?: (p: Page) => void
  compact?: boolean
}

export default function HeroSection({
  title,
  titleHighlight,
  subtitle,
  cta1,
  cta2,
  image,
  imageAlt,
  bgVariant = "teal",
  navigate,
  compact = false,
}: HeroProps) {
  const gradients = {
    teal: "linear-gradient(135deg, #0A2540 0%, #009C9F 100%)",
    navy: "linear-gradient(135deg, #0A2540 0%, #1A3D5C 100%)",
    "teal-right":
      "linear-gradient(135deg, #0A2540 0%, #007B7E 60%, #009C9F 100%)",
  }

  return (
    <section
      style={{
        background: gradients[bgVariant],
        minHeight: compact ? 280 : 520,
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          padding: compact ? "3rem 1.5rem" : "5rem 1.5rem",
        }}
      >
        <div
          className={image ? "grid-2-col" : ""}
          style={{
            display: "grid",
            gridTemplateColumns: image ? "1fr 1fr" : "1fr",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          {/* Text */}
          <div>
            <h1
              style={{
                fontSize: compact ? "1.75rem" : "3rem",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
                letterSpacing: -0.5,
              }}
            >
              {title}{" "}
              {titleHighlight && (
                <span style={{ color: "#009C9F" }}>{titleHighlight}</span>
              )}
            </h1>
            <p
              style={{
                fontSize: compact ? 15 : 18,
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.7,
                marginBottom: "2rem",
                maxWidth: 520,
              }}
            >
              {subtitle}
            </p>
            {(cta1 || cta2) && (
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {cta1 && navigate && (
                  <button
                    className="btn-primary"
                    onClick={() => navigate(cta1.page)}
                    style={{
                      background: "#009C9F",
                      padding: "0.75rem 1.75rem",
                      fontSize: 15,
                    }}
                  >
                    {cta1.label}
                  </button>
                )}
                {cta2 && navigate && (
                  <button
                    className="btn-white"
                    onClick={() => navigate(cta2.page)}
                    style={{ padding: "0.75rem 1.75rem", fontSize: 15 }}
                  >
                    {cta2.label}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Image */}
          {image && (
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                height: compact ? 220 : 380,
                background: "rgba(255,255,255,0.1)",
                flexShrink: 0,
              }}
            >
              <img
                src={image}
                alt={imageAlt ?? ""}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section[style*="gridTemplateColumns"] { }
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
