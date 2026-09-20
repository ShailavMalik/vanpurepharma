import { site } from '../../data/site'

interface SeoProps {
  title: string
  description: string
  /** Path starting with "/", used for the canonical and OG url. */
  path: string
  type?: 'website' | 'article' | 'product'
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Per-page document metadata. React 19 hoists <title>, <meta> and <link> into
 * <head> on the client and to the front of the server-rendered string.
 */
export function Seo({ title, description, path, type = 'website', jsonLd }: SeoProps) {
  const url = `${site.url}${path === '/' ? '/' : path}`
  const image = `${site.url}/og-image.jpg`
  const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

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
      {jsonLdList.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </>
  )
}
