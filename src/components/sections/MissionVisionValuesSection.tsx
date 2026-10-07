"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Eye, HeartHandshake, Target } from "lucide-react";

const items = [
  {
    title: "Missão",
    icon: Target,
    text: "A missão do escritório é prestar serviços jurídicos com excelência, oferecendo soluções inovadoras para obtenção de resultados expressivos que garantam a satisfação de nossos clientes.",
  },
  {
    title: "Visão",
    icon: Eye,
    text: "Manter o escritório como referência nas áreas de atuação, sendo sempre reconhecido pelos nossos clientes como um escritório moderno, eficiente e de referência.",
  },
  {
    title: "Valores",
    icon: HeartHandshake,
    text: "Exelência na prestação de serviços jurídicos. Integridade e ética na condução de processos. Respeito na interação com clientes e profissionais. Comprometimento da equipe com os objetivos do escritório.",
  },
];

export default function MissionVisionValuesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="valores"
      className="py-20 bg-bg-base"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div>
        <div className="max-w-300 mx-auto px-6">
          <div
            className={`text-center mb-14 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-primary font-heading mb-3">
              Missão, Visão e Valores
            </span>
            <h2
              className="font-heading font-bold text-text-primary mb-4 leading-[1.2]"
              style={{ fontSize: "clamp(28px, 3.5vw, 36px)" }}
            >
              Um jeito de fazer advocacia
            </h2>
            <p className="text-text-muted text-sm max-w-160 mx-auto leading-relaxed font-body">
              Direcionamos nossa atuação para oferecer segurança jurídica, clareza
              e um suporte constante que acompanhe a evolução do seu processo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`bg-bg-card border border-border-default rounded-xl p-6 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                >
                  <div className="w-11 h-11 bg-secondary/25 rounded-xl flex items-center justify-center mb-4 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-text-primary text-[15px] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-[13px] leading-relaxed font-body">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

