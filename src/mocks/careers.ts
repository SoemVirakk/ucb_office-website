import type { LocalizedList, LocalizedText } from "./languages"

export interface Career {
  id: string

  department: LocalizedText

  title: LocalizedText

  location: LocalizedText

  employmentType: LocalizedText

  summary: LocalizedText

  requirements: LocalizedList

  publishedAt: string

  status: "OPEN" | "CLOSED"
}

export const mockCareers: Career[] = [
  {
    id: "senior-software-engineer",

    department: { en: "Technology", km: "បច្ចេកវិទ្យា", "zh-CN": "技术" },

    title: {
      en: "Senior Software Engineer, Core Banking",
      km: "វិស្វករកម្មវិធីជាន់ខ្ពស់ ប្រព័ន្ធធនាគារស្នូល",
      "zh-CN": "高级软件工程师，核心银行系统",
    },

    location: { en: "Phnom Penh", km: "ភ្នំពេញ", "zh-CN": "金边" },

    employmentType: { en: "Full-time", km: "ពេញម៉ោង", "zh-CN": "全职" },

    summary: {
      en: "Build reliable banking services that support more than 200,000 customers across Cambodia.",

      km: "បង្កើតសេវាធនាគារដែលអាចទុកចិត្តបាន សម្រាប់អតិថិជនជាង ២០០,០០០ នាក់នៅទូទាំងកម្ពុជា។",

      "zh-CN": "构建可靠的银行服务，为柬埔寨超过 20 万名客户提供支持。",
    },

    requirements: {
      en: [
        "5+ years of software engineering experience",
        "Experience with Java, Python, or Go",
        "Strong understanding of secure, scalable APIs",
      ],

      km: [
        "មានបទពិសោធន៍វិស្វកម្មកម្មវិធី ៥ ឆ្នាំឡើងទៅ",
        "មានបទពិសោធន៍ជាមួយ Java, Python ឬ Go",
        "យល់ដឹងខ្លាំងអំពី API ដែលមានសុវត្ថិភាព និងអាចពង្រីកបាន",
      ],

      "zh-CN": [
        "5 年以上软件工程经验",
        "熟悉 Java、Python 或 Go",
        "深入了解安全且可扩展的 API",
      ],
    },

    publishedAt: "2026-08-15",

    status: "OPEN",
  },

  {
    id: "credit-analyst-sme",

    department: { en: "Credit", km: "ឥណទាន", "zh-CN": "信贷" },

    title: {
      en: "Credit Analyst, SME Lending",
      km: "អ្នកវិភាគឥណទាន សម្រាប់អាជីវកម្មខ្នាតតូច និងមធ្យម",
      "zh-CN": "信贷分析师，中小企业贷款",
    },

    location: { en: "Phnom Penh", km: "ភ្នំពេញ", "zh-CN": "金边" },

    employmentType: { en: "Full-time", km: "ពេញម៉ោង", "zh-CN": "全职" },

    summary: {
      en: "Help Cambodian small and medium businesses access responsible financing for sustainable growth.",

      km: "ជួយអាជីវកម្មខ្នាតតូច និងមធ្យមនៅកម្ពុជា ទទួលបានហិរញ្ញប្បទានប្រកបដោយទំនួលខុសត្រូវ។",

      "zh-CN": "帮助柬埔寨中小企业获得负责任的融资，实现可持续发展。",
    },

    requirements: {
      en: [
        "Degree in finance, accounting, economics, or business",
        "2+ years of credit analysis experience",
        "Professional Khmer and English communication skills",
      ],

      km: [
        "បរិញ្ញាបត្រហិរញ្ញវត្ថុ គណនេយ្យ សេដ្ឋកិច្ច ឬអាជីវកម្ម",
        "មានបទពិសោធន៍វិភាគឥណទាន ២ ឆ្នាំឡើងទៅ",
        "មានជំនាញទំនាក់ទំនងជាភាសាខ្មែរ និងអង់គ្លេស",
      ],

      "zh-CN": [
        "金融、会计、经济或商业相关学位",
        "2 年以上信贷分析经验",
        "具备良好的高棉语和英语沟通能力",
      ],
    },

    publishedAt: "2026-08-20",

    status: "OPEN",
  },

  {
    id: "branch-manager-siem-reap",

    department: {
      en: "Branch Banking",
      km: "ធនាគារសាខា",
      "zh-CN": "分行银行业务",
    },

    title: {
      en: "Branch Manager, Siem Reap",
      km: "ប្រធានសាខា សៀមរាប",
      "zh-CN": "暹粒分行经理",
    },

    location: { en: "Siem Reap", km: "សៀមរាប", "zh-CN": "暹粒" },

    employmentType: { en: "Full-time", km: "ពេញម៉ោង", "zh-CN": "全职" },

    summary: {
      en: "Lead a new branch team and build lasting relationships with customers and businesses in Siem Reap.",

      km: "ដឹកនាំក្រុមការងារសាខាថ្មី និងបង្កើតទំនាក់ទំនងយូរអង្វែងជាមួយអតិថិជន និងអាជីវកម្មនៅសៀមរាប។",

      "zh-CN": "带领新分行团队，与暹粒的客户和企业建立长期关系。",
    },

    requirements: {
      en: [
        "5+ years of banking experience",
        "At least 2 years in a leadership role",
        "Fluency in Khmer and working English",
      ],

      km: [
        "មានបទពិសោធន៍ធនាគារ ៥ ឆ្នាំឡើងទៅ",
        "មានបទពិសោធន៍តួនាទីដឹកនាំយ៉ាងតិច ២ ឆ្នាំ",
        "ស្ទាត់ជំនាញភាសាខ្មែរ និងអង់គ្លេសការងារ",
      ],

      "zh-CN": [
        "5 年以上银行工作经验",
        "至少 2 年管理岗位经验",
        "熟练使用高棉语和工作英语",
      ],
    },

    publishedAt: "2026-08-10",

    status: "OPEN",
  },
]
