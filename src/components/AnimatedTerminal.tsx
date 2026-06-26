"use client";

import React, { useState, useEffect, useRef } from "react";

// The logs pool for the "running" state
const logsPool = [
  "[info] System: CPU load is nominal (12%)",
  "[info] Worker: Processing background jobs...",
  "[req] GET /api/v1/projects - 200 OK (11ms)",
  "[req] GET /api/v1/experience - 200 OK (8ms)",
  "[req] POST /api/v1/contact - 201 Created (34ms)",
  "[info] Redis: Cache cluster warmed up (102 keys)",
  "[req] GET /api/v1/faq - 200 OK (5ms)",
  "[req] GET /assets/main.css - 304 Not Modified",
  "[req] GET /images/victor_imagem.jpeg - 200 OK"
];



export default function AnimatedTerminal() {
  const [phase, setPhase] = useState<"booting" | "typing" | "running">("booting");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const [isGlitching, setIsGlitching] = useState(false);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const logIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLogs, currentTyping]);

  // Glitch effect logic
  useEffect(() => {
    const triggerGlitch = () => {
      if (Math.random() > 0.7) { // 30% chance to glitch
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200 + Math.random() * 300);
      }
      setTimeout(triggerGlitch, 3000 + Math.random() * 5000); // Check every 3-8s
    };
    
    const timeout = setTimeout(triggerGlitch, 2000);
    return () => clearTimeout(timeout);
  }, []);

  // Main Terminal Sequence
  const hasRun = useRef(false);
  
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    

    const runSequence = async () => {
      // 1. BOOT SEQUENCE
      setPhase("booting");
      setTerminalLogs(["Booting sys_kernel...", "Mounting volumes [OK]", "Loading interface modules..."]);
      
      const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      
      await sleep(800);
      setTerminalLogs(prev => [...prev, "Checking database connections... [OK]"]);
      await sleep(500);
      
      // Simulate progress bar
      setTerminalLogs(prev => [...prev, "Starting services: [----------] 0%"]);
      await sleep(200);
      setTerminalLogs(prev => [...prev.slice(0, -1), "Starting services: [##--------] 20%"]);
      await sleep(300);
      setTerminalLogs(prev => [...prev.slice(0, -1), "Starting services: [######----] 60%"]);
      await sleep(200);
      setTerminalLogs(prev => [...prev.slice(0, -1), "Starting services: [##########] 100%"]);
      await sleep(400);

      // Clear terminal for typing phase
      setTerminalLogs([]);
      setPhase("typing");
      
      // Helper for typing
      const typeCommand = async (cmd: string) => {
        let current = "";
        for (let i = 0; i < cmd.length; i++) {
          current += cmd[i];
          setCurrentTyping("$ " + current);
          await sleep(50 + Math.random() * 40); // Random typing speed
        }
        await sleep(200); // Pause after typing
        setTerminalLogs(prev => [...prev, "$ " + cmd]);
        setCurrentTyping("");
      };

      // 2. TYPING SEQUENCE
      await typeCommand("next build");
      setTerminalLogs(prev => [...prev, "▲ Next.js 16.2.9 (Turbopack)"]);
      await sleep(300);
      setTerminalLogs(prev => [...prev, "✓ Compiled successfully in 1.2s", "○  (Static)  prerendered 4 routes"]);
      await sleep(500);

      await typeCommand("prisma db push");
      await sleep(200);
      setTerminalLogs(prev => [...prev, "✓ Database schema is up to date."]);
      await sleep(500);

      await typeCommand("npm run start");
      await sleep(300);
      setTerminalLogs(prev => [
        ...prev, 
        "🚀 Server listening on port 3000 (production)",
        "[info] DB: Connected to PostgreSQL cluster",
        "[info] Prisma: Initialized client instance",
        "[info] Auth: Supabase adapter connected"
      ]);
      
      await sleep(1000);
      setPhase("running");
    };

    runSequence();


  }, []);

  // 3. RUNNING (Infinite Logs)
  useEffect(() => {
    if (phase !== "running") return;

    let count = 0;
    
    logIntervalRef.current = setInterval(() => {
      setTerminalLogs((prev) => {
        const nextLogs = [...prev, logsPool[count % logsPool.length]];
        // Keep terminal from getting too long
        if (nextLogs.length > 25) {
          nextLogs.shift();
        }
        return nextLogs;
      });
      count++;
    }, 1500 + Math.random() * 1000); // Random interval between logs

    return () => {
      if (logIntervalRef.current) {
        clearInterval(logIntervalRef.current);
      }
    };
  }, [phase]);

  return (
    <div className={`w-full lg:w-1/2 h-[50vh] lg:h-screen bg-[#030205]/40 border-l border-white/5 relative flex flex-col justify-end overflow-hidden ${isGlitching ? 'animate-glitch' : ''}`}>
      
      {/* Terminal Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-[#06040a]/80 backdrop-blur-md border-b border-white/5 flex items-center px-6 z-20">
         <div className="flex gap-2">
           <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
           <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
           <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
         </div>
         <span className="ml-4 font-mono text-[10px] text-white/30 tracking-wider">victor@server:~/portfolio-api</span>
      </div>

      {/* Ambient Terminal Glow - Pulsing */}
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '4s' }} />

      {/* Terminal Logs Container */}
      <div 
        ref={terminalRef}
        className="relative z-10 w-full h-full pt-16 pb-6 px-6 lg:px-10 overflow-y-auto font-mono text-[12px] md:text-[14px] leading-loose flex flex-col justify-end"
      >
        <div className="space-y-1 w-full">
          {terminalLogs.map((log, index) => {
            const isCmd = log.startsWith("$");
            const isErr = log.toLowerCase().includes("err") || log.toLowerCase().includes("fail");
            const isSuccess = log.includes("✓") || log.includes("🚀") || log.includes("success") || log.includes("[OK]");
            const isInfo = log.includes("[info]") || log.includes("Booting") || log.includes("Mounting") || log.includes("Loading") || log.includes("Starting");
            const isReq = log.includes("[req]");
            
            let textColor = "text-white/60";
            if (isCmd) textColor = "text-primary font-bold";
            else if (isErr) textColor = "text-red-400";
            else if (isSuccess) textColor = "text-emerald-400";
            else if (isInfo) textColor = "text-[#00f3ff]";
            else if (isReq) textColor = "text-white/40";

            return (
              <div key={index} className={`${textColor} break-words animate-fade-in`}>
                {log}
              </div>
            );
          })}
          
          {/* Typing indicator or Blinking Cursor */}
          <div className="text-white/70 inline-block mt-2 font-bold min-h-[24px]">
            {phase === "typing" ? (
              <span className="text-primary">{currentTyping}<span className="w-2 h-4 inline-block bg-white/70 translate-y-1 ml-1 animate-blink" /></span>
            ) : (
              <span><span className="text-primary">$</span> <span className="w-2 h-4 inline-block bg-white/70 translate-y-1 animate-blink" /></span>
            )}
          </div>
        </div>
      </div>

      {/* Terminal Scanline Overlay Effect */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />
    </div>
  );
}
