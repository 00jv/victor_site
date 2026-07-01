"use client";
import React, { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Characters for the matrix rain
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~".split("");
    const fontSize = 16; // Slightly larger font
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // Black background with opacity to create trail effect
      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(6, 4, 10, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Read current primary color dynamically from CSS variables on document root
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || "#bd00ff";

      // Setup text
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = primaryColor;
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 50);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full opacity-60 pointer-events-none z-0 mix-blend-screen"
    />
  );
}
