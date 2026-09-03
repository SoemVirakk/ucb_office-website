export type { LocaleCode, LocalizedList, LocalizedText } from "../types/localization"
import type { LocaleCode, LocalizedList, LocalizedText } from "../types/localization"

export interface MockLanguage {
  id: number

  code: LocaleCode

  name: string

  nativeName: string

  enabled: boolean

  isDefault: boolean

  displayOrder: number
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
  },

  {
    id: 2,

    code: "km",

    name: "Khmer",

    nativeName: "ភាសាខ្មែរ",

    enabled: true,

    isDefault: false,

    displayOrder: 2,
  },

  {
    id: 3,

    code: "zh-CN",

    name: "Simplified Chinese",

    nativeName: "简体中文",

    enabled: true,

    isDefault: false,

    displayOrder: 3,
  },
]

