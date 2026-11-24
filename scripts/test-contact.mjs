// Prueba de la lógica de contacto: canales vacíos/ inválidos no deben aparecer. Uso: node scripts/test-contact.mjs
import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'silent',
  configFile: false,
  esbuild: { jsx: 'automatic' },
  resolve: { alias: { '@': fileURLToPath(new URL('../src', import.meta.url)) } },
})
const { site } = await vite.ssrLoadModule('/src/config/site.ts')
const { getContactChannels } = await vite.ssrLoadModule('/src/lib/contact.ts')

const reset = () => Object.assign(site.contact, { email: '', github: '', linkedin: '', whatsapp: '' })

reset()
assert.equal(getContactChannels().length, 0, 'sin configurar → ningún canal')

Object.assign(site.contact, { email: 'no-es-correo', github: 'javascript:alert(1)', linkedin: 'http://inseguro.com', whatsapp: '12ab' })
assert.equal(getContactChannels().length, 0, 'valores inválidos o inseguros se ignoran')

Object.assign(site.contact, { email: 'hola@ejemplo.com', github: 'https://github.com/ejemplo', linkedin: 'https://www.linkedin.com/in/ejemplo', whatsapp: '59170000000' })
const ids = getContactChannels().map((c) => c.id).sort()
assert.deepEqual(ids, ['email', 'github', 'linkedin', 'whatsapp'])
assert.ok(getContactChannels().find((c) => c.id === 'whatsapp').href.startsWith('https://wa.me/59170000000?text='))

reset()
await vite.close()
console.log('contacto: 3/3 pruebas correctas')
