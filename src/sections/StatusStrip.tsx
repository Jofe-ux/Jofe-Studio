import type { MouseEvent } from 'react'
import { FOCUS_PROJECT_EVENT } from '@/components/ProjectsCarousel'
import { projects } from '@/data/projects'
import { useI18n } from '@/i18n/I18nProvider'

/** Indicadores generales: estado real de cada proyecto, con enlace a su tarjeta en el carrusel. */
export function StatusStrip() {
  const { t } = useI18n()

  const open = (e: MouseEvent, slug: string) => {
    e.preventDefault()
    document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.dispatchEvent(new CustomEvent(FOCUS_PROJECT_EVENT, { detail: slug }))
  }

  return (
    <section aria-label={t.status.label} className="border-y border-line bg-bg-2/70">
      <div className="container-page py-4">
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs text-fg-2">
          {projects.map((p) => {
            const prod = p.status === 'production'
            return (
              <li key={p.id}>
                <a
                  href={`#proyecto-${p.slug}`}
                  onClick={(e) => open(e, p.slug)}
                  className="inline-flex items-center gap-2 rounded px-1 py-1 transition-colors hover:text-fg"
                >
                  <span className={`size-1.5 rounded-full ${prod ? 'bg-ok' : 'bg-wip'}`} aria-hidden="true" />
                  <span className="text-fg">{p.name}</span>
                  <span className="text-fg-3">{prod ? t.status.production : t.status.development}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
