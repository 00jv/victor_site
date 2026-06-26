import React from "react";
import TechGrid from "./TechGrid";

export default function Features() {
  return (
    <div className="relative w-full overflow-hidden">
      <TechGrid />
      <section className="relative z-10 px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-section-gap pt-16" id="plataforma">
      <div className="max-w-3xl mb-16">
        <span className="inline-block border border-primary/20 text-primary bg-primary/5 font-label-caps text-label-caps px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
          Especialidades Técnicas
        </span>
        <h2 className="font-headline-md text-headline-md text-on-background mb-4">
          Serviços robustos focados em performance
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Da concepção do banco de dados ao ajuste fino da renderização frontend, desenvolvo soluções focadas em arquitetura sustentável.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-element-gap">
        {/* Card 1: APIs */}
        <div className="bg-surface border border-white/5 p-8 rounded-lg flex flex-col justify-between h-[420px] overflow-hidden group hover:border-primary/50 transition-all duration-300">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-background mb-2">
              APIs de Alta Disponibilidade (REST/gRPC)
            </h3>
            <p className="font-body-base text-body-base text-on-surface-variant mb-6 leading-relaxed">
              Estruturação de serviços com Rust, Go ou Node.js, preparados para concorrência massiva, segurança de dados e monitoramento em tempo real.
            </p>
          </div>
          
          {/* API Stream Console Mockup */}
          <div className="bg-background border border-white/10 rounded-lg p-4 font-mono text-[11px] text-white/50 h-40 overflow-hidden relative">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
              <span className="text-white/70 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                API STREAMING CONSOLE
              </span>
              <span className="text-[10px]">LIVE</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-primary">
                <span>GET /v1/products</span>
                <span>200 OK — 12ms</span>
              </div>
              <div className="flex justify-between text-primary">
                <span>POST /v1/checkout</span>
                <span>201 CREATED — 45ms</span>
              </div>
              <div className="flex justify-between text-yellow-500/80">
                <span>GET /v1/analytics</span>
                <span>304 NOT MODIFIED — 4ms</span>
              </div>
              <div className="flex justify-between text-primary">
                <span>GET /v1/users/profile</span>
                <span>200 OK — 15ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: DB & Cache */}
        <div className="bg-surface border border-white/5 p-8 rounded-lg flex flex-col justify-between h-[420px] overflow-hidden group hover:border-primary/50 transition-all duration-300">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-background mb-2">
              Bancos de Dados & Caching Otimizados
            </h3>
            <p className="font-body-base text-body-base text-on-surface-variant mb-6 leading-relaxed">
              Modelagem relacional e não-relacional de alta performance (Postgres, MongoDB) atrelada a estratégias de cache integradas com Redis.
            </p>
          </div>
          
          {/* Caching Stats Mockup */}
          <div className="bg-background border border-white/10 rounded-lg p-4 h-40 overflow-hidden relative flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
              <span className="text-white/70 font-semibold font-mono text-[11px] flex items-center gap-1.5">
                DATABASE METRICS
              </span>
              <span className="text-primary font-mono text-[10px] font-bold">STABLE</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 my-auto">
              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg text-center">
                <span className="block text-[10px] font-label-caps text-on-surface-variant mb-1">CACHE HIT RATE</span>
                <span className="text-primary font-headline-sm font-bold">98.4%</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg text-center">
                <span className="block text-[10px] font-label-caps text-on-surface-variant mb-1">DB QUERY SPEED</span>
                <span className="text-primary font-headline-sm font-bold">1.2ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: DevOps & CI/CD */}
        <div className="bg-surface border border-white/5 p-8 rounded-lg flex flex-col justify-between h-[420px] overflow-hidden group hover:border-primary/50 transition-all duration-300">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-background mb-2">
              Infraestrutura Cloud & DevOps
            </h3>
            <p className="font-body-base text-body-base text-on-surface-variant mb-6 leading-relaxed">
              Provisionamento de ambientes seguros em nuvem (AWS/GCP), conteinerização com Docker e pipelines automatizados de CI/CD.
            </p>
          </div>
          
          {/* Cloud CI/CD Terminal Mockup */}
          <div className="bg-background border border-white/10 rounded-lg p-4 font-mono text-[10px] text-white/40 h-40 overflow-hidden relative">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
              <span className="text-white/70 font-semibold flex items-center gap-1.5">
                CI/CD PIPELINE LOGS
              </span>
              <span className="text-primary font-bold">SUCCESS</span>
            </div>
            <div className="space-y-1">
              <div>$ git push origin main</div>
              <div className="text-white/70">✓ Linting and code format checks ... [PASSED]</div>
              <div className="text-white/70">✓ Building production application bundle ... [SUCCESS]</div>
              <div className="text-primary">✓ Deploying artifacts to AWS ECS node clusters ... [DONE]</div>
            </div>
          </div>
        </div>

        {/* Card 4: Interfaces */}
        <div className="bg-surface border border-white/5 p-8 rounded-lg flex flex-col justify-between h-[420px] overflow-hidden group hover:border-primary/50 transition-all duration-300">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-background mb-2">
              Frontend Otimizado (Next.js)
            </h3>
            <p className="font-body-base text-body-base text-on-surface-variant mb-6 leading-relaxed">
              Criação de páginas rápidas e indexáveis com Next.js, priorizando métricas como Largest Contentful Paint (LCP) e SEO.
            </p>
          </div>
          
          {/* Lighthouse Score Mockup */}
          <div className="bg-background border border-white/10 rounded-lg p-4 h-40 overflow-hidden relative flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
              <span className="text-white/70 font-semibold font-mono text-[11px] flex items-center gap-1.5">
                LIGHTHOUSE MOBILE AUDIT
              </span>
              <span className="text-primary font-mono text-[10px] font-bold">100/100</span>
            </div>
            
            <div className="flex justify-around items-center my-auto">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center font-bold font-mono text-primary text-[13px] bg-primary/5 shadow-lg shadow-primary/10">
                  100
                </div>
                <span className="text-[9px] font-label-caps text-on-surface-variant">PERFORMANCE</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center font-bold font-mono text-primary text-[13px] bg-primary/5">
                  100
                </div>
                <span className="text-[9px] font-label-caps text-on-surface-variant">ACCESSIBILITY</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center font-bold font-mono text-primary text-[13px] bg-primary/5">
                  100
                </div>
                <span className="text-[9px] font-label-caps text-on-surface-variant">SEO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
