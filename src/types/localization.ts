export type LocaleCode = "en" | "km" | "zh-CN"

export type LocalizedText = Record<LocaleCode, string>

export type LocalizedList = Record<LocaleCode, string[]>

export const defaultLocale: LocaleCode = "en"

/** Returns the localized string for the selected locale, falling back to English when needed. */
export function localizedValue(
  text: LocalizedText,
  locale: LocaleCode,
): string {
  return text[locale] || text[defaultLocale]
}

/** Returns the localized string list for the selected locale, falling back to English when needed. */
export function localizedList(
  values: LocalizedList,
  locale: LocaleCode,
): string[] {
  return values[locale] || values[defaultLocale]
}
