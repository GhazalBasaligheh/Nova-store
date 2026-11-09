# NOVA Store

The public storefront of the NOVA online store, built for the NOVA Frontend (UI) Developer Technical Challenge.
It is a bilingual (Persian RTL / English LTR) Next.js App Router app with light and dark themes, a client-side
filterable product catalog, and a persistent cart, backed by [FakeStoreAPI](https://fakestoreapi.com).

The companion admin panel lives in a separate repository (NOVA Admin).

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Folder structure](#folder-structure)
- [Architecture](#architecture)
  - [Routing and internationalization](#routing-and-internationalization)
  - [Styling and theming](#styling-and-theming)
  - [API communication](#api-communication)
  - [Product data: server first, browser fallback](#product-data-server-first-browser-fallback)
  - [State management](#state-management)
  - [Forms and validation](#forms-and-validation)
  - [SEO](#seo)
- [FakeStoreAPI limitations and workarounds](#fakestoreapi-limitations-and-workarounds)
- [Currency](#currency)
- [Accessibility and responsiveness](#accessibility-and-responsiveness)
- [Assumptions](#assumptions)
- [Out of scope](#out-of-scope)
- [Known limitations](#known-limitations)
- [Time spent](#time-spent)

## Features

- **Home page:** hero with a "view products" call to action, category chips, product grid with equal-size cards
  (image, category, title, rating, price, add to cart), search, sorting (featured, price, name, rating) and
  pagination (6 per page). All list state lives in the URL, so it is shareable and survives a refresh.
- **Header:** logo, main links, category menu, search, language switch, theme toggle and a cart icon with a live
  item counter. Compact menu on mobile.
- **Cart page:** one row per product with image, unit price, quantity stepper (never below 1), row total and
  remove; order summary; clear cart; empty state. The cart persists in `localStorage`.
- **Newsletter:** an email field validated with Formik and Yup.
- **Persian (default, RTL) at `/` and English (LTR) at `/en`**, with localized numbers and prices.
- **Light and dark themes**, remembered in a cookie and rendered correctly on first paint (no flash).
- **Explicit loading, error (with retry), empty and success states** on the product list, cart, add-to-cart and
  newsletter.
- **SEO:** per-locale metadata, Open Graph, canonical and `hreflang` links, `sitemap.xml` and `robots.txt`.

## Tech stack

| Concern      | Choice                                                       |
| ------------ | ------------------------------------------------------------ |
| Framework    | Next.js 16.4 (App Router), React 19, TypeScript 5.9 (strict) |
| i18n         | next-intl 4                                                  |
| Styling      | styled-components 6 with server-side rendering               |
| Global state | Zustand 5 (cart), Context API (theme)                        |
| HTTP         | Axios with a single shared instance                          |
| Forms        | Formik + Yup                                                 |
| Font         | Vazirmatn (self-hosted variable font, SIL OFL)               |
| Quality      | ESLint (Next config, `no-explicit-any`), Prettier            |

All dependency versions are pinned exactly in `package.json`.

TypeScript is pinned to 5.9 rather than 7.x: 7.0 is a new major release and Next 16's tooling has not been
validated against it.

## Getting started

### Prerequisites

- Node.js **20.9 or newer** (developed on Node 22.13)
- npm 10+

### Install and run

```bash
git clone https://github.com/GhazalBasaligheh/Nova-store.git
cd Nova-store
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000 (Persian) or http://localhost:3000/en (English).

### Production build

```bash
npm run build
npm run start
```

## Environment variables

Copy `.env.example` to `.env.local`. All variables are public (`NEXT_PUBLIC_*`) configuration, never secrets; they
are bundled into client code. The app fails fast with a clear message if one is missing or invalid
(`src/utils/env.ts`).

| Variable                        | Purpose                                                                | Example                    |
| ------------------------------- | ---------------------------------------------------------------------- | -------------------------- |
| `NEXT_PUBLIC_API_BASE_URL`      | FakeStoreAPI base URL used by the Axios instance                       | `https://fakestoreapi.com` |
| `NEXT_PUBLIC_SITE_URL`          | Canonical site URL for metadata, sitemap and robots                    | `http://localhost:3000`    |
| `NEXT_PUBLIC_USD_TO_TOMAN_RATE` | **Demo-only** fixed USD→Toman display rate (see [Currency](#currency)) | `200000`                   |

`NEXT_PUBLIC_SITE_URL` is a placeholder until the app is deployed; set it to the real origin so canonical URLs,
Open Graph URLs and the sitemap are correct.

## Scripts

| Script                 | Description                |
| ---------------------- | -------------------------- |
| `npm run dev`          | Development server         |
| `npm run build`        | Production build           |
| `npm run start`        | Serve the production build |
| `npm run type-check`   | `tsc --noEmit`             |
| `npm run lint`         | ESLint                     |
| `npm run format`       | Prettier (write)           |
| `npm run format:check` | Prettier (check only)      |

## Folder structure

The structure follows section 4-4 of the challenge brief. Deviations are listed and explained below the tree.

```
src/
├── api/                  # AxiosInstance + ApiError (central error handling)
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx    # <html lang dir>, font, providers, metadata
│   │   ├── page.tsx      # Home (server component: loads catalog, renders sections)
│   │   └── cart/page.tsx # Cart (noindex)
│   ├── globals.css       # Static resets only
│   ├── robots.ts
│   └── sitemap.ts
├── assets/
│   ├── Fonts/            # Vazirmatn variable font + license
│   ├── Icons/            # Inline SVG icon components
│   └── Images/           # (empty; see Assumptions)
├── components/           # Page-level sections, one folder per section
│   ├── Cart/  Footer/  Header/  Hero/  Newsletter/  ProductSection/
├── context/              # ThemeContext, styled-components SSR registry, theme tokens
├── dictionary/           # fa.json, en.json (next-intl messages)
├── i18n/                 # next-intl routing + locale-aware navigation (see deviations)
├── modals/               # (empty: no modal was needed)
├── requests/             # API request functions (products, server catalog loader)
├── shared/               # Reusable UI: Button, Badge, Container, Pagination, Rating, ...
├── storage/              # Zustand cart store + hydration helpers
├── types/
│   └── enums/            # Locale, Direction, Theme, SortKey, ApiErrorKind, CategorySlug
├── utils/                # UI-independent logic: query/filter/sort, currency, env, seo, routes, ...
├── validations/          # Yup schemas
├── global.d.ts           # next-intl message and locale typing
├── i18n.ts               # next-intl per-request config (location required by the brief)
└── proxy.ts              # Next 16 proxy (formerly middleware): locale routing
```

**Deviations from the brief, and why**

- **`src/i18n/` next to `src/i18n.ts`.** The brief asks for `src/i18n.ts`, which holds next-intl's per-request
  config. next-intl also needs a routing definition (shared by `proxy.ts`, links and metadata) and locale-aware
  navigation helpers. Putting them in `i18n.ts` would pull server-only code into the proxy and client bundles, so
  they live in `src/i18n/routing.ts` and `src/i18n/navigation.ts`.
- **`src/proxy.ts` is inside `src/`.** With a `src/` directory, Next.js only picks up `proxy.ts` from `src/`.
- **Hooks sit next to the component that uses them** (`components/ProductSection/useCatalog.ts`,
  `useProductQuery.ts`, ...). The brief has no hooks folder, and these hooks are specific to one section.
  Business logic they rely on is pure and lives in `utils/`.
- **Theme tokens live in `context/theme/`**, next to the ThemeContext that consumes them.
- **Centralized routes are in `utils/routes.ts`**, since the Store tree has no `Routes/` folder.

## Architecture

### Routing and internationalization

- `proxy.ts` runs next-intl's middleware with locales `fa` (default) and `en` and `localePrefix: 'as-needed'`:
  Persian is served at `/`, English at `/en`, and `/fa` redirects to `/`.
- **Browser-language detection is off** (`localeDetection: false`). `/` is always Persian; users switch with the
  header toggle, which keeps the current path and query string.
- `[locale]/layout.tsx` sets `lang` and `dir` (`rtl` / `ltr`) on `<html>`.
- All UI text comes from `dictionary/*.json`; there is no hard-coded Persian or English in JSX. Messages are typed
  (`global.d.ts`), so an unknown key fails at compile time.
- Numbers, ratings, page numbers and prices are formatted for the active locale (Persian digits in `fa`).
- **Product data is English-only.** FakeStoreAPI returns English titles and descriptions; they are shown as-is in
  the Persian locale and marked `lang="en"` for screen readers. Category names are translated through the dictionary.

### Styling and theming

- styled-components with a server-side style registry (`context/StyledComponentsRegistry.tsx`) and the SWC
  `styledComponents` compiler option, so the server HTML is already styled and class names match on hydration.
- One typed token file (`context/theme/tokens.ts`): light and dark palettes (navy primary, orange accent, cream
  background), spacing, radius, shadows and mobile-first breakpoints (768 / 1024 / 1280).
- RTL/LTR is handled with CSS logical properties (`margin-inline`, `padding-inline`, `inset-inline-end`, ...) and the
  `dir` attribute. Directional icons (pagination chevrons) are mirrored in RTL.
- **Theme (Context API):** light or dark only. The choice is stored in a `nova-theme` cookie that the layout reads
  on the server, so the first paint already has the right colors with no flash and no hydration mismatch. The
  cookie is a non-sensitive UI preference, so it is not `HttpOnly` (the client toggles it).

### API communication

- `api/axiosInstance.ts` is the single Axios instance: base URL from env, 10-second timeout, JSON `Accept` header.
- A response interceptor turns **every** failure into a typed `ApiError` with a `kind`:

  | Kind       | Meaning                                                                    |
  | ---------- | -------------------------------------------------------------------------- |
  | `blocked`  | Non-JSON response, e.g. a Cloudflare bot-check page (even with status 200) |
  | `network`  | No response: timeout, DNS failure, connection reset                        |
  | `server`   | 5xx                                                                        |
  | `client`   | Other 4xx                                                                  |
  | `parse`    | Response arrived but did not have the expected shape                       |
  | `canceled` | Aborted by the caller                                                      |

- Request functions in `requests/products.ts` (`getProducts`, `getCategories`, `fetchCatalog`) return typed data
  (`types/product.ts`) and check that list responses really are arrays.

### Product data: server first, browser fallback

FakeStoreAPI sits behind Cloudflare. During development, **requests from a server (Node.js) were answered with a
403 "Just a moment…" bot challenge**, while requests from a real browser succeeded and CORS allowed them. So the
home page loads data on the server when it can, and falls back to the browser only when that would help:

1. `requests/catalogServer.ts` (server only) tries to load products and categories.
   - On success the catalog is cached **in memory for 1 hour** (`utils/ttlCache.ts`).
   - On a `blocked`, `network` or `server` failure it starts a **5-minute cooldown**, during which the server skips
     the API entirely, and tells the page to use the fallback.
   - On a `client` or `parse` failure it returns an error. A browser retry would fail the same way.
2. The client `useCatalog` hook uses the server data when present. On fallback it makes **exactly one** browser
   request: a shared in-flight promise prevents duplicates, including React StrictMode's double effect. It never
   retries automatically; the error state has a Retry button, and each click makes one request.
3. The section renders one of `loading` (skeleton), `error` (with retry) or `ready`. An empty state is shown when
   `ready` has no matches after filtering.

**Trade-offs:**

- When the server is blocked, the product grid is not in the server HTML. Metadata, headings, the hero and category
  links still are.
- The in-memory cache is per server process: it is not shared between instances and is cleared on restart. That is
  fine for a single-server demo. A multi-instance deployment would use a shared cache instead.
- Whether a deployed server is blocked depends on the host's IP addresses and could not be verified in advance.

Next's `cacheComponents` / `'use cache'` was deliberately left off: it isn't required by the brief, and it changes
how dynamic data (the theme cookie) and caching must be written.

### State management

| State                                   | Where                                    | Why                                              |
| --------------------------------------- | ---------------------------------------- | ------------------------------------------------ |
| Cart                                    | Zustand (`storage/cartStore.ts`)         | Global, shared by the header badge and cart page |
| Theme                                   | Context API (`context/ThemeContext.tsx`) | App-wide UI setting, as the brief specifies      |
| Search, category, sort, page            | URL query (`?q=&category=&sort=&page=`)  | Shareable, survives refresh, back/forward work   |
| Menu open, form fields, button feedback | `useState` / Formik                      | Local to one component                           |

**Cart details:**

- Actions: `add`, `increment`, `decrement` (never below 1), `remove`, `clear`. Item count and subtotal are
  computed by selectors, not stored.
- Prices are stored in **USD** and converted only when displayed.
- Persisted to `localStorage` under `nova-cart` (versioned). The cart holds no sensitive data, so `localStorage`
  is acceptable per the brief.
- **Hydration safety:** the server can't read `localStorage`, so persisted state is loaded only after mount
  (`skipHydration` + `CartHydrator`). Until then the badge shows no count and the cart page shows a skeleton, so
  server HTML and the first client render always match.

Filtering, sorting and pagination are pure functions in `utils/productQuery.ts` (`parseProductQuery`,
`filterSortPaginate`). Invalid URL values fall back to defaults instead of throwing.

### Forms and validation

The newsletter form uses Formik with a Yup schema in `validations/newsletter.ts`. Schema messages are dictionary
keys, so the schema doesn't depend on the language. Errors are announced to screen readers and the field is
marked `aria-invalid`.

**There is no newsletter endpoint** (FakeStoreAPI has none, and a backend is out of scope), so a valid
submission only shows the success state. Nothing is sent or stored.

### SEO

- Per-locale `<title>` (with a `%s | NOVA Store` template), description, `metadataBase` from
  `NEXT_PUBLIC_SITE_URL`, and Open Graph tags (site name, `fa_IR` / `en_US` locale and alternate, type, URL).
- Canonical URL and `hreflang` alternates (`fa`, `en`, `x-default` → Persian) on each page.
- `sitemap.xml` lists both locales of the home page with alternates. `robots.txt` allows crawling, disallows the
  cart in each locale and points to the sitemap. The cart page is also `noindex`.
- Semantic `header` / `nav` / `main` / `footer` and a single `h1` per page.
- Next's `metadata` merging replaces (does not merge) a parent's `openGraph`, so pages that add an Open Graph
  URL start from a shared `baseOpenGraph()` helper (`utils/seo.ts`).

## FakeStoreAPI limitations and workarounds

| Limitation                                                                   | Workaround                                                                                           |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Server-side requests get a Cloudflare bot challenge (403, HTML)              | Server-first loading with a classified browser fallback and cooldown (see above)                     |
| Next's image optimizer would fetch images from the server and be blocked too | Product images use `next/image` with `unoptimized`, so the browser loads them directly               |
| No pagination parameters                                                     | The full list (20 products) is loaded once; filtering, sorting and paging happen in the browser      |
| Text is English only, prices are USD                                         | Titles shown as-is (`lang="en"`); categories translated via dictionary; prices converted for display |
| Category slug `jewelery` is misspelled                                       | Kept as the API value; the label is translated correctly                                             |
| Search only matches English text                                             | Searching with Persian words won't find products. Documented, not worked around                      |
| No newsletter endpoint                                                       | Success state only; nothing is sent                                                                  |

Data shapes (`/products`, `/products/categories`) were verified against the live API on 2026-11-09.

## Currency

- English shows **USD**, the API's own currency (`$109.95`).
- Persian shows **Toman**, converted with a **fixed demo rate of 1 USD = 200,000 Toman**, rounded to whole Toman
  and formatted with Persian digits (`۲۱٬۹۹۰٬۰۰۰ تومان`).
- **The rate is for demonstration only. It is not a live or production exchange rate.** It comes from
  `NEXT_PUBLIC_USD_TO_TOMAN_RATE`, so it can be changed without touching any logic (`utils/currency.ts`).

## Accessibility and responsiveness

- Mobile-first layout, checked at **360, 768, 1024 and 1280 px** in both languages on the home and cart pages with no
  horizontal scroll or overlapping elements. Product grid: 1 column under 480 px, 2 on tablet, 3 on desktop.
- Touch targets are at least 44 px. Every icon-only control has a translated `aria-label`. Focus outlines are visible.
- Live regions announce result counts, add-to-cart feedback, quantity changes and form results. Loading states use
  `aria-busy`.
- Animations respect `prefers-reduced-motion`.

## Assumptions

- Persian is the default language.
- Prices are displayed in Toman in Persian using a demo-only fixed rate (see [Currency](#currency)).
- Footer help, store and social links are placeholders, as the brief allows.
- No hero photo was supplied, so the hero uses decorative brand artwork; a photo can be dropped into
  `assets/Images` later.
- The header category menu uses the four category slugs verified from the API, so it can render without its own
  request. The chips on the home page use the live category list.
- Search covers product titles and category names.

## Out of scope

Per the brief: login, payment, checkout and orders, inventory, roles, and a dedicated backend. The cart summary
states that checkout isn't part of the demo. A product detail page was deferred and is not built.

## Known limitations

- The in-memory catalog cache isn't shared between server instances (see the trade-offs above).
- In environments where Cloudflare blocks the server, product cards aren't in the server-rendered HTML.
- No Open Graph image: no brand image asset was provided.
- The sitemap contains only the home page (in both languages) until product pages exist.
- No automated tests; quality was checked with strict TypeScript, ESLint, Prettier, production builds and manual
  testing in the browser.

## Time spent

**TODO (author):** fill in the actual time spent.
