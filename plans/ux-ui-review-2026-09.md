# UCB Bank Public Website UX/UI Review

Date: 2026-09-03
Scope: Public React/Vite website, shared layout and UI components, Careers experience, responsive behavior, accessibility, and chatbot.

## Executive Summary

The prototype has a coherent UCB visual system, strong content coverage, clear product/news/careers journeys, and a responsible chatbot privacy guard. The highest-risk issues were accessibility and interaction gaps rather than brand or page structure. High-priority fixes in this review add keyboard access, visible skip navigation, touch-sized controls, stronger dialog semantics, and a keyboard-operable job list without changing routes, business content, or security behavior.

## Critical Issues

### C-01: Production trust controls are still prototype-only
- Affected: `src/pages/LoginPage.tsx`, `src/components/ui/ChatbotWidget.tsx`, public forms.
- Problem: The site is a frontend prototype with no backend enforcement, real authentication, server-side validation, or audit trail.
- User impact: Production users could mistake mock flows for connected banking services if deployment boundaries are not explicit.
- Recommendation: Keep credential entry on the approved external banking platform, add environment-specific banners, connect forms only through an approved backend, and complete security review before launch.
- Priority: Critical
- Status: Recommended only; no backend exists in this workspace.

### C-02: Content and translations are static
- Affected: `src/data/*.ts`, `src/mocks/*`.
- Problem: Public content and multilingual data are local mock data; there is no production CMS/API in this workspace.
- User impact: Content freshness, translation publishing, and fallback behavior cannot be operationally managed.
- Recommendation: Implement the normalized translation API and CMS workflow in the backend workspace before production release.
- Priority: Critical
- Status: Recommended only; this workspace contains frontend mock data only.

## High-Priority Improvements

### H-01: Keyboard users lacked skip navigation
- Affected: `src/App.tsx`, `src/index.css`.
- Problem: CSS defined a skip-link style, but the application did not render the link.
- User impact: Keyboard and screen-reader users must tab through the full header before reaching page content.
- Fix: Added a semantic `Skip to main content` link targeting `#main-content`.
- Priority: High
- Status: Implemented.

### H-02: Common controls did not meet the 44px touch target
- Affected: `src/index.css`, `src/components/ui/Pagination.tsx`, `src/components/ui/ChatbotWidget.tsx`.
- Problem: Shared buttons, pagination controls, and chatbot send/language controls used compact dimensions.
- User impact: Increased activation errors for mobile and motor-impaired users.
- Fix: Added 44px minimum sizing to shared button classes, pagination, and chatbot controls.
- Priority: High
- Status: Implemented.

### H-03: Careers job cards were not keyboard operable
- Affected: `src/components/careers/JobList.tsx`.
- Problem: The whole job card responded to pointer clicks but had no keyboard semantics.
- User impact: Keyboard users could not open a job by focusing the card.
- Fix: Added `role="button"`, `tabIndex`, Enter/Space handling, and visible focus styling.
- Priority: High
- Status: Implemented.

### H-04: Chatbot dialog semantics were incomplete
- Affected: `src/components/ui/ChatbotWidget.tsx`.
- Problem: The open chatbot had `role="dialog"` but lacked `aria-modal`, and its language toggle only cycled English and Khmer.
- User impact: Assistive technology users receive weaker dialog context, and Chinese-selected users cannot keep the chatbot language aligned.
- Fix: Added `aria-modal="true"` and a three-language cycle including Simplified Chinese. Existing sensitive-data interception remains unchanged.
- Priority: High
- Status: Implemented.

### H-05: FAQ answers were not associated with their controls
- Affected: `src/components/ui/FaqAccordion.tsx`.
- Problem: Accordion buttons exposed expanded state but not the controlled answer region.
- User impact: Screen-reader users have less reliable context when expanding answers.
- Fix: Added matching `aria-controls` and answer IDs.
- Priority: High
- Status: Implemented.

## Medium-Priority Improvements

### M-01: Mobile menu focus management is incomplete
- Affected: `src/components/layout/Header.tsx`.
- Problem: The drawer locks body scrolling and closes on Escape, but it does not trap focus or restore focus to the menu button.
- User impact: Keyboard focus can move behind the open drawer.
- Recommendation: Add a focus trap and restore focus after close.
- Priority: Medium
- Status: Recommended only.

### M-02: Some mock links use `href="#"`
- Affected: `src/components/layout/Footer.tsx`, `src/components/ui/CookieConsent.tsx`, `src/pages/DigitalBankingPage.tsx`.
- Problem: Social, app-store, and privacy links are placeholders.
- User impact: Users may be returned to the top of the page or believe a link is broken.
- Recommendation: Replace placeholders with approved URLs before launch.
- Priority: Medium
- Status: Recommended only; approved destinations were not provided.

### M-03: Interactive cards use nested interactive controls
- Affected: `src/components/careers/JobList.tsx`, related card/list components.
- Problem: A keyboard-operable card contains a separate button, creating overlapping interaction semantics.
- User impact: Screen-reader and keyboard behavior can be ambiguous.
- Recommendation: Make the primary card action a single link/button and keep secondary actions outside its interactive boundary.
- Priority: Medium
- Status: Recommended only.

### M-04: Bundle size warning remains
- Affected: Vite production build.
- Problem: The main JavaScript bundle is over the 500 kB warning threshold.
- User impact: Slower initial load on mobile connections.
- Recommendation: Lazy-load lower-frequency routes such as CMS, Design System, and Design Review.
- Priority: Medium
- Status: Recommended only.

## Nice-to-Have Improvements

- Automated axe accessibility checks and Playwright regression tests: Priority Low; Status Recommended only.
- A complete focus-visible and automated contrast audit for custom icon actions: Priority Low; Status Recommended only.
- Loading/error states around future API content with retry context: Priority Low; Status Recommended only.
- Production-approved security, privacy, regulatory, and complaint links: Priority Low; Status Recommended only.
- Complete Khmer and Simplified Chinese page copy instead of English fallback: Priority Low; Status Recommended only.

## Responsive Verification

Target widths reviewed: 320px, 375px, 414px, 768px, 1024px, 1280px, and 1440px.

- Header uses the mobile drawer through 1100px and desktop navigation above 1100px.
- Careers filters use two columns through 900px and one column through 600px.
- Careers job actions stack at 600px.
- Mobile search remains available in the drawer; the desktop search action is hidden below 600px to prevent header overflow.
- Header and Careers page were checked for horizontal overflow at all target widths; the responsive fixes removed the previously observed overflow.
- Remaining visual QA should include real device font rendering for Khmer and Chinese and keyboard-only walkthroughs in Chrome, Edge, and Safari.

## Validation

- TypeScript diagnostics: passed for all changed components.
- `npm run build`: passed.
- `npm run lint`: unavailable because no lint script is defined in `package.json`.
- Vite still reports existing config-loader and bundle-size warnings; these are not introduced by the UX fixes.
