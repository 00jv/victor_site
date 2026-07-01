"use client";

import React, { useState, useEffect, useRef } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}

function AnimatedNumber({ value, duration = 1200, suffix = "", decimals = 0 }: AnimatedNumberProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Calculate current value
            const currentVal = progress * value;
            setCount(Number(currentVal.toFixed(decimals)));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(value);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration, decimals, hasAnimated]);

  return (
    <span ref={elementRef} className="font-sans font-black text-4xl md:text-5xl text-primary tracking-tight tabular-nums drop-shadow-[0_0_12px_rgba(189,0,255,0.25)]">
      {decimals > 0 ? count.toFixed(decimals) : count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const statsData = [
    {
      value: 3,
      suffix: "+",
      decimals: 0,
      label: "Anos de Experiência",
      description: "Atuação em engenharia de sistemas",
    },
    {
      value: 25,
      suffix: "+",
      decimals: 0,
      label: "Projetos & Repositórios",
      description: "Soluções e arquiteturas desenvolvidas",
    },
    {
      value: 15,
      suffix: "+",
      decimals: 0,
      label: "APIs & Integrações",
      description: "Serviços robustos em produção",
    },
    {
      value: 99.9,
      suffix: "%",
      decimals: 1,
      label: "Uptime & Latência",
      description: "Aplicações de alto desempenho",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/5 bg-[#110d1a]/20 backdrop-blur-sm mb-16 py-10">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[60px] bg-primary/5 blur-[80px] pointer-events-none rounded-full" />
      
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 md:gap-x-12 items-center justify-between text-center lg:text-left">
          {statsData.map((stat, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center lg:items-start group transition-all duration-300 p-2 rounded-xl hover:bg-white/[0.01]"
            >
              {/* Animated number counter */}
              <div className="mb-2.5 flex items-center justify-center gap-0.5">
                <AnimatedNumber 
                  value={stat.value} 
                  suffix={stat.suffix} 
                  decimals={stat.decimals}
                />
              </div>

              {/* Stat Text */}
              <h3 className="font-headline-sm text-[15px] font-bold text-on-background mb-1 group-hover:text-primary transition-colors">
                {stat.label}
              </h3>
              
              <p className="text-[12px] text-on-surface-variant leading-relaxed text-center lg:text-left">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
