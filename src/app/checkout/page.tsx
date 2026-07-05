import type { Metadata } from "next";
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
      <CheckoutFlow />
    </section>
  );
}
