import Image from "next/image";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export type Professional = {
  name: string;
  role: string;
  areas: string[];
  bio: string;
  photoUrl: string;
  oab: string;
  phone: string;
};

type ProfessionalCardProps = {
  professional: Professional;
  visible: boolean;
  delayClass?: string;
};

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ProfessionalCard({
  professional,
  visible,
  delayClass = "",
}: ProfessionalCardProps) {
  const whatsappUrl = buildWhatsAppUrl(
    professional.phone,
    `Olá, ${professional.name}. Estava no site da GT Advocacia e gostaria de conversar.`
  );

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-border-default bg-bg-card shadow-[0_8px_30px_rgba(31,31,31,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary/70 hover:shadow-[0_16px_36px_rgba(15,23,42,0.1),0_0_24px_rgba(202,164,101,0.2)] ${
        visible ? `animate-fade-in-up ${delayClass}` : "opacity-0"
      }`}
    >
      <div className="relative h-80 overflow-hidden bg-primary-dark sm:h-88">
        <Image
          src={professional.photoUrl}
          alt={`Retrato de ${professional.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 540px"
          className="object-cover object-[center_18%] motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.04]"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/50 to-transparent"
          aria-hidden
        />
        <p className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-primary shadow-sm font-heading">
          {professional.oab}
        </p>
      </div>

      <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
        <h3 className="font-heading text-xl font-bold leading-tight text-text-primary">
          {professional.name}
        </h3>
        <p className="mt-1.5 font-heading text-sm font-medium text-primary">
          {professional.role}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {professional.areas.map((area) => (
            <li
              key={area}
              className="rounded-full border border-secondary/50 bg-secondary/15 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-primary font-heading"
            >
              {area}
            </li>
          ))}
        </ul>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-text-muted font-body">
          {professional.bio}
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Falar com ${professional.name} no WhatsApp`}
          className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-gradient-orange px-4 py-2.5 text-[13px] font-semibold text-white font-heading transition-all hover:-translate-y-0.5 hover:shadow-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-card"
        >
          <WhatsAppIcon />
          Falar no WhatsApp
        </a>
      </div>
    </article>
  );
}
