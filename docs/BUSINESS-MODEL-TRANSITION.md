# Business-model transition

## Step 6 — advisory CRM

Turn the existing staff console into a practical buyer-advisory and developer-relationship CRM. Keep catalogue admin pages.

- Dashboard **Today** cards: new buyer leads, qualified leads, viewing requests, developer introductions, active transactions, closed transactions, follow-ups due, developer relationships requiring attention.
- Visual pipeline: New lead → Contacted → Qualified → Shortlisted → Developer introduced → Viewing → Property selected → Reservation → Contract → Completion → Closed, plus Lost / withdrawn. Staff can move a deal between stages (`moveDealStage`).
- Lead list search and filters: country, market, developer, status, advisor, date, budget, property. Lead detail shows buyer information, requirements, matching, shortlist, notes, introductions, viewings, transaction history, and follow-up dates.
- Follow-up records (`FollowUp`): due date, task, note, assigned advisor, completed status.
- Developer CRM: profile, markets, developments, active listings, buyer referrals, active and completed transactions, relationship status, internal notes, confidential compensation records.
- Confidential developer compensation and agreement references stay ADMIN-only (`canViewCompensation`). Reports omit those totals unless an administrator requests them. Public APIs still use `publicDeveloperSelect` and `stripConfidential`.
- Internal reports: leads by country/source/developer/property, pipeline, closed transactions, estimated transaction value, conversion rate, viewing-to-transaction conversion, and (admin) developer compensation due/received. Copy states these are an operational snapshot, not guaranteed revenue.
- Configurable internal fee language in `src/config/businessModel.ts` (`developerFeeTerm`: developer compensation, referral fee, consultant fee, or service fee). Do not hard-code “commission” in the CRM.
- Roles: ADMIN (full, including confidential terms), EDITOR (content and developer profiles), SALES (leads, viewings, shortlists, pipeline, follow-ups). Enforced in layout, page guards, and server actions.
- Migration: `20261008030000_advisory_crm` adds `FollowUp`. DealStage additions are SQLite TEXT and need no ALTER. Hostinger still uses `prisma db push`. Do not reseed production.

## Step 5 — buyer journey

Build the complete buyer journey around MatriBhumi as a property advisor and transaction coordinator. MatriBhumi is not the seller.

- Primary CTA: “Talk to a Property Advisor”. Secondary: “Find My Property”, “Request Property Details”, “Arrange a Viewing”. Configurable in `src/config/ctas.ts`.
- Public fee message (configurable in `src/config/businessModel.ts`): “MatriBhumi does not charge buyers a property brokerage or consultation fee. Where applicable, MatriBhumi is compensated by participating developers under separate agreements.”
- `/advise` collects a requirements brief (name, email, WhatsApp/phone, residence, preferred country/city, type, budget, currency, bedrooms, purpose, timeline, contact method, message; optional developer, project, financing). No passport or bank documents.
- Submission creates a `Lead` with `source = ADVISORY` and an open `Deal`, then emails the buyer and sales inbox when SMTP is configured.
- Staff matching scores published Bangladesh listings on location, developer, development, type, price, bedrooms, and status. The score is a screening aid, not an AI valuation or legal opinion.
- Staff shortlist (`LeadShortlistItem`) stores property, developer, development, estimated price, location, features, notes, and advisor recommendation.
- Staff record a `DeveloperIntroduction` (date, developer, contact person, method, notes, status) and can mark a deal property selected.
- Buyer viewing requests enter `/admin/viewings`, create or attach a lead, and move the open deal to `VIEWING`.
- Deal pipeline: Viewing → Property Selected → Reservation → Contract → Completion → Closed. Developer compensation stays ADMIN-only.
- Property pages include developer, location, type, availability, price, units, features, floor plans, amenities, developer information, “Why this property?”, advisor CTAs, and a source disclosure. No appreciation, yield, or return promises.
- Developer pages show public name, description, markets, developments, properties, website, and a request form. “Verified developer” only when `verified` is true. Commercial terms stay hidden.
- Migration: `20261008020000_buyer_journey` adds `Property.whyThisProperty`, `LeadShortlistItem`, and `DeveloperIntroduction`. Additive; do not reseed production.

## Step 4 — advisory platform schema

Evolve the existing Prisma schema for a multi-developer advisory and transaction-coordination platform. Do not rebuild the database. Keep Developer → Development → Property → Unit.

- `Developer` now holds company profile, public vs internal copy, Bangladesh-default country, cities, contacts, status, verified/featured flags, and timestamps.
- `DeveloperPartnership` records the MatriBhumi relationship (status, dates, markets, agreement reference, public visibility). Commercial agreement details stay off public pages.
- `DeveloperCompensation` and `DealCompensation` store compensation type, percentage or amount, currency, payment status, and transaction references. ADMIN-only via `canViewCompensation`. Public APIs use `publicDeveloperSelect` and `stripConfidential`.
- Central buyer-fee config in `src/config/businessModel.ts`: `buyerPaysMatriBhumi = false`, `buyerFee = 0`, `developerCompensation = true`.
- `Lead` records optional buyer geography, budget range, purpose, timeline, financing, source, assigned staff, developer/development referral, qualification, and follow-up. Sensitive fields stay optional.
- `Deal` tracks BuyerLead → Qualification → DeveloperIntroduction → Viewing → PropertySelected → Reservation → Contract → Completion → Closed. Estimated transaction value is the buyer purchase with the developer/seller. MatriBhumi compensation is a separate record.
- `ViewingRequest` adds viewing type, location, lead/developer/advisor/deal links, and developer confirmation.
- Migrations: `20261008000000_init` (baseline of the pre-Step-4 schema), `20261008010000_advisory_platform` (additive tables/columns), and `20261008010001_backfill_developer_partnerships` (prospect partnership for existing developers, Bangladesh market, not public, no compensation terms). Existing developer rows keep their names and listings; `publicDescription` is copied from `description`. No invented partners or commission percentages.

## Step 3 — Bangladesh-only coordination

Public pages, filters, sitemap, and seed listings coordinate with developers in Bangladesh only.

- Country bar: Bangladesh, Dhaka, Chattogram, Bashundhara.
- `/locations/uae` and `/locations/malaysia` are removed.
- Public queries require `location.country = Bangladesh`.
- Seed locations, developments, properties, jobs, and articles are Bangladesh-only.
- Waitlist phone country codes stay international so NRBs can enter their numbers.

## Step 2 — public information architecture

Public navigation, homepage, and discovery now match the advisory / brokerage / transaction-coordination model.

- Primary nav: Home, Properties, Developers, Locations, How It Works, For Developers, About, Insights, Contact.
- Secondary nav: Bangladesh cities — Bangladesh, Dhaka, Chattogram, Bashundhara. Public listings are Bangladesh-only.
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

- No licence is claimed in Bangladesh.
- Developer compensation is not described as legally identical across projects.
- RAJUK / structural / developer-registration numbers are not invented; they belong to the developer of record when published.
- Invented 2014–2026 developer-firm timeline is removed.

## Reseed warning

`npm run db:seed` replaces listing copy and **deletes existing leads**. Production Hostinger SQLite must be pushed (`prisma db push`) and reseeded after deploy or it will keep the old developer-firm rows.

## Unresolved assumptions

- Real partner legal names, logos, and contracts are not in the repository.
- Public coordination is Bangladesh-only. UAE and Malaysia market pages were removed.
- Leadership bios remain “to follow.”
- The brochure PDF binary is unchanged; on-page and email framing is advisory.
- Licence numbers and approval references remain unpublished.
