import type { Metadata } from "next";
import { companyData } from "@/data/companyData";
import BioHeader from "@/components/bio/BioHeader";
import BioHero from "@/components/bio/BioHero";
import BioPrimaryCta from "@/components/bio/BioPrimaryCta";
import BioLinksList from "@/components/bio/BioLinksList";
import BioFaq from "@/components/bio/BioFaq";
import BioServices from "@/components/bio/BioServices";
import BioLocation from "@/components/bio/BioLocation";
import BioFooter from "@/components/bio/BioFooter";

export const metadata: Metadata = {
    title: `${companyData.companyName}`,
    description:
        "Fale com nossa equipe jurídica em poucos cliques. Atendimento rápido em Direito do Trabalho, Previdenciário e Cível.",
    alternates: { canonical: "/bio" },
};

export default function BioPage() {
    return (
        <main className="min-h-screen bg-bg-base px-4 py-6">
            <div className="mx-auto w-full max-w-105 space-y-4">
                <BioHeader />
                <BioHero />
                <BioPrimaryCta />
                <BioLinksList />
                <BioFaq />
                <BioServices />
                <BioPrimaryCta />
                <BioLocation />
                <BioFooter />
            </div>
        </main>
    );
}
