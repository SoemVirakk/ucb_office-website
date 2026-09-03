# UCB Bank Application Security Review

Date: 2026-09-03
Scope: Current React/Vite public website and in-repository CMS prototype.

## Scope and Evidence

This workspace contains only a React/Vite frontend. No Spring Boot source, Maven/Gradle build, database layer, REST controller, security configuration, API client, server upload endpoint, authentication provider, or server logging configuration is present. The CMS, forms, login entry, chatbot, and multilingual data are frontend/mock flows.

## Critical

### C-01: No production authentication or session enforcement
- Affected: `src/pages/LoginPage.tsx`, `src/App.tsx`, `src/pages/CmsPage.tsx`.
- Risk: Login is a profile-selection prototype and CMS routes are client-rendered without authentication or authorization.
- Impact: A production deployment could expose administration or mislead users about banking authentication.
- Mitigation: Keep credential entry on the approved external banking platform; protect admin/API routes server-side with secure HttpOnly SameSite cookies or an approved token architecture, session expiry, logout, RBAC, and safe 401/403 responses. Preserve the intended route only through an allowlisted internal route.
- Priority: Critical.
- Status: Requires backend/infrastructure action; not safely implementable in this frontend-only workspace.

### C-02: No server-side validation, rate limiting, CSRF, IDOR/BOLA, or upload controls
- Affected: Public forms, CMS forms, career application, chatbot; backend absent.
- Risk: Client validation can be bypassed, and there is no server boundary for authorization, request limits, sanitization, file signature checks, or audit logging.
- Impact: Abuse, data injection, spam, unauthorized record access, unsafe uploads, or loss of auditability.
- Mitigation: Add DTO validation, allowlisted IDs/fields, CSRF protection for cookie sessions, per-route rate limits, request-size limits, authorization checks on every mutation/read, and server-side audit logging.
- Priority: Critical.
- Status: Requires backend/infrastructure action.

### C-03: Security headers and HTTPS policy are not configured here
- Affected: `index.html`, `vite.config.ts`, deployment layer.
- Risk: No CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, or frame-ancestors policy is visible in this repository.
- Impact: Weaker browser isolation and increased exposure if deployment defaults are insufficient.
- Mitigation: Configure headers at the approved HTTPS reverse proxy/CDN/server. Build a CSP compatible with required assets, remove or nonce inline scripts where practical, enforce HTTPS, and verify with response-header tests.
- Priority: Critical.
- Status: Requires deployment/infrastructure action.

## High

### H-01: Chat history is stored in sessionStorage
- Affected: `src/components/ui/ChatbotWidget.tsx`.
- Risk: Chat messages persist for the browser tab lifetime and are readable by any script executing in the origin.
- Impact: Sensitive user-entered data could remain accessible despite the chatbot warning.
- Mitigation: Keep the current sensitive-data block, never send protected data to any service, consider avoiding persistence entirely, and enforce server-side redaction/rate limits when an API is introduced.
- Priority: High.
- Status: Recommended; current storage is session-scoped and no backend is present.

### H-02: CMS and login flows are not security boundaries
- Affected: `src/pages/CmsPage.tsx`, `src/pages/LoginPage.tsx`.
- Risk: Hidden UI states or client routes cannot enforce permissions; login currently uses a browser alert rather than a configured approved banking URL.
- Impact: Unauthorized users could access mock admin screens, and an incomplete login flow could be mistaken for production authentication.
- Mitigation: Enforce backend RBAC and approved external redirect allowlists. Add explicit non-production labeling in deployment environments.
- Priority: High.
- Status: Requires backend/infrastructure action.

### H-03: Public forms do not model request failure or duplicate-submit protection
- Affected: `src/pages/ContactPage.tsx`, `src/pages/CareersPage.tsx`, `src/pages/OnlineServicesPage.tsx`.
- Risk: Forms transition locally without a pending network state or server response handling.
- Impact: In a future integration, users may retry accidentally, lose context, or receive false success feedback.
- Mitigation: Add request state machines with pending guards, idempotency keys, safe generic errors, retry behavior, and server-side validation before connecting APIs.
- Priority: High.
- Status: Recommended for backend integration; no API exists here.

### H-04: Mock CMS image URL workflow has no file security boundary
- Affected: `src/pages/CmsPage.tsx`.
- Risk: Admin prototype accepts/presents image URLs; no authenticated upload, MIME signature, dimension, filename, or storage policy exists.
- Impact: Unsafe remote content or executable upload risks if this UI is connected directly to storage.
- Mitigation: Use an authenticated upload service, allow only required formats, inspect signatures server-side, generate random names, store outside executable paths, and protect private downloads.
- Priority: High.
- Status: Requires backend/infrastructure action.

## Medium

### M-01: Sensitive-looking security content is hardcoded mock copy
- Affected: `src/data/*`, `src/pages/SecurityCenterPage.tsx`.
- Risk: Static advice, contact numbers, and operational messages can become stale.
- Impact: Customers may follow outdated fraud or support guidance.
- Mitigation: Publish approved security content through a controlled CMS with review/expiry workflow and compliance ownership.
- Priority: Medium.
- Status: Recommended.

### M-02: Placeholder links remain
- Affected: `src/components/layout/Footer.tsx`, `src/components/ui/CookieConsent.tsx`, `src/pages/DigitalBankingPage.tsx`.
- Risk: `href="#"` links do not provide real privacy, social, app-store, or legal destinations.
- Impact: Reduced trust and possible failure to meet privacy notice requirements.
- Mitigation: Replace with approved HTTPS destinations before launch.
- Priority: Medium.
- Status: Recommended; approved URLs were not supplied.

### M-03: Production bundle is large and development source maps are enabled
- Affected: `vite.config.ts`, production build output.
- Risk: Large initial bundle affects availability/performance; development mode emits inline source maps.
- Impact: Slower mobile experience and potential source disclosure if the wrong build mode is deployed.
- Mitigation: Enforce production build configuration in CI, verify source maps are not shipped unintentionally, and lazy-load low-frequency routes.
- Priority: Medium.
- Status: Recommended; current production build disables source maps.

### M-04: Error boundary logging policy is undefined
- Affected: `src/components/ui/ErrorBoundary.tsx`, deployment monitoring.
- Risk: The frontend has a safe user-facing boundary but no approved monitoring integration in this workspace.
- Impact: Render failures may not be observable or correlated.
- Mitigation: Connect an approved monitor with redaction and never include tokens, credentials, full account numbers, documents, or raw user messages.
- Priority: Medium.
- Status: Requires monitoring/infrastructure action.

## Low / Nice to Have

- Add automated security regression tests for XSS payloads, chatbot protected-data blocking, route access, redirect allowlists, and form retry behavior. Priority Low; Recommended.
- Add dependency freshness checks and Maven/Gradle audit when the backend workspace is available. Priority Low; Recommended.
- Document retention, backup, rollback, incident response, and audit-log retention with Security, Privacy, and Compliance. Priority Low; Recommended.
- Add response-header, HTTPS, CSP, and production source-map checks to CI. Priority Low; Recommended.

## Positive Controls Observed

- No hardcoded secrets, API keys, authorization headers, or database credentials were found in the scanned source/configuration.
- `.env*`, logs, build output, and debug artifacts are ignored by `.gitignore`.
- React does not use `dangerouslySetInnerHTML` or direct `innerHTML` rendering.
- Chatbot blocks password, PIN, OTP, CVV, card-number, and account-number patterns before storing the message.
- Login page does not collect credentials.
- External map navigation uses `rel="noopener noreferrer"`.
- Error UI avoids displaying exception details to users.

## Verification

- `npm audit --audit-level=moderate`: passed; no known vulnerabilities.
- TypeScript diagnostics: passed for the security-touched frontend files.
- `npm run build`: passed after the current resilience changes.
- `npm run lint`: unavailable; no lint script exists.
- Backend tests/Maven/Gradle audit: unavailable; no backend exists in this workspace.
- Browser security and responsive checks should be repeated against the deployed HTTPS origin once backend and infrastructure are provided.
