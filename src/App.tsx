import { useEffect, useState } from "react"
import { useLocation, useNavigate as useRouterNavigate } from "react-router-dom"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import CookieConsent from "./components/ui/CookieConsent"
import ChatbotWidget from "./components/ui/ChatbotWidget"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import DigitalBankingPage from "./pages/DigitalBankingPage"
import BranchesPage from "./pages/BranchesPage"
import PromotionsPage from "./pages/PromotionsPage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/LoginPage"
import DesignSystemPage from "./pages/DesignSystemPage"
import CareersPage from "./pages/CareersPage"
import AboutPage from "./pages/AboutPage"
import RatesPage from "./pages/RatesPage"
import OnlineServicesPage from "./pages/OnlineServicesPage"
import SecurityCenterPage from "./pages/SecurityCenterPage"
import SearchPage from "./pages/SearchPage"
import NotFoundPage from "./pages/NotFoundPage"
import NewsPage from "./pages/NewsPage"
import AnnouncementsPage from "./pages/AnnouncementsPage"
import CmsPage from "./pages/CmsPage"
import MaintenancePage from "./pages/MaintenancePage"
import DesignReviewPage from "./pages/DesignReviewPage"
import type { LocaleCode } from "./types/localization"
import type { Page } from "./types/navigation"
import ErrorBoundary from "./components/ui/ErrorBoundary"
import OfflineBanner from "./components/ui/OfflineBanner"

export type { Page } from "./types/navigation"

import { routeForPage } from "./types/navigation"

/** Maps the current browser path to the internal page key used by the app router. */
const pageForPath = (pathname: string): Page => {
  const path = pathname.replace(/\/$/, "") || "/"
  if (path === "/leadership") return "about"
  if (path.startsWith("/about/")) return "about"
  if (path === "/admin") return "cms"

  const [, section] = path.split("/")
  if (
    section === "products" ||
    section === "promotions" ||
    section === "news" ||
    section === "careers"
  ) {
    return section
  }

  return (
    Object.entries(routeForPage).find(
      ([, route]) => route === path,
    )?.[0] as Page | undefined ?? "not-found"
  )
}

/** Reads a route detail id from URLs shaped like /section/:id. */
const detailIdForPath = (pathname: string, section: string) => {
  const parts = pathname.replace(/\/$/, "").split("/").filter(Boolean)
  if (section === "products" && parts[1] === "category") return null
  return parts[0] === section ? (parts[1] ?? null) : null
}

/** Coordinates top-level routing, language selection, layout, and global UI state. */
export default function App() {
  const location = useLocation()
  const routerNavigate = useRouterNavigate()
  const page = pageForPath(location.pathname)
  const routeDetailId = detailIdForPath(location.pathname, page)
  const [, setDetailId] = useState<string | null>(null)
  const urlSearchQuery = new URLSearchParams(location.search).get("q") ?? ""
  const [lang, setLang] = useState<LocaleCode>(() => {
    const fromUrl = new URLSearchParams(window.location.search).get(
      "lang",
    ) as LocaleCode | null
    const saved = localStorage.getItem("ucb_locale") as LocaleCode | null
    return fromUrl === "en" || fromUrl === "km" || fromUrl === "zh-CN"
      ? fromUrl
      : saved === "en" || saved === "km" || saved === "zh-CN"
        ? saved
        : "en"
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [isOnline, setIsOnline] = useState(() => navigator.onLine)

  useEffect(() => {
    setSearchQuery(urlSearchQuery)
  }, [urlSearchQuery])

  useEffect(() => {
    /** Marks the app as online when the browser regains connectivity. */
    const handleOnline = () => setIsOnline(true)
    /** Marks the app as offline when the browser loses connectivity. */
    const handleOffline = () => setIsOnline(false)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  /** Persists the selected language and mirrors it into the URL. */
  const changeLanguage = (nextLanguage: LocaleCode) => {
    setLang(nextLanguage)
    localStorage.setItem("ucb_locale", nextLanguage)
    document.documentElement.lang = nextLanguage
    const searchParams = new URLSearchParams(location.search)
    searchParams.set("lang", nextLanguage)
    routerNavigate(`${location.pathname}?${searchParams.toString()}`)
  }

  useEffect(() => {
    const requestedLanguage = new URLSearchParams(location.search).get(
      "lang",
    ) as LocaleCode | null
    if (
      requestedLanguage === "en" ||
      requestedLanguage === "km" ||
      requestedLanguage === "zh-CN"
    ) {
      setLang(requestedLanguage)
      localStorage.setItem("ucb_locale", requestedLanguage)
      document.documentElement.lang = requestedLanguage
    }
  }, [location.search])

  // Keep navigation state local and clear page-specific detail when changing pages.
  const navigate = (p: Page, id?: string) => {
    setDetailId(id ?? null)
    const target = id ? `${routeForPage[p]}/${encodeURIComponent(id)}` : routeForPage[p]
    routerNavigate(target)
  }

  /** Routes to the search page with the submitted query. */
  const goSearch = (q: string) => {
    setSearchQuery(q)
    routerNavigate(`${routeForPage.search}?q=${encodeURIComponent(q)}`)
  }

  const noFooterPages: Page[] = ["login", "design-system", "cms", "maintenance"]

  return (
    <ErrorBoundary
      title={
        lang === "km"
          ? "មានបញ្ហាកើតឡើង"
          : lang === "zh-CN"
            ? "页面出现问题"
            : "Something went wrong"
      }
      message={
        lang === "km"
          ? "យើងមិនអាចបង្ហាញទំព័រនេះបានទេ។ សូមព្យាយាមម្តងទៀត។"
          : lang === "zh-CN"
            ? "我们暂时无法显示此页面，请重试。"
            : "We could not display this page. Please try again."
      }
      retryLabel={
        lang === "km" ? "ព្យាយាមម្តងទៀត" : lang === "zh-CN" ? "重试" : "Try again"
      }
    >
      <div
        style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}
      >
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Header
          page={page}
          navigate={navigate}
          lang={lang}
          onLangChange={changeLanguage}
          onSearch={goSearch}
        />
        {!isOnline && (
          <OfflineBanner
            message={
              lang === "km"
                ? "អ្នកកំពុងក្រៅបណ្តាញ។ មុខងារមួយចំនួនអាចមិនអាចប្រើបាន។"
                : lang === "zh-CN"
                  ? "您当前处于离线状态，部分功能可能无法使用。"
                  : "You are offline. Some features may be unavailable."
            }
          />
        )}

        <main style={{ flex: 1 }} id="main-content">
          {page === "home" && <HomePage navigate={navigate} lang={lang} />}
          {page === "products" && (
            <ProductsPage
              navigate={navigate}
              detailId={routeDetailId}
              setDetailId={setDetailId}
            />
          )}
          {page === "digital-banking" && (
            <DigitalBankingPage navigate={navigate} />
          )}
          {page === "branches" && <BranchesPage />}
          {page === "promotions" && (
            <PromotionsPage
              navigate={navigate}
              initialPromoId={routeDetailId}
            />
          )}
          {page === "contact" && <ContactPage navigate={navigate} />}
          {page === "login" && <LoginPage navigate={navigate} />}
          {page === "design-system" && <DesignSystemPage />}
          {page === "careers" && (
            <CareersPage navigate={navigate} initialJobId={routeDetailId} />
          )}
          {page === "about" && <AboutPage navigate={navigate} />}
          {(page === "rates" || page === "exchange-rates") && <RatesPage />}
          {page === "online-services" && (
            <OnlineServicesPage navigate={navigate} />
          )}
          {page === "security" && <SecurityCenterPage navigate={navigate} />}
          {page === "search" && (
            <SearchPage navigate={navigate} initialQuery={searchQuery} />
          )}
          {page === "not-found" && <NotFoundPage navigate={navigate} />}
          {page === "news" && (
            <NewsPage navigate={navigate} initialArticleId={routeDetailId} />
          )}
          {page === "announcements" && (
            <AnnouncementsPage navigate={navigate} />
          )}
          {page === "cms" && <CmsPage navigate={navigate} />}
          {page === "maintenance" && <MaintenancePage navigate={navigate} />}
          {page === "design-review" && <DesignReviewPage navigate={navigate} />}
        </main>

        {!noFooterPages.includes(page) && <Footer navigate={navigate} />}
        <CookieConsent />
        <ChatbotWidget navigate={navigate} lang={lang} />
      </div>
    </ErrorBoundary>
  )
}
