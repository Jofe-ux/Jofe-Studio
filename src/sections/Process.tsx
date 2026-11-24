import { useI18n } from '@/i18n/I18nProvider'
import { Reveal } from '@/components/Reveal'
import { SectionTitle } from '@/components/SectionTitle'

export function Process() {
  const { t } = useI18n()
  return (
    <section id="proceso" aria-labelledby="proceso-title" className="border-y border-line bg-bg-2/60 py-20 sm:py-24">
      <div className="container-page">
        <SectionTitle
          id="proceso-title"
          align="center"
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          description={t.process.description}
        />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 80} className="card-surface relative p-6">
              <span className="font-mono text-3xl font-semibold tracking-tight text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span aria-hidden="true" className="mt-3 mb-4 block h-px w-10 bg-spark" />
              <h3 className="text-base font-semibold text-fg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
