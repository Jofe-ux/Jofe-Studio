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
    // HTML estático para buscadores en español; en el navegador se actualiza según el idioma elegido.
    SEO_TITLE: site.seo.title.es,
    SEO_DESCRIPTION: site.seo.description.es,
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
    // robots.txt siempre; sitemap.xml cuando se conoce el dominio (SITE_URL o el de Vercel).
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`,
      })
      if (siteUrl) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc></url>\n</urlset>\n`,
        })
      }
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
