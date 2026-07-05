import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import "./globals.css";

// Fallback while the real Product Sans files are not yet in public/fonts/
// (closest available match). See globals.css @font-face — once the files
// are dropped in, "Product Sans" takes over automatically.
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-fallback",
});

export const metadata: Metadata = {
  title: {
    default: "Daniliya — Premium Services, One Home",
    template: "%s | Daniliya",
  },
  description:
    "A unified platform for premium services, curated products, and a proven weekly affiliate income system.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
