import { useEffect, useRef, useState } from "react"
import { getUsdQuoteExchangeRate } from "../../services/exchangeRatesApi"
import { isGithubPagesHost, siteHref } from "../../utils/assets"

type RateStatus = "loading" | "live" | "stale"
type QuoteCode = "KHR" | "EUR" | "THB" | "CNY" | "SGD" | "GBP" | "JPY"

const quotes: QuoteCode[] = ["KHR", "EUR", "THB", "CNY", "SGD", "GBP", "JPY"]

function formatRate(rate: number, quote: QuoteCode): string {
  if (quote === "KHR" || quote === "JPY") {
    return Math.round(rate).toLocaleString("en-US")
  }

  return rate.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  })
}

/** Renders a compact rotating live exchange-rate link for dark hero banners. */
export default function LiveExchangeRate() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [rates, setRates] = useState<Partial<Record<QuoteCode, number>>>({})
  const [status, setStatus] = useState<RateStatus>("loading")
  const loadingRef = useRef(false)
  const currentIndexRef = useRef(0)
  const ratesRef = useRef<Partial<Record<QuoteCode, number>>>({})
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    let mounted = true

    const loadRate = async (quote: QuoteCode) => {
      if (isGithubPagesHost()) {
        setStatus("stale")
        return
      }

      if (loadingRef.current) return
      loadingRef.current = true
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      try {
        const result = await getUsdQuoteExchangeRate(quote, controller.signal)
        if (!mounted) return
        ratesRef.current = { ...ratesRef.current, [quote]: result.rate }
        setRates(ratesRef.current)
        setStatus("live")
      } catch {
        if (!mounted || controller.signal.aborted) return
        setStatus(ratesRef.current[quote] === undefined ? "loading" : "stale")
      } finally {
        if (abortRef.current === controller) abortRef.current = null
        loadingRef.current = false
      }
    }

    loadRate(quotes[currentIndexRef.current])
    const intervalId = window.setInterval(() => {
      if (loadingRef.current) return
      currentIndexRef.current = (currentIndexRef.current + 1) % quotes.length
      setCurrentIndex(currentIndexRef.current)
      loadRate(quotes[currentIndexRef.current])
    }, 3000)

    return () => {
      mounted = false
      window.clearInterval(intervalId)
      abortRef.current?.abort()
    }
  }, [])

  const quote = quotes[currentIndex]
  const rate = rates[quote]
  const formattedRate = rate === undefined ? "-" : formatRate(rate, quote)
  const dotColor = status === "live" ? "#22C55E" : "#9CA3AF"
  const label =
    rate === undefined
      ? `Live USD to ${quote} exchange rate loading. View exchange rates`
      : `Live USD to ${quote} exchange rate: ${formattedRate}. View exchange rates`

  return (
    <>
      <a
        href={siteHref("/exchange-rates")}
        aria-label={label}
        className="live-exchange-rate"
        style={{
          position: "absolute",
          top: 18,
          right: 24,
          zIndex: 4,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          lineHeight: 1.2,
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        <span
          aria-hidden="true"
          style={{ color: dotColor, fontSize: 13, lineHeight: 1 }}
        >
          ●
        </span>
        <span key={quote} className="live-exchange-rate-value">
          USD/{quote} {formattedRate}
        </span>
        <span aria-hidden="true" className="live-exchange-rate-separator">
          |
        </span>
        <span style={{ color: "#009C9F" }}>Exchange rates →</span>
      </a>
      <style>{`
        .live-exchange-rate-value {
          animation: live-rate-switch 260ms ease both;
        }
        @keyframes live-rate-switch {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .live-exchange-rate-value { animation: none; }
        }
        @media (max-width: 600px) {
          .live-exchange-rate {
            top: 14px !important;
            right: 16px !important;
            font-size: 12px !important;
          }
          .live-exchange-rate-value,
          .live-exchange-rate-separator {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}
