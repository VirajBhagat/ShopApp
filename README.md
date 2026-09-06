# CardVault

Storefront for a trading-card shop selling Pokémon, One Piece, Dragon Ball and
Yu-Gi-Oh! singles, graded slabs and sealed product in India.

## Status

UI pass. Screens are built against mock data in `apps/web/src/lib/data.ts` —
there is no backend, auth or payment integration yet.

## Layout

    apps/web          Next.js storefront (mobile-first). Admin will live at /admin.
    packages/tokens   Colours, condition grades, franchises, radii, fonts.

`packages/tokens` is plain TypeScript with no framework imports, so the Expo
app can read the same file through NativeWind when it's added. Add colours
there, not in `tailwind.config.ts`.

## Running

    pnpm install
    pnpm dev          # http://localhost:3000

## Screens

| Route             | Notes                                                    |
| ----------------- | -------------------------------------------------------- |
| `/login`          | Phone OTP + Google, with SKIP — browsing never gated      |
| `/`               | Home, franchise tabs, hero rail, trust strip              |
| `/browse`         | Faceted grid: condition, language, in-stock, sort         |
| `/card/[slug]`    | Card detail with the per-copy condition picker            |
| `/sets`           | Franchise → set → cards                                   |
| `/watchlist`      | Price-drop and restock alerts                             |
| `/cart`           | Cart with stock-hold timer; login gate at checkout        |
| `/club`           | Collector's Club membership                               |

`/watchlist` and `/cart` have a DEMO button in the header to toggle their
empty states.

## Decisions this UI assumes

- **Condition is the product.** A card's copies differ by condition, language
  and grading, each with its own price and its own stock count — so the model
  is `Card` (the printing) → `Listing` (a copy we hold), and the detail page
  sells the listing, not the card.
- **Most singles are quantity 1.** Adding to cart must reserve the copy in a
  database transaction, or two buyers race for it. The cart's hold timer is
  the UI half of that; the backend half isn't built yet.
- **India.** ₹ pricing, `+91` phone-first login, Razorpay when payments land.

## Not built yet

Backend and database, auth, payments, admin panel, real card photography,
search indexing, the Expo app.
