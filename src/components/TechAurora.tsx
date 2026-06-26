"use client";
import React from "react";

export default function TechAurora({ variant = "default" }: { variant?: "default" | "alt" }) {
  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ transform: variant === "alt" ? "scaleX(-1)" : "none" }}
    >
      {/* Glow 1: Purple, Top Left */}
      <div 
        className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[80px]"
        style={{ animation: 'float-purple 10s ease-in-out infinite' }}
      />
      
      {/* Glow 2: Cyan, Bottom Right */}
      <div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[100px]"
        style={{ animation: 'float-cyan 12s ease-in-out infinite' }}
      />

      {/* Glow 3: Pink, Center */}
      <div 
        className="absolute top-[30%] left-[20%] w-[350px] h-[350px] bg-pink-500 rounded-full blur-[90px]"
        style={{ animation: 'float-pink 14s ease-in-out infinite' }}
      />
      
      <style jsx global>{`
        @keyframes float-purple {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          33% { transform: translate(150px, 100px) scale(1.2); opacity: 0.8; }
          66% { transform: translate(-50px, 150px) scale(0.9); opacity: 0.5; }
        }
        @keyframes float-cyan {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          33% { transform: translate(-200px, -100px) scale(1.1); opacity: 0.7; }
          66% { transform: translate(-100px, 50px) scale(0.8); opacity: 0.4; }
        }
        @keyframes float-pink {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          33% { transform: translate(100px, -150px) scale(1.3); opacity: 0.6; }
          66% { transform: translate(200px, 50px) scale(0.9); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
