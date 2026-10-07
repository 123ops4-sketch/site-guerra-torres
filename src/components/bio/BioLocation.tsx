import { MapPin } from "lucide-react";
import { companyData } from "@/data/companyData";

export default function BioLocation() {
  const unit = companyData.units[0];

  if (!unit) return null;

  return (
    <section className="rounded-2xl border border-border-default bg-bg-card px-4 py-4">
      <h3 className="text-sm font-heading font-semibold text-text-primary">
        Localização
      </h3>
      <p className="mt-1 text-xs font-body leading-relaxed text-text-muted">
        {unit.name} - {unit.address}
      </p>
      <a
        href={unit.mapsLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-xl border border-secondary/50 bg-secondary/15 px-4 py-3 text-sm font-heading font-semibold text-text-primary transition-colors hover:bg-secondary/30"
      >
        <MapPin className="h-4 w-4 text-primary" aria-hidden />
        Abrir no Google Maps
      </a>
    </section>
  );
}
