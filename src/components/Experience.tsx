import React from "react";
import TechLines from "./TechLines";
interface Job {
  role: string;
  company: string;
  period: string;
  duration: string;
  description: string;
  bullets: string[];
  current?: boolean;
}

const history: Job[] = [
  {
    role: "Analista de Sistemas",
    company: "Sergipe Parque Tecnológico — SergipeTec",
    period: "01/2023 - 03/2025",
    duration: "2 anos e 3 meses",
    description: "Gerenciamento e refatoração de sistemas de backend em portais de gestão de contratos da área da saúde pública utilizando PostgreSQL e Prisma, além de administração do Moodle.",
    bullets: [
      "Refatoração de APIs críticas em Node.js",
      "Otimização de queries relacionais complexas",
      "Gestão de banco de dados PostgreSQL",
      "Administração técnica de plataformas LMS",
    ],
  },
  {
    role: "Analista de Sistemas",
    company: "INOVATEC-JP",
    period: "03/2025 - 01/2026",
    duration: "11 meses",
    description: "Desenvolvimento de sistemas corporativos personalizados, análise de requisitos e modelagem de arquitetura monolítica e microsserviços.",
    bullets: [
      "Modelagem e documentação de APIs",
      "Arquitetura monolítica e distribuída",
      "Integração de serviços de terceiros",
      "Ajuste fino de performance de sistemas",
    ],
  },
  {
    role: "Desenvolvedor Pleno",
    company: "Líder Locação de Mão de Obra LTDA",
    period: "01/2026 - Atual",
    duration: "Em andamento",
    description: "Liderança técnica e desenvolvimento full-stack com foco no ecossistema Next.js, Prisma e Node.js. Construção de soluções SaaS seguras e escaláveis.",
    bullets: [
      "Arquitetura de microsserviços modernos",
      "Modelagem de dados com Prisma ORM",
      "Conteinerização de serviços com Docker",
      "Interfaces rápidas otimizadas com Next.js",
    ],
    current: true,
  },
];

export default function Experience() {
  return (
    <div className="relative w-full overflow-hidden">
      <TechLines />
      <section className="relative z-10 px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-section-gap pt-16" id="trajetoria">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block border border-primary/20 text-primary bg-primary/5 font-label-caps text-label-caps px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
          Minha Trajetória
        </span>
        <h2 className="font-headline-md text-headline-md text-on-background mb-4">
          Experiência Profissional
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Uma linha do tempo da minha atuação em engenharia de sistemas e desenvolvimento de software.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-element-gap items-stretch">
        {history.map((job) => (
          <div
            key={job.company}
            className={`bg-surface border rounded-lg p-8 flex flex-col justify-between h-full relative transition-all duration-300 ${
              job.current
                ? "border-primary shadow-xl shadow-primary/5 -translate-y-1 md:-translate-y-2"
                : "border-white/5 hover:border-white/20"
            }`}
          >
            {job.current && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-slate-950 font-label-caps text-[10px] uppercase font-black px-4 py-1.5 rounded-full select-none tracking-widest">
                Atual
              </div>
            )}

            <div>
              <span className="text-[11px] font-mono text-primary uppercase font-bold tracking-wider block mb-1">
                {job.period} ({job.duration})
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-background mb-1">
                {job.role}
              </h3>
              <p className="text-[13px] text-on-surface-variant font-semibold mb-4">
                {job.company}
              </p>
              <p className="text-[13px] text-on-surface-variant leading-relaxed mb-6 border-b border-white/5 pb-4 h-16 overflow-hidden">
                {job.description}
              </p>

              {/* Achievements Bullet List */}
              <ul className="space-y-3 mb-8">
                {job.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex gap-2 text-on-surface items-start">
                    <span className="text-primary font-bold text-[14px] select-none">•</span>
                    <span className="text-[13px] text-on-surface/90">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
