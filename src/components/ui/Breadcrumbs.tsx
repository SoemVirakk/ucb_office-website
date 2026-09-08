import type { Page } from "../../types/navigation"

interface Crumb {
  label: string
  page?: Page
}

interface BreadcrumbsProps {
  crumbs: Crumb[]
  navigate?: (p: Page) => void
}

/** Renders breadcrumb navigation for nested pages. */
export default function Breadcrumbs({ crumbs, navigate }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <li
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              {i > 0 && (
                <span style={{ color: "#D1D5DB", fontSize: 12 }}>›</span>
              )}
              {!isLast && crumb.page && navigate ? (
                <button
                  onClick={() => navigate(crumb.page!)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#009C9F",
                    fontSize: 13,
                    fontWeight: 500,
                    padding: 0,
                  }}
                >
                  {crumb.label}
                </button>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  style={{
                    color: isLast ? "#0A2540" : "#6B7280",
                    fontSize: 13,
                    fontWeight: isLast ? 600 : 400,
                  }}
                >
                  {crumb.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
