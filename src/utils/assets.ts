export const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`

/** Keeps same-site absolute links under the deployed base path. */
export const siteHref = (href: string) =>
  href.startsWith("/") ? `${import.meta.env.BASE_URL}${href.replace(/^\/+/, "")}` : href

/** GitHub Pages cannot serve same-origin backend API routes. */
export const isGithubPagesHost = () =>
  typeof window !== "undefined" && window.location.hostname.endsWith("github.io")
