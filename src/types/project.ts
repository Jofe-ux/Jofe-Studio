/** Solo se aceptan enlaces https. */
export type HttpsUrl = `https://${string}`

interface ProjectBase {
  id: string
  slug: string
  name: string
  category: string
  description: string
  /** Captura real (importada con Vite). Si falta, se muestra un placeholder. */
  image?: string
  imageAlt?: string
  /** Solo tecnologías verificadas y aprobadas. Vacío = no se muestra nada. */
  technologies?: readonly string[]
  featured: boolean
}

/** En producción: la URL es OBLIGATORIA. */
export interface ProductionProject extends ProjectBase {
  status: 'production'
  url: HttpsUrl
}

/** En desarrollo: NO puede recibir URL (error de compilación si se intenta). */
export interface DevelopmentProject extends ProjectBase {
  status: 'development'
  url?: never
  badge: 'PRÓXIMAMENTE'
}

export type Project = ProductionProject | DevelopmentProject
