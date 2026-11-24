import { Compass, Layers, Rocket, UserRound, type LucideIcon } from 'lucide-react'
import { site } from '@/config/site'
import { projectStats } from '@/data/projects'
import { Reveal } from '@/components/Reveal'
import { SectionTitle } from '@/components/SectionTitle'

interface Pillar {
  icon: LucideIcon
  title: string
  text: string
}

// Textos derivados del perfil oficial; no incluyen cifras, años ni logros no verificados.
const pillars: readonly Pillar[] = [
  { icon: UserRound, title: 'Perfil profesional', text: 'Desarrollador de software y responsable de Jofe Studio.' },
  { icon: Compass, title: 'Intereses tecnológicos', text: 'Aplicaciones web, plataformas y sistemas de gestión.' },
  { icon: Layers, title: 'Enfoque de trabajo', text: 'Resolver problemas reales mediante tecnología que aporte valor a personas y empresas.' },
  { icon: Rocket, title: 'Fortalezas', text: 'Participación en todo el ciclo: análisis, diseño, programación, implementación y mejora continua.' },
]

export function About() {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-title" className="border-y border-line bg-bg-2/60 py-20 sm:py-24">
      <div className="container-page">
        <SectionTitle id="sobre-mi-title" eyebrow="Sobre mí" title="Más allá del código." />

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-7">
            <Reveal className="card-surface space-y-4 p-6 sm:p-8">
              <p className="text-base leading-relaxed text-fg sm:text-lg">
                Soy <strong className="font-semibold text-accent-soft">{site.owner}</strong>, desarrollador de software y responsable de{' '}
                {site.brand}.
              </p>
              <p className="leading-relaxed text-fg-2">
                Me apasiona crear soluciones digitales que aporten valor a las personas y empresas. Disfruto participar en las diferentes
                etapas del desarrollo de software, desde el análisis y diseño hasta la programación, implementación y mejora continua.
              </p>
            </Reveal>

            <ul className="grid gap-4 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 70} className="card-surface p-5">
                  <p.icon className="mb-3 size-6 text-accent" aria-hidden="true" />
                  <h3 className="text-[0.95rem] font-semibold text-fg">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{p.text}</p>
                </Reveal>
              ))}
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
            <pre className="overflow-x-auto bg-bg p-5 font-mono text-[0.78rem] leading-7 text-fg-2" aria-label="Resumen del perfil en formato de código">
              <code>
                <span className="text-accent-soft">const</span> <span className="text-fg">developer</span> = {'{'}
                {'\n  '}name: <span className="text-ok">'{site.owner}'</span>,
                {'\n  '}studio: <span className="text-ok">'{site.brand}'</span>,
                {'\n  '}role: <span className="text-ok">'Software Developer'</span>,
                {'\n  '}focus: [<span className="text-ok">'web'</span>, <span className="text-ok">'plataformas'</span>, <span className="text-ok">'gestión'</span>],
                {'\n  '}projects: {'{'} total: <span className="text-wip">{projectStats.total}</span>, production: <span className="text-wip">{projectStats.production}</span>, building: <span className="text-wip">{projectStats.development}</span> {'}'},
                {'\n}'};
              </code>
            </pre>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
