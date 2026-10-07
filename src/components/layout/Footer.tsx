import { Instagram, Youtube, Facebook, Mic } from "lucide-react";
import { companyData } from "@/data/companyData";
import FooterLegal from "./FooterLegal";
import Image from "next/image";

const footerLinks = {
  empresa: [
    { label: `Sobre a ${companyData.companyName}`, href: "#sobre" },
    { label: "Missão, Visão e Valores", href: "#valores" },
    { label: "Profissionais", href: "#profissionais" },
    { label: "FAQ", href: "#faq" },
    { label: "Contato", href: "#contato" },
  ],
  servicos: [
    { label: "Direito do Trabalho", href: "#especialidades" },
    { label: "Direito Previdenciário", href: "#especialidades" },
    { label: "Direito Cível", href: "#especialidades" },
    { label: "Direito Bancário", href: "#especialidades" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-subtle pt-16 pb-8">
      <div className="max-w-300 mx-auto px-6">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-1">
              <div className="w-full h-auto flex items-center justify-start mb-2">
                <Image src="/enterprise-logo.png" alt={companyData.companyName} width={120} height={120} className="object-contain object-left group-hover:opacity-90 transition-opacity" />
              </div>
              {/* <span className="font-heading font-bold text-lg text-white tracking-tight">
                {companyData.companyName}
              </span> */}
            </div>
            <p className="text-muted-foreground text-[13px] font-body leading-[1.7] max-w-70 mb-5">
              Escritório de advocacia especializado em Direito do Trabalho,
              Previdenciário e Cível. Atendimento em todo o Brasil.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {companyData.social.instagram?.url && (
                <a
                  href={companyData.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg border border-border-default flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {companyData.social.youtube?.url && (
                <a
                  href={companyData.social.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-lg border border-border-default flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {companyData.social.facebook?.url && (
                <a
                  href={companyData.social.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-lg border border-border-default flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {companyData.social.podcast?.url && (
                <a
                  href={companyData.social.podcast.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Podcast"
                  className="w-9 h-9 rounded-lg border border-border-default flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all"
                >
                  <Mic className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Links — Empresa */}
          <div>
            <h4 className="font-heading text-[12px] font-bold uppercase tracking-widest text-text-primary mb-4">
              Empresa
            </h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-faint text-[13px] font-body hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links — Especialidades */}
          <div>
            <h4 className="font-heading text-[12px] font-bold uppercase tracking-widest text-text-primary mb-4">
              Especialidades
            </h4>
            <ul className="space-y-2">
              {footerLinks.servicos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-faint text-[13px] font-body hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <FooterLegal />
      </div>
    </footer>
  );
}
