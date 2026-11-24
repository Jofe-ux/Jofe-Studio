import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import { getContactChannels } from '@/lib/contact'

/** Botón flotante de WhatsApp. No aparece si no hay WhatsApp configurado, ni sobre el pie de página. */
export function WhatsAppButton() {
  const { t, lang } = useI18n()
  const channel = getContactChannels(lang).find((c) => c.id === 'whatsapp')
  const [scrolled, setScrolled] = useState(false)
  const [overFooter, setOverFooter] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setOverFooter(entry?.isIntersecting ?? false))
    io.observe(footer)
    return () => io.disconnect()
  }, [])

  if (!channel) return null
  const visible = scrolled && !overFooter

  return (
    <a
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.contact.fab}
      title={t.contact.fab}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-4 bottom-4 z-40 grid size-[3.25rem] place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_28px_-8px_rgb(37_211_102/0.7)] transition-all duration-300 hover:scale-105 sm:right-6 sm:bottom-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <MessageCircle className="size-6" aria-hidden="true" />
      <span className="sr-only">{t.a11y.newTab}</span>
    </a>
  )
}
