import { projects } from '@/data/projects'
import { useI18n } from '@/i18n/I18nProvider'
import { ProjectsCarousel } from '@/components/ProjectsCarousel'
import { Reveal } from '@/components/Reveal'
import { SectionTitle } from '@/components/SectionTitle'

export function Projects() {
  const { t } = useI18n()
  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="container-page py-20 sm:py-24">
      <SectionTitle
        id="proyectos-title"
        eyebrow={t.projects.eyebrow}
        title={t.projects.title}
        description={t.projects.description}
      />
      <Reveal>
        <ProjectsCarousel projects={projects} />
      </Reveal>
    </section>
  )
}
