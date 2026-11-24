import type { FormEvent } from 'react'
import { ArrowUpRight, Send } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import { getContactChannels } from '@/lib/contact'
import { Reveal } from '@/components/Reveal'
import { SectionTitle } from '@/components/SectionTitle'

export function Contact() {
  const { t, lang } = useI18n()
  const channels = getContactChannels(lang)
  const whatsapp = channels.find((c) => c.id === 'whatsapp')

  /** Sin backend: arma el mensaje y abre WhatsApp con el texto ya escrito. */
  const sendViaWhatsApp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!whatsapp) return
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim().slice(0, 80)
    const message = String(data.get('message') ?? '').trim().slice(0, 600)
    if (!name || !message) return
    const base = whatsapp.href.split('?')[0]
    window.open(`${base}?text=${encodeURIComponent(t.contact.form.compose(name, message))}`, '_blank', 'noopener,noreferrer')
    e.currentTarget.reset()
  }

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

          {whatsapp && (
            <Reveal className="mx-auto mt-8 max-w-3xl" delay={120}>
              <form onSubmit={sendViaWhatsApp} className="card-surface grid gap-4 p-5 sm:p-6">
                <h3 className="text-base font-semibold text-fg">{t.contact.form.title}</h3>
                <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
                  <label className="grid gap-1.5 text-sm text-fg-2">
                    {t.contact.form.name}
                    <input
                      name="name"
                      required
                      minLength={2}
                      maxLength={80}
                      autoComplete="name"
                      className="min-h-11 rounded-lg border border-line bg-bg px-3 text-fg outline-none transition-colors focus:border-accent"
                    />
                  </label>
                  <label className="grid gap-1.5 text-sm text-fg-2">
                    {t.contact.form.message}
                    <textarea
                      name="message"
                      required
                      minLength={5}
                      maxLength={600}
                      rows={3}
                      className="resize-y rounded-lg border border-line bg-bg px-3 py-2.5 text-fg outline-none transition-colors focus:border-accent"
                    />
                  </label>
                </div>
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-fg-3">{t.contact.form.note}</p>
                  <button type="submit" className="btn btn-primary w-full sm:w-auto">
                    <Send className="size-4" aria-hidden="true" />
                    {t.contact.form.send}
                    <span className="sr-only"> {t.a11y.newTab}</span>
                  </button>
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
