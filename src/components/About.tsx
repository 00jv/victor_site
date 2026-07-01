"use client";

import React from "react";
import Image from "next/image";
import TechParticles from "./TechParticles";
import GithubStats from "./GithubStats";

export default function About() {
  return (
    <div className="relative w-full overflow-hidden">
      <TechParticles />
      <section className="relative z-10 px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-section-gap pt-16" id="about">
      <div className="flex flex-col md:flex-row gap-element-gap items-center md:items-start">
        {/* Profile Image Wrapper */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="w-full aspect-square bg-slate-900 border border-white/10 rounded-lg overflow-hidden relative">
            <Image
              src="/images/victor_imagem.jpeg"
              alt="Retrato de João Victor"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-500 hover:scale-102"
            />
          </div>
          <GithubStats />
        </div>

        {/* Text Content Wrapper */}
        <div className="w-full md:w-2/3">
          <h2 className="font-headline-md text-headline-md text-primary mb-6">
            Sobre Mim
          </h2>
          <div className="font-body-lg text-body-lg text-on-surface-variant space-y-6 leading-relaxed">
            <p>
              Sou engenheiro de software focado em construir sistemas de backend robustos e escaláveis, além de interfaces de usuário de alta performance. Minha abordagem une precisão técnica a um design limpo e minimalista.
            </p>
            <p>
              Com sólida experiência em arquitetura de sistemas, priorizo performance, manutenibilidade e resolução elegante de problemas complexos. Enxergo o código como infraestrutura digital durável.
            </p>
            <p>
              Quando não estou otimizando consultas ou refatorando código legando, costumo explorar novas linguagens e paradigmas de desenvolvimento ou contribuir com ferramentas open-source.
            </p>
          </div>
          
          {/* Resume Download Action */}
          <div className="mt-8">
            <a
              className="inline-block border border-white/10 text-on-background font-bold px-6 py-3 rounded-full font-label-caps text-[12px] uppercase tracking-wider hover:border-primary hover:text-primary active:scale-95 transition-all duration-200 cursor-pointer"
              href="/docs/VICTORFAGUNDESDEMATOS_Currículo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Download Currículo
            </a>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
