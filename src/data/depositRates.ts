export interface DepositRate {
  product: string
  currency: "USD" | "KHR"
  terms: { term: string rate: number }[]
  minAmount: string
  notes?: string
}

export interface LoanRate {
  type: string
  icon: string
  rateFrom: number
  rateTo: number
  maxTerm: string
  maxAmount: string
  notes: string
}

export interface FeeItem {
  fee: string
  amount: string
}

export const depositRates: DepositRate[] = [
  {
    product: "Regular Savings Account",
    currency: "USD",
    terms: [{ term: "Per Annum (floating)", rate: 2.0 }],
    minAmount: "USD 1",
    notes: "Interest paid monthly. Free transfers to any UCB account.",
  },
  {
    product: "Regular Savings Account",
    currency: "KHR",
    terms: [{ term: "Per Annum (floating)", rate: 4.0 }],
    minAmount: "KHR 4,000",
  },
  {
    product: "Fixed Deposit",
    currency: "USD",
    terms: [
      { term: "1 month", rate: 3.5 },
      { term: "3 months", rate: 4.0 },
      { term: "6 months", rate: 4.75 },
      { term: "12 months", rate: 5.5 },
      { term: "24 months", rate: 6.0 },
      { term: "36 months", rate: 6.25 },
    ],
    minAmount: "USD 500",
    notes:
      "Early withdrawal subject to penalty. Interest paid at maturity or monthly (for tenors 6m+).",
  },
  {
    product: "Fixed Deposit",
    currency: "KHR",
    terms: [
      { term: "1 month", rate: 5.0 },
      { term: "3 months", rate: 6.0 },
      { term: "6 months", rate: 7.0 },
      { term: "12 months", rate: 7.5 },
      { term: "24 months", rate: 8.0 },
      { term: "36 months", rate: 8.5 },
    ],
    minAmount: "KHR 2,000,000",
  },
  {
    product: "UCB Premium Savings",
    currency: "USD",
    terms: [{ term: "Per Annum (tiered)", rate: 3.25 }],
    minAmount: "USD 5,000",
    notes:
      "Tiered rate: USD 5k–USD 50k at 3.25% p.a.; above USD 50k at 3.75% p.a.",
  },
  {
    product: "Kids Savings (UCB Junior)",
    currency: "USD",
    terms: [{ term: "Per Annum (floating)", rate: 2.5 }],
    minAmount: "USD 1",
    notes:
      "For customers under 18. No withdrawal fees. Free UCB Junior Debit Card.",
  },
]

export const loanRates: LoanRate[] = [
  {
    type: "Home Loan",
    icon: "🏠",
    rateFrom: 7.5,
    rateTo: 10.0,
    maxTerm: "25 years",
    maxAmount: "USD 500,000",
    notes:
      "Fixed rate available for first 3 years. Subject to property valuation and NBC LTV limits.",
  },
  {
    type: "Personal Loan",
    icon: "👤",
    rateFrom: 12.0,
    rateTo: 18.0,
    maxTerm: "5 years",
    maxAmount: "USD 20,000",
    notes:
      "No collateral required for amounts up to USD 5,000. Monthly repayment only.",
  },
  {
    type: "Auto Loan",
    icon: "🚗",
    rateFrom: 9.0,
    rateTo: 13.0,
    maxTerm: "7 years",
    maxAmount: "USD 80,000",
    notes: "Up to 80% financing of vehicle value. Vehicle used as collateral.",
  },
  {
    type: "SME Business Loan",
    icon: "🏢",
    rateFrom: 9.5,
    rateTo: 14.0,
    maxTerm: "10 years",
    maxAmount: "USD 500,000",
    notes:
      "Available for registered businesses with 1+ year of operations. Working capital and term loans available.",
  },
  {
    type: "Agricultural Loan",
    icon: "🌾",
    rateFrom: 7.0,
    rateTo: 10.5,
    maxTerm: "5 years",
    maxAmount: "USD 100,000",
    notes:
      "Seasonal repayment schedules available. Supported by NBC agricultural lending incentives.",
  },
  {
    type: "Education Loan",
    icon: "🎓",
    rateFrom: 8.0,
    rateTo: 11.0,
    maxTerm: "7 years",
    maxAmount: "USD 30,000",
    notes:
      "For accredited universities in Cambodia and abroad. Grace period during studies.",
  },
]

export const loanFees: FeeItem[] = [
  { fee: "Loan origination fee", amount: "0.5% – 1.5% of loan amount" },
  { fee: "Early repayment penalty", amount: "1% – 3% of outstanding balance" },
  {
    fee: "Property valuation fee",
    amount: "USD 100 – USD 500 (paid to valuer)",
  },
  { fee: "Legal documentation fee", amount: "USD 50 – USD 200" },
  { fee: "Late payment penalty", amount: "2% per month on overdue amount" },
  { fee: "Loan restructuring fee", amount: "USD 50 flat" },
]
