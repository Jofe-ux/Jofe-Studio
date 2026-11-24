import type { Localized } from '@/i18n/types'

/**
 * Configuración central de la marca. Todo lo que cambia con el tiempo vive aquí.
 * Los textos de interfaz (menús, botones, secciones) están en src/i18n/.
 *
 * Contacto: deja un canal en '' (vacío) y NO se mostrará en el sitio.
 * Un valor inválido también se ignora (ver src/lib/contact.ts).
 */
export const site = {
  brand: 'Jofe Studio',
  wordmark: 'JOFE STUDIO',
  owner: 'Jose Mendez Ramos',
  descriptor: 'Software Development & Digital Solutions',
  tagline: 'Jofe Studio — Software Development.',
  badge: 'JOFE STUDIO · SOFTWARE DEVELOPMENT',

  seo: {
    title: {
      es: 'Jofe Studio | Jose Mendez Ramos — Desarrollo de Software',
      en: 'Jofe Studio | Jose Mendez Ramos — Software Development',
    } satisfies Localized,
    description: {
      es: 'Jofe Studio desarrolla aplicaciones web, plataformas digitales y sistemas de gestión. Conoce nuestros proyectos y soluciones tecnológicas.',
      en: 'Jofe Studio builds web applications, digital platforms and management systems. Explore our projects and technology solutions.',
    } satisfies Localized,
    locale: 'es_BO',
    // Ruta dentro de /public. vite.config.ts la convierte en URL absoluta si hay dominio (ver README).
    ogImage: '/og-image.jpg',
  },

  hero: {
    greeting: { es: 'Hola, soy', en: "Hi, I'm" } satisfies Localized,
    headline: {
      es: 'Transformo ideas en soluciones digitales.',
      en: 'I turn ideas into digital solutions.',
    } satisfies Localized,
    description: {
      es: 'Desarrollo aplicaciones web, plataformas y sistemas de gestión enfocados en resolver problemas reales mediante tecnología.',
      en: 'I build web applications, platforms and management systems focused on solving real problems through technology.',
    } satisfies Localized,
  },

  /** Canales de contacto. Vacío = no se muestra. */
  contact: {
    email: 'josemendezje12@gmail.com',
    /** URL completa, ej.: 'https://github.com/tu-usuario' */
    github: 'https://github.com/Jofe-ux',
    /** URL completa, ej.: 'https://www.linkedin.com/in/tu-perfil' */
    linkedin: 'https://www.linkedin.com/in/jose-maria-mendez-ramos-777a2b378',
    /** Solo dígitos con código de país, ej.: '59170000000' */
    whatsapp: '59167582749',
    /** Mensaje inicial que se abre en WhatsApp */
    whatsappMessage: {
      es: 'Hola Jofe Studio, me gustaría conversar sobre un proyecto.',
      en: "Hi Jofe Studio, I'd like to talk about a project.",
    } satisfies Localized,
  },
} as const

export const navigation = [
  { id: 'inicio' },
  { id: 'proyectos' },
  { id: 'sobre-mi' },
  { id: 'tecnologias' },
  { id: 'proceso' },
  { id: 'contacto' },
] as const

export type SectionId = (typeof navigation)[number]['id']
