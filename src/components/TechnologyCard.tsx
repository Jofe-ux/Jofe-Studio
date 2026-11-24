import type { TechCategory } from '@/data/technologies'
import { Reveal } from './Reveal'

const spans = { 2: 'lg:col-span-2', 3: 'lg:col-span-3' } as const

export function TechnologyCard({ category, index }: { category: TechCategory; index: number }) {
  const Icon = category.icon
  return (
    <Reveal as="article" delay={(index % 3) * 80} className={`card-surface p-6 ${spans[category.span]}`}>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-accent/10 text-accent">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-base font-semibold text-fg">{category.title}</h3>
          <p className="mono-label text-[0.68rem] text-fg-3">{category.caption}</p>
        </div>
      </div>
      <ul className="flex flex-wrap gap-2">
        {category.items.map((item) => (
          <li
            key={item}
            className="rounded-md border border-line bg-bg px-3 py-1.5 font-mono text-[0.78rem] text-fg transition-colors hover:border-accent/50 hover:text-accent-soft"
          >
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
