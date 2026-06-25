import React from "react";

export default function Footer() {
  return (
    <footer className="bg-transparent w-full border-t border-white/5 flex flex-col md:flex-row justify-between items-center py-element-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto select-none">
      {/* Copyright */}
      <div className="font-label-caps text-label-caps text-on-surface opacity-80 hover:opacity-100 transition-opacity mb-4 md:mb-0">
        © {new Date().getFullYear()} João Victor. Todos os direitos reservados.
      </div>

      {/* Social Links */}
      <div className="flex gap-6">
        {[
          { label: "GitHub", href: "https://github.com/00jv" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/jo%C3%A3o-victor-fagundes-de-matos-1b5aba205/" },
          { label: "Email", href: "mailto:jvmatosfagundes@gmail.com" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body-base text-body-base text-on-surface-variant hover:text-white transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
