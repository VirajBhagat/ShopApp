# CardVault

Storefront for a trading-card shop in India. Three kinds of product:

- **Singles** — one printed card. Stock is usually 1, and condition, language
  and grading set the price.
- **Sealed** — booster packs, boxes, ETBs, bundles, starter decks, tins.
  Ordinary retail stock, sometimes sold as a preorder before it exists.
- **Accessories** — sleeves, binders, toploaders, deck boxes, playmats.
  Ordinary retail stock, varies by colour and pack size, and mostly belongs
  to no franchise at all.

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
| `/browse`         | Faceted grid; facets follow the kind being browsed         |
| `/card/[slug]`    | Single: per-copy condition picker + gear attach-sell      |
| `/product/[slug]` | Sealed and gear: colour, pack size, print run, preorder   |
| `/sets`           | Franchise → set → cards, plus a franchise-free gear block |
| `/watchlist`      | Price-drop and restock alerts                             |
| `/cart`           | Cart with stock-hold timer; login gate at checkout        |
| `/club`           | Collector's Club membership                               |

`/watchlist` and `/cart` have a DEMO button in the header to toggle their
empty states.

## Decisions this UI assumes

- **One Product/Variant spine, three behaviours.** `Product.kind` discriminates;
  `Variant` carries whichever axes that kind actually has — condition and
  grading for singles, language and edition for sealed, colour and pack size
  for gear. Grids, cart and search stay generic over it.
- **Condition is the product** for a single. An NM and an MP copy are
  different products at different prices, so the detail page sells a variant,
  not a card.
- **Kind is the primary navigation axis, franchise the secondary one.** This
  inverts the reference app deliberately: sleeves and binders belong to no
  fandom, so franchise-first tabs have nowhere to put them. `facetsFor()`
  decides which filters a view offers, so nobody is asked to pick a card
  condition for a binder.
- **Most singles are quantity 1.** Adding to cart must reserve the copy in a
  database transaction, or two buyers race for it. The cart's hold timer is
  the UI half of that; the backend half isn't built yet.
- **India.** ₹ pricing, `+91` phone-first login, Razorpay when payments land.
- **Gear is the attach sell.** It carries better margin than singles and is
  offered on the card page and the home feed rather than hidden in a tab.

## Not built yet

Backend and database, auth, payments, admin panel, real card photography,
search indexing, the Expo app.
