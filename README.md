# Jofe Studio — Portafolio

Portafolio estático de **Jofe Studio** (Software Development & Digital Solutions), de Jose Mendez Ramos.
React 19 + Vite + TypeScript + Tailwind CSS v4. Sin backend, base de datos ni formularios.

## Ejecutar

```powershell
npm install
npm run dev            # http://localhost:5173
npm run build          # typecheck + build en dist/
npm run preview:headers  # sirve dist/ con las cabeceras de vercel.json (http://localhost:4180)
npm test               # typecheck + prueba de contacto
npm run check-links    # comprueba que respondan las 4 URLs en producción
```

## Funciones del sitio

- **Tema claro/oscuro:** botón en la barra superior. Se guarda en el navegador (por defecto, oscuro). Los colores de ambos temas están en `src/styles/variables.css`.
- **Español/Inglés:** botón ES|EN. Se guarda en el navegador (por defecto, el idioma del navegador). También cambian el título y la descripción de la pestaña.
- **Carrusel de proyectos:** 3 tarjetas por fila en escritorio, 2 en tablet y 1 en móvil. Avanza solo cada 5 s (`AUTOPLAY_MS` en `ProjectsCarousel.tsx`), se pausa al pasar el cursor, al enfocar o al tocar, y tiene botón de pausa, flechas, puntos y teclas ←/→. Con "reducir movimiento" activado en el sistema no avanza solo.

- **Vista previa viva:** las capturas de los proyectos son de página completa y se desplazan al pasar el cursor (en pantallas táctiles y con "reducir movimiento" se queda la vista superior).
- **WhatsApp:** botón flotante y mini formulario que abre WhatsApp con el mensaje ya escrito (sin backend). No aparecen si no hay WhatsApp configurado.
- **SEO:** `robots.txt` y `sitemap.xml` se generan en el build con el dominio de Vercel (o `SITE_URL`).

## Qué editar (todo está centralizado)

| Qué | Dónde |
|---|---|
| Marca, textos del hero, SEO, **correo / GitHub / LinkedIn / WhatsApp** | `src/config/site.ts` |
| Proyectos (agregar uno = añadir un objeto; el carrusel se ajusta solo) | `src/data/projects.ts` |
| Textos de interfaz en español e inglés | `src/i18n/es.ts` y `src/i18n/en.ts` (deben tener la misma forma; TypeScript lo exige) |
| Tecnologías públicas | `src/data/technologies.ts` |
| **Colores y tipografías** | `src/styles/variables.css` |
| Capturas de proyectos | `src/assets/images/projects/*.webp` (1440 px de ancho, página completa; con `imageScrolls: true`) |
| Logo (monograma SVG) | `src/components/Logo.tsx` (barra y pie) y `public/favicon.svg` (pestaña) |
| Retrato | `src/assets/images/portrait.webp` (original en `_archivo/originales/`) |

- **Contacto:** un canal vacío en `site.ts` no se muestra. Los valores inválidos o que no sean `https` se ignoran.
- **Proyectos:** un proyecto `production` exige `url` (https); uno `development` no puede tener `url` (error de TypeScript).
- **Tecnologías por proyecto:** vacías a propósito hasta aprobarlas (nota de evidencia local en `docs/`, no se publica).
- **Iconos e imagen para compartir:** `public/` (`favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `og-image.jpg` de 1200×630 y < 300 KB).
- **Reemplazar una captura:** guarda el nuevo `.webp` con el mismo nombre. Si no hay imagen, se muestra un placeholder.

## Desplegar en Vercel

1. Sube el repositorio a GitHub e impórtalo en Vercel.
2. Vercel detecta Vite con `vercel.json`: `npm ci` → `npm run build` → carpeta `dist`.
3. No requiere variables de entorno.
4. La imagen para compartir (`og:image`) usa URL absoluta automáticamente con el dominio de producción de Vercel.
   Con dominio propio, define la variable `SITE_URL` (p. ej. `https://tu-dominio.com`) en Vercel.

## Seguridad

`vercel.json` aplica CSP estricta (`default-src 'self'`, sin scripts ni estilos en línea), HSTS, `X-Frame-Options`,
`nosniff`, `Referrer-Policy` y `Permissions-Policy`. Las fuentes se sirven localmente y los recursos nunca se incrustan
como `data:`. Esa configuración se verifica con `npm run preview:headers`.

## Material local (no publicado)

`_archivo/` (prototipo HTML anterior, retrato y logo originales), `stitch_jofe_studio_developer_portfolio/` y `docs/`
quedan en tu equipo y están en `.gitignore`.
