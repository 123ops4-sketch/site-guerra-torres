"use client";

import { useEffect, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { companyData } from "@/data/companyData";

function lockSilent(video: HTMLVideoElement) {
  video.defaultMuted = true;
  if (!video.muted) video.muted = true;
  if (video.volume !== 0) video.volume = 0;
}

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    lockSilent(video);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isVisible || reduceMotion) {
      video.pause();
      return;
    }

    void video.play().catch(() => { });
  }, [isVisible]);

  return (
    <section
      id="sobre"
      className="py-20 bg-linear-to-tr from-bg-base via-bg-section to-bg-base"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-300 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className={`transition-all duration-600 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
          >
            <div className="relative mx-auto aspect-3/4 w-full max-w-110 overflow-hidden rounded-2xl lg:mx-0 lg:aspect-9/16 lg:max-w-90">
              <video
                ref={videoRef}
                src="/about-video.mp4?v=2"
                poster="/about-video-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
                aria-label={`Vídeo do escritório da ${companyData.companyName}`}
                className="absolute inset-0 h-full w-full object-cover"
                onLoadedMetadata={(event) => lockSilent(event.currentTarget)}
                onPlay={(event) => lockSilent(event.currentTarget)}
                onTimeUpdate={(event) => lockSilent(event.currentTarget)}
                onVolumeChange={(event) => lockSilent(event.currentTarget)}
              />
            </div>
          </div>

          <div
            className={`transition-all duration-600 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
          >
            <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-primary font-heading mb-3">
              Sobre a {companyData.companyName}
            </span>
            <h2
              className="font-heading font-bold text-text-primary mb-5 leading-[1.2]"
              style={{ fontSize: "clamp(26px, 3vw, 34px)" }}
            >
              Conheça nossa história
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed font-body mb-4">
              A ideia de ter um escritório surgiu desde a época de faculdade, quando a vontade de advogar era grande. <br /> <br />
              Desde então, nesse período adquirimos experiência suficiente para ofertar nosso trabalho com a qualidade necessária, com toda firmeza e confiança que vocês precisam. <br /> <br />
              Com isso, em 2019, tivemos a oportunidade de montar nosso escritório próprio, para podermos melhor atender a todos que precisam de defesa e que seus direitos sejam resguardados. <br /> <br />
              Assim, nossa equipe sempre busca deixar o ambiente de trabalho bem aconchegante, para proporcionar conforto e acolhimento aos nossos clientes, para que se sintam à vontade, e voltem sempre que quiserem e precisarem.
              Buscamos sempre cultivar boas relações, boas conversas e transmitir confiança.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
