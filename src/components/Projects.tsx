"use client";

import React from "react";
import TechRings from "./TechRings";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  iconType: "five-barber" | "estrelinhas" | "clean-arch" | "ged" | "microservices" | "rest-api" | "gekkemap" | "mario";
}

const projects: Project[] = [
  {
    title: "SaaS Barbearias (Five Barber)",
    description: "Plataforma multi-tenant escalável para agendamentos e gestão de barbearias, com fluxo em tempo real, painel financeiro e personalização visual.",
    tags: ["Next.js", "Supabase", "Vercel"],
    link: "https://app-five-barber.vercel.app/",
    iconType: "five-barber",
  },
  {
    title: "Clube Estrelinhas",
    description: "E-commerce de moda em crochê e alta cordoaria. Plataforma focada em peças artesanais exclusivas com catálogo, checkout e painel administrativo.",
    tags: ["Next.js", "TypeScript", "Node.js"],
    link: "https://github.com/00jv/clube-estrelinhas-frontend",
    iconType: "estrelinhas",
  },
  {
    title: "Node.js Clean Architecture",
    description: "Repositório de referência aplicando Clean Architecture, injeção de dependências, padrões de design (SOLID) e testes de unidade com Jest.",
    tags: ["Node.js", "TypeScript", "Clean Arch"],
    link: "https://github.com/00jv/Node_Clean_Arch",
    iconType: "clean-arch",
  },
  {
    title: "Gestão de Documentos (GED)",
    description: "Sistema para upload, categorização, controle de acesso e auditoria de arquivos corporativos com criptografia e armazenamento em nuvem.",
    tags: ["React", "Node.js", "PostgreSQL"],
    link: "https://github.com/00jv/Front_GED",
    iconType: "ged",
  },
  {
    title: "Microsserviços & Monólitos",
    description: "Estudo comparativo de padrões arquiteturais implementando microsserviços desacoplados com Docker, filas (RabbitMQ) e banco relacional.",
    tags: ["Node.js", "Express", "Docker"],
    link: "https://github.com/00jv/ArquiMonolitica",
    iconType: "microservices",
  },
  {
    title: "API Restful AdonisJS",
    description: "Estrutura robusta de API usando AdonisJS, fornecendo rotas autenticadas, tratamento global de erros, migrations SQL e validação rígida de dados.",
    tags: ["AdonisJS", "TypeScript", "PostgreSQL"],
    link: "https://github.com/00jv/Api_Restfull_Adonis",
    iconType: "rest-api",
  },
  {
    title: "Radar & Mapa GekkeMap",
    description: "Plataforma interativa com integração de mapas geolocalizados para festivais de cultura pop, auxiliando na navegação em tempo real de eventos.",
    tags: ["JavaScript", "HTML5", "CSS3"],
    link: "https://github.com/00jv/GekkeMap",
    iconType: "gekkemap",
  },
  {
    title: "Mario CSS Physics & Engine",
    description: "Simulação de física, colisões, saltos e renderização de elementos de cenário do clássico Mario Bros desenvolvida inteiramente com CSS e Javascript.",
    tags: ["CSS3", "JavaScript", "DOM Engine"],
    link: "https://github.com/00jv/Mario",
    iconType: "mario",
  },
];

// --- Custom Animated Icon Components ---

function FiveBarberIcon() {
  return (
    <div className="w-full h-full bg-surface-container-low flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
      
      {/* Calendar Grid card */}
      <div className="relative w-22 h-22 border border-white/10 rounded-lg bg-surface flex flex-col overflow-hidden shadow-inner shadow-black/80 z-10">
        <div className="bg-primary/20 border-b border-white/10 h-4.5 flex items-center justify-between px-2">
          <div className="w-1 h-1 rounded-full bg-primary/60" />
          <div className="w-6 h-0.5 rounded-full bg-primary/40" />
          <div className="w-1 h-1 rounded-full bg-primary/60" />
        </div>
        <div className="p-1.5 grid grid-cols-4 gap-1 flex-grow">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className={`rounded-sm flex items-center justify-center text-[6px] font-mono font-bold ${
                i === 4 
                  ? "bg-primary text-slate-950 animate-pulse font-black" 
                  : "bg-white/5 text-on-surface-variant/40"
              }`}
            >
              {i === 4 ? "✓" : i + 10}
            </div>
          ))}
        </div>
      </div>

      {/* Comb and Scissors icon badge */}
      <div className="absolute right-3 bottom-3 w-9 h-9 bg-surface border border-white/10 rounded-full flex items-center justify-center shadow-lg shadow-black/60 animate-bounce z-20" style={{ animationDuration: '4s' }}>
        <svg className="w-4.5 h-4.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 15a3 3 0 100-6 3 3 0 000 6zM18 15a3 3 0 100-6 3 3 0 000 6z" />
          <path d="M8.5 12h7M16 8l-8 8M8 8l8 8" />
        </svg>
      </div>

      <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-primary/10 blur-xl pointer-events-none" />
    </div>
  );
}

function ClubeEstrelinhasIcon() {
  return (
    <div className="w-full h-full bg-surface-container-low flex items-center justify-center relative overflow-hidden">
      {/* Background Starry Particles */}
      {[...Array(6)].map((_, i) => (
        <div 
          key={i} 
          className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
          style={{
            top: `${15 + i * 14}%`,
            left: `${20 + (i * 27) % 65}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${1.5 + i * 0.5}s`
          }}
        />
      ))}

      {/* Main Twinkling Star */}
      <div className="relative flex items-center justify-center z-10">
        <svg className="w-12 h-12 text-amber-400 animate-pulse relative z-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full scale-150 animate-ping" style={{ animationDuration: '3s' }} />
      </div>

      {/* Twinkling Star 2 */}
      <svg className="absolute top-6 right-10 w-4 h-4 text-amber-400/60 animate-bounce" fill="currentColor" viewBox="0 0 24 24" style={{ animationDuration: '3.5s' }}>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>

      {/* points indicator HUD */}
      <div className="absolute left-4 bottom-3 flex items-center gap-1 bg-surface border border-white/10 px-2 py-0.5 rounded-md z-20">
        <div className="w-1 h-1 rounded-full bg-emerald-accent animate-ping" />
        <span className="text-[7.5px] font-mono text-emerald-accent font-bold tracking-wider">150 PTS</span>
      </div>
    </div>
  );
}

function CleanArchitectureIcon() {
  return (
    <div className="w-full h-full bg-surface-container-low flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(189,0,255,0.03)_0%,transparent_70%)]" />

      {/* Layer 3 - Outer Circle */}
      <div className="absolute w-28 h-28 border border-dashed border-primary/20 rounded-full flex items-center justify-center animate-[spin_40s_linear_infinite]" />

      {/* Layer 2 - Middle Circle */}
      <div className="absolute w-20 h-20 border border-dashed border-cyan-500/30 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
        <span className="absolute top-0 text-[5.5px] font-mono font-bold text-cyan-500/60 bg-surface-container-low px-1 select-none">USE CASES</span>
      </div>

      {/* Layer 1 - Core Circle */}
      <div className="absolute w-12 h-12 border border-white/10 rounded-full flex items-center justify-center bg-surface shadow-lg shadow-black/80 z-10">
        <div className="w-8 h-8 border border-primary/40 rounded-full flex items-center justify-center bg-primary/5 animate-pulse">
          <span className="text-[7.5px] font-mono font-black text-primary select-none">CORE</span>
        </div>
      </div>

      {/* Radar Sweep line */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-28 h-28 rounded-full border border-primary/5 flex items-center justify-center relative">
          <div className="absolute top-1/2 left-1/2 w-[56px] h-[1px] bg-gradient-to-r from-primary to-transparent origin-left -translate-y-1/2 animate-[spin_5s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
}

function GEDIcon() {
  return (
    <div className="w-full h-full bg-surface-container-low flex items-center justify-center relative overflow-hidden">
      {/* Cloud at the top */}
      <div className="absolute top-4 flex flex-col items-center gap-1 z-10">
        <svg className="w-9 h-9 text-cyan-500/75 animate-pulse" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        </svg>
      </div>

      {/* Folder at the bottom */}
      <div className="absolute bottom-4 flex flex-col items-center z-15">
        <svg className="w-12 h-12 text-primary/80 relative" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-19.5 0A2.25 2.25 0 003 15v4.5A2.25 2.25 0 005.25 21.75h13.5A2.25 2.25 0 0021 19.5V15a2.25 2.25 0 00-1.5-2.25m-16.5 0h16.5" />
        </svg>
      </div>

      {/* Floating document blocks rising */}
      {[...Array(3)].map((_, i) => (
        <div 
          key={i} 
          className="absolute bg-cyan-400/90 border border-cyan-300 rounded-sm w-4 h-5.5 shadow-md shadow-cyan-950/50 flex flex-col justify-between p-0.5 animate-float-doc opacity-0 z-0"
          style={{
            animationDelay: `${i * 1.5}s`,
            animationDuration: '4.5s',
            left: `${45 + (i * 5) % 15}%`
          }}
        >
          <div className="w-full h-[1px] bg-cyan-950" />
          <div className="w-2/3 h-[1px] bg-cyan-950" />
          <div className="w-5/6 h-[1px] bg-cyan-950" />
        </div>
      ))}
    </div>
  );
}

function MicroservicesIcon() {
  return (
    <div className="w-full h-full bg-surface-container-low flex items-center justify-center relative overflow-hidden">
      {/* Connection Lines (SVGs) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 200 200">
        <line x1="100" y1="100" x2="45" y2="60" stroke="rgba(189,0,255,0.15)" strokeWidth="1.5" />
        <line x1="100" y1="100" x2="155" y2="60" stroke="rgba(189,0,255,0.15)" strokeWidth="1.5" />
        <line x1="100" y1="100" x2="100" y2="150" stroke="rgba(189,0,255,0.15)" strokeWidth="1.5" />
      </svg>

      {/* Gateway Node (Center) */}
      <div className="absolute w-10 h-10 rounded-full border border-primary bg-surface flex items-center justify-center z-10 shadow-lg shadow-black/80">
        <svg className="w-4.5 h-4.5 text-primary animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
        </svg>
      </div>

      {/* Node 1 - Top Left */}
      <div className="absolute top-8 left-8 w-7 h-7 rounded-full border border-cyan-500 bg-surface flex items-center justify-center z-10 animate-pulse">
        <span className="text-[6px] font-mono font-bold text-cyan-400">S1</span>
      </div>

      {/* Node 2 - Top Right */}
      <div className="absolute top-8 right-8 w-7 h-7 rounded-full border border-cyan-500 bg-surface flex items-center justify-center z-10 animate-pulse" style={{ animationDelay: '0.5s' }}>
        <span className="text-[6px] font-mono font-bold text-cyan-400">S2</span>
      </div>

      {/* Node 3 - Bottom */}
      <div className="absolute bottom-6 w-7 h-7 rounded-full border border-cyan-500 bg-surface flex items-center justify-center z-10 animate-pulse" style={{ animationDelay: '1s' }}>
        <span className="text-[6px] font-mono font-bold text-cyan-400">S3</span>
      </div>

      {/* Data Packets traveling along connection lines */}
      <div className="absolute top-[48px] left-[52px] w-1.5 h-1.5 rounded-full bg-cyan-400 animate-packet-1 shadow-[0_0_8px_rgba(0,243,255,0.8)] z-20" />
      <div className="absolute top-[48px] right-[52px] w-1.5 h-1.5 rounded-full bg-cyan-400 animate-packet-2 shadow-[0_0_8px_rgba(0,243,255,0.8)] z-20" />
      <div className="absolute bottom-[24px] left-[96px] w-1.5 h-1.5 rounded-full bg-cyan-400 animate-packet-3 shadow-[0_0_8px_rgba(0,243,255,0.8)] z-20" />
    </div>
  );
}

function RestApiIcon() {
  return (
    <div className="w-full h-full bg-surface-container-low flex items-center justify-center p-3 relative overflow-hidden">
      {/* Terminal window */}
      <div className="w-full max-w-[150px] h-[100px] border border-white/10 rounded-lg bg-surface flex flex-col overflow-hidden shadow-2xl shadow-black/80 z-10">
        <div className="bg-white/5 border-b border-white/5 h-4 flex items-center gap-1 px-2">
          <div className="w-1 h-1 rounded-full bg-red-500/60" />
          <div className="w-1 h-1 rounded-full bg-yellow-500/60" />
          <div className="w-1 h-1 rounded-full bg-green-500/60" />
          <span className="text-[5.5px] font-mono text-white/30 ml-auto uppercase tracking-widest select-none">API.LOG</span>
        </div>
        <div className="p-1.5 font-mono text-[7px] flex flex-col gap-1 overflow-hidden flex-grow justify-start">
          <div className="flex gap-1 animate-terminal-line-1">
            <span className="text-[#00f3ff]">GET</span>
            <span className="text-white/60">/users</span>
            <span className="text-emerald-accent ml-auto">200</span>
          </div>
          <div className="flex gap-1 animate-terminal-line-2">
            <span className="text-primary">POST</span>
            <span className="text-white/60">/auth</span>
            <span className="text-emerald-accent ml-auto">201</span>
          </div>
          <div className="flex gap-1 animate-terminal-line-3">
            <span className="text-yellow-500">PUT</span>
            <span className="text-white/60">/settings</span>
            <span className="text-emerald-accent ml-auto">200</span>
          </div>
          <div className="flex items-center gap-0.5 text-white/40">
            <span>$</span>
            <span className="w-1 h-2 bg-primary animate-blink" />
          </div>
        </div>
      </div>
    </div>
  );
}

function GekkeMapIcon() {
  return (
    <div className="w-full h-full bg-surface-container-low flex items-center justify-center relative overflow-hidden">
      {/* Radar rings */}
      <div className="absolute w-28 h-28 border border-cyan-500/10 rounded-full flex items-center justify-center" />
      <div className="absolute w-18 h-18 border border-cyan-500/15 rounded-full flex items-center justify-center" />
      <div className="absolute w-10 h-10 border border-cyan-500/20 rounded-full flex items-center justify-center" />

      {/* Axis Lines */}
      <div className="absolute w-28 h-[1px] bg-cyan-500/10" />
      <div className="absolute h-28 w-[1px] bg-cyan-500/10" />

      {/* Radar sweep */}
      <div className="absolute w-28 h-28 rounded-full overflow-hidden flex items-center justify-center pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 w-14 h-[1px] bg-gradient-to-r from-cyan-400 to-transparent origin-left -translate-y-1/2 animate-[spin_3s_linear_infinite]" />
      </div>

      {/* Map Pin 1 */}
      <div className="absolute top-7 left-12 flex flex-col items-center z-10">
        <div className="absolute w-3.5 h-3.5 rounded-full bg-cyan-500/30 animate-ping" />
        <svg className="w-3.5 h-3.5 text-cyan-400 relative z-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>

      {/* Map Pin 2 */}
      <div className="absolute bottom-7 right-10 flex flex-col items-center z-10">
        <div className="absolute w-3.5 h-3.5 rounded-full bg-primary/30 animate-ping" style={{ animationDelay: '1.5s' }} />
        <svg className="w-3.5 h-3.5 text-primary relative z-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>
    </div>
  );
}

function MarioIcon() {
  return (
    <div className="w-full h-full bg-[#111a2e] flex items-center justify-center relative overflow-hidden">
      {/* Ground lines */}
      <div className="absolute bottom-0 inset-x-0 h-3 bg-amber-900 border-t-2 border-amber-500 flex justify-between px-1 z-15">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-1.5 h-full border-r border-amber-950/40" />
        ))}
      </div>

      {/* Retro Cloud floating */}
      <div className="absolute top-4 left-4 w-8 h-4 bg-white/5 rounded-full animate-mario-cloud pointer-events-none" />
      <div className="absolute top-7 right-6 w-8 h-4 bg-white/5 rounded-full animate-mario-cloud pointer-events-none" style={{ animationDelay: '-4s', animationDuration: '12s' }} />

      {/* Bumping question block */}
      <div className="absolute bottom-8 left-[65px] w-6.5 h-6.5 bg-amber-500 border-2 border-amber-300 rounded flex items-center justify-center animate-mario-block shadow-lg shadow-black/50 z-10">
        <span className="font-mono font-black text-amber-200 text-[9px] animate-pulse">?</span>
      </div>

      {/* Coin popping out of block */}
      <div className="absolute bottom-[60px] left-[70px] w-3 h-3 bg-yellow-400 border border-yellow-200 rounded-full animate-mario-coin flex items-center justify-center z-0 shadow-[0_0_8px_rgba(234,179,8,0.8)]">
        <div className="w-0.5 h-1.5 bg-yellow-600 rounded-full" />
      </div>

      {/* Character (Mini Red Square / Jumper representing Mario) */}
      <div className="absolute bottom-3 left-4 w-4.5 h-4.5 bg-red-600 border border-red-400 rounded-sm flex flex-col justify-between p-0.5 animate-mario-jump z-10 shadow-lg shadow-black/40">
        <div className="w-full h-1 bg-blue-600 rounded-sm" />
        <div className="flex gap-0.5 justify-center">
          <div className="w-0.5 h-0.5 bg-yellow-400 rounded-full" />
          <div className="w-0.5 h-0.5 bg-yellow-400 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// --- Main Projects Component ---

export default function Projects() {
  const renderIcon = (type: Project["iconType"]) => {
    switch (type) {
      case "five-barber":
        return <FiveBarberIcon />;
      case "estrelinhas":
        return <ClubeEstrelinhasIcon />;
      case "clean-arch":
        return <CleanArchitectureIcon />;
      case "ged":
        return <GEDIcon />;
      case "microservices":
        return <MicroservicesIcon />;
      case "rest-api":
        return <RestApiIcon />;
      case "gekkemap":
        return <GekkeMapIcon />;
      case "mario":
        return <MarioIcon />;
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Expanding concentric tech rings effect */}
      <TechRings />

      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none z-0" />

      {/* Keyframes Injector */}
      <style>{`
        @keyframes floatDoc {
          0% { transform: translateY(30px) scale(0.6); opacity: 0; }
          10% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-25px) scale(0.9); opacity: 0; }
        }
        .animate-float-doc {
          animation: floatDoc infinite linear;
        }
        
        @keyframes packet1 {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(36px, 24px); opacity: 0; }
        }
        .animate-packet-1 {
          animation: packet1 3s infinite linear;
        }
        
        @keyframes packet2 {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-36px, 24px); opacity: 0; }
        }
        .animate-packet-2 {
          animation: packet2 3s infinite linear;
          animation-delay: 1s;
        }
        
        @keyframes packet3 {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(0, -36px); opacity: 0; }
        }
        .animate-packet-3 {
          animation: packet3 3s infinite linear;
          animation-delay: 2s;
        }

        @keyframes line1 { 0%, 100% { opacity: 0.15; } 10%, 90% { opacity: 1; } }
        @keyframes line2 { 0%, 30%, 100% { opacity: 0.15; } 40%, 90% { opacity: 1; } }
        @keyframes line3 { 0%, 60%, 100% { opacity: 0.15; } 70%, 90% { opacity: 1; } }
        
        .animate-terminal-line-1 { animation: line1 6s infinite ease-in-out; }
        .animate-terminal-line-2 { animation: line2 6s infinite ease-in-out; }
        .animate-terminal-line-3 { animation: line3 6s infinite ease-in-out; }

        @keyframes marioCloud {
          0% { transform: translateX(-60px); }
          100% { transform: translateX(180px); }
        }
        .animate-mario-cloud {
          animation: marioCloud 12s infinite linear;
        }

        @keyframes marioBlock {
          0% { transform: translateY(0); }
          38% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
          43% { transform: translateY(0); }
          100% { transform: translateY(0); }
        }
        .animate-mario-block {
          animation: marioBlock 4s infinite ease-in-out;
        }

        @keyframes marioCoin {
          0%, 38% { transform: translateY(0) scale(0); opacity: 0; }
          41% { opacity: 1; }
          48% { transform: translateY(-24px) scale(1); opacity: 1; }
          55%, 100% { transform: translateY(-10px) scale(0); opacity: 0; }
        }
        .animate-mario-coin {
          animation: marioCoin 4s infinite cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }

        @keyframes marioJump {
          0% { transform: translate(0, 0); }
          28% { transform: translate(15px, 0); }
          38% { transform: translate(32px, -32px); }
          48% { transform: translate(45px, 0); }
          65% { transform: translate(0, 0); }
          100% { transform: translate(0, 0); }
        }
        .animate-mario-jump {
          animation: marioJump 4s infinite ease-in-out;
        }
      `}</style>

      <section className="relative z-10 px-margin-mobile md:px-gutter max-w-container-max mx-auto mb-section-gap pt-16" id="projects">
        
        {/* Header following site standard */}
        <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
          <span className="inline-block border border-primary/20 text-primary bg-primary/5 font-label-caps text-label-caps px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Portfólio
          </span>
          <h2 className="font-headline-md text-headline-md text-on-background mb-4">
            Projetos em Destaque
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Uma seleção de sistemas corporativos, plataformas SaaS e arquiteturas de software que desenvolvi.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-element-gap relative z-10">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-surface border border-white/5 rounded-xl overflow-hidden group hover:border-primary/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full relative shadow-xl shadow-black/45"
            >
              {/* Card Animated Icon Header instead of static image */}
              <div className="h-48 relative w-full overflow-hidden border-b border-white/5">
                {renderIcon(project.iconType)}
              </div>
              
              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-headline-sm text-headline-sm mb-2 text-on-background group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-body-base text-[13.5px] text-on-surface-variant mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>
                
                {/* Action Button & Tags */}
                <div className="flex flex-col gap-4 mt-auto">
                  <div className="flex gap-1.5 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/5 text-on-surface-variant font-label-caps text-[10px] px-2.5 py-1 rounded-md border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold font-label-caps text-primary hover:text-primary-fixed hover:underline flex items-center gap-1.5 transition-colors active:scale-95"
                      >
                        Visualizar Código / Site
                        <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                      </a>
                    )}
                    {project.iconType === "mario" && (
                      <button
                        onClick={() => window.dispatchEvent(new CustomEvent("toggle-mario-game", { detail: { open: true } }))}
                        className="text-[11px] font-bold font-label-caps text-green-400 hover:text-green-300 hover:underline flex items-center gap-1 transition-colors active:scale-95 cursor-pointer bg-transparent border-none p-0"
                      >
                        Jogar Minigame 🎮
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
