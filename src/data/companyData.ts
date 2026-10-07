export interface CompanyUnit {
  name: string;
  address: string;
  phones: string[];
  mapsEmbedUrl: string;
  mapsLinkUrl: string;
}

export interface CompanySocial {
  instagram?: { url: string; label: string };
  youtube?: { url: string; label: string };
  facebook?: { url: string; label: string };
  linkedin?: { url: string; label: string };
  tiktok?: { url: string; label: string };
  podcast?: { url: string; label: string };
}

export interface CompanyData {
  companyName: string;
  siteUrl: string;
  whatsapp: string;
  phone: string;
  email: string;
  businessHours: string;
  social: CompanySocial;
  units: CompanyUnit[];
  quoteOptions: string[];
}

// Dados institucionais estáticos da empresa.
// A URL oficial do site é preenchida via .env (NEXT_PUBLIC_SITE_URL) onde necessário.
export const companyData: CompanyData = {
  companyName: "GT Advocacia",
  siteUrl: "lgtadvocacia.com.br",
  whatsapp: "64 9 9999-5572",
  phone: "(64) 9 9999-5572",
  email: "guerraetorresadvocacia@gmail.com",
  businessHours: "Segunda a Sexta: 8h às 18h",
  social: {
    // Exemplo de preenchimento:
    instagram: {
      url: "https://instagram.com/lgt.advocacia",
      label: "@lgt.advocacia",
    },
    facebook: {
      url: "https://facebook.com/lgt.advocacia",
      label: "GT Advocacia",
    },
    youtube: {
      url: "",
      label: "",
    },
    linkedin: {
      url: "",
      label: "",
    },
    tiktok: {
      url: "",
      label: "",
    },
  },
  units: [
    // Exemplo de unidade:
    {
      name: "Itumbiara / GO",
      address:
        "R. Adejar Ferreira Machado, 383 - St. Santos Dumont - Itumbiara - GO - 75530-390",
      phones: ["(64) 9 9999-5572"],
      mapsEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.438932885418!2d-49.22484373164055!3d-18.41836946249094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94a10d1516d49237%3A0xaf6dd49c90ce4857!2sR.%20Adejar%20Ferreira%20Machado%2C%20383%20-%20St.%20Santos%20Dumont%2C%20Itumbiara%20-%20GO%2C%2075530-390!5e0!3m2!1spt-BR!2sbr!4v1773927800631!5m2!1spt-BR!2sbr",
      mapsLinkUrl:
        "https://www.google.com/maps/search/?api=1&query=R.%20Adejar%20Ferreira%20Machado%2C%20383%20-%20St.%20Santos%20Dumont%2C%20Itumbiara%20-%20GO%2C%2075530-390",
    },
  ],
  quoteOptions: [
    "Direito do Trabalho",
    "Direito Previdenciário",
    "Direito Cível",
    "Direito Bancário",
    "Outros",
  ],
};
