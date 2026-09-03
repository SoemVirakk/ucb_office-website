export type ContentStatus = "draft" | "pending" | "scheduled" | "published" | "expired" | "archived"
export type BannerPlacement = "homepage-hero" | "homepage-section" | "product-page"

export interface Banner {
  id: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaTarget: string
  ctaType: "internal" | "external" | "promotion" | "news" | "product"
  desktopImage: string
  mobileImage: string
  placement: BannerPlacement
  displayOrder: number
  status: ContentStatus
  startDate: string
  endDate: string
}

export const banners: Banner[] = [
  {
    id: "banner-independence",
    title: "Zero Transfer Fees — All of September",
    subtitle:
      "Celebrate Cambodia's Independence Month. Send money to any bank, completely free via UCB Mobile App.",
    ctaLabel: "Learn More",
    ctaTarget: "promotions",
    ctaType: "internal",
    desktopImage:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1440&h=600&fit=crop&auto=format",
    mobileImage:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=768&h=500&fit=crop&auto=format",
    placement: "homepage-hero",
    displayOrder: 1,
    status: "published",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
  },
  {
    id: "banner-home-loan",
    title: "Special Home Loan Rate — 7.99% p.a.",
    subtitle:
      "Lock in Cambodia's most competitive home loan rate. Fixed for 3 years, free property valuation included.",
    ctaLabel: "Apply Now",
    ctaTarget: "online-services",
    ctaType: "internal",
    desktopImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1440&h=600&fit=crop&auto=format",
    mobileImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=768&h=500&fit=crop&auto=format",
    placement: "homepage-hero",
    displayOrder: 2,
    status: "published",
    startDate: "2026-08-01",
    endDate: "2026-10-31",
  },
  {
    id: "banner-mobile-v3",
    title: "UCB Mobile App 3.0 — Banking Reimagined",
    subtitle:
      "AI-powered insights, instant card freeze, cross-border QR payments, and a stunning new design.",
    ctaLabel: "Discover Features",
    ctaTarget: "digital-banking",
    ctaType: "internal",
    desktopImage:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1440&h=600&fit=crop&auto=format",
    mobileImage:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=768&h=500&fit=crop&auto=format",
    placement: "homepage-hero",
    displayOrder: 3,
    status: "published",
    startDate: "2026-07-15",
    endDate: "2026-12-31",
  },
  {
    id: "banner-sme",
    title: "UCB SME Starter Package",
    subtitle:
      "Zero account fees for 12 months, free payroll, and a dedicated relationship manager for your business.",
    ctaLabel: "Explore for Business",
    ctaTarget: "products",
    ctaType: "internal",
    desktopImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1440&h=600&fit=crop&auto=format",
    mobileImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=768&h=500&fit=crop&auto=format",
    placement: "homepage-hero",
    displayOrder: 4,
    status: "published",
    startDate: "2026-08-01",
    endDate: "2026-12-31",
  },
]

export const homepageSectionBanners: Banner[] = [
  {
    id: "banner-cashback",
    title: "5% Cashback on Dining & Shopping",
    subtitle: "Earn automatic cashback with UCB Platinum Credit Card",
    ctaLabel: "Get the Card",
    ctaTarget: "products",
    ctaType: "internal",
    desktopImage:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=340&fit=crop&auto=format",
    mobileImage:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop&auto=format",
    placement: "homepage-section",
    displayOrder: 1,
    status: "published",
    startDate: "2026-08-01",
    endDate: "2026-10-31",
  },
]

export const statusColors: Record<ContentStatus, {
  bg: string
  color: string
  label: string
}> = {
  draft: { bg: "#F3F4F6", color: "#374151", label: "Draft" },
  pending: { bg: "#FEF3C7", color: "#92400E", label: "Pending Approval" },
  scheduled: { bg: "#EDE9FE", color: "#5B21B6", label: "Scheduled" },
  published: { bg: "#D1FAE5", color: "#065F46", label: "Published" },
  expired: { bg: "#FEE2E2", color: "#991B1B", label: "Expired" },
  archived: { bg: "#F3F4F6", color: "#6B7280", label: "Archived" },
}
