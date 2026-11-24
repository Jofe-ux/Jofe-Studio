import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import { getContactChannels } from '@/lib/contact'
import { Reveal } from '@/components/Reveal'
import { SectionTitle } from '@/components/SectionTitle'

export function Contact() {
  const { t, lang } = useI18n()
  const channels = getContactChannels(lang)

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="container-page py-20 sm:py-24">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-2 px-6 py-14 sm:px-12 sm:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative">
          <SectionTitle
            id="contacto-title"
            align="center"
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            description={t.contact.description}
          />

          {channels.length > 0 ? (
            <ul className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
              {channels.map((c, i) => (
                <Reveal as="li" key={c.id} delay={i * 70}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="card-surface group flex items-center gap-4 p-5"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                      <c.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-fg">{t.contact.labels[c.id]}</span>
                      <span className="block truncate font-mono text-xs text-fg-2">{c.value ?? t.contact.linkedinValue}</span>
                    </span>
                    <ArrowUpRight className="size-4 text-fg-3 transition-colors group-hover:text-accent" aria-hidden="true" />
                    {c.external && <span className="sr-only">{t.a11y.newTab}</span>}
                  </a>
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal>
              <p className="mx-auto max-w-md rounded-lg border border-dashed border-line px-5 py-4 text-center text-sm text-fg-2">
                {t.contact.none}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
