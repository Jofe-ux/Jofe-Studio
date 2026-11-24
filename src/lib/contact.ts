import type { ComponentType, SVGProps } from 'react'
import { Mail, MessageCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons'
import { site } from '@/config/site'
import { pick, type Lang } from '@/i18n/types'

type IconType = ComponentType<SVGProps<SVGSVGElement>>

export interface ContactChannel {
  id: 'email' | 'github' | 'linkedin' | 'whatsapp'
  /** Texto secundario; null = usar el texto traducido del diccionario (LinkedIn). */
  value: string | null
  href: string
  icon: IconType
  external: boolean
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^\d{8,15}$/
const isHttps = (v: string) => {
  try {
    return new URL(v).protocol === 'https:'
  } catch {
    return false
  }
}

/** Devuelve SOLO los canales configurados y válidos. Nada se inventa. */
export function getContactChannels(lang: Lang): ContactChannel[] {
  const c = site.contact
  const out: ContactChannel[] = []

  if (c.email && EMAIL.test(c.email)) {
    out.push({ id: 'email', value: c.email, href: `mailto:${c.email}`, icon: Mail, external: false })
  }
  if (c.whatsapp && PHONE.test(c.whatsapp)) {
    const text = encodeURIComponent(pick(c.whatsappMessage, lang))
    out.push({
      id: 'whatsapp',
      value: `+${c.whatsapp}`,
      href: `https://wa.me/${c.whatsapp}?text=${text}`,
      icon: MessageCircle,
      external: true,
    })
  }
  if (c.github && isHttps(c.github)) {
    out.push({ id: 'github', value: new URL(c.github).pathname.replace(/^\//, '') || 'GitHub', href: c.github, icon: GithubIcon, external: true })
  }
  if (c.linkedin && isHttps(c.linkedin)) {
    out.push({ id: 'linkedin', value: null, href: c.linkedin, icon: LinkedinIcon, external: true })
  }
  return out
}
