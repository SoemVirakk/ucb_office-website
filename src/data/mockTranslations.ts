export type { LocaleCode } from "../types/localization"
import type { LocaleCode } from "../types/localization"

export interface MockLanguage {
  id: number

  code: LocaleCode

  name: string

  nativeName: string

  enabled: boolean

  isDefault: boolean

  displayOrder: number

  createdAt: string

  updatedAt: string
}

export interface ContentTranslation {
  id: number

  entityType: "BANNER" | "NEWS" | "PRODUCT" | "PAGE" | "FAQ" | "CAREER"

  entityId: string

  languageCode: LocaleCode

  fieldName: string

  translatedValue: string

  createdAt: string

  updatedAt: string

  createdBy: string

  updatedBy: string
}

export const mockLanguages: MockLanguage[] = [
  {
    id: 1,

    code: "en",

    name: "English",

    nativeName: "English",

    enabled: true,

    isDefault: true,

    displayOrder: 1,

    createdAt: "2026-01-01T00:00:00Z",

    updatedAt: "2026-01-01T00:00:00Z",
  },

  {
    id: 2,

    code: "km",

    name: "Khmer",

    nativeName: "ភាសាខ្មែរ",

    enabled: true,

    isDefault: false,

    displayOrder: 2,

    createdAt: "2026-01-01T00:00:00Z",

    updatedAt: "2026-01-01T00:00:00Z",
  },

  {
    id: 3,

    code: "zh-CN",

    name: "Simplified Chinese",

    nativeName: "简体中文",

    enabled: true,

    isDefault: false,

    displayOrder: 3,

    createdAt: "2026-01-01T00:00:00Z",

    updatedAt: "2026-01-01T00:00:00Z",
  },
]

export const mockContentTranslations: ContentTranslation[] = [
  {
    id: 1,

    entityType: "PAGE",

    entityId: "careers",

    languageCode: "en",

    fieldName: "title",

    translatedValue: "Build Your Career With UCB Bank",

    createdAt: "2026-01-01T00:00:00Z",

    updatedAt: "2026-01-01T00:00:00Z",

    createdBy: "seed",

    updatedBy: "seed",
  },

  {
    id: 2,

    entityType: "PAGE",

    entityId: "careers",

    languageCode: "km",

    fieldName: "title",

    translatedValue: "កសាងអាជីពរបស់អ្នកជាមួយ UCB Bank",

    createdAt: "2026-01-01T00:00:00Z",

    updatedAt: "2026-01-01T00:00:00Z",

    createdBy: "seed",

    updatedBy: "seed",
  },

  {
    id: 3,

    entityType: "PAGE",

    entityId: "careers",

    languageCode: "zh-CN",

    fieldName: "title",

    translatedValue: "在 UCB 银行开启您的职业生涯",

    createdAt: "2026-01-01T00:00:00Z",

    updatedAt: "2026-01-01T00:00:00Z",

    createdBy: "seed",

    updatedBy: "seed",
  },

  {
    id: 4,

    entityType: "PAGE",

    entityId: "careers",

    languageCode: "en",

    fieldName: "introduction",

    translatedValue:
      "Join a team shaping the future of banking in Cambodia. We invest in people, celebrate growth, and welcome talent from every background.",

    createdAt: "2026-01-01T00:00:00Z",

    updatedAt: "2026-01-01T00:00:00Z",

    createdBy: "seed",

    updatedBy: "seed",
  },

  {
    id: 5,

    entityType: "PAGE",

    entityId: "careers",

    languageCode: "km",

    fieldName: "introduction",

    translatedValue:
      "ចូលរួមជាមួយក្រុមការងារដែលកំពុងបង្កើតអនាគតធនាគារនៅកម្ពុជា។ យើងវិនិយោគលើមនុស្ស លើកទឹកចិត្តការរីកចម្រើន និងស្វាគមន៍អ្នកមានទេពកោសល្យគ្រប់រូប។",

    createdAt: "2026-01-01T00:00:00Z",

    updatedAt: "2026-01-01T00:00:00Z",

    createdBy: "seed",

    updatedBy: "seed",
  },

  {
    id: 6,

    entityType: "PAGE",

    entityId: "careers",

    languageCode: "zh-CN",

    fieldName: "introduction",

    translatedValue:
      "加入我们，共同塑造柬埔寨银行业的未来。我们重视人才，鼓励成长，欢迎来自不同背景的优秀人才。",

    createdAt: "2026-01-01T00:00:00Z",

    updatedAt: "2026-01-01T00:00:00Z",

    createdBy: "seed",

    updatedBy: "seed",
  },

  {
    id: 7,

    entityType: "NEWS",

    entityId: "digital-banking-2026",

    languageCode: "zh-CN",

    fieldName: "title",

    translatedValue: "UCB 数字银行服务持续升级",

    createdAt: "2026-01-01T00:00:00Z",

    updatedAt: "2026-01-01T00:00:00Z",

    createdBy: "seed",

    updatedBy: "seed",
  },

  {
    id: 8,

    entityType: "PRODUCT",

    entityId: "savings-account",

    languageCode: "zh-CN",

    fieldName: "title",

    translatedValue: "储蓄账户",

    createdAt: "2026-01-01T00:00:00Z",

    updatedAt: "2026-01-01T00:00:00Z",

    createdBy: "seed",

    updatedBy: "seed",
  },

  {
    id: 9,

    entityType: "FAQ",

    entityId: "mobile-banking",

    languageCode: "zh-CN",

    fieldName: "question",

    translatedValue: "UCB 移动银行可以使用哪些语言？",

    createdAt: "2026-01-01T00:00:00Z",

    updatedAt: "2026-01-01T00:00:00Z",

    createdBy: "seed",

    updatedBy: "seed",
  },

  {
    id: 10,

    entityType: "CAREER",

    entityId: "senior-software-engineer",

    languageCode: "zh-CN",

    fieldName: "title",

    translatedValue: "高级软件工程师（核心银行系统）",

    createdAt: "2026-01-01T00:00:00Z",

    updatedAt: "2026-01-01T00:00:00Z",

    createdBy: "seed",

    updatedBy: "seed",
  },
]

/** Finds a mock translation record for an entity field and language. */
export function getMockTranslation(
  entityType: ContentTranslation["entityType"],
  entityId: string,
  fieldName: string,
  languageCode: LocaleCode,
): string | undefined {
  return mockContentTranslations.find(
    (translation) =>
      translation.entityType === entityType &&
      translation.entityId === entityId &&
      translation.fieldName === fieldName &&
      translation.languageCode === languageCode,
  )?.translatedValue
}

/** Returns a mock translation value with an English fallback when missing. */
export function getMockTranslationWithFallback(
  entityType: ContentTranslation["entityType"],
  entityId: string,
  fieldName: string,
  languageCode: LocaleCode,
): string | undefined {
  return (
    getMockTranslation(entityType, entityId, fieldName, languageCode) ??
    getMockTranslation(entityType, entityId, fieldName, "en")
  )
}
