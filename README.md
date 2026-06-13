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
| `/checkout` | Checkout (static demo until commerce API is wired) |
| `/order/success` | Order confirmation (static demo) |

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
│   ├── hero-1.jpg … hero-3.jpg       # homepage hero slideshow (1600×1100, crossfades)
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
└── affiliates/hero.jpg               # 1400×800
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
| `user.svg` | "Affiliate programme" tag in home CTA band |
| `feature-fast.svg` `feature-team.svg` `feature-natural.svg` `feature-pricing.svg` | Why-Choose-Us checkerboard cards on all 4 service pages |
| `step-book.svg` `step-clean.svg` `step-fresh.svg` | Our-Process step cards on all 4 service pages |
| `affiliate-payouts.svg` `affiliate-secure.svg` `affiliate-dashboard.svg` `affiliate-training.svg` `affiliate-links.svg` `affiliate-nocap.svg` | "Why join Daniliya" cards on /affiliates |
| **Full-colour:** `stepper-register.svg` `stepper-kyc.svg` `stepper-train.svg` `stepper-links.svg` `stepper-paid.svg` | 5-step earnings stepper on /affiliates |
| **Full-colour:** `contact-whatsapp.svg` `contact-email.svg` `contact-location.svg` `contact-time.svg` | info cards on /contact and /quote |
