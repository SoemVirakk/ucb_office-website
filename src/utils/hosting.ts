const STATIC_HOST_SUFFIXES = [".github.io", ".netlify.app"]
const LOCAL_PREVIEW_HOSTS = new Set(["localhost", "127.0.0.1", "::1"])

/** Detects production static hosting where same-origin API routes are unavailable. */
export function shouldUseStaticExchangeRates() {
  if (typeof window === "undefined") return false

  const hostname = window.location.hostname.toLowerCase()
  return (
    STATIC_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix)) ||
    (import.meta.env.PROD && LOCAL_PREVIEW_HOSTS.has(hostname))
  )
}
