import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate as useRouterNavigate } from "react-router-dom"
import CreditCardProductCard from "../components/cards/CreditCardProductCard"
import ProductCard from "../components/cards/ProductCard"
import {
  FeatureCard,
  ProductServiceCard,
  SectionHeader,
} from "../components/cards/UcbCardSystem"
import Breadcrumbs from "../components/ui/Breadcrumbs"
import PageHero from "../components/ui/PageHero"
import FaqAccordion from "../components/ui/FaqAccordion"
import Badge from "../components/ui/Badge"
import { mockCreditCards } from "../data/creditCards"
import { digitalBankingProducts, mobileBankingFeatures } from "../data/digitalBankingCards"
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
const specializedCardProductIds = new Set(["credit-card", "debit-card"])
/** Reads the selected product category from /products/category/:id or ?category=:id. */
const getCategoryFromLocation = (pathname: string, search: string) => {
  const [, section, routeType, pathCategory] = pathname
    .replace(/\/$/, "")
    .split("/")
  if (
    section === "products" &&
    routeType === "category" &&
    categoryIds.includes(pathCategory)
  ) {
    return pathCategory
  }

  const requestedCategory = new URLSearchParams(search).get("category")
  return requestedCategory && categoryIds.includes(requestedCategory)
    ? requestedCategory
    : "all"
}

/** Renders product category tabs, product listings, and detail panels. */
export default function ProductsPage({
  navigate,
  detailId,
  setDetailId,
}: ProductsPageProps) {
  const location = useLocation()
  const routerNavigate = useRouterNavigate()
  const productResultsRef = useRef<HTMLElement | null>(null)
  const [activeCategory, setActiveCategory] = useState(() =>
    getCategoryFromLocation(location.pathname, location.search),
  )

  useEffect(() => {
    setActiveCategory(getCategoryFromLocation(location.pathname, location.search))
  }, [location.pathname, location.search])

  /** Updates the selected category without changing the Products route. */
  const handleCategoryChange = (categoryId: string) => {
    setDetailId(null)
    setActiveCategory(categoryId)
    window.requestAnimationFrame(() => {
      productResultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  }

  const filtered = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory)
  const visibleCreditCards =
    activeCategory === "all" || activeCategory === "cards"
      ? mockCreditCards
      : []
  const visibleDigitalProducts =
    activeCategory === "all" || activeCategory === "digital"
      ? digitalBankingProducts
      : []
  const visibleProducts =
    visibleCreditCards.length > 0
      ? filtered.filter(
        (product) =>
          !specializedCardProductIds.has(product.id) &&
          product.category !== "digital",
      )
      : filtered.filter((product) => product.category !== "digital")
  const visibleProductCount =
    visibleProducts.length + visibleCreditCards.length + visibleDigitalProducts.length
  /** Returns the exact cards rendered for a category, keeping counts consistent. */
  const getProductsForCategory = (categoryId: string) => {
    const categoryProducts = categoryId === "all"
      ? products
      : products.filter((product) => product.category === categoryId)
    const categoryCreditCards = categoryId === "all" || categoryId === "cards"
      ? mockCreditCards
      : []
    const categoryDigitalProducts = categoryId === "all" || categoryId === "digital"
      ? digitalBankingProducts
      : []

    return {
      products: categoryProducts.filter(
        (product) =>
          !specializedCardProductIds.has(product.id) &&
          product.category !== "digital",
      ),
      creditCards: categoryCreditCards,
      digitalProducts: categoryDigitalProducts,
    }
  }

  const productCountForCategory = (categoryId: string) => {
    const categoryProducts = getProductsForCategory(categoryId)
    return (
      categoryProducts.products.length +
      categoryProducts.creditCards.length +
      categoryProducts.digitalProducts.length
    )
  }

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

        

{/* // =======================================================  */}

<div className="product-detail-page">
  <div className="container product-detail-page__container">
    <div className="product-detail-layout">
      <main className="product-detail-main">
        <section className="card product-overview-card" aria-labelledby="product-title">
          <div className="product-overview-card__header">
            <div className="product-overview-card__icon" aria-hidden="true">
              {selectedProduct.icon}
            </div>

            <div>
              <div className="product-overview-card__badges">
                {selectedProduct.isNew && <Badge label="New" variant="teal" />}
                {selectedProduct.rateOrFee && (
                  <Badge label={selectedProduct.rateOrFee} variant="gold" />
                )}
              </div>

              <h1 id="product-title">{selectedProduct.name}</h1>
              <p>{selectedProduct.tagline}</p>
            </div>
          </div>

          <div className="product-overview-card__actions">
            <button type="button" className="btn-primary" onClick={handleApply}>
              Apply Now
            </button>

            <button
              type="button"
              className="btn-outline"
              onClick={() => navigate("/contact")}
            >
              Talk to Us
            </button>
          </div>
        </section>

        <section className="card product-detail-section" aria-labelledby="benefits-title">
          <h2 id="benefits-title">Key Benefits</h2>

          <div className="product-benefits-grid">
            {selectedProduct.highlights.map((highlight) => (
              <div key={highlight} className="product-benefit">
                <span aria-hidden="true">✓</span>
                <p>{highlight}</p>
              </div>
            ))}
          </div>
        </section>

        {selectedProduct.eligibility?.length > 0 && (
          <section className="card product-detail-section" aria-labelledby="eligibility-title">
            <h2 id="eligibility-title">Eligibility</h2>
            {/* Existing eligibility list */}
          </section>
        )}

        {selectedProduct.requiredDocs?.length > 0 && (
          <section className="card product-detail-section" aria-labelledby="documents-title">
            <h2 id="documents-title">Required Documents</h2>
            {/* Existing documents list */}
          </section>
        )}

        {selectedProduct.faqs?.length > 0 && (
          <section className="card product-detail-section" aria-labelledby="faq-title">
            <h2 id="faq-title">Frequently Asked Questions</h2>
            <FaqAccordion items={selectedProduct.faqs} />
          </section>
        )}
      </main>

      <aside className="product-detail-sidebar" aria-label="Product application and fees">
        <div className="card product-fee-card">
          <h2>Fees &amp; Charges</h2>

          <dl className="product-fee-list">
            {selectedProduct.fees.map((fee) => (
              <div key={fee.item}>
                <dt>{fee.item}</dt>
                <dd>{fee.amount}</dd>
              </div>
            ))}
          </dl>

          <p className="product-fee-card__notice">
            Fees and eligibility are subject to UCB’s current terms and approval.
          </p>

          <button type="button" className="btn-primary" onClick={handleApply}>
            Apply Now
          </button>
        </div>

        <div className="product-help-card">
          <strong>Need help?</strong>
          <span>
            Call <a href="tel:+85523999001">+855 23 999 001</a> or visit a UCB branch.
          </span>
        </div>
      </aside>
    </div>
  </div>
</div>
{/* ================================================== */}

      </div>
    )
  }

  return (
    <div style={{ background: "#F4F6F8", minHeight: "100vh" }}>
      {/* Header */}
      {activeCategory === "personal" ? (
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Products & Services", href: "/products" },
            { label: "Personal Banking" },
          ]}
          title="Personal Banking"
          subtitle="Explore accounts and banking services designed for your everyday needs."
          variant="personal"
        />
      ) : activeCategory === "business" ? (
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Products & Services", href: "/products" },
            { label: "Business Banking" },
          ]}
          eyebrow="UCB FOR BUSINESS"
          title="Business Banking"
          subtitle="Banking solutions that help your business manage cash flow, make payments, and grow with confidence."
          variant="business"
          actions={[
            {
              label: "Talk to our business team",
              href: "/contact/business-banking",
              variant: "primary",
            },
            {
              label: "Explore solutions",
              href: "#business-solutions",
              variant: "secondary",
            },
          ]}
        />
      ) : (
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
      )}

      <div className="container" style={{ padding: "3rem 1.5rem 2.5rem" }}>
        <div
          className="sidebar-layout"
          
        >
          {/* Sidebar filter */}
          <aside className="products-filter-sidebar">
            <div className="card products-filter-sidebar__card">
              <div className="products-filter-sidebar__title">
                FILTER BY CATEGORY
              </div>
              {categories.map((cat) => (
                (() => {
                  const isActive = activeCategory === cat.id
                  return (
                <button
                  key={cat.id}
                  type="button"
                  className={`products-filter-sidebar__button${isActive ? " is-active" : ""}`}
                  aria-pressed={isActive}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <span className="products-filter-sidebar__label">{cat.label}</span>
                  <span className="products-filter-sidebar__count">
                    {productCountForCategory(cat.id)}
                  </span>
                </button>
                  )
                })()
              ))}
            </div>
          </aside>

          {/* Product grid */}
          <main
            ref={productResultsRef}
            className="products-results"
            id={activeCategory === "business" ? "business-solutions" : "product-results"}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
              }}
            >
              <div style={{ fontSize: 14, color: "#6B7280" }}>
                Showing <strong>{visibleProductCount}</strong> product
                {visibleProductCount !== 1 ? "s" : ""}
              </div>
            </div>
            {(visibleProductCount > 0) ? (
              <div
                className="products-grid"
              >
                {visibleProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onSelect={(id) => {
                      setDetailId(id)
                      routerNavigate(`/products/${encodeURIComponent(id)}`)
                    }}
                  />
                ))}
                {visibleCreditCards.map((product) => (
                  <CreditCardProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="products-empty-state" role="status">
                <h2>No products found</h2>
                <p>There are no products in this category yet.</p>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => handleCategoryChange("all")}
                >
                  View All Products
                </button>
              </div>
            )}
            {visibleDigitalProducts.length > 0 && (
              <section className="ucb-product-service-section">
                {/* <SectionHeader
                  title="Digital Banking"
                  subtitle="Three digital banking services. Mobile app capabilities are shown inside UCB Mobile Banking."
                /> */}
                <div
                  className="ucb-product-service-grid"
                  aria-label="Digital Banking products and services"
                >
                  {visibleDigitalProducts.map((product) => (
                    <ProductServiceCard product={product} key={product.title} />
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
