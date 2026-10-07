import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqData";

export default function BioFaq() {
  return (
    <section className="space-y-3" aria-labelledby="bio-faq-title">
      <h3
        id="bio-faq-title"
        className="text-sm font-heading font-semibold text-text-primary"
      >
        Dúvidas frequentes
      </h3>

      <div className="rounded-2xl border border-border-default bg-bg-card px-4">
        <Accordion multiple={false}>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`faq-${index}`}
              className="border-b border-border-default last:border-b-0"
            >
              <AccordionTrigger className="py-3 text-left font-heading text-sm font-medium text-text-primary hover:no-underline hover:text-primary [&>svg]:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-3 text-xs font-body leading-relaxed text-text-muted">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
