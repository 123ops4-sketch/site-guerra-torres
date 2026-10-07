import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { companyData } from "@/data/companyData";
import { ChevronRight } from "lucide-react";
import {
  termsOfUseTitle,
  getTermsOfUseContent,
} from "@/data/legalContent";

export const metadata: Metadata = {
  title: `${termsOfUseTitle} | ${companyData.companyName}`,
  description: `Termos de Uso do site da ${companyData.companyName} Engenharia. Condições de uso do site e dos serviços.`,
  alternates: { canonical: "/termos-de-uso" },
};

const breadcrumbItems = [
  { label: "Início", href: "/" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
];

export default function TermosDeUsoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-base">
        <div className="max-w-180 mx-auto px-6 py-10">
          <nav
            aria-label="Navegação estrutural"
            className="mb-8 flex items-center gap-1 text-sm font-body text-text-muted"
          >
            {breadcrumbItems.map((item, i) => (
              <span key={item.href} className="flex items-center gap-1">
                {i > 0 && (
                  <ChevronRight className="h-4 w-4 shrink-0 text-text-faint" aria-hidden />
                )}
                {i === breadcrumbItems.length - 1 ? (
                  <span className="text-text-primary">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>

          <h1 className="font-heading font-bold text-2xl text-text-primary mb-8">
            {termsOfUseTitle}
          </h1>

          <div
            className="[&_h3]:font-heading [&_h3]:font-semibold [&_h3]:text-text-primary [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-sm [&_p]:mb-4 [&_p]:text-text-faint [&_p]:text-sm [&_p]:font-body [&_p]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: getTermsOfUseContent() }}
          />

          <p className="mt-8 text-text-muted text-sm font-body">
            <Link href="/" className="text-primary hover:underline">
              Voltar ao início
            </Link>
            {" · "}
            <Link href="/politica-de-privacidade" className="text-primary hover:underline">
              Política de Privacidade
            </Link>
            {" · "}
            <Link href="/cookies" className="text-primary hover:underline">
              Cookies
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
