import type { Page } from "../../types/navigation"
import type { LocaleCode } from "../../types/localization"

interface Action {
  icon: string
  label: string
  labelKm: string
  page: Page
  color: string
}

const actions: Action[] = [
  {
    icon: "🏦",
    label: "Open Account",
    labelKm: "បើកគណនី",
    page: "products",
    color: "#E6F7F7",
  },
  {
    icon: "💰",
    label: "Apply for Loan",
    labelKm: "ដាក់ពាក្យខ្ចី",
    page: "products",
    color: "#FDF6E3",
  },
  {
    icon: "📍",
    label: "Find Branch / ATM",
    labelKm: "ស្វែងរាក",
    page: "branches",
    color: "#EFF6FF",
  },
  {
    icon: "📱",
    label: "Digital Banking",
    labelKm: "ធនាគារឌីជីថល",
    page: "digital-banking",
    color: "#F0FDF4",
  },
]

interface QuickActionsProps {
  navigate: (p: Page) => void
  lang?: LocaleCode
}

export default function QuickActions({
  navigate,
  lang = "en",
}: QuickActionsProps) {
  return (
    <section style={{ background: "#fff", paddingBottom: "2rem" }}>
      <div className="container">
        <div
          className="grid-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            marginTop: -40,
            position: "relative",
            zIndex: 10,
          }}
        >
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.page)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                padding: "1.5rem 1rem",
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                transition: "all 150ms",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.borderColor = "#009C9F"
                el.style.transform = "translateY(-4px)"
                el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.borderColor = "#E5E7EB"
                el.style.transform = "none"
                el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: action.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
              >
                {action.icon}
              </div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#0A2540",
                  textAlign: "center",
                  lineHeight: 1.3,
                }}
              >
                {lang === "km" ? action.labelKm : action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .quick-actions-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
