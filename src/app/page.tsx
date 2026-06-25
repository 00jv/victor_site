import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Features from "@/components/Features";
import Comparison from "@/components/Comparison";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Duvidas from "@/components/Duvidas";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Navigation Header */}
      <Header />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Infinite Looping Banner */}
        <Marquee />

        {/* Services & CSS Mockups */}
        <Features />

        {/* Comparison Card Grid */}
        <Comparison />

        {/* Trajetória Experience Timeline */}
        <Experience />

        {/* Stack Tecnológica */}
        <Skills />

        {/* About Biography */}
        <About />

        {/* FAQ Accordions */}
        <Duvidas />

        {/* Contact Form */}
        <Contact />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
