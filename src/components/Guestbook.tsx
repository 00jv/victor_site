"use client";

import React, { useState, useEffect } from "react";

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  isMock?: boolean;
}

const mockEntries: GuestbookEntry[] = [
  {
    id: "mock-1",
    name: "Linus Torvalds",
    message: "Clean code structure. Verified on sys_kernel! 🐧",
    timestamp: "2026-07-02 12:00:00",
    isMock: true,
  },
  {
    id: "mock-2",
    name: "Ada Lovelace",
    message: "First programmer approved! Impressive neon interface. 💻",
    timestamp: "2026-07-02 11:34:10",
    isMock: true,
  },
  {
    id: "mock-3",
    name: "Steve Wozniak",
    message: "Love the circuit animations, man. Keep hacking! ⚡",
    timestamp: "2026-07-02 09:15:22",
    isMock: true,
  },
  {
    id: "mock-4",
    name: "Brendan Eich",
    message: "TypeScript tags check out. JS is alive! 💛",
    timestamp: "2026-07-02 08:02:11",
    isMock: true,
  }
];

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Load guestbook entries from localStorage
  const loadEntries = () => {
    const stored = localStorage.getItem("portfolio-guestbook");
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch (e) {
        setEntries(mockEntries);
      }
    } else {
      setEntries(mockEntries);
      localStorage.setItem("portfolio-guestbook", JSON.stringify(mockEntries));
    }
  };

  useEffect(() => {
    loadEntries();

    // Listen for updates from other components (like Terminal)
    const handleUpdate = () => {
      loadEntries();
    };
    window.addEventListener("guestbook-updated", handleUpdate);
    return () => window.removeEventListener("guestbook-updated", handleUpdate);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name.trim() || !message.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (name.length > 30) {
      setError("O nome deve ter no máximo 30 caracteres.");
      return;
    }

    if (message.length > 150) {
      setError("A mensagem deve ter no máximo 150 caracteres.");
      return;
    }

    const newEntry: GuestbookEntry = {
      id: "user-" + Date.now(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("portfolio-guestbook", JSON.stringify(updated));
    
    // Dispatch custom event to notify other components (e.g., Terminal)
    window.dispatchEvent(new Event("guestbook-updated"));

    setName("");
    setMessage("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <section id="guestbook" className="py-20 relative w-full overflow-hidden border-t border-white/5 bg-[#06040a]/40">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block border border-primary/20 text-primary bg-primary/5 font-label-caps text-label-caps px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest text-xs">
            Conexão
          </span>
          <h2 className="font-headline-md text-headline-md text-on-background mb-4">
            Livro de Visitas
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Deixe sua assinatura digital no mural ou assine digitando <code className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-primary text-xs font-mono font-bold">sign [seu_nome] [sua_mensagem]</code> diretamente no terminal ao lado!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Guestbook List Box */}
          <div className="lg:col-span-7 flex flex-col h-[400px] bg-surface border border-white/5 rounded-xl p-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-xs text-white/50 uppercase tracking-wider">Mural Ativo</span>
              </div>
              <span className="font-mono text-[10px] text-white/30">{entries.length} assinaturas</span>
            </div>

            {/* Scrollable list */}
            <div className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className={`p-3.5 rounded-lg border transition-all duration-300 ${
                    entry.isMock
                      ? "border-primary/10 bg-primary/5/20 hover:border-primary/30"
                      : "border-white/5 bg-white/2 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <span className="font-mono text-xs font-bold text-white/90 flex items-center gap-1.5">
                      {entry.isMock && <span className="text-[10px] text-primary">⚙️</span>}
                      {entry.name}
                    </span>
                    <span className="font-mono text-[9px] text-white/30">{entry.timestamp}</span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed break-words font-mono">
                    {entry.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Form Box */}
          <div className="lg:col-span-5 flex flex-col justify-center bg-surface border border-white/5 rounded-xl p-6 md:p-8 shadow-2xl">
            <h3 className="font-mono text-sm font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-3">
              Deixe sua marca
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="gb-name" className="block font-mono text-[10px] text-white/50 uppercase tracking-wider mb-2">
                  Nome / Apelido
                </label>
                <input
                  id="gb-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Alan Turing"
                  className="w-full bg-[#06040a]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
                  required
                />
              </div>

              <div>
                <label htmlFor="gb-message" className="block font-mono text-[10px] text-white/50 uppercase tracking-wider mb-2">
                  Mensagem
                </label>
                <textarea
                  id="gb-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ex: Excelente portfólio! Adorei a física do Mario."
                  rows={3}
                  className="w-full bg-[#06040a]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono resize-none"
                  required
                />
              </div>

              {error && (
                <div className="text-red-400 font-mono text-xs p-3 bg-red-950/20 border border-red-500/20 rounded-lg">
                  ⚠️ {error}
                </div>
              )}

              {success && (
                <div className="text-emerald-400 font-mono text-xs p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg">
                  ✓ Assinatura gravada com sucesso no Local Storage!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-primary/10 border border-primary/30 hover:bg-primary hover:text-white transition-all duration-300 text-primary font-mono font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer active:scale-95 shadow-md shadow-primary/5"
              >
                Gravar Assinatura
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
