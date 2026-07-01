"use client";

import React, { useState, useEffect } from "react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("purple");

  // Theme values (must match CommandPalette.tsx)
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
    setCurrentTheme(themeName);
  };

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") || "purple";
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme as any);

    // Sync theme if changed by CommandPalette
    const syncTheme = () => {
      const currentSaved = localStorage.getItem("portfolio-theme") || "purple";
      setCurrentTheme(currentSaved);
    };

    window.addEventListener("portfolio-theme-change", syncTheme);
    return () => window.removeEventListener("portfolio-theme-change", syncTheme);
  }, []);

  // Monitor scrolling to highlight the active navigation link
  useEffect(() => {
    const sections = ["plataforma", "diferenca", "trajetoria", "skills", "projects", "about", "duvidas", "contact"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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
        behavior: "smooth"
      });
      
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-background/80 fixed top-0 left-0 right-0 backdrop-blur-md border-b border-white/5 z-50 h-16 flex justify-between items-center px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      {/* Logo */}
      <a 
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          setActiveSection("");
        }}
        className="flex items-center gap-1.5 font-headline-md text-headline-md font-extrabold text-on-background active:scale-95 transition-transform cursor-pointer"
      >
        <span>JV</span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary transition-all duration-300" />
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-element-gap items-center">
        {[
          { id: "plataforma", label: "Serviços" },
          { id: "diferenca", label: "Metodologia" },
          { id: "trajetoria", label: "Trajetória" },
          { id: "skills", label: "Habilidades" },
          { id: "projects", label: "Projetos" },
          { id: "about", label: "Sobre" },
          { id: "duvidas", label: "Dúvidas" },
        ].map((item) => (
          <a
            key={item.id}
            onClick={(e) => handleNavClick(e, item.id)}
            href={`#${item.id}`}
            className={`font-body-base text-body-base transition-colors duration-200 hover:text-white ${
              activeSection === item.id ? "text-primary font-semibold" : "text-on-surface-variant"
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Desktop CTAs */}
      <div className="hidden md:flex items-center gap-4">
        {/* Neon Accent Selector */}
        <div className="flex gap-1.5 border border-white/5 bg-white/[0.02] p-1.5 rounded-full mr-1">
          {Object.keys(themes).map((t) => {
            const isSelected = currentTheme === t;
            let dotBg = "bg-[#bd00ff]";
            let glowColor = "shadow-[0_0_8px_rgba(189,0,255,0.7)]";
            if (t === "green") {
              dotBg = "bg-[#00ff66]";
              glowColor = "shadow-[0_0_8px_rgba(0,255,102,0.7)]";
            } else if (t === "cyan") {
              dotBg = "bg-[#00f3ff]";
              glowColor = "shadow-[0_0_8px_rgba(0,243,255,0.7)]";
            } else if (t === "orange") {
              dotBg = "bg-[#ff8c00]";
              glowColor = "shadow-[0_0_8px_rgba(255,140,0,0.7)]";
            }
            
            return (
              <button
                key={t}
                onClick={() => applyTheme(t as any)}
                className={`w-3.5 h-3.5 rounded-full ${dotBg} transition-all duration-300 cursor-pointer ${
                  isSelected 
                    ? `scale-125 ring-2 ring-white/50 ${glowColor}` 
                    : "opacity-40 hover:opacity-100"
                }`}
                title={`Tema Neon ${t}`}
              />
            );
          })}
        </div>

        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "contact")}
          className="bg-primary text-slate-950 font-bold px-5 py-2 rounded-full font-label-caps text-[11px] uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all duration-300"
        >
          Contato
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-on-surface-variant hover:text-primary p-2 focus:outline-none transition-colors"
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined">
          {mobileMenuOpen ? "close" : "menu"}
        </span>
      </button>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background/95 border-b border-white/5 backdrop-blur-lg flex flex-col p-6 gap-4 md:hidden animate-fade-in-down">
          {[
            { id: "plataforma", label: "Serviços" },
            { id: "diferenca", label: "Metodologia" },
            { id: "trajetoria", label: "Trajetória" },
            { id: "skills", label: "Habilidades" },
            { id: "projects", label: "Projetos" },
            { id: "about", label: "Sobre" },
            { id: "duvidas", label: "Dúvidas" },
            { id: "contact", label: "Contato" },
          ].map((item) => (
            <a
              key={item.id}
              onClick={(e) => handleNavClick(e, item.id)}
              href={`#${item.id}`}
              className={`font-body-lg text-body-lg transition-colors py-2 border-b border-white/5 hover:text-white ${
                activeSection === item.id ? "text-primary font-bold" : "text-on-surface-variant"
              }`}
            >
              {item.label}
            </a>
          ))}

          {/* Theme Selector for Mobile */}
          <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Tema Neon</span>
            <div className="flex gap-2">
              {Object.keys(themes).map((t) => {
                let dotBg = "bg-[#bd00ff]";
                let glowColor = "shadow-[0_0_8px_rgba(189,0,255,0.7)]";
                if (t === "green") {
                  dotBg = "bg-[#00ff66]";
                  glowColor = "shadow-[0_0_8px_rgba(0,255,102,0.7)]";
                } else if (t === "cyan") {
                  dotBg = "bg-[#00f3ff]";
                  glowColor = "shadow-[0_0_8px_rgba(0,243,255,0.7)]";
                } else if (t === "orange") {
                  dotBg = "bg-[#ff8c00]";
                  glowColor = "shadow-[0_0_8px_rgba(255,140,0,0.7)]";
                }
                
                const isSelected = currentTheme === t;
                return (
                  <button
                    key={t}
                    onClick={() => applyTheme(t as any)}
                    className={`w-5 h-5 rounded-full ${dotBg} transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? `scale-110 ring-2 ring-white/50 ${glowColor}` 
                        : "opacity-45"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
