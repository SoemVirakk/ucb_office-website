export interface Promotion {
  id: string
  title: string
  summary: string
  description: string
  image: string
  badge?: string
  badgeColor?: "teal" | "gold" | "red" | "blue"
  expiresAt: string
  category: "retail" | "digital" | "loan" | "card" | "deposit"
  featured?: boolean
  status: "active" | "upcoming" | "ended"
}

export const promotions: Promotion[] = [
  {
    id: "zero-fee-transfer",
    title: "Zero Transfer Fees — All of September",
    summary:
      "Send money to any UCB account or other banks with zero fees throughout September 2026.",
    description:
      "Celebrate Cambodia's Independence Month with UCB. From September 1–30, 2026, all domestic transfers via UCB Mobile App or Internet Banking are completely free. Transfer to any bank in Cambodia at no cost — available 24/7.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop&auto=format",
    badge: "Limited Time",
    badgeColor: "teal",
    expiresAt: "2026-09-30",
    category: "digital",
    featured: true,
    status: "active",
  },
  {
    id: "credit-cashback",
    title: "5% Cashback on Dining & Online Shopping",
    summary:
      "Earn 5% cashback when you pay with your UCB Platinum credit card at restaurants and e-commerce platforms.",
    description:
      "From August 1 to October 31, 2026, earn 5% cashback (up to USD 50/month) on all dining and online shopping using your UCB Platinum Credit Card. Cashback is automatically credited to your card account at month-end.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=450&fit=crop&auto=format",
    badge: "Cashback",
    badgeColor: "gold",
    expiresAt: "2026-10-31",
    category: "card",
    status: "active",
  },
  {
    id: "home-loan-rate",
    title: "Special Home Loan Rate: 7.99% p.a.",
    summary:
      "Apply for a UCB Home Loan before October 31 and lock in our lowest rate of 7.99% p.a. for the first 3 years.",
    description:
      "UCB is offering an exclusive fixed rate of 7.99% p.a. for the first 36 months on all new home loans approved by October 31, 2026. Free property valuation included. Finance up to 70% of property value over 20 years.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop&auto=format",
    badge: "Special Rate",
    badgeColor: "teal",
    expiresAt: "2026-10-31",
    category: "loan",
    status: "active",
  },
  {
    id: "deposit-bonus",
    title: "Fixed Deposit Bonus Rate — Up to 7.5% p.a.",
    summary:
      "Deposit USD 5,000+ for 12 months and earn our bonus rate of 7.5% p.a., exclusive to new time deposit accounts.",
    description:
      "New UCB Fixed Deposit accounts opened between September 1–30, 2026, with a minimum of USD 5,000 and 12-month tenure qualify for our bonus rate of 7.5% p.a. Existing accounts earning lower rates can also switch — terms apply.",
    image:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&h=450&fit=crop&auto=format",
    badge: "New",
    badgeColor: "blue",
    expiresAt: "2026-09-30",
    category: "deposit",
    status: "active",
  },
  {
    id: "digital-onboarding",
    title: "Open Your Account in 10 Minutes — 100% Digital",
    summary:
      "Apply for a UCB Savings Account online via the UCB Mobile App. No branch visit required.",
    description:
      "UCB now offers fully digital account opening for individuals. Download the UCB Mobile App, complete the eKYC process with your National ID, and your account is ready within 10 minutes. Available 24/7 with immediate access to digital banking.",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=450&fit=crop&auto=format",
    badge: "Digital",
    badgeColor: "teal",
    expiresAt: "2026-12-31",
    category: "digital",
    status: "active",
  },
  {
    id: "sme-package",
    title: "UCB SME Starter Package — Zero Account Fees for 1 Year",
    summary:
      "Register your business with UCB and get zero account fees, free payroll for up to 20 employees, and a dedicated relationship manager for 12 months.",
    description:
      "UCB's SME Starter Package is designed to help new businesses grow. Valid for businesses registered in 2025–2026, this package includes: free UCB Business Current Account for 12 months, free payroll disbursement for up to 20 employees, free 2 chequebooks, and a dedicated relationship manager.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop&auto=format",
    badge: "SME",
    badgeColor: "gold",
    expiresAt: "2026-12-31",
    category: "retail",
    status: "active",
  },
  {
    id: "referral-reward",
    title: "Refer a Friend — Earn USD 10 Each",
    summary:
      "Refer a friend to UCB Mobile Banking. You both get USD 10 credited when they make their first transfer.",
    description:
      "Share your UCB referral code with friends and family. When they download UCB Mobile App, open an account, and complete their first transfer of at least USD 10, you both receive USD 10 cashback. No limit on the number of referrals.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=450&fit=crop&auto=format",
    badge: "Referral",
    badgeColor: "blue",
    expiresAt: "2026-11-30",
    category: "digital",
    status: "active",
  },
  {
    id: "festive-exchange",
    title: "Khmer New Year FX Special Rates",
    summary:
      "Get preferred exchange rates on USD/KHR, USD/THB, and USD/CNY from April 10–16 for the Khmer New Year season.",
    description:
      "UCB celebrates Khmer New Year with special foreign exchange rates. From April 10–16, 2027, enjoy zero FX margin on USD/KHR exchanges of USD 500+, and reduced margins on USD/THB and USD/CNY at all UCB branches and via Internet Banking.",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=450&fit=crop&auto=format",
    badge: "Seasonal",
    badgeColor: "gold",
    expiresAt: "2027-04-16",
    category: "retail",
    status: "upcoming",
  },
]
