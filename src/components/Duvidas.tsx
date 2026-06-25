"use client";

import React, { useState } from "react";

interface DuvidaItem {
  question: string;
  answer: string;
}

const duvidas: DuvidaItem[] = [
  {
    question: "Qual a sua formação acadêmica?",
    answer: "Sou graduado em Análise e Desenvolvimento de Sistemas pela UNINASSAU (concluído em 12/2023). Também possuo formação de nível Ensino Técnico em Desenvolvimento de Sistemas pelo SENAI/SE (concluído em 08/2020).",
  },
  {
    question: "Quais certificações e cursos de aperfeiçoamento você possui?",
    answer: "Possuo certificações relevantes em desenvolvimento frontend, incluindo: Desenvolvimento de aplicações para internet com ReactJS, Trabalhando com Componentes em React, e Construindo páginas para internet com Bootstrap (1Doc/Bootstrap). Além disso, realizo estudos contínuos focados em DevOps e administração de clusters Kubernetes com foco na certificação CKA (Certified Kubernetes Administrator).",
  },
  {
    question: "Qual o seu nível de fluência em outros idiomas?",
    answer: "Além do Português (minha língua materna), possuo nível de Inglês Intermediário Avançado (classificação B2), o que me capacita para ler documentação técnica avançada, redigir textos e participar de reuniões de alinhamento.",
  },
  {
    question: "Quais são as suas principais competências comportamentais (soft skills)?",
    answer: "Destaco a minha facilidade de trabalho em equipe para realizar projetos em conjunto, comprometimento em criar código dentro das boas práticas, capacidade de planejamento e proatividade, agilidade para aprender novas linguagens, e atenção a detalhes em revisões de código (code reviews).",
  },
  {
    question: "Quais são seus principais objetivos profissionais atuais?",
    answer: "Estou em busca de novos desafios e oportunidades como Desenvolvedor Pleno ou Analista de Sistemas. Meu objetivo é contribuir diretamente para a escalabilidade, resiliência de infraestrutura e qualidade de código de produtos digitais robustos de mercado.",
  },
];

export default function Duvidas() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDuvida = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="px-margin-mobile md:px-gutter max-w-3xl mx-auto mb-section-gap pt-16" id="duvidas">
      <div className="text-center mb-12">
        <span className="inline-block border border-primary/20 text-primary bg-primary/5 font-label-caps text-label-caps px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
          Perguntas & Respostas
        </span>
        <h2 className="font-headline-md text-headline-md text-on-background mb-4">
          Dúvidas Frequentes
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Informações rápidas sobre minha formação acadêmica, competências interpessoais e metas de carreira.
        </p>
      </div>

      <div className="space-y-4">
        {duvidas.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-surface border border-white/5 rounded-lg overflow-hidden transition-colors hover:border-white/10"
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleDuvida(idx)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none select-none cursor-pointer"
              >
                <span className="font-headline-sm text-[16px] md:text-[18px] font-semibold text-on-background">
                  {item.question}
                </span>
                <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}>
                  keyboard_arrow_down
                </span>
              </button>

              {/* Accordion Content Body */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-60 border-t border-white/5" : "max-h-0"
                }`}
              >
                <div className="p-6 font-body-base text-body-base text-on-surface-variant leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
