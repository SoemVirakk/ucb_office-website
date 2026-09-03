import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate as useRouterNavigate } from "react-router-dom"
import HeaderDropdown from "./HeaderDropdown"
import type { LocaleCode } from "../../types/localization"
import type { Page } from "../../types/navigation"

interface HeaderProps {
  page: Page
  navigate: (p: Page) => void
  lang: LocaleCode
  onLangChange: (lang: LocaleCode) => void
  onSearch: (q: string) => void
}

type HeaderNavLink = {
  label: string
  labelKm: string
  labelZh: string
  page: Page
  productCategory?: "personal" | "business"
}

const navLinks: HeaderNavLink[] = [
    {
      label: "Personal",
      labelKm: "ផ្ទាល់ខ្លួន",
      labelZh: "个人业务",
      page: "products",
      productCategory: "personal",
    },
    {
      label: "Business",
      labelKm: "អាជីវកម្ម",
      labelZh: "企业业务",
      page: "products",
      productCategory: "business",
    },
    {
      label: "Digital Banking",
      labelKm: "ធនាគារឌីជីថល",
      labelZh: "数字银行",
      page: "digital-banking",
    },
    {
      label: "Help & Support",
      labelKm: "ជំនួយ",
      labelZh: "帮助与支持",
      page: "contact",
    },
  ]

const navItemWidths: Record<Page, number> = {
  products: 84,
  "digital-banking": 132,
  rates: 72,
  contact: 132,
  home: 84,
  branches: 100,
  promotions: 110,
  login: 110,
  "design-system": 120,
  careers: 110,
  about: 112,
  "online-services": 130,
  security: 130,
  search: 100,
  "not-found": 110,
  news: 110,
  announcements: 130,
  cms: 100,
  maintenance: 120,
  "design-review": 130,
}

const languageOptions: { code: LocaleCode; label: string; shortLabel: string }[] =
  [
    { code: "en", label: "English", shortLabel: "EN" },
    { code: "km", label: "Khmer", shortLabel: "ខ្មែរ" },
    { code: "zh-CN", label: "Chinese", shortLabel: "中文" },
  ]

const aboutLinks = [
  {
    label: "About Us",
    labelZh: "关于我们",
    page: "about" as Page,
    path: "/about",
  },
  {
    label: "Leadership",
    labelZh: "领导团队",
    page: "about" as Page,
    path: "/leadership",
  },
  {
    label: "Careers",
    labelZh: "招聘",
    page: "careers" as Page,
    path: "/careers",
  },
  {
    label: "Contact Us",
    labelZh: "联系我们",
    page: "contact" as Page,
    path: "/contact",
  },
]

const newsLinks: {
  label: string
  labelKm: string
  page: Page
  icon: string
  desc: string
}[] = [
  {
    label: "Promotions",
    labelKm: "ការផ្សព្វផ្សាយ",
    page: "promotions",
    icon: "🎁",
    desc: "Offers and deals",
  },
  {
    label: "News & Updates",
    labelKm: "ព័ត៌មាន",
    page: "news",
    icon: "📰",
    desc: "Bank news and articles",
  },
  {
    label: "Announcements",
    labelKm: "សេចក្តីជូនដំណឹង",
    page: "announcements",
    icon: "📢",
    desc: "Maintenance and alerts",
  },
]

export default function Header({
  page,
  navigate,
  lang,
  onLangChange,
  onSearch,
}: HeaderProps) {
  const routerNavigate = useRouterNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState("")
  const [newsMenuOpen, setNewsMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const languageMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("keydown", closeMenuOnEscape)
    return () => document.removeEventListener("keydown", closeMenuOnEscape)
  }, [menuOpen])

  useEffect(() => {
    if (!languageMenuOpen) return
    const closeLanguageMenu = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent) {
        if (event.key === "Escape") setLanguageMenuOpen(false)
        return
      }

      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setLanguageMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", closeLanguageMenu)
    document.addEventListener("keydown", closeLanguageMenu)
    return () => {
      document.removeEventListener("mousedown", closeLanguageMenu)
      document.removeEventListener("keydown", closeLanguageMenu)
    }
  }, [languageMenuOpen])

  const currentProductCategory = new URLSearchParams(location.search).get(
    "category",
  )
  const isActive = (p: Page) => page === p
  const isNavLinkActive = (link: HeaderNavLink) => {
    if (link.productCategory) {
      return page === "products" && currentProductCategory === link.productCategory
    }
    return isActive(link.page)
  }
  const handleNavLinkClick = (link: HeaderNavLink) => {
    if (link.productCategory) {
      routerNavigate(`/products?category=${link.productCategory}`)
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    navigate(link.page)
  }

  const handleSearchSubmit = () => {
    if (searchVal.trim()) {
      onSearch(searchVal.trim())
      setSearchOpen(false)
      setSearchVal("")
    }
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#fff",
        borderBottom: "1px solid #E5E7EB",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
      role="banner"
    >
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", height: 68 }}
      >
        {/* Logo */}
        <button
          onClick={() => {
            navigate("home")
            setMenuOpen(false)
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 0",
            flexShrink: 0,
          }}
          aria-label="UCB Home"
        >
          <img
            src="/assets/logo.jpg"
            alt="UCB Bank"
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              objectFit: "contain",
            }}
          />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#0A2540" }}>
              Union Commercial
            </div>
            <div
              style={{
                fontWeight: 500,
                fontSize: 11,
                color: "#009C9F",
                letterSpacing: 0.5,
              }}
            >
              BANK CAMBODIA
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginLeft: 32,
            flex: 1,
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavLinkClick(link)}
              className="btn-ghost"
              style={{
                fontSize: 14,
                fontWeight:
                  isNavLinkActive(link) && link.page !== "home" ? 600 : 500,
                color:
                  isNavLinkActive(link) && link.page !== "home"
                    ? "#009C9F"
                    : "#0A2540",
                padding: "0.5rem 0.75rem",
                width: navItemWidths[link.page],
                justifyContent: "center",
              }}
            >
              {lang === "km"
                ? link.labelKm
                : lang === "zh-CN"
                  ? link.labelZh
                  : link.label}
            </button>
          ))}

          <HeaderDropdown
            label="About UCB"
            labelKm="អំពី UCB"
            labelZh="关于 UCB"
            links={aboutLinks}
            active={page === "about" || page === "careers"}
            activePath={location.pathname}
            lang={lang}
            onNavigate={(link) => {
              if (link.path === "/leadership") routerNavigate(link.path)
              else navigate(link.page as Page)
            }}
          />

          {/* News & Media dropdown */}
          <div style={{ position: "relative" }}>
            <button
              className="btn-ghost"
              onClick={() => setNewsMenuOpen((o) => !o)}
              onBlur={(e) => {
                if (
                  !e.currentTarget.parentElement?.contains(
                    e.relatedTarget as Node,
                  )
                )
                  setNewsMenuOpen(false)
              }}
              aria-haspopup="true"
              aria-expanded={newsMenuOpen}
              style={{
                fontSize: 14,
                fontWeight: ["promotions", "news", "announcements"].includes(
                  page,
                )
                  ? 600
                  : 500,
                color: ["promotions", "news", "announcements"].includes(page)
                  ? "#009C9F"
                  : "#0A2540",
                padding: "0.5rem 0.75rem",
                gap: 4,
              }}
            >
              {lang === "km"
                ? "ព័ត៌មាន & ការផ្សព្វផ្សាយ"
                : lang === "zh-CN"
                  ? "新闻与媒体"
                  : "News & Media"}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{
                  transform: newsMenuOpen ? "rotate(180deg)" : "none",
                  transition: "transform 150ms",
                  flexShrink: 0,
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {newsMenuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  zIndex: 60,
                  background: "#fff",
                  borderRadius: 14,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  padding: "0.5rem",
                  minWidth: 240,
                }}
                role="menu"
              >
                {newsLinks.map((link) => (
                  <button
                    key={link.label}
                    role="menuitem"
                    onClick={() => {
                      navigate(link.page)
                      setNewsMenuOpen(false)
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      width: "100%",
                      padding: "0.625rem 0.875rem",
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                      textAlign: "left",
                      background: isActive(link.page)
                        ? "#E6F7F7"
                        : "transparent",
                      transition: "background 100ms",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive(link.page))
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "#F4F6F8"
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLButtonElement).style.background =
                        isActive(link.page) ? "#E6F7F7" : "transparent"
                    }}
                  >
                    <span style={{ fontSize: 20, flexShrink: 0 }}>
                      {link.icon}
                    </span>
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: isActive(link.page) ? "#009C9F" : "#0A2540",
                        }}
                      >
                        {lang === "km"
                          ? link.labelKm
                          : lang === "zh-CN"
                            ? link.label
                            : link.label}
                      </div>
                      <div
                        style={{ fontSize: 12, color: "#6B7280", marginTop: 1 }}
                      >
                        {link.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginLeft: "auto",
          }}
        >
          {/* Search */}
          {searchOpen ? (
            <div
              className="header-search-expanded"
              style={{ display: "flex", gap: 6, alignItems: "center" }}
            >
              <input
                autoFocus
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter"
                    ? handleSearchSubmit()
                    : e.key === "Escape" && setSearchOpen(false)
                }
                placeholder="Search UCB..."
                style={{
                  padding: "0.5rem 0.875rem",
                  borderRadius: 8,
                  border: "1.5px solid #009C9F",
                  fontSize: 14,
                  outline: "none",
                  width: 200,
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={handleSearchSubmit}
                className="btn-primary"
                style={{ padding: "0.5rem 1rem", fontSize: 13 }}
              >
                Go
              </button>
              <button
                onClick={() => {
                  setSearchOpen(false)
                  setSearchVal("")
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6B7280",
                  fontSize: 18,
                  padding: "0.25rem",
                }}
                aria-label="Close search"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              className="header-search-action"
              onClick={() => setSearchOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
                borderRadius: 8,
                color: "#6B7280",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Search"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          )}

          <div
            ref={languageMenuRef}
            style={{ position: "relative", flex: "0 0 auto" }}
          >
            <button
              onClick={() => setLanguageMenuOpen((open) => !open)}
              style={{
                background: "#F4F6F8",
                border: "none",
                borderRadius: 6,
                padding: "5px 10px",
                width: 48,
                fontSize: 12,
                fontWeight: 600,
                color: "#0A2540",
                cursor: "pointer",
                letterSpacing: 0.5,
              }}
              aria-label="Select language"
              aria-haspopup="menu"
              aria-expanded={languageMenuOpen}
            >
              {languageOptions.find((option) => option.code === lang)?.shortLabel}
            </button>

            {languageMenuOpen && (
              <div
                role="menu"
                aria-label="Language selector"
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  zIndex: 50,
                  minWidth: 144,
                  padding: 6,
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: 8,
                  boxShadow: "0 12px 28px rgba(10, 37, 64, 0.16)",
                }}
              >
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    role="menuitemradio"
                    aria-checked={lang === option.code}
                    onClick={() => {
                      onLangChange(option.code)
                      setLanguageMenuOpen(false)
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      border: "none",
                      borderRadius: 6,
                      padding: "8px 10px",
                      background:
                        lang === option.code ? "#F4F6F8" : "transparent",
                      color: "#0A2540",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: lang === option.code ? 700 : 500,
                      textAlign: "left",
                    }}
                  >
                    <span>{option.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700 }}>
                      {option.shortLabel}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="btn-primary header-login-action"
            onClick={() => navigate("login")}
            style={{
              fontSize: 14,
              padding: "0.5rem 1.25rem",
              width: 150,
              justifyContent: "center",
            }}
          >
            {lang === "km" ? "ចូលគណនី" : "Internet Banking"}
          </button>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              borderRadius: 8,
              color: "#0A2540",
            }}
          >
            {menuOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            borderTop: "1px solid #E5E7EB",
            borderBottom: "1px solid #E5E7EB",
            padding: "1rem 1.5rem 1.5rem",
            zIndex: 49,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          }}
          role="navigation"
          aria-label="Mobile navigation"
        >
          {/* Mobile search */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "0.75rem",
              paddingBottom: "0.875rem",
              borderBottom: "1px solid #F4F6F8",
            }}
          >
            <input
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
              placeholder="Search UCB..."
              style={{
                flex: 1,
                padding: "0.625rem 0.875rem",
                borderRadius: 8,
                border: "1.5px solid #D1D5DB",
                fontSize: 14,
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              onClick={handleSearchSubmit}
              className="btn-primary"
              style={{ fontSize: 13, padding: "0.625rem 1rem" }}
            >
              Search
            </button>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                handleNavLinkClick(link)
                setMenuOpen(false)
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                padding: "0.875rem 0",
                fontSize: 16,
                fontWeight: isNavLinkActive(link) ? 600 : 500,
                color:
                  isNavLinkActive(link) && link.page !== "home"
                    ? "#009C9F"
                    : "#0A2540",
                borderBottom: "1px solid #F4F6F8",
                cursor: "pointer",
              }}
            >
              {lang === "km"
                ? link.labelKm
                : lang === "zh-CN"
                  ? link.labelZh
                  : link.label}
            </button>
          ))}

          {/* About UCB group in mobile */}
          <div
            style={{ padding: "0.5rem 0", borderBottom: "1px solid #F4F6F8" }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#9CA3AF",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "0.5rem 0 0.25rem",
              }}
            >
              About UCB
            </div>
            {aboutLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  link.path === "/leadership"
                    ? routerNavigate(link.path)
                    : navigate(link.page)
                  setMenuOpen(false)
                }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: "0.625rem 0",
                  fontSize: 15,
                  fontWeight:
                    link.page === page ||
                    (link.path === "/leadership" && page === "about")
                      ? 600
                      : 500,
                  color:
                    link.page === page ||
                    (link.path === "/leadership" && page === "about")
                      ? "#009C9F"
                      : "#374151",
                  cursor: "pointer",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* News & Media group in mobile */}
          <div
            style={{ padding: "0.5rem 0", borderBottom: "1px solid #F4F6F8" }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#9CA3AF",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "0.5rem 0 0.25rem",
              }}
            >
              News &amp; Media
            </div>
            {newsLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  navigate(link.page)
                  setMenuOpen(false)
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: "0.625rem 0",
                  fontSize: 15,
                  fontWeight: isActive(link.page) ? 600 : 500,
                  color: isActive(link.page) ? "#009C9F" : "#374151",
                  cursor: "pointer",
                }}
              >
                <span>{link.icon}</span>
                {lang === "km" ? link.labelKm : link.label}
              </button>
            ))}
          </div>

          {/* Extra mobile links */}
          {[
            { label: "Online Services", page: "online-services" as Page },
            { label: "Security Center", page: "security" as Page },
          ].map((link) => (
            <button
              key={link.label}
              onClick={() => {
                navigate(link.page)
                setMenuOpen(false)
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                padding: "0.875rem 0",
                fontSize: 14,
                color: "#6B7280",
                borderBottom: "1px solid #F4F6F8",
                cursor: "pointer",
              }}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => {
              navigate("login")
              setMenuOpen(false)
            }}
            className="btn-primary"
            style={{
              marginTop: "1rem",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {lang === "km" ? "ចូលគណនី" : "Internet Banking"}
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 1100px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .header-login-action { display: none; }
        }
        @media (min-width: 1101px) and (max-width: 1300px) {
          .header-login-action { width: 140px !important; padding-left: 0.75rem !important; padding-right: 0.75rem !important; }
        }
        @media (max-width: 600px) {
          .header-search-action { display: none !important; }
          .header-search-expanded {
            position: absolute;
            top: 68px;
            left: 1rem;
            right: 1rem;
            padding: 0.75rem;
            background: #fff;
            border: 1px solid #E5E7EB;
            border-radius: 0 0 10px 10px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
            z-index: 61;
          }
          .header-search-expanded input { min-width: 0; width: auto !important; flex: 1; }
        }
      `}</style>
    </header>
  )
}
