# UCB Cambodia Public Website — Implementation Plan

## Context

Build a complete high-fidelity public website prototype for Union Commercial Bank (UCB) Cambodia using the existing React 19 + Vite + Tailwind CSS v4 stack. The deliverable is a Figma Make prototype (not an Angular app), so the implementation uses React with state-based page navigation. The site must project a trusted, premium, and accessible banking brand in both English and Khmer, using UCB's teal/green identity.

---

## Design Tokens (src/index.css)

Established tokens (place Google Font @imports first, before @import 'tailwindcss'):

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Noto+Sans+Khmer:wght@400;600;700&display=swap');
@import 'tailwindcss';

@theme {
  --color-ucb-teal:      #009C9F;
  --color-ucb-teal-dark: #007B7E;
  --color-ucb-teal-light:#E6F7F7;
  --color-ucb-navy:      #0A2540;
  --color-ucb-navy-mid:  #1A3D5C;
  --color-ucb-gold:      #C9A84C;
  --color-ucb-gray:      #F4F6F8;
  --color-ucb-gray-mid:  #D1D5DB;
  --font-sans:  'Inter', system-ui, sans-serif;
  --font-khmer: 'Noto Sans Khmer', sans-serif;
}
```

Aesthetic stance: **minimalist-premium**. Spacious layouts, teal-on-white hierarchy, gold used only for highlights and badges. No heavy gradients, no glass, no drop shadows heavier than `0 2px 12px rgba(0,0,0,0.08)`. Card radius: `12px`. Button radius: `8px`.

---

## File Structure

```
src/
├── index.css                        # tokens + font imports (edit first)
├── App.tsx                          # page state machine + shell layout
├── data/
│   ├── products.ts                  # ~16 product records
│   ├── promotions.ts                # ~8 promotion records
│   ├── news.ts                      # ~6 news records
│   ├── branches.ts                  # ~12 branch/ATM records
│   ├── exchangeRates.ts             # KHR/EUR/THB/CNY/SGD vs USD mock
│   └── faqs.ts                      # FAQ items per category
├── components/
│   ├── layout/
│   │   ├── Header.tsx               # sticky nav, hamburger, active-page highlight
│   │   └── Footer.tsx               # 4 columns + regulatory bar + app download buttons
│   ├── ui/
│   │   ├── Badge.tsx                # variant: new | promo | info | warning
│   │   ├── Alert.tsx                # type: success | warning | error | info
│   │   ├── Modal.tsx                # React portal, close on backdrop
│   │   ├── Breadcrumbs.tsx
│   │   └── Pagination.tsx           # pure presentational
│   ├── cards/
│   │   ├── ProductCard.tsx
│   │   ├── PromotionCard.tsx
│   │   ├── NewsCard.tsx
│   │   └── BranchCard.tsx
│   └── widgets/
│       ├── HeroSection.tsx          # teal-to-navy gradient, CTA buttons
│       ├── QuickActions.tsx         # 4-icon action row
│       ├── ExchangeRateWidget.tsx   # buy/sell table + last-updated
│       └── FaqAccordion.tsx         # one-open-at-a-time accordion
└── pages/
    ├── HomePage.tsx
    ├── ProductsPage.tsx             # category filter sidebar + detail drill-down sub-state
    ├── DigitalBankingPage.tsx
    ├── BranchesPage.tsx
    ├── PromotionsPage.tsx
    ├── ContactPage.tsx
    └── LoginPage.tsx
```

---

## Routing Approach

No `react-router` installed. `App.tsx` owns:

```ts
type Page = 'home'|'products'|'digital-banking'|'branches'|'promotions'|'contact'|'login'
const [page, setPage] = useState<Page>('home')
const [detailId, setDetailId] = useState<string|null>(null)
```

`navigate(page, id?)` is threaded to Header and all CTAs as props. Product detail is a sub-view inside `ProductsPage` controlled by `detailId`.

---

## Pages

### 1. Home
- Sticky header → UCB logo, nav links (Personal, Business, About UCB, Help & Support), language switcher (EN | ខ្មែរ), Login button
- Hero: teal-to-navy gradient, Unsplash photo (Cambodian woman using smartphone), headline + two CTAs
- QuickActions row: Open Account, Apply for Loan, Find Branch/ATM, Digital Banking
- Product category cards (5): Accounts & Deposits, Loans, Cards, Digital Banking, Business Banking
- Promotions strip (3 PromotionCards) + News strip (3 NewsCards)
- ExchangeRateWidget (2-col section with branch locator teaser)
- Security Tips card with gold accent
- Footer

### 2. Products
- Breadcrumbs
- Left sidebar: category filter (radio group, collapsible on mobile)
- Right: 3→2→1 col card grid, client-side filtered from `products.ts`
- Clicking a ProductCard → detail sub-view: eligibility, benefits, fees, required docs, FAQ accordion, Apply CTA

### 3. Digital Banking
- Hero with dark-navy ground
- Mobile Banking feature section: 3-col icon grid
- Internet Banking feature section
- App screenshot mockups (styled div placeholders with phone frame)
- Security features: biometric, OTP, notifications — 3 icon+text cards
- Download App CTAs (App Store / Google Play buttons) + Register Now CTA

### 4. Branches & ATMs
- Search input (by name/address) + Province select + Type filter button group (All / Branch / ATM / CDM)
- Map placeholder (teal-bordered gray div, 400px height)
- Card list below (BranchCard) — clicking expands a detail panel (address, hours, phone, services, Directions button)

### 5. Promotions & News
- Featured promotion banner (full-width hero card)
- Search + category tabs
- Paginated 3-col card grid (6 per page)
- Clicking a card opens a Modal with full detail

### 6. Contact & Support
- Contact form: name, phone, email, subject select, message textarea — all controlled with basic validation
- Info row: Call center (+855 23 xxx xxx), Email, Branch Locator link, Emergency card blocking (yellow Alert)
- FaqAccordion (10 items)

### 7. Login Entry
- Two large choice cards: Personal Banking / Business Banking (selected state: teal border)
- "Proceed to Internet Banking" button (disabled until choice made)
- Security reminder Alert (info)
- Phishing warning Alert (warning, gold)
- UCB logo + "Secure Login" heading

---

## Shared Components: Key Props

```ts
// Header
{ page: Page; navigate: (p: Page, id?: string) => void }

// ProductCard
{ product: Product; onSelect: (id: string) => void }

// ExchangeRateWidget
{ compact?: boolean }  // compact for homepage sidebar, full for standalone

// FaqAccordion
{ items: { question: string; answer: string }[] }

// Pagination
{ total: number; perPage: number; current: number; onChange: (n: number) => void }
```

---

## Mock Data Shape

```ts
// products.ts
interface Product {
  id: string; category: 'personal'|'business'|'loans'|'cards'|'digital';
  name: string; tagline: string; icon: string;
  highlights: string[]; rateOrFee?: string; isNew?: boolean;
  eligibility: string[]; requiredDocs: string[]; faqs: {q:string;a:string}[];
}

// branches.ts
interface Branch {
  id: string; name: string; type: 'branch'|'atm'|'cdm'|'24h-atm';
  address: string; province: string; hours: string; phone: string;
  services: string[]; lat: number; lng: number;
}

// exchangeRates.ts
{ lastUpdated: string; base: 'USD'; rates: {currency:string;flag:string;buy:number;sell:number}[] }
```

---

## Accessibility

- All interactive elements keyboard-navigable with visible `:focus-visible` ring in teal
- ARIA `aria-label` on icon-only buttons (hamburger, close modal, language switcher)
- Semantic headings per page (one `<h1>`, logical `<h2>`/`<h3>` hierarchy)
- Color contrast: body text #0A2540 on #F4F6F8 → ≥7:1 (AAA); white on teal → 3.2:1 meets AA for large text / UI components
- Images: descriptive `alt` text on all `<img>` tags
- Form inputs: explicit `<label>` associations, not placeholder-only

---

## Unsplash Photo IDs to Use

- Hero (home): `photo-1559526324-593bc073d938` (Southeast Asian woman, phone)
- Digital Banking: `photo-1611532736597-de2d4265fba3` (mobile app UI)
- Branches hero: `photo-1477959858617-67f85cf4f1df` (Phnom Penh cityscape)
- Promotions: `photo-1607082348824-0a96f2a4b9da` (shopping / lifestyle)

---

## Implementation Order

1. `src/index.css` — tokens, fonts, utility classes (.btn-primary, .card, .btn-outline)
2. `src/App.tsx` — page state machine, shell layout (Header + page switcher + Footer)
3. `src/components/layout/Header.tsx` and `Footer.tsx`
4. All `src/data/*.ts` files
5. UI primitives: Badge, Alert, Breadcrumbs, Pagination, Modal, FaqAccordion
6. Cards: ProductCard, PromotionCard, NewsCard, BranchCard
7. Widgets: HeroSection, QuickActions, ExchangeRateWidget
8. Pages in order: Home → Products → Promotions → Branches → Digital Banking → Contact → Login

---

## Verification

After implementation, confirm:
- All 7 pages render without runtime errors
- Header nav links switch pages correctly
- Mobile (375px): hamburger opens/closes drawer, cards stack to 1 col
- ProductsPage category filter works (client-side array filter)
- ContactPage form validation shows field-level errors
- LoginPage "Proceed" button disabled until choice made
- ExchangeRateWidget shows rates with timestamp
- Promotions pagination advances pages
- No TypeScript errors from `data/` interfaces
