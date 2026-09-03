import type { Page } from "../types/navigation"

interface NotFoundPageProps {
  navigate: (p: Page) => void
}

export default function NotFoundPage({ navigate }: NotFoundPageProps) {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F4F6F8",
        padding: "2rem",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 500 }}>
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #E6F7F7, #B2E4E5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 52,
            margin: "0 auto 2rem",
          }}
        >
          🗺️
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: "#009C9F",
            lineHeight: 1,
            marginBottom: "0.5rem",
            letterSpacing: -4,
          }}
        >
          404
        </div>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#0A2540",
            marginBottom: "0.75rem",
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "#6B7280",
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          The page you are looking for may have moved, been removed, or the URL
          may be incorrect. Let us help you find what you need.
        </p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button className="btn-primary" onClick={() => navigate("home")}>
            Go to Homepage
          </button>
          <button className="btn-outline" onClick={() => navigate("search")}>
            Search UCB
          </button>
          <button className="btn-ghost" onClick={() => navigate("contact")}>
            Contact Us
          </button>
        </div>
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Products", page: "products" as Page },
            { label: "Branches", page: "branches" as Page },
            { label: "Digital Banking", page: "digital-banking" as Page },
            { label: "Rates", page: "rates" as Page },
          ].map((link) => (
            <button
              key={link.label}
              onClick={() => navigate(link.page)}
              style={{
                background: "none",
                border: "none",
                color: "#009C9F",
                cursor: "pointer",
                fontSize: 14,
                textDecoration: "underline",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
