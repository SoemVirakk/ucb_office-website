import { useEffect, useRef, useState } from "react"
import { Minus, TrendingDown, TrendingUp } from "lucide-react"
import { isGithubPagesHost, publicAsset, siteHref } from "../../utils/assets"

interface ExchangeRateWidgetProps {
  compact?: boolean
}

type ExchangeRateDirection = "up" | "down" | "same" | "new"

type ApiExchangeRate = {
  code: string
  name: string
  flag: string
  buy: number
  sell: number
  decimals: number
}

type ExchangeRateResponse = {
  lastUpdated: string
  rates: ApiExchangeRate[]
}

type RateWithDirection = ApiExchangeRate & {
  buyDirection: ExchangeRateDirection
  sellDirection: ExchangeRateDirection
}

type RateValueProps = {
  value: number
  decimals: number
  direction: ExchangeRateDirection
  label: string
}

const EXCHANGE_RATES_URL = "/api/v1/public/exchange-rates"
const REFRESH_INTERVAL_MS = 60_000
const MOCK_EXCHANGE_RATES: ExchangeRateResponse = {
  lastUpdated: "2026-09-05T11:00:00+07:00",
  rates: [
    {
      code: "USD",
      name: "US Dollar",
      flag: publicAsset("assets/images/flags/us.svg"),
      buy: 4080,
      sell: 4100,
      decimals: 0,
    },
    {
      code: "THB",
      name: "Thai Baht",
      flag: publicAsset("assets/images/flags/th.svg"),
      buy: 34.2,
      sell: 34.8,
      decimals: 3,
    },
    {
      code: "CNY",
      name: "Chinese Yuan",
      flag: publicAsset("assets/images/flags/cn.svg"),
      buy: 7.1,
      sell: 7.18,
      decimals: 3,
    },
    {
      code: "JPY",
      name: "Japanese Yen",
      flag: publicAsset("assets/images/flags/jp.svg"),
      buy: 147.2,
      sell: 149.8,
      decimals: 3,
    },
    {
      code: "EUR",
      name: "Euro",
      flag: publicAsset("assets/images/flags/eu.svg"),
      buy: 1.085,
      sell: 1.095,
      decimals: 3,
    },
  ],
}
const MOCK_PREVIOUS_EXCHANGE_RATES: ApiExchangeRate[] =
  MOCK_EXCHANGE_RATES.rates.map((rate, index) => ({
    ...rate,
    buy:
      index % 2 === 0
        ? Number((rate.buy - 0.01 * Math.max(1, rate.buy)).toFixed(rate.decimals))
        : Number((rate.buy + 0.01 * Math.max(1, rate.buy)).toFixed(rate.decimals)),
    sell:
      index % 2 === 0
        ? Number((rate.sell - 0.01 * Math.max(1, rate.sell)).toFixed(rate.decimals))
        : Number((rate.sell + 0.01 * Math.max(1, rate.sell)).toFixed(rate.decimals)),
  }))

function directionFor(
  nextValue: number,
  previousValue: number | undefined,
): ExchangeRateDirection {
  if (previousValue === undefined) return "new"
  if (nextValue > previousValue) return "up"
  if (nextValue < previousValue) return "down"
  return "same"
}

function formatRate(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

function formatLastUpdated(timestamp: string) {
  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) return timestamp

  return date
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Phnom_Penh",
    })
    .replace(",", "")
    .replace("Sept", "Sep") + " GMT+7"
}

function RateValue({ value, decimals, direction, label }: RateValueProps) {
  const formatted = formatRate(value, decimals)
  const isUp = direction === "up"
  const isDown = direction === "down"
  const directionLabel = isUp
    ? `${label} increased`
    : isDown
      ? `${label} decreased`
      : `${label} unchanged`
  const Icon = isUp ? TrendingUp : isDown ? TrendingDown : Minus

  return (
    <span
      className={`exchange-rate-value exchange-rate-value--${direction}`}
      aria-label={`${directionLabel}: ${formatted}`}
    >
      <span key={`${formatted}-${direction}`} className="exchange-rate-value__number">
        {formatted}
      </span>
      {direction !== "new" && (
        <Icon className="exchange-rate-value__icon" aria-hidden="true" />
      )}
    </span>
  )
}

function normalizeRates(
  nextRates: ApiExchangeRate[],
  previousRates: ApiExchangeRate[],
): RateWithDirection[] {
  const previousByCode = new Map(previousRates.map((rate) => [rate.code, rate]))

  return nextRates.map((rate) => {
    const previous = previousByCode.get(rate.code)

    return {
      ...rate,
      buyDirection: directionFor(rate.buy, previous?.buy),
      sellDirection: directionFor(rate.sell, previous?.sell),
    }
  })
}

/** Renders a live exchange-rate preview widget backed by UCB public rates. */
export default function ExchangeRateWidget({
  compact = false,
}: ExchangeRateWidgetProps) {
  const [rates, setRates] = useState<RateWithDirection[]>(() =>
    normalizeRates(MOCK_EXCHANGE_RATES.rates, MOCK_PREVIOUS_EXCHANGE_RATES),
  )
  const [lastUpdated, setLastUpdated] = useState(MOCK_EXCHANGE_RATES.lastUpdated)
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const lastSuccessfulRatesRef = useRef<ApiExchangeRate[]>(
    MOCK_EXCHANGE_RATES.rates,
  )

  useEffect(() => {
    const controller = new AbortController()
    let mounted = true

    async function loadRates() {
      try {
        if (isGithubPagesHost()) {
          setHasError(false)
          setLoading(false)
          return
        }

        if (lastSuccessfulRatesRef.current.length === 0) setLoading(true)
        const response = await fetch(EXCHANGE_RATES_URL, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        })

        if (!response.ok) throw new Error("Unable to load exchange rates")

        const data = (await response.json()) as ExchangeRateResponse
        if (!Array.isArray(data.rates) || data.rates.length === 0) {
          throw new Error("Exchange rates are empty")
        }

        const normalizedRates = normalizeRates(
          data.rates,
          lastSuccessfulRatesRef.current,
        )

        if (!mounted) return
        lastSuccessfulRatesRef.current = data.rates
        setRates(normalizedRates)
        setLastUpdated(data.lastUpdated)
        setHasError(false)
      } catch {
        if (!mounted || controller.signal.aborted) return
        setHasError(true)
      } finally {
        if (mounted && !controller.signal.aborted) setLoading(false)
      }
    }

    loadRates()
    const intervalId = window.setInterval(loadRates, REFRESH_INTERVAL_MS)

    return () => {
      mounted = false
      controller.abort()
      window.clearInterval(intervalId)
    }
  }, [])

  const displayRates = compact ? rates.slice(0, 5) : rates
  const hasRates = displayRates.length > 0

  return (
    <section className="exchange-rate-card" aria-labelledby="exchange-rate-title">
      <header className="exchange-rate-card__header">
        <div className="exchange-rate-card__title-group">
          <span className="exchange-rate-card__symbol" aria-hidden="true">
            $
          </span>
          <h3 id="exchange-rate-title" className="exchange-rate-card__title">
            Exchange Rates
          </h3>
        </div>
        <a
          href={siteHref("/exchange-rates")}
          className="exchange-rate-card__link"
          aria-label="View all exchange rates"
        >
          View all <span aria-hidden="true">→</span>
        </a>
      </header>

      {hasRates ? (
        <div className="exchange-rate-card__table-wrap">
          <table className="exchange-rate-table">
            <thead>
              <tr>
                <th scope="col">Currency</th>
                <th scope="col">We Buy</th>
                <th scope="col">We Sell</th>
              </tr>
            </thead>
            <tbody>
              {displayRates.map((rate) => (
                <tr key={rate.code}>
                  <th scope="row">
                    <span className="exchange-rate-currency">
                      <img
                        className="exchange-rate-currency__flag"
                        src={rate.flag}
                        alt=""
                        aria-hidden="true"
                      />
                      <span>
                        <span className="exchange-rate-currency__code">
                          {rate.code}
                        </span>
                        <span className="exchange-rate-currency__name">
                          {rate.name}
                        </span>
                      </span>
                    </span>
                  </th>
                  <td>
                    <RateValue
                      value={rate.buy}
                      decimals={rate.decimals}
                      direction={rate.buyDirection}
                      label={`${rate.code} buy rate`}
                    />
                  </td>
                  <td>
                    <RateValue
                      value={rate.sell}
                      decimals={rate.decimals}
                      direction={rate.sellDirection}
                      label={`${rate.code} sell rate`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="exchange-rate-card__empty" role="status">
          {loading
            ? "Loading exchange rates..."
            : "Rates are temporarily unavailable"}
        </div>
      )}

      <footer className="exchange-rate-card__footer">
        {lastUpdated && (
          <p className="exchange-rate-card__meta">
            Last updated: {formatLastUpdated(lastUpdated)}
          </p>
        )}
        {hasError && hasRates && (
          <p className="exchange-rate-card__status" role="status">
            Showing last available rates.
          </p>
        )}
        <p className="exchange-rate-card__note">
          Rates are indicative and may change without prior notice. Final rates
          apply at the time of transaction.
        </p>
      </footer>
    </section>
  )
}
