export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQs para a seção da home e para JSON-LD FAQPage. */
export const faqs: FaqItem[] = [
  {
    question: "Como funciona a consulta inicial com o escritório?",
    answer:
      "A consulta inicial é o momento de entendermos o seu caso com clareza. Você compartilha fatos e documentos relevantes, e a equipe da GT Advocacia analisa a situação, explica os próximos passos e orienta sobre a melhor estratégia para buscar seus objetivos.",
  },
  {
    question: "Quais documentos devo levar para dar andamento ao meu caso?",
    answer:
      "Em geral, solicitamos documentos pessoais (RG/CPF), comprovantes e tudo o que estiver relacionado ao tema do seu processo (contratos, notificações, decisões, exames, laudos, comprovantes de vínculo/benefício, entre outros). Caso você não tenha tudo, na consulta fazemos um checklist do que falta e quais documentos são mais importantes.",
  },
  {
    question: "O escritório atende em todo o Brasil?",
    answer:
      "Sim. A GT Advocacia coordena demandas com atuação nacional, inclusive por atendimento remoto quando aplicável, mantendo acompanhamento e comunicação com você ao longo do processo.",
  },
  {
    question: "Como são definidos os honorários advocatícios?",
    answer:
      "Os honorários podem variar conforme a complexidade do caso e a etapa do atendimento. Após a análise do seu cenário na consulta inicial, explicamos o modelo de cobrança e as condições de pagamento de forma transparente.",
  },
  {
    question: "Em quanto tempo recebo um retorno após a consulta?",
    answer:
      "Após a consulta inicial, a equipe retorna com orientações e encaminhamentos conforme a necessidade do seu caso. O prazo pode variar de acordo com a complexidade e documentação apresentada, mas buscamos agilidade e clareza nas próximas etapas.",
  },
  {
    question:
      "Minha demanda é de qual área? Trabalho, Previdenciário ou Cível?",
    answer:
      "Durante a consulta inicial, ajudamos você a identificar o enquadramento jurídico do caso. A partir disso, direcionamos para a área mais adequada e montamos uma estratégia compatível com os seus objetivos.",
  },
];
