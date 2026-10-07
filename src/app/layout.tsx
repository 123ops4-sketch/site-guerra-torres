import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Analytics from "@/components/Analytics";
import JsonLdOrganization from "@/components/seo/JsonLdOrganization";
import { companyData } from "@/data/companyData";
import { getBaseUrl } from "@/lib/env";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteName = `${companyData.companyName}`;

/** Title 50–60 chars para SEO. */
function buildTitle(): string {
  const full = `${siteName} — Direito do Trabalho, Previdenciário e Cível`;
  return full.length > 60 ? full.slice(0, 57).trim() + "..." : full;
}

/** Meta description 150–160 chars para SEO. */
function buildDescription(): string {
  const full = `A ${siteName} oferece atendimento jurídico especializado em Direito do Trabalho, Previdenciário e Cível. Agende sua consulta.`;
  return full.length > 160 ? full.slice(0, 157).trim() + "..." : full;
}

const title = buildTitle();
const description = buildDescription();
const ogDescription = `Atendimento jurídico especializado em Direito do Trabalho, Previdenciário e Cível. Agende uma consulta com a ${companyData.companyName}.`;

function normalizeBaseUrl(url: string): string | undefined {
  const trimmed = url.trim();
  if (!trimmed) return undefined;

  // Se vier sem protocolo (ex: "kwenergia.com.br"), presumimos HTTPS.
  if (!/^https?:\/\//i.test(trimmed)) {
    if (trimmed.startsWith("//")) return `https:${trimmed}`;
    return `https://${trimmed}`;
  }

  return trimmed;
}

const resolvedBaseUrl =
  normalizeBaseUrl(getBaseUrl()) || normalizeBaseUrl(companyData.siteUrl);
const metadataBase = resolvedBaseUrl ? new URL(resolvedBaseUrl) : undefined;

export const metadata: Metadata = {
  metadataBase,
  title,
  description,
  keywords: [
    "advocacia",
    "escritório de advocacia",
    "direito do trabalho",
    "direito previdenciário",
    "direito cível",
    companyData.companyName,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: ogDescription,
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${siteName} — Advocacia`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: ogDescription,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={sourceSerif.variable}>
      <body className="antialiased bg-bg-base text-text-primary">
        <JsonLdOrganization />
        <Analytics />
        {children}
        <CookieConsent />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
