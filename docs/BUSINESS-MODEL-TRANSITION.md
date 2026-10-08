# Business-model transition

## Step 2 — public information architecture

Public navigation, homepage, and discovery now match the advisory / brokerage / transaction-coordination model.

- Primary nav: Home, Properties, Developers, Locations, How It Works, For Developers, About, Insights, Contact.
- Secondary nav: Bangladesh, UAE, Malaysia → `/locations/bangladesh`, `/locations/uae`, `/locations/malaysia`.
- Properties is the central discovery surface (country, city, location, developer, type, price, bedrooms, completion status, development status, featured).
- Property cards say “Listed through MatriBhumi”, show a public developer name only when published, and use Request details / Arrange a viewing / Speak with an advisor.
- Homepage follows the 13-section advisory structure, including “How MatriBhumi is paid”.
- `/how-it-works` is a six-step buyer journey. `/for-developers` is the developer proposition without guaranteed-sales claims.
- `/developers` lists published partners only. The seed partner stays unpublished, so the index is an empty state until a real partner is stored.
- Copy uses “selected developers”. “Verified developer” appears only when `Developer.verified` is true.
- `/projects` remains available from the footer. It is no longer in the primary nav.

## Step 1 — positioning

Internal report for the change from a developer/owner site to an independent advisory, brokerage, referral, and transaction-coordination platform.

## Existing developer-model assumptions (removed in step 1)

- Brand copy presented MatriBhumi as a boutique architectural design and development firm (`src/config/site.ts`).
- Legal name in JSON-LD was “MatriBhumi Developments”.
- FAQ claimed MatriBhumi’s legal team completed registration and that every MatriBhumi development ran building management.
- Legal block treated RAJUK, structural certificates, and developer registration as MatriBhumi’s filings.
- Terms said Bashundhara listings were private projects of MatriBhumi.
- Seed stored a single `Developer` named MatriBhumi and pointed every listing at it.
- Property detail always printed `Developer: {name}`, which showed MatriBhumi.

## Pages modified

Home, about, projects, project detail, properties, property detail, locations, sustainability, careers, contact, insights, terms, disclaimer, privacy, footer, FAQ, leadership, lead-capture dialogs, brochure email, admin console labels, README.

## Database fields added

| Model | Field | Purpose |
| --- | --- | --- |
| `Developer` | `published` (default false) | Public name is shown only when true |
| `Developer` | `website` | Optional partner site |
| `Development` | `matribhumiOwned` (default false) | Explicit MatriBhumi ownership |
| `Property` | `matribhumiOwned` (default false) | Explicit MatriBhumi ownership |

Existing `Developer`, `Development`, `Property`, `Location`, `Unit`, `Lead`, and `ViewingRequest` models are retained.

## Public developer-name rule

`src/lib/developer.ts` returns a name only for a published, named partner. Placeholder names (“Unpublished partner”) stay hidden even if `published` is flipped by mistake. `matribhumiOwned` prints “MatriBhumi-owned”.

Seed uses one unpublished placeholder (`slug: unpublished-partner`) so foreign keys remain valid. No invented partner companies.

## Terminology

Owner language (“we build”, “our developments”, “development firm”) is rewritten as advisor language (selected / partner / participating developer projects). Buyer fee copy states: no brokerage, consultation, or property-search fee to the buyer; the developer compensates MatriBhumi under a separate agreement; no percentage is published.

## Legal / compliance claims reviewed

- No licence is claimed in Bangladesh, UAE, or Malaysia.
- Developer compensation is not described as legally identical across those markets.
- RAJUK / structural / developer-registration numbers are not invented; they belong to the developer of record when published.
- Invented 2014–2026 developer-firm timeline is removed.

## Reseed warning

`npm run db:seed` replaces listing copy and **deletes existing leads**. Production Hostinger SQLite must be pushed (`prisma db push`) and reseeded after deploy or it will keep the old developer-firm rows.

## Unresolved assumptions

- Real partner legal names, logos, and contracts are not in the repository.
- Malaysia is named in positioning only; there is no Malaysian inventory in seed.
- Leadership bios remain “to follow.”
- The brochure PDF binary is unchanged; on-page and email framing is advisory.
- Licence numbers and approval references remain unpublished.
