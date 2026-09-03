import { useState, useMemo } from "react"
import { exchangeRates } from "../data/exchangeRates"
import { depositRates, loanRates, loanFees } from "../data/depositRates"

type Tab = "exchange" | "deposit" | "loan" | "calculators"
type CalcMode = "loan" | "deposit"

function calcEMI(
  principal: number,
  annualRate: number,
  months: number,
): number {
  if (annualRate === 0) return principal / months
  const r = annualRate / 100 / 12
  return (
    (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
  )
}

function calcDepositMaturity(
  principal: number,
  annualRate: number,
  months: number,
): number {
  const r = annualRate / 100 / 12
  return principal * Math.pow(1 + r, months)
}

function fmt(n: number, decimals = 2): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export default function RatesPage() {
  const [tab, setTab] = useState<Tab>("exchange")
  const [calcMode, setCalcMode] = useState<CalcMode>("loan")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("KHR")
  const [convertAmount, setConvertAmount] = useState("1000")

  // Loan calculator state
  const [loanAmount, setLoanAmount] = useState("50000")
  const [loanRate, setLoanRate] = useState("9.5")
  const [loanTerm, setLoanTerm] = useState("120")

  // Deposit calculator state
  const [depPrincipal, setDepPrincipal] = useState("10000")
  const [depRate, setDepRate] = useState("5.5")
  const [depTerm, setDepTerm] = useState("12")

  const loanEMI = useMemo(
    () => calcEMI(Number(loanAmount), Number(loanRate), Number(loanTerm)),
    [loanAmount, loanRate, loanTerm],
  )
  const loanTotal = useMemo(
    () => loanEMI * Number(loanTerm),
    [loanEMI, loanTerm],
  )
  const loanInterest = useMemo(
    () => loanTotal - Number(loanAmount),
    [loanTotal, loanAmount],
  )

  const depMaturity = useMemo(
    () =>
      calcDepositMaturity(
        Number(depPrincipal),
        Number(depRate),
        Number(depTerm),
      ),
    [depPrincipal, depRate, depTerm],
  )
  const depInterest = useMemo(
    () => depMaturity - Number(depPrincipal),
    [depMaturity, depPrincipal],
  )

  const tabs: { id: Tab label: string }[] = [
    { id: "exchange", label: "Exchange Rates" },
    { id: "deposit", label: "Deposit Rates" },
    { id: "loan", label: "Loan Rates" },
    { id: "calculators", label: "Calculators" },
  ]

  const allCurrencies = [
    "USD",
    "KHR",
    ...exchangeRates.rates.map((r) => r.currency),
  ]
  const khrPerUsd =
    exchangeRates.rates.find((r) => r.currency === "KHR")?.sell ?? 4100

  function getUsdRate(currency: string): number {
    if (currency === "USD") return 1
    if (currency === "KHR") return 1 / khrPerUsd
    return (
      1 / (exchangeRates.rates.find((r) => r.currency === currency)?.sell ?? 1)
    )
  }

  const converted = useMemo(() => {
    const amount = Number(convertAmount) || 0
    const fromUsd = amount * getUsdRate(fromCurrency)
    const toAmount = fromUsd / getUsdRate(toCurrency)
    return toAmount
  }, [convertAmount, fromCurrency, toCurrency])

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
          padding: "4rem 0 3rem",
        }}
      >
        <div className="container">
          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#fff",
              marginBottom: "0.75rem",
            }}
          >
            Rates & Calculators
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>
            Up-to-date exchange rates, deposit and loan rates, and financial
            calculators to help you plan with confidence.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #E5E7EB",
          position: "sticky",
          top: 68,
          zIndex: 10,
        }}
      >
        <div className="container">
          <div style={{ display: "flex", overflowX: "auto" }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  padding: "1.125rem 1.5rem",
                  fontSize: 14,
                  fontWeight: tab === t.id ? 700 : 500,
                  color: tab === t.id ? "#009C9F" : "#6B7280",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  borderBottom:
                    tab === t.id
                      ? "3px solid #009C9F"
                      : "3px solid transparent",
                  whiteSpace: "nowrap",
                  transition: "all 150ms",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "2.5rem 1.5rem" }}>
        {/* Exchange Rates */}
        {tab === "exchange" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: 4,
                  }}
                >
                  Foreign Exchange Rates
                </h2>
                <div style={{ fontSize: 13, color: "#6B7280" }}>
                  Base currency: <strong>USD</strong> · Last updated:{" "}
                  {exchangeRates.lastUpdated}
                </div>
              </div>
            </div>

            {/* Currency converter */}
            <div
              className="card"
              style={{
                padding: "1.75rem",
                marginBottom: "2rem",
                background: "linear-gradient(135deg, #E6F7F7, #F0FAFA)",
              }}
            >
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: "1.25rem",
                }}
              >
                Currency Converter
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#6B7280",
                      marginBottom: 6,
                    }}
                  >
                    AMOUNT
                  </label>
                  <input
                    type="number"
                    value={convertAmount}
                    onChange={(e) => setConvertAmount(e.target.value)}
                    style={{
                      padding: "0.75rem 1rem",
                      border: "1.5px solid #D1D5DB",
                      borderRadius: 8,
                      fontSize: 15,
                      width: 140,
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#009C9F")}
                    onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#6B7280",
                      marginBottom: 6,
                    }}
                  >
                    FROM
                  </label>
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    style={{
                      padding: "0.75rem 1rem",
                      border: "1.5px solid #D1D5DB",
                      borderRadius: 8,
                      fontSize: 15,
                      background: "#fff",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    {allCurrencies.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  style={{ fontSize: 22, color: "#009C9F", paddingBottom: 8 }}
                >
                  ⇄
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#6B7280",
                      marginBottom: 6,
                    }}
                  >
                    TO
                  </label>
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    style={{
                      padding: "0.75rem 1rem",
                      border: "1.5px solid #D1D5DB",
                      borderRadius: 8,
                      fontSize: 15,
                      background: "#fff",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    {allCurrencies.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ paddingBottom: 8 }}>
                  <div
                    style={{ fontSize: 13, color: "#6B7280", marginBottom: 4 }}
                  >
                    RESULT
                  </div>
                  <div
                    style={{ fontSize: 22, fontWeight: 800, color: "#0A2540" }}
                  >
                    {fmt(converted, toCurrency === "KHR" ? 0 : 4)} {toCurrency}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: "1rem" }}>
                ⚠️ Indicative rate only — based on UCB sell rate. Actual
                conversion rates may vary. Contact UCB for large transactions.
              </p>
            </div>

            {/* Rate table */}
            <div
              className="card"
              style={{ overflow: "hidden", marginBottom: "1rem" }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#0A2540" }}>
                    {[
                      "Currency",
                      "Flag",
                      "Buy (KHR)",
                      "Sell (KHR)",
                      "Buy (USD)",
                      "Sell (USD)",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#94A3B8",
                          letterSpacing: 0.5,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {exchangeRates.rates.map((rate, i) => (
                    <tr
                      key={rate.currency}
                      style={{
                        borderBottom: "1px solid #F4F6F8",
                        background: i % 2 === 0 ? "#fff" : "#FAFAFA",
                      }}
                    >
                      <td
                        style={{
                          padding: "0.875rem 1rem",
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#0A2540",
                        }}
                      >
                        {rate.currency}
                      </td>
                      <td style={{ padding: "0.875rem 1rem", fontSize: 20 }}>
                        {rate.flag}
                      </td>
                      <td
                        style={{
                          padding: "0.875rem 1rem",
                          fontSize: 14,
                          color: "#374151",
                        }}
                      >
                        {fmt(rate.buy * khrPerUsd, 0)}
                      </td>
                      <td
                        style={{
                          padding: "0.875rem 1rem",
                          fontSize: 14,
                          color: "#374151",
                        }}
                      >
                        {fmt(rate.sell * khrPerUsd, 0)}
                      </td>
                      <td
                        style={{
                          padding: "0.875rem 1rem",
                          fontSize: 14,
                          color: "#374151",
                        }}
                      >
                        {fmt(rate.buy, 4)}
                      </td>
                      <td
                        style={{
                          padding: "0.875rem 1rem",
                          fontSize: 14,
                          color: "#374151",
                        }}
                      >
                        {fmt(rate.sell, 4)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12, color: "#9CA3AF" }}>
              Rates are indicative and subject to change without notice. UCB
              reserves the right to quote different rates for large
              transactions. For foreign currency purchases, please visit your
              nearest UCB branch.
            </p>
          </div>
        )}

        {/* Deposit Rates */}
        {tab === "deposit" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: 4,
                }}
              >
                Deposit Interest Rates
              </h2>
              <p style={{ fontSize: 14, color: "#6B7280" }}>
                Rates effective 1 September 2026. Subject to change — confirm
                with branch before opening.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {depositRates.map((dr, i) => (
                <div key={i} className="card" style={{ overflow: "hidden" }}>
                  <div
                    style={{
                      background: "#F4F6F8",
                      padding: "1rem 1.5rem",
                      borderBottom: "1px solid #E5E7EB",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: "#0A2540",
                        }}
                      >
                        {dr.product}
                      </div>
                      <div
                        style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}
                      >
                        Currency: {dr.currency} · Minimum: {dr.minAmount}
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "4px 12px",
                        background:
                          dr.currency === "USD" ? "#E6F7F7" : "#FDF6E3",
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 700,
                        color: dr.currency === "USD" ? "#007B7E" : "#92400E",
                      }}
                    >
                      {dr.currency}
                    </div>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#FAFAFA" }}>
                        <th
                          style={{
                            padding: "0.75rem 1.5rem",
                            textAlign: "left",
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#6B7280",
                            letterSpacing: 0.3,
                          }}
                        >
                          TERM
                        </th>
                        <th
                          style={{
                            padding: "0.75rem 1.5rem",
                            textAlign: "right",
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#6B7280",
                            letterSpacing: 0.3,
                          }}
                        >
                          INTEREST RATE (P.A.)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dr.terms.map((t, j) => (
                        <tr key={j} style={{ borderTop: "1px solid #F4F6F8" }}>
                          <td
                            style={{
                              padding: "0.875rem 1.5rem",
                              fontSize: 14,
                              color: "#374151",
                            }}
                          >
                            {t.term}
                          </td>
                          <td
                            style={{
                              padding: "0.875rem 1.5rem",
                              textAlign: "right",
                              fontSize: 16,
                              fontWeight: 700,
                              color: "#009C9F",
                            }}
                          >
                            {t.rate.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {dr.notes && (
                    <div
                      style={{
                        padding: "0.75rem 1.5rem",
                        background: "#FAFAFA",
                        fontSize: 12,
                        color: "#9CA3AF",
                        borderTop: "1px solid #F4F6F8",
                      }}
                    >
                      ℹ️ {dr.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: "1.5rem" }}>
              All rates are per annum. Rates are subject to change at UCB's
              discretion in line with NBC guidelines. Interest is subject to
              withholding tax as per Cambodian tax law.
            </p>
          </div>
        )}

        {/* Loan Rates */}
        {tab === "loan" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: 4,
                }}
              >
                Loan Interest Rates
              </h2>
              <p style={{ fontSize: 14, color: "#6B7280" }}>
                Indicative rates effective 1 September 2026. Final rate subject
                to credit assessment.
              </p>
            </div>
            <div
              className="grid-2"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.25rem",
                marginBottom: "2rem",
              }}
            >
              {loanRates.map((lr, i) => (
                <div key={i} className="card" style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: "#E6F7F7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                        flexShrink: 0,
                      }}
                    >
                      {lr.icon}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: "#0A2540",
                          marginBottom: 6,
                        }}
                      >
                        {lr.type}
                      </h3>
                      <div
                        style={{
                          fontSize: 22,
                          fontWeight: 800,
                          color: "#009C9F",
                        }}
                      >
                        {lr.rateFrom}% – {lr.rateTo}%
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 400,
                            color: "#6B7280",
                          }}
                        >
                          {" "}
                          p.a.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", fontSize: 13 }}>
                    <div
                      style={{
                        flex: 1,
                        padding: "0.625rem",
                        background: "#F4F6F8",
                        borderRadius: 8,
                      }}
                    >
                      <div style={{ color: "#9CA3AF", marginBottom: 2 }}>
                        Max Term
                      </div>
                      <div style={{ fontWeight: 600, color: "#0A2540" }}>
                        {lr.maxTerm}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        padding: "0.625rem",
                        background: "#F4F6F8",
                        borderRadius: 8,
                      }}
                    >
                      <div style={{ color: "#9CA3AF", marginBottom: 2 }}>
                        Max Amount
                      </div>
                      <div style={{ fontWeight: 600, color: "#0A2540" }}>
                        {lr.maxAmount}
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#9CA3AF",
                      marginTop: "0.875rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {lr.notes}
                  </p>
                </div>
              ))}
            </div>

            <div className="card" style={{ overflow: "hidden" }}>
              <div
                style={{
                  background: "#F4F6F8",
                  padding: "1rem 1.5rem",
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0A2540" }}>
                  Standard Loan Fees
                </h3>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {loanFees.map((fee, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid #F4F6F8",
                        background: i % 2 === 0 ? "#fff" : "#FAFAFA",
                      }}
                    >
                      <td
                        style={{
                          padding: "0.875rem 1.5rem",
                          fontSize: 14,
                          color: "#374151",
                        }}
                      >
                        {fee.fee}
                      </td>
                      <td
                        style={{
                          padding: "0.875rem 1.5rem",
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#0A2540",
                          textAlign: "right",
                        }}
                      >
                        {fee.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: "1rem" }}>
              Fees may vary based on loan type, amount, and duration. All
              amounts are indicative. Final fees confirmed upon loan approval
              letter.
            </p>
          </div>
        )}

        {/* Calculators */}
        {tab === "calculators" && (
          <div style={{ maxWidth: 700 }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#0A2540",
                  marginBottom: 4,
                }}
              >
                Financial Calculators
              </h2>
              <p style={{ fontSize: 14, color: "#6B7280" }}>
                Get a quick estimate to help with your financial planning.
              </p>
            </div>

            {/* Mode toggle */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "2rem",
                background: "#F4F6F8",
                padding: 4,
                borderRadius: 10,
                width: "fit-content",
              }}
            >
              {(["loan", "deposit"] as CalcMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setCalcMode(m)}
                  style={{
                    padding: "0.625rem 1.5rem",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    background: calcMode === m ? "#009C9F" : "transparent",
                    color: calcMode === m ? "#fff" : "#6B7280",
                    transition: "all 150ms",
                  }}
                >
                  {m === "loan"
                    ? "🏦 Loan Calculator"
                    : "💰 Deposit Calculator"}
                </button>
              ))}
            </div>

            {calcMode === "loan" && (
              <div>
                <div
                  className="card"
                  style={{ padding: "2rem", marginBottom: "1.5rem" }}
                >
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#0A2540",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Loan Repayment Estimator
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.25rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#374151",
                          marginBottom: 6,
                        }}
                      >
                        Loan Amount (USD):{" "}
                        <strong>${Number(loanAmount).toLocaleString()}</strong>
                      </label>
                      <input
                        type="range"
                        min="1000"
                        max="500000"
                        step="1000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        style={{ width: "100%", accentColor: "#009C9F" }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 12,
                          color: "#9CA3AF",
                        }}
                      >
                        <span>$1,000</span>
                        <span>$500,000</span>
                      </div>
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#374151",
                          marginBottom: 6,
                        }}
                      >
                        Annual Interest Rate: <strong>{loanRate}%</strong>
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="20"
                        step="0.5"
                        value={loanRate}
                        onChange={(e) => setLoanRate(e.target.value)}
                        style={{ width: "100%", accentColor: "#009C9F" }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 12,
                          color: "#9CA3AF",
                        }}
                      >
                        <span>5%</span>
                        <span>20%</span>
                      </div>
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#374151",
                          marginBottom: 6,
                        }}
                      >
                        Loan Term:{" "}
                        <strong>
                          {Math.floor(Number(loanTerm) / 12)} years ({loanTerm}{" "}
                          months)
                        </strong>
                      </label>
                      <input
                        type="range"
                        min="12"
                        max="300"
                        step="12"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        style={{ width: "100%", accentColor: "#009C9F" }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 12,
                          color: "#9CA3AF",
                        }}
                      >
                        <span>1 year</span>
                        <span>25 years</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    background: "linear-gradient(135deg, #0A2540, #1A3D5C)",
                    borderRadius: 16,
                    padding: "2rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      color: "#94A3B8",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Estimated Monthly Repayment
                  </div>
                  <div
                    style={{
                      fontSize: 44,
                      fontWeight: 800,
                      color: "#fff",
                      marginBottom: "1.5rem",
                    }}
                  >
                    USD {fmt(loanEMI)}
                  </div>
                  <div
                    className="grid-3"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "1rem",
                    }}
                  >
                    {[
                      {
                        label: "Principal",
                        value: `USD ${fmt(Number(loanAmount))}`,
                      },
                      {
                        label: "Total Interest",
                        value: `USD ${fmt(loanInterest)}`,
                      },
                      {
                        label: "Total Repayment",
                        value: `USD ${fmt(loanTotal)}`,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        style={{
                          padding: "0.875rem",
                          background: "rgba(255,255,255,0.08)",
                          borderRadius: 10,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 12,
                            color: "#94A3B8",
                            marginBottom: 4,
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          style={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: "#fff",
                          }}
                        >
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#64748B",
                      marginTop: "1.25rem",
                    }}
                  >
                    ⚠️ This is an estimate only. Actual repayments depend on the
                    final approved rate, fees, and terms. Please speak to a UCB
                    advisor for a personalised quote.
                  </p>
                </div>
              </div>
            )}

            {calcMode === "deposit" && (
              <div>
                <div
                  className="card"
                  style={{ padding: "2rem", marginBottom: "1.5rem" }}
                >
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#0A2540",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Fixed Deposit Earnings Estimator
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.25rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#374151",
                          marginBottom: 6,
                        }}
                      >
                        Initial Deposit (USD):{" "}
                        <strong>
                          ${Number(depPrincipal).toLocaleString()}
                        </strong>
                      </label>
                      <input
                        type="range"
                        min="500"
                        max="100000"
                        step="500"
                        value={depPrincipal}
                        onChange={(e) => setDepPrincipal(e.target.value)}
                        style={{ width: "100%", accentColor: "#009C9F" }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 12,
                          color: "#9CA3AF",
                        }}
                      >
                        <span>$500</span>
                        <span>$100,000</span>
                      </div>
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#374151",
                          marginBottom: 6,
                        }}
                      >
                        Annual Interest Rate: <strong>{depRate}%</strong>
                      </label>
                      <input
                        type="range"
                        min="2"
                        max="8.5"
                        step="0.25"
                        value={depRate}
                        onChange={(e) => setDepRate(e.target.value)}
                        style={{ width: "100%", accentColor: "#009C9F" }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 12,
                          color: "#9CA3AF",
                        }}
                      >
                        <span>2%</span>
                        <span>8.5%</span>
                      </div>
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#374151",
                          marginBottom: 6,
                        }}
                      >
                        Term:{" "}
                        <strong>
                          {depTerm} months (
                          {Math.floor(Number(depTerm) / 12) > 0
                            ? `${Math.floor(Number(depTerm) / 12)} yr${
                                Number(depTerm) >= 24 ? "s" : ""
                              } `
                            : ""}
                          {Number(depTerm) % 12 > 0
                            ? `${Number(depTerm) % 12} mo`
                            : ""}
                          )
                        </strong>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="36"
                        step="1"
                        value={depTerm}
                        onChange={(e) => setDepTerm(e.target.value)}
                        style={{ width: "100%", accentColor: "#009C9F" }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 12,
                          color: "#9CA3AF",
                        }}
                      >
                        <span>1 month</span>
                        <span>36 months</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    background: "linear-gradient(135deg, #007B7E, #009C9F)",
                    borderRadius: 16,
                    padding: "2rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.7)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Estimated Maturity Value
                  </div>
                  <div
                    style={{
                      fontSize: 44,
                      fontWeight: 800,
                      color: "#fff",
                      marginBottom: "1.5rem",
                    }}
                  >
                    USD {fmt(depMaturity)}
                  </div>
                  <div
                    className="grid-3"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "1rem",
                    }}
                  >
                    {[
                      {
                        label: "Principal",
                        value: `USD ${fmt(Number(depPrincipal))}`,
                      },
                      {
                        label: "Interest Earned",
                        value: `USD ${fmt(depInterest)}`,
                      },
                      {
                        label: "Return",
                        value: `${fmt((depInterest / Number(depPrincipal)) * 100)}%`,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        style={{
                          padding: "0.875rem",
                          background: "rgba(255,255,255,0.15)",
                          borderRadius: 10,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 12,
                            color: "rgba(255,255,255,0.7)",
                            marginBottom: 4,
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          style={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: "#fff",
                          }}
                        >
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.5)",
                      marginTop: "1.25rem",
                    }}
                  >
                    ⚠️ Estimated figures only. Interest is subject to withholding
                    tax. Actual returns depend on the rate confirmed at account
                    opening. Rates may change before your deposit is placed.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
