import type { LocalizedText } from "./languages"
import { publicAsset } from "../utils/assets"

export type ContentEntityType = "BANNER" | "PAGE" | "PROMOTION" | "DIGITAL_SERVICE"

export interface MockContentItem {
  id: string

  entityType: ContentEntityType

  slug: string

  title: LocalizedText

  subtitle: LocalizedText

  description: LocalizedText

  status: "PUBLISHED" | "DRAFT"

  imageUrl?: string

  sortOrder: number

  publishedAt: string
}

export const mockContent: MockContentItem[] = [
  {
    id: "banner-digital-banking",

    entityType: "BANNER",

    slug: "bank-smarter-anywhere",

    title: {
      en: "Bank smarter, wherever life takes you",

      km: "ធនាគារឆ្លាតវៃ គ្រប់ទីកន្លែងដែលអ្នកទៅ",

      "zh-CN": "无论身在何处，都能享受智慧银行服务",
    },

    subtitle: {
      en: "Simple, secure banking through the UCB Mobile App.",

      km: "សេវាធនាគារងាយស្រួល និងមានសុវត្ថិភាពតាមរយៈកម្មវិធី UCB Mobile App។",

      "zh-CN": "通过 UCB 手机银行应用，享受简单安全的银行服务。",
    },

    description: {
      en: "Check balances, transfer funds, pay bills, and manage your cards in one place.",

      km: "ពិនិត្យសមតុល្យ ផ្ទេរប្រាក់ បង់វិក្កយបត្រ និងគ្រប់គ្រងកាតរបស់អ្នកនៅកន្លែងតែមួយ។",

      "zh-CN": "随时查询余额、转账、缴费并管理您的银行卡。",
    },

    status: "PUBLISHED",

    imageUrl: publicAsset("assets/ucb-mobile-banking.jpg"),

    sortOrder: 1,

    publishedAt: "2026-08-01",
  },

  {
    id: "page-about-ucb",

    entityType: "PAGE",

    slug: "about-ucb",

    title: {
      en: "Cambodia's bank for the next generation",

      km: "ធនាគារកម្ពុជាសម្រាប់ជំនាន់ក្រោយ",

      "zh-CN": "面向下一代的柬埔寨银行",
    },

    subtitle: {
      en: "Trusted banking, built for Cambodia.",

      km: "សេវាធនាគារដែលគួរឱ្យទុកចិត្ត សម្រាប់កម្ពុជា។",

      "zh-CN": "值得信赖的银行服务，为柬埔寨而建。",
    },

    description: {
      en: "UCB connects people, families, and businesses to opportunities through responsible, modern banking.",

      km: "UCB ភ្ជាប់មនុស្ស គ្រួសារ និងអាជីវកម្មទៅកាន់ឱកាស តាមរយៈសេវាធនាគារទំនើប និងមានទំនួលខុសត្រូវ។",

      "zh-CN": "UCB 通过负责任的现代银行服务，为个人、家庭和企业连接更多机会。",
    },

    status: "PUBLISHED",

    sortOrder: 2,

    publishedAt: "2026-01-15",
  },

  {
    id: "promotion-fixed-deposit",

    entityType: "PROMOTION",

    slug: "fixed-deposit-bonus",

    title: {
      en: "Grow your savings with a fixed deposit",

      km: "បង្កើនប្រាក់សន្សំរបស់អ្នកជាមួយប្រាក់បញ្ញើមានកាលកំណត់",

      "zh-CN": "定期存款，让您的储蓄持续增长",
    },

    subtitle: {
      en: "Secure returns for plans that matter.",

      km: "ផលចំណេញមានសុវត្ថិភាព សម្រាប់ផែនការសំខាន់ៗរបស់អ្នក។",

      "zh-CN": "稳定回报，助力实现重要计划。",
    },

    description: {
      en: "Choose a term that suits you and earn competitive interest on your USD or KHR savings.",

      km: "ជ្រើសរើសរយៈពេលដែលសមស្រប និងទទួលបានការប្រាក់ប្រកួតប្រជែងលើប្រាក់សន្សំ USD ឬ KHR របស់អ្នក។",

      "zh-CN": "选择适合您的期限，让美元或瑞尔储蓄享受具有竞争力的利率。",
    },

    status: "PUBLISHED",

    sortOrder: 3,

    publishedAt: "2026-07-01",
  },
]
