// Verifica que las URLs de proyectos en producción respondan. Uso: npm run check-links
import { readFile } from 'node:fs/promises'

const src = await readFile(new URL('../src/data/projects.ts', import.meta.url), 'utf8')
const urls = [...src.matchAll(/url:\s*'(https:\/\/[^']+)'/g)].map((m) => m[1])

let failed = 0
for (const url of urls) {
  try {
    const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(60_000), headers: { 'user-agent': 'link-check/1.0' } })
    const ok = res.status >= 200 && res.status < 400
    if (!ok) failed++
    console.log(`${ok ? 'OK  ' : 'FAIL'} ${res.status} ${url}`)
  } catch (e) {
    failed++
    console.log(`FAIL --- ${url} (${e instanceof Error ? e.message : e})`)
  }
}
console.log(`\n${urls.length - failed}/${urls.length} enlaces correctos`)
process.exit(failed ? 1 : 0)
