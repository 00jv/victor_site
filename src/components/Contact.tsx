"use client";

import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Insira um endereço de e-mail válido";
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "A mensagem não pode estar vazia";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear error on type
    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate sending time (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", message: "" });

    // Hide success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section className="px-margin-mobile md:px-gutter max-w-2xl mx-auto mb-section-gap pt-16" id="contact">
      <h2 className="font-headline-md text-headline-md text-primary mb-12 text-center">
        Entre em Contato
      </h2>
      <div className="max-w-2xl mx-auto relative">
        {/* Glassmorphic Success Overlay */}
        {isSuccess && (
          <div className="absolute inset-0 bg-background/90 backdrop-blur-md rounded-lg flex flex-col items-center justify-center border border-primary/20 p-8 z-10 text-center animate-fade-in">
            <span className="material-symbols-outlined text-primary text-5xl mb-4 animate-scale-up">
              check_circle
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-background mb-2">
              Mensagem Enviada!
            </h3>
            <p className="font-body-base text-body-base text-on-surface-variant max-w-md">
              Obrigado pelo contato. Responderei o mais rápido possível.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-6 text-primary border border-primary/30 px-5 py-2 rounded-full font-label-caps text-[11px] uppercase tracking-wider hover:bg-primary/10 transition-colors"
            >
              Enviar outra mensagem
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-surface p-8 border border-white/5 rounded-lg">
          {/* Name Field */}
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase tracking-wider" htmlFor="name">
              Nome
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-background border rounded-DEFAULT px-4 py-3 text-on-background focus:outline-none focus:ring-1 transition-all duration-200 ${
                errors.name 
                  ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/50" 
                  : "border-white/10 focus:border-primary focus:ring-primary"
              }`}
            />
            {errors.name && (
              <span className="text-red-500 font-label-caps text-[11px] mt-1 block">
                {errors.name}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase tracking-wider" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-background border rounded-DEFAULT px-4 py-3 text-on-background focus:outline-none focus:ring-1 transition-all duration-200 ${
                errors.email 
                  ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/50" 
                  : "border-white/10 focus:border-primary focus:ring-primary"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 font-label-caps text-[11px] mt-1 block">
                {errors.email}
              </span>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase tracking-wider" htmlFor="message">
              Mensagem
            </label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={`w-full bg-background border rounded-DEFAULT px-4 py-3 text-on-background focus:outline-none focus:ring-1 transition-all duration-200 resize-none ${
                errors.message 
                  ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/50" 
                  : "border-white/10 focus:border-primary focus:ring-primary"
              }`}
            />
            {errors.message && (
              <span className="text-red-500 font-label-caps text-[11px] mt-1 block">
                {errors.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-slate-950 font-bold px-6 py-4 rounded-full font-label-caps text-[12px] uppercase tracking-wider hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Enviando...
              </>
            ) : (
              "Enviar Mensagem"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
