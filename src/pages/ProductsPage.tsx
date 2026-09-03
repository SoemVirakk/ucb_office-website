import { useEffect, useState } from "react"
import { useLocation, useNavigate as useRouterNavigate } from "react-router-dom"
import ProductCard from "../components/cards/ProductCard"
import Breadcrumbs from "../components/ui/Breadcrumbs"
import FaqAccordion from "../components/ui/FaqAccordion"
import Badge from "../components/ui/Badge"
import { products } from "../data/products"
import type { Page } from "../types/navigation"

interface ProductsPageProps {
  navigate: (p: Page, id?: string) => void
  detailId: string | null
  setDetailId: (id: string | null) => void
}

const categories = [
  { id: "all", label: "All Products" },
  { id: "personal", label: "Personal Banking" },
  { id: "loans", label: "Loans" },
  { id: "cards", label: "Cards" },
  { id: "digital", label: "Digital Banking" },
  { id: "business", label: "Business Banking" },
]

const categoryIds = categories.map((category) => category.id)
const getCategoryFromSearch = (search: string) => {
  const requestedCategory = new URLSearchParams(search).get("category")
  return requestedCategory && categoryIds.includes(requestedCategory)
    ? requestedCategory
    : "all"
}

export default function ProductsPage({
  navigate,
  detailId,
  setDetailId,
}: ProductsPageProps) {
  const location = useLocation()
  const routerNavigate = useRouterNavigate()
  const [activeCategory, setActiveCategory] = useState(() =>
    getCategoryFromSearch(location.search),
  )

  useEffect(() => {
    setActiveCategory(getCategoryFromSearch(location.search))
  }, [location.search])

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    const query = categoryId === "all" ? "" : `?category=${categoryId}`
    routerNavigate(`/products${query}`, { replace: true })
  }

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory)

  const selectedProduct = detailId
    ? products.find((p) => p.id === detailId)
    : null

  if (selectedProduct) {
    return (
      <div style={{ background: "#F4F6F8", minHeight: "100vh" }}>
        {/* Breadcrumb */}
        <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB" }}>
          <div className="container" style={{ padding: "1rem 1.5rem" }}>
            <Breadcrumbs
              crumbs={[
                { label: "Home", page: "home" },
                { label: "Products", page: "products" },
                { label: selectedProduct.name },
              ]}
              navigate={(p) => {
                navigate(p)
                setDetailId(null)
              }}
            />
          </div>
        </div>

        <div className="container" style={{ padding: "2.5rem 1.5rem" }}>
          <div
            className="sidebar-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 360px",
              gap: "2rem",
              alignItems: "start",
            }}
          >
            {/* Main content */}
            <div>
              {/* Header card */}
              <div
                className="card"
                style={{ padding: "2rem", marginBottom: "1.5rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 20,
                      background: "#E6F7F7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 36,
                      flexShrink: 0,
                    }}
                  >
                    {selectedProduct.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                      {selectedProduct.isNew && (
                        <Badge label="New" variant="teal" />
                      )}
                      {selectedProduct.rateOrFee && (
                        <Badge
                          label={selectedProduct.rateOrFee}
                          variant="gold"
                        />
                      )}
                    </div>
                    <h1
                      style={{
                        fontSize: 28,
                        fontWeight: 800,
                        color: "#0A2540",
                        marginBottom: 8,
                        lineHeight: 1.2,
                      }}
                    >
                      {selectedProduct.name}
                    </h1>
                    <p
                      style={{
                        fontSize: 16,
                        color: "#6B7280",
                        lineHeight: 1.6,
                      }}
                    >
                      {selectedProduct.tagline}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    Apply Now
                  </button>
                  <button
                    className="btn-outline"
                    onClick={() => navigate("contact")}
                  >
                    Talk to Us
                  </button>
                </div>
              </div>

              {/* Key highlights */}
              <div
                className="card"
                style={{ padding: "1.75rem", marginBottom: "1.5rem" }}
              >
                <h2
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: "1.25rem",
                  }}
                >
                  Key Benefits
                </h2>
                <div
                  className="grid-2"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.875rem",
                  }}
                >
                  {selectedProduct.highlights.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        padding: "0.875rem",
                        background: "#F4F6F8",
                        borderRadius: 10,
                      }}
                    >
                      <span
                        style={{
                          color: "#009C9F",
                          fontWeight: 700,
                          fontSize: 16,
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          color: "#374151",
                          lineHeight: 1.5,
                        }}
                      >
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility */}
              <div
                className="card"
                style={{ padding: "1.75rem", marginBottom: "1.5rem" }}
              >
                <h2
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: "1rem",
                  }}
                >
                  Eligibility
                </h2>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {selectedProduct.eligibility.map((e, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        fontSize: 14,
                        color: "#374151",
                      }}
                    >
                      <span style={{ color: "#009C9F", flexShrink: 0 }}>•</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required documents */}
              <div
                className="card"
                style={{ padding: "1.75rem", marginBottom: "1.5rem" }}
              >
                <h2
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: "1rem",
                  }}
                >
                  Required Documents
                </h2>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {selectedProduct.requiredDocs.map((doc, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        fontSize: 14,
                        color: "#374151",
                      }}
                    >
                      <span style={{ color: "#C9A84C", flexShrink: 0 }}>
                        📄
                      </span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQs */}
              <div className="card" style={{ padding: "1.75rem" }}>
                <h2
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: "1.25rem",
                  }}
                >
                  Frequently Asked Questions
                </h2>
                <FaqAccordion items={selectedProduct.faqs} />
              </div>
            </div>

            {/* Sidebar — fees + apply CTA */}
            <div style={{ position: "sticky", top: 88 }}>
              <div
                className="card"
                style={{ padding: "1.5rem", marginBottom: "1rem" }}
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: "1rem",
                  }}
                >
                  Fees & Charges
                </h3>
                {selectedProduct.fees.map((fee) => (
                  <div
                    key={fee.item}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.625rem 0",
                      borderBottom: "1px solid #F4F6F8",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: "#6B7280" }}>{fee.item}</span>
                    <span style={{ fontWeight: 600, color: "#0A2540" }}>
                      {fee.amount}
                    </span>
                  </div>
                ))}
                <button
                  className="btn-primary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    marginTop: "1.25rem",
                  }}
                >
                  Apply Now
                </button>
              </div>
              <div
                style={{
                  padding: "1rem 1.25rem",
                  background: "#E6F7F7",
                  borderRadius: 12,
                  fontSize: 13,
                  color: "#007B7E",
                  border: "1px solid #B2E4E5",
                }}
              >
                <strong>Need help?</strong> Call us at{" "}
                <a
                  href="tel:+85523999001"
                  style={{ color: "#007B7E", fontWeight: 600 }}
                >
                  +855 23 999 001
                </a>{" "}
                or visit any UCB branch.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: "#F4F6F8", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
          padding: "3rem 0 2rem",
        }}
      >
        <div className="container">
          <Breadcrumbs
            crumbs={[
              { label: "Home", page: "home" },
              { label: "Products & Services" },
            ]}
            navigate={(p) => navigate(p)}
          />
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#fff",
              marginTop: "1rem",
              marginBottom: 8,
            }}
          >
            Products & Services
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>
            Explore UCB's full range of banking products designed for every
            Cambodian.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "2.5rem 1.5rem" }}>
        <div
          className="sidebar-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "220px 1fr",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Sidebar filter */}
          <div style={{ position: "sticky", top: 88 }}>
            <div className="card" style={{ padding: "1.25rem" }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#6B7280",
                  letterSpacing: 0.5,
                  marginBottom: "0.875rem",
                }}
              >
                FILTER BY CATEGORY
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "0.625rem 0.875rem",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    background:
                      activeCategory === cat.id ? "#E6F7F7" : "transparent",
                    color: activeCategory === cat.id ? "#007B7E" : "#374151",
                    fontWeight: activeCategory === cat.id ? 600 : 400,
                    fontSize: 14,
                    marginBottom: 2,
                    transition: "all 150ms",
                  }}
                >
                  {cat.label}
                  <span
                    style={{ float: "right", fontSize: 12, color: "#9CA3AF" }}
                  >
                    {cat.id === "all"
                      ? products.length
                      : products.filter((p) => p.category === cat.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Product grid */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
              }}
            >
              <div style={{ fontSize: 14, color: "#6B7280" }}>
                Showing <strong>{filtered.length}</strong> product
                {filtered.length !== 1 ? "s" : ""}
              </div>
            </div>
            <div
              className="grid-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.25rem",
              }}
            >
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelect={(id) => setDetailId(id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
