"use client";
import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  size: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  color: string;
  tx: number;
  ty: number;
}

export default function TechParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generated on client to avoid Next.js hydration mismatch
    const generated = Array.from({ length: 40 }).map((_, i) => {
      const size = Math.random() * 5 + 2;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = Math.random() * 25 + 15;
      const delay = Math.random() * -30;
      
      const colors = ["bg-purple-500", "bg-cyan-500", "bg-pink-500", "bg-purple-400"];
      const color = colors[i % colors.length];
      
      // Random movement vectors (-150px to 150px)
      const tx = Math.random() * 300 - 150;
      const ty = Math.random() * 300 - 150;
      
      return { id: i, size, left, top, duration, delay, color, tx, ty };
    });
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full ${p.color}`}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            boxShadow: `0 0 ${p.size * 3}px currentColor`,
            animation: `float-particle ${p.duration}s ease-in-out infinite alternate`,
            animationDelay: `${p.delay}s`,
            "--tx": `${p.tx}px`,
            "--ty": `${p.ty}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
