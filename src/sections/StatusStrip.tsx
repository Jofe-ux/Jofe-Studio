import { projects } from '@/data/projects'

/** Indicadores generales: estado real de cada proyecto, con enlace a su tarjeta. */
export function StatusStrip() {
  return (
    <section aria-label="Estado de los proyectos" className="border-y border-line bg-bg-2/70">
      <div className="container-page py-4">
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs text-fg-2">
          {projects.map((p) => {
            const prod = p.status === 'production'
            return (
              <li key={p.id}>
                <a href={`#proyecto-${p.slug}`} className="inline-flex items-center gap-2 rounded px-1 py-1 transition-colors hover:text-fg">
                  <span className={`size-1.5 rounded-full ${prod ? 'bg-ok' : 'bg-wip'}`} aria-hidden="true" />
                  <span className="text-fg">{p.name}</span>
                  <span className="text-fg-3">{prod ? 'en producción' : 'en desarrollo'}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
