import type { LocalizedText } from "./languages"

export interface NewsArticle {
  id: string

  category: LocalizedText

  title: LocalizedText

  summary: LocalizedText

  content: LocalizedText

  imageUrl?: string

  publishedAt: string

  status: "PUBLISHED" | "DRAFT"
}

export const mockNews: NewsArticle[] = [
  {
    id: "ucb-mobile-banking-30",

    category: { en: "Digital Banking", km: "ធនាគារឌីជីថល", "zh-CN": "数字银行" },

    title: {
      en: "UCB Mobile Banking 3.0 is now available",
      km: "UCB Mobile Banking 3.0 មានសម្រាប់ប្រើប្រាស់ហើយ",
      "zh-CN": "UCB 手机银行 3.0 现已上线",
    },

    summary: {
      en: "Enjoy a faster, simpler mobile experience with biometric login, improved QR payments, and smarter transaction alerts.",

      km: "ទទួលបានបទពិសោធន៍ប្រើប្រាស់តាមទូរស័ព្ទដែលលឿន និងងាយស្រួលជាងមុន ជាមួយការចូលដោយជីវមាត្រ ការទូទាត់ QR ប្រសើរឡើង និងការជូនដំណឹងឆ្លាតវៃ។",

      "zh-CN":
        "体验更快速、更简单的移动服务，包括生物识别登录、升级版二维码支付和智能交易提醒。",
    },

    content: {
      en: "The latest UCB Mobile Banking update brings everyday banking closer to customers with a cleaner design and enhanced security controls.",

      km: "ការធ្វើបច្ចុប្បន្នភាពចុងក្រោយរបស់ UCB Mobile Banking នាំមកនូវសេវាធនាគារប្រចាំថ្ងៃដែលងាយស្រួលជាងមុន ជាមួយការរចនាថ្មី និងការគ្រប់គ្រងសុវត្ថិភាពប្រសើរឡើង។",

      "zh-CN":
        "最新版本的 UCB 手机银行通过更简洁的设计和更强的安全控制，让日常银行服务更加便捷。",
    },

    imageUrl: "/assets/ucb-mobile-banking.jpg",

    publishedAt: "2026-08-25",

    status: "PUBLISHED",
  },

  {
    id: "financial-literacy-workshop",

    category: { en: "Community", km: "សហគមន៍", "zh-CN": "社区" },

    title: {
      en: "UCB expands financial literacy workshops for young people",
      km: "UCB ពង្រីកសិក្ខាសាលាអក្ខរកម្មហិរញ្ញវត្ថុសម្រាប់យុវជន",
      "zh-CN": "UCB 扩大面向年轻人的金融知识工作坊",
    },

    summary: {
      en: "More than 500 students will learn practical skills for saving, budgeting, and responsible borrowing this year.",

      km: "សិស្សជាង ៥០០ នាក់នឹងរៀនជំនាញជាក់ស្តែងសម្រាប់ការសន្សំ ការរៀបចំថវិកា និងការខ្ចីប្រាក់ប្រកបដោយទំនួលខុសត្រូវនៅឆ្នាំនេះ។",

      "zh-CN":
        "今年将有超过 500 名学生学习储蓄、预算管理和负责任借贷等实用技能。",
    },

    content: {
      en: "The programme partners with schools and community groups to make financial education practical and accessible.",

      km: "កម្មវិធីនេះសហការជាមួយសាលារៀន និងក្រុមសហគមន៍ ដើម្បីធ្វើឱ្យការអប់រំហិរញ្ញវត្ថុមានភាពជាក់ស្តែង និងងាយស្រួលទទួលបាន។",

      "zh-CN": "该项目与学校和社区组织合作，让金融教育更加实用且易于获取。",
    },

    publishedAt: "2026-08-12",

    status: "PUBLISHED",
  },
]
