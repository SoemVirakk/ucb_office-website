import type { LocalizedText } from "./languages"
import { publicAsset } from "../utils/assets"

export interface Product {
  id: string

  category: "PERSONAL" | "BUSINESS" | "DIGITAL"

  name: LocalizedText

  shortDescription: LocalizedText

  description: LocalizedText

  features: Record<"en" | "km" | "zh-CN", string[]>

  imageUrl?: string

  status: "ACTIVE" | "INACTIVE"

  sortOrder: number
}

export const mockProducts: Product[] = [
  {
    id: "savings-account",

    category: "PERSONAL",

    name: {
      en: "UCB Savings Account",
      km: "គណនីសន្សំ UCB",
      "zh-CN": "UCB 储蓄账户",
    },

    shortDescription: {
      en: "Save securely and access your money when you need it.",
      km: "សន្សំប្រាក់ដោយសុវត្ថិភាព និងប្រើប្រាស់ប្រាក់នៅពេលដែលអ្នកត្រូវការ។",
      "zh-CN": "安全储蓄，在需要时灵活使用资金。",
    },

    description: {
      en: "A flexible everyday account with convenient access through branches, ATMs, and digital banking.",
      km: "គណនីប្រើប្រាស់ប្រចាំថ្ងៃដែលមានភាពបត់បែន និងងាយស្រួលតាមសាខា ម៉ាស៊ីន ATM និងធនាគារឌីជីថល។",
      "zh-CN": "灵活的日常账户，可通过分行、ATM 和数字银行便捷使用。",
    },

    features: {
      en: [
        "Open with USD 1 or KHR 4,000",
        "24/7 mobile and internet banking",
        "Competitive interest on eligible balances",
      ],

      km: [
        "បើកគណនីដោយ USD 1 ឬ KHR 4,000",
        "ធនាគារតាមទូរស័ព្ទ និងអ៊ីនធឺណិត ២៤/៧",
        "ទទួលបានការប្រាក់ប្រកួតប្រជែងលើសមតុល្យដែលមានលក្ខខណ្ឌ",
      ],

      "zh-CN": [
        "最低 1 美元或 4,000 瑞尔即可开户",
        "全天候手机银行和网上银行服务",
        "符合条件的余额享有竞争力利率",
      ],
    },

    imageUrl: publicAsset("assets/savings-account.jpg"),

    status: "ACTIVE",

    sortOrder: 1,
  },

  {
    id: "home-loan",

    category: "PERSONAL",

    name: { en: "UCB Home Loan", km: "កម្ចីទិញផ្ទះ UCB", "zh-CN": "UCB 房屋贷款" },

    shortDescription: {
      en: "Turn the home you imagine into the place you live.",
      km: "ធ្វើឱ្យផ្ទះក្នុងក្តីស្រមៃរបស់អ្នកក្លាយជាផ្ទះពិត។",
      "zh-CN": "让您梦想中的家成为现实。",
    },

    description: {
      en: "Flexible financing for purchasing, building, or renovating your family home in Cambodia.",
      km: "ហិរញ្ញប្បទានដែលមានភាពបត់បែនសម្រាប់ការទិញ សាងសង់ ឬជួសជុលផ្ទះគ្រួសាររបស់អ្នកនៅកម្ពុជា។",
      "zh-CN": "为您在柬埔寨购买、建造或翻新家庭住房提供灵活融资。",
    },

    features: {
      en: [
        "Terms up to 25 years",
        "Competitive fixed and floating rates",
        "Dedicated loan advisory support",
      ],

      km: [
        "រយៈពេលរហូតដល់ ២៥ ឆ្នាំ",
        "អត្រាការប្រាក់ថេរ និងអថេរដែលមានការប្រកួតប្រជែង",
        "ការគាំទ្រពីអ្នកប្រឹក្សាកម្ចីជំនាញ",
      ],

      "zh-CN": [
        "贷款期限最长 25 年",
        "具有竞争力的固定和浮动利率",
        "专属贷款顾问支持",
      ],
    },

    status: "ACTIVE",

    sortOrder: 2,
  },

  {
    id: "mobile-banking",

    category: "DIGITAL",

    name: {
      en: "UCB Mobile Banking",
      km: "ធនាគារតាមទូរស័ព្ទ UCB",
      "zh-CN": "UCB 手机银行",
    },

    shortDescription: {
      en: "Your everyday banking, securely in your hands.",
      km: "សេវាធនាគារប្រចាំថ្ងៃរបស់អ្នក មានសុវត្ថិភាពនៅក្នុងដៃ។",
      "zh-CN": "将日常银行服务安全地掌握在手中。",
    },

    description: {
      en: "Manage accounts, transfer money, pay bills, and scan KHQR payments from your phone.",
      km: "គ្រប់គ្រងគណនី ផ្ទេរប្រាក់ បង់វិក្កយបត្រ និងស្កេនការទូទាត់ KHQR តាមទូរស័ព្ទ។",
      "zh-CN": "通过手机管理账户、转账、缴费并扫描 KHQR 二维码付款。",
    },

    features: {
      en: [
        "Biometric login",
        "KHQR payments and bill pay",
        "Instant transaction notifications",
      ],

      km: [
        "ការចូលដោយជីវមាត្រ",
        "ការទូទាត់ KHQR និងបង់វិក្កយបត្រ",
        "ការជូនដំណឹងប្រតិបត្តិការភ្លាមៗ",
      ],

      "zh-CN": ["生物识别登录", "KHQR 二维码支付和缴费", "即时交易通知"],
    },

    imageUrl: publicAsset("assets/ucb-mobile-banking.jpg"),

    status: "ACTIVE",

    sortOrder: 3,
  },
]
