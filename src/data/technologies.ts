import { Code2, Database, LayoutTemplate, Server, Wrench, type LucideIcon } from 'lucide-react'
import type { Localized } from '@/i18n/types'

export interface TechCategory {
  id: string
  title: Localized
  caption: Localized
  icon: LucideIcon
  /** Columnas que ocupa en el grid de 6 columnas (escritorio). */
  span: 2 | 3
  items: readonly string[]
}

/**
 * Habilidades que se presentan públicamente (lista definida por Jose).
 * Es una lista de herramientas, NO un ranking: no se muestran niveles de dominio.
 */
export const technologies: readonly TechCategory[] = [
  {
    id: 'lenguajes',
    title: { es: 'Lenguajes', en: 'Languages' },
    caption: { es: 'Base de programación', en: 'Programming foundation' },
    icon: Code2,
    span: 3,
    items: ['Java', 'JavaScript', 'TypeScript', 'Python', 'C++', 'Rust'],
  },
  {
    id: 'frontend',
    title: { es: 'Frontend', en: 'Frontend' },
    caption: { es: 'Interfaces web', en: 'Web interfaces' },
    icon: LayoutTemplate,
    span: 3,
    items: ['HTML', 'CSS', 'React', 'Bootstrap'],
  },
  {
    id: 'backend',
    title: { es: 'Backend', en: 'Backend' },
    caption: { es: 'Servidores y APIs', en: 'Servers and APIs' },
    icon: Server,
    span: 2,
    items: ['Spring Boot', 'Django', 'Node.js', 'REST APIs'],
  },
  {
    id: 'bases-de-datos',
    title: { es: 'Bases de datos', en: 'Databases' },
    caption: { es: 'Persistencia', en: 'Persistence' },
    icon: Database,
    span: 2,
    items: ['MySQL', 'PostgreSQL', 'SQL Server'],
  },
  {
    id: 'herramientas',
    title: { es: 'Herramientas', en: 'Tools' },
    caption: { es: 'Flujo de trabajo', en: 'Workflow' },
    icon: Wrench,
    span: 2,
    items: ['Git', 'GitHub', 'Docker'],
  },
]
