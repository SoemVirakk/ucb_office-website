export const tickerCurrencies = ["USD", "THB", "EUR", "AUD", "CNY", "JPY"]

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`

export const exchangeRateTickerMock = [
  {
    currency: "USD",
    flagSrc: publicAsset("assets/images/flags/us.svg"),
    flagAlt: "United States flag",
    buy: 4043,
    sell: 4058,
    movement: "up",
  },
  {
    currency: "THB",
    flagSrc: publicAsset("assets/images/flags/th.svg"),
    flagAlt: "Thailand flag",
    buy: 118,
    sell: 121,
    movement: "same",
  },
  {
    currency: "EUR",
    flagSrc: publicAsset("assets/images/flags/eu.svg"),
    flagAlt: "European Union flag",
    buy: 4380,
    sell: 4432,
    movement: "down",
  },
  {
    currency: "AUD",
    flagSrc: publicAsset("assets/images/flags/au.svg"),
    flagAlt: "Australia flag",
    buy: 2630,
    sell: 2688,
    movement: "up",
  },
  {
    currency: "CNY",
    flagSrc: publicAsset("assets/images/flags/cn.svg"),
    flagAlt: "China flag",
    buy: 565,
    sell: 579,
    movement: "same",
  },
  {
    currency: "JPY",
    flagSrc: publicAsset("assets/images/flags/jp.svg"),
    flagAlt: "Japan flag",
    buy: 27,
    sell: 28,
    movement: "down",
  },
]
