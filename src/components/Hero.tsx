"use client";

import React from "react";
import AnimatedTerminal from "./AnimatedTerminal";
import MatrixRain from "./MatrixRain";

export default function Hero() {
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 64; // Header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden bg-background">
      <MatrixRain />
      
      {/* Left Side: Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center pt-28 pb-20 px-margin-mobile md:px-gutter lg:pl-[calc(50vw-560px)] relative z-10 min-h-screen">
        
        {/* Visual Ambient Glows in Background */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0" />
        
        <div className="flex flex-col items-start text-left animate-fade-in max-w-xl z-10 relative">
          {/* Glowing Badge */}
          <span className="inline-flex items-center gap-2 border border-primary/30 text-primary bg-primary/5 font-label-caps text-[10px] uppercase font-bold tracking-widest px-4 py-2 rounded-full mb-6 shadow-md shadow-primary/5">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            Desenvolvedor Pleno / Analista de Sistemas
          </span>

          {/* Heading with sophisticated gradient */}
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6 tracking-tight leading-[1.08] font-extrabold bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
            Construindo soluções de software{" "}
            <span className="text-primary font-black drop-shadow-[0_0_15px_rgba(189,0,255,0.4)]">
              [resilientes]
            </span>{" "}
            de ponta a ponta.
          </h1>

          {/* Subtitle */}
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl leading-relaxed">
            Sou João Victor, desenvolvedor com 3 anos de experiência em engenharia de backend escalável, APIs robustas de baixa latência e interfaces web modernas.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              onClick={(e) => handleScrollToSection(e, "projects")}
              className="bg-primary text-slate-950 font-black px-8 py-4 rounded-full font-label-caps text-[12px] uppercase tracking-widest text-center hover:bg-primary-fixed active:scale-95 transition-all shadow-[0_0_20px_rgba(189,0,255,0.35)] hover:shadow-[0_0_30px_rgba(189,0,255,0.55)] cursor-pointer"
            >
              Ver Projetos
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollToSection(e, "contact")}
              className="bg-transparent text-white border border-white/10 font-bold px-8 py-4 rounded-full font-label-caps text-[12px] uppercase tracking-widest text-center hover:bg-white/[0.04] hover:border-white/20 active:scale-95 transition-all cursor-pointer"
            >
              Entrar em Contato
            </a>
          </div>
        </div>
      </div>

      {/* Right Side: Full Screen Terminal Background */}
      <AnimatedTerminal />
    </section>
  );
}
