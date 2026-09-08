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
]

const navItemWidths: Record<Page, number> = {
  products: 84,
  "digital-banking": 132,
  rates: 72,
  "exchange-rates": 110,
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

const languageOptions: {
  code: LocaleCode
  label: string
  shortLabel: string
}[] = [
    {
      code: "en",
      label: "English",
      shortLabel: "EN",
    },
    {
      code: "km",
      label: "Khmer",
      shortLabel: "ខ្មែរ",
    },
    {
      code: "zh-CN",
      label: "Chinese",
      shortLabel: "中文",
    },
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
    path: "/about/leadership",
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
  {
    label: "Help & Support",
    labelZh: "帮助与支持",
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

/** Renders the sticky public header, language switcher, search, and mobile menu. */
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
  const newsMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    /** Closes the mobile menu when Escape is pressed. */
    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("keydown", closeMenuOnEscape)
    return () => document.removeEventListener("keydown", closeMenuOnEscape)
  }, [menuOpen])

  useEffect(() => {
    if (!languageMenuOpen) return
    /** Closes the language selector on outside click or Escape. */
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

  useEffect(() => {
    if (!newsMenuOpen) return
    /** Closes the news menu when Escape is pressed or focus moves outside it. */
    const closeNewsMenu = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent) {
        if (event.key === "Escape") setNewsMenuOpen(false)
        return
      }
      if (!newsMenuRef.current?.contains(event.target as Node)) {
        setNewsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", closeNewsMenu)
    document.addEventListener("keydown", closeNewsMenu)
    return () => {
      document.removeEventListener("mousedown", closeNewsMenu)
      document.removeEventListener("keydown", closeNewsMenu)
    }
  }, [newsMenuOpen])

  const [, routeSection, routeType, routeCategory] = location.pathname
    .replace(/\/$/, "")
    .split("/")
  const currentProductCategory =
    routeSection === "products" && routeType === "category"
      ? routeCategory
      : new URLSearchParams(location.search).get("category")
  /** Checks whether the given page matches the active route. */
  const isActive = (p: Page) => page === p
  /** Checks active state for header links, including product-category routes. */
  const isNavLinkActive = (link: HeaderNavLink) => {
    if (link.productCategory) {
      return (
        page === "products" && currentProductCategory === link.productCategory
      )
    }
    return isActive(link.page)
  }
  /** Routes a header link and preserves special product category navigation. */
  const handleNavLinkClick = (link: HeaderNavLink) => {
    setMenuOpen(false)
    if (link.productCategory) {
      routerNavigate(`/products/category/${link.productCategory}`)
      return
    }

    navigate(link.page)
  }

  /** Submits the header search query and resets the search field. */
  const handleSearchSubmit = (term?: string) => {
    const query = (term ?? searchVal).trim()

    if (!query) return

    onSearch(query)

    setSearchVal("")
    setSearchOpen(false)
    setMenuOpen(false)
  }

  // closeSearch
  const closeSearch = () => {
    setSearchOpen(false)
    setSearchVal("")
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
            routerNavigate("/")
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
              type="button"
              onClick={() => handleNavLinkClick(link)}
              className={`btn-ghost desktop-nav__link${isNavLinkActive(link) ? " is-active" : ""}`}
              aria-current={isNavLinkActive(link) ? "page" : undefined}
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
              if (link.path.startsWith("/about/")) routerNavigate(link.path)
              else navigate(link.page as Page)
            }}
            onOpen={() => setNewsMenuOpen(false)}
          />

          {/* News & Media dropdown */}
          <div ref={newsMenuRef} className="header-dropdown">
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                setLanguageMenuOpen(false)
                setNewsMenuOpen((o) => !o)
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
                className="header-dropdown__menu header-dropdown__menu--news"
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
                }} role="menu">
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
                      ; (e.currentTarget as HTMLButtonElement).style.background =
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

                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>


        <div className="header-actions">


          {/* Search */}
          <button
            type="button"
            className={`desktop-nav__link btn-ghost header-search-action${page === "search" ? " is-active" : ""
              }`}
            onClick={() => {
              routerNavigate("/search")
              setMenuOpen(false)
              setSearchVal("")
            }}
            aria-label="Open search page"
            aria-current={page === "search" ? "page" : undefined}
          >
            <span>
              {lang === "km" ? "ស្វែងរក" : "Search"}
            </span>

            <svg
              className="header-search-action__icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Language selector */}
          <div
            ref={languageMenuRef}
            className="language-selector">
            <button
              type="button"
              className="language-selector__button"
              onClick={() =>
                setLanguageMenuOpen((open) => !open)
              }
              aria-label="Select language"
              aria-haspopup="menu"
              aria-expanded={languageMenuOpen}>
              <span>
                {languageOptions.find(
                  (option) => option.code === lang,
                )?.shortLabel}
              </span>

              <svg
                className={`language-selector__chevron${languageMenuOpen ? " is-open" : ""
                  }`}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>




            </button>

            {languageMenuOpen && (
              <div
                className="language-menu"
                role="menu"
                aria-label="Language selector"
              >
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    role="menuitemradio"
                    aria-checked={lang === option.code}
                    className={`language-menu__item${lang === option.code ? " is-active" : ""
                      }`}
                    onClick={() => {
                      onLangChange(option.code)
                      setLanguageMenuOpen(false)
                    }}
                  >
                    <span>{option.label}</span>
                    <strong>{option.shortLabel}</strong>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Internet Banking */}
          <button
            type="button"
            className="btn-primary header-login-action"
            onClick={() => routerNavigate("/login")}
          >
            {lang === "km"
              ? "ចូលគណនី"
              : "Internet Banking"}
          </button>

          {/* Mobile menu */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>



        {menuOpen && (
          <div
            className="mobile-drawer"
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {/* Mobile search */}
            <div className="mobile-search">
              <label className="sr-only" htmlFor="mobile-site-search">
                Search UCB website
              </label>

              <input
                id="mobile-site-search"
                name="search"
                type="search"
                value={searchVal}
                onChange={(event) => setSearchVal(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    handleSearchSubmit()
                  }

                  if (event.key === "Escape") {
                    event.preventDefault()
                    setSearchVal("")
                    setMenuOpen(false)
                  }
                }}
                placeholder="Search products, branches, FAQs..."
                autoComplete="off"
              />

              {/* <button
                type="button"
                className="btn-primary mobile-search__button"
                onClick={() => handleSearchSubmit()}
                disabled={!searchVal.trim()}
                aria-label="Submit search"
              >
                Search
              </button> */}
            </div>

            {/* Mobile main navigation */}
            <nav
              className="mobile-main-links"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => {
                const active = isNavLinkActive(link)

                return (
                  <button
                    key={`${link.page}-${link.productCategory ?? "main"}`}
                    type="button"
                    className={`desktop-nav__link btn-ghost${active ? " is-active" : ""
                      }`}
                    onClick={() => handleNavLinkClick(link)}
                    aria-current={active ? "page" : undefined}
                  >
                    {lang === "km"
                      ? link.labelKm
                      : lang === "zh-CN"
                        ? link.labelZh
                        : link.label}
                  </button>
                )
              })}
            </nav>

            {/* About UCB */}
            <section className="mobile-link-group">
              <h2 className="mobile-link-group__title">
                {lang === "km" ? "អំពី UCB" : "About UCB"}
              </h2>

              {aboutLinks.map((link) => (
                <button
                  key={link.path}
                  type="button"
                  className="mobile-group-link"
                  onClick={() => {
                    if (link.path.startsWith("/about/")) {
                      routerNavigate(link.path)
                    } else {
                      navigate(link.page)
                    }

                    setMenuOpen(false)
                  }}
                >
                  {lang === "zh-CN" ? link.labelZh : link.label}
                </button>
              ))}
            </section>

            {/* News & Media */}
            <section className="mobile-link-group">
              <h2 className="mobile-link-group__title">
                {lang === "km"
                  ? "ព័ត៌មាន និងការផ្សព្វផ្សាយ"
                  : "News & Media"}
              </h2>

              {newsLinks.map((link) => (
                <button
                  key={link.page}
                  type="button"
                  className={`mobile-group-link mobile-group-link--with-icon${isActive(link.page) ? " is-active" : ""
                    }`}
                  onClick={() => {
                    navigate(link.page)
                    setMenuOpen(false)
                  }}
                  aria-current={isActive(link.page) ? "page" : undefined}
                >
                  <span aria-hidden="true">{link.icon}</span>
                  {lang === "km" ? link.labelKm : link.label}
                </button>
              ))}
            </section>


            {/* Extra mobile links */}
            <nav
              className="mobile-extra-links"
              aria-label="Additional services"
            >
              {[
                {
                  label: "Online Services",
                  labelKm: "សេវាកម្មអនឡាញ",
                  page: "online-services" as Page,
                },
                {
                  label: "Security Center",
                  labelKm: "មជ្ឈមណ្ឌលសុវត្ថិភាព",
                  page: "security" as Page,
                },
              ].map((link) => {
                const active = page === link.page

                return (
                  <button
                    key={link.page}
                    type="button"
                    className={`mobile-extra-link${active ? " is-active" : ""}`}
                    onClick={() => {
                      navigate(link.page)
                      setMenuOpen(false)
                    }}
                    aria-current={active ? "page" : undefined}
                  >
                    <span>
                      {lang === "km" ? link.labelKm : link.label}
                    </span>

                    <svg
                      className="mobile-extra-link__icon"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                )
              })}
            </nav>







            {/* Mobile Internet Banking CTA */}
            <button
              type="button"
              className="btn-primary mobile-login-button"
              onClick={() => {
                routerNavigate("/login")
                setMenuOpen(false)
              }}
            >
              {lang === "km" ? "ចូលគណនី" : "Internet Banking"}
            </button>
          </div>
        )}

      </div>
    </header>
  )
}
