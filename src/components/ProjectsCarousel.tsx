import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import type { Project } from '@/types/project'
import { ProjectCard } from './ProjectCard'

/** Segundos entre avances automáticos. */
const AUTOPLAY_MS = 5000
export const FOCUS_PROJECT_EVENT = 'focus-project'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function ProjectsCarousel({ projects }: { projects: readonly Project[] }) {
  const { t } = useI18n()
  const trackRef = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)
  const [playing, setPlaying] = useState(() => !prefersReducedMotion())
  const [hovering, setHovering] = useState(false)
  const [focusing, setFocusing] = useState(false)
  const [touching, setTouching] = useState(false)

  /** Paso entre tarjetas y cuántas hay visibles (1, 2 o 3 según el ancho). */
  const measure = useCallback(() => {
    const track = trackRef.current
    const first = track?.children[0] as HTMLElement | undefined
    if (!track || !first) return null
    const second = track.children[1] as HTMLElement | undefined
    const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth
    const gap = step - first.offsetWidth
    const visible = Math.max(1, Math.round((track.clientWidth + gap) / step))
    return { step, max: Math.max(0, track.children.length - visible) }
  }, [])

  const goTo = useCallback(
    (target: number) => {
      const m = measure()
      const track = trackRef.current
      if (!m || !track) return
      const clamped = Math.min(Math.max(target, 0), m.max)
      track.scrollTo({ left: clamped * m.step, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    },
    [measure],
  )

  const next = useCallback(() => goTo(index >= maxIndex ? 0 : index + 1), [goTo, index, maxIndex])
  const prev = useCallback(() => goTo(index <= 0 ? maxIndex : index - 1), [goTo, index, maxIndex])

  // Sincroniza el índice con el scroll real (flechas, gestos táctiles o teclado)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const sync = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const m = measure()
        if (!m) return
        setMaxIndex(m.max)
        setIndex(Math.min(m.max, Math.round(track.scrollLeft / m.step)))
      })
    }
    sync()
    track.addEventListener('scroll', sync, { passive: true })
    const ro = new ResizeObserver(sync)
    ro.observe(track)
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', sync)
      ro.disconnect()
    }
  }, [measure, projects.length])

  // Avance automático: se reinicia en cada cambio y se pausa al interactuar
  const paused = hovering || focusing || touching
  useEffect(() => {
    if (!playing || paused || maxIndex === 0) return
    const id = window.setTimeout(next, AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  }, [playing, paused, maxIndex, next])

  // La barra de estado puede pedir ir a un proyecto concreto
  useEffect(() => {
    const onFocusProject = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail
      const i = projects.findIndex((p) => p.slug === slug)
      if (i >= 0) goTo(i)
    }
    window.addEventListener(FOCUS_PROJECT_EVENT, onFocusProject)
    return () => window.removeEventListener(FOCUS_PROJECT_EVENT, onFocusProject)
  }, [goTo, projects])

  const onKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    }
  }

  const production = projects.filter((p) => p.status === 'production').length
  const iconBtn =
    'inline-flex size-10 items-center justify-center rounded-lg border border-line bg-card text-fg transition-colors hover:border-accent hover:bg-card-hi disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t.projects.carouselLabel}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={(e) => e.target.matches(':focus-visible') && setFocusing(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocusing(false)}
      onTouchStart={() => setTouching(true)}
      onTouchEnd={() => window.setTimeout(() => setTouching(false), 4000)}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="mono-label text-fg-3">{t.projects.meta(projects.length, production)}</span>
        <div className="flex items-center gap-2">
          <button type="button" className={iconBtn} onClick={() => setPlaying((v) => !v)} aria-label={playing ? t.projects.pause : t.projects.play}>
            {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
          </button>
          <button type="button" className={iconBtn} onClick={prev} disabled={maxIndex === 0} aria-label={t.projects.prev}>
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button type="button" className={iconBtn} onClick={next} disabled={maxIndex === 0} aria-label={t.projects.next}>
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="carousel-track rounded-xl focus-visible:outline-offset-8"
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-live={playing && !paused ? 'off' : 'polite'}
      >
        {projects.map((project, i) => (
          <li
            key={project.id}
            className="carousel-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={t.projects.slide(i + 1, projects.length)}
          >
            <ProjectCard project={project} index={i} />
          </li>
        ))}
      </ul>

      {maxIndex > 0 && (
        <div className="mt-6 flex justify-center gap-2" role="group">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={t.projects.goTo(i + 1)}
              aria-current={i === index ? 'true' : undefined}
              className="grid h-6 min-w-6 place-items-center"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-accent' : 'w-1.5 bg-line hover:bg-fg-3'}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
