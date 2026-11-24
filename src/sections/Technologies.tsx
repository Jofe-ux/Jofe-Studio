import { technologies } from '@/data/technologies'
import { SectionTitle } from '@/components/SectionTitle'
import { TechnologyCard } from '@/components/TechnologyCard'

export function Technologies() {
  return (
    <section id="tecnologias" aria-labelledby="tecnologias-title" className="container-page py-20 sm:py-24">
      <SectionTitle
        id="tecnologias-title"
        align="center"
        eyebrow="Tecnologías"
        title="Tecnologías que impulsan nuestras soluciones."
        description="Lenguajes, frameworks y herramientas con las que diseñamos y construimos."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {technologies.map((category, i) => (
          <TechnologyCard key={category.id} category={category} index={i} />
        ))}
      </div>
    </section>
  )
}
