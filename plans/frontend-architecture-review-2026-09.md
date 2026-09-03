# UCB Bank Frontend Architecture Review

Date: 2026-09-03
Scope: React/Vite frontend only. Backend was intentionally excluded.

## Current Structure

The project currently has a compact prototype-oriented structure:

```text
src/
  App.tsx, main.tsx, index.css
  pages/              route-level page components
  components/         shared layout, cards, widgets, and UI
  data/               active static content fixtures
  mocks/              newer multilingual fixtures, currently not consumed by pages
  types/              shared navigation and localization contracts
```

There are no `services`, `hooks`, `state`, `utils`, or `tests` directories, and no API client or backend in this workspace.

## Proposed Target Structure

```text
src/
  app/
    App.tsx
    router.tsx
    providers.tsx
  features/
    home/
    products/
    promotions/
    news/
    announcements/
    branches/
    careers/
    contact/
    digital-banking/
    auth/
    cms/
  shared/
    layout/            Header, Footer, navigation
    ui/                Button, Input, Modal, states, Toast
    forms/
    cards/
  services/
    contentService.ts
    searchService.ts
    formService.ts
  hooks/
    useLocale.ts
    useOnlineStatus.ts
    useAsync.ts
  state/
    localeStore.ts
  types/
    navigation.ts
    localization.ts
    content.ts
  mocks/
    languages.ts
    content.ts
    careers.ts
    news.ts
    products.ts
    faqs.ts
  styles/
    tokens.css
    globals.css
  tests/
    components/
    routes/
    accessibility/
```

## Current Structural Issues

| Severity | Affected area | Problem | Impact | Recommendation | Status |
|---|---|---|---|---|---|
| High | `CmsPage.tsx`, `/cms` route | CMS is a large client-only editor with no service/auth boundary | Cannot enforce admin permissions or safely publish content | Move CMS into a feature module and connect only to an authenticated backend service | Recommended only; backend is absent |
| High | `ContactPage.tsx`, `CareersPage.tsx`, `OnlineServicesPage.tsx`, `CmsPage.tsx` | Forms mutate local state and have no request/service lifecycle | Future API integration could falsely show success or permit duplicate submissions | Introduce typed services and explicit idle/pending/success/error states | Recommended only; no API exists |
| High | `SearchPage.tsx` | News search results navigated to Promotions | Users land on the wrong content type | Correct result route to `news` | Implemented |
| Medium | All pages/components | `Page` route union was duplicated across many files | Route additions can silently drift between components | Centralize in `src/types/navigation.ts` | Implemented |
| Medium | `data/mockTranslations.ts`, `mocks/languages.ts` | Locale types were owned by mock modules and duplicated conceptually | UI contracts depend on data fixture location | Centralize locale types and fallback helpers in `src/types/localization.ts` | Implemented |
| Medium | `src/data` vs `src/mocks` | Two incompatible fixture systems exist; newer mocks are mostly unused | It is unclear which data is replaceable by APIs | Choose one fixture adapter and expose it through services | Recommended only |
| Medium | `CmsPage.tsx` | Dashboard and multiple editors are combined in one large file | Harder testing, review, and permission separation | Extract `features/cms` sections incrementally | Recommended only |
| Medium | `index.css` and page JSX | Repeated inline styles coexist with global responsive utilities | Breakpoint and token changes are expensive and inconsistent | Move shared tokens/layout rules to CSS modules or feature styles gradually | Recommended only |
| Medium | Cards and modal | Several clickable card wrappers contain nested controls; Modal lacks focus restoration/trap | Ambiguous keyboard semantics | Use one primary interactive element per card and improve modal focus management | Recommended only |
| Medium | `ChatbotWidget.tsx`, `Toast.tsx` | Timers are local and not centrally cancelled | Delayed updates can target stale UI after unmount | Add a cancellable timer hook and cleanup on unmount | Recommended only |
| Low | Project tooling | No test files, test script, lint script, or dedicated typecheck script | Regressions can reach review unnoticed | Add Vitest, Testing Library, axe checks, ESLint, and CI commands | Recommended only |
| Low | Assets | Most imagery is remote and some mock asset paths do not exist locally | External availability, privacy, and layout-shift risk | Add approved optimized local/CDN assets with width/height metadata | Recommended only |
| Low | Localization | Some pages remain English-only and user-facing strings are embedded in JSX | Incomplete translation coverage and difficult content operations | Move UI copy to locale dictionaries and use `localizedValue` consistently | Recommended only |

## Implemented Safe Changes

- Added shared `Page` and `routeForPage` contracts in `src/types/navigation.ts`.
- Replaced duplicated route unions in public pages and shared navigation components.
- Added shared locale types in `src/types/localization.ts` while preserving mock compatibility exports.
- Fixed news search results to navigate to the News page.
- Fixed the malformed `EmptyState` action type in `src/components/ui/States.tsx`.
- No public route, business content, branding, or backend contract was changed.

## Safe Refactoring Plan

1. Add tests and linting before broad movement: route mapping, search destinations, locale fallback, forms, keyboard interactions, and chatbot safety.
2. Add typed service interfaces over the current fixtures. Keep fixture adapters behind those interfaces and make page components consume service results rather than arrays.
3. Extract a `useLocale`/online-status hook and a single app provider after tests cover URL and localStorage precedence.
4. Split CMS into feature modules while preserving its existing route and visual markup.
5. Convert detail subviews to URL-backed child routes only with explicit compatibility tests for refresh and browser history.
6. Migrate repeated inline layout styles to shared tokens and feature styles in small, visually verified slices.
7. Connect real APIs only after authentication, authorization, validation, error, and observability contracts are approved.

## Verification

- TypeScript diagnostics: passed for changed frontend files.
- `npm run build`: passed.
- `npm audit --audit-level=moderate`: passed with no known vulnerabilities.
- `npm run lint`: unavailable because no lint script exists.
- `npm run typecheck`: unavailable because no typecheck script exists; editor diagnostics were used.
- `npm test`: unavailable because no test script or test files exist.
