"use client";

import React, { useState, useEffect, useRef } from "react";

const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a"
];

export default function KonamiCode() {
  const [isActive, setIsActive] = useState(false);
  const keyIndexRef = useRef(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play retro chime when activated
  const playRetroChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;
      const now = ctx.currentTime;
      
      const playNote = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.08, start);
        gain.gain.linearRampToValueAtTime(0.001, start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + duration);
      };

      // Classic chime arpeggio
      playNote(659.25, now, 0.08);        // E5
      playNote(783.99, now + 0.08, 0.08); // G5
      playNote(1318.51, now + 0.16, 0.08); // E6
      playNote(1046.50, now + 0.24, 0.08); // C6
      playNote(1174.66, now + 0.32, 0.08); // D6
      playNote(1567.98, now + 0.40, 0.20); // G6
    } catch (e) {
      // Ignored
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const targetKey = konamiSequence[keyIndexRef.current];

      // Match key (case-insensitive for b/a)
      const isMatch =
        key === targetKey ||
        (targetKey.length === 1 && key.toLowerCase() === targetKey);

      if (isMatch) {
        keyIndexRef.current++;
        if (keyIndexRef.current === konamiSequence.length) {
          // Konami Code Activated!
          setIsActive((prev) => {
            const newState = !prev;
            playRetroChime();
            // Dispatch event to MarioGame
            window.dispatchEvent(
              new CustomEvent("konami-activated", { detail: { active: newState } })
            );
            // Toggle body styling
            if (newState) {
              document.documentElement.classList.add("crt-active");
            } else {
              document.documentElement.classList.remove("crt-active");
            }
            return newState;
          });
          keyIndexRef.current = 0;
        }
      } else {
        // Reset sequence index, check if current key is the first key of sequence
        keyIndexRef.current = key === konamiSequence[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isActive) return null;

  return (
    <>
      <style>{`
        /* Scanline flickering overlay */
        .crt-scanlines {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.18) 50%
          );
          background-size: 100% 5px;
          opacity: 0.85;
        }

        /* Screen flicker */
        @keyframes crtFlicker {
          0% { opacity: 0.965; }
          50% { opacity: 0.985; }
          100% { opacity: 0.965; }
        }
        .crt-flicker {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9998;
          background: rgba(18, 255, 18, 0.015);
          animation: crtFlicker 0.15s infinite;
          mix-blend-mode: screen;
        }

        /* Vignette curvature styling */
        .crt-curvature {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9997;
          box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.7);
        }

        /* Glitchy top banner text */
        .crt-banner {
          position: fixed;
          top: 72px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 49;
          font-family: monospace;
          font-size: 9px;
          background: #110e17;
          border: 1px solid #ef4444;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
          color: #ef4444;
          padding: 6px 12px;
          border-radius: 8px;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 6px;
          animation: pulse 1.5s infinite alternate;
        }
      `}</style>

      {/* Retro overlays */}
      <div className="crt-scanlines" />
      <div className="crt-flicker" />
      <div className="crt-curvature" />

      {/* Warning banner with close button */}
      <div className="crt-banner select-none">
        <span>📺 CHEAT CODE ATIVADO: MODO CRT RETRÔ</span>
        <button
          onClick={() => {
            setIsActive(false);
            window.dispatchEvent(
              new CustomEvent("konami-activated", { detail: { active: false } })
            );
            document.documentElement.classList.remove("crt-active");
          }}
          className="text-white/60 hover:text-white font-bold ml-2 bg-red-950/40 border border-red-500/30 rounded px-1.5 py-0.5 cursor-pointer text-[8px] active:scale-95"
        >
          DESATIVAR
        </button>
      </div>
    </>
  );
}
