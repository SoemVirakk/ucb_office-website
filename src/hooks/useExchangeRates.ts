import { useEffect, useState } from "react"
import {
  exchangeRates as mockExchangeRates,
  type ExchangeRate,
  type ExchangeRates,
} from "../data/exchangeRates"

type ExchangeRateApiResponse = {
  result: string
  base_code: string
  time_last_update_utc: string
  conversion_rates: Record<string, number>
}

type ExchangeRateSource = "live" | "mock"

const LIVE_RATE_URL = "https://open.er-api.com/v6/latest/USD"
const SUPPORTED_CURRENCIES = ["KHR", "EUR", "THB", "CNY", "SGD", "GBP", "JPY"]
const BANK_SPREAD = 0.0045

const currencyMeta: Record<string, Pick<ExchangeRate, "flag" | "name">> = {
  KHR: { flag: "🇰🇭", name: "Cambodian Riel" },
  EUR: { flag: "🇪🇺", name: "Euro" },
  THB: { flag: "🇹🇭", name: "Thai Baht" },
  CNY: { flag: "🇨🇳", name: "Chinese Yuan" },
  SGD: { flag: "🇸🇬", name: "Singapore Dollar" },
  GBP: { flag: "🇬🇧", name: "British Pound" },
  JPY: { flag: "🇯🇵", name: "Japanese Yen" },
}

function buildBankRates(data: ExchangeRateApiResponse): ExchangeRates {
  return {
    base: data.base_code || "USD",
    lastUpdated: data.time_last_update_utc || new Date().toISOString(),
    rates: SUPPORTED_CURRENCIES.flatMap((currency) => {
      const midRate = data.conversion_rates[currency]
      const meta = currencyMeta[currency]
      if (!midRate || !meta) return []

      return {
        currency,
        flag: meta.flag,
        name: meta.name,
        buy: Number((midRate * (1 - BANK_SPREAD)).toFixed(currency === "KHR" ? 0 : 4)),
        sell: Number((midRate * (1 + BANK_SPREAD)).toFixed(currency === "KHR" ? 0 : 4)),
      }
    }),
  }
}

export function useExchangeRates() {
  const [rates, setRates] = useState<ExchangeRates>(mockExchangeRates)
  const [source, setSource] = useState<ExchangeRateSource>("mock")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadRates() {
      try {
        setLoading(true)
        const response = await fetch(LIVE_RATE_URL, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const data = (await response.json()) as ExchangeRateApiResponse
        if (data.result !== "success" || !data.conversion_rates) {
          throw new Error("Invalid exchange-rate response")
        }

        setRates(buildBankRates(data))
        setSource("live")
        setError(null)
      } catch (err) {
        if (controller.signal.aborted) return
        setRates(mockExchangeRates)
        setSource("mock")
        setError(err instanceof Error ? err.message : "Unable to load live rates")
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadRates()
    return () => controller.abort()
  }, [])

  return { rates, source, loading, error }
}
