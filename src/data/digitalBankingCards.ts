import {
  BarChart3,
  CreditCard,
  FileText,
  Globe2,
  QrCode,
  Send,
  Smartphone,
  WalletCards,
} from "lucide-react"
import type {
  FeatureCardData,
  ProductServiceCardData,
} from "../components/cards/UcbCardSystem"

export const digitalBankingProducts: ProductServiceCardData[] = [
  {
    icon: Smartphone,
    title: "UCB Mobile Banking",
    description: "Manage everyday banking securely from the UCB Mobile App.",
    benefits: ["Transfers and bill payments", "Mobile top-up and KHQR payments", "Card services in one app"],
    href: "/products/ucb-mobile",
  },
  {
    icon: WalletCards,
    title: "UCB Internet Banking",
    description: "Use browser-based banking tools for account access and payment management.",
    benefits: ["Account balance overview", "Payment and transfer tools", "Statement access"],
    href: "/products/internet-banking",
  },
  {
    icon: Globe2,
    title: "UCB International Remittance",
    description: "Send international payments with support from UCB banking staff.",
    benefits: ["Cross-border transfer support", "Beneficiary bank detail guidance", "Branch and contact support"],
    href: "/products/remittance",
    badge: "International",
  },
]

export const mobileBankingFeatures: FeatureCardData[] = [
  {
    icon: Send,
    title: "Transfer Money",
    description: "Transfer funds between UCB accounts and supported local bank accounts.",
    href: "/digital-banking#mobile-banking-features",
    ctaLabel: "Learn more",
  },
  {
    icon: QrCode,
    title: "QR Payments",
    description: "Scan supported KHQR merchant codes and confirm payments securely.",
    href: "/digital-banking#mobile-banking-features",
    ctaLabel: "Learn more",
  },
  {
    icon: FileText,
    title: "Pay Bills",
    description: "Pay eligible utility, mobile, and service bills through UCB Mobile Banking.",
    href: "/digital-banking#mobile-banking-features",
    ctaLabel: "Learn more",
  },
  {
    icon: Smartphone,
    title: "Mobile Top-up",
    description: "Top up supported Cambodian mobile numbers from your selected account.",
    href: "/digital-banking#mobile-banking-features",
    ctaLabel: "Learn more",
  },
  {
    icon: CreditCard,
    title: "Card Management",
    description: "View card information and manage supported card services.",
    href: "/products/category/cards",
    ctaLabel: "Learn more",
  },
  {
    icon: BarChart3,
    title: "Financial Insights",
    description: "Planned tools for clearer account activity summaries and spending visibility.",
    badge: "Coming soon",
    ctaLabel: "Notify me",
  },
]
