"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Scale,
  UserRound,
  FileText,
  Landmark,
  ShoppingCart,
} from "lucide-react";
import { servicesData } from "@/data/servicesData";

const serviceIcons = [Scale, UserRound, FileText, Landmark, ShoppingCart] as const;

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="especialidades"
      className="py-20 bg-linear-to-tr from-bg-base via-bg-section to-bg-base"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-300 mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-primary font-heading mb-3">
            Áreas de atuação
          </span>
          <h2
            className="font-heading font-bold text-text-primary mb-4 leading-[1.2]"
            style={{ fontSize: "clamp(28px, 3.5vw, 36px)" }}
          >
            Especialidades Jurídicas
          </h2>
          <p className="text-text-muted text-sm max-w-130 mx-auto leading-relaxed font-body">
            Atuação focada em estratégia e segurança jurídica. Escolha sua
            área e conheça como o escritório pode ajudar em cada etapa.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {servicesData.map((service, i) => {
            const Icon = serviceIcons[i];
            const delayClass = [
              "stagger-1",
              "stagger-2",
              "stagger-3",
              "stagger-4",
              "stagger-5",
            ][i];
            // Último card ocupa a linha inteira quando o total é ímpar (evita card órfão).
            const spanClass =
              servicesData.length % 2 === 1 && i === servicesData.length - 1
                ? "sm:col-span-2"
                : "";
            return (
              <div
                key={service.title}
                className={`bg-bg-card border border-border-default rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/70 hover:shadow-[0_12px_28px_rgba(15,23,42,0.12),0_0_20px_rgba(202,164,101,0.22)] cursor-pointer group ${spanClass} ${isVisible
                  ? `animate-fade-in-up ${delayClass}`
                  : "opacity-0"
                  }`}
              >
                <div className="w-11 h-11 bg-secondary/25 rounded-xl flex items-center justify-center mb-4 text-primary group-hover:bg-secondary/40 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-semibold text-text-primary text-[15px] mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-text-muted text-[13px] leading-relaxed font-body">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
