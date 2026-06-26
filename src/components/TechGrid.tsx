"use client";
import React from "react";

export default function TechGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-slate-950">
      {/* Perspective wrapper */}
      <div className="absolute inset-0 perspective-[1000px]">
        {/* The Grid */}
        <div 
          className="absolute inset-[-100%] origin-center"
          style={{
            transform: "rotateX(60deg) translateY(-100px) translateZ(-200px)",
            backgroundImage: `
              linear-gradient(to right, rgba(139, 92, 246, 0.6) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.6) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            animation: "gridMove 10s linear infinite",
          }}
        />

        {/* Scanner Line */}
        <div 
          className="absolute inset-x-0 h-1 bg-purple-500/50 shadow-[0_0_20px_10px_rgba(139,92,246,0.3)]"
          style={{
            transform: "rotateX(60deg)",
            animation: "scanner 6s ease-in-out infinite",
          }}
        />

        {/* Top Fade (to blend into the rest of the site) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
      </div>

    </div>
  );
}
