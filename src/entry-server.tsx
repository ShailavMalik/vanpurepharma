import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './App'
import { productPath, products } from './data/products'

/** Every URL the prerender step writes to disk. */
export const routes = ['/', '/products', ...products.map(productPath), '/about', '/404']

/**
 * Renders one route to HTML for the prerender step. React 19 hoists <title>,
 * <meta> and <link> to the front of the string; scripts/prerender.ts moves them
 * into <head>.
 */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
