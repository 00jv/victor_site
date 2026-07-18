"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import Comparison from "@/components/Comparison";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Duvidas from "@/components/Duvidas";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TechWaves from "@/components/TechWaves";
import Loader from "@/components/Loader";
import CommandPalette from "@/components/CommandPalette";
import MarioGame from "@/components/MarioGame";
import MusicPlayer from "@/components/MusicPlayer";
import KonamiCode from "@/components/KonamiCode";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <Loader onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen flex flex-col justify-between overflow-x-hidden animate-fade-in">
          {/* Navigation Header */}
          <Header />

          {/* Main Sections */}
          <main className="flex-grow">
            {/* Hero Section */}
            <Hero />

            {/* Infinite Looping Banner */}
            <Marquee />

            {/* Métricas de Engenharia */}
            <Stats />

            {/* Services & CSS Mockups */}
            <Features />

            {/* Comparison Card Grid */}
            <Comparison />

            {/* Trajetória Experience Timeline */}
            <Experience />

            {/* Stack Tecnológica */}
            <Skills />

            {/* Projetos Selecionados */}
            <Projects />

            {/* About Biography */}
            <About />

            {/* FAQ Accordions */}
            <Duvidas />

          </main>

          {/* Contact and Footer wrapped together for shared background */}
          <div className="relative w-full overflow-hidden">
            <TechWaves />
            <Contact />
            <Footer />
          </div>

          {/* Global Command Palette */}
          <CommandPalette />

          {/* Retro Dev Mario Minigame */}
          <MarioGame />

          {/* Konami Code Listener */}
          <KonamiCode />
        </div>
      )}

      {/* Retro Cassette Music Player */}
      <MusicPlayer hideFloatingButton={isLoading} />
    </>
  );
}
