# Heiness Foods

A portfolio-quality food ordering demo for a fictional Nigerian food vendor,
"Heiness Foods." Built with Next.js (App Router), TypeScript, and Tailwind
CSS, ready to deploy on Vercel.

**This is a demo project.** The menu, prices, and OPay checkout are all
simulated — no real payments are processed and no real OPay credentials
are used anywhere in this codebase.

## Journey implemented

```
Landing page → Browse menu → Add to cart → Review cart →
Delivery details (guest checkout) → OPay payment demo →
Payment result → Order confirmation → Live order tracking
```

There's also a small `/admin` route for demoing order management (no
auth, intentionally, per the brief — see "Security notes" below).

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

This project was authored without network access in the build
environment, so `npm install` has not been run against it here — run it
locally before your first `npm run dev` / `npm run build` to confirm
everything resolves cleanly, and adjust dependency versions in
`package.json` if npm suggests newer compatible ones.

## Deploying to Vercel

1. Push this folder to a GitHub/GitLab/Bitbucket repo.
2. Import the repo in Vercel (framework preset: Next.js — auto-detected).
3. No environment variables are required for the demo payment flow.
4. Deploy. That's it — everything here is client-rendered mock state, so
   there's no database or secret to configure for the demo to work.

## Architecture

- **`app/`** — routes (App Router): `/` (landing + menu), `/checkout`,
  `/payment`, `/order/[id]` (confirmation + live tracking), `/admin`.
- **`components/`** — presentational + interactive UI, including a small
  hand-rolled set of primitives in `components/ui/` (Button, Sheet, Input,
  Textarea, Label, Badge) in the spirit of shadcn/ui, kept dependency-light
  so the project has no UI-kit version to pin.
- **`lib/types.ts`** — shared domain types (`MenuItem`, `Order`,
  `OrderStatus`, `PaymentProvider`, etc).
- **`lib/mock-data.ts`** — the fictional menu catalogue. Swap this for a
  real data source (Supabase, a CMS, etc.) without touching any UI code.
- **`lib/cart-context.tsx`** — cart state via React Context, persisted to
  `sessionStorage` for the duration of the browser tab.
- **`lib/order-service.ts`** — a mock "database" for orders, backed by
  `localStorage`, with a pub/sub layer (`subscribeToOrders`) so the order
  page and `/admin` stay in sync as status changes. Replacing this with
  real API calls is the only change a backend migration would need — the
  function signatures (`createOrder`, `getOrder`, `updateOrderStatus`,
  ...) are written as the seam.
- **`lib/payment-service.ts`** — the payment abstraction. `PaymentProvider`
  is the interface the UI depends on; `MockOPayProvider` is the only
  implementation right now. A real integration (OPay, Paystack, etc.)
  would be a new class implementing the same interface, wired up in
  `getPaymentProvider()` — the checkout/payment screens never change.
- **`components/food-illustration.tsx`** — original, hand-authored SVG
  illustrations used in place of licensed photography (no stock images or
  clip art are used anywhere in this repo, so there are no licensing
  concerns). Swap `<FoodIllustration>` for a real `<Image>` once you have
  photography for the menu.

## Order status model

```
pending → payment_processing → confirmed → preparing → ready →
out_for_delivery → delivered
```

(`payment_failed` is a side branch if the mock charge is declined.) On the
order page, the status auto-advances over a few seconds to demonstrate the
full journey; `/admin` can also advance or has visibility into any order's
status, and both stay in sync via the pub/sub layer in `order-service.ts`.

## Security notes for a real deployment

This is a front-end-only demo: cart and orders live in the browser's
`sessionStorage`/`localStorage`, and `/admin` has no authentication. Before
this became a real product you'd want, at minimum:

- A real backend/database instead of `localStorage`.
- Auth in front of `/admin`.
- A real payment integration behind `lib/payment-service.ts`, with secrets
  kept server-side (a Next.js Route Handler or separate backend — never in
  client code).

## Known limitation

Six of the eight menu items use real photography
(`public/images/food/`); **Fried Rice & Chicken** and **Chicken & Chips**
still use the original SVG illustration since no photo was supplied for
them yet. Drop a photo into `public/images/food/` and add a matching
`photo: "/images/food/your-file.jpg"` line to that item in
`lib/mock-data.ts` to switch it over — `components/food-visual.tsx`
automatically prefers the photo and falls back to the illustration when
one isn't set.
