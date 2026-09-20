/**
 * Renders each route to static HTML after the client and SSR builds.
 * Output: dist/index.html, dist/about/index.html, dist/404.html.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')
const serverDist = resolve(dist, 'server')

const routes: { url: string; file: string }[] = [
  { url: '/', file: 'index.html' },
  { url: '/about', file: 'about/index.html' },
  { url: '/404', file: '404.html' },
]

/** React 19 puts hoistable head tags before the app markup; split them off. */
function splitHead(rendered: string): { head: string; body: string } {
  const bodyStart = rendered.indexOf('<main') >= 0 ? rendered.search(/<(?!title|meta|link)[a-z]/) : 0
  return { head: rendered.slice(0, bodyStart), body: rendered.slice(bodyStart) }
}

async function main() {
  const template = await readFile(resolve(dist, 'index.html'), 'utf8')
  const { render } = (await import(pathToFileURL(resolve(serverDist, 'entry-server.js')).href)) as {
    render: (url: string) => string
  }

  for (const route of routes) {
    const { head, body } = splitHead(render(route.url))
    const html = template.replace('<!--app-head-->', head).replace('<!--app-html-->', body)
    const target = resolve(dist, route.file)
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, html, 'utf8')
    console.log(`prerendered ${route.url} -> ${route.file} (${(html.length / 1024).toFixed(1)} KB)`)
  }

  await rm(serverDist, { recursive: true, force: true })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
