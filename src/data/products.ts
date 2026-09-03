export interface Product {
  id: string
  category: "personal" | "business" | "loans" | "cards" | "digital"
  name: string
  tagline: string
  icon: string
  highlights: string[]
  rateOrFee?: string
  isNew?: boolean
  eligibility: string[]
  requiredDocs: string[]
  fees: { item: string amount: string }[]
  faqs: { q: string a: string }[]
}

export const products: Product[] = [
  {
    id: "savings-account",
    category: "personal",
    name: "UCB Savings Account",
    tagline: "Grow your savings with competitive interest rates",
    icon: "🏦",
    highlights: [
      "Up to 5.5% p.a. interest",
      "No minimum balance",
      "Free UCB debit card",
      "Instant mobile banking access",
    ],
    rateOrFee: "5.5% p.a.",
    eligibility: [
      "Cambodian nationals or foreigners with valid documents",
      "Minimum age 18 years",
      "Valid ID / passport",
    ],
    requiredDocs: [
      "National ID or Passport",
      "Proof of address (utility bill or letter)",
      "Recent passport photo",
    ],
    fees: [
      { item: "Account opening", amount: "Free" },
      { item: "Monthly maintenance", amount: "Free" },
      { item: "ATM withdrawal (UCB)", amount: "Free" },
    ],
    faqs: [
      {
        q: "What is the minimum deposit to open a savings account?",
        a: "There is no minimum balance requirement. You can open an account with any amount.",
      },
      {
        q: "How do I access my account?",
        a: "Via UCB Mobile App, Internet Banking, any UCB ATM, or branch counter.",
      },
      {
        q: "Is my deposit protected?",
        a: "Deposits are protected under the Cambodia Deposit Guarantee Corporation (CDGC) scheme up to KHR 30 million.",
      },
    ],
  },
  {
    id: "current-account",
    category: "personal",
    name: "UCB Current Account",
    tagline: "Flexible daily banking for individuals and families",
    icon: "💳",
    highlights: [
      "Unlimited transactions",
      "Cheque book facility",
      "Overdraft available",
      "Multi-currency support (USD & KHR)",
    ],
    rateOrFee: "No monthly fee",
    eligibility: [
      "Age 18+",
      "Valid Cambodian ID or passport",
      "Proof of address",
    ],
    requiredDocs: [
      "National ID or Passport",
      "Proof of address",
      "Initial deposit USD 100 or KHR 400,000",
    ],
    fees: [
      { item: "Account opening", amount: "Free" },
      { item: "Cheque book (25 leaves)", amount: "USD 5" },
      { item: "SWIFT transfer", amount: "USD 15 + 0.1%" },
    ],
    faqs: [
      {
        q: "Can I open in both USD and KHR?",
        a: "Yes. UCB current accounts support both USD and KHR currencies.",
      },
      {
        q: "How long does cheque clearing take?",
        a: "Local cheques clear within 2 business days.",
      },
    ],
  },
  {
    id: "time-deposit",
    category: "personal",
    name: "UCB Fixed Deposit",
    tagline: "Lock in high returns with guaranteed rates",
    icon: "📈",
    highlights: [
      "Up to 7.5% p.a. for 12-month term",
      "Terms: 1, 3, 6, 12, 24 months",
      "Automatic renewal option",
      "Interest paid monthly or at maturity",
    ],
    rateOrFee: "7.5% p.a.",
    eligibility: ["Any UCB account holder", "Minimum deposit USD 500"],
    requiredDocs: ["Existing UCB account", "National ID or Passport"],
    fees: [
      { item: "Early withdrawal penalty", amount: "50% of accrued interest" },
      { item: "Renewal fee", amount: "Free" },
    ],
    faqs: [
      {
        q: "What happens when my fixed deposit matures?",
        a: "It automatically renews at the prevailing interest rate unless you instruct otherwise.",
      },
      {
        q: "Can I use my fixed deposit as collateral for a loan?",
        a: "Yes. You can borrow up to 90% of the fixed deposit value.",
      },
    ],
  },
  {
    id: "business-current",
    category: "business",
    name: "UCB Business Current Account",
    tagline: "Streamline your business cash flow",
    icon: "🏢",
    highlights: [
      "Bulk payroll transfers",
      "Online cash management",
      "Multi-signatory facility",
      "Priority business support",
    ],
    rateOrFee: "From USD 10/month",
    eligibility: [
      "Registered business entity in Cambodia",
      "Valid MOC registration",
      "Minimum directors/shareholders documents",
    ],
    requiredDocs: [
      "MOC Registration Certificate",
      "Business license",
      "Directors' IDs",
      "Memorandum of Association",
      "Board resolution",
    ],
    fees: [
      { item: "Monthly account fee", amount: "USD 10" },
      { item: "Online banking", amount: "Free" },
      { item: "Payroll bulk transfer", amount: "USD 0.50 per transaction" },
    ],
    faqs: [
      {
        q: "Can I manage multiple accounts under one dashboard?",
        a: "Yes. UCB Business Internet Banking supports multi-account viewing and management.",
      },
    ],
  },
  {
    id: "sme-loan",
    category: "loans",
    name: "UCB SME Business Loan",
    tagline: "Fuel your business growth with flexible financing",
    icon: "🚀",
    highlights: [
      "Loan from USD 5,000 to USD 500,000",
      "Up to 7-year tenure",
      "Collateral or unsecured options",
      "Fast 5-day approval",
    ],
    rateOrFee: "From 9% p.a.",
    isNew: false,
    eligibility: [
      "Business operating for at least 1 year",
      "Annual turnover minimum USD 50,000",
      "Valid business registration",
    ],
    requiredDocs: [
      "Business registration",
      "2 years audited financial statements",
      "Bank statements (6 months)",
      "Collateral documents (if applicable)",
    ],
    fees: [
      { item: "Processing fee", amount: "1% of loan amount" },
      { item: "Early repayment", amount: "2% of outstanding balance" },
    ],
    faqs: [
      {
        q: "How long does approval take?",
        a: "Typically 5 business days after complete document submission.",
      },
      {
        q: "Can I get an unsecured loan?",
        a: "Yes, for amounts up to USD 30,000 with strong financials.",
      },
    ],
  },
  {
    id: "home-loan",
    category: "loans",
    name: "UCB Home Loan",
    tagline: "Make your dream home a reality",
    icon: "🏠",
    highlights: [
      "Finance up to 70% of property value",
      "Up to 20-year tenure",
      "Fixed and floating rate options",
      "Free property valuation",
    ],
    rateOrFee: "From 8.5% p.a.",
    eligibility: [
      "Cambodian nationals aged 21–60",
      "Minimum monthly income USD 800",
      "Property must be in Cambodia",
    ],
    requiredDocs: [
      "National ID",
      "Income proof (salary slip or tax return)",
      "Property ownership documents",
      "Land title or LMAP",
    ],
    fees: [
      { item: "Processing fee", amount: "0.5% of loan amount" },
      { item: "Valuation fee", amount: "Free (first time)" },
      { item: "Legal fee", amount: "USD 100–500" },
    ],
    faqs: [
      {
        q: "Can foreigners apply for a home loan?",
        a: "Foreigners with a valid long-stay visa and eligible property type may apply. Contact us for eligibility assessment.",
      },
    ],
  },
  {
    id: "car-loan",
    category: "loans",
    name: "UCB Auto Loan",
    tagline: "Drive away today with easy financing",
    icon: "🚗",
    highlights: [
      "Up to 80% financing",
      "12–60 month tenure",
      "New and used vehicles",
      "Same-day approval for qualifying customers",
    ],
    rateOrFee: "From 10% p.a.",
    eligibility: [
      "Age 21–60",
      "Minimum income USD 500/month",
      "Vehicle must be no older than 10 years",
    ],
    requiredDocs: [
      "National ID",
      "Proof of income",
      "Vehicle quotation or registration",
      "Insurance documents",
    ],
    fees: [
      { item: "Processing fee", amount: "USD 50" },
      { item: "Early repayment", amount: "3% of outstanding balance" },
    ],
    faqs: [
      {
        q: "Does the car need to be insured?",
        a: "Yes. Comprehensive insurance is required for the duration of the loan.",
      },
    ],
  },
  {
    id: "personal-loan",
    category: "loans",
    name: "UCB Personal Loan",
    tagline: "Quick cash for life's moments",
    icon: "💰",
    highlights: [
      "Up to USD 20,000",
      "No collateral required",
      "12–48 month tenure",
      "24-hour disbursement",
    ],
    rateOrFee: "From 12% p.a.",
    isNew: false,
    eligibility: [
      "Age 21–55",
      "Minimum income USD 400/month",
      "UCB account holder preferred",
    ],
    requiredDocs: [
      "National ID",
      "Salary slip (3 months)",
      "Employment letter",
    ],
    fees: [
      { item: "Processing fee", amount: "USD 25" },
      { item: "Late payment fee", amount: "5% of overdue amount" },
    ],
    faqs: [
      {
        q: "When is the loan disbursed?",
        a: "Within 24 hours of approval for existing UCB account holders.",
      },
    ],
  },
  {
    id: "credit-card",
    category: "cards",
    name: "UCB Platinum Credit Card",
    tagline: "Earn rewards on every purchase",
    icon: "💎",
    highlights: [
      "1.5% cashback on all purchases",
      "Up to USD 10,000 credit limit",
      "Free airport lounge access",
      "0% installment at 500+ merchants",
    ],
    rateOrFee: "Annual fee: USD 50",
    isNew: true,
    eligibility: [
      "Minimum income USD 800/month",
      "Good credit history",
      "UCB account holder",
    ],
    requiredDocs: [
      "National ID",
      "Salary slip (3 months)",
      "Bank statement (3 months)",
    ],
    fees: [
      { item: "Annual fee", amount: "USD 50 (waived first year)" },
      { item: "Cash advance fee", amount: "3% or USD 5 minimum" },
      { item: "Late payment fee", amount: "USD 10" },
    ],
    faqs: [
      {
        q: "How do I redeem rewards?",
        a: "Log in to UCB Mobile App and redeem points directly as cashback or vouchers.",
      },
      {
        q: "Is there a foreign transaction fee?",
        a: "Yes, 2% on foreign currency transactions.",
      },
    ],
  },
  {
    id: "debit-card",
    category: "cards",
    name: "UCB Visa Debit Card",
    tagline: "Spend anywhere, anytime with confidence",
    icon: "💳",
    highlights: [
      "Accepted at 50M+ merchants worldwide",
      "Contactless payments",
      "Instant spend notifications",
      "Free for UCB account holders",
    ],
    rateOrFee: "Free",
    eligibility: ["Any UCB savings or current account holder"],
    requiredDocs: ["Existing UCB account"],
    fees: [
      { item: "Card issuance", amount: "Free" },
      { item: "Annual renewal", amount: "Free" },
      { item: "International ATM", amount: "USD 2 per withdrawal" },
    ],
    faqs: [
      {
        q: "How do I activate my card?",
        a: "Activate via UCB Mobile App or at any UCB ATM using your PIN.",
      },
    ],
  },
  {
    id: "ucb-mobile",
    category: "digital",
    name: "UCB Mobile Banking",
    tagline: "Full banking in the palm of your hand",
    icon: "📱",
    highlights: [
      "Transfer, pay bills, top-up",
      "QR code payments",
      "Biometric login",
      "Transaction notifications",
    ],
    isNew: false,
    eligibility: ["All UCB account holders"],
    requiredDocs: ["UCB account number", "Registered mobile number"],
    fees: [
      { item: "App download", amount: "Free" },
      { item: "Internal transfers", amount: "Free" },
      { item: "External transfers", amount: "USD 0.25" },
    ],
    faqs: [
      {
        q: "Is the app available on both iOS and Android?",
        a: "Yes. Download from the App Store or Google Play Store.",
      },
      {
        q: "What if I forget my PIN?",
        a: "Reset via OTP to your registered number or visit any UCB branch.",
      },
    ],
  },
  {
    id: "internet-banking",
    category: "digital",
    name: "UCB Internet Banking",
    tagline: "Powerful banking from your browser",
    icon: "🌐",
    highlights: [
      "Multi-account management",
      "Bulk payment upload",
      "Statement download (PDF/Excel)",
      "Scheduled transfers",
    ],
    eligibility: ["UCB account holders with email address"],
    requiredDocs: ["UCB account", "Valid email", "OTP-enabled mobile number"],
    fees: [
      { item: "Registration", amount: "Free" },
      { item: "Monthly access", amount: "Free" },
    ],
    faqs: [
      {
        q: "How long is the session timeout?",
        a: "15 minutes of inactivity for security.",
      },
    ],
  },
  {
    id: "trade-finance",
    category: "business",
    name: "Trade Finance",
    tagline: "Support for import, export, and supply chain",
    icon: "🚢",
    highlights: [
      "Letters of Credit (LC)",
      "Bank guarantees",
      "Documentary collections",
      "Export finance",
    ],
    rateOrFee: "From 0.25% per quarter",
    eligibility: ["Registered business", "Minimum 1 year of trading history"],
    requiredDocs: [
      "Business registration",
      "Trade contracts",
      "Financial statements",
    ],
    fees: [{ item: "LC issuance", amount: "0.25% per quarter, min USD 100" }],
    faqs: [
      {
        q: "What currencies are supported?",
        a: "USD, EUR, KHR, SGD, CNY, THB, and more on request.",
      },
    ],
  },
  {
    id: "payroll",
    category: "business",
    name: "UCB Payroll Service",
    tagline: "Automated payroll for your entire workforce",
    icon: "👥",
    highlights: [
      "Bulk salary disbursement",
      "Integration with HR systems",
      "PDF payslip generation",
      "Dedicated relationship manager",
    ],
    rateOrFee: "USD 0.25 per employee",
    eligibility: ["Companies with 10+ employees", "UCB business account"],
    requiredDocs: [
      "Business agreement",
      "Employee list",
      "Authorization letter",
    ],
    fees: [
      { item: "Per-employee fee", amount: "USD 0.25 per disbursement" },
      { item: "Setup fee", amount: "Free" },
    ],
    faqs: [
      {
        q: "Can we upload payroll via Excel?",
        a: "Yes. UCB Business Banking supports CSV/Excel bulk upload.",
      },
    ],
  },
  {
    id: "remittance",
    category: "digital",
    name: "UCB International Remittance",
    tagline: "Send money across borders, fast and secure",
    icon: "✈️",
    highlights: [
      "150+ countries supported",
      "Same-day SWIFT transfers",
      "Competitive exchange rates",
      "Track transfer status live",
    ],
    rateOrFee: "From USD 5 per transfer",
    isNew: false,
    eligibility: ["UCB account holder", "Valid ID"],
    requiredDocs: ["National ID or Passport", "Beneficiary bank details"],
    fees: [
      { item: "SWIFT transfer fee", amount: "USD 15 + 0.1% (min USD 5)" },
      { item: "FX margin", amount: "0.5% over mid-rate" },
    ],
    faqs: [
      {
        q: "How long does an international transfer take?",
        a: "1–3 business days via SWIFT, same-day for priority transfers.",
      },
    ],
  },
  {
    id: "business-loan",
    category: "business",
    name: "UCB Corporate Loan",
    tagline: "Large-scale financing for established enterprises",
    icon: "🏗️",
    highlights: [
      "USD 500,000 and above",
      "Syndicated loan options",
      "Flexible draw-down schedules",
      "Dedicated corporate banking team",
    ],
    rateOrFee: "Negotiable from 7.5% p.a.",
    eligibility: [
      "Registered company 3+ years",
      "Annual revenue USD 1M+",
      "Audited financials required",
    ],
    requiredDocs: [
      "3 years audited accounts",
      "Business plan",
      "Property / collateral documents",
      "Director guarantees",
    ],
    fees: [
      { item: "Arrangement fee", amount: "0.5–1% of facility" },
      { item: "Commitment fee", amount: "0.25% p.a. on undrawn amount" },
    ],
    faqs: [
      {
        q: "Who do I contact for corporate banking?",
        a: "Call our Corporate Banking hotline at +855 23 999 001 or email corporate@ucb.com.kh.",
      },
    ],
  },
]
