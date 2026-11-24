import { projects, projectStats } from '@/data/projects'
import { ProjectCard } from '@/components/ProjectCard'
import { SectionTitle } from '@/components/SectionTitle'

// Composición editorial 7/5 → 5/7 → ancho completo para el proyecto en desarrollo.
const layouts = ['wide', 'narrow', 'narrow', 'wide'] as const

export function Projects() {
  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="container-page py-20 sm:py-24">
      <SectionTitle
        id="proyectos-title"
        eyebrow="Proyectos"
        title="Proyectos que llevan ideas a producción."
        description="Una selección de soluciones digitales que he diseñado y desarrollado para diferentes necesidades y sectores."
        aside={
          <span className="mono-label text-fg-3">
            {String(projectStats.total).padStart(2, '0')} casos · {String(projectStats.production).padStart(2, '0')} en producción
          </span>
        }
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            layout={project.status === 'development' ? 'full' : (layouts[i] ?? 'narrow')}
          />
        ))}
      </div>
    </section>
  )
}
