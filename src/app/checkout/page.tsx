import type { Metadata } from "next";
import { Suspense } from "react";
import Ambient from "@/components/Ambient";
import CheckoutFlow from "@/components/CheckoutFlow";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Delivery details and payment.",
};

export default function CheckoutPage() {
  return (
    <section className="mx-auto max-w-[1376px] px-4 py-12 sm:px-8">
      <Ambient theme="checkout" />
      {/* CheckoutFlow reads ?ref (affiliate code) via useSearchParams. */}
      <Suspense fallback={<p className="text-sm text-ink/50">Loading checkout…</p>}>
        <CheckoutFlow />
      </Suspense>
    </section>
  );
}
