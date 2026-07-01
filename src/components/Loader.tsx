"use client";

import React, { useEffect, useState, useRef } from "react";

interface LoaderProps {
  onComplete: () => void;
}

const bootLogs = [
  "INITIALIZING PORTFOLIO DECRYPTOR CORE...",
  "CONNECTING SECURE DATABASE CHANNEL... [OK]",
  "ESTABLISHING SUPABASE SECURITY ADAPTER... [OK]",
  "LOADING GRAPHICAL GLOW INTERFACES... [OK]",
  "DECRYPTING PROFILE IDENTITY: JOAO VICTOR... [OK]",
  "COMPILING DESIGN COMPONENTS & TOKENS... [OK]",
  "DECRYPTION COMPLETED. BOOTING SYSTEM..."
];

export default function Loader({ onComplete }: LoaderProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [glitchOut, setGlitchOut] = useState(false);
  const logIndexRef = useRef(0);

  useEffect(() => {
    // 1. Logs animation
    const logInterval = setInterval(() => {
      if (logIndexRef.current < bootLogs.length) {
        const nextLog = bootLogs[logIndexRef.current];
        setLogs(prev => [...prev, nextLog]);
        logIndexRef.current++;
      } else {
        clearInterval(logInterval);
      }
    }, 280);

    // 2. Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 80);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100 && logs.length === bootLogs.length) {
      const timeout = setTimeout(() => {
        setGlitchOut(true); // Trigger glitch effect
        const exitTimeout = setTimeout(() => {
          onComplete(); // Unmount
        }, 500);
        return () => clearTimeout(exitTimeout);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [progress, logs, onComplete]);

  // Generate blocks for the progress bar
  const totalBlocks = 20;
  const activeBlocks = Math.floor((progress / 100) * totalBlocks);

  return (
    <div 
      className={`fixed inset-0 bg-[#06040a] z-[9999] flex flex-col items-center justify-center font-mono text-[11px] md:text-[12px] p-6 select-none transition-all duration-500 overflow-hidden ${
        glitchOut ? "opacity-0 scale-105 pointer-events-none animate-glitch" : "opacity-100"
      }`}
    >
      {/* HUD scanline and screen grids */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] opacity-30" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 z-0" />
      
      {/* Tech concentric circular glow behind core */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px] pointer-events-none z-0 animate-pulse" />

      {/* Main decryptor window */}
      <div className="relative z-10 w-full max-w-[420px] flex flex-col items-stretch gap-6">
        
        {/* Core Decrypting Logo Animation */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="relative w-16 h-16 border-2 border-primary/40 rounded-xl flex items-center justify-center bg-[#110d1a]/50 shadow-[0_0_20px_rgba(189,0,255,0.15)] animate-[pulse_2s_infinite]">
            {/* Decrypting lines */}
            <div className="absolute top-0 inset-x-0 h-0.5 bg-primary animate-scanner" style={{ animationDuration: '2s' }} />
            <span className="font-sans font-black text-2xl tracking-tighter text-on-background">JV</span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">SYSTEM INTRUSION DETECTED</span>
        </div>

        {/* Console Box */}
        <div className="border border-white/5 bg-[#110d1a]/80 backdrop-blur-md rounded-lg p-5 flex flex-col gap-3 min-h-[180px] shadow-2xl shadow-black/80">
          <div className="flex justify-between items-center text-white/30 text-[9px] border-b border-white/5 pb-2">
            <span>TERMINAL MODULE v2.09</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              DECRYPTING...
            </span>
          </div>
          
          <div className="flex flex-col gap-1.5 flex-grow text-white/60">
            {logs.map((log, idx) => {
              if (!log) return null;
              const isSuccess = log.includes("[OK]");
              const isDone = log.includes("COMPLETED");
              return (
                <div 
                  key={idx} 
                  className={`animate-fade-in ${
                    isDone 
                      ? "text-primary font-bold" 
                      : isSuccess 
                        ? "text-emerald-accent" 
                        : "text-[#00f3ff]"
                  }`}
                >
                  &gt; {log}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="flex flex-col gap-2 bg-[#110d1a]/40 border border-white/5 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex justify-between items-center text-[10px] text-white/40">
            <span>MEM_DECRYPT_STATUS</span>
            <span className="font-bold text-primary">{progress}%</span>
          </div>
          
          <div className="flex gap-0.5 w-full bg-background border border-white/5 p-1 rounded-md overflow-hidden">
            {[...Array(totalBlocks)].map((_, i) => (
              <div 
                key={i} 
                className={`h-3 flex-grow rounded-sm transition-all duration-300 ${
                  i < activeBlocks 
                    ? "bg-primary shadow-[0_0_5px_var(--color-primary)]" 
                    : "bg-white/5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
