import { navigation, site } from '@/config/site'
import { useI18n } from '@/i18n/I18nProvider'
import { getContactChannels } from '@/lib/contact'

export function Footer() {
  const { t, lang } = useI18n()
  const channels = getContactChannels(lang)
  return (
    <footer className="border-t border-line bg-bg-2">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="text-lg font-bold tracking-[0.04em] text-fg">{site.wordmark}</p>
          <p className="max-w-xs text-sm text-fg-2">{site.descriptor}</p>
          <p className="mono-label text-fg-3 normal-case tracking-normal">
            {t.footer.developedBy} {site.owner}
          </p>
        </div>

        <nav aria-label={t.a11y.footerNav}>
          <p className="mono-label mb-4 text-fg-3">{t.footer.navigation}</p>
          <ul className="space-y-2.5 text-sm">
            {navigation.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-fg-2 transition-colors hover:text-accent-soft">
                  {t.nav[item.id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {channels.length > 0 && (
          <div>
            <p className="mono-label mb-4 text-fg-3">{t.footer.networks}</p>
            <ul className="space-y-2.5 text-sm">
              {channels.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="inline-flex items-center gap-2 text-fg-2 transition-colors hover:text-accent-soft"
                  >
                    <c.icon className="size-4" aria-hidden="true" />
                    {t.contact.labels[c.id]}
                    {c.external && <span className="sr-only"> {t.a11y.newTab}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-5 text-[0.8125rem] text-fg-3 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.wordmark}. {t.footer.rights}
          </p>
          <p className="mono-label normal-case tracking-normal">{site.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
