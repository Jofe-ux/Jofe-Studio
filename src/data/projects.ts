import type { Project } from '@/types/project'
import apuntesya from '@/assets/images/projects/apuntesya.webp'
import complejoJya from '@/assets/images/projects/complejo-jya.webp'
import pedilo from '@/assets/images/projects/pedilo.webp'
import thivasa from '@/assets/images/projects/thivasa.webp'

/**
 * Para AGREGAR un proyecto: añade un objeto a esta lista (el carrusel se ajusta solo).
 * Cada texto lleva español e inglés.
 *
 * `image` es una captura REAL de página completa (1440 px de ancho). Con `imageScrolls: true`
 * la tarjeta la desplaza al pasar el cursor (vista previa viva).
 *
 * `technologies`: solo tecnologías con evidencia en el código del proyecto y aprobadas por
 * Jose (ver docs/TECNOLOGIAS.md). Si no hay evidencia, se deja sin definir y la tarjeta no
 * muestra etiquetas.
 */
export const projects: readonly Project[] = [
  {
    id: 'apuntesya',
    slug: 'apuntesya',
    name: 'ApuntesYA',
    category: { es: 'Educación / Plataforma web', en: 'Education / Web platform' },
    description: {
      es: 'Plataforma educativa para compartir, consultar y descargar apuntes universitarios, facilitando el acceso a materiales académicos.',
      en: 'Educational platform to share, browse and download university notes, making academic material easier to access.',
    },
    image: apuntesya,
    imageScrolls: true,
    imageAlt: {
      es: 'Captura de la página principal de ApuntesYA, con el buscador de apuntes universitarios',
      en: 'Screenshot of the ApuntesYA home page, showing the university notes search',
    },
    technologies: ['Next.js', 'React', 'TypeScript', 'PostgreSQL'],
    status: 'production',
    url: 'https://apuntesya-cgc9.onrender.com/',
    featured: true,
  },
  {
    id: 'complejo-jya',
    slug: 'complejo-deportivo-jya',
    name: 'Complejo Deportivo JyA',
    category: { es: 'Reservas / Gestión deportiva', en: 'Bookings / Sports management' },
    description: {
      es: 'Sistema web para gestionar reservas de instalaciones deportivas, consultar disponibilidad y administrar solicitudes de reserva.',
      en: 'Web system to manage sports facility bookings, check availability and handle booking requests.',
    },
    image: complejoJya,
    imageScrolls: true,
    imageAlt: {
      es: 'Captura de la página principal del Complejo Deportivo JyA para reservar canchas',
      en: 'Screenshot of the Complejo Deportivo JyA home page for booking courts',
    },
    technologies: ['React', 'TypeScript', 'Django', 'PostgreSQL'],
    status: 'production',
    url: 'https://complejo-jya.vercel.app/',
    featured: true,
  },
  {
    id: 'pedilo',
    slug: 'pedilo',
    name: 'Pedilo',
    category: { es: 'Comercio digital / Gestión de pedidos', en: 'Digital commerce / Order management' },
    description: {
      es: 'Plataforma orientada a pequeños negocios que permite presentar productos mediante catálogos digitales y gestionar pedidos.',
      en: 'Platform for small businesses to showcase products through digital catalogs and manage orders.',
    },
    image: pedilo,
    imageScrolls: true,
    imageAlt: {
      es: 'Captura de la página principal de Pedilo, con un ejemplo de catálogo y pedido',
      en: 'Screenshot of the Pedilo home page, with a sample catalog and order',
    },
    technologies: ['Next.js', 'React', 'TypeScript'],
    status: 'production',
    url: 'https://pedilo-beige.vercel.app/',
    featured: true,
  },
  {
    id: 'thivasa',
    slug: 'thivasa',
    name: 'Thivasa',
    category: { es: 'E-commerce / Comercio electrónico', en: 'E-commerce / Online store' },
    description: {
      es: 'Tienda online especializada en calzados femeninos, diseñada para ofrecer una experiencia digital de presentación y compra de productos.',
      en: "Online store specialized in women's footwear, designed to offer a digital experience for browsing and buying products.",
    },
    image: thivasa,
    imageScrolls: true,
    imageAlt: {
      es: 'Captura de la página principal de la tienda online Thivasa, calzados femeninos',
      en: "Screenshot of the Thivasa online store home page, women's footwear",
    },
    technologies: ['React', 'TypeScript', 'Django'],
    status: 'production',
    url: 'https://thivasa.com/',
    featured: true,
  },
  {
    id: 'restos',
    slug: 'restos',
    name: 'RestOS',
    category: { es: 'Restaurantes / Gestión empresarial', en: 'Restaurants / Business management' },
    description: {
      es: 'Sistema de gestión para restaurantes: pedidos, mesas y control del negocio en un solo lugar.',
      en: 'Restaurant management system: orders, tables and business control in one place.',
    },
    technologies: ['React', 'TypeScript', 'Django', 'PostgreSQL'],
    status: 'development',
    badge: 'PRÓXIMAMENTE',
    featured: true,
  },
]

export const projectStats = {
  total: projects.length,
  production: projects.filter((p) => p.status === 'production').length,
  development: projects.filter((p) => p.status === 'development').length,
}
