"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"metrics" | "terminal" | "architecture">("metrics");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const logIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulated live console log feed
  useEffect(() => {
    const logsPool = [
      "$ next build",
      "▲ Next.js 16.2.9 (Turbopack)",
      "✓ Compiled successfully in 1.2s",
      "○  (Static)  prerendered 4 routes",
      "$ prisma db push",
      "✓ Database schema is up to date.",
      "$ npm run start",
      "🚀 Server listening on port 3000 (production)",
      "[info] DB: Connected to PostgreSQL cluster",
      "[info] Prisma: Initialized client instance",
      "[info] Auth: Supabase adapter connected",
      "[req] GET /api/v1/projects - 200 OK (11ms)",
      "[req] GET /api/v1/experience - 200 OK (8ms)",
      "[req] POST /api/v1/contact - 201 Created (34ms)",
      "[info] Redis: Cache cluster warmed up (102 keys)",
      "[req] GET /api/v1/faq - 200 OK (5ms)",
      "[info] System: CPU load is nominal (12%)",
    ];

    if (activeTab === "terminal") {
      setTimeout(() => {
        setTerminalLogs([logsPool[0], logsPool[1], logsPool[2], logsPool[3]]);
      }, 0);
      let count = 4;
      
      logIntervalRef.current = setInterval(() => {
        setTerminalLogs((prev) => {
          const nextLogs = [...prev, logsPool[count % logsPool.length]];
          if (nextLogs.length > 8) {
            nextLogs.shift();
          }
          return nextLogs;
        });
        count++;
      }, 1600);
    } else {
      if (logIntervalRef.current) {
        clearInterval(logIntervalRef.current);
      }
    }

    return () => {
      if (logIntervalRef.current) {
        clearInterval(logIntervalRef.current);
      }
    };
  }, [activeTab]);

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
    <section className="min-h-screen flex items-center pt-28 pb-20 px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-section-gap relative overflow-hidden">
      {/* Visual Ambient Glows in Background */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00f3ff]/5 blur-[150px] pointer-events-none z-0" />

      <div className="flex flex-col lg:flex-row gap-16 items-center justify-between w-full relative z-10">
        {/* Left Side: Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left animate-fade-in">
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

        {/* Right Side: Extravagant Interactive Dev Workspace Mockup */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end animate-scale-up">
          <div className="w-full max-w-[520px] bg-[#121217]/90 border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
            {/* Embedded glowing accents inside the card */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#00f3ff]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Window Header Bar */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-5">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              
              {/* Tab Selector */}
              <div className="flex bg-background p-0.5 rounded-lg border border-white/5">
                <button
                  onClick={() => setActiveTab("metrics")}
                  className={`px-3 py-1 font-mono text-[10px] rounded-md transition-all cursor-pointer select-none ${
                    activeTab === "metrics" ? "bg-white/5 text-primary font-bold" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  Métricas
                </button>
                <button
                  onClick={() => setActiveTab("terminal")}
                  className={`px-3 py-1 font-mono text-[10px] rounded-md transition-all cursor-pointer select-none ${
                    activeTab === "terminal" ? "bg-white/5 text-primary font-bold" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  Logs
                </button>
                <button
                  onClick={() => setActiveTab("architecture")}
                  className={`px-3 py-1 font-mono text-[10px] rounded-md transition-all cursor-pointer select-none ${
                    activeTab === "architecture" ? "bg-white/5 text-primary font-bold" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  Arquitetura
                </button>
              </div>
            </div>

            {/* TAB CONTENT: METRICS */}
            {activeTab === "metrics" && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background border border-white/5 p-4 rounded-xl relative overflow-hidden group hover:border-primary/20 transition-all">
                    <span className="block font-label-caps text-[9px] text-white/50 mb-1 tracking-wider">REQUISITOS / SEG</span>
                    <span className="text-[24px] font-mono font-extrabold text-primary flex items-baseline gap-1">
                      4.2k <span className="text-[11px] text-white/40 font-normal">rps</span>
                    </span>
                    <div className="absolute right-3 top-3 w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  </div>
                  <div className="bg-background border border-white/5 p-4 rounded-xl hover:border-primary/20 transition-all">
                    <span className="block font-label-caps text-[9px] text-white/50 mb-1 tracking-wider">LATÊNCIA MÉDIA</span>
                    <span className="text-[24px] font-mono font-extrabold text-[#00f3ff]">
                      12ms <span className="text-[11px] text-white/40 font-normal">avg</span>
                    </span>
                  </div>
                </div>

                {/* Simulated Graph */}
                <div className="bg-background border border-white/5 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <span className="block font-label-caps text-[9px] text-white/50 tracking-wider">HISTÓRICO DE CPU</span>
                    <span className="text-[10px] font-mono text-primary font-bold">Uso: 14%</span>
                  </div>
                  <div className="flex items-end gap-2 h-14 pt-2">
                    <div className="w-full bg-primary/10 h-[25%] rounded-sm" />
                    <div className="w-full bg-primary/15 h-[40%] rounded-sm" />
                    <div className="w-full bg-primary/20 h-[30%] rounded-sm" />
                    <div className="w-full bg-primary/25 h-[65%] rounded-sm" />
                    <div className="w-full bg-primary/30 h-[50%] rounded-sm animate-pulse" />
                    <div className="w-full bg-primary/45 h-[85%] rounded-sm" />
                    <div className="w-full bg-[#00f3ff]/40 h-[70%] rounded-sm" />
                    <div className="w-full bg-primary h-[95%] rounded-sm animate-pulse" />
                  </div>
                </div>

                {/* Nodes Statuses */}
                <div className="space-y-2 font-mono text-[10px] text-white/60">
                  <div className="flex justify-between items-center bg-background px-4 py-2.5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      micro-api-gateway
                    </span>
                    <span className="text-white/40 font-semibold">240MB — 0.2% CPU</span>
                  </div>
                  <div className="flex justify-between items-center bg-background px-4 py-2.5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-pulse" />
                      distributed-mq-stream
                    </span>
                    <span className="text-white/40 font-semibold">185MB — 0.4% CPU</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: TERMINAL LOGS */}
            {activeTab === "terminal" && (
              <div className="bg-background border border-white/5 rounded-xl p-4 h-[252px] font-mono text-[11px] leading-relaxed flex flex-col justify-between animate-fade-in overflow-hidden">
                <div className="space-y-1.5 overflow-y-auto pr-1">
                  {terminalLogs.map((log, index) => {
                    const isCmd = log.startsWith("$");
                    const isErr = log.toLowerCase().includes("err") || log.toLowerCase().includes("fail");
                    const isSuccess = log.includes("✓") || log.includes("🚀") || log.includes("success");
                    return (
                      <div
                        key={index}
                        className={
                          isCmd 
                            ? "text-primary font-bold" 
                            : isErr 
                              ? "text-red-400" 
                              : isSuccess 
                                ? "text-emerald-400" 
                                : "text-white/60"
                        }
                      >
                        {log}
                      </div>
                    );
                  })}
                  <div className="text-white/70 animate-pulse inline-block">
                    _ <span className="sr-only">cursor</span>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-2 text-white/30 text-[9px] flex justify-between">
                  <span>TERMINAL: BASH (DEV RUNTIME)</span>
                  <span className="text-primary font-bold">LIVE METRICS</span>
                </div>
              </div>
            )}

            {/* TAB CONTENT: ARCHITECTURE */}
            {activeTab === "architecture" && (
              <div className="bg-background border border-white/5 rounded-xl p-6 h-[252px] flex flex-col justify-center items-center animate-fade-in relative overflow-hidden">
                {/* SVG Pipeline Diagram */}
                <svg className="w-full h-32" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Connecting Line 1 */}
                  <path d="M100 60 H180" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M100 60 H180" stroke="#bd00ff" strokeWidth="2" strokeDasharray="8 8" className="animate-[marquee_15s_linear_infinite]" />

                  {/* Connecting Line 2 */}
                  <path d="M220 60 H300" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M220 60 H300" stroke="#00f3ff" strokeWidth="2" strokeDasharray="8 8" className="animate-[marquee_10s_linear_infinite]" />

                  {/* Client Node */}
                  <circle cx="60" cy="60" r="28" fill="#110d1a" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="2" />
                  <text x="60" y="58" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CLIENT</text>
                  <text x="60" y="70" fill="#bd00ff" fontSize="8" fontFamily="monospace" textAnchor="middle">Next.js</text>

                  {/* API Gateway Node */}
                  <circle cx="200" cy="60" r="28" fill="#110d1a" stroke="#bd00ff" strokeWidth="2" />
                  <circle cx="200" cy="60" r="28" fill="none" stroke="#bd00ff" strokeWidth="1" className="animate-ping opacity-20" />
                  <text x="200" y="58" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">API GATEWAY</text>
                  <text x="200" y="70" fill="#bd00ff" fontSize="8" fontFamily="monospace" textAnchor="middle">NodeJS</text>

                  {/* DB Node */}
                  <circle cx="340" cy="60" r="28" fill="#110d1a" stroke="#00f3ff" strokeWidth="2" />
                  <text x="340" y="58" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">DATABASE</text>
                  <text x="340" y="70" fill="#00f3ff" fontSize="8" fontFamily="monospace" textAnchor="middle">PostgreSQL</text>
                </svg>

                {/* Nodes Descriptions */}
                <div className="flex justify-between w-full font-mono text-[9px] text-white/50 border-t border-white/5 pt-4">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> SSL SECURE</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> PRISMA ORM</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#00f3ff]" /> SUPABASE HYBRID</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

