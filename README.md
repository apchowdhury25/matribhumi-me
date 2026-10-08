# MatriBhumi

Official website for **MatriBhumi**.

Canonical site: **[https://matribhumi.me](https://matribhumi.me)**

MatriBhumi is **independent property advisory and transaction coordination** in Bangladesh. It helps buyers discover and compare selected properties from participating developers, then coordinates introductions, viewings, and transaction-related communication. MatriBhumi does not charge buyers a property brokerage or consultation fee for its core property advisory service. Where applicable, MatriBhumi may receive compensation from participating developers under separate commercial agreements. The property purchase agreement is between the buyer and the relevant developer/seller.

Public navigation: Home, Properties, Developers, Locations, How It Works, For Developers, About, Insights, Contact, with a Bangladesh location bar for Bangladesh, Dhaka, Chattogram, and Bashundhara. Legal pages live in the footer and in `src/config/legal.ts`.

This repository is the public marketing site, property discovery, inquiries, viewings, and a staff advisory CRM (leads, pipeline, follow-ups, developer relationships, and internal reports).

Projects, people, prices, and locations shipped in the seed are **placeholder listing content**. Named partner developers are unpublished until a real partnership is stored. MatriBhumi does not guarantee returns, appreciation, rental income, or any investment outcome. See `docs/BUSINESS-MODEL-TRANSITION.md`.

## Architecture

```
src/app            App Router pages, API routes, server actions
src/components     UI, layout, property, forms, maps, admin, analytics
src/config         Brand, navigation, buyer-fee, and Bangladesh legal/disclosure copy
src/lib            Prisma, auth, SEO, storage, validation, analytics, mail
prisma             Schema, migrations, and seed
public/brand       Logo, favicon, Open Graph — replace files without code changes
public/media       Demonstration photography and plans
```

Company name and URLs live in `src/config/site.ts`. Do not scatter `matribhumi.me` through the codebase.

## Technology stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- PostgreSQL in production (Docker Compose) · SQLite for zero-config local development
- Prisma ORM
- JWT httpOnly sessions, role-based admin access
- Zod validation, rate limiting
- S3-compatible storage with local fallback
- Mapbox when `NEXT_PUBLIC_MAPBOX_TOKEN` is set; OpenStreetMap otherwise
- Optional Google Analytics / GTM via `NEXT_PUBLIC_ANALYTICS_ID`

## Local setup

```bash
cp .env.example .env
npm install
npm run db:setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Staff console: [http://localhost:3000/admin](http://localhost:3000/admin)

Roles: **ADMIN** (full, including confidential developer compensation), **EDITOR** (catalogue and developer profiles), **SALES** (leads, viewings, pipeline, follow-ups). Internal reports are a workflow snapshot, not guaranteed revenue.

Demonstration login (change immediately):

- Email: `admin@matribhumi.me`
- Password: `MatriBhumiAdmin!2026`

## Environment variables

See `.env.example`. Important keys:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | SQLite `file:./dev.db` locally, PostgreSQL in production |
| `SESSION_SECRET` / `NEXTAUTH_SECRET` | 32+ character session secret |
| `NEXT_PUBLIC_SITE_URL` | `https://matribhumi.me` in production |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Optional Mapbox |
| `NEXT_PUBLIC_ANALYTICS_ID` | Optional GA/GTM measurement ID |
| `S3_*` | Optional object storage |
| `SMTP_*` | Optional transactional email |

Never commit secrets. `.env` is gitignored.

## Database

Local:

```bash
npm run db:setup    # generate, push schema, seed
npm run db:seed     # reseed demonstration data
```

Production PostgreSQL: in `prisma/schema.prisma` set `provider = "postgresql"`, point `DATABASE_URL` at the cluster, then:

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

Docker Postgres:

```bash
docker compose up -d db
```

Then set `DATABASE_URL` to `postgresql://matribhumi:matribhumi@localhost:5432/matribhumi?schema=public` and change the Prisma provider to `postgresql`.

Seed includes 10+ properties, 6 developments, 6 locations, 30+ units, 15 amenities, 10 articles, and 8 jobs. The seed developer row is an unpublished placeholder with a prospect partnership and no compensation terms; public pages hide the developer name until a published partner exists. Reseeding clears existing leads, deals, and viewings.

Staff console: developers and partnerships, lead qualification, deal pipeline, viewings. Compensation and agreement references are administrator-only and are excluded from public APIs.

## Testing

```bash
npm run lint
npm run typecheck
npm test
npx playwright install
npm run test:e2e
```

## Production build

```bash
npm run build
npm start
```

## Deployment

### Hostinger (matribhumi.me)

Deploy as a **Node.js web app** from GitHub. Do not use **Advanced → Git** (that only copies files and will not build Next.js).

Full checklist: **[HOSTINGER.md](./HOSTINGER.md)**

1. Business or Cloud hosting plan.
2. hPanel → **Websites → Add Website → Node.js web app → Import Git repository**.
3. Repository `apchowdhury25/matribhumi-me`, branch `main`, Node **22**, build script `build`, output `.next`.
4. Environment: `NEXT_PUBLIC_SITE_URL=https://matribhumi.me`, a 32+ character `SESSION_SECRET`, and a SQLite `DATABASE_URL` **outside** `hbuilds` so deploys do not wipe data.
5. Deploy, then install SSL for `matribhumi.me` and `www`.

### Other targets

**Vercel** — import the repo, set env vars, attach Postgres (or keep SQLite only for preview demos). `postinstall` runs `prisma generate`. Production `NEXT_PUBLIC_SITE_URL` must be `https://matribhumi.me`. `www.matribhumi.me` redirects to the apex domain.

**Docker** — `docker compose up --build` (app + Postgres).

**AWS** — build the `Dockerfile` (Next.js standalone output). Point `DATABASE_URL` at RDS/Aurora PostgreSQL. Put media on S3 via the `S3_*` variables. Terminate TLS at the load balancer; set `NEXT_PUBLIC_SITE_URL=https://matribhumi.me`.

## Images and storage

Replace files in `public/brand/` to drop in a final logo without changing application code:

- `logo-light.svg` / `logo-dark.svg` / `logo-mark.png` / `logo-mark.svg` / `favicon.svg` / `og-default.jpg`

Demonstration photography lives in `public/media/`. The storage adapter writes to `public/uploads` locally, or to S3-compatible storage when credentials are present.

## Maps

Set `NEXT_PUBLIC_MAPBOX_TOKEN` to use Mapbox GL. Without it, property maps use an OpenStreetMap embed and the global presence map uses the built-in interactive SVG.

## Analytics

Set `NEXT_PUBLIC_ANALYTICS_ID` to a GA4 or GTM ID. Events (`page_view`, `property_view`, `search`, `inquiry_submit`, and others) are pushed to `dataLayer`. No analytics ID is hard-coded.

## Domain

Production origin is **https://matribhumi.me**. Canonical URLs, sitemap, robots, Open Graph, JSON-LD, and documentation all use that host. `www` is redirected to the apex domain.
