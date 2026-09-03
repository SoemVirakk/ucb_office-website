export type CreditCardProduct = {
  id: string
  slug: string
  name: string
  category?: string
  type?: string
  isNew?: boolean
  shortDescription?: string
  annualFee?: {
    amount?: number
    currency?: string
    displayText?: string
  }
  benefits?: string[]
  cardFrontImageUrl?: string
  cardBackImageUrl?: string
  productDetailUrl?: string
  disclaimer?: string
}

export const mockCreditCards: CreditCardProduct[] = [
  {
    id: "ucb-platinum-credit-card",
    slug: "ucb-platinum-credit-card",
    name: "UCB Platinum Credit Card",
    category: "Personal Banking",
    type: "CREDIT_CARD",
    isNew: true,
    shortDescription: "Premium rewards for everyday and travel spending.",
    annualFee: {
      amount: 50,
      currency: "USD",
      displayText: "Annual fee: USD 50",
    },
    cardFrontImageUrl: "/assets/images/cards/ucb-platinum-visa-front.png",
    cardBackImageUrl: "/assets/images/cards/ucb-platinum-back.svg",
    productDetailUrl: "/products/cards/ucb-platinum-credit-card",
  },
  {
    id: "ucb-visa-debit-card",
    slug: "ucb-visa-debit-card",
    name: "UCB Visa Debit Card",
    category: "Personal Banking",
    type: "DEBIT_CARD",
    shortDescription: "Spend anywhere, anytime with confidence.",
    annualFee: {
      displayText: "Annual fee: Free",
    },
    cardFrontImageUrl: "/assets/images/cards/ucb-platinum-mastercard-front.png",
    cardBackImageUrl: "/assets/images/cards/ucb-platinum-back.svg",
    productDetailUrl: "/products/cards/ucb-visa-debit-card",
  },
  {
    id: "ucb-classic-credit-card",
    slug: "ucb-classic-credit-card",
    name: "UCB Classic Credit Card",
    category: "Personal Banking",
    type: "CREDIT_CARD",
    shortDescription: "Simple everyday credit with flexible repayment.",
    annualFee: {
      amount: 25,
      currency: "USD",
      displayText: "Annual fee: USD 25",
    },
    cardFrontImageUrl: "/assets/images/cards/ucb-platinum-visa-front.png",
    cardBackImageUrl: "/assets/images/cards/ucb-platinum-back.svg",
    productDetailUrl: "/products/cards/ucb-classic-credit-card",
  },
  {
    id: "ucb-business-debit-card",
    slug: "ucb-business-debit-card",
    name: "UCB Business Debit Card",
    category: "Business Banking",
    type: "DEBIT_CARD",
    shortDescription: "Convenient spending access for business accounts.",
    annualFee: {
      displayText: "Annual fee: Free",
    },
    cardFrontImageUrl: "/assets/images/cards/ucb-platinum-mastercard-front.png",
    cardBackImageUrl: "/assets/images/cards/ucb-platinum-back.svg",
    productDetailUrl: "/products/cards/ucb-business-debit-card",
  },
]
