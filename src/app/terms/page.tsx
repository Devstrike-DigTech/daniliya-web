import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms governing your use of the Daniliya platform.",
};

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Terms of Use"
      updated="Pending"
      intro="These Terms of Use govern your access to and use of the Daniliya platform — our website, marketplace, affiliate programme and related services. By creating an account or using Daniliya, you agree to these terms."
      sections={[
        {
          heading: "Your account",
          body: [
            "You must provide accurate information when registering and keep your login details secure. You are responsible for activity under your account.",
            "Affiliates and vendors must complete identity verification (KYC) before earnings can be paid out.",
          ],
        },
        {
          heading: "The affiliate programme",
          body: [
            "Affiliates earn a flat commission of ₦10,000 on each qualifying book sale made through their unique payment link.",
            "Confirmed commissions are disbursed weekly, every Monday, to the bank account on file. Commissions on refunded or reversed orders are deducted.",
            "Spam, impersonation, and misleading promotion are prohibited and may result in removal from the programme.",
          ],
        },
        {
          heading: "Orders & payments",
          body: [
            "Payments are processed securely through our payment partners. Prices are listed in Nigerian Naira.",
            "Refund and return eligibility is described at checkout and may vary by product.",
          ],
        },
        {
          heading: "Acceptable use",
          body: [
            "You agree not to misuse the platform, attempt to disrupt it, or use it for unlawful purposes.",
          ],
        },
        {
          heading: "Changes to these terms",
          body: [
            "We may update these terms from time to time. Material changes will be communicated through the platform.",
          ],
        },
      ]}
    />
  );
}
