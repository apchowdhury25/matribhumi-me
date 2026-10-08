# Business-model transition — step 1

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
