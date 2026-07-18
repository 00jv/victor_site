"use client";

import React, { useState, useEffect, useRef } from "react";

interface Track {
  title: string;
  artist: string;
  url: string;
}

const playlist: Track[] = [
  {
    title: "Synthwave Sunset",
    artist: "RetroCoder",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Cyberpunk Horizon",
    artist: "LofiHacker",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Neon Tokyo Drive",
    artist: "BitRunner",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

interface MusicPlayerProps {
  hideFloatingButton?: boolean;
}

export default function MusicPlayer({ hideFloatingButton = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.2); // Start soft
  const [isMinimized, setIsMinimized] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = playlist[currentTrackIndex];

  // Auto-play on mount, handling autoplay policies
  useEffect(() => {
    // Only initialize once
    if (!audioRef.current) {
      audioRef.current = new Audio(playlist[0].url);
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
    }

    let hasStartedPlaying = false;

    const playAudio = () => {
      if (audioRef.current && !hasStartedPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            hasStartedPlaying = true;
            removeInteractionListeners();
          })
          .catch((error) => {
            console.log("Autoplay blocked or failed. Waiting for user interaction...", error);
          });
      }
    };

    const handleInteraction = () => {
      playAudio();
    };

    const removeInteractionListeners = () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    // Try playing immediately
    playAudio();

    // Set up listeners for interaction in case playAudio was blocked
    document.addEventListener("click", handleInteraction);
    document.addEventListener("keydown", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      removeInteractionListeners();
    };
  }, []);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle play/pause
  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.url);
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Handle audio block policy
        alert("Clique na tela primeiro para autorizar a reprodução de áudio.");
      });
    }
  };

  // Skip track
  const skipTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = playlist[nextIndex].url;
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  if (hideFloatingButton) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 font-mono text-[10px]">
      <style>{`
        @keyframes reelSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-reel-spin {
          animation: reelSpin 4s linear infinite;
        }
        @keyframes visBar {
          0%, 100% { height: 3px; }
          50% { height: 16px; }
        }
        .vis-bar {
          animation: visBar 1s ease-in-out infinite;
        }
      `}</style>

      {isMinimized ? (
        // Minimized floating button
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-950 border border-primary/40 text-primary shadow-[0_0_15px_rgba(189,0,255,0.2)] hover:border-primary transition-all active:scale-95 cursor-pointer"
          aria-label="Abrir tocador de música"
          title="Tocar música de fundo"
        >
          <span>🎵</span>
        </button>
      ) : (
        // Extended Cassette Player
        <div className="w-56 bg-zinc-950 border border-primary/30 rounded-xl p-3.5 shadow-[0_0_25px_rgba(189,0,255,0.15)] flex flex-col relative animate-fade-in">
          {/* Close/Minimize Button */}
          <button
            onClick={() => setIsMinimized(true)}
            className="absolute top-2 right-2 text-zinc-500 hover:text-white transition-colors cursor-pointer text-xs"
            aria-label="Minimizar tocador"
          >
            ✕
          </button>

          {/* Cassette Deco Shell */}
          <div className="w-full bg-[#120f1a] border border-white/5 rounded-lg p-2 mb-3 flex flex-col items-center">
            {/* Cassette Label */}
            <div className="w-full bg-primary/10 border-b border-primary/30 text-center py-0.5 text-[8px] text-primary font-bold uppercase tracking-wider mb-2 rounded-sm truncate">
              SYNTH CASSETTE TAPE
            </div>

            {/* Reel Windows */}
            <div className="flex gap-8 justify-center items-center py-1">
              <div className={`w-6 h-6 rounded-full border border-dashed border-white/20 flex items-center justify-center ${isPlaying ? 'animate-reel-spin' : ''}`}>
                <span className="text-[7px] text-white/30">⚙️</span>
              </div>
              <div className={`w-6 h-6 rounded-full border border-dashed border-white/20 flex items-center justify-center ${isPlaying ? 'animate-reel-spin' : ''}`}>
                <span className="text-[7px] text-white/30">⚙️</span>
              </div>
            </div>
          </div>

          {/* Track metadata */}
          <div className="flex flex-col mb-3">
            <span className="text-white/80 font-bold truncate text-[9px]">{currentTrack.title}</span>
            <span className="text-zinc-500 truncate text-[8px]">{currentTrack.artist}</span>
          </div>

          {/* Audio Visualizer Bars */}
          <div className="flex gap-1 justify-center items-end h-5 mb-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-1.5 bg-primary/80 rounded-t-sm"
                style={{
                  height: isPlaying ? "auto" : "3px",
                  animation: isPlaying ? `visBar 0.6s ease-in-out infinite alternate` : "none",
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>

          {/* Volume and Actions */}
          <div className="flex items-center justify-between gap-2">
            {/* Play Button */}
            <button
              onClick={togglePlay}
              className="px-3 py-1.5 bg-primary/10 border border-primary/40 hover:bg-primary/20 text-primary font-bold rounded-md transition-all active:scale-95 cursor-pointer flex items-center gap-1"
            >
              {isPlaying ? "PAUSE" : "PLAY"}
            </button>

            {/* Skip Track Button */}
            <button
              onClick={skipTrack}
              className="px-2 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-md transition-all active:scale-95 cursor-pointer"
              title="Próxima Faixa"
            >
              NEXT ⏩
            </button>

            {/* Volume Icon + Range */}
            <div className="flex items-center gap-1.5 ml-1">
              <span className="text-zinc-500 text-[8px]">🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-12 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
