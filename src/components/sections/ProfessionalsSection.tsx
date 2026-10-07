"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ProfessionalCard, {
  type Professional,
} from "@/components/sections/ProfessionalCard";

const professionals: Professional[] = [
  {
    name: "Dra. Allane F. Guerra",
    role: "Direito de Família e Trabalho",
    areas: ["Família", "Trabalho"],
    oab: "OAB/GO 72.570",
    phone: "(64) 9 9999-5572",
    bio: "Advogada capacitada para te auxiliar com os pilares mais importantes da vida: Trabalho e Família.",
    photoUrl: "/allane.jpg",
  },
  {
    name: "Dr. Paulo H. B. Torres",
    role: "Direito Previdenciário e Bancário",
    areas: ["Previdenciário", "Bancário"],
    oab: "OAB/GO 53.087",
    phone: "(64) 9 9999-5572",
    bio: "Advogado atuante desde o ano de 2018 na área Previdenciária, sempre com intuito de alcançar o melhor para o cliente.",
    photoUrl: "/paulo.jpg",
  },
];

const stagger = ["stagger-1", "stagger-2"];

export default function ProfessionalsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="profissionais"
      className="bg-bg-base py-20"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="mx-auto max-w-300 px-6">
        <div
          className={`mb-12 max-w-160 transition-all duration-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="mb-3 inline-block font-heading text-[11px] font-semibold tracking-[0.12em] text-primary uppercase">
            Equipe jurídica
          </span>
          <h2
            className="mb-4 font-heading leading-[1.2] font-bold text-text-primary"
            style={{ fontSize: "clamp(26px, 3vw, 34px)" }}
          >
            Conheça nossos advogados
          </h2>
          <p className="font-body text-sm leading-relaxed text-text-muted">
            Atendimento humanizado e atuação com estratégia jurídica nas áreas
            de Direito do Trabalho, Previdenciário e Cível. Conte com a nossa
            equipe para proteger seus direitos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {professionals.map((professional, index) => (
            <ProfessionalCard
              key={professional.oab}
              professional={professional}
              visible={isVisible}
              delayClass={stagger[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
