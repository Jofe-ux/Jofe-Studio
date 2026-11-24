import type { Project } from '@/types/project'
import apuntesya from '@/assets/images/projects/apuntesya.webp'
import complejoJya from '@/assets/images/projects/complejo-jya.webp'
import pedilo from '@/assets/images/projects/pedilo.webp'
import thivasa from '@/assets/images/projects/thivasa.webp'

/**
 * `technologies` se deja VACÍO a propósito: no se atribuyen tecnologías a un
 * proyecto sin aprobación (ver docs/TECNOLOGIAS.md con la evidencia hallada).
 * Para publicarlas, agrega p. ej. `technologies: ['React', 'TypeScript']`.
 */
export const projects: readonly Project[] = [
  {
    id: 'apuntesya',
    slug: 'apuntesya',
    name: 'ApuntesYA',
    category: 'Educación / Plataforma web',
    description:
      'Plataforma educativa para compartir, consultar y descargar apuntes universitarios, facilitando el acceso a materiales académicos.',
    image: apuntesya,
    imageAlt: 'Captura de la página principal de ApuntesYA, con el buscador de apuntes universitarios',
    status: 'production',
    url: 'https://apuntesya-cgc9.onrender.com/',
    featured: true,
  },
  {
    id: 'complejo-jya',
    slug: 'complejo-deportivo-jya',
    name: 'Complejo Deportivo JyA',
    category: 'Reservas / Gestión deportiva',
    description:
      'Sistema web para gestionar reservas de instalaciones deportivas, consultar disponibilidad y administrar solicitudes de reserva.',
    image: complejoJya,
    imageAlt: 'Captura de la página principal del Complejo Deportivo JyA para reservar canchas',
    status: 'production',
    url: 'https://complejo-jya.vercel.app/',
    featured: true,
  },
  {
    id: 'pedilo',
    slug: 'pedilo',
    name: 'Pedilo',
    category: 'Comercio digital / Gestión de pedidos',
    description:
      'Plataforma orientada a pequeños negocios que permite presentar productos mediante catálogos digitales y gestionar pedidos.',
    image: pedilo,
    imageAlt: 'Captura de la página principal de Pedilo, con un ejemplo de catálogo y pedido',
    status: 'production',
    url: 'https://pedilo-beige.vercel.app/',
    featured: true,
  },
  {
    id: 'thivasa',
    slug: 'thivasa',
    name: 'Thivasa',
    category: 'E-commerce / Comercio electrónico',
    description:
      'Tienda online especializada en calzados femeninos, diseñada para ofrecer una experiencia digital de presentación y compra de productos.',
    image: thivasa,
    imageAlt: 'Captura de la página principal de la tienda online Thivasa, calzados femeninos',
    status: 'production',
    url: 'https://thivasa.com/',
    featured: true,
  },
  {
    id: 'restos',
    slug: 'restos',
    name: 'RestOS',
    category: 'Restaurantes / Gestión empresarial',
    description:
      'Sistema de gestión para restaurantes: pedidos, mesas y control del negocio en un solo lugar.',
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
