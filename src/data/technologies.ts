import { Code2, Database, LayoutTemplate, Server, Wrench, type LucideIcon } from 'lucide-react'

export interface TechCategory {
  id: string
  title: string
  caption: string
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
    title: 'Lenguajes',
    caption: 'Base de programación',
    icon: Code2,
    span: 3,
    items: ['Java', 'JavaScript', 'TypeScript', 'Python', 'C++', 'Rust'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    caption: 'Interfaces web',
    icon: LayoutTemplate,
    span: 3,
    items: ['HTML', 'CSS', 'React', 'Bootstrap'],
  },
  {
    id: 'backend',
    title: 'Backend',
    caption: 'Servidores y APIs',
    icon: Server,
    span: 2,
    items: ['Spring Boot', 'Django', 'Node.js', 'REST APIs'],
  },
  {
    id: 'bases-de-datos',
    title: 'Bases de datos',
    caption: 'Persistencia',
    icon: Database,
    span: 2,
    items: ['MySQL', 'PostgreSQL', 'SQL Server'],
  },
  {
    id: 'herramientas',
    title: 'Herramientas',
    caption: 'Flujo de trabajo',
    icon: Wrench,
    span: 2,
    items: ['Git', 'GitHub', 'Docker'],
  },
]
