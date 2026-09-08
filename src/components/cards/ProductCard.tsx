import Badge from "../ui/Badge"
import type { Product } from "../../data/products"

interface ProductCardProps {
  product: Product
  onSelect: (id: string) => void
}

/** Renders a clickable product summary card. */
export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
        cursor: "pointer",
        transition: "transform 150ms, box-shadow 150ms",
        border: "1px solid transparent",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = "translateY(-3px)"
        el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"
        el.style.borderColor = "#009C9F"
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = "none"
        el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)"
        el.style.borderColor = "transparent"
      }}
      onClick={() => onSelect(product.id)}
      role="article"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(product.id)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "#E6F7F7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
        >
          {product.icon}
        </div>
        <div className="product-card__badges">
          {product.isNew && (
            <Badge label="New" variant="teal" />
          )}

          {product.rateOrFee && (
            <span
              className={`product-card__rate ${product.rateOrFee.includes("%")
                  ? "product-card__rate--interest"
                  : "product-card__rate--fee"
                }`}
            >
              {product.rateOrFee}
            </span>
          )}
        </div>
      </div>

      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#0A2540",
          marginBottom: 6,
          lineHeight: 1.3,
        }}
      >
        {product.name}
      </h3>
      <p
        style={{
          fontSize: 13,
          color: "#6B7280",
          marginBottom: "1rem",
          lineHeight: 1.6,
          flex: 1,
        }}
      >
        {product.tagline}
      </p>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {product.highlights.slice(0, 3).map((h, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              fontSize: 13,
              color: "#374151",
            }}
          >
            <span style={{ color: "#009C9F", flexShrink: 0, marginTop: 1 }}>
              ✓
            </span>
            {h}
          </li>
        ))}
      </ul>

      <button
        className="btn-outline"
        style={{
          alignSelf: "flex-start",
          fontSize: 13,
          padding: "0.5rem 1rem",
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(product.id)
        }}
      >
        Learn More →
      </button>
    </div>
  )
}
