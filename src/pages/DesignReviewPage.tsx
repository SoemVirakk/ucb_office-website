interface Props {
  navigate: (p: Page) => void
}

type Status = "complete" | "partial" | "missing"

interface PageItem {
  page: string
  route: Page | null
  angularRoute: string
  angularComponent: string
  status: Status
  notes: string
}

interface Issue {
  id: string
  severity: "critical" | "high" | "medium" | "low"
  category: string
  description: string
  fix: string
  status: "fixed" | "open" | "decision-needed"
}

const PAGES: PageItem[] = [
  {
    page: "Home",
    route: "home",
    angularRoute: "/",
    angularComponent: "HomeComponent",
    status: "complete",
    notes:
      "Hero carousel, announcement bar, promotions teaser, news teaser, exchange rates, quick actions, security tips.",
  },
  {
    page: "Products",
    route: "products",
    angularRoute: "/products",
    angularComponent: "ProductsComponent",
    status: "complete",
    notes:
      "Category filter sidebar, card grid, product detail sub-view with eligibility/fees/FAQ.",
  },
  {
    page: "Product Detail",
    route: "products",
    angularRoute: "/products/:id",
    angularComponent: "ProductDetailComponent",
    status: "complete",
    notes: "Detail sub-view inside ProductsPage via detailId prop.",
  },
  {
    page: "Digital Banking",
    route: "digital-banking",
    angularRoute: "/digital-banking",
    angularComponent: "DigitalBankingComponent",
    status: "complete",
    notes: "Feature sections, app mockups, security callouts, download CTAs.",
  },
  {
    page: "Branches & ATMs",
    route: "branches",
    angularRoute: "/branches",
    angularComponent: "BranchesComponent",
    status: "complete",
    notes:
      "Search, province filter, type filter, card list with expandable detail.",
  },
  {
    page: "Promotions",
    route: "promotions",
    angularRoute: "/promotions",
    angularComponent: "PromotionsComponent",
    status: "complete",
    notes:
      "Status filter, list view, detail sub-view with benefits/eligibility/T&C. Expired state with grayscale overlay.",
  },
  {
    page: "Promotion Detail",
    route: "promotions",
    angularRoute: "/promotions/:id",
    angularComponent: "PromotionDetailComponent",
    status: "complete",
    notes: "Embedded in PromotionsPage as sub-view state.",
  },
  {
    page: "News",
    route: "news",
    angularRoute: "/news",
    angularComponent: "NewsComponent",
    status: "complete",
    notes:
      "Category tabs, featured article hero, 6-per-page grid, article detail sub-view.",
  },
  {
    page: "News Detail",
    route: "news",
    angularRoute: "/news/:id",
    angularComponent: "NewsDetailComponent",
    status: "complete",
    notes: "Embedded in NewsPage. Related articles sidebar.",
  },
  {
    page: "Announcements",
    route: "announcements",
    angularRoute: "/announcements",
    angularComponent: "AnnouncementsComponent",
    status: "complete",
    notes:
      "Priority sort, critical alert pinned banner, type filter, detail with maintenance schedule.",
  },
  {
    page: "Careers",
    route: "careers",
    angularRoute: "/careers",
    angularComponent: "CareersComponent",
    status: "complete",
    notes:
      "Job listings, filter by department/type/location, job detail with apply form.",
  },
  {
    page: "Job Detail",
    route: "careers",
    angularRoute: "/careers/:id",
    angularComponent: "JobDetailComponent",
    status: "complete",
    notes: "Embedded in CareersPage sub-view.",
  },
  {
    page: "About UCB",
    route: "about",
    angularRoute: "/about",
    angularComponent: "AboutComponent",
    status: "complete",
    notes:
      "Mission/vision, leadership board, milestones, awards, regulatory info.",
  },
  {
    page: "Rates & Calculators",
    route: "rates",
    angularRoute: "/rates",
    angularComponent: "RatesComponent",
    status: "complete",
    notes: "Exchange rate table, deposit/loan calculators.",
  },
  {
    page: "Online Services",
    route: "online-services",
    angularRoute: "/online-services",
    angularComponent: "OnlineServicesComponent",
    status: "complete",
    notes: "Service cards linking to secure internet banking platform.",
  },
  {
    page: "Security Center",
    route: "security",
    angularRoute: "/security",
    angularComponent: "SecurityCenterComponent",
    status: "complete",
    notes: "Phishing warnings, safe banking tips, fraud reporting.",
  },
  {
    page: "Contact",
    route: "contact",
    angularRoute: "/contact",
    angularComponent: "ContactComponent",
    status: "complete",
    notes:
      "Contact form with validation, channel cards, FAQ accordion, emergency card block alert.",
  },
  {
    page: "Search",
    route: "search",
    angularRoute: "/search",
    angularComponent: "SearchComponent",
    status: "complete",
    notes:
      "Global search across products, promotions, news, announcements, branches, pages.",
  },
  {
    page: "404 Not Found",
    route: "not-found",
    angularRoute: "**",
    angularComponent: "NotFoundComponent",
    status: "complete",
    notes: "Illustrated 404 with navigation shortcuts.",
  },
  {
    page: "Maintenance",
    route: "maintenance",
    angularRoute: "/maintenance",
    angularComponent: "MaintenanceComponent",
    status: "complete",
    notes:
      "Full-screen maintenance state with schedule, affected services, what still works, ICT time grid, Khmer notice.",
  },
  {
    page: "Login Entry",
    route: "login",
    angularRoute: "/login",
    angularComponent: "LoginEntryComponent",
    status: "complete",
    notes:
      "Personal vs Business choice cards, disabled CTA until selection, phishing/security alerts. Redirects to external IB platform.",
  },
  {
    page: "Chatbot",
    route: null,
    angularRoute: "N/A (global overlay)",
    angularComponent: "ChatbotWidgetComponent",
    status: "complete",
    notes:
      "Floating widget: EN/KM, quick actions, structured replies, sensitive-data detection, sessionStorage, mobile bottom-sheet.",
  },
  {
    page: "Design System",
    route: "design-system",
    angularRoute: "/design-system",
    angularComponent: "DesignSystemComponent",
    status: "partial",
    notes:
      "Token showcase, typography scale, color swatches, component gallery. Missing: motion/animation tokens, icon catalog.",
  },
  {
    page: "Design Review",
    route: "design-review",
    angularRoute: "/design-review",
    angularComponent: "DesignReviewComponent",
    status: "complete",
    notes: "This page. Issue tracker, page inventory, Angular handoff table.",
  },
  {
    page: "CMS Admin",
    route: "cms",
    angularRoute: "/admin",
    angularComponent: "CmsModule (lazy)",
    status: "complete",
    notes:
      "Internal-only admin module. Dashboard, banner/promo/news/announcement management with lifecycle workflow.",
  },
]

const ISSUES: Issue[] = [
  {
    id: "A-01",
    severity: "high",
    category: "Accessibility",
    description:
      "Hero carousel prev/next arrows had no keyboard handler — keyboard-only users could not navigate slides.",
    fix: "Added onKeyDown Enter/Space handlers to carousel arrow buttons in HomePage HeroCarousel component.",
    status: "fixed",
  },
  {
    id: "A-02",
    severity: "high",
    category: "Accessibility",
    description:
      "Form inputs across contact and careers pages lacked explicit <label> associations (used placeholder as only label).",
    fix: "Added htmlFor/id pairs to all form inputs. Placeholders retained as supplemental hint, not primary label.",
    status: "fixed",
  },
  {
    id: "A-03",
    severity: "medium",
    category: "Accessibility",
    description: "Skip-to-main-content link missing from layout.",
    fix: "Added .skip-link CSS class in index.css and wired it into App.tsx before Header.",
    status: "fixed",
  },
  {
    id: "A-04",
    severity: "medium",
    category: "Accessibility",
    description:
      "Khmer text rendered with body line-height (1.5), causing character collision.",
    fix: "Added .font-khmer { line-height: 2 } and :lang(km) rule in index.css. Applied to all Khmer text nodes.",
    status: "fixed",
  },
  {
    id: "A-05",
    severity: "low",
    category: "Accessibility",
    description:
      "Color-only status indicators on CMS content lifecycle (no shape/text differentiation).",
    fix: "Added .status-dot with shape + color; CMS status badges include text label alongside color.",
    status: "fixed",
  },
  {
    id: "C-01",
    severity: "critical",
    category: "Content Architecture",
    description:
      "Banner, Promotion, News, and Announcement were conflated into a single content type — editors could not distinguish purpose or lifecycle.",
    fix: "Split into four distinct data models: Banner (hero imagery, CTA), Promotion (offer, expiry), News (editorial article), Announcement (operational alert). Each has its own status workflow, CMS editor, and public page.",
    status: "fixed",
  },
  {
    id: "C-02",
    severity: "high",
    category: "Content Architecture",
    description:
      "Announcements page did not exist — maintenance and service alerts had no dedicated public display.",
    fix: "Created AnnouncementsPage.tsx with priority sort, type filter, detail view, and maintenance schedule block.",
    status: "fixed",
  },
  {
    id: "C-03",
    severity: "high",
    category: "Content Architecture",
    description:
      "News had no standalone page — articles were hidden behind Promotions section.",
    fix: "Created NewsPage.tsx with category tabs, featured hero, paginated grid, and article detail sub-view.",
    status: "fixed",
  },
  {
    id: "N-01",
    severity: "high",
    category: "Navigation",
    description:
      "Header had no links to News or Announcements pages — users could only find them via search.",
    fix: 'Added "News & Media" dropdown to desktop nav and mobile drawer, linking to Promotions, News, and Announcements.',
    status: "fixed",
  },
  {
    id: "N-02",
    severity: "medium",
    category: "Navigation",
    description:
      "Footer did not link to News, Announcements, or Promotions sections.",
    fix: "Added Promotions, News & Updates, Announcements links to Footer navigation column.",
    status: "fixed",
  },
  {
    id: "U-01",
    severity: "high",
    category: "UX",
    description:
      "Promotions list opened detail in a modal — on mobile the modal was too tall and had no back gesture.",
    fix: "Replaced modal with full sub-view navigation pattern (list → detail route state). Back button navigates to list.",
    status: "fixed",
  },
  {
    id: "U-02",
    severity: "medium",
    category: "UX",
    description:
      "Hero carousel had no accessible pause/play control or keyboard navigation.",
    fix: "Added pause/play button with aria-label, prev/next with keyboard handlers, dot indicators as radio-style controls.",
    status: "fixed",
  },
  {
    id: "U-03",
    severity: "medium",
    category: "UX",
    description:
      "Expired promotions were not visually distinguished — users could not tell if an offer was still valid.",
    fix: 'Added grayscale filter + "PROMOTION ENDED" overlay stamp + status badge on expired promotion cards and detail view.',
    status: "fixed",
  },
  {
    id: "U-04",
    severity: "low",
    category: "UX",
    description:
      "No dismissible priority announcement bar on homepage — critical notices went unnoticed.",
    fix: "Added AnnouncementBar component in HomePage that surfaces the highest-priority active announcement, dismissible per session.",
    status: "fixed",
  },
  {
    id: "S-01",
    severity: "critical",
    category: "Security",
    description:
      "Chatbot widget had no sensitive-data detection — users might enter PINs, passwords, or card numbers in the chat.",
    fix: "Added SENSITIVE regex pattern in ChatbotWidget. Messages matching the pattern are intercepted with a security redirect, not stored or processed.",
    status: "fixed",
  },
  {
    id: "S-02",
    severity: "high",
    category: "Security",
    description:
      "Login page allowed form entry — risk of designers speccing a fake credential form.",
    fix: "Login page is a channel-selection-only screen (Personal / Business). Credential entry happens exclusively on the external internet banking platform. No password fields exist on public website.",
    status: "fixed",
  },
  {
    id: "M-01",
    severity: "high",
    category: "Missing Pages",
    description:
      "No dedicated Maintenance page for full-service-down scenarios.",
    fix: "Created MaintenancePage.tsx with schedule grid, available services, Khmer notice, and fraud hotline. Routes as /maintenance in Angular.",
    status: "fixed",
  },
  {
    id: "D-01",
    severity: "medium",
    category: "Design System",
    description:
      'Badge component accepted invalid variants ("info", "warning") causing TypeScript errors in CareersPage and PromotionsPage.',
    fix: 'Replaced "info" → "blue" and "warning" → "gold" across all pages. Badge accepts: teal | gold | red | blue | gray | navy.',
    status: "fixed",
  },
  {
    id: "D-02",
    severity: "medium",
    category: "Design System",
    description:
      "CMS lifecycle status states were not documented in Design System page.",
    fix: "Added ContentStatus lifecycle legend to CMS dashboard. Angular handoff: use ContentStatus type from src/data/banners.ts.",
    status: "open",
  },
  {
    id: "D-03",
    severity: "low",
    category: "Design System",
    description:
      "No global animation tokens or keyframe definitions — components defined animations ad hoc.",
    fix: "Added @keyframes ucb-pulse and ucb-spin to index.css. Added .skeleton utility class.",
    status: "fixed",
  },
  {
    id: "R-01",
    severity: "medium",
    category: "Responsive",
    description:
      "Chatbot panel did not adapt to mobile — was partially off-screen at 375px.",
    fix: "Added .ucb-chat-panel media query for ≤520px: full-width bottom-sheet with 88dvh height and top border-radius.",
    status: "fixed",
  },
  {
    id: "R-02",
    severity: "medium",
    category: "Responsive",
    description:
      "CMS admin layout collapsed badly on tablet — sidebar took too much width.",
    fix: "Added .cms-layout responsive rules: sidebar narrows to 200px at 900px, stacks to full-width at 600px.",
    status: "fixed",
  },
]

const DECISIONS = [
  {
    id: "SD-01",
    area: "Chatbot Backend",
    decision:
      "ChatbotWidget must call a bank-owned backend API — never call any AI provider directly from Angular. Rate-limit, audit-log, and sanitize inputs on backend.",
    owner: "Engineering",
    priority: "critical",
  },
  {
    id: "SD-02",
    area: "Chatbot Data Retention",
    decision:
      "Chat history uses sessionStorage only (clears on tab close). No persistent chat logs on frontend. Backend logging is the bank's responsibility.",
    owner: "Privacy / Legal",
    priority: "high",
  },
  {
    id: "SD-03",
    area: "Internet Banking Redirect",
    decision:
      "UCB public website never handles credentials. Login Entry page redirects to a separate, approved internet banking platform URL. Confirm the approved URL with IT Security.",
    owner: "IT Security",
    priority: "critical",
  },
  {
    id: "SD-04",
    area: "CMS Access Control",
    decision:
      "CMS admin (/admin) must be guarded by Angular route guard + backend JWT auth. Not prototyped here — confirm RBAC roles (Editor, Publisher, Admin) with Product team.",
    owner: "Product + Engineering",
    priority: "high",
  },
  {
    id: "SD-05",
    area: "Announcement Priority",
    decision:
      "Critical announcements are shown as pinned red banners on homepage. Publishing a critical announcement auto-notifies compliance. Confirm approval workflow with Compliance.",
    owner: "Compliance",
    priority: "high",
  },
  {
    id: "SD-06",
    area: "Map Provider",
    decision:
      "Branches page has a map placeholder. Confirm whether to use Google Maps, Mapbox, or Leaflet+OSM. Budget and GDPR consent requirements differ.",
    owner: "Engineering + Legal",
    priority: "medium",
  },
  {
    id: "SD-07",
    area: "Search Backend",
    decision:
      "Current search is client-side across static data. Production implementation needs an API-backed search (Elasticsearch or similar). Confirm scope with Engineering.",
    owner: "Engineering",
    priority: "medium",
  },
]

const severityColor: Record<string, { bg: string color: string }> = {
  critical: { bg: "#FEE2E2", color: "#B91C1C" },
  high: { bg: "#FEF3C7", color: "#92400E" },
  medium: { bg: "#E0F2FE", color: "#0369A1" },
  low: { bg: "#F3F4F6", color: "#4B5563" },
}

const statusStyle: Record<Issue["status"], {
  bg: string
  color: string
  label: string
}> = {
  fixed: { bg: "#D1FAE5", color: "#065F46", label: "Fixed" },
  open: { bg: "#FEF3C7", color: "#92400E", label: "Open" },
  "decision-needed": {
    bg: "#EDE9FE",
    color: "#5B21B6",
    label: "Decision needed",
  },
}

const pageStatusStyle: Record<Status, {
  bg: string
  color: string
  label: string
  icon: string
}> = {
  complete: { bg: "#D1FAE5", color: "#065F46", label: "Complete", icon: "✓" },
  partial: { bg: "#FEF3C7", color: "#92400E", label: "Partial", icon: "◑" },
  missing: { bg: "#FEE2E2", color: "#B91C1C", label: "Missing", icon: "✕" },
}

/** Renders the design review checklist and scoring page. */
export default function DesignReviewPage({ navigate }: Props) {
  const complete = PAGES.filter((p) => p.status === "complete").length
  const partial = PAGES.filter((p) => p.status === "partial").length
  const fixed = ISSUES.filter((i) => i.status === "fixed").length

  return (
    <div style={{ background: "#F4F6F8", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
          color: "#fff",
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
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                background: "rgba(255,255,255,0.15)",
                padding: "4px 12px",
                borderRadius: 20,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Internal Document
            </span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
              UCB Cambodia · Figma Prototype · Design Review v1.0
            </span>
          </div>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: "0.75rem",
            }}
          >
            Design Review &amp; Angular Handoff
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7,
              maxWidth: 640,
            }}
          >
            Comprehensive audit of every page, component, and prototype link in
            the UCB Cambodia public website prototype. Includes issues found,
            fixes applied, stakeholder decisions needed, and Angular
            component/route mapping.
          </p>

          {/* Summary stats */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              marginTop: "2rem",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                label: "Pages Complete",
                value: `${complete}/${PAGES.length}`,
                color: "#009C9F",
              },
              { label: "Pages Partial", value: partial, color: "#C9A84C" },
              { label: "Issues Found", value: ISSUES.length, color: "#EF4444" },
              {
                label: "Issues Fixed",
                value: `${fixed}/${ISSUES.length}`,
                color: "#10B981",
              },
              {
                label: "Decisions Needed",
                value: DECISIONS.length,
                color: "#A855F7",
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "1rem 1.5rem",
                  minWidth: 120,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.6)",
                    marginTop: 2,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "3rem 1.5rem" }}>
        {/* Section 1: Page Inventory */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#0A2540",
              marginBottom: "0.25rem",
            }}
          >
            1. Page Inventory
          </h2>
          <p style={{ fontSize: 14, color: "#6B7280", marginBottom: "1.5rem" }}>
            All required screens, their prototype route, Angular route,
            component name, and completeness status.
          </p>

          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #E5E7EB",
              overflow: "hidden",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#F9FAFB",
                      borderBottom: "2px solid #E5E7EB",
                    }}
                  >
                    {[
                      "Page",
                      "Prototype State",
                      "Angular Route",
                      "Angular Component",
                      "Status",
                      "Notes",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "0.75rem 1rem",
                          textAlign: "left",
                          fontWeight: 700,
                          color: "#374151",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PAGES.map((p, i) => {
                    const s = pageStatusStyle[p.status]
                    return (
                      <tr
                        key={p.page}
                        style={{
                          borderBottom: "1px solid #F3F4F6",
                          background: i % 2 === 0 ? "#fff" : "#FAFAFA",
                        }}
                      >
                        <td
                          style={{
                            padding: "0.75rem 1rem",
                            fontWeight: 600,
                            color: "#0A2540",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {p.page}
                        </td>
                        <td style={{ padding: "0.75rem 1rem" }}>
                          {p.route ? (
                            <button
                              onClick={() => navigate(p.route!)}
                              style={{
                                background: "#E6F7F7",
                                color: "#007B7E",
                                border: "none",
                                borderRadius: 6,
                                padding: "3px 10px",
                                fontSize: 12,
                                fontWeight: 600,
                                cursor: "pointer",
                                fontFamily: "inherit",
                              }}
                            >
                              {p.route}
                            </button>
                          ) : (
                            <span style={{ color: "#9CA3AF", fontSize: 12 }}>
                              overlay
                            </span>
                          )}
                        </td>
                        <td
                          style={{
                            padding: "0.75rem 1rem",
                            fontFamily: "monospace",
                            fontSize: 12,
                            color: "#374151",
                          }}
                        >
                          {p.angularRoute}
                        </td>
                        <td
                          style={{
                            padding: "0.75rem 1rem",
                            fontFamily: "monospace",
                            fontSize: 12,
                            color: "#007B7E",
                          }}
                        >
                          {p.angularComponent}
                        </td>
                        <td style={{ padding: "0.75rem 1rem" }}>
                          <span
                            style={{
                              background: s.bg,
                              color: s.color,
                              padding: "3px 10px",
                              borderRadius: 20,
                              fontSize: 12,
                              fontWeight: 700,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {s.icon} {s.label}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "0.75rem 1rem",
                            fontSize: 12,
                            color: "#6B7280",
                            lineHeight: 1.5,
                            maxWidth: 320,
                          }}
                        >
                          {p.notes}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 2: Issues */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#0A2540",
              marginBottom: "0.25rem",
            }}
          >
            2. Issues Found &amp; Fixed
          </h2>
          <p style={{ fontSize: 14, color: "#6B7280", marginBottom: "1.5rem" }}>
            All issues identified during the design review, categorized by type
            and severity.
          </p>

          {[
            "Security",
            "Accessibility",
            "Content Architecture",
            "Navigation",
            "UX",
            "Missing Pages",
            "Design System",
            "Responsive",
          ].map((cat) => {
            const items = ISSUES.filter((i) => i.category === cat)
            if (!items.length) return null
            return (
              <div key={cat} style={{ marginBottom: "1.5rem" }}>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "0.75rem",
                  }}
                >
                  {cat}
                </h3>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    border: "1px solid #E5E7EB",
                    overflow: "hidden",
                  }}
                >
                  {items.map((issue, idx) => {
                    const sev = severityColor[issue.severity]
                    const st = statusStyle[issue.status]
                    return (
                      <div
                        key={issue.id}
                        style={{
                          padding: "1.125rem 1.5rem",
                          borderBottom:
                            idx < items.length - 1
                              ? "1px solid #F3F4F6"
                              : "none",
                          display: "grid",
                          gridTemplateColumns: "100px 1fr auto",
                          gap: "1rem",
                          alignItems: "start",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "monospace",
                              fontSize: 12,
                              fontWeight: 700,
                              color: "#9CA3AF",
                            }}
                          >
                            {issue.id}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              background: sev.bg,
                              color: sev.color,
                              padding: "2px 8px",
                              borderRadius: 20,
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              width: "fit-content",
                            }}
                          >
                            {issue.severity}
                          </span>
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "#0A2540",
                              marginBottom: "0.375rem",
                            }}
                          >
                            {issue.description}
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              color: "#374151",
                              lineHeight: 1.6,
                            }}
                          >
                            <span style={{ fontWeight: 600, color: "#009C9F" }}>
                              Fix:{" "}
                            </span>
                            {issue.fix}
                          </div>
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            background: st.bg,
                            color: st.color,
                            padding: "4px 12px",
                            borderRadius: 20,
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                          }}
                        >
                          {st.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </section>

        {/* Section 3: Stakeholder Decisions */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#0A2540",
              marginBottom: "0.25rem",
            }}
          >
            3. Stakeholder Decisions Required
          </h2>
          <p style={{ fontSize: 14, color: "#6B7280", marginBottom: "1.5rem" }}>
            These items require sign-off before Angular implementation begins.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.875rem",
            }}
          >
            {DECISIONS.map((d) => (
              <div
                key={d.id}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  border: "1.5px solid #E5E7EB",
                  padding: "1.25rem 1.5rem",
                  display: "grid",
                  gridTemplateColumns: "80px auto 1fr 120px",
                  gap: "1rem",
                  alignItems: "start",
                }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#9CA3AF",
                  }}
                >
                  {d.id}
                </span>
                <div>
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: "#0A2540" }}
                  >
                    {d.area}
                  </div>
                  <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>
                    Owner: <strong>{d.owner}</strong>
                  </div>
                </div>
                <div
                  style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}
                >
                  {d.decision}
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: 20,
                      textTransform: "uppercase",
                      background:
                        d.priority === "critical"
                          ? "#FEE2E2"
                          : d.priority === "high"
                            ? "#FEF3C7"
                            : "#E0F2FE",
                      color:
                        d.priority === "critical"
                          ? "#B91C1C"
                          : d.priority === "high"
                            ? "#92400E"
                            : "#0369A1",
                    }}
                  >
                    {d.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Angular Handoff */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#0A2540",
              marginBottom: "0.25rem",
            }}
          >
            4. Angular Developer Handoff
          </h2>
          <p style={{ fontSize: 14, color: "#6B7280", marginBottom: "1.5rem" }}>
            Key architectural decisions, data contracts, and conventions to
            follow when building the Angular implementation.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
            }}
            className="grid-2"
          >
            {/* Routing */}
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                border: "1px solid #E5E7EB",
                padding: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: "1rem",
                }}
              >
                Routing Strategy
              </h3>
              <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.8 }}>
                <p style={{ marginBottom: "0.75rem" }}>
                  Use Angular Router with the routes mirrored from the page
                  inventory table above.
                </p>
                <ul
                  style={{
                    paddingLeft: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.375rem",
                  }}
                >
                  <li>
                    Lazy-load <code>CmsModule</code> at <code>/admin</code> —
                    guard with <code>AuthGuard</code>
                  </li>
                  <li>
                    Maintenance page at <code>/maintenance</code> — show via
                    HTTP interceptor on 503 responses
                  </li>
                  <li>
                    Product/Promotion/News detail via child routes (
                    <code>:id</code> param)
                  </li>
                  <li>
                    Wildcard <code>**</code> → <code>NotFoundComponent</code>
                  </li>
                  <li>
                    Login Entry at <code>/login</code> — redirects externally,
                    no credentials handled
                  </li>
                </ul>
              </div>
            </div>

            {/* Design Tokens */}
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                border: "1px solid #E5E7EB",
                padding: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: "1rem",
                }}
              >
                Design Tokens (CSS Custom Properties)
              </h3>
              <div
                style={{
                  background: "#0A2540",
                  borderRadius: 8,
                  padding: "1rem",
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#E2E8F0",
                  lineHeight: 1.8,
                  overflowX: "auto",
                }}
              >
                {
                  "--ucb-teal:       #009C9F\n--ucb-teal-dark:  #007B7E\n--ucb-teal-light: #E6F7F7\n--ucb-navy:       #0A2540\n--ucb-navy-mid:   #1A3D5C\n--ucb-gold:       #C9A84C\n--ucb-gray:       #F4F6F8\n--font-sans: Inter\n--font-khmer: Noto Sans Khmer"
                }
              </div>
            </div>

            {/* TypeScript Contracts */}
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                border: "1px solid #E5E7EB",
                padding: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: "1rem",
                }}
              >
                Key TypeScript / Angular Interfaces
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {[
                  {
                    type: "ContentStatus",
                    source: "src/data/banners.ts",
                    desc: "'draft'|'pending'|'scheduled'|'published'|'expired'|'archived'",
                  },
                  {
                    type: "Banner",
                    source: "src/data/banners.ts",
                    desc: "id, title, subtitle, ctaLabel, ctaTarget, desktopImage, placement, displayOrder, status, startDate, endDate",
                  },
                  {
                    type: "Announcement",
                    source: "src/data/announcements.ts",
                    desc: "id, priority, type, summary, content, startDate, endDate, affectedServices, status",
                  },
                  {
                    type: "AnnouncementPriority",
                    source: "src/data/announcements.ts",
                    desc: "'critical'|'high'|'normal'",
                  },
                  {
                    type: "NewsItem",
                    source: "src/data/news.ts",
                    desc: "id, category, title, excerpt, author, publishDate, readTime, imageUrl, tags, featured",
                  },
                  {
                    type: "Product",
                    source: "src/data/products.ts",
                    desc: "id, category, name, tagline, highlights, eligibility, requiredDocs, faqs",
                  },
                  {
                    type: "Branch",
                    source: "src/data/branches.ts",
                    desc: "id, name, type('branch'|'atm'|'cdm'), address, province, hours, phone, services",
                  },
                ].map((item) => (
                  <div
                    key={item.type}
                    style={{
                      padding: "0.625rem 0.875rem",
                      background: "#F9FAFB",
                      borderRadius: 8,
                      border: "1px solid #F3F4F6",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 3,
                      }}
                    >
                      <code
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#007B7E",
                        }}
                      >
                        {item.type}
                      </code>
                      <code style={{ fontSize: 11, color: "#9CA3AF" }}>
                        {item.source}
                      </code>
                    </div>
                    <div style={{ fontSize: 12, color: "#6B7280" }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Component conventions */}
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                border: "1px solid #E5E7EB",
                padding: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: "1rem",
                }}
              >
                Conventions &amp; Guidelines
              </h3>
              <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.8 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {[
                    {
                      label: "WCAG",
                      note: "Target 2.2 AA. All interactive elements need :focus-visible ring (2px #009C9F). Min 44×44px touch targets.",
                    },
                    {
                      label: "Khmer",
                      note: "Apply line-height: 2 to all Khmer text. Use Noto Sans Khmer via Google Fonts. Never truncate Khmer with overflow:hidden on single-line containers.",
                    },
                    {
                      label: "Forms",
                      note: 'Always use explicit <label for="id"> associations. Validate at boundary. No Angular credential forms on public site.',
                    },
                    {
                      label: "Chatbot",
                      note: "Widget calls bank-owned API. Never call AI provider directly. Sanitize input, rate-limit, audit-log on backend.",
                    },
                    {
                      label: "CMS Auth",
                      note: "Angular route guard + JWT. RBAC: Editor (draft/pending), Publisher (approve/schedule/publish), Admin (all + delete).",
                    },
                    {
                      label: "Images",
                      note: 'Use Angular @defer with placeholder skeleton for images. All <img> must have descriptive alt text. Never use "" as alt on meaningful images.',
                    },
                    {
                      label: "Khmer dates",
                      note: 'Format dates with Intl.DateTimeFormat with locale "km-KH" when lang===km. Always show ICT (GMT+7) for maintenance times.',
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "80px 1fr",
                        gap: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          color: "#009C9F",
                          fontSize: 12,
                          paddingTop: 2,
                        }}
                      >
                        {item.label}
                      </span>
                      <span style={{ fontSize: 12, lineHeight: 1.7 }}>
                        {item.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer nav */}
        <div
          style={{
            borderTop: "1px solid #E5E7EB",
            paddingTop: "2rem",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <button
            className="btn-primary"
            onClick={() => navigate("design-system")}
          >
            View Design System
          </button>
          <button className="btn-outline" onClick={() => navigate("home")}>
            ← Back to Prototype
          </button>
          <button className="btn-ghost" onClick={() => navigate("cms")}>
            ⚙️ CMS Admin
          </button>
        </div>
      </div>
    </div>
  )
}
