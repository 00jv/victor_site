import React from "react";

export default function Comparison() {
  const negativePoints = [
    "Aplicações lentas que perdem usuários no carregamento inicial.",
    "Código espaguete difícil de manter e escalar, gerando custos de refatoração.",
    "Bugs recorrentes em produção por falta de testes de software automatizados.",
    "Banco de dados lento com queries não otimizadas travando sob alta carga.",
    "Servidores caindo constantemente sem monitoramento ou resiliência.",
  ];

  const positivePoints = [
    "Aplicações SPA/SSR modernas carregando em milissegundos com Next.js.",
    "Código limpo, arquitetado sob padrões de design sólidos (Clean Architecture).",
    "Alta cobertura de testes unitários e de integração, garantindo estabilidade.",
    "Bancos de dados indexados, consultas otimizadas e caching agressivo com Redis.",
    "Infraestrutura monitorada, conteinerizada em Docker e orquestrada em Cloud.",
  ];

  return (
    <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-section-gap pt-16" id="diferenca">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block border border-primary/20 text-primary bg-primary/5 font-label-caps text-label-caps px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
          Metodologia
        </span>
        <h2 className="font-headline-md text-headline-md text-on-background mb-4">
          Por que a qualidade de engenharia importa?
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Construir software de alta performance exige disciplina arquitetural. Veja como atuo em comparação com abordagens tradicionais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-element-gap items-stretch">
        {/* Common Development Card */}
        <div className="bg-[#101014] border border-white/5 p-8 rounded-lg flex flex-col h-full opacity-80">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-red-500/80 bg-red-950/20 p-2 rounded-full text-[20px]">
              cancel
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-background">
              Desenvolvimento Comum
            </h3>
          </div>
          <ul className="space-y-6 flex-grow">
            {negativePoints.map((point, idx) => (
              <li key={idx} className="flex gap-3 text-on-surface-variant font-body-base text-body-base">
                <span className="text-red-500/60 font-bold select-none">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* My Methodology Card */}
        <div className="bg-surface border-2 border-primary/80 p-8 rounded-lg flex flex-col h-full relative shadow-2xl shadow-primary/5">
          <div className="absolute -top-3 right-6 bg-primary text-slate-950 font-label-caps text-[10px] uppercase font-black px-4 py-1.5 rounded-full select-none tracking-wider">
            Meu Padrão
          </div>
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-full text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>
              check_circle
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-background">
              Minha Metodologia
            </h3>
          </div>
          <ul className="space-y-6 flex-grow">
            {positivePoints.map((point, idx) => (
              <li key={idx} className="flex gap-3 text-on-surface font-body-base text-body-base">
                <span className="text-primary font-bold select-none">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
