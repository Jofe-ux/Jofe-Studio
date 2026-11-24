import { ArrowUpRight, Hammer } from 'lucide-react'
import type { Project } from '@/types/project'
import { BrowserMockup } from './BrowserMockup'
import { Reveal } from './Reveal'

interface Props {
  project: Project
  index: number
  /** Distribución en el grid de 12 columnas (escritorio). */
  layout: 'wide' | 'narrow' | 'full'
}

const spans = {
  wide: 'lg:col-span-7',
  narrow: 'lg:col-span-5',
  full: 'lg:col-span-12',
} as const

function StatusBadge({ status }: { status: Project['status'] }) {
  const prod = status === 'production'
  return (
    <span
      className={`mono-label inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[0.68rem] ${
        prod ? 'border-ok/30 bg-ok/10 text-ok' : 'border-wip/40 bg-wip/10 text-wip'
      }`}
    >
      <span className="relative flex size-1.5">
        {prod && <span className="ping-soft absolute inline-flex size-full rounded-full bg-ok opacity-70" />}
        <span className={`relative inline-flex size-1.5 rounded-full ${prod ? 'bg-ok' : 'bg-wip'}`} />
      </span>
      {prod ? 'En producción' : 'En desarrollo'}
    </span>
  )
}

export function ProjectCard({ project, index, layout }: Props) {
  const number = String(index + 1).padStart(2, '0')
  const dev = project.status === 'development'
  const horizontal = layout === 'full'
  const address = project.status === 'production' ? new URL(project.url).host : undefined

  return (
    <Reveal
      as="article"
      id={`proyecto-${project.slug}`}
      delay={(index % 2) * 90}
      className={`${spans[layout]} card-surface group flex scroll-mt-24 flex-col overflow-hidden ${
        dev ? 'border-dashed' : ''
      } ${horizontal ? 'lg:grid lg:grid-cols-2 lg:items-center' : ''}`}
    >
      <div className={`p-4 sm:p-5 ${horizontal ? 'lg:p-8' : ''} ${dev ? 'lg:order-2' : ''}`}>
        <div className="transition-transform duration-500 group-hover:scale-[1.012]">
          <BrowserMockup
            src={project.image}
            alt={project.imageAlt ?? `Vista previa de ${project.name}`}
            address={address}
            construction={dev}
            name={project.name}
          />
        </div>
      </div>

      <div className={`flex flex-1 flex-col gap-4 px-5 pb-6 sm:px-6 ${horizontal ? 'lg:p-10 lg:pl-4' : ''} ${dev ? 'lg:order-1 lg:pl-10' : ''}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="mono-label text-fg-3">
            <span className="text-accent">{number}</span> / {project.category}
          </span>
          <StatusBadge status={project.status} />
        </div>

        <h3 className="flex flex-wrap items-center gap-3 text-2xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent-soft">
          {project.name}
          {project.status === 'development' && (
            <span className="mono-label rounded border border-wip/40 bg-wip/10 px-2 py-0.5 text-[0.65rem] text-wip">{project.badge}</span>
          )}
        </h3>

        <p className="text-[0.95rem] leading-relaxed text-fg-2">{project.description}</p>

        {project.technologies && project.technologies.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label={`Tecnologías de ${project.name}`}>
            {project.technologies.map((t) => (
              <li key={t} className="mono-label rounded border border-accent/20 bg-card-hi px-2 py-0.5 text-[0.7rem] tracking-normal text-accent-soft normal-case">
                {t}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-2">
          {project.status === 'production' ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary group/btn w-full sm:w-auto">
              Ver proyecto
              <ArrowUpRight className="size-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden="true" />
              <span className="sr-only"> (abre {project.name} en una pestaña nueva)</span>
            </a>
          ) : (
            <p className="mono-label inline-flex items-center gap-2 text-fg-3">
              <Hammer className="size-4 text-wip" aria-hidden="true" />
              En construcción · sin demo disponible
            </p>
          )}
        </div>
      </div>
    </Reveal>
  )
}
