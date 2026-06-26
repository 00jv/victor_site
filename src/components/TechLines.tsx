"use client";
import React, { useEffect, useState } from "react";

interface LaserLine {
  id: number;
  top: number;
  duration: number;
  delay: number;
  colorClass: string;
  shadowColor: string;
}

export default function TechLines() {
  const [lines, setLines] = useState<LaserLine[]>([]);

  useEffect(() => {
    // Generate only on client to avoid hydration mismatch
    const generated = Array.from({ length: 25 }).map((_, i) => {
      const top = Math.random() * 100;
      const duration = Math.random() * 3 + 2; // 2s to 5s
      const delay = Math.random() * -15; // Negative to start immediately with offset
      
      let colorClass = "";
      let shadowColor = "";
      
      if (i % 3 === 0) {
        colorClass = "from-purple-500";
        shadowColor = "rgba(147, 51, 234, 0.8)";
      } else if (i % 3 === 1) {
        colorClass = "from-cyan-500";
        shadowColor = "rgba(6, 182, 212, 0.8)";
      } else {
        colorClass = "from-pink-500";
        shadowColor = "rgba(236, 72, 153, 0.8)";
      }
      
      return { id: i, top, duration, delay, colorClass, shadowColor };
    });
    setLines(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Perspective wrapper for diagonal feel */}
      <div className="absolute inset-0 -rotate-[20deg] scale-150 origin-center opacity-80">
        {lines.map((line) => (
          <div
            key={line.id}
            className={`absolute h-[2px] w-[300px] bg-gradient-to-r ${line.colorClass} to-transparent rounded-full`}
            style={{
              top: `${line.top}%`,
              left: `-20%`,
              boxShadow: `0 0 15px 3px ${line.shadowColor}`,
              animation: `shoot-line ${line.duration}s linear infinite`,
              animationDelay: `${line.delay}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>
      <style jsx global>{`
        @keyframes shoot-line {
          0% { transform: translateX(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(2500px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
