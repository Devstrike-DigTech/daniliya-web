import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Daniliya collects, uses and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Privacy Policy"
      updated="Pending"
      intro="This Privacy Policy explains how Daniliya collects, uses, and protects your personal information when you use our platform. We handle your data in line with the Nigeria Data Protection Act (NDPA)."
      sections={[
        {
          heading: "Information we collect",
          body: [
            "Account details such as your name, email, phone number and date of birth.",
            "For affiliates and vendors: identity and payout information (NIN, BVN, bank details and a government-issued ID) collected for verification (KYC).",
            "Usage data such as the links you share, clicks and orders, used to attribute commissions.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "To operate your account, verify your identity, attribute affiliate sales, and pay out commissions.",
            "To process orders and provide customer support.",
            "To improve the platform and keep the network secure and fraud-free.",
          ],
        },
        {
          heading: "How we protect it",
          body: [
            "Sensitive identity data is encrypted and access is restricted. We never sell your personal data.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You may request access to, correction of, or deletion of your personal data, subject to legal and regulatory obligations.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "For privacy requests, contact hello@daniliya.com.",
          ],
        },
      ]}
    />
  );
}
