/**
 * Configuración central de la marca. Todo lo que cambia con el tiempo vive aquí.
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
    title: 'Jofe Studio | Jose Mendez Ramos — Desarrollo de Software',
    description:
      'Jofe Studio desarrolla aplicaciones web, plataformas digitales y sistemas de gestión. Conoce nuestros proyectos y soluciones tecnológicas.',
    locale: 'es_BO',
    // Ruta dentro de /public. vite.config.ts la convierte en URL absoluta si hay dominio (ver README).
    ogImage: '/og-image.png',
  },

  hero: {
    greeting: 'Hola, soy',
    headline: 'Transformo ideas en soluciones digitales.',
    description:
      'Desarrollo aplicaciones web, plataformas y sistemas de gestión enfocados en resolver problemas reales mediante tecnología.',
  },

  /** Canales de contacto. Vacío = no se muestra. */
  contact: {
    /** Ej.: 'hola@tudominio.com' */
    email: 'josemendezje12@gmail.com',
    /** URL completa, ej.: 'https://github.com/tu-usuario' */
    github: 'https://github.com/Jofe-ux',
    /** URL completa, ej.: 'https://www.linkedin.com/in/tu-perfil' */
    linkedin: 'https://www.linkedin.com/in/jose-maria-mendez-ramos-777a2b378',
    /** Solo dígitos con código de país, ej.: '59170000000' */
    whatsapp: '59167582749',
    /** Mensaje inicial que se abre en WhatsApp */
    whatsappMessage: 'Hola Jofe Studio, me gustaría conversar sobre un proyecto.',
  },
} as const

export const navigation = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'tecnologias', label: 'Tecnologías' },
  { id: 'contacto', label: 'Contacto' },
] as const

export type SectionId = (typeof navigation)[number]['id']
