import { useEffect, useMemo, useRef, useState } from "react"
import {
  exchangeRateTickerMock,
  tickerCurrencies,
} from "../../data/exchangeRateTickerMock"
import "./ExchangeRateTicker.css"

const EXCHANGE_RATES_URL = "/api/v1/public/exchange-rates"
const API_REFRESH_MS = 60_000
const TICKER_ROTATE_MS = 3000

const flagAltByCode = {
  USD: "United States flag",
  THB: "Thailand flag",
  EUR: "European Union flag",
  AUD: "Australia flag",
  CNY: "China flag",
  JPY: "Japan flag",
}

function formatRate(value, decimals = 0) {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

function movementFor(nextRate, previousRate) {
  if (!previousRate) return "same"
  if (nextRate.buy > previousRate.buy || nextRate.sell > previousRate.sell) {
    return "up"
  }
  if (nextRate.buy < previousRate.buy || nextRate.sell < previousRate.sell) {
    return "down"
  }
  return "same"
}

function movementSymbol(movement) {
  if (movement === "down") return "↓"
  if (movement === "up") return "↑"
  return "→"
}

function usePrefersReducedMotion() {
  return useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  )
}

function normalizeApiRates(apiRates, previousRates) {
  const previousByCode = new Map(previousRates.map((rate) => [rate.currency, rate]))

  return apiRates.map((rate) => {
    const normalized = {
      currency: rate.code,
      flagSrc: rate.flag,
      flagAlt: flagAltByCode[rate.code] ?? `${rate.name} flag`,
      buy: rate.buy,
      sell: rate.sell,
      decimals: rate.decimals ?? 0,
    }

    return {
      ...normalized,
      movement: movementFor(normalized, previousByCode.get(normalized.currency)),
    }
  })
}

export default function ExchangeRateTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [rates, setRates] = useState(exchangeRateTickerMock)
  const reducedMotion = usePrefersReducedMotion()
  const intervalRef = useRef(null)
  const latestRatesRef = useRef(exchangeRateTickerMock)

  const visibleRates = useMemo(() => {
    const orderedRates = tickerCurrencies
      .map((currency) => rates.find((rate) => rate.currency === currency))
      .filter(Boolean)

    return reducedMotion ? orderedRates.slice(0, 1) : orderedRates
  }, [rates, reducedMotion])

  const rate = visibleRates[currentIndex % visibleRates.length]

  useEffect(() => {
    const controller = new AbortController()
    let mounted = true

    async function loadRates() {
      try {
        const response = await fetch(EXCHANGE_RATES_URL, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        })

        if (!response.ok) throw new Error("Unable to load exchange rates")

        const data = await response.json()
        if (!Array.isArray(data.rates) || data.rates.length === 0) return

        const nextRates = normalizeApiRates(data.rates, latestRatesRef.current)
        if (!mounted) return

        latestRatesRef.current = nextRates
        setRates(nextRates)
      } catch {
        if (controller.signal.aborted) return
      }
    }

    loadRates()
    const refreshId = window.setInterval(loadRates, API_REFRESH_MS)

    return () => {
      mounted = false
      controller.abort()
      window.clearInterval(refreshId)
    }
  }, [])

  useEffect(() => {
    if (reducedMotion || paused || visibleRates.length <= 1) return undefined

    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % visibleRates.length)
    }, TICKER_ROTATE_MS)

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [paused, reducedMotion, visibleRates.length])

  useEffect(() => {
    if (currentIndex >= visibleRates.length) setCurrentIndex(0)
  }, [currentIndex, visibleRates.length])

  if (!rate) return null

  const buy = formatRate(rate.buy, rate.decimals)
  const sell = formatRate(rate.sell, rate.decimals)
  const symbol = movementSymbol(rate.movement)
  const movementClass = `exchange-rate-ticker__movement exchange-rate-ticker__movement--${rate.movement}`

  return (
    <a
      href="/exchange-rates"
      className="exchange-rate-ticker"
      aria-label={`Exchange rate ${rate.currency}. Buy ${buy}. Sell ${sell}. View exchange rates`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span className="exchange-rate-ticker__label">EXCHANGE</span>
      <span className="exchange-rate-ticker__separator" aria-hidden="true">
        |
      </span>
      <span className="exchange-rate-ticker__viewport">
        <span
          key={`${rate.currency}-${buy}-${sell}-${rate.movement}`}
          className={`exchange-rate-ticker__rate exchange-rate-ticker__rate--${rate.movement}`}
        >
          <img
            className="exchange-rate-ticker__flag"
            src={rate.flagSrc}
            alt={rate.flagAlt}
          />
          <span className="exchange-rate-ticker__currency">
            {rate.currency}
          </span>
          <span className="exchange-rate-ticker__separator" aria-hidden="true">
            |
          </span>
          <span className="exchange-rate-ticker__buy">
            Buy <span className="exchange-rate-ticker__value">{buy}</span>
          </span>
          <span className="exchange-rate-ticker__sell">
            Sell <span className="exchange-rate-ticker__value">{sell}</span>
          </span>
          <span className={movementClass} aria-hidden="true">
            {symbol}
          </span>
        </span>
      </span>
      <span className="exchange-rate-ticker__mobile-arrow" aria-hidden="true">
        →
      </span>
    </a>
  )
}
