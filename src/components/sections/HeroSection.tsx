"use client";

import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { companyData } from "@/data/companyData";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80";

export default function HeroSection() {
  const scrollToSpecialties = () => {
    document
      .querySelector("#especialidades")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden bg-bg-base">
      {/* Estátua enquadrada no canto direito */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[58%] sm:w-[50%] lg:w-[42%]"
        aria-hidden
      >
        <Image
          src={HERO_IMAGE_URL}
          alt="Estátua da deusa Têmis representando a justiça"
          fill
          priority
          sizes="(min-width: 1024px) 42vw, 58vw"
          className="object-cover object-[72%_28%]"
        />
        <div className="absolute inset-0 bg-bg-base/20" />
        <div className="absolute inset-0 bg-linear-to-r from-bg-base via-bg-base/75 to-transparent md:via-bg-base/35" />
        <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-bg-base/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-bg-base via-bg-base/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-300 flex-1 flex-col px-6">
        <div className="flex flex-1 items-center pt-24 pb-8 lg:pt-20">
          <div className="w-full max-w-105 text-left lg:max-w-3xl">
            <h1 className="font-heading tracking-[-0.03em] text-text-primary">
              <span className="block text-[clamp(1.35rem,2.4vw,2.125rem)] leading-tight font-semibold text-text-secondary">
                Bem-vindo à
              </span>
              <span className="mt-1 block text-[clamp(2.75rem,5.4vw,4.75rem)] leading-[0.98] font-extrabold text-primary">
                {companyData.companyName}!
              </span>
            </h1>

            <p className="mt-5 max-w-md font-body text-base leading-relaxed text-text-secondary lg:mt-6 lg:max-w-xl lg:text-lg lg:leading-relaxed">
              Equipe jurídica capacitada para lhe oferecer serviços de excelência.
              Proporcionamos um atendimento personalizado, buscando encontrar a
              melhor solução para suas necessidades jurídicas.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:mt-10">
              <button
                type="button"
                onClick={scrollToSpecialties}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-gradient-orange px-7 py-3.5 font-heading text-sm font-semibold whitespace-nowrap text-white transition-all hover:-translate-y-0.5 hover:shadow-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base lg:min-h-14 lg:px-8 lg:text-base"
              >
                Conhecer Especialidades
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() =>
                  document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg border border-border-default bg-white/80 px-7 py-3.5 font-heading text-sm font-semibold whitespace-nowrap text-text-primary transition-all hover:border-primary hover:bg-primary/5 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base lg:min-h-14 lg:px-8 lg:text-base"
              >
                Falar com a equipe
              </button>
            </div>
          </div>
        </div>

        <p className="mx-auto w-full max-w-2xl px-2 pb-20 text-center font-body text-sm leading-[1.7] text-pretty text-text-muted lg:max-w-4xl lg:text-base lg:leading-relaxed">
          “Há duas coisas na vida que não se pode deixar de ter,
          <br />
          quando se quer ir longe: bons amigos e bons advogados.”
          <br />
          - Miguel Sousa Tavares
        </p>
      </div>

      <button
        type="button"
        onClick={scrollToSpecialties}
        className="absolute bottom-6 left-1/2 flex min-h-12 min-w-12 -translate-x-1/2 items-center justify-center rounded-full text-text-muted transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent animate-bounce"
        aria-label="Rolar para baixo"
      >
        <ChevronDown className="h-6 w-6" aria-hidden />
      </button>
    </section>
  );
}
