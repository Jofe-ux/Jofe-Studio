/**
 * Pruebas de tipos (se verifican con `npm run typecheck`; este archivo no se importa).
 * Si alguna línea con @ts-expect-error DEJA de fallar, TypeScript lo reportará como error.
 */
import type { Project } from './project'

const base = { id: 'x', slug: 'x', name: 'X', category: 'c', description: 'd', featured: false } as const

export const okProduction: Project = { ...base, status: 'production', url: 'https://example.com' }
export const okDevelopment: Project = { ...base, status: 'development', badge: 'PRÓXIMAMENTE' }

// @ts-expect-error — un proyecto en producción exige URL
export const noUrl: Project = { ...base, status: 'production' }

// @ts-expect-error — un proyecto en desarrollo no puede tener enlace
export const devWithUrl: Project = { ...base, status: 'development', badge: 'PRÓXIMAMENTE', url: 'https://example.com' }

// @ts-expect-error — solo https
export const insecureUrl: Project = { ...base, status: 'production', url: 'http://example.com' }
