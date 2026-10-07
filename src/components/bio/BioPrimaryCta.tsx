import { MessageCircle } from "lucide-react";
import { companyData } from "@/data/companyData";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const DEFAULT_MESSAGE =
  "Olá! Vim pelo link da bio e quero falar sobre meu caso.";

export default function BioPrimaryCta() {
  const whatsappUrl = buildWhatsAppUrl(companyData.whatsapp, DEFAULT_MESSAGE);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-orange px-4 py-3 text-sm font-heading font-semibold text-white shadow-orange transition-all hover:brightness-105"
      aria-label="Conversar agora no WhatsApp"
    >
      <MessageCircle className="h-4 w-4" aria-hidden />
      Conversar agora no WhatsApp
    </a>
  );
}
