import type { Metadata } from "next";
import Ambient from "@/components/Ambient";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Your Cart",
};

export default function CartPage() {
  return (
    <section className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6">
      <Ambient theme="shop" />
      <CartView />
    </section>
  );
}
