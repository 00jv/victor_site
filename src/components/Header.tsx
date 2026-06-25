"use client";

import React, { useState, useEffect } from "react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scrolling to highlight the active navigation link
  useEffect(() => {
    const sections = ["plataforma", "diferenca", "trajetoria", "skills", "duvidas", "about", "contact"];
    
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
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-element-gap items-center">
        {[
          { id: "plataforma", label: "Serviços" },
          { id: "diferenca", label: "Metodologia" },
          { id: "trajetoria", label: "Trajetória" },
          { id: "skills", label: "Habilidades" },
          { id: "duvidas", label: "Dúvidas" },
          { id: "about", label: "Sobre" },
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
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "contact")}
          className="bg-primary text-slate-950 font-bold px-5 py-2 rounded-full font-label-caps text-[11px] uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all"
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
            { id: "duvidas", label: "Dúvidas" },
            { id: "about", label: "Sobre" },
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
        </div>
      )}
    </header>
  );
}
