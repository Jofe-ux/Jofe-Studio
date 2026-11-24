// Sirve ./dist aplicando las MISMAS cabeceras de vercel.json, para comprobar que la CSP no rompe nada.
// Uso: npm run build && npm run preview:headers   (puerto 4180)
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../dist/', import.meta.url))
const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'))
const globalHeaders = config.headers.find((h) => h.source === '/(.*)')?.headers ?? []
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' }

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost')
  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, '') || 'index.html'
  try {
    const body = await readFile(join(root, rel))
    for (const { key, value } of globalHeaders) res.setHeader(key, value)
    res.setHeader('Content-Type', types[extname(rel)] ?? 'application/octet-stream')
    res.end(body)
  } catch {
    res.statusCode = 404
    res.end('404')
  }
}).listen(4180, () => console.log('dist con cabeceras de vercel.json en http://localhost:4180'))
