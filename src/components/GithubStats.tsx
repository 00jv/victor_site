"use client";

import React, { useState, useEffect } from "react";

interface GithubData {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  bio: string;
}

export default function GithubStats() {
  const [stats, setStats] = useState<GithubData | null>(null);
  const [loading, setLoading] = useState(true);

  const fallbackData: GithubData = {
    login: "00jv",
    avatar_url: "/images/victor_imagem.jpeg",
    public_repos: 22,
    followers: 60,
    following: 44,
    html_url: "https://github.com/00jv",
    bio: "Full Stack React + Node.js developer"
  };

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const res = await fetch("https://api.github.com/users/00jv");
        if (!res.ok) throw new Error("Github API request failed");
        
        const data = await res.json();
        
        // Check for rate limit or errors
        if (data.message && data.message.includes("API rate limit")) {
          throw new Error("Rate limit exceeded");
        }

        setStats({
          login: data.login || fallbackData.login,
          avatar_url: data.avatar_url || fallbackData.avatar_url,
          public_repos: data.public_repos ?? fallbackData.public_repos,
          followers: data.followers ?? fallbackData.followers,
          following: data.following ?? fallbackData.following,
          html_url: data.html_url || fallbackData.html_url,
          bio: data.bio || fallbackData.bio
        });
      } catch (err) {
        console.warn("Using fallback GitHub data due to API error/rate limits:", err);
        setStats(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-[#110d1a]/40 border border-white/5 rounded-xl p-5 mt-6 flex flex-col gap-4 font-mono select-none animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/5 rounded-full" />
          <div className="flex flex-col gap-1.5 flex-grow">
            <div className="h-3 bg-white/5 rounded w-1/3" />
            <div className="h-2 bg-white/5 rounded w-1/2" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-4">
          <div className="flex flex-col gap-1 items-center">
            <div className="h-4 bg-white/5 rounded w-1/2" />
            <div className="h-2.5 bg-white/5 rounded w-2/3" />
          </div>
          <div className="flex flex-col gap-1 items-center">
            <div className="h-4 bg-white/5 rounded w-1/2" />
            <div className="h-2.5 bg-white/5 rounded w-2/3" />
          </div>
          <div className="flex flex-col gap-1 items-center">
            <div className="h-4 bg-white/5 rounded w-1/2" />
            <div className="h-2.5 bg-white/5 rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="w-full bg-[#110d1a]/40 border border-white/5 rounded-xl p-5 mt-6 flex flex-col gap-4 font-mono select-none hover:border-primary/25 transition-all duration-300 shadow-lg shadow-black/40">
      
      {/* GitHub Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2.5">
          <svg className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
          </svg>
          <span className="text-[10px] font-bold text-on-background">GITHUB.STATUS</span>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-accent/5 border border-emerald-accent/20 px-2 py-0.5 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent animate-ping" />
          <span className="text-[8px] font-bold text-emerald-accent uppercase tracking-wider">LIVE</span>
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden relative bg-slate-900">
          <img
            src={stats.avatar_url}
            alt={`Avatar de ${stats.login}`}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-on-background">@{stats.login}</span>
          <span className="text-[9px] text-on-surface-variant/80 max-w-[200px] truncate">
            {stats.bio || "Full Stack Developer"}
          </span>
        </div>
      </div>

      {/* Grid Stats Counters */}
      <div className="grid grid-cols-3 gap-2 text-center bg-white/[0.01] border border-white/5 rounded-lg py-2.5 px-1">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-primary tabular-nums drop-shadow-[0_0_8px_rgba(189,0,255,0.2)]">
            {stats.public_repos}
          </span>
          <span className="text-[7.5px] text-on-surface-variant uppercase tracking-wider mt-0.5">Repos</span>
        </div>
        <div className="flex flex-col border-x border-white/5">
          <span className="text-sm font-bold text-[#00f3ff] tabular-nums drop-shadow-[0_0_8px_rgba(0,243,255,0.2)]">
            {stats.followers}
          </span>
          <span className="text-[7.5px] text-on-surface-variant uppercase tracking-wider mt-0.5">Followers</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-on-background tabular-nums">
            {stats.following}
          </span>
          <span className="text-[7.5px] text-on-surface-variant uppercase tracking-wider mt-0.5">Following</span>
        </div>
      </div>

      {/* Action Link */}
      <a
        href={stats.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[9.5px] font-bold text-primary hover:underline hover:text-primary-fixed flex items-center gap-1 mt-1.5 transition-colors self-start"
      >
        Acessar Perfil
        <span className="material-symbols-outlined text-[12px]">open_in_new</span>
      </a>
    </div>
  );
}
