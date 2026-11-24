export type Lang = 'es' | 'en'
export const languages: readonly Lang[] = ['es', 'en']

/** Texto en los dos idiomas. */
export interface Localized {
  es: string
  en: string
}

export const pick = (value: Localized, lang: Lang): string => value[lang]
