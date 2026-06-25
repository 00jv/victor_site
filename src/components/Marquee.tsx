import React from "react";

const items = [
  "NODE.JS",
  "REACT",
  "NEXT.JS",
  "TYPESCRIPT",
  "POSTGRESQL",
  "PRISMA",
  "DOCKER",
  "SUPABASE",
  "VERCEL",
  "JAVA",
  "REACT NATIVE",
  "MICROSERVICES",
  "GIT & GITHUB",
  "LINUX",
];

export default function Marquee() {
  // Repeat the array to ensure it spans larger screens
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="w-full bg-surface border-y border-white/5 py-4 overflow-hidden relative flex select-none">
      {/* Decorative side blurs */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Marquee Loop */}
      <div className="flex whitespace-nowrap animate-marquee gap-8">
        {marqueeItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="font-label-caps text-label-caps font-extrabold tracking-widest text-primary text-[11px] md:text-[13px]">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
        ))}
      </div>
      
      {/* Second identical marquee copy for seamless loop */}
      <div className="flex whitespace-nowrap animate-marquee gap-8" aria-hidden="true">
        {marqueeItems.map((item, idx) => (
          <div key={`dup-${idx}`} className="flex items-center gap-8">
            <span className="font-label-caps text-label-caps font-extrabold tracking-widest text-primary text-[11px] md:text-[13px]">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}
