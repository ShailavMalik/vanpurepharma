import { site } from '../../data/site'

type JsonLdNode = Record<string, unknown>

interface SeoProps {
  title: string
  description: string
  /** Path starting with "/", used for the canonical and OG url. */
  path: string
  type?: 'website' | 'article' | 'product'
  jsonLd?: JsonLdNode | JsonLdNode[]
}

/** Merges nodes into one schema.org graph so a page emits a single script tag. */
function toGraph(nodes: JsonLdNode[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.map(({ '@context': _context, ...node }) => node),
  }
}

/**
 * Per-page document metadata. React 19 hoists <title>, <meta> and <link> into
 * <head> on the client and to the front of the server-rendered string.
 */
export function Seo({ title, description, path, type = 'website', jsonLd }: SeoProps) {
  const url = `${site.url}${path === '/' ? '/' : path}`
  const image = `${site.url}/og-image.jpg`
  const nodes = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {nodes.length > 0 && <script type="application/ld+json">{JSON.stringify(toGraph(nodes))}</script>}
    </>
  )
}
