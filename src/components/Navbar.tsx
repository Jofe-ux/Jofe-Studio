import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navigation, site } from '@/config/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useI18n } from '@/i18n/I18nProvider'
import { LanguageToggle } from './LanguageToggle'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

const ids = navigation.map((n) => n.id)

export function Navbar() {
  const { t } = useI18n()
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
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#inicio" className="flex items-center gap-2.5" aria-label={t.a11y.goHome(site.brand)}>
          <Logo className="size-9 shrink-0" />
          <span className="flex flex-col leading-none whitespace-nowrap">
            <span className="text-[1.05rem] font-bold tracking-[0.04em] text-fg">{site.wordmark}</span>
            <span className="mono-label mt-1 hidden text-[0.62rem] text-accent sm:block">{site.owner}</span>
          </span>
        </a>

        <nav aria-label={t.a11y.mainNav} className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`rounded-md px-2.5 py-1.5 text-[0.8125rem] font-medium whitespace-nowrap transition-colors xl:px-3 ${
                  isActive ? 'bg-accent/15 text-accent-soft' : 'text-fg-2 hover:bg-fg/5 hover:text-fg'
                }`}
              >
                {t.nav[item.id]}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <a href="#contacto" className="btn btn-primary !hidden !min-h-10 !px-4 !py-2 whitespace-nowrap sm:!inline-flex lg:!hidden xl:!inline-flex">
            {t.cta.talk}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-line text-fg transition-colors hover:border-accent lg:hidden"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
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
          <nav aria-label={t.a11y.mobileNav} className="container-page flex flex-col gap-1 py-4">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? 'true' : undefined}
                className={`flex min-h-12 items-center rounded-lg px-4 text-base font-medium ${
                  active === item.id ? 'bg-accent/15 text-accent-soft' : 'text-fg-2 active:bg-fg/5'
                }`}
              >
                {t.nav[item.id]}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
