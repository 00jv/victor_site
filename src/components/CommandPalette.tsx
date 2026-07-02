"use client";

import React, { useState, useEffect, useRef } from "react";

interface CommandItem {
  id: string;
  category: "Navegação" | "Temas Neon" | "Ações";
  label: string;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Theme values (must match Header.tsx)
  const themes = {
    purple: {
      primary: "#bd00ff",
      primaryFixed: "#d946ef",
      inversePrimary: "#700099",
    },
    green: {
      primary: "#00ff66",
      primaryFixed: "#34d399",
      inversePrimary: "#047857",
    },
    cyan: {
      primary: "#00f3ff",
      primaryFixed: "#38bdf8",
      inversePrimary: "#0369a1",
    },
    orange: {
      primary: "#ff8c00",
      primaryFixed: "#fb923c",
      inversePrimary: "#c2410c",
    }
  };

  const applyTheme = (themeName: keyof typeof themes) => {
    const theme = themes[themeName];
    document.documentElement.style.setProperty("--color-primary", theme.primary);
    document.documentElement.style.setProperty("--color-primary-container", theme.primary);
    document.documentElement.style.setProperty("--color-primary-fixed-dim", theme.primary);
    document.documentElement.style.setProperty("--color-primary-fixed", theme.primaryFixed);
    document.documentElement.style.setProperty("--color-inverse-primary", theme.inversePrimary);
    localStorage.setItem("portfolio-theme", themeName);
    // Dispatch custom event to notify other components (e.g. Header)
    window.dispatchEvent(new Event("portfolio-theme-change"));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 64; // Header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("victor.matos.dev@gmail.com");
    alert("E-mail copiado para a área de transferência!");
    setIsOpen(false);
  };

  const downloadResume = () => {
    const a = document.createElement("a");
    a.href = "/docs/VICTORFAGUNDESDEMATOS_Currículo.pdf";
    a.download = "VICTORFAGUNDESDEMATOS_Currículo.pdf";
    a.target = "_blank";
    a.click();
    setIsOpen(false);
  };

  const commands: CommandItem[] = [
    // Navigation
    { id: "nav-servicos", category: "Navegação", label: "Ir para Serviços", shortcut: "G S", action: () => scrollToSection("plataforma") },
    { id: "nav-metodo", category: "Navegação", label: "Ir para Metodologia", shortcut: "G M", action: () => scrollToSection("diferenca") },
    { id: "nav-trajeto", category: "Navegação", label: "Ir para Trajetória", shortcut: "G T", action: () => scrollToSection("trajetoria") },
    { id: "nav-habilidades", category: "Navegação", label: "Ir para Habilidades", shortcut: "G H", action: () => scrollToSection("skills") },
    { id: "nav-projetos", category: "Navegação", label: "Ir para Projetos Recentes", shortcut: "G P", action: () => scrollToSection("projects") },
    { id: "nav-sobre", category: "Navegação", label: "Ir para Sobre Mim", shortcut: "G A", action: () => scrollToSection("about") },
    { id: "nav-faq", category: "Navegação", label: "Ir para Dúvidas Frequentes", shortcut: "G F", action: () => scrollToSection("duvidas") },
    { id: "nav-contato", category: "Navegação", label: "Ir para Contato", shortcut: "G C", action: () => scrollToSection("contact") },
    
    // Themes
    { id: "theme-purple", category: "Temas Neon", label: "Mudar tema: Roxo Cyberpunk", shortcut: "T P", action: () => applyTheme("purple") },
    { id: "theme-green", category: "Temas Neon", label: "Mudar tema: Verde Matrix", shortcut: "T G", action: () => applyTheme("green") },
    { id: "theme-cyan", category: "Temas Neon", label: "Mudar tema: Ciano Sci-Fi", shortcut: "T C", action: () => applyTheme("cyan") },
    { id: "theme-orange", category: "Temas Neon", label: "Mudar tema: Laranja Terminal", shortcut: "T O", action: () => applyTheme("orange") },
    
    // Actions
    { id: "action-resume", category: "Ações", label: "Baixar Currículo (PDF)", shortcut: "D R", action: downloadResume },
    { id: "action-email", category: "Ações", label: "Copiar E-mail de Contato", shortcut: "C E", action: copyEmail },
    { id: "action-mario", category: "Ações", label: "Jogar Minigame (Dev Mario)", shortcut: "J M", action: () => { window.dispatchEvent(new CustomEvent("toggle-mario-game", { detail: { open: true } })); setIsOpen(false); } },
  ];

  // Global keyboard listeners to open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      
      // Open with "/" when not in inputs
      if (e.key === "/") {
        const activeEl = document.activeElement;
        if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.getAttribute("contenteditable") === "true")) {
          return;
        }
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Keyboard navigation inside the palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, search]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) {
    // Return subtle floating hint in the corner
    return (
      <div 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-surface/80 border border-white/5 px-3 py-1.5 rounded-full backdrop-blur-md font-mono text-[9px] text-white/40 hover:text-primary hover:border-primary/30 transition-all shadow-lg shadow-black/30 flex items-center gap-1.5 cursor-pointer active:scale-95 select-none"
      >
        <span className="material-symbols-outlined text-[12px]">keyboard</span>
        <span>Aperte <kbd className="bg-white/5 px-1 py-0.5 rounded border border-white/10 font-sans font-bold">Ctrl + K</kbd> para comandos</span>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
      />

      {/* Palette Box */}
      <div className="relative z-10 w-full max-w-[500px] border border-primary/30 bg-[#0b0812]/95 rounded-xl shadow-[0_0_30px_rgba(189,0,255,0.15)] flex flex-col overflow-hidden max-h-[450px] animate-scale-up">
        {/* Search header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5">
          <span className="material-symbols-outlined text-white/30 text-[18px]">search</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Digite um comando para navegar ou mudar de tema..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow bg-transparent text-on-background text-[13px] font-mono focus:outline-none placeholder-white/20"
          />
          <span 
            onClick={() => setIsOpen(false)}
            className="text-[9px] font-mono text-white/30 border border-white/10 px-1.5 py-0.5 rounded cursor-pointer hover:bg-white/5 select-none"
          >
            ESC
          </span>
        </div>

        {/* Command list */}
        <div 
          ref={listRef}
          className="overflow-y-auto py-2 flex flex-col max-h-[350px]"
        >
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center font-mono text-white/30 text-[11px]">
              Nenhum comando encontrado para "{search}"
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              
              // Group dividers by category
              const showCategoryHeader = idx === 0 || filteredCommands[idx - 1].category !== cmd.category;

              return (
                <React.Fragment key={cmd.id}>
                  {showCategoryHeader && (
                    <div className="px-4 pt-3 pb-1 text-[9px] font-bold text-primary/70 uppercase tracking-widest border-t border-white/5 first:border-none">
                      {cmd.category}
                    </div>
                  )}
                  <div
                    onClick={() => cmd.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between px-4 py-2.5 font-mono text-[11.5px] cursor-pointer transition-colors ${
                      isSelected 
                        ? "bg-primary text-slate-950 font-bold" 
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[15px] opacity-60">
                        {cmd.category === "Navegação" ? "explore" : cmd.category === "Temas Neon" ? "palette" : "bolt"}
                      </span>
                      <span>{cmd.label}</span>
                    </div>
                    {cmd.shortcut && (
                      <span className={`text-[9px] font-bold border px-1.5 py-0.5 rounded ${
                        isSelected 
                          ? "border-slate-950/30 text-slate-950/60 bg-slate-950/5" 
                          : "border-white/5 text-white/30 bg-white/5"
                      }`}>
                        {cmd.shortcut}
                      </span>
                    )}
                  </div>
                </React.Fragment>
              );
            })
          )}
        </div>
        
        {/* Footer info */}
        <div className="bg-[#110d1a]/50 border-t border-white/5 px-4 py-2.5 flex justify-between items-center text-[9px] text-white/20 font-mono">
          <span>Use as setas ↑↓ e Enter para navegar</span>
          <span>Aperte "/" a qualquer momento</span>
        </div>
      </div>
    </div>
  );
}
