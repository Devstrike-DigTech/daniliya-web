# Daniliya Web

Public website for the Daniliya Platform — Next.js 16 (App Router), Tailwind CSS v4, TypeScript.

```bash
npm install
npm run dev    # http://localhost:3000
```

## Pages

| Route | Screen |
|---|---|
| `/` | Home |
| `/services` | Services overview |
| `/services/laundry` · `dry-cleaning` · `interior-decoration` · `construction` | Vertical landing pages |
| `/shop` | Book & Shop catalogue |
| `/shop/[slug]` | Product detail |
| `/how-it-works` | How it Works (Customers / Affiliates / Influencers tabs) |
| `/affiliates` | Affiliate programme landing |
| `/quote` | Get a Quote form |
| `/contact` | Contact form |
| `/cart` | Cart — live, persisted (localStorage), shared across the site |
| `/checkout` | Checkout — reads the live cart; Delivery/Pickup + Pay-now/PoD toggles |
| `/order/success` | Order confirmation |
| `/order/track` | Track order — status timeline, courier, tracking number |
| `/dashboard` … `/dashboard/profile` | Affiliate dashboard (post-activation app, dummy data): Overview, My Links, Earnings, Payouts, Referrals, Leaderboard, Resources, Profile/KYC |
| `/join` | Affiliate onboarding wizard — signup → verify → role → KYC → tutorial → assessment → pass/fail/review/rejected (preview any step with `?step=`) |

## Fonts

The design uses **Product Sans**. Drop the files into `public/fonts/` as
`ProductSans-Regular.woff2`, `ProductSans-Medium.woff2`,
`ProductSans-Bold.woff2` and the site switches to them automatically.
Until then it falls back to DM Sans (closest Google Fonts match).

## Replacing the placeholder images

Every image on the site is a generated placeholder in `public/images/` that
**displays its own file path**. To swap in a real image, replace the file
**keeping the exact same filename and `.jpg` extension** — the site picks it
up automatically, no code changes. Recommended dimensions are printed on each
placeholder.

```
public/images/
├── home/
│   ├── hero-affiliate.jpg            # hero carousel — affiliate slide (1100×900)
│   ├── hero-influencer.jpg           # hero carousel — influencer slide (1100×900)
│   ├── hero-vendor.jpg               # hero carousel — vendor slide (1100×900)
│   │   (the book slide reuses products/the-daniliya-method.jpg)
│   ├── possibilities-1.jpg           # "One brand" tall image (900×1100)
│   ├── possibilities-2.jpg           # "One brand" wide image (900×700)
│   ├── service-laundry.jpg           # service cards (1000×750 each)
│   ├── service-dry-cleaning.jpg
│   ├── service-interior-decoration.jpg
│   ├── service-construction.jpg
│   ├── earn-cta.jpg                  # (unused on home — kept for other pages)
│   └── cta-person.png                # "Start earning" cutout person — MUST be transparent PNG (560×840)
├── avatars/avatar-1.jpg … avatar-8.jpg   # testimonial/affiliate faces (300×300)
├── verticals/{laundry,dry-cleaning,interior-decoration,construction}/
│   ├── hero.jpg                      # 1600×900
│   ├── about.jpg                     # 1000×800
│   ├── gallery-1.jpg … gallery-3.jpg # 800×600
│   └── cta-person.png                # CTA cutout — MUST be transparent PNG (560×800)
├── products/
│   ├── the-daniliya-method.jpg       # 900×1200 (book cover)
│   ├── ghost-boys.jpg                # 900×1200 (book cover)
│   ├── premium-laundry-starter-kit.jpg   # 900×900
│   ├── executive-hygiene-bundle.jpg      # 900×900
│   ├── branded-uniform-set.jpg           # 900×900
│   └── affiliate-success-course.jpg      # 900×900
├── how-it-works/
│   ├── hero-1.jpg … hero-3.jpg           # 800×600
│   ├── customer-step-1.jpg … 4.jpg       # 1000×700 (UI screenshots)
│   ├── affiliate-step-1.jpg … 5.jpg      # 1000×700 (UI screenshots)
│   ├── influencer-step-1.jpg … 5.jpg     # 1000×700 (UI screenshots)
│   └── vendor-step-1.jpg … 4.jpg         # 1000×700 (UI screenshots)
├── affiliates/hero.jpg               # 1400×800
└── affiliates/onboarding.jpg         # 900×1100 (sign-up / tutorial visual)
```

Exact dimensions don't need to match — images are `object-cover` cropped —
but keep roughly the same orientation (portrait/landscape/square).

## Editing content

All copy, products, prices, testimonials and service descriptions live in
[`src/lib/data.ts`](src/lib/data.ts). Prices/names are placeholders pending
client confirmation (see comments in that file).

## Not yet wired (waiting on `daniliya-api`)

- Quote/contact form submission (`POST /hub/quote-requests`)
- Real cart, checkout, Paystack payment
- Auth, affiliate/influencer/vendor/admin dashboards

## Replacing the icons

Every UI icon loads from `public/icons/<name>.svg` — replace a file (same
name) and it updates everywhere. Two kinds:

- **Tinted** (most): rendered via CSS mask and coloured by context (gold on
  dark, white on gold, etc.). Download any **single-colour** SVG — its own
  colour is ignored, only the shape matters.
- **Full-colour** (stepper + contact cards): rendered as-is. Download
  colourful SVGs for these.

| File | Used for / where it appears |
|---|---|
| `arrow-right.svg` | every arrow: pill buttons, Learn More, Join Now, card CTAs (site-wide) |
| `plus.svg` | "+ Add to Cart" on product cards |
| `check.svg` | checkmark bullets (vertical pages, product detail, order success) |
| `star.svg` | testimonial ratings (home), book rating (shop hero) |
| `cart.svg` | header cart button |
| `menu.svg` / `close.svg` | mobile hamburger / close |
| `search.svg` | shop search field |
| `sort.svg` | shop price-sort button |
| `clock.svg` | "Coming Soon" pill (services page) |
| `send.svg` | Send Message buttons on /contact and /quote |
| `arrow-left.svg` | "Go Back" (product detail), "Order Summary" / "Delivery Details" back links |
| `minus.svg` | quantity steppers (product detail, checkout cart) |
| `truck.svg` | product delivery line, "Track this Order", track-order status pill, "Estimated delivery" |
| `wallet.svg` | "Paystack secure checkout" line, "Proceed to Payment" |
| `pin.svg` | "Store Location" (checkout pickup), "Ship to" (order/track) |
| `receipt.svg` | "Receipt" info cards (order success/track) |
| `package.svg` | "Items in this order" headings |
| `copy.svg` | Copy buttons (order reference, tracking number) |
| `chevron-right.svg` | reserved — address row affordance |
| `user.svg` | "Affiliate programme" tag in home CTA band |
| `feature-fast.svg` `feature-team.svg` `feature-natural.svg` `feature-pricing.svg` | Why-Choose-Us checkerboard cards on all 4 service pages |
| `step-book.svg` `step-clean.svg` `step-fresh.svg` | Our-Process step cards on all 4 service pages |
| `affiliate-payouts.svg` `affiliate-secure.svg` `affiliate-dashboard.svg` `affiliate-training.svg` `affiliate-links.svg` `affiliate-nocap.svg` | "Why join Daniliya" cards on /affiliates |
| **Full-colour:** `stepper-register.svg` `stepper-kyc.svg` `stepper-train.svg` `stepper-links.svg` `stepper-paid.svg` | 5-step earnings stepper on /affiliates |
| **Full-colour:** `contact-whatsapp.svg` `contact-email.svg` `contact-location.svg` `contact-time.svg` | info cards on /contact and /quote |

## Tutorial videos

The 5 affiliate tutorial lessons embed YouTube. Add the client's video IDs in `src/lib/data.ts` → `tutorialLessons[n].videoId` (the bit after `watch?v=`). Until then each lesson shows a poster with a play button; once an ID is set, clicking play loads the embed.
