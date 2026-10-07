"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, Quote } from "lucide-react";
import { companyData } from "@/data/companyData";
import { depoimentos } from "@/data/depoimentosData";

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="depoimentos"
      className="py-20 bg-bg-section"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-300 mx-auto px-6">
        <div
          className={`text-center mb-14 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-primary font-heading mb-3">
            O que dizem nossos clientes
          </span>
          <h2
            className="font-heading font-bold text-text-primary mb-4 leading-[1.2]"
            style={{ fontSize: "clamp(26px, 3vw, 34px)" }}
          >
            Depoimentos
          </h2>
          <p className="text-text-muted text-sm max-w-120 mx-auto leading-relaxed font-body">
            Clientes que confiaram na {companyData.companyName} para projetos de energia solar e engenharia elétrica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {depoimentos.map((dep, i) => (
            <div
              key={dep.nome + i}
              className={`bg-bg-card border border-border-default rounded-2xl p-6 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Quote className="w-8 h-8 text-primary/40 mb-4" aria-hidden />
              <p className="text-text-secondary text-sm font-body leading-relaxed mb-6">
                &ldquo;{dep.texto}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-bg-base">
                  <Image
                    src={dep.fotoUrl}
                    alt={`Foto de ${dep.nome}`}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-heading font-semibold text-text-primary text-sm">
                    {dep.nome}
                  </p>
                  <p className="text-text-muted text-xs font-body">
                    {dep.contexto}
                  </p>
                  {dep.nota != null && (
                    <div className="flex items-center gap-0.5 mt-1" aria-label={`Avaliação: ${dep.nota} de 5 estrelas`}>
                      {Array.from({ length: 5 }, (_, j) => (
                        <Star
                          key={j}
                          className={`w-3.5 h-3.5 ${j < dep.nota! ? "text-primary fill-primary" : "text-border-default"}`}
                          aria-hidden
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
