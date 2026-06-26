"use client";
import React from "react";

export default function TechCircuit() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
      <svg className="absolute w-full h-full min-h-[600px]" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333ea" stopOpacity="1" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        <g filter="url(#glow)">
          {/* Circuit Paths */}
          <path className="circuit-line" d="M -100 100 L 200 100 L 250 150 L 500 150 L 550 100 L 1300 100" />
          <path className="circuit-line" d="M 150 -100 L 150 200 L 200 250 L 400 250 L 450 300 L 450 900" />
          <path className="circuit-line" d="M 1300 400 L 900 400 L 850 450 L 600 450 L 550 500 L 550 900" />
          <path className="circuit-line" d="M -100 600 L 300 600 L 350 550 L 800 550 L 850 600 L 1300 600" />
          <path className="circuit-line" d="M 1000 -100 L 1000 200 L 1050 250 L 1200 250 L 1250 300 L 1250 900" />

          {/* Circuit Nodes */}
          <circle cx="200" cy="100" r="4" className="circuit-node" />
          <circle cx="250" cy="150" r="4" className="circuit-node" />
          <circle cx="500" cy="150" r="4" className="circuit-node" />
          <circle cx="550" cy="100" r="4" className="circuit-node" />
          
          <circle cx="150" cy="200" r="4" className="circuit-node" />
          <circle cx="200" cy="250" r="4" className="circuit-node" />
          <circle cx="400" cy="250" r="4" className="circuit-node" />
          <circle cx="450" cy="300" r="4" className="circuit-node" />

          <circle cx="900" cy="400" r="4" className="circuit-node" />
          <circle cx="850" cy="450" r="4" className="circuit-node" />
          <circle cx="600" cy="450" r="4" className="circuit-node" />
          <circle cx="550" cy="500" r="4" className="circuit-node" />
        </g>
      </svg>
      
      <style jsx>{`
        .circuit-line {
          fill: none;
          stroke: url(#circuitGrad);
          stroke-width: 2;
          stroke-dasharray: 1500;
          stroke-dashoffset: 1500;
          animation: drawCircuit 10s ease-in-out infinite alternate;
        }
        
        .circuit-node {
          fill: #06b6d4;
          animation: pulseNode 3s ease-in-out infinite alternate;
          transform-origin: center;
        }
        
        path:nth-of-type(1) { animation-delay: 0s; stroke-width: 2.5; }
        path:nth-of-type(2) { animation-delay: -2s; stroke-width: 1.5; }
        path:nth-of-type(3) { animation-delay: -5s; stroke-width: 2; }
        path:nth-of-type(4) { animation-delay: -7s; stroke-width: 1.5; }
        path:nth-of-type(5) { animation-delay: -4s; stroke-width: 2; }
        
        circle:nth-of-type(even) { animation-delay: -1s; fill: #9333ea; }
        circle:nth-of-type(3n) { animation-delay: -2s; fill: #ec4899; }
        
        @keyframes drawCircuit {
          0% { stroke-dashoffset: 1500; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.2; }
        }
        
        @keyframes pulseNode {
          0% { opacity: 0.3; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.6); }
        }
      `}</style>
    </div>
  );
}
