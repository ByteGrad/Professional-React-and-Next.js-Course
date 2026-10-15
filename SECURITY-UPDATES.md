# Security update — 15 October 2026

The maintained examples deliberately deviate from the course recordings.

## Updated dependencies and framework APIs

- Next.js 16.4.1 and React 19.3.1 in Evento and PetSoft; asynchronous route props, current Proxy conventions and `useActionState`.
- Vite 8.3.4 in the five Vite examples, current lockfiles/build tools, Prisma 6.19.3 and Tailwind CSS 4.3.3 in the database-backed projects.
- Updated lint configuration and Framer Motion, corrected the rmtDev search context wiring and missing types, and removed network font downloads from the Next.js builds in favor of system fonts.
- Patched transitive dependency overrides for `deepmerge-ts` and `postcss-selector-parser`. The old framework lint preset was replaced with general ESLint/TypeScript checks because it retained an unpatched transitive dependency. Reassess these choices as upstream dependencies change.

## PetSoft security changes

- Server data/actions re-check the current user's database entitlement. Middleware/JWT claims alone no longer authorize paid access. Existing per-pet ownership checks remain in place.
- Checkout binds the authenticated internal user ID to the Stripe session and requires your own configured `STRIPE_PRICE_ID`.
- Fulfillment requires a valid Stripe signature, a paid one-time session and the expected price/quantity, then grants access to that bound user ID. An unpaid or unrelated checkout does not grant access. URL query parameters do not prove payment.
- Stripe initializes only when needed; missing payment configuration fails closed. Live payment calls were not made during verification. Refund, subscription, dispute and other business workflows require a separate production implementation and review.
- Tutorial seeding requires `ALLOW_TUTORIAL_SEED=1` against an isolated development database. PetSoft additionally requires a unique `TUTORIAL_SEED_PASSWORD` of at least 16 characters; the old shared password was removed. Never seed a production database.

## Verification and maintenance

All seven project builds and lint checks passed with Node.js 24. Security regression tests cover anonymous/deleted accounts, stale entitlement claims, unsigned/unpaid webhooks and wrong-price fulfillment. Local app checks use disposable databases/test accounts. All eight package audits (the seven projects plus root tests) reported zero known vulnerabilities at review time.

Use `npm ci` in each project and `npm test` at the repository root. The GitHub workflow builds against isolated PostgreSQL/SQLite fixtures; its fixture values are not deployment credentials. Configure your own database, authentication secret/origin and test Stripe account before running a database example. Do not use production data or credentials for tutorials.

Weekly update pull requests and automated checks assist review. See SECURITY.md; this is a dated security review, not a guarantee that the examples are production-ready or free of future vulnerabilities.
