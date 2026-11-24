import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { site } from '@/config/site'
import { en } from './en'
import { es, type Dict } from './es'
import { pick, type Lang } from './types'

const STORAGE_KEY = 'jofe-lang'
const dictionaries: Record<Lang, Dict> = { es, en }

interface I18nValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dict
}

const I18nContext = createContext<I18nValue | null>(null)

function setMeta(selector: string, value: string) {
  document.head.querySelector(selector)?.setAttribute('content', value)
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // El idioma inicial lo decide /theme-init.js (guardado → idioma del navegador → español).
  const [lang, setLangState] = useState<Lang>(() => (document.documentElement.lang === 'en' ? 'en' : 'es'))

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* modo privado: se ignora */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    const title = pick(site.seo.title, lang)
    const description = pick(site.seo.description, lang)
    document.title = title
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)
  }, [lang])

  const value = useMemo<I18nValue>(() => ({ lang, setLang, t: dictionaries[lang] }), [lang, setLang])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n debe usarse dentro de <I18nProvider>')
  return ctx
}
