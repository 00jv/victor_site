import React from "react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  image: string;
  alt: string;
  tags: string[];
  link?: string;
}

const projects: Project[] = [
  {
    title: "SaaS Barbearias (Five Barber)",
    description: "Uma plataforma SaaS multi-tenant escalável para gestão de barbearias, com controle de agendamentos dinâmicos, controle de barbeiros e personalização visual. Desenvolvida em Next.js e Supabase, hospedada na Vercel.",
    image: "/images/project1.jpg",
    alt: "Interface do aplicativo de agendamento de barbearia Five Barber.",
    tags: ["Next.js", "Supabase", "Vercel"],
    link: "https://app-five-barber.vercel.app/",
  },
  {
    title: "Clube Estrelinhas",
    description: "Plataforma completa para gestão escolar e programa de fidelidade infantil, engajando alunos em atividades pedagógicas. Composta por um frontend em React/TypeScript e backend em Node.js.",
    image: "/images/project2.jpg",
    alt: "Dashboard interativo do programa de fidelidade Clube Estrelinhas.",
    tags: ["React", "Node.js", "TypeScript"],
    link: "https://github.com/00jv/clube-estrelinhas-frontend",
  },
  {
    title: "Node.js Clean Architecture",
    description: "Repositório de referência aplicando conceitos de arquitetura limpa (Clean Architecture), injeção de dependências, desacoplamento e cobertura de testes automatizados com Node.js e TypeScript.",
    image: "/images/project3.jpg",
    alt: "Estrutura do projeto Node Clean Arch no editor de código.",
    tags: ["Node.js", "TypeScript", "Clean Arch"],
    link: "https://github.com/00jv/Node_Clean_Arch",
  },
];

export default function Projects() {
  return (
    <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-section-gap pt-16" id="projects">
      <h2 className="font-headline-md text-headline-md text-primary mb-12">
        Projetos Selecionados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-element-gap">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-DEFAULT overflow-hidden group hover:border-primary transition-colors duration-300 flex flex-col h-full"
          >
            {/* Card Image */}
            <div className="h-48 bg-slate-800 relative w-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
            </div>
            
            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-headline-sm text-headline-sm mb-2 text-on-background">
                {project.title}
              </h3>
              <p className="font-body-base text-body-base text-on-surface-variant mb-4 flex-grow leading-relaxed">
                {project.description}
              </p>
              
              {/* Action Button & Tags */}
              <div className="flex flex-col gap-4 mt-auto">
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-800 text-slate-400 font-label-caps text-label-caps px-3 py-1 rounded-full border border-slate-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-label-caps text-primary hover:underline flex items-center gap-1 mt-2"
                  >
                    Visualizar Código / Site
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
