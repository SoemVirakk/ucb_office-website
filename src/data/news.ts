export interface NewsItem {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: "announcement" | "financial" | "community" | "award" | "technology" | "partnership"
  thumbnail: string
  author: string
}

export const news: NewsItem[] = [
  {
    id: "nbc-compliance-2026",
    title:
      "UCB Achieves Full Compliance with NBC's 2026 Digital Banking Framework",
    excerpt:
      "Union Commercial Bank has completed all requirements under the National Bank of Cambodia's Digital Banking Framework, effective September 2026.",
    content:
      "Phnom Penh — Union Commercial Bank (UCB) has successfully completed all requirements under the National Bank of Cambodia (NBC)'s 2026 Digital Banking Framework, becoming one of the first licensed commercial banks in Cambodia to achieve full compliance ahead of the mandatory deadline. The framework requires all licensed commercial banks to implement enhanced cybersecurity standards, customer data protection protocols, and digital onboarding capabilities. UCB's Chief Compliance Officer, Mr. Sopheak Hy, said: \"We are proud to lead the industry in regulatory compliance. This achievement demonstrates our commitment to building a safe and modern banking environment for all Cambodians.\" The milestone coincides with UCB's rollout of its enhanced eKYC (electronic Know-Your-Customer) system, enabling customers to open accounts digitally in under 10 minutes.",
    date: "2026-09-01",
    readTime: "3 min read",
    category: "announcement",
    thumbnail:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=340&fit=crop&auto=format",
    author: "UCB Communications Team",
  },
  {
    id: "h1-2026-results",
    title: "UCB Reports Strong H1 2026 Financial Results",
    excerpt:
      "Net profit grew 22% year-on-year to USD 14.3 million in the first half of 2026, driven by loan growth and digital banking adoption.",
    content:
      'Union Commercial Bank today announced its financial results for the first half of 2026. Net profit reached USD 14.3 million, up 22% from the same period in 2025. Total loans grew 18% to USD 312 million, while total deposits reached USD 485 million, an increase of 15%. Digital banking active users surpassed 180,000, representing a 67% increase year-on-year. The bank\'s non-performing loan (NPL) ratio remained stable at 1.8%, below the industry average. CEO Mr. David Tan commented: "Our strong fundamentals and digital transformation strategy are delivering results. We are on track to exceed our full-year targets."',
    date: "2026-08-15",
    readTime: "4 min read",
    category: "financial",
    thumbnail:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=340&fit=crop&auto=format",
    author: "Investor Relations, UCB",
  },
  {
    id: "siem-reap-branch",
    title: "UCB Opens Its 28th Branch in Siem Reap's Riverside District",
    excerpt:
      "The new Siem Reap Riverside branch offers a full suite of banking services, a dedicated SME desk, and extended Saturday hours.",
    content:
      'UCB celebrated the opening of its 28th branch in Cambodia on August 1, 2026, strategically located in Siem Reap\'s Riverside District, a key commercial and tourism hub. The modern 250 sqm branch features three teller counters, a dedicated SME advisory desk, two ATMs (one cash-deposit machine), and a comfortable waiting area. Branch Manager Ms. Bopha Keo said: "This branch serves the growing community of local businesses and tourists in Siem Reap. We are committed to providing world-class banking services to every Cambodian, wherever they are." The branch operates Monday–Friday 8:00 AM–5:00 PM and Saturday 8:00 AM–12:00 PM.',
    date: "2026-08-01",
    readTime: "2 min read",
    category: "announcement",
    thumbnail:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=340&fit=crop&auto=format",
    author: "UCB Communications Team",
  },
  {
    id: "mobile-app-v3",
    title:
      "UCB Mobile App Version 3.0 Launches with AI-Powered Financial Insights",
    excerpt:
      "The new UCB Mobile App features an AI spending assistant, instant card freeze, QR cross-border payments, and a redesigned interface.",
    content:
      'UCB is delighted to announce the launch of UCB Mobile App version 3.0, available on iOS and Android from July 15, 2026. Key new features include: AI Financial Insights — a personal spending analysis tool that categorizes transactions and provides savings recommendations; Instant Card Freeze — freeze or unfreeze your debit or credit card in one tap; Cross-border QR — scan and pay at participating merchants in Thailand, Vietnam, and Singapore; Redesigned UI — faster, cleaner, and fully accessible with Khmer language support. Head of Digital Banking Mr. James Lim said: "Version 3.0 represents a leap forward in mobile banking for Cambodia. We\'ve rebuilt the app from the ground up based on customer feedback."',
    date: "2026-07-15",
    readTime: "3 min read",
    category: "technology",
    thumbnail:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=340&fit=crop&auto=format",
    author: "Digital Banking Team, UCB",
  },
  {
    id: "best-bank-award",
    title:
      'UCB Named "Best Commercial Bank in Cambodia 2026" by Asian Banking & Finance',
    excerpt:
      "UCB has been recognized by Asian Banking & Finance magazine as the Best Commercial Bank in Cambodia for 2026, for the second consecutive year.",
    content:
      'Union Commercial Bank has received the prestigious "Best Commercial Bank in Cambodia 2026" award from Asian Banking & Finance magazine, marking the second year in a row UCB has won this honor. The award recognizes UCB\'s outstanding performance in digital innovation, customer service, financial inclusion, and regulatory compliance. The award was presented at the Asian Banking & Finance Awards ceremony in Singapore on June 20, 2026. UCB CEO Mr. David Tan accepted the award and dedicated it to UCB\'s 450-strong team across Cambodia: "This recognition belongs to every member of our team who serves our customers every day with dedication and professionalism."',
    date: "2026-06-22",
    readTime: "2 min read",
    category: "award",
    thumbnail:
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&h=340&fit=crop&auto=format",
    author: "UCB Communications Team",
  },
  {
    id: "aba-partnership",
    title:
      "UCB Partners with CAMEF Foundation to Promote Financial Literacy in Schools",
    excerpt:
      "UCB and the Cambodia Microfinance and Education Foundation launch a joint program to bring financial education to 50 schools across 8 provinces.",
    content:
      'UCB has signed a Memorandum of Understanding (MoU) with the Cambodia Microfinance and Education Foundation (CAMEF) to jointly deliver financial literacy programs across 50 schools in 8 provinces over 2026–2027. The program, branded "Money Smart Cambodia," will cover budgeting, savings, digital safety, and basic investment concepts for students aged 12–18. UCB will provide trained volunteer educators from its branch network, while CAMEF will supply teaching materials and coordinate with school administrations. UCB Head of Corporate Social Responsibility Ms. Srey Leak Pich said: "Empowering the next generation with financial knowledge is one of UCB\'s core commitments to Cambodia\'s sustainable development."',
    date: "2026-05-10",
    readTime: "3 min read",
    category: "partnership",
    thumbnail:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=340&fit=crop&auto=format",
    author: "Corporate Social Responsibility, UCB",
  },
]
