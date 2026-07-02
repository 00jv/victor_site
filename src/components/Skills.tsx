"use client";

import React, { useState } from "react";
import TechCircuit from "./TechCircuit";
interface SkillItem {
  name: string;
  level: "Especialista" | "Intermediário" | "Básico";
  percentage: number; // For the visual progress indicator
  svgIcon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  items: SkillItem[];
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const categories: SkillCategory[] = [
    {
      title: "Backend & Banco de Dados",
      items: [
        {
          name: "Node.js",
          level: "Especialista",
          percentage: 95,
          svgIcon: (
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          ),
        },
        {
          name: "PostgreSQL",
          level: "Especialista",
          percentage: 90,
          svgIcon: (
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
            </svg>
          ),
        },
        {
          name: "Prisma ORM",
          level: "Especialista",
          percentage: 92,
          svgIcon: (
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          ),
        },
        {
          name: "Supabase",
          level: "Intermediário",
          percentage: 75,
          svgIcon: (
            <svg className="w-6 h-6 text-[#00f3ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
        },
        {
          name: "Docker",
          level: "Intermediário",
          percentage: 80,
          svgIcon: (
            <svg className="w-6 h-6 text-[#00f3ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          ),
        },
        {
          name: "Linux (Servidores)",
          level: "Intermediário",
          percentage: 78,
          svgIcon: (
            <svg className="w-6 h-6 text-[#00f3ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          name: "Java",
          level: "Básico",
          percentage: 45,
          svgIcon: (
            <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
      ],
    },
    {
      title: "Frontend & Mobile",
      items: [
        {
          name: "React & React Native",
          level: "Especialista",
          percentage: 95,
          svgIcon: (
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
              <circle cx="12" cy="12" r="1" fill="currentColor" />
            </svg>
          ),
        },
        {
          name: "Next.js",
          level: "Especialista",
          percentage: 92,
          svgIcon: (
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M15 16l-6-8h-.5v8h1v-6.5l5.5 7.5h.5V8h-1v5.5z" />
            </svg>
          ),
        },
        {
          name: "TypeScript",
          level: "Especialista",
          percentage: 90,
          svgIcon: (
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          ),
        },
        {
          name: "JavaScript",
          level: "Especialista",
          percentage: 95,
          svgIcon: (
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          name: "CSS (Tailwind / Bootstrap)",
          level: "Especialista",
          percentage: 90,
          svgIcon: (
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          ),
        },
      ],
    },
    {
      title: "Arquitetura & Metodologias",
      items: [
        {
          name: "Arquitetura de Microsserviços",
          level: "Intermediário",
          percentage: 82,
          svgIcon: (
            <svg className="w-6 h-6 text-[#00f3ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          ),
        },
        {
          name: "Modelagem Relacional (SQL)",
          level: "Intermediário",
          percentage: 85,
          svgIcon: (
            <svg className="w-6 h-6 text-[#00f3ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-8 0h8M8 15h.01M8 19h.01M12 11h.01M16 11h.01M12 15h.01M16 15h.01" />
            </svg>
          ),
        },
        {
          name: "Git & Versionamento",
          level: "Especialista",
          percentage: 95,
          svgIcon: (
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <path d="M18 15V9a4 4 0 00-4-4H9" />
              <path d="M6 9v6" />
            </svg>
          ),
        },
        {
          name: "Integração de APIs (REST/SDK)",
          level: "Especialista",
          percentage: 92,
          svgIcon: (
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4-4m-4 4l4 4" />
            </svg>
          ),
        },
        {
          name: "Metodologias Ágeis / Scrum",
          level: "Especialista",
          percentage: 90,
          svgIcon: (
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <TechCircuit />
      <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-section-gap pt-16 relative z-10" id="skills">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
        <span className="inline-block border border-primary/20 text-primary bg-primary/5 font-label-caps text-label-caps px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
          Stack Tecnológica
        </span>
        <h2 className="font-headline-md text-headline-md text-on-background mb-4">
          Habilidades & Competências
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Tecnologias e metodologias mapeadas diretamente da minha atuação profissional e formação acadêmica.
        </p>
      </div>

      {/* Category Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 relative z-10">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(index)}
            className={`px-5 py-2.5 rounded-full font-label-caps text-[11px] uppercase tracking-wider transition-all select-none cursor-pointer border ${
              activeCategory === index
                ? "bg-primary text-slate-950 border-primary font-bold shadow-[0_0_15px_rgba(189,0,255,0.25)]"
                : "bg-surface text-on-surface-variant border-white/5 hover:border-white/20 hover:text-white"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {categories[activeCategory].items.map((skill, index) => (
          <div
            key={index}
            className={`bg-surface border border-white/5 rounded-xl p-6 flex flex-col justify-between transition-all group duration-300 hover:-translate-y-1 ${
              skill.level === "Especialista"
                ? "hover:border-primary/40 hover:shadow-[0_0_20px_rgba(189,0,255,0.12)]"
                : skill.level === "Intermediário"
                  ? "hover:border-[#00f3ff]/40 hover:shadow-[0_0_20px_rgba(0,243,255,0.12)]"
                  : "hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.12)]"
            }`}
          >
            <div>
              {/* Skill Info Bar */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-background border border-white/5 flex items-center justify-center group-hover:border-primary/25 transition-colors">
                    {skill.svgIcon}
                  </div>
                  <h3 className="font-headline-sm text-[16px] font-bold text-on-background group-hover:text-primary transition-colors">
                    {skill.name}
                  </h3>
                </div>
                
                {/* Level Badge */}
                <span
                  className={`text-[9px] font-label-caps uppercase px-2.5 py-1 rounded-full font-black tracking-wider ${
                    skill.level === "Especialista"
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : skill.level === "Intermediário"
                        ? "bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/20"
                        : "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                  }`}
                >
                  {skill.level}
                </span>
              </div>
            </div>

            {/* Glowing Progress Indicator */}
            <div className="mt-4">
              <div className="flex justify-between text-[10px] text-white/30 font-mono mb-1.5">
                <span>NÍVEL DE PROFICIÊNCIA</span>
                <span className="font-semibold text-white/50">{skill.percentage}%</span>
              </div>
              <div className="w-full bg-background h-1.5 rounded-full overflow-hidden border border-white/5">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse ${
                    skill.level === "Especialista"
                      ? "bg-primary"
                      : skill.level === "Intermediário"
                        ? "bg-[#00f3ff]"
                        : "bg-amber-400"
                  }`}
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
