"use client";
import React from "react";

export default function TechRings() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center opacity-40">
      <div className="relative w-full max-w-3xl aspect-square flex items-center justify-center">
        {/* Ring 1 - Purple */}
        <div 
          className="absolute w-[200%] h-[200%] max-w-[1200px] max-h-[1200px] border border-purple-500 rounded-full"
          style={{ animation: 'expandRing 10s cubic-bezier(0.1, 0.8, 0.3, 1) infinite', animationDelay: '0s' }}
        />
        {/* Ring 2 - Cyan */}
        <div 
          className="absolute w-[200%] h-[200%] max-w-[1200px] max-h-[1200px] border border-cyan-500 rounded-full"
          style={{ animation: 'expandRing 10s cubic-bezier(0.1, 0.8, 0.3, 1) infinite', animationDelay: '3.3s' }}
        />
        {/* Ring 3 - Pink */}
        <div 
          className="absolute w-[200%] h-[200%] max-w-[1200px] max-h-[1200px] border border-pink-500 rounded-full"
          style={{ animation: 'expandRing 10s cubic-bezier(0.1, 0.8, 0.3, 1) infinite', animationDelay: '6.6s' }}
        />
      </div>

    </div>
  );
}
