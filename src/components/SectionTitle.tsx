import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface Props {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  id?: string
  aside?: ReactNode
}

export function SectionTitle({ eyebrow, title, description, align = 'left', id, aside }: Props) {
  const centered = align === 'center'
  return (
    <Reveal className={`mb-12 flex flex-col gap-4 md:mb-14 ${centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div className={`flex max-w-2xl flex-col gap-3 ${centered ? 'items-center' : ''}`}>
        <span className="mono-label text-accent">{`// ${eyebrow}`}</span>
        <h2 id={id} className="text-[1.75rem] leading-tight font-bold tracking-tight text-fg sm:text-4xl">
          {title}
        </h2>
        {description && <p className="text-[0.95rem] leading-relaxed text-fg-2 sm:text-base">{description}</p>}
      </div>
      {aside}
    </Reveal>
  )
}
