import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { site } from './src/config/site.ts'

/**
 * Dominio público del sitio (para URLs absolutas de Open Graph).
 * Prioridad: SITE_URL (manual) → dominio de producción que Vercel expone en el build → vacío (rutas relativas).
 */
function resolveSiteUrl(): string {
  const manual = process.env.SITE_URL?.trim()
  if (manual) return manual.replace(/\/+$/, '')
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  return vercel ? `https://${vercel}` : ''
}

/** Inyecta en index.html los textos SEO desde src/config/site.ts (una sola fuente de verdad). */
function siteMeta(): Plugin {
  const siteUrl = resolveSiteUrl()
  const values: Record<string, string> = {
    SEO_TITLE: site.seo.title,
    SEO_DESCRIPTION: site.seo.description,
    OWNER: site.owner,
    BRAND: site.brand,
    LOCALE: site.seo.locale,
    OG_IMAGE: `${siteUrl}${site.seo.ogImage}`,
  }
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      const out = html.replace(/%([A-Z_]+)%/g, (m, key: string) => values[key] ?? m)
      const tags: HtmlTagDescriptor[] = siteUrl
        ? [
            { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
            { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` }, injectTo: 'head' },
          ]
        : []
      return { html: out, tags }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteMeta()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    outDir: 'dist',
    // Nada se incrusta como data: URI, así la CSP puede mantenerse estricta.
    assetsInlineLimit: 0,
    sourcemap: false,
  },
})
