import { ArrowDown, MessageSquare } from 'lucide-react'
import { site } from '@/config/site'
import { projectStats } from '@/data/projects'
import { useI18n } from '@/i18n/I18nProvider'
import { pick } from '@/i18n/types'
import portrait from '@/assets/images/portrait.webp'

const pad = (n: number) => String(n).padStart(2, '0')

export function Hero() {
  const { t, lang } = useI18n()
  const indicators = [
    { value: projectStats.total, label: t.hero.indicators.total },
    { value: projectStats.production, label: t.hero.indicators.production },
    { value: projectStats.development, label: t.hero.indicators.development },
  ]

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      {/* Brillos ambientales sutiles (Stitch) */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/4 size-96 rounded-full bg-accent/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute top-1/3 -right-24 size-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col items-start gap-6 lg:col-span-7">
          <span className="mono-label inline-flex items-center gap-2.5 rounded-full border border-line bg-card px-3.5 py-1.5 text-accent shadow-sm">
            <span className="relative flex size-2">
              <span className="ping-soft absolute inline-flex size-full rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {site.badge}
          </span>

          <div className="space-y-3">
            <h1 id="hero-title" className="text-[2.25rem] leading-[1.12] font-bold tracking-[-0.025em] text-fg sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
              {pick(site.hero.greeting, lang)} <span className="text-accent">{site.owner}.</span>
            </h1>
            <p className="text-xl font-medium tracking-tight text-fg-2 sm:text-2xl">{pick(site.hero.headline, lang)}</p>
          </div>

          <p className="max-w-xl text-base leading-relaxed text-fg-2 sm:text-lg">{pick(site.hero.description, lang)}</p>

          <div className="flex w-full flex-col gap-3 pt-1 sm:w-auto sm:flex-row">
            <a href="#proyectos" className="btn btn-primary">
              {t.hero.explore}
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <a href="#contacto" className="btn btn-secondary">
              <MessageSquare className="size-4 text-accent" aria-hidden="true" />
              {t.hero.contact}
            </a>
          </div>

          <dl className="mt-4 grid w-full max-w-xl grid-cols-3 gap-3 border-t border-line pt-6">
            {indicators.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <dt className="order-2 text-[0.75rem] leading-snug text-fg-3 sm:text-[0.8125rem]">{item.label}</dt>
                <dd className="order-1 font-mono text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{pad(item.value)}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Retrato con fondo transparente */}
        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[27rem] lg:col-span-5 lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-[-8%] rounded-full bg-[radial-gradient(closest-side,var(--portrait-glow),transparent_75%)] blur-2xl"
          />
          {/* La sombra va en el contenedor: si estuviera en la <img>, la máscara la recortaría en forma de caja. */}
          <div className="relative drop-shadow-[0_24px_36px_var(--portrait-shadow)]">
            <img
              src={portrait}
              alt={t.hero.portraitAlt(site.owner)}
              width={1100}
              height={1059}
              decoding="async"
              fetchPriority="high"
              className="h-auto w-full object-contain [mask-image:linear-gradient(to_bottom,#000_84%,transparent_100%)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
