"use client";

import React, { useState, useEffect, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  char: string;
  alpha: number;
  life: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(false);
  
  const particleIdRef = useRef(0);
  const requestRef = useRef<number | null>(null);

  // Mouse coordinate updates
  useEffect(() => {
    // Disable on mobile/touch screens
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });

      // Spawn trail particle (binary digit)
      if (Math.random() < 0.22) { // Rate limit spawning
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: clientX + (Math.random() - 0.5) * 10,
          y: clientY + (Math.random() - 0.5) * 10,
          char: Math.random() > 0.5 ? "1" : "0",
          alpha: 1.0,
          life: 40 + Math.random() * 20
        };
        setParticles((prev) => [...prev, newParticle].slice(-25)); // Cap particles array length
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Listen for hover states on active elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer");
      
      setIsHovered(!!isClickable);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Smooth lerp animation for the outer ring
  useEffect(() => {
    const updateRing = () => {
      setRingPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.18, // Speed of follow
          y: prev.y + dy * 0.18
        };
      });

      // Update particle decay
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            alpha: Math.max(0, p.alpha - 0.02),
            y: p.y + 0.3, // Slow downward drift
            life: p.life - 1
          }))
          .filter((p) => p.life > 0 && p.alpha > 0)
      );

      requestRef.current = requestAnimationFrame(updateRing);
    };

    requestRef.current = requestAnimationFrame(updateRing);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden font-mono">
      {/* Floating trail particles (binary digits) */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute text-[8px] font-bold text-primary/45 transition-transform"
          style={{
            left: p.x,
            top: p.y,
            opacity: p.alpha,
            transform: `translate(-50%, -50%) scale(${p.alpha})`
          }}
        >
          {p.char}
        </span>
      ))}

      {/* Outer Ring */}
      <div
        className={`absolute rounded-full border border-primary/40 -translate-x-1/2 -translate-y-1/2 transition-all duration-75 flex items-center justify-center ${
          isHovered
            ? "w-8 h-8 bg-primary/10 border-primary"
            : isClicking
            ? "w-4 h-4 bg-primary/20 border-primary"
            : "w-6 h-6 bg-transparent"
        }`}
        style={{
          left: ringPosition.x,
          top: ringPosition.y,
          boxShadow: isHovered ? "0 0 10px rgba(189,0,255,0.25)" : "none"
        }}
      />

      {/* Inner Dot */}
      <div
        className={`absolute w-1.5 h-1.5 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ${
          isClicking ? "scale-50" : isHovered ? "scale-150" : "scale-100"
        }`}
        style={{
          left: position.x,
          top: position.y
        }}
      />
    </div>
  );
}
