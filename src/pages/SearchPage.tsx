import { useState, useMemo } from "react"
import { products } from "../data/products"
import { branches } from "../data/branches"
import { news } from "../data/news"
import { promotions } from "../data/promotions"
import { jobs } from "../data/jobs"
import type { Page } from "../types/navigation"

interface SearchPageProps {
  navigate: (p: Page) => void
  initialQuery?: string
}

interface SearchResult {
  id: string
  type: "product" | "branch" | "news" | "promotion" | "job" | "page"
  title: string
  excerpt: string
  page: Page
  badge: string
  badgeColor: string
}

const staticPages: SearchResult[] = [
  {
    id: "home",
    type: "page",
    title: "Home",
    excerpt:
      "UCB homepage with account opening, loans, digital banking, and more.",
    page: "home",
    badge: "Page",
    badgeColor: "#6B7280",
  },
  {
    id: "products",
    type: "page",
    title: "Products & Services",
    excerpt:
      "Savings accounts, current accounts, fixed deposits, loans, and cards for personal and business customers.",
    page: "products",
    badge: "Page",
    badgeColor: "#6B7280",
  },
  {
    id: "digital-banking",
    type: "page",
    title: "Digital Banking",
    excerpt:
      "UCB Mobile App and Internet Banking — transfer money, pay bills, manage cards, and more.",
    page: "digital-banking",
    badge: "Page",
    badgeColor: "#6B7280",
  },
  {
    id: "branches",
    type: "page",
    title: "Branches & ATMs",
    excerpt: "Find your nearest UCB branch, ATM, or CDM across Cambodia.",
    page: "branches",
    badge: "Page",
    badgeColor: "#6B7280",
  },
  {
    id: "rates",
    type: "page",
    title: "Rates & Calculators",
    excerpt:
      "Exchange rates, deposit rates, loan rates, and financial calculators.",
    page: "rates",
    badge: "Page",
    badgeColor: "#6B7280",
  },
  {
    id: "careers",
    type: "page",
    title: "Careers",
    excerpt:
      "Join UCB — open positions in technology, credit, branch banking, HR, and more.",
    page: "careers",
    badge: "Page",
    badgeColor: "#6B7280",
  },
  {
    id: "about",
    type: "page",
    title: "About UCB",
    excerpt:
      "Bank profile, leadership team, milestones, governance, and annual reports.",
    page: "about",
    badge: "Page",
    badgeColor: "#6B7280",
  },
  {
    id: "contact",
    type: "page",
    title: "Help & Support",
    excerpt:
      "Contact UCB, FAQs, complaint submission, and emergency card blocking.",
    page: "contact",
    badge: "Page",
    badgeColor: "#6B7280",
  },
  {
    id: "online-services",
    type: "page",
    title: "Online Services",
    excerpt:
      "Open an account, apply for a loan, request a card, book an appointment, track your application.",
    page: "online-services",
    badge: "Page",
    badgeColor: "#6B7280",
  },
  {
    id: "security",
    type: "page",
    title: "Security Center",
    excerpt:
      "Security tips, fraud awareness, phishing report, lost card emergency, safety checklist.",
    page: "security",
    badge: "Page",
    badgeColor: "#6B7280",
  },
  {
    id: "news",
    type: "page",
    title: "News & Updates",
    excerpt:
      "UCB bank news, product announcements, community updates, digital banking news, and financial education.",
    page: "news",
    badge: "Page",
    badgeColor: "#6B7280",
  },
  {
    id: "announcements",
    type: "page",
    title: "Announcements",
    excerpt:
      "System maintenance notices, security alerts, holiday hours, service updates, and regulatory notices.",
    page: "announcements",
    badge: "Page",
    badgeColor: "#6B7280",
  },
]

/** Builds the searchable site index from public content datasets. */
function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [...staticPages]

  products.forEach((p) =>
    results.push({
      id: "product-" + p.id,
      type: "product",
      title: p.name,
      excerpt: p.tagline,
      page: "products",
      badge: "Product",
      badgeColor: "#009C9F",
    }),
  )

  branches.forEach((b) =>
    results.push({
      id: "branch-" + b.id,
      type: "branch",
      title: b.name,
      excerpt: `${b.address}, ${b.province} · ${b.hours}`,
      page: "branches",
      badge: b.type === "branch" ? "Branch" : "ATM",
      badgeColor: "#1A3D5C",
    }),
  )

  news.forEach((n) =>
    results.push({
      id: "news-" + n.id,
      type: "news",
      title: n.title,
      excerpt: n.excerpt,
      page: "news",
      badge: "News",
      badgeColor: "#7C3AED",
    }),
  )

  promotions.forEach((p) =>
    results.push({
      id: "promo-" + p.id,
      type: "promotion",
      title: p.title,
      excerpt: p.description,
      page: "promotions",
      badge: "Promotion",
      badgeColor: "#C9A84C",
    }),
  )

  jobs.forEach((j) =>
    results.push({
      id: "job-" + j.id,
      type: "job",
      title: j.title,
      excerpt: `${j.department.replace(/-/g, " ")} · ${j.location} · ${j.type.replace(/-/g, " ")}`,
      page: "careers",
      badge: "Job",
      badgeColor: "#059669",
    }),
  )

  return results
}

const allResults = buildIndex()

const typeFilters = [
  { id: "all", label: "All" },
  { id: "page", label: "Pages" },
  { id: "product", label: "Products" },
  { id: "branch", label: "Branches" },
  { id: "news", label: "News" },
  { id: "promotion", label: "Promotions" },
  { id: "job", label: "Jobs" },
]

/** Renders site search, filters results, and routes users to selected content. */
export default function SearchPage({
  navigate,
  initialQuery = "",
}: SearchPageProps) {
  const [query, setQuery] = useState(initialQuery)
  const [submitted, setSubmitted] = useState(!!initialQuery)
  const [typeFilter, setTypeFilter] = useState("all")

  const filtered = useMemo(() => {
    if (!submitted || query.trim().length < 2) return []
    const q = query.toLowerCase()
    return allResults.filter((r) => {
      if (typeFilter !== "all" && r.type !== typeFilter) return false
      return (
        r.title.toLowerCase().includes(q) || r.excerpt.toLowerCase().includes(q)
      )
    })
  }, [query, submitted, typeFilter])

  /** Applies the search query from the search input. */
  const handleSearch = () => {
    if (query.trim().length >= 2) setSubmitted(true)
  }

  return (
    <div style={{ background: "#F4F6F8", minHeight: "100vh" }}>
      {/* Search hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
          padding: "4rem 0 3rem",
        }}
      >
        <div className="container" style={{ maxWidth: 760 }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#fff",
              marginBottom: "1.5rem",
            }}
          >
            Search UCB
          </h1>
          <div className="hero-search">
            <input
              className="hero-search__input"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (!e.target.value) setSubmitted(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search products, branches, news, jobs..."
              autoFocus
            />

            <button
              type="button"
              onClick={handleSearch}
              className="btn-primary hero-search__button"
            >
              Search
            </button>
          </div>
          {query.trim().length > 0 && query.trim().length < 2 && (
            <p
              style={{
                fontSize: 13,
                color: "rgb(255, 255, 255)",
                marginTop: 8,
              }}
            >
              Enter at least 2 characters to search.
            </p>
          )}
        </div>
      </section>

      <div
        className="container"
        style={{ padding: "2rem 1.5rem", maxWidth: 900 }}
      >
        {submitted && (
          <>
            {/* Type filters */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginBottom: "1.5rem",
              }}
            >
              {typeFilters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setTypeFilter(f.id)}
                  style={{
                    padding: "0.5rem 1.25rem",
                    borderRadius: 20,
                    border: `2px solid ${typeFilter === f.id ? "#009C9F" : "#E5E7EB"
                      }`,
                    background: typeFilter === f.id ? "#009C9F" : "#fff",
                    color: typeFilter === f.id ? "#fff" : "#374151",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 150ms",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Results count */}
            <div
              style={{
                fontSize: 14,
                color: "#6B7280",
                marginBottom: "1.25rem",
              }}
            >
              {filtered.length === 0
                ? `No results for "${query}"`
                : `${filtered.length} result${filtered.length !== 1 ? "s" : ""
                } for "${query}"`}
            </div>

            {filtered.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem",
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid #E5E7EB",
                }}
              >
                <div style={{ fontSize: 44, marginBottom: "1rem" }}>🔍</div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: 8,
                  }}
                >
                  No results found
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#6B7280",
                    marginBottom: "1.5rem",
                  }}
                >
                  Try a different search term, or browse our pages directly.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    { label: "Products", page: "products" as Page },
                    { label: "Branches", page: "branches" as Page },
                    { label: "Careers", page: "careers" as Page },
                    { label: "Help & Support", page: "contact" as Page },
                  ].map((s) => (
                    <button
                      key={s.label}
                      className="btn-outline"
                      onClick={() => navigate(s.page)}
                      style={{ fontSize: 13 }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem",
                }}
              >
                {filtered.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => navigate(result.page)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      background: "#fff",
                      borderRadius: 12,
                      border: "1px solid #E5E7EB",
                      padding: "1.25rem",
                      cursor: "pointer",
                      transition: "all 150ms",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#009C9F"
                      e.currentTarget.style.transform = "translateY(-1px)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#E5E7EB"
                      e.currentTarget.style.transform = "none"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 6,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: result.badgeColor,
                              background: `${result.badgeColor}15`,
                              padding: "2px 8px",
                              borderRadius: 4,
                            }}
                          >
                            {result.badge}
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: "#0A2540",
                            marginBottom: 4,
                          }}
                        >
                          {result.title}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            color: "#6B7280",
                            lineHeight: 1.5,
                          }}
                        >
                          {result.excerpt}
                        </div>
                      </div>
                      <span
                        style={{
                          color: "#009C9F",
                          fontSize: 18,
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {!submitted && (
          <div>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#0A2540",
                marginBottom: "1.25rem",
              }}
            >
              Browse by Category
            </h3>
            <div
              className="grid-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
              }}
            >
              {[
                {
                  icon: "💰",
                  label: "Products & Services",
                  page: "products" as Page,
                },
                {
                  icon: "📱",
                  label: "Digital Banking",
                  page: "digital-banking" as Page,
                },
                {
                  icon: "📍",
                  label: "Branches & ATMs",
                  page: "branches" as Page,
                },
                {
                  icon: "📊",
                  label: "Rates & Calculators",
                  page: "rates" as Page,
                },
                { icon: "💼", label: "Careers", page: "careers" as Page },
                {
                  icon: "🔒",
                  label: "Security Center",
                  page: "security" as Page,
                },
                {
                  icon: "🌐",
                  label: "Online Services",
                  page: "online-services" as Page,
                },
                { icon: "🏛️", label: "About UCB", page: "about" as Page },
                {
                  icon: "💬",
                  label: "Help & Support",
                  page: "contact" as Page,
                },
                { icon: "📰", label: "News & Updates", page: "news" as Page },
                {
                  icon: "📢",
                  label: "Announcements",
                  page: "announcements" as Page,
                },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.page)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "1rem 1.25rem",
                    background: "#fff",
                    borderRadius: 12,
                    border: "1px solid #E5E7EB",
                    cursor: "pointer",
                    transition: "all 150ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#009C9F"
                    e.currentTarget.style.background = "#E6F7F7"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#E5E7EB"
                    e.currentTarget.style.background = "#fff"
                  }}
                >
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                  <span
                    style={{ fontSize: 14, fontWeight: 600, color: "#0A2540" }}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
