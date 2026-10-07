"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqData";

export default function FaqSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="faq"
      className="py-20 bg-linear-to-tr from-bg-base via-bg-section to-bg-base"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-200 mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-primary font-heading mb-3">
            Dúvidas Frequentes
          </span>
          <h2
            className="font-heading font-bold text-text-primary mb-4 leading-[1.2]"
            style={{ fontSize: "clamp(28px, 3.5vw, 36px)" }}
          >
            Perguntas e Respostas
          </h2>
          <p className="text-text-muted text-sm max-w-120 mx-auto leading-relaxed font-body">
            Encontre respostas para as dúvidas mais comuns sobre atendimento
            jurídico, prazos e documentação, nas áreas de Direito do Trabalho,
            Previdenciário e Cível.
          </p>
        </div>

        {/* Accordion */}
        <div
          className={`transition-all duration-500 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <Accordion multiple={false}>
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-b border-border-default last:border-b-0"
              >
                <AccordionTrigger className="py-5 font-heading font-medium text-text-primary text-[15px] hover:no-underline hover:text-primary [&>svg]:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-text-muted text-[14px] font-body leading-[1.7] pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
