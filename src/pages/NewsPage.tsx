import { useEffect, useMemo, useState } from "react"
import { useNavigate as useRouterNavigate } from "react-router-dom"
import { news, type NewsItem } from "../data/news"
import type { Page } from "../types/navigation"

interface NewsPageProps {
  navigate: (p: Page) => void
  initialArticleId?: string | null
}

type NewsCategory = "all" | "bank-news" | "products" | "community" | "digital-banking" | "financial-education"

const categoryMap: Record<string, NewsCategory> = {
  announcement: "bank-news",
  financial: "bank-news",
  community: "community",
  award: "bank-news",
  technology: "digital-banking",
  partnership: "community",
}

const categories: { id: NewsCategory label: string icon: string }[] = [
  { id: "all", label: "All News", icon: "📰" },
  { id: "bank-news", label: "Bank News", icon: "🏦" },
  { id: "products", label: "Products", icon: "💳" },
  { id: "community", label: "Community", icon: "🤝" },
  { id: "digital-banking", label: "Digital Banking", icon: "📱" },
  { id: "financial-education", label: "Financial Education", icon: "📚" },
]

const PER_PAGE = 6

/** Formats a date string for human-readable public content display. */
function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/** Maps a news category key to its display label. */
function getCategoryLabel(cat: string): string {
  const found = categories.find((c) => c.id === cat)
  return found ? found.label : cat
}

/** Normalizes news category values for filter grouping. */
function getMappedCategory(item: NewsItem): NewsCategory {
  return categoryMap[item.category] || "bank-news"
}

/** Renders news filters, listing cards, and detail content. */
export default function NewsPage({
  navigate,
  initialArticleId,
}: NewsPageProps) {
  const routerNavigate = useRouterNavigate()
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("all")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(
    initialArticleId
      ? (news.find((n) => n.id === initialArticleId) ?? null)
      : null,
  )
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setSelectedArticle(
      initialArticleId
        ? (news.find((item) => item.id === initialArticleId) ?? null)
        : null,
    )
  }, [initialArticleId])

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const mapped = getMappedCategory(item)
      const matchCat = activeCategory === "all" || mapped === activeCategory
      const matchSearch =
        !search.trim() ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [activeCategory, search])

  const paged = filteredNews.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  )
  const totalPages = Math.ceil(filteredNews.length / PER_PAGE)
  const featured = news[0]

  /** Changes the active news category filter and closes the selected article. */
  const handleCatChange = (cat: NewsCategory) => {
    setActiveCategory(cat)
    setCurrentPage(1)
    setSearch("")
  }

  /** Opens a news detail view and mirrors it into the browser URL. */
  const openArticle = (article: NewsItem) => {
    setSelectedArticle(article)
    routerNavigate(`/news/${encodeURIComponent(article.id)}`)
  }

  /** Returns from a news detail URL to the list route. */
  const closeArticle = () => {
    setSelectedArticle(null)
    routerNavigate("/news")
  }

  /** Copies or falls back to showing the current news article URL. */
  const handleShare = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (selectedArticle) {
    const related = news
      .filter(
        (n) =>
          n.id !== selectedArticle.id &&
          getMappedCategory(n) === getMappedCategory(selectedArticle),
      )
      .slice(0, 3)
    return (
      <div style={{ background: "#F4F6F8", minHeight: "100vh" }}>
        {/* Article header */}
        <div
          style={{
            background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
            padding: "3rem 0 0",
          }}
        >
          <div className="container" style={{ maxWidth: 860 }}>
            <button
              onClick={closeArticle}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 500,
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: 0,
              }}
            >
              ← Back to News
            </button>
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: "1rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  background: "#009C9F",
                  color: "#fff",
                  padding: "3px 10px",
                  borderRadius: 20,
                }}
              >
                {getCategoryLabel(getMappedCategory(selectedArticle))}
              </span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                {formatDate(selectedArticle.date)} · {selectedArticle.readTime}
              </span>
            </div>
            <h1
              style={{
                fontSize: 30,
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.3,
                marginBottom: "1rem",
              }}
            >
              {selectedArticle.title}
            </h1>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              {selectedArticle.excerpt}
            </p>
          </div>
        </div>

        <div
          className="container"
          style={{ maxWidth: 860, padding: "0 1.5rem 4rem" }}
        >
          {/* Cover image */}
          <div
            style={{
              marginTop: "-2rem",
              marginBottom: "2rem",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
          >
            <img
              src={selectedArticle.thumbnail}
              alt={selectedArticle.title}
              style={{
                width: "100%",
                height: 360,
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Author + share */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem 1.25rem",
              background: "#fff",
              borderRadius: 12,
              marginBottom: "2rem",
              border: "1px solid #E5E7EB",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #009C9F, #007B7E)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 14,
                }}
              >
                {selectedArticle.author.charAt(0)}
              </div>
              <div>
                <div
                  style={{ fontSize: 14, fontWeight: 600, color: "#0A2540" }}
                >
                  {selectedArticle.author}
                </div>
                <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                  Published {formatDate(selectedArticle.date)}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { icon: "📘", label: "Facebook" },
                { icon: "📤", label: "Share" },
                { icon: "🔗", label: "Copy Link" },
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={handleShare}
                  aria-label={s.label}
                  style={{
                    background: "#F4F6F8",
                    border: "none",
                    borderRadius: 8,
                    padding: "0.5rem 0.875rem",
                    fontSize: 13,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    color: "#374151",
                    fontWeight: 500,
                  }}
                >
                  {s.icon}{" "}
                  {s.label === "Copy Link" && copied ? "Copied!" : s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Article body */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "2rem 2.5rem",
              border: "1px solid #E5E7EB",
              marginBottom: "2.5rem",
            }}
          >
            <p
              style={{
                fontSize: 16,
                color: "#1F2937",
                lineHeight: 2,
                whiteSpace: "pre-wrap",
              }}
            >
              {selectedArticle.content}
            </p>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: "1.25rem",
                }}
              >
                Related News
              </h2>
              <div
                className="grid-3"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                }}
              >
                {related.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      openArticle(item)
                    }}
                    style={{
                      textAlign: "left",
                      background: "#fff",
                      border: "1px solid #E5E7EB",
                      borderRadius: 12,
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "all 150ms",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#009C9F"
                      e.currentTarget.style.transform = "translateY(-2px)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#E5E7EB"
                      e.currentTarget.style.transform = "none"
                    }}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: 140,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <div style={{ padding: "0.875rem" }}>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#009C9F",
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        {formatDate(item.date)}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#0A2540",
                          lineHeight: 1.4,
                        }}
                      >
                        {item.title}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: "#F4F6F8", minHeight: "100vh" }}>
      {/* Page header */}
      <section
        style={{
          background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
          padding: "4rem 0 3rem",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: "1rem",
            }}
          >
            <span style={{ fontSize: 36 }}>📰</span>
            <div>
              <h1
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                News & Updates
              </h1>
              <p
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.7)",
                  marginTop: 6,
                }}
              >
                Stay informed about UCB and Cambodian banking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured article */}
      {featured && (
        <div className="container" style={{ padding: "2rem 1.5rem 0" }}>
          <button
            onClick={() => openArticle(featured)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              borderRadius: 20,
              overflow: "hidden",
              position: "relative",
              height: 320,
              cursor: "pointer",
              border: "none",
              padding: 0,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            <img
              src={featured.thumbnail}
              alt={featured.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(10,37,64,0.9) 0%, rgba(10,37,64,0.3) 100%)",
                display: "flex",
                alignItems: "center",
                padding: "2.5rem",
              }}
            >
              <div style={{ maxWidth: 560 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    background: "#009C9F",
                    color: "#fff",
                    padding: "3px 10px",
                    borderRadius: 20,
                    display: "inline-block",
                    marginBottom: "0.75rem",
                  }}
                >
                  ⭐ Featured · {getCategoryLabel(getMappedCategory(featured))}
                </span>
                <h2
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: "#fff",
                    lineHeight: 1.3,
                    marginBottom: "0.75rem",
                  }}
                >
                  {featured.title}
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.6,
                    marginBottom: "1rem",
                  }}
                >
                  {featured.excerpt}
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <span
                    style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}
                  >
                    {formatDate(featured.date)} · {featured.readTime}
                  </span>
                  <span className="btn-primary" style={{ fontSize: 13 }}>
                    Read Article →
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="container" style={{ padding: "2rem 1.5rem 1rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              flex: 1,
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCatChange(cat.id)}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: 20,
                  border: `2px solid ${
                    activeCategory === cat.id ? "#009C9F" : "#E5E7EB"
                  }`,
                  background: activeCategory === cat.id ? "#009C9F" : "#fff",
                  color: activeCategory === cat.id ? "#fff" : "#374151",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 150ms",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
          <input
            type="search"
            placeholder="Search news..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: 20,
              border: "2px solid #E5E7EB",
              fontSize: 13,
              outline: "none",
              minWidth: 200,
              fontFamily: "inherit",
            }}
            aria-label="Search news"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="container" style={{ padding: "0 1.5rem 0.75rem" }}>
        <span style={{ fontSize: 13, color: "#6B7280" }}>
          {filteredNews.length}{" "}
          {filteredNews.length === 1 ? "article" : "articles"}
          {activeCategory !== "all" &&
            ` in ${getCategoryLabel(activeCategory)}`}
          {search && ` matching "${search}"`}
        </span>
      </div>

      {/* Article grid */}
      <div className="container" style={{ padding: "0 1.5rem 4rem" }}>
        {paged.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem",
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #E5E7EB",
            }}
          >
            <div style={{ fontSize: 44, marginBottom: "1rem" }}>📭</div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#0A2540",
                marginBottom: 8,
              }}
            >
              No articles found
            </h3>
            <p style={{ fontSize: 14, color: "#6B7280" }}>
              Try a different category or search term.
            </p>
          </div>
        ) : (
          <>
            <div
              className="grid-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.25rem",
                marginBottom: "2.5rem",
              }}
            >
              {paged.map((item) => (
                <button
                  key={item.id}
                  onClick={() => openArticle(item)}
                  style={{
                    textAlign: "left",
                    background: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: 16,
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 150ms",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#009C9F"
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.10)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#E5E7EB"
                    e.currentTarget.style.transform = "none"
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.04)"
                  }}
                >
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <div style={{ position: "absolute", top: 10, left: 10 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          background: "#009C9F",
                          color: "#fff",
                          padding: "2px 8px",
                          borderRadius: 20,
                        }}
                      >
                        {getCategoryLabel(getMappedCategory(item))}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "1rem 1.125rem 1.25rem" }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#9CA3AF",
                        marginBottom: 6,
                      }}
                    >
                      {formatDate(item.date)} · {item.readTime}
                    </div>
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#0A2540",
                        lineHeight: 1.5,
                        marginBottom: 8,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 12,
                        color: "#6B7280",
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.excerpt}
                    </p>
                    <div
                      style={{
                        marginTop: "0.875rem",
                        fontSize: 12,
                        color: "#009C9F",
                        fontWeight: 600,
                      }}
                    >
                      Read more →
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: 8,
                    border: "1.5px solid #E5E7EB",
                    background: currentPage === 1 ? "#F9FAFB" : "#fff",
                    color: currentPage === 1 ? "#9CA3AF" : "#374151",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  ← Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        border: `1.5px solid ${
                          currentPage === p ? "#009C9F" : "#E5E7EB"
                        }`,
                        background: currentPage === p ? "#009C9F" : "#fff",
                        color: currentPage === p ? "#fff" : "#374151",
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {p}
                    </button>
                  ),
                )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: 8,
                    border: "1.5px solid #E5E7EB",
                    background: currentPage === totalPages ? "#F9FAFB" : "#fff",
                    color: currentPage === totalPages ? "#9CA3AF" : "#374151",
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
