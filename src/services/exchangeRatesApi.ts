export type UsdKhrExchangeRate = {
  rate: number
  quote: string
}

export type PublicExchangeRate = {
  currency: string
  flag?: string
  buy: number
  sell: number
}

type ExchangeRateApiResponse = {
  rate?: number
  value?: number
  buy?: number
  sell?: number
  data?: {
    rate?: number
    value?: number
    buy?: number
    sell?: number
  }
}

type ExchangeRateListResponse =
  | PublicExchangeRate[]
  | {
      rates?: PublicExchangeRate[]
      data?: PublicExchangeRate[] | { rates?: PublicExchangeRate[] }
    }

function readRate(data: ExchangeRateApiResponse): number | null {
  const value =
    data.rate ??
    data.value ??
    data.sell ??
    data.buy ??
    data.data?.rate ??
    data.data?.value ??
    data.data?.sell ??
    data.data?.buy

  return typeof value === "number" && Number.isFinite(value) ? value : null
}

export async function getUsdKhrExchangeRate(
  signal?: AbortSignal,
): Promise<UsdKhrExchangeRate> {
  return getUsdQuoteExchangeRate("KHR", signal)
}

export async function getUsdQuoteExchangeRate(
  quote: string,
  signal?: AbortSignal,
): Promise<UsdKhrExchangeRate> {
  const response = await fetch(
    `/api/v1/public/exchange-rates?base=USD&quote=${encodeURIComponent(quote)}`,
    {
      signal,
      headers: { Accept: "application/json" },
    },
  )

  if (!response.ok) throw new Error(`Exchange-rate API failed: ${response.status}`)

  const data = (await response.json()) as ExchangeRateApiResponse
  const rate = readRate(data)
  if (rate === null) throw new Error("Exchange-rate API response missing rate")

  return { rate, quote }
}

function readRateList(data: ExchangeRateListResponse): PublicExchangeRate[] {
  if (Array.isArray(data)) return data
  if (Array.isArray(data.rates)) return data.rates
  if (Array.isArray(data.data)) return data.data
  if (data.data && Array.isArray(data.data.rates)) return data.data.rates
  return []
}

export async function getPublicExchangeRates(
  signal?: AbortSignal,
): Promise<PublicExchangeRate[]> {
  const response = await fetch("/api/v1/public/exchange-rates", {
    signal,
    headers: { Accept: "application/json" },
  })

  if (!response.ok) throw new Error(`Exchange-rate API failed: ${response.status}`)

  const data = (await response.json()) as ExchangeRateListResponse
  return readRateList(data).filter(
    (rate) =>
      typeof rate.currency === "string" &&
      typeof rate.buy === "number" &&
      typeof rate.sell === "number" &&
      Number.isFinite(rate.buy) &&
      Number.isFinite(rate.sell),
  )
}
