import { useI18n } from '@/i18n/I18nProvider'

export function LanguageToggle() {
  const { lang, setLang, t } = useI18n()
  const on = 'bg-accent text-on-accent'
  const off = 'text-fg-2'
  return (
    <button
      type="button"
      onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
      aria-label={t.a11y.switchLang}
      title={t.a11y.switchLang}
      className="inline-flex h-10 items-center gap-0.5 rounded-lg border border-line p-1 font-mono text-[0.7rem] font-semibold transition-colors hover:border-accent"
    >
      <span lang="es" className={`rounded-md px-1.5 py-1 ${lang === 'es' ? on : off}`}>
        ES
      </span>
      <span lang="en" className={`rounded-md px-1.5 py-1 ${lang === 'en' ? on : off}`}>
        EN
      </span>
    </button>
  )
}
