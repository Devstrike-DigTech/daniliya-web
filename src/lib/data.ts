// Placeholder content for the public site. Copy, prices and images are
// stand-ins pending client confirmation — edit here and everything updates.
// Images live in /public/images; replace a file (same name) to swap it in.

export type Vertical = {
  slug: string;
  name: string;
  tagline: string;
  heroTitle: [string, string];
  heroText: string;
  badges: string[];
  about: {
    title: string;
    text: string;
    stat: { value: string; label: string };
  };
  features: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  cta: { title: string; text: string };
};

export const verticals: Vertical[] = [
  {
    slug: "laundry",
    name: "Laundry",
    tagline: "Laundry done right.",
    heroTitle: ["PREMIUM CLEANING.", "AVAILABLE NOW"],
    heroText:
      "From bedrooms to balconies, our trained team delivers a spotless, healthy space — on your schedule, at a fair price.",
    badges: [
      "Trusted Professionals",
      "Flexible Scheduling",
      "Eco-Friendly Products",
      "Affordable Pricing",
    ],
    about: {
      title: "A serious standard for cleaning in Nigeria",
      text: "Daniliya Cleaning Services renders top-notch ironing, washing and dry-cleaning services with experienced hands. Every wash is handled with care, every delivery is on time.",
      stat: { value: "250+", label: "happy clients across Abuja" },
    },
    features: [
      {
        title: "Fast service",
        text: "We respond quickly and finish on time. Express options for when you need it back tomorrow.",
      },
      {
        title: "Experienced team",
        text: "Vetted, trained professionals who treat your garments and your home with respect.",
      },
      {
        title: "Natural products",
        text: "Eco-friendly, skin-safe detergents that protect fabrics and the environment.",
      },
      {
        title: "Affordable pricing",
        text: "Transparent rates with no hidden charges. Pay for exactly what you get.",
      },
    ],
    steps: [
      {
        title: "Book your service",
        text: "Choose your cleaning service, pick a date and tell us where to come.",
      },
      {
        title: "We do the cleaning",
        text: "Our team arrives on schedule with everything needed for a thorough job.",
      },
      {
        title: "Enjoy a fresh space",
        text: "Walk back into a spotless space — and book your next slot in one tap.",
      },
    ],
    cta: {
      title: "Ready for a serious clean?",
      text: "Get a tailored quote within 24 hours. No obligations.",
    },
  },
  {
    slug: "dry-cleaning",
    name: "Dry Cleaning",
    tagline: "Dry cleaning mastery.",
    heroTitle: ["DRY CLEANING.", "MASTERED"],
    heroText:
      "Your finest garments deserve the finest care. Crisp, careful, delivered back to you ready to wear.",
    badges: [
      "Garment-Safe Process",
      "Pickup & Delivery",
      "Stain Specialists",
      "On-Time, Every Time",
    ],
    about: {
      title: "Care your wardrobe can feel",
      text: "Suits, agbadas, gowns and delicate fabrics handled by specialists using garment-safe processes developed for Nigerian climate conditions.",
      stat: { value: "48hr", label: "standard turnaround" },
    },
    features: [
      {
        title: "Stain mastery",
        text: "Targeted treatment for oil, ink and palm-oil stains that regular washing can't touch.",
      },
      {
        title: "Fabric-first process",
        text: "Each garment is assessed and processed according to its fabric, not a one-size cycle.",
      },
      {
        title: "Pickup & delivery",
        text: "We collect and return at your door, on your schedule.",
      },
      {
        title: "Pressed to perfection",
        text: "Every item returned crisp, folded or hung exactly how you want it.",
      },
    ],
    steps: [
      {
        title: "Schedule a pickup",
        text: "Tell us what you have and when to collect it.",
      },
      {
        title: "We clean with care",
        text: "Specialist cleaning, stain treatment and finishing.",
      },
      {
        title: "Delivered back fresh",
        text: "Your wardrobe returned ready to wear.",
      },
    ],
    cta: {
      title: "Give your garments expert care",
      text: "Book a pickup or request a quote today.",
    },
  },
  {
    slug: "interior-decoration",
    name: "Interior Decoration",
    tagline: "Where spaces come alive.",
    heroTitle: ["SPACES THAT", "COME ALIVE"],
    heroText:
      "Finish by Daniliya — interior and exterior design, home automation and connectivity, delivered with quiet luxury.",
    badges: [
      "Design Consultation",
      "Home Automation",
      "Premium Finishing",
      "Project Management",
    ],
    about: {
      title: "Finish by Daniliya",
      text: "From a single room refresh to a full architectural finish, we design and deliver spaces that feel as good as they look — homes, offices and commercial spaces.",
      stat: { value: "100%", label: "design-led, end to end" },
    },
    features: [
      {
        title: "Design consultation",
        text: "Sit with a senior designer and turn your taste into a concrete plan and budget.",
      },
      {
        title: "Smart home automation",
        text: "Lighting, security and internet connectivity designed into the space, not bolted on.",
      },
      {
        title: "Premium materials",
        text: "Curated finishes and furniture sourced for durability and elegance.",
      },
      {
        title: "Managed delivery",
        text: "One team accountable from concept to handover — no contractor roulette.",
      },
    ],
    steps: [
      {
        title: "Share your vision",
        text: "Send us your space, inspiration and budget.",
      },
      {
        title: "Approve the design",
        text: "We present concepts, materials and a clear quote.",
      },
      {
        title: "Watch it come alive",
        text: "We build, finish and hand over your transformed space.",
      },
    ],
    cta: {
      title: "Let's transform your space",
      text: "Book a design consultation or request a quote.",
    },
  },
  {
    slug: "construction",
    name: "Construction",
    tagline: "Built to last. Built by Daniliya.",
    heroTitle: ["BUILT TO LAST.", "BUILT BY DANILIYA"],
    heroText:
      "Residential and commercial construction delivered with engineering discipline, honest timelines and materials that endure.",
    badges: [
      "Certified Engineers",
      "Transparent Costing",
      "Quality Materials",
      "On-Schedule Delivery",
    ],
    about: {
      title: "Construction with integrity",
      text: "From foundations to finishing, Daniliya Construction manages your build with documented milestones, verified materials and site supervision you can trust.",
      stat: { value: "10+", label: "years of combined site experience" },
    },
    features: [
      {
        title: "Honest engineering",
        text: "Structural decisions made by professionals, documented and explained.",
      },
      {
        title: "Transparent costing",
        text: "Bills of quantity you can read, with no surprise variations.",
      },
      {
        title: "Verified materials",
        text: "We buy and test materials openly — what's specified is what's used.",
      },
      {
        title: "Milestone reporting",
        text: "Photo and progress reports at every stage, wherever you are.",
      },
    ],
    steps: [
      {
        title: "Brief us on the project",
        text: "Land, drawings or just an idea — start the conversation.",
      },
      {
        title: "Agree scope & milestones",
        text: "Clear costing, timeline and supervision plan before work starts.",
      },
      {
        title: "We build, you verify",
        text: "Stage-by-stage delivery with reports until handover.",
      },
    ],
    cta: {
      title: "Planning a build?",
      text: "Talk to our engineers and get a realistic quote.",
    },
  },
];

export type Product = {
  slug: string;
  title: string;
  category: string;
  /** Small pill shown on the card, e.g. "Digital" / "Marketplace" */
  chip: string;
  price: number;
  /** Struck-through compare-at price */
  oldPrice?: number;
  /** Optional "Save ₦x" badge on the card image */
  badge?: string;
  blurb: string;
  description: string;
  image: string;
};

// NOTE: names and prices are placeholders pending client confirmation
// (intake form says the book is "Builder Handbook" at ₦50,000; the designs
// show "The Daniliya Method" at ₦5,000 — to be resolved with the client).
export const products: Product[] = [
  {
    slug: "the-daniliya-method",
    title: "The Daniliya Method",
    category: "Books",
    chip: "Digital",
    price: 5000,
    oldPrice: 15000,
    blurb:
      "A complete guide to building multiple service businesses and unlocking affiliate income in Nigeria.",
    description:
      "A practical look at standards, discipline and growth — how to build service businesses that Nigerians trust. 240 pages of field-tested methods from Samuel Nuhu Iliya.",
    image: "/images/products/the-daniliya-method.jpg",
  },
  {
    slug: "premium-laundry-starter-kit",
    title: "Laundry Starter Bundle",
    category: "Bundles",
    chip: "Marketplace",
    price: 19000,
    oldPrice: 25000,
    blurb: "Everything you need to launch a dry cleaning side income",
    description:
      "A curated bundle of professional-grade laundry essentials, picked by the Daniliya team for anyone starting a home laundry or dry-cleaning side business.",
    image: "/images/products/premium-laundry-starter-kit.jpg",
  },
  {
    slug: "executive-hygiene-bundle",
    title: "Executive Hygiene Bundle",
    category: "Bundles",
    chip: "Marketplace",
    price: 25000,
    oldPrice: 35000,
    badge: "Save ₦10,000",
    blurb:
      "One 90-minute professional interior consultation with a senior Daniliya designer.",
    description:
      "A premium selection of hygiene and home-care products for executives and busy households, curated and quality-checked by Daniliya.",
    image: "/images/products/executive-hygiene-bundle.jpg",
  },
  {
    slug: "branded-uniform-set",
    title: "Branded Uniform Set",
    category: "Merch",
    chip: "Marketplace",
    price: 12000,
    blurb: "Official Daniliya workwear, built for the job.",
    description:
      "Durable, comfortable branded workwear in the Daniliya black and yellow. Made to handle real work and still look sharp.",
    image: "/images/products/branded-uniform-set.jpg",
  },
  {
    slug: "affiliate-success-course",
    title: "Affiliate Success Course",
    category: "Courses",
    chip: "Digital",
    price: 15000,
    blurb: "Learn to earn every Monday with the Daniliya network.",
    description:
      "A step-by-step video course on promoting Daniliya products effectively — from your first shared link to consistent weekly payouts.",
    image: "/images/products/affiliate-success-course.jpg",
  },
  {
    slug: "ghost-boys",
    title: "Ghost Boys",
    category: "Books",
    chip: "Digital",
    price: 4500,
    blurb: "A gripping read from the Daniliya shelf.",
    description:
      "Part of the curated Daniliya bookshelf — stories and ideas worth your time, selected for our community of readers.",
    image: "/images/products/ghost-boys.jpg",
  },
];

export const productCategories = ["All", "Books", "Bundles", "Merch", "Courses"];

export type Testimonial = { name: string; role: string; quote: string };

export const testimonials: Testimonial[] = [
  {
    name: "Adaeze O.",
    role: "Affiliate, Abuja",
    quote:
      "I made ₦147,000 in my first month sharing links. The Monday payout is a real thing.",
  },
  {
    name: "Tunde A.",
    role: "Marketplace customer",
    quote: "Cleanest delivery I've had in Lagos. Packaging was top-tier",
  },
  {
    name: "Chioma E.",
    role: "Cleaning client",
    quote:
      "Booked a fumigation in two clicks. Team arrived in uniforms. Very serious people.",
  },
];

export const affiliateSteps = [
  {
    title: "Register & submit KYC",
    text: "Create your account and verify your identity with your NIN and bank details. It keeps the network safe and your payouts smooth.",
  },
  {
    title: "Complete the training",
    text: "A short, practical tutorial on how the programme works and how to promote products honestly and effectively.",
  },
  {
    title: "Pass the assessment",
    text: "A quick quiz to confirm you're ready. Score the pass mark and you're activated instantly.",
  },
  {
    title: "Get your links",
    text: "Receive your unique payment links for every product. Share them anywhere — WhatsApp, Instagram, your status.",
  },
  {
    title: "Earn every Monday",
    text: "Every confirmed sale earns you a fixed commission. Payouts go out every Monday — watch the countdown on your dashboard.",
  },
];

export const affiliateFeatures = [
  {
    title: "Weekly Monday payouts",
    text: "No waiting for 'month end'. Confirmed earnings are queued and paid out every single Monday.",
  },
  {
    title: "KYC-verified & secure",
    text: "Every affiliate is identity-verified. Your earnings ledger is permanent and tamper-proof.",
  },
  {
    title: "Full dashboard visibility",
    text: "Track your clicks, sales and earnings in real time — and a live countdown to your next payout.",
  },
  {
    title: "Free training programme",
    text: "Learn exactly how to promote before you start. No guesswork, no spam tactics.",
  },
  {
    title: "Per-product payment links",
    text: "A unique link for every product you promote, so every sale is attributed to you. Always.",
  },
  {
    title: "No earning cap",
    text: "Flat commission on every sale you drive. Ten sales, ten commissions. No ceilings.",
  },
];

export const customerSteps = [
  {
    title: "Browse & discover",
    text: "Explore all the Daniliya services from the homepage or navigate directly to the service you need. Every vertical has its own page with portfolio, pricing and CTAs.",
  },
  {
    title: "Book or buy",
    text: "Submit a service booking, request a tailored quote, or purchase a product directly from the store. Checkout is powered by Paystack — fast, secure, and Nigerian-native.",
  },
  {
    title: "Get confirmation",
    text: "You receive an instant confirmation via email and WhatsApp. For service bookings, we follow up within 2 hours. For orders, you get a tracking reference immediately.",
  },
  {
    title: "Track & receive",
    text: "Track your order or service status in real time. From 'Pending' to 'Confirmed' to 'In Progress' to 'Delivered'. We keep you updated at every stage without you asking.",
  },
];

export const influencerSteps = [
  {
    title: "Apply to the programme",
    text: "Tell us about your platform, niche and audience. Our team reviews and approves influencers personally.",
  },
  {
    title: "Receive a campaign",
    text: "Get assigned campaigns with a clear brief, your own tracked link and a unique promo code.",
  },
  {
    title: "Create & share",
    text: "Post on your platforms using your link and code. Every click and conversion is attributed to you.",
  },
  {
    title: "Get paid per campaign",
    text: "Earn a flat fee or commission per campaign, paid out in the same trusted Monday cycle.",
  },
];

export const contactInfo = {
  whatsapp: "+234 800 DANILIYA",
  email: "hello@daniliya.com",
  location: "Abuja, Nigeria",
  responseTime: "Within 2 hours (8am–8pm WAT)",
};
