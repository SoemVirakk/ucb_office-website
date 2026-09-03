import { exchangeRates } from "../../data/exchangeRates"

interface ExchangeRateWidgetProps {
  compact?: boolean
}

export default function ExchangeRateWidget({
  compact = false,
}: ExchangeRateWidgetProps) {
  const lastUpdated = new Date(exchangeRates.lastUpdated).toLocaleString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    },
  )

  const displayRates = compact
    ? exchangeRates.rates.slice(0, 5)
    : exchangeRates.rates

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.25rem",
          borderBottom: "1px solid #F4F6F8",
          background: "#0A2540",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>💱</span>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>
            Exchange Rates
          </span>
        </div>
        <span
          style={{
            fontSize: 11,
            color: "#64748B",
            background: "#1A3D5C",
            padding: "3px 8px",
            borderRadius: 4,
          }}
        >
          vs USD
        </span>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#F4F6F8" }}>
            <th
              style={{
                padding: "0.625rem 1.25rem",
                textAlign: "left",
                fontSize: 11,
                color: "#6B7280",
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              CURRENCY
            </th>
            <th
              style={{
                padding: "0.625rem 0.75rem",
                textAlign: "right",
                fontSize: 11,
                color: "#6B7280",
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              WE BUY
            </th>
            <th
              style={{
                padding: "0.625rem 1.25rem",
                textAlign: "right",
                fontSize: 11,
                color: "#6B7280",
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              WE SELL
            </th>
          </tr>
        </thead>
        <tbody>
          {displayRates.map((rate, i) => (
            <tr
              key={rate.currency}
              style={{ borderTop: i > 0 ? "1px solid #F4F6F8" : undefined }}
            >
              <td style={{ padding: "0.75rem 1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{rate.flag}</span>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#0A2540",
                      }}
                    >
                      {rate.currency}
                    </div>
                    {!compact && (
                      <div style={{ fontSize: 11, color: "#9CA3AF" }}>
                        {rate.name}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td
                style={{
                  padding: "0.75rem 0.75rem",
                  textAlign: "right",
                  fontWeight: 500,
                  fontSize: 13,
                  color: "#374151",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {rate.currency === "KHR"
                  ? rate.buy.toLocaleString()
                  : rate.buy.toFixed(3)}
              </td>
              <td
                style={{
                  padding: "0.75rem 1.25rem",
                  textAlign: "right",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#009C9F",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {rate.currency === "KHR"
                  ? rate.sell.toLocaleString()
                  : rate.sell.toFixed(3)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          padding: "0.75rem 1.25rem",
          borderTop: "1px solid #F4F6F8",
          background: "#FAFAFA",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 11 }}>🕐</span>
        <span style={{ fontSize: 11, color: "#9CA3AF" }}>
          Last updated: {lastUpdated}
        </span>
      </div>
    </div>
  )
}
