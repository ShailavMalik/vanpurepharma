# Vanpure Pharma

Website for Vanpure Pharma: a static React site (Vite + Tailwind v4), prerendered per route, deployed on Vercel at https://vanpurepharma.com. Orders open a prefilled WhatsApp chat; nothing is charged on the site.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server at http://localhost:5173 |
| `npm run build` | Typecheck, client build, SSR build, then prerender every route into `dist/` |
| `npm run preview` | Serve `dist/` the way Vercel does (clean URLs, folder indexes, `404.html`) at http://localhost:4173 |
| `npm run lint` | oxlint |

## Where things live

- `src/data/products.ts`: the product (packs and prices, gallery, ingredients, FAQs). Adding a product here gives it a page, an ingredients page, prerendering and structured data.
- `src/data/home.ts`: offer banners, why-Vanpure cards, ordering steps, reels, home FAQs.
- `src/data/site.ts`: WhatsApp number, Instagram, domain, launch date, contact placeholders.
- `src/lib/whatsapp.ts`: builds the prefilled order message and `wa.me` link.
- `src/index.css`: design tokens (Mint Dawn palette, Bricolage Grotesque + Manrope) and the shared utilities (`btn-primary`, `card`, `tile`, `dark-card`, animations).
- `scripts/prerender.ts`: writes static HTML for each route after the build. Routes come from `src/entry-server.tsx`.
- `public/media/`: optimised images, posters and videos. Source files and the one-off tooling that produces them are kept outside the repo.

## Deploy

Vercel builds from `main` automatically: build command `npm run build`, output `dist`. `vercel.json` sets clean URLs, long cache headers for assets and media, security headers, and a redirect from `/products` to the product page. Unknown paths get `dist/404.html` with a real 404 status.
