import { technologies } from '@/data/technologies'
import { useI18n } from '@/i18n/I18nProvider'
import { SectionTitle } from '@/components/SectionTitle'
import { TechnologyCard } from '@/components/TechnologyCard'

export function Technologies() {
  const { t } = useI18n()
  return (
    <section id="tecnologias" aria-labelledby="tecnologias-title" className="container-page py-20 sm:py-24">
      <SectionTitle
        id="tecnologias-title"
        align="center"
        eyebrow={t.tech.eyebrow}
        title={t.tech.title}
        description={t.tech.description}
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {technologies.map((category, i) => (
          <TechnologyCard key={category.id} category={category} index={i} />
        ))}
      </div>
    </section>
  )
}
