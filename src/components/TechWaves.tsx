"use client";
import React from "react";

export default function TechWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40 flex items-end justify-center">
      <svg className="absolute w-[200%] h-[300px] -bottom-[50px] mix-blend-screen" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9333ea" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
          </linearGradient>
          <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        <g filter="url(#waveGlow)">
          {/* Wave 1 */}
          <path 
            fill="url(#waveGrad1)" 
            d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,128C672,139,768,213,864,229.3C960,245,1056,203,1152,176C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
            style={{ animation: "wave-move 12s ease-in-out infinite alternate" }}
          />
          {/* Wave 2 */}
          <path 
            fill="url(#waveGrad2)" 
            d="M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,128C672,96,768,64,864,85.3C960,107,1056,181,1152,192C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
            style={{ animation: "wave-move 18s ease-in-out infinite alternate-reverse" }}
          />
        </g>
      </svg>
    </div>
  );
}
