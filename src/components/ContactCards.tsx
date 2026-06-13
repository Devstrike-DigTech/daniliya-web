import Icon from "@/components/Icon";
import { contactInfo } from "@/lib/data";

const cards = [
  { icon: "contact-whatsapp", label: "Call us on WhatsApp", value: contactInfo.whatsapp },
  { icon: "contact-email", label: "Email us at", value: contactInfo.email },
  { icon: "contact-location", label: "Location", value: contactInfo.location },
  { icon: "contact-time", label: "Response time", value: contactInfo.responseTime },
];

export default function ContactCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {cards.map((card) => (
        <div key={card.label} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
          <Icon name={card.icon} size={52} tint={false} />
          <p className="mt-5 text-sm text-white/55">{card.label}</p>
          <p className="mt-1.5 text-[18px] font-bold text-white">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
