import { contactInfo } from "@/lib/data";

const cards = [
  { icon: "💬", label: "Call us on WhatsApp", value: contactInfo.whatsapp },
  { icon: "📧", label: "Email us at", value: contactInfo.email },
  { icon: "📍", label: "Location", value: contactInfo.location },
  { icon: "🕑", label: "Response time", value: contactInfo.responseTime },
];

export default function ContactCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {cards.map((card) => (
        <div key={card.label} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
          <span className="text-2xl" aria-hidden>
            {card.icon}
          </span>
          <p className="mt-3 text-xs text-white/50">{card.label}</p>
          <p className="mt-1 text-sm font-bold text-white">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
