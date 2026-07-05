// External portal apps. Each lives in its own repo/deployment; the landing
// site redirects users out to them. Configure per-environment via env vars.
export const portals = {
  affiliate: process.env.NEXT_PUBLIC_AFFILIATE_URL || "http://localhost:3001",
  influencer: process.env.NEXT_PUBLIC_INFLUENCER_URL || "http://localhost:3002",
  vendor: process.env.NEXT_PUBLIC_VENDOR_URL || "http://localhost:3003",
  admin: process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3004",
} as const;

export type Portal = keyof typeof portals;
