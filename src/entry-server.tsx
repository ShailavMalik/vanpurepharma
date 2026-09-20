import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './App'

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
