export interface Milestone {
  year: number
  title: string
  description: string
  icon: string
  highlight?: boolean
}

export const milestones: Milestone[] = [
  {
    year: 2008,
    title: "UCB Founded",
    description:
      "Union Commercial Bank receives its full commercial banking licence from the National Bank of Cambodia, opening its first branch on Norodom Boulevard, Phnom Penh.",
    icon: "🏦",
    highlight: true,
  },
  {
    year: 2011,
    title: "Branch Expansion",
    description:
      "UCB expands to 5 branches across Phnom Penh, Siem Reap, and Battambang, establishing its presence as a regional bank for Cambodian businesses and families.",
    icon: "📍",
  },
  {
    year: 2013,
    title: "First ATM Network",
    description:
      "UCB launches its first ATM network with 20 machines across Cambodia, joining the CAMBODIA SHARED SWITCH (CSS) consortium for nationwide interoperability.",
    icon: "🏧",
  },
  {
    year: 2015,
    title: "SME Lending Centre",
    description:
      "UCB opens a dedicated SME Lending Centre in Phnom Penh, offering tailored loan products for small and medium enterprises across manufacturing, retail, and agriculture.",
    icon: "💼",
  },
  {
    year: 2017,
    title: "SWIFT Connectivity",
    description:
      "UCB becomes a direct SWIFT member, enabling real-time international wire transfers and correspondent banking relationships with over 40 international banks.",
    icon: "🌐",
  },
  {
    year: 2018,
    title: "UCB Mobile App Launch",
    description:
      "UCB launches its first mobile banking app for iOS and Android, offering account management, transfers, and bill payment to individual customers.",
    icon: "📱",
    highlight: true,
  },
  {
    year: 2020,
    title: "KHQR & Bakong Integration",
    description:
      "UCB integrates with the National Bank of Cambodia's BAKONG blockchain payment system and introduces KHQR merchant payment support, advancing Cambodia's cashless economy.",
    icon: "📲",
  },
  {
    year: 2021,
    title: "100,000 Customers",
    description:
      "UCB reaches the milestone of 100,000 active customers, marking a decade of trusted service and rapid growth across personal and business banking.",
    icon: "🎯",
    highlight: true,
  },
  {
    year: 2023,
    title: "ISO 27001 Certified",
    description:
      "UCB achieves ISO 27001 certification for Information Security Management, reaffirming its commitment to protecting customer data and digital assets.",
    icon: "🔒",
  },
  {
    year: 2024,
    title: "UCB Mobile App v3.0",
    description:
      "A complete redesign of UCB Mobile Banking launches with biometric login, AI-powered financial insights, and support for 8 languages including full Khmer interface.",
    icon: "✨",
    highlight: true,
  },
  {
    year: 2025,
    title: "28 Branches Nationwide",
    description:
      "UCB completes its Phase 3 branch expansion, reaching 28 branches and 85 ATMs across all major provinces of Cambodia.",
    icon: "🗺️",
  },
  {
    year: 2026,
    title: "200,000 Customers & Beyond",
    description:
      "UCB surpasses 200,000 active customers and launches its next digital evolution — open banking APIs and embedded financial services for Cambodian businesses.",
    icon: "🚀",
    highlight: true,
  },
]
