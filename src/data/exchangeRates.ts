export interface ExchangeRate {
  currency: string
  flag: string
  name: string
  buy: number
  sell: number
}

export interface ExchangeRates {
  lastUpdated: string
  base: string
  rates: ExchangeRate[]
}

export const exchangeRates: ExchangeRates = {
  lastUpdated: "2026-09-02T08:00:00+07:00",
  base: "USD",
  rates: [
    {
      currency: "KHR",
      flag: "🇰🇭",
      name: "Cambodian Riel",
      buy: 4080,
      sell: 4100,
    },
    { currency: "EUR", flag: "🇪🇺", name: "Euro", buy: 1.085, sell: 1.095 },
    { currency: "THB", flag: "🇹🇭", name: "Thai Baht", buy: 34.2, sell: 34.8 },
    { currency: "CNY", flag: "🇨🇳", name: "Chinese Yuan", buy: 7.1, sell: 7.18 },
    {
      currency: "SGD",
      flag: "🇸🇬",
      name: "Singapore Dollar",
      buy: 1.32,
      sell: 1.36,
    },
    {
      currency: "GBP",
      flag: "🇬🇧",
      name: "British Pound",
      buy: 0.782,
      sell: 0.795,
    },
    {
      currency: "JPY",
      flag: "🇯🇵",
      name: "Japanese Yen",
      buy: 148.2,
      sell: 149.8,
    },
  ],
}
