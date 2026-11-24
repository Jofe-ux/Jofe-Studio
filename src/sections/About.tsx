import { Compass, Layers, Rocket, UserRound, type LucideIcon } from 'lucide-react'
import { site } from '@/config/site'
import { projectStats } from '@/data/projects'
import { useI18n } from '@/i18n/I18nProvider'
import { Reveal } from '@/components/Reveal'
import { SectionTitle } from '@/components/SectionTitle'

// Los iconos siguen el mismo orden que t.about.pillars (textos sin cifras ni logros no verificados).
const icons: readonly LucideIcon[] = [UserRound, Compass, Layers, Rocket]

export function About() {
  const { t } = useI18n()
  const quote = (s: string) => <span className="text-ok">'{s}'</span>

  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-title" className="border-y border-line bg-bg-2/60 py-20 sm:py-24">
      <div className="container-page">
        <SectionTitle id="sobre-mi-title" eyebrow={t.about.eyebrow} title={t.about.title} />

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-7">
            <Reveal className="card-surface space-y-4 p-6 sm:p-8">
              <p className="text-base leading-relaxed text-fg sm:text-lg">
                {t.about.introBefore}
                <strong className="font-semibold text-accent-soft">{site.owner}</strong>
                {t.about.introAfter}
                {site.brand}.
              </p>
              <p className="leading-relaxed text-fg-2">{t.about.body}</p>
            </Reveal>

            <ul className="grid gap-4 sm:grid-cols-2">
              {t.about.pillars.map((p, i) => {
                const Icon = icons[i] ?? UserRound
                return (
                  <Reveal as="li" key={p.title} delay={i * 70} className="card-surface p-5">
                    <Icon className="mb-3 size-6 text-accent" aria-hidden="true" />
                    <h3 className="text-[0.95rem] font-semibold text-fg">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{p.text}</p>
                  </Reveal>
                )
              })}
            </ul>
          </div>

          {/* Widget tipo archivo de configuración (Stitch) con datos reales */}
          <Reveal className="card-surface overflow-hidden lg:col-span-5" delay={120}>
            <div className="flex items-center justify-between border-b border-line bg-card-hi px-4 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <i className="size-2.5 rounded-full bg-fg-3/40" />
                <i className="size-2.5 rounded-full bg-fg-3/40" />
                <i className="size-2.5 rounded-full bg-fg-3/40" />
              </span>
              <span className="mono-label text-[0.68rem] tracking-normal text-fg-2 normal-case">jose-mendez-ramos.ts</span>
            </div>
            <pre className="overflow-x-auto bg-bg p-5 font-mono text-[0.78rem] leading-7 text-fg-2" aria-label={t.about.codeLabel}>
              <code>
                <span className="text-accent-soft">const</span> <span className="text-fg">developer</span> = {'{'}
                {'\n  '}name: {quote(site.owner)},
                {'\n  '}studio: {quote(site.brand)},
                {'\n  '}role: {quote('Software Developer')},
                {'\n  '}focus: [{t.about.focus.map((f, i) => (
                  <span key={f}>
                    {i > 0 && ', '}
                    {quote(f)}
                  </span>
                ))}],
                {'\n  '}projects: <span className="text-wip">{projectStats.total}</span>,
                {'\n  '}inProduction: <span className="text-wip">{projectStats.production}</span>,
                {'\n  '}building: <span className="text-wip">{projectStats.development}</span>,
                {'\n}'};
              </code>
            </pre>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
