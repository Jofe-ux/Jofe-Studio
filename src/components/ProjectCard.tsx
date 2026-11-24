import { ArrowUpRight, Hammer } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import { pick } from '@/i18n/types'
import type { Project } from '@/types/project'
import { BrowserMockup } from './BrowserMockup'

function StatusBadge({ status }: { status: Project['status'] }) {
  const { t } = useI18n()
  const prod = status === 'production'
  return (
    <span
      className={`mono-label inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[0.65rem] ${
        prod ? 'border-ok/30 bg-ok/10 text-ok' : 'border-wip/40 bg-wip/10 text-wip'
      }`}
    >
      <span className="relative flex size-1.5">
        {prod && <span className="ping-soft absolute inline-flex size-full rounded-full bg-ok opacity-70" />}
        <span className={`relative inline-flex size-1.5 rounded-full ${prod ? 'bg-ok' : 'bg-wip'}`} />
      </span>
      {prod ? t.projects.production : t.projects.development}
    </span>
  )
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, lang } = useI18n()
  const number = String(index + 1).padStart(2, '0')
  const dev = project.status === 'development'
  const address = project.status === 'production' ? new URL(project.url).host : undefined
  const alt = project.imageAlt ? pick(project.imageAlt, lang) : project.name

  return (
    <article
      id={`proyecto-${project.slug}`}
      className={`card-surface group flex h-full scroll-mt-24 flex-col overflow-hidden ${dev ? 'border-dashed' : ''}`}
    >
      <div className="p-3 sm:p-4">
        <div className="transition-transform duration-500 group-hover:scale-[1.015]">
          <BrowserMockup src={project.image} alt={alt} address={address} construction={dev} name={project.name} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 pb-5 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <span className="mono-label text-[0.68rem] text-fg-3">
            <span className="text-accent">{number}</span> / {pick(project.category, lang)}
          </span>
          <StatusBadge status={project.status} />
        </div>

        <h3 className="flex flex-wrap items-center gap-2.5 text-xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent-soft">
          {project.name}
          {project.status === 'development' && (
            <span className="mono-label rounded border border-wip/40 bg-wip/10 px-2 py-0.5 text-[0.62rem] text-wip">
              {t.projects.comingSoon}
            </span>
          )}
        </h3>

        <p className="text-sm leading-relaxed text-fg-2">{pick(project.description, lang)}</p>

        {project.technologies && project.technologies.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label={t.projects.techOf(project.name)}>
            {project.technologies.map((tech) => (
              <li key={tech} className="mono-label rounded border border-accent/20 bg-card-hi px-2 py-0.5 text-[0.68rem] tracking-normal text-accent-soft normal-case">
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-2">
          {project.status === 'production' ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary group/btn !min-h-10 w-full !py-2 sm:w-auto">
              {t.projects.view}
              <ArrowUpRight className="size-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden="true" />
              <span className="sr-only"> {t.projects.opensIn(project.name)}</span>
            </a>
          ) : (
            <p className="mono-label inline-flex items-center gap-2 text-[0.68rem] text-fg-3">
              <Hammer className="size-4 shrink-0 text-wip" aria-hidden="true" />
              {t.projects.noDemo}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
