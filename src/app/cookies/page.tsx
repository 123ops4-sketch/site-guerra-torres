import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { companyData } from "@/data/companyData";
import { ChevronRight } from "lucide-react";
import AlterarPreferenciasButton from "@/app/cookies/AlterarPreferenciasButton";

const title = `Cookies — Entenda o uso de cookies | ${companyData.companyName}`;
const description =
  "Informações sobre o uso de cookies neste site, em conformidade com a LGPD. Cookies essenciais e opcionais, como alterar preferências.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cookies" },
  openGraph: {
    title,
    description,
    url: "/cookies",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

const breadcrumbItems = [
  { label: "Início", href: "/" },
  { label: "Cookies", href: "/cookies" },
];

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-base">
        <div className="max-w-180 mx-auto px-6 py-10">
          {/* Breadcrumb */}
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

          <h1 className="font-heading font-bold text-2xl text-text-primary mb-2">
            Uso de cookies
          </h1>
          <p className="text-text-faint text-sm font-body mb-8">
            Esta página explica o que são cookies, como os utilizamos e como
            você pode gerenciar suas preferências, em conformidade com a Lei
            Geral de Proteção de Dados (LGPD — Lei 13.709/2018).
          </p>

          <section className="space-y-6 text-text-faint text-sm font-body leading-relaxed">
            <div>
              <h2 className="font-heading font-semibold text-text-primary mb-2 text-base">
                O que são cookies?
              </h2>
              <p>
                Cookies são pequenos arquivos de texto armazenados no seu
                dispositivo quando você visita um site. Eles permitem que o site
                lembre de preferências, melhore a navegação e, quando você
                autorizar, auxiliem em análises de uso.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-semibold text-text-primary mb-2 text-base">
                Cookies essenciais
              </h2>
              <p>
                São necessários para o funcionamento básico do site (por
                exemplo, lembrar sua escolha de cookies, segurança e carregamento
                correto das páginas). Não exigem consentimento prévio por serem
                estritamente necessários ao serviço.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-semibold text-text-primary mb-2 text-base">
                Cookies opcionais
              </h2>
              <p>
                Podem ser usados para melhorar sua experiência (preferências de
                interface), análises de uso do site ou outras finalidades
                informadas no banner. Só são utilizados com seu consentimento
                prévio, em conformidade com o Art. 8º da LGPD.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-semibold text-text-primary mb-2 text-base">
                Cookies de terceiros
              </h2>
              <p className="mb-2">
                Quando você aceita cookies opcionais, o site pode carregar
                ferramentas de terceiros que utilizam seus próprios cookies.
                Eles estão documentados abaixo e só são ativados com seu
                consentimento:
              </p>
              <ul className="list-disc list-inside space-y-1 text-text-muted">
                <li>
                  <strong className="text-text-faint">Google Analytics</strong> — análise de acesso e uso do site (métricas de página, origem, dispositivo).
                </li>
                <li>
                  <strong className="text-text-faint">Google Tag Manager</strong> — gerenciamento de tags e scripts (quando utilizado).
                </li>
                <li>
                  <strong className="text-text-faint">Meta Pixel (Facebook)</strong> — remarketing e medição de conversões em anúncios.
                </li>
              </ul>
              <p className="mt-2">
                Você pode revogar o consentimento a qualquer momento alterando
                suas preferências (botão abaixo) ou bloqueando cookies no seu navegador.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-semibold text-text-primary mb-2 text-base">
                Base legal e seus direitos
              </h2>
              <p>
                O tratamento de dados por meio de cookies está alinhado à LGPD:
                consentimento para cookies opcionais, necessidade para os
                essenciais. Você pode a qualquer momento alterar suas
                preferências, revogar o consentimento ou solicitar informações
                sobre os dados tratados entrando em contato conosco pelo e-mail:{" "}
                <a
                  href={`mailto:${companyData.email}`}
                  className="text-primary hover:underline"
                >
                  {companyData.email}
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="font-heading font-semibold text-text-primary mb-2 text-base">
                Como alterar suas preferências
              </h2>
              <p className="mb-4">
                Você pode revisar e alterar suas preferências de cookies a
                qualquer momento. Ao clicar no botão abaixo, o aviso é aberto
                nesta página para você manter apenas os essenciais, aceitar
                todos ou personalizar a escolha. A preferência anterior só muda
                quando você salva uma nova.
              </p>
              <AlterarPreferenciasButton />
            </div>

            <p className="pt-4 text-xs text-text-muted">
              Para mais informações sobre o tratamento de dados pessoais,
              consulte nossa{" "}
              <Link href="/politica-de-privacidade" className="text-primary hover:underline">
                Política de Privacidade
              </Link>{" "}
              e{" "}
              <Link href="/termos-de-uso" className="text-primary hover:underline">
                Termos de Uso
              </Link>{" "}
              no rodapé do site.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
