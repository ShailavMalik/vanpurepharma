# Vanpure Pharma

Showcase and ordering site for Vanpure Pharma. Static React site (Vite + Tailwind v4), prerendered per route, hosted on Vercel. Orders open a prefilled WhatsApp chat; nothing is charged on the site.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server at http://localhost:5173 |
| `npm run build` | Typecheck, client build, SSR build, then prerender every route into `dist/` |
| `npm run preview` | Serve `dist/` the way Vercel does (clean URLs, folder indexes, `404.html`) at http://localhost:4173 |
| `npm run lint` | oxlint |
| `npm run assets` | Rebuild `public/` media from `_local/` (needs Python with Pillow, numpy, scipy) |

## Where things live

- `src/data/products.ts`: every product (copy, prices, ingredients, FAQs). Add a product here and it gets a card, a page, a sitemap entry and prerendering.
- `src/data/site.ts`: WhatsApp number, Instagram, domain, launch date, contact placeholders (email, address, FSSAI licence).
- `src/data/home.ts`: hero carousel slides, "why Vanpure", how-to-order steps, general FAQs.
- `src/lib/whatsapp.ts`: builds the prefilled order message and `wa.me` link.
- `scripts/prerender.ts`: writes static HTML for each route after the build. Routes come from `src/entry-server.tsx`.
- `scripts/prepare-assets.py`: cuts the pack shot out of its studio background, builds favicons, the OG image and resized media.
- `_local/`: source material (brochure, raw photos, videos). Gitignored.

## Deploy

Vercel, zero config: build command `npm run build`, output `dist`. `vercel.json` sets clean URLs, long cache headers for assets, and security headers. Unknown paths get `dist/404.html` with a real 404 status.

After the first deploy, attach `vanpurepharma.com` in the Vercel dashboard and add a `sitemap.xml` entry per new product route.
