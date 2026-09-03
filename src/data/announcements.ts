import type { ContentStatus } from "./banners"

export type AnnouncementPriority = "critical" | "high" | "normal"
export type AnnouncementType = "maintenance" | "security" | "holiday" | "service-update" | "regulatory"

export interface Announcement {
  id: string
  title: string
  titleKm?: string
  type: AnnouncementType
  priority: AnnouncementPriority
  summary: string
  summaryKm?: string
  content: string
  startDate: string
  endDate: string
  affectedServices: string[]
  affectedChannels?: string[]
  customerAction: string
  status: ContentStatus
  maintenanceStart?: string
  maintenanceEnd?: string
  publishedAt?: string
}

export const announcements: Announcement[] = [
  {
    id: "ann-mobile-maintenance",
    title: "Scheduled Mobile Banking Maintenance — 5 October 2026",
    titleKm: "ការថែទាំប្រព័ន្ធ Mobile Banking — ថ្ងៃទី ៥ តុលា ២០២៦",
    type: "maintenance",
    priority: "high",
    summary:
      "UCB Mobile App and Internet Banking will be unavailable on 5 October 2026 from 1:00 AM to 5:00 AM (ICT) for scheduled system upgrades.",
    summaryKm:
      "UCB Mobile App និង Internet Banking នឹងមិនអាចប្រើបាននៅថ្ងៃទី ៥ តុលា ២០២៦ ពីម៉ោង ១:០០ ព្រឹក ដល់ ៥:០០ ព្រឹក (ICT) ។",
    content:
      "UCB will be performing scheduled system maintenance to upgrade our digital banking infrastructure. During this maintenance window, the following services will be temporarily unavailable: UCB Mobile App (all functions), UCB Internet Banking portal, QR payment processing, and card-to-card transfers. ATMs, point-of-sale terminals, and branch banking services will remain available throughout the maintenance period. We apologise for any inconvenience caused and thank you for your patience.",
    startDate: "2026-10-05",
    endDate: "2026-10-05",
    maintenanceStart: "2026-10-05T01:00:00+07:00",
    maintenanceEnd: "2026-10-05T05:00:00+07:00",
    affectedServices: [
      "UCB Mobile App",
      "Internet Banking",
      "QR Payments",
      "Card-to-Card Transfers",
    ],
    affectedChannels: ["Mobile App", "Web Portal"],
    customerAction:
      "Plan transactions before 1:00 AM or use ATMs and branches during the maintenance window.",
    status: "published",
    publishedAt: "2026-09-25",
  },
  {
    id: "ann-phishing-alert",
    title: "Security Alert: Phishing SMS and Email Campaign Detected",
    titleKm: "សេចក្តីជូនដំណឹងសុវត្ថិភាព: ការវាយប្រហារ Phishing",
    type: "security",
    priority: "critical",
    summary:
      "UCB has detected fraudulent SMS and email messages impersonating UCB. Do not click any links or provide account details.",
    summaryKm:
      "UCB បានរកឃើញសារ SMS និង Email ក្លែងក្លាយ ដែលក្លែងធ្វើជា UCB ។ សូមមិនចុចតំណណាមួយ ឬផ្តល់ព័ត៌មានគណនី។",
    content:
      'UCB has identified a phishing campaign where fraudsters are sending SMS and email messages claiming to be from UCB. These messages typically contain urgent language about "account suspension," "failed transactions," or "security verification required." They direct recipients to fraudulent websites that mimic UCB\'s login page. UCB will NEVER ask for your password, OTP, CVV, card number, or full account number via SMS or email. If you received such a message, do not click any links, do not enter any credentials, and report it immediately to our fraud hotline at +855 23 999 911.',
    startDate: "2026-09-20",
    endDate: "2026-10-20",
    affectedServices: [
      "All Digital Channels",
      "Internet Banking",
      "Mobile App",
    ],
    customerAction:
      "Report suspicious messages to +855 23 999 911. Do not click links or provide any personal information.",
    status: "published",
    publishedAt: "2026-09-20",
  },
  {
    id: "ann-pchum-ben",
    title: "Pchum Ben Holiday Branch Hours — 4–6 October 2026",
    titleKm: "ម៉ោងធ្វើការសាខាក្នុងបុណ្យភ្ជុំបិណ្ឌ — ៤-៦ តុលា ២០២៦",
    type: "holiday",
    priority: "normal",
    summary:
      "UCB branches will observe reduced hours during Pchum Ben holiday (4–6 October 2026). ATMs and Digital Banking remain available 24/7.",
    summaryKm:
      "សាខា UCB នឹងបើកដំណើរការក្នុងម៉ោងកាត់បន្ថយក្នុងអំឡុងបុណ្យភ្ជុំបិណ្ឌ (៤-៦ តុលា ២០២៦)។ ម៉ាស៊ីន ATM និង Digital Banking មានប្រើប្រាស់ ២៤/៧។",
    content:
      "In observance of the Pchum Ben national holiday, UCB branches will operate on a modified schedule from October 4–6, 2026. All branches will be closed on October 5 (main Pchum Ben day). On October 4 and 6, selected branches in Phnom Penh and Siem Reap will operate from 9:00 AM to 12:00 PM. All ATMs, CDMs, and UCB Mobile App/Internet Banking services will remain available 24/7 throughout the holiday period. Normal branch operations resume on October 7, 2026.",
    startDate: "2026-10-04",
    endDate: "2026-10-06",
    affectedServices: ["Branch Services", "Teller Operations"],
    affectedChannels: ["Physical Branches"],
    customerAction:
      "Use UCB Mobile App, Internet Banking, or ATMs for transactions during the holiday. Check branch hours via the Branches & ATMs page.",
    status: "published",
    publishedAt: "2026-09-22",
  },
  {
    id: "ann-nbc-rate",
    title: "NBC Adjusts Minimum Lending Rate — Effective 1 November 2026",
    titleKm:
      "ធនាគារជាតិកម្ពុជាកែតម្រូវអត្រាប្រាក់កម្ចីអប្បបរមា — មានប្រសិទ្ធភាពពីថ្ងៃទី ១ វិច្ឆិកា ២០២៦",
    type: "regulatory",
    priority: "normal",
    summary:
      "In line with NBC's Prakas No. B7-026-331, UCB will revise interest rates on new loan products effective 1 November 2026.",
    summaryKm:
      "ស្របតាមប្រកាស NBC លេខ B7-026-331 UCB នឹងកែលម្អអត្រាការប្រាក់លើផលិតផលប្រាក់កម្ចីថ្មី ចាប់ពីថ្ងៃទី ១ វិច្ឆិកា ២០២៦។",
    content:
      "The National Bank of Cambodia has issued Prakas No. B7-026-331, revising the framework for minimum lending rates applicable to licensed commercial banks. Effective November 1, 2026, UCB will update interest rates on new consumer loan products to comply with this directive. Existing loan agreements will not be affected by this change and will continue to operate under their original contracted terms. Customers seeking new loans from November 1 onwards may contact our branches or call our customer service line at +855 23 999 001 for the latest applicable rates.",
    startDate: "2026-10-01",
    endDate: "2026-12-31",
    affectedServices: ["Consumer Loans", "Personal Loans", "Home Loans"],
    customerAction:
      "No action required for existing loan customers. Contact UCB for new loan enquiries from November 1 onwards.",
    status: "published",
    publishedAt: "2026-10-01",
  },
  {
    id: "ann-atm-upgrade",
    title: "ATM Network Upgrade — Selected ATMs Temporarily Unavailable",
    titleKm:
      "ការធ្វើឱ្យប្រសើរឡើងបណ្តាញ ATM — ម៉ាស៊ីន ATM មួយចំនួននឹងមិនអាចប្រើបានជាបណ្ដោះអាសន្ន",
    type: "service-update",
    priority: "normal",
    summary:
      "12 UCB ATMs across Phnom Penh and Siem Reap will be upgraded between September 20–30, 2026. Each ATM will be offline for approximately 4 hours.",
    summaryKm:
      "ម៉ាស៊ីន ATM UCB ចំនួន ១២ នៅភ្នំពេញ និងសៀមរាប នឹងត្រូវធ្វើឱ្យប្រសើរឡើងរវាងថ្ងៃទី ២០-៣០ កញ្ញា ២០២៦ ។",
    content:
      "UCB is upgrading 12 ATMs across Phnom Penh and Siem Reap as part of our ongoing infrastructure improvement program. The upgrades will enhance cash dispensing speed, add cardless cash withdrawal capability, and improve contactless card support. Each ATM will be temporarily out of service for approximately 4 hours during its upgrade window. The nearest operational UCB ATM will be displayed on the ATM's out-of-service screen. Customers may also use our Branch Locator to find the nearest available ATM.",
    startDate: "2026-09-20",
    endDate: "2026-09-30",
    maintenanceStart: "2026-09-20T00:00:00+07:00",
    maintenanceEnd: "2026-09-30T23:59:00+07:00",
    affectedServices: ["ATM Cash Withdrawal", "ATM Deposits"],
    affectedChannels: ["ATM Network"],
    customerAction:
      "Use UCB Mobile App or visit a nearby branch. Check the Branches & ATMs page for real-time ATM availability.",
    status: "published",
    publishedAt: "2026-09-15",
  },
]

export const priorityConfig: Record<AnnouncementPriority, {
  bg: string
  color: string
  border: string
  label: string
  icon: string
}> = {
  critical: {
    bg: "#FEF2F2",
    color: "#DC2626",
    border: "#FCA5A5",
    label: "Critical",
    icon: "🚨",
  },
  high: {
    bg: "#FFF7ED",
    color: "#EA580C",
    border: "#FED7AA",
    label: "High Priority",
    icon: "⚠️",
  },
  normal: {
    bg: "#EFF6FF",
    color: "#1D4ED8",
    border: "#BFDBFE",
    label: "Normal",
    icon: "ℹ️",
  },
}

export const typeConfig: Record<AnnouncementType, {
  label: string
  icon: string
  color: string
}> = {
  maintenance: { label: "Maintenance", icon: "🔧", color: "#7C3AED" },
  security: { label: "Security", icon: "🔒", color: "#DC2626" },
  holiday: { label: "Holiday Notice", icon: "🏖️", color: "#059669" },
  "service-update": { label: "Service Update", icon: "⚡", color: "#D97706" },
  regulatory: { label: "Regulatory", icon: "📋", color: "#2563EB" },
}

export function isActive(ann: Announcement): boolean {
  const now = new Date()
  return (
    ann.status === "published" &&
    new Date(ann.startDate) <= now &&
    new Date(ann.endDate) >= now
  )
}

export { type ContentStatus }
