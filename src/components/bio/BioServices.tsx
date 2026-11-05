import { Scale, UserRound, FileText, Landmark, ShoppingCart } from "lucide-react";
import { servicesData } from "@/data/servicesData";

const icons = [Scale, UserRound, FileText, Landmark, ShoppingCart] as const;

export default function BioServices() {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-heading font-semibold text-text-primary">
        Especialidades
      </h3>

      <div className="space-y-2">
        {servicesData.map((service, index) => {
          const Icon = icons[index];

          return (
            <article
              key={service.title}
              className="rounded-xl border border-border-default bg-bg-card px-4 py-3"
            >
              <div className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-secondary/25 text-primary">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <h4 className="text-sm font-heading font-semibold text-text-primary">
                    {service.title}
                  </h4>
                  <p className="mt-1 text-xs font-body leading-relaxed text-text-muted">
                    {service.description}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
