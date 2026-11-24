import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navigation, site } from '@/config/site'
import { useActiveSection } from '@/hooks/useActiveSection'

const ids = navigation.map((n) => n.id)

export function Navbar() {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menú móvil: bloquea el scroll, cierra con Escape y devuelve el foco al botón.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        scrolled || open ? 'border-line/70 bg-bg/85' : 'border-transparent bg-bg/40'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <a href="#inicio" className="flex flex-col leading-none" aria-label={`${site.brand}, ir al inicio`}>
          <span className="text-[1.05rem] font-bold tracking-[0.04em] text-fg">{site.wordmark}</span>
          <span className="mono-label mt-1 hidden text-[0.62rem] text-accent sm:block">{site.owner}</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`rounded-md px-3 py-1.5 text-[0.8125rem] font-medium transition-colors ${
                  isActive ? 'bg-accent/15 text-accent-soft' : 'text-fg-2 hover:bg-white/5 hover:text-fg'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contacto" className="btn btn-primary !min-h-10 !px-4 !py-2">
            Hablemos
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-fg transition-colors hover:border-accent lg:hidden"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-movil" ref={panelRef} className="border-t border-line/70 bg-bg lg:hidden">
          <nav aria-label="Menú móvil" className="container-page flex flex-col gap-1 py-4">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? 'true' : undefined}
                className={`flex min-h-12 items-center rounded-lg px-4 text-base font-medium ${
                  active === item.id ? 'bg-accent/15 text-accent-soft' : 'text-fg-2 active:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
