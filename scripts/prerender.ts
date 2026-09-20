/**
 * Renders each route to static HTML after the client and SSR builds.
 * Output: dist/index.html, dist/<route>/index.html, dist/404.html.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')
const serverDist = resolve(dist, 'server')

/** React 19 puts hoistable head tags before the app markup; split them off. */
function splitHead(rendered: string): { head: string; body: string } {
  const bodyStart = rendered.search(/<(?!title|meta|link)[a-z]/)
  return { head: rendered.slice(0, bodyStart), body: rendered.slice(bodyStart) }
}

function fileFor(url: string): string {
  if (url === '/') return 'index.html'
  if (url === '/404') return '404.html'
  return `${url.slice(1)}/index.html`
}

async function main() {
  const template = await readFile(resolve(dist, 'index.html'), 'utf8')
  const { render, routes } = (await import(pathToFileURL(resolve(serverDist, 'entry-server.js')).href)) as {
    render: (url: string) => string
    routes: string[]
  }

  for (const url of routes) {
    const { head, body } = splitHead(render(url))
    const html = template.replace('<!--app-head-->', head).replace('<!--app-html-->', body)
    const target = resolve(dist, fileFor(url))
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, html, 'utf8')
    console.log(`prerendered ${url} -> ${fileFor(url)} (${(html.length / 1024).toFixed(1)} KB)`)
  }

  await rm(serverDist, { recursive: true, force: true })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
