import { cookies } from "next/headers";
import { ACCESS_COOKIE } from "./auth-cookies";

export const API_URL = process.env.API_URL ?? "http://localhost:4000/api/v1";

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

/** The API wraps every response as { success, data } — unwrap to the payload. */
type Envelope<T> = { success: boolean; data: T; message?: string };

function messageOf(body: unknown, fallback: string) {
  const m = (body as { message?: unknown } | null)?.message;
  if (Array.isArray(m)) return m.join(", ");
  return typeof m === "string" ? m : fallback;
}

/**
 * Server-side fetch against the API. Sends the access-token cookie when there
 * is one — most storefront reads are public, but /orders and /auth/me are not.
 */
export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = (await cookies()).get(ACCESS_COOKIE)?.value;

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
    cache: "no-store",
  });

  const body = (await res.json().catch(() => null)) as Envelope<T> | null;
  if (!res.ok) throw new ApiError(res.status, messageOf(body, res.statusText));
  return body?.data as T;
}

/** Same, but returns null instead of throwing — for optional page sections. */
export async function apiFetchSafe<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    return await apiFetch<T>(path, init);
  } catch {
    return null;
  }
}

// ── Catalogue shapes (GET /products, GET /products/:slug) ──────────────────

export type ProductCardDto = {
  id: string;
  slug: string;
  title: string;
  blurb: string | null;
  price: string;
  category: string | null;
  inStock: boolean;
  image: string | null;
};

/** GET /products/:slug returns a different shape to the card — no blurb/image. */
export type ProductDetailDto = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  price: string;
  category: string | null;
  inStock: boolean;
  stockQuantity: number;
  vendor: string;
  images: string[];
};

/** GET /services — the service verticals and whether they are taking work. */
export type ServiceDto = {
  slug: string;
  name: string;
  description: string | null;
  heroImage: string | null;
  icon: string | null;
  comingSoon: boolean;
};

export type Paginated<T> = {
  data: T[];
  meta: { page: number; limit: number; total: number; pages: number };
};
