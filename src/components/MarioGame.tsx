"use client";

import React, { useState, useEffect, useRef } from "react";

// Web Audio API Synthesizer Helper
class SoundEngine {
  private ctx: AudioContext | null = null;

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playJump() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = "square";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.15);
  }

  playCollect() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Play two quick rising notes (classic coin sound)
    const playNote = (freq: number, start: number, duration: number) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);
      
      gain.gain.setValueAtTime(0.08, start);
      gain.gain.linearRampToValueAtTime(0.01, start + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(start);
      osc.stop(start + duration);
    };

    playNote(987.77, now, 0.08); // B5
    playNote(1318.51, now + 0.08, 0.15); // E6
  }

  playHit() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.25);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.25);
  }

  playGameOver() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const playNote = (freq: number, start: number, duration: number) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, start);
      
      gain.gain.setValueAtTime(0.1, start);
      gain.gain.linearRampToValueAtTime(0.01, start + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(start);
      osc.stop(start + duration);
    };

    // Sad arpeggio downwards
    playNote(523.25, now, 0.15);       // C5
    playNote(493.88, now + 0.15, 0.15); // B4
    playNote(440.00, now + 0.3, 0.15);  // A4
    playNote(329.63, now + 0.45, 0.35); // E4
  }

  playLevelUp() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const playNote = (freq: number, start: number, duration: number) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "square";
      osc.frequency.setValueAtTime(freq, start);
      
      gain.gain.setValueAtTime(0.08, start);
      gain.gain.linearRampToValueAtTime(0.01, start + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(start);
      osc.stop(start + duration);
    };

    // Ascending power-up chime
    playNote(523.25, now, 0.08); // C5
    playNote(659.25, now + 0.08, 0.08); // E5
    playNote(783.99, now + 0.16, 0.08); // G5
    playNote(1046.50, now + 0.24, 0.2); // C6
  }
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  type: "jquery" | "php" | "bug" | "cobol" | "spaghetti";
  color: string;
  speed: number;
  isAerial: boolean;
}

interface Collectible {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  color: string;
  speed: number;
  collected: boolean;
  angle: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

interface Cloud {
  x: number;
  y: number;
  width: number;
  speed: number;
}

interface BuildingWindow {
  x: number;
  y: number;
  active: boolean;
}

interface Building {
  x: number;
  width: number;
  height: number;
  speed: number;
  windows: BuildingWindow[];
}

interface Hill {
  x: number;
  width: number;
  height: number;
  speed: number;
}

export default function MarioGame() {
  const [isOpen, setIsOpen] = useState(false);
  const isCheatActive = useRef(false);
  const [gameState, setGameState] = useState<"idle" | "playing" | "paused" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [rank, setRank] = useState("Estagiário Dev");
  
  // Game customization states
  const [screenShakeActive, setScreenShakeActive] = useState(true);
  const [accessibleMode, setAccessibleMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [shakeIntensity, setShakeIntensity] = useState(0);
  
  // A11y Announcements
  const [announcement, setAnnouncement] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const soundEngineRef = useRef<SoundEngine | null>(null);
  const requestRef = useRef<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Core Game Variables (Mutable Refs for Game Loop performance)
  const gameVars = useRef({
    player: {
      x: 80,
      y: 250,
      vy: 0,
      width: 32,
      height: 48,
      normalHeight: 48,
      duckHeight: 28,
      isJumping: false,
      isDucking: false,
      shieldTime: 0, // Invincible seconds * 60
      runFrame: 0,
    },
    obstacles: [] as Obstacle[],
    collectibles: [] as Collectible[],
    particles: [] as Particle[],
    clouds: [] as Cloud[],
    buildings: [] as Building[],
    hills: [] as Hill[],
    bgScroll: 0,
    speedFactor: 1.0,
    spawnTimer: 0,
    collectibleTimer: 0,
    scoreTimer: 0,
    gameScore: 0,
    lastRank: "Estagiário Dev",
  });

  const groundY = 320;
  const canvasWidth = 800;
  const canvasHeight = 400;

  // Initialize sound engine on mount
  useEffect(() => {
    soundEngineRef.current = new SoundEngine();
    const stored = localStorage.getItem("mario-highscore");
    if (stored) setHighScore(parseInt(stored, 10));

    // Listen to custom open event
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      const open = customEvent.detail?.open;
      setIsOpen(!!open);
      if (open) {
        setGameState("idle");
        announce("Minigame Dev Mario aberto. Pressione Enter ou clique em Jogar para iniciar.");
        // Lock page scroll
        document.body.style.overflow = "hidden";
        setTimeout(() => {
          modalRef.current?.focus();
        }, 100);
      } else {
        document.body.style.overflow = "";
      }
    };

    const handleCheat = (e: Event) => {
      const customEvent = e as CustomEvent;
      isCheatActive.current = !!customEvent.detail?.active;
    };
    window.addEventListener("toggle-mario-game", handleToggle);
    window.addEventListener("konami-activated", handleCheat);
    return () => {
      window.removeEventListener("toggle-mario-game", handleToggle);
      window.removeEventListener("konami-activated", handleCheat);
      document.body.style.overflow = "";
    };
  }, []);

  const announce = (msg: string) => {
    setAnnouncement(msg);
    // Auto-clear to allow repeat announcements
    setTimeout(() => setAnnouncement(""), 2000);
  };

  // Sound triggers
  const triggerJumpSound = () => soundEnabled && soundEngineRef.current?.playJump();
  const triggerCollectSound = () => soundEnabled && soundEngineRef.current?.playCollect();
  const triggerHitSound = () => soundEnabled && soundEngineRef.current?.playHit();
  const triggerGameOverSound = () => soundEnabled && soundEngineRef.current?.playGameOver();
  const triggerLevelUpSound = () => soundEnabled && soundEngineRef.current?.playLevelUp();

  // Reset Game variables for a new run
  const resetGame = () => {
    const vars = gameVars.current;
    vars.player.y = groundY - vars.player.normalHeight;
    vars.player.vy = 0;
    vars.player.isJumping = false;
    vars.player.isDucking = false;
    vars.player.shieldTime = 0;
    vars.obstacles = [];
    vars.collectibles = [];
    vars.particles = [];
    vars.bgScroll = 0;
    vars.speedFactor = 1.0;
    vars.spawnTimer = 80;
    vars.collectibleTimer = 120;
    vars.scoreTimer = 0;
    vars.gameScore = 0;
    vars.lastRank = "Estagiário Dev";
    setScore(0);
    setRank("Estagiário Dev");

    // Initialize clouds
    vars.clouds = [];
    for (let i = 0; i < 4; i++) {
      vars.clouds.push({
        x: Math.random() * canvasWidth,
        y: 20 + Math.random() * 60,
        width: 45 + Math.random() * 35,
        speed: 0.15 + Math.random() * 0.2,
      });
    }

    // Initialize buildings (background layer)
    vars.buildings = [];
    let curX = 0;
    while (curX < canvasWidth + 250) {
      const bWidth = 60 + Math.random() * 65;
      const bHeight = 110 + Math.random() * 95;
      const windows: BuildingWindow[] = [];
      const rows = Math.floor(bHeight / 16);
      const cols = Math.floor(bWidth / 12);
      for (let r = 2; r < rows - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
          windows.push({
            x: c * 12,
            y: r * 16,
            active: Math.random() < 0.25
          });
        }
      }
      vars.buildings.push({
        x: curX,
        width: bWidth,
        height: bHeight,
        speed: 0.35,
        windows
      });
      curX += bWidth + 15 + Math.random() * 35;
    }

    // Initialize hills (midground layer)
    vars.hills = [];
    let curHillX = 0;
    while (curHillX < canvasWidth + 250) {
      const hWidth = 90 + Math.random() * 80;
      const hHeight = 30 + Math.random() * 25;
      vars.hills.push({
        x: curHillX,
        width: hWidth,
        height: hHeight,
        speed: 0.8
      });
      curHillX += hWidth - 15;
    }
  };

  // Keyboard Event Handlers
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;
    
    // Prevent default scrolling for game controls
    if (["Space", "ArrowUp", "ArrowDown", " "].includes(e.key) && gameState === "playing") {
      e.preventDefault();
    }

    if (e.key === "Escape") {
      closeModal();
      return;
    }

    if (gameState === "idle" && (e.key === "Enter" || e.key === " ")) {
      startGame();
      return;
    }

    if (gameState === "gameover" && (e.key === "Enter" || e.key === " ")) {
      startGame();
      return;
    }

    if (gameState === "playing") {
      const allowJump = !gameVars.current.player.isJumping || isCheatActive.current;
      if ((e.key === "ArrowUp" || e.key === " " || e.key === "Space") && allowJump && !gameVars.current.player.isDucking) {
        gameVars.current.player.vy = -12.5;
        gameVars.current.player.isJumping = true;
        triggerJumpSound();
      }
      if (e.key === "ArrowDown" && !gameVars.current.player.isJumping) {
        gameVars.current.player.isDucking = true;
        gameVars.current.player.height = gameVars.current.player.duckHeight;
      }
      if (e.key.toLowerCase() === "p") {
        pauseGame();
      }
    } else if (gameState === "paused" && e.key.toLowerCase() === "p") {
      resumeGame();
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (gameState === "playing") {
      if (e.key === "ArrowDown") {
        gameVars.current.player.isDucking = false;
        gameVars.current.player.height = gameVars.current.player.normalHeight;
      }
    }
  };

  // Bind keyboard events
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isOpen, gameState, soundEnabled]);

  const startGame = () => {
    soundEngineRef.current?.init();
    resetGame();
    setGameState("playing");
    announce("Jogo iniciado! Use Espaço ou Seta para Cima para pular, Seta para Baixo para agachar. Fuja dos bugs e pegue os logos!");
  };

  const pauseGame = () => {
    setGameState("paused");
    announce("Jogo pausado. Pressione P para continuar.");
  };

  const resumeGame = () => {
    setGameState("playing");
    announce("Jogo retomado.");
  };

  const closeModal = () => {
    setIsOpen(false);
    setGameState("idle");
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    document.body.style.overflow = "";
  };

  // Spawn obstacles
  const spawnObstacle = () => {
    const vars = gameVars.current;
    const speed = 5.5 * vars.speedFactor;
    
    // 30% chance for aerial, 70% ground
    const isAerial = Math.random() < 0.3;
    
    const types: Obstacle["type"][] = ["jquery", "php", "bug", "cobol", "spaghetti"];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let label = "BUG";
    let color = "#ef4444"; // default red
    let height = 36;
    let width = 45;

    switch (type) {
      case "jquery":
        label = "jQuery Legacy";
        color = "#38bdf8"; // cyan-blue
        width = 75;
        height = 30;
        break;
      case "php":
        label = "PHP 5.3";
        color = "#818cf8"; // indigo-purple
        width = 50;
        height = 30;
        break;
      case "bug":
        label = "NullPointer";
        color = "#f87171"; // light red
        width = 65;
        height = 25;
        break;
      case "cobol":
        label = "COBOL Mainframe";
        color = "#fb7185"; // pink
        width = 90;
        height = 35;
        break;
      case "spaghetti":
        label = "Spaghetti Code";
        color = "#f59e0b"; // amber
        width = 80;
        height = 28;
        break;
    }

    const y = isAerial ? groundY - 60 - height : groundY - height;

    vars.obstacles.push({
      x: canvasWidth + 50,
      y,
      width,
      height,
      label,
      type,
      color,
      speed,
      isAerial
    });
  };

  // Spawn Collectible tech logos
  const spawnCollectible = () => {
    const vars = gameVars.current;
    const speed = 4.5 * vars.speedFactor;
    
    const techs = [
      { label: "React", color: "#61dafb" },
      { label: "Next.js", color: "#ffffff" },
      { label: "TypeScript", color: "#3178c6" },
      { label: "Node.js", color: "#339933" },
      { label: "Tailwind", color: "#38bdf8" }
    ];
    
    const tech = techs[Math.floor(Math.random() * techs.length)];
    // Spawn floating at jump height
    const y = groundY - 60 - Math.random() * 60;

    vars.collectibles.push({
      x: canvasWidth + 50,
      y,
      width: 35,
      height: 35,
      label: tech.label,
      color: tech.color,
      speed,
      collected: false,
      angle: 0
    });
  };

  // Add explosion particles
  const spawnParticles = (x: number, y: number, color: string, count = 12) => {
    const vars = gameVars.current;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3.5;
      vars.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: 2 + Math.random() * 4,
        color,
        alpha: 1,
        life: 30 + Math.random() * 30
      });
    }
  };

  // Main game update & draw loop
  const gameLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const vars = gameVars.current;

    // Handle screen shake decay
    if (shakeIntensity > 0) {
      setShakeIntensity(prev => Math.max(0, prev - 0.2));
    }

    // Save context for screen shake
    ctx.save();
    if (screenShakeActive && shakeIntensity > 0) {
      const dx = (Math.random() - 0.5) * shakeIntensity;
      const dy = (Math.random() - 0.5) * shakeIntensity;
      ctx.translate(dx, dy);
    }

    // 1. Draw Background (Cyberpunk digital grid / scanlines)
    ctx.fillStyle = "#0c0a0f"; // ultra dark violet
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Update and Draw Clouds
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.lineWidth = 1;
    for (let i = 0; i < vars.clouds.length; i++) {
      const c = vars.clouds[i];
      if (gameState === "playing") {
        c.x -= c.speed * vars.speedFactor;
      }
      ctx.beginPath();
      const r = c.width / 4;
      ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
      ctx.arc(c.x + r, c.y - r * 0.3, r * 1.2, 0, Math.PI * 2);
      ctx.arc(c.x + r * 2, c.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      if (c.x + c.width * 2 < 0) {
        c.x = canvasWidth + 50;
        c.y = 20 + Math.random() * 60;
        c.width = 45 + Math.random() * 35;
        c.speed = 0.15 + Math.random() * 0.2;
      }
    }

    // Update and Draw Buildings (Far layer)
    ctx.fillStyle = "rgba(20, 16, 28, 0.65)";
    ctx.strokeStyle = "rgba(189, 0, 255, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i < vars.buildings.length; i++) {
      const b = vars.buildings[i];
      if (gameState === "playing") {
        b.x -= b.speed * vars.speedFactor;
      }
      ctx.fillRect(b.x, groundY - b.height, b.width, b.height);
      ctx.strokeRect(b.x, groundY - b.height, b.width, b.height);

      ctx.fillStyle = "rgba(0, 243, 255, 0.22)";
      b.windows.forEach(w => {
        if (w.active) {
          ctx.fillRect(b.x + w.x, groundY - b.height + w.y, 4, 6);
        }
      });

      if (b.x + b.width < 0) {
        let maxX = 0;
        vars.buildings.forEach(other => { maxX = Math.max(maxX, other.x + other.width); });
        b.x = maxX + 15 + Math.random() * 35;
      }
    }

    // Update and Draw Hills (Midground layer)
    ctx.fillStyle = "rgba(14, 11, 18, 0.85)";
    ctx.strokeStyle = "rgba(0, 255, 102, 0.08)";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < vars.hills.length; i++) {
      const h = vars.hills[i];
      if (gameState === "playing") {
        h.x -= h.speed * vars.speedFactor;
      }
      ctx.beginPath();
      ctx.moveTo(h.x, groundY);
      ctx.quadraticCurveTo(h.x + h.width / 2, groundY - h.height * 1.8, h.x + h.width, groundY);
      ctx.fill();
      ctx.stroke();

      if (h.x + h.width < 0) {
        let maxX = 0;
        vars.hills.forEach(other => { maxX = Math.max(maxX, other.x + other.width); });
        h.x = maxX - 15;
      }
    }

    // Draw tech background grid (scrolling)
    ctx.strokeStyle = "rgba(189, 0, 255, 0.05)"; // purple glow
    ctx.lineWidth = 1;
    vars.bgScroll = (vars.bgScroll - 1.5 * vars.speedFactor) % 40;
    
    // Vertical grid lines
    for (let x = vars.bgScroll; x < canvasWidth; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, groundY);
      ctx.stroke();
    }
    // Horizontal grid lines
    for (let y = 0; y < groundY; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
      ctx.stroke();
    }

    // Draw Ground
    ctx.fillStyle = "#1e1b29"; // deep container dark
    ctx.fillRect(0, groundY, canvasWidth, canvasHeight - groundY);
    ctx.strokeStyle = "var(--color-primary, #bd00ff)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(canvasWidth, groundY);
    ctx.stroke();

    // Draw binary code patterns on the ground
    ctx.fillStyle = "rgba(189, 0, 255, 0.15)";
    ctx.font = "8px monospace";
    for (let i = 0; i < canvasWidth; i += 60) {
      const text = ((i + Math.floor(Math.abs(vars.bgScroll) * 0.5)) % 3 === 0) ? "0110" : "1001";
      ctx.fillText(text, i + (vars.bgScroll % 60), groundY + 25);
    }

    if (gameState === "playing") {
      // 2. Physics & Logic Updates
      vars.scoreTimer++;
      if (vars.scoreTimer % 6 === 0) { // every ~0.1s
        vars.gameScore += 1;
        setScore(vars.gameScore);
        
        // Dynamic Difficulty Speedup
        if (vars.gameScore > 0 && vars.gameScore % 500 === 0 && vars.speedFactor < 2.5) {
          vars.speedFactor += 0.15;
          spawnParticles(canvasWidth - 50, 50, "#00ff66", 20);
          triggerLevelUpSound();
          announce("Velocidade aumentada! Stack compilando mais rápido!");
        }

        // Update rank based on score
        let newRank = "Estagiário Dev";
        if (vars.gameScore >= 5000) newRank = "CTO (Code Overlord)";
        else if (vars.gameScore >= 3500) newRank = "Tech Lead";
        else if (vars.gameScore >= 2000) newRank = "Sênior Dev";
        else if (vars.gameScore >= 1000) newRank = "Pleno Dev";
        else if (vars.gameScore >= 400) newRank = "Junior Dev";

        if (newRank !== vars.lastRank) {
          vars.lastRank = newRank;
          setRank(newRank);
          triggerLevelUpSound();
          spawnParticles(vars.player.x + vars.player.width / 2, vars.player.y, "var(--color-primary, #bd00ff)", 25);
          announce(`Parabéns! Você foi promovido para ${newRank}!`);
        }
      }

      // Update Player Y position & Gravity
      const p = vars.player;
      p.y += p.vy;
      p.vy += 0.55; // gravity force

      const currentGroundY = groundY - p.height;
      if (p.y >= currentGroundY) {
        p.y = currentGroundY;
        p.vy = 0;
        p.isJumping = false;
      }

      // Frame counters for running animation
      if (!p.isJumping) {
        p.runFrame = (p.runFrame + 0.15 * vars.speedFactor) % 4;
      }

      if (p.shieldTime > 0) {
        p.shieldTime--;
      }

      // Spawn elements
      vars.spawnTimer--;
      if (vars.spawnTimer <= 0) {
        spawnObstacle();
        vars.spawnTimer = 90 + Math.random() * 80 - (vars.speedFactor * 15);
      }

      vars.collectibleTimer--;
      if (vars.collectibleTimer <= 0) {
        spawnCollectible();
        vars.collectibleTimer = 150 + Math.random() * 120;
      }
    }

    // 3. Update & Draw Collectibles
    for (let i = vars.collectibles.length - 1; i >= 0; i--) {
      const c = vars.collectibles[i];
      if (gameState === "playing") {
        c.x -= c.speed;
        c.angle += 0.05; // spinning animation
      }

      if (!c.collected) {
        // Draw spinning modern logo coin
        ctx.save();
        ctx.translate(c.x + c.width / 2, c.y + c.height / 2);
        ctx.rotate(c.angle);
        
        // Outer glowing circle
        ctx.shadowBlur = accessibleMode ? 0 : 12;
        ctx.shadowColor = c.color;
        ctx.strokeStyle = c.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, c.width / 2, 0, Math.PI * 2);
        ctx.stroke();

        // Inner symbol/text
        ctx.fillStyle = c.color;
        ctx.font = "bold 9px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(c.label.substring(0, 4), 0, 0);
        ctx.restore();

        // AABB Collision with player
        const p = vars.player;
        if (
          p.x < c.x + c.width &&
          p.x + p.width > c.x &&
          p.y < c.y + c.height &&
          p.y + p.height > c.y
        ) {
          // Collected!
          c.collected = true;
          vars.gameScore += 100;
          setScore(vars.gameScore);
          triggerCollectSound();
          spawnParticles(c.x + c.width / 2, c.y + c.height / 2, c.color, 15);
          
          // Shield Power-up if it's React or Next.js
          if (c.label === "React" || c.label === "Next.js") {
            p.shieldTime = 180; // 3 seconds of shield
            announce(`Pegou ${c.label}! Ganhou +100 XP e Escudo de Proteção.`);
          } else {
            announce(`Pegou ${c.label}! Ganhou +100 XP.`);
          }
        }
      }

      // Remove off-screen items
      if (c.x < -100) {
        vars.collectibles.splice(i, 1);
      }
    }

    // 4. Update & Draw Obstacles
    for (let i = vars.obstacles.length - 1; i >= 0; i--) {
      const o = vars.obstacles[i];
      if (gameState === "playing") {
        o.x -= o.speed;
      }

      // Draw obstacle card
      ctx.save();
      ctx.shadowBlur = accessibleMode ? 0 : 10;
      ctx.shadowColor = o.color;
      ctx.fillStyle = "#161320";
      ctx.strokeStyle = o.color;
      ctx.lineWidth = 1.5;
      
      // Rounded card background
      ctx.beginPath();
      ctx.roundRect(o.x, o.y, o.width, o.height, 4);
      ctx.fill();
      ctx.stroke();

      // Card Label
      ctx.fillStyle = o.color;
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(o.label, o.x + o.width / 2, o.y + o.height / 2);
      ctx.restore();

      // AABB Collision with player
      const p = vars.player;
      if (
        gameState === "playing" &&
        p.x < o.x + o.width - 5 &&
        p.x + p.width > o.x + 5 &&
        p.y < o.y + o.height &&
        p.y + p.height > o.y
      ) {
        if (p.shieldTime > 0) {
          // Block collision with shield
          p.shieldTime = 0; // consume shield
          vars.obstacles.splice(i, 1);
          triggerHitSound();
          setShakeIntensity(8);
          spawnParticles(o.x + o.width / 2, o.y + o.height / 2, "#ef4444", 20);
          announce("Escudo quebrado! Código ruim bloqueado.");
          continue;
        } else {
          // Game Over!
          setGameState("gameover");
          triggerHitSound();
          triggerGameOverSound();
          setShakeIntensity(15);
          spawnParticles(p.x + p.width / 2, p.y + p.height / 2, "#ef4444", 30);
          
          // Save high score
          if (vars.gameScore > highScore) {
            setHighScore(vars.gameScore);
            localStorage.setItem("mario-highscore", vars.gameScore.toString());
          }
          announce(`Erro fatal! Compilação falhou no obstáculo ${o.label}. Pontuação: ${vars.gameScore} XP. Pressione Espaço para reiniciar.`);
        }
      }

      // Remove off-screen obstacles
      if (o.x < -150) {
        vars.obstacles.splice(i, 1);
      }
    }

    // 5. Update & Draw Particles
    for (let i = vars.particles.length - 1; i >= 0; i--) {
      const part = vars.particles[i];
      if (gameState === "playing") {
        part.x += part.vx;
        part.y += part.vy;
        part.vy += 0.05; // tiny gravity
        part.alpha = Math.max(0, part.alpha - 0.02);
        part.life--;
      }

      ctx.save();
      ctx.globalAlpha = part.alpha;
      ctx.fillStyle = part.color;
      ctx.beginPath();
      ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (part.life <= 0 || part.alpha <= 0) {
        vars.particles.splice(i, 1);
      }
    }

    // 6. Draw Player (Developer "Joao Victor" Avatar / Stylized Retro Character)
    const p = gameVars.current.player;
    ctx.save();
    
    // Draw Shield overlay if active (glowing neon circle)
    if (p.shieldTime > 0) {
      ctx.shadowBlur = accessibleMode ? 0 : 15;
      ctx.shadowColor = "#00ff66";
      ctx.strokeStyle = "rgba(0, 255, 102, 0.6)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(p.x + p.width / 2, p.y + p.height / 2, Math.max(p.width, p.height) * 0.7, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Glowing developer body (Vector Pixel styling)
    ctx.shadowBlur = accessibleMode ? 0 : 12;
    ctx.shadowColor = "var(--color-primary, #bd00ff)";
    
    const primaryColor = gameState === "gameover" ? "#3f3f46" : "var(--color-primary, #bd00ff)";
    const overallColor = "#161320"; // Dark overall tone matching portfolio
    const skinColor = "#ffcca3"; // Peach skin color
    const hairColor = "#1a1625"; // Dark hair/mustache
    const buttonColor = "#00f3ff"; // Glowing cyan overall buttons
    const gloveColor = "#ffffff";
    const shoeColor = "#0c0a0f";

    const px = p.x;
    const py = p.y;
    const pw = p.width;
    const ph = p.height;
    
    if (p.isDucking) {
      // DUCKING MARIO (Squished)
      // Cap
      ctx.fillStyle = primaryColor;
      ctx.fillRect(px + 4, py + 2, pw - 6, 8); // main cap
      ctx.fillRect(px + pw - 6, py + 6, 6, 4); // visor
      
      // Face
      ctx.fillStyle = skinColor;
      ctx.fillRect(px + 8, py + 10, pw - 12, 10);
      
      // Nose & Mustache
      ctx.fillRect(px + pw - 8, py + 12, 6, 5); // nose
      ctx.fillStyle = hairColor;
      ctx.fillRect(px + pw - 10, py + 16, 8, 4); // mustache
      
      // Cap Logo (V)
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(px + 12, py + 6, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = primaryColor;
      ctx.font = "bold 5px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("V", px + 12, py + 6);
      
      // Overalls & Shirt (Squished)
      ctx.fillStyle = primaryColor;
      ctx.fillRect(px + 4, py + 20, pw - 8, 8); // shirt
      ctx.fillStyle = overallColor;
      ctx.fillRect(px + 6, py + 22, pw - 12, 6); // overalls
      
      // Buttons
      ctx.fillStyle = buttonColor;
      ctx.fillRect(px + 9, py + 24, 2, 2);
      ctx.fillRect(px + 17, py + 24, 2, 2);
      
      // Shoes
      ctx.fillStyle = shoeColor;
      ctx.fillRect(px + 4, py + 26, 8, ph - 26);
      ctx.fillRect(px + pw - 12, py + 26, 8, ph - 26);
    } else {
      // NORMAL RUNNING OR JUMPING MARIO
      // Cap
      ctx.fillStyle = primaryColor;
      ctx.fillRect(px + 6, py + 2, pw - 12, 8); // main cap
      ctx.fillRect(px + pw - 8, py + 6, 8, 4); // cap visor
      
      // Cap Logo (V)
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(px + 16, py + 6, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = primaryColor;
      ctx.font = "bold 5px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("V", px + 16, py + 6);

      // Face
      ctx.fillStyle = skinColor;
      ctx.fillRect(px + 8, py + 10, pw - 14, 10); // face
      // Nose
      ctx.fillRect(px + pw - 8, py + 12, 6, 5);
      
      // Hair
      ctx.fillStyle = hairColor;
      ctx.fillRect(px + 6, py + 10, 4, 8); // back hair
      
      // Mustache
      if (gameState !== "gameover") {
        ctx.fillStyle = hairColor;
        ctx.fillRect(px + pw - 10, py + 16, 8, 4); // mustache
      } else {
        // Dead face details
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(px + 12, py + 16, 8, 2); // sad mouth
      }

      // Shirt (Chest area)
      ctx.fillStyle = primaryColor;
      ctx.fillRect(px + 6, py + 20, pw - 12, 12);

      // Overalls
      ctx.fillStyle = overallColor;
      ctx.fillRect(px + 8, py + 24, pw - 16, 14); // body overalls
      ctx.fillRect(px + 8, py + 20, 4, 4); // left strap
      ctx.fillRect(px + pw - 12, py + 20, 4, 4); // right strap
      
      // Buttons
      ctx.fillStyle = buttonColor;
      ctx.fillRect(px + 9, py + 25, 2.5, 2.5);
      ctx.fillRect(px + pw - 11, py + 25, 2.5, 2.5);

      // Arms and Hands
      ctx.fillStyle = primaryColor;
      if (p.isJumping) {
        // Classic jump pose: one arm straight up, one down
        // Left arm up
        ctx.fillRect(px + 2, py + 12, 4, 10);
        ctx.fillStyle = gloveColor;
        ctx.fillRect(px + 2, py + 9, 4, 4); // left glove up
        
        // Right arm down
        ctx.fillStyle = primaryColor;
        ctx.fillRect(px + pw - 6, py + 24, 4, 8);
        ctx.fillStyle = gloveColor;
        ctx.fillRect(px + pw - 6, py + 32, 4, 4); // right glove down
      } else {
        // Running arms swing
        const armOffset = Math.sin(p.runFrame) * 4;
        // Left arm
        ctx.fillRect(px + 2, py + 22 + armOffset, 4, 8);
        ctx.fillStyle = gloveColor;
        ctx.fillRect(px + 2, py + 29 + armOffset, 4, 4);
        
        // Right arm
        ctx.fillStyle = primaryColor;
        ctx.fillRect(px + pw - 6, py + 22 - armOffset, 4, 8);
        ctx.fillStyle = gloveColor;
        ctx.fillRect(px + pw - 6, py + 29 - armOffset, 4, 4);
      }

      // Legs / Feet
      ctx.fillStyle = overallColor;
      if (p.isJumping) {
        // Bent legs
        ctx.fillStyle = shoeColor;
        ctx.fillRect(px + 4, py + 38, 8, 4);
        ctx.fillRect(px + pw - 12, py + 38, 8, 4);
      } else {
        // Running legs
        const legOffset = Math.sin(p.runFrame) * 5;
        // Left leg
        ctx.fillRect(px + 6, py + 38, 5, 6 + legOffset);
        // Right leg
        ctx.fillRect(px + pw - 11, py + 38, 5, 6 - legOffset);
        
        // Shoes
        ctx.fillStyle = shoeColor;
        ctx.fillRect(px + 4, py + 44 + legOffset, 7, 4);
        ctx.fillRect(px + pw - 11, py + 44 - legOffset, 7, 4);
      }
    }

    ctx.restore();
    ctx.restore(); // restore screen shake

    // Request next frame
    if (gameState === "playing" || gameState === "paused" || gameState === "gameover" || gameState === "idle") {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
  };

  // Trigger game loop when state shifts
  useEffect(() => {
    if (isOpen) {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isOpen, gameState, screenShakeActive, accessibleMode, soundEnabled, shakeIntensity]);

  // Touch virtual buttons
  const triggerMobileJump = () => {
    const allowJump = !gameVars.current.player.isJumping || isCheatActive.current;
    if (gameState === "playing" && allowJump && !gameVars.current.player.isDucking) {
      gameVars.current.player.vy = -12.5;
      gameVars.current.player.isJumping = true;
      triggerJumpSound();
    }
  };

  const triggerMobileDuckStart = () => {
    if (gameState === "playing" && !gameVars.current.player.isJumping) {
      gameVars.current.player.isDucking = true;
      gameVars.current.player.height = gameVars.current.player.duckHeight;
    }
  };

  const triggerMobileDuckEnd = () => {
    if (gameState === "playing") {
      gameVars.current.player.isDucking = false;
      gameVars.current.player.height = gameVars.current.player.normalHeight;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-title"
      tabIndex={-1}
    >
      {/* Invisible screen reader announcer */}
      <div className="sr-only" aria-live="assertive">
        {announcement}
      </div>

      <div className="relative w-full max-w-3xl bg-zinc-950 border border-purple-500/30 rounded-2xl p-4 md:p-6 shadow-[0_0_50px_rgba(189,0,255,0.15)] flex flex-col items-center">
        {/* Neon Cabinet Header */}
        <div className="w-full flex items-center justify-between mb-4 border-b border-purple-500/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-black tracking-tight text-white italic">
              DEV<span className="text-purple-500">MARIO</span> ARCADE
            </span>
            <span className="bg-purple-950/80 border border-purple-500/50 text-[10px] text-purple-400 font-mono px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
              v1.0
            </span>
          </div>

          {/* Quick Settings Panel */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(prev => !prev)}
              className="text-zinc-400 hover:text-white p-1 rounded-md transition-colors"
              aria-label={soundEnabled ? "Desativar Sons" : "Ativar Sons"}
              title={soundEnabled ? "Mudar para Mudo" : "Mudar para Ativar Sons"}
            >
              {soundEnabled ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zm10.707-8.293a1 1 0 010 1.414L13.414 11l2.879 2.879a1 1 0 11-1.414 1.414L12 12.414l-2.879 2.879a1 1 0 11-1.414-1.414L10.586 11 7.707 8.121a1 1 0 111.414-1.414L12 9.586l2.879-2.879a1 1 0 011.414 0z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setScreenShakeActive(prev => !prev)}
              className={`p-1 rounded-md text-[10px] font-mono border transition-all ${
                screenShakeActive
                  ? "border-purple-500/50 text-purple-400 bg-purple-950/20"
                  : "border-zinc-800 text-zinc-500 bg-transparent"
              }`}
              aria-label="Alternar tremor de tela"
              title="Alternar vibração de tela ao sofrer colisões"
            >
              SHAKE: {screenShakeActive ? "ON" : "OFF"}
            </button>
            <button
              onClick={() => setAccessibleMode(prev => !prev)}
              className={`p-1 rounded-md text-[10px] font-mono border transition-all ${
                accessibleMode
                  ? "border-purple-500/50 text-purple-400 bg-purple-950/20"
                  : "border-zinc-800 text-zinc-500 bg-transparent"
              }`}
              aria-label="Alternar modo de alto contraste sem brilhos neon"
              title="Remove efeitos de glow neon para melhor legibilidade"
            >
              GLOW: {accessibleMode ? "OFF" : "ON"}
            </button>
            <button
              onClick={closeModal}
              className="text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 p-1.5 rounded-lg transition-all"
              aria-label="Fechar minigame"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Score & Rank Bar */}
        <div className="w-full flex items-center justify-between px-3 py-2 bg-zinc-900/60 border border-zinc-800/80 rounded-xl mb-4 text-xs md:text-sm font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500">CARGO:</span>
            <span className="text-purple-400 font-bold">{rank}</span>
          </div>
          <div className="flex gap-4">
            <div>
              <span className="text-zinc-500">HI-SCORE:</span>{" "}
              <span className="text-zinc-300 font-bold">{highScore} XP</span>
            </div>
            <div>
              <span className="text-zinc-500">SCORE:</span>{" "}
              <span className="text-green-400 font-bold">{score} XP</span>
            </div>
          </div>
        </div>

        {/* Game Canvas Container */}
        <div className="relative w-full aspect-[2/1] bg-black border border-purple-500/20 rounded-xl overflow-hidden shadow-2xl">
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className="w-full h-full block"
            aria-label="Tela do Jogo Dev Mario. O jogador corre da esquerda para a direita desviando de caixas de código."
          />

          {/* Idle / Start Overlay */}
          {gameState === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 p-6 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-3xl mb-4 animate-bounce">
                🎮
              </div>
              <h2 id="game-title" className="text-2xl md:text-3xl font-black text-white italic tracking-tight mb-2">
                DEV<span className="text-purple-500">MARIO</span> RUNNER
              </h2>
              <p className="text-zinc-400 text-xs md:text-sm max-w-md mb-6 leading-relaxed">
                Você é João Victor! Salte por cima dos frameworks legados e bugs para compilar seu portfólio. Pegue logos de React e Next.js para ganhar escudo.
              </p>
              <button
                onClick={startGame}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 transition-all font-mono text-sm"
              >
                JOGAR (ENTER)
              </button>
            </div>
          )}

          {/* Game Over Overlay */}
          {gameState === "gameover" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 p-6 text-center animate-fade-in">
              <div className="text-3xl mb-3">💥</div>
              <h2 className="text-xl md:text-2xl font-black text-red-500 font-mono tracking-tight mb-2">
                STACK OVERFLOW!
              </h2>
              <p className="text-zinc-400 text-xs md:text-sm max-w-md mb-2 font-mono">
                Compilação quebrada por um bug legado.
              </p>
              <div className="bg-red-950/20 border border-red-500/20 rounded-xl px-4 py-2.5 mb-6 text-[10px] md:text-xs text-red-400 font-mono max-w-sm">
                Pontuação final: <span className="font-bold text-white">{score} XP</span> como <span className="font-bold text-white">{rank}</span>.
              </div>
              <div className="flex gap-3">
                <button
                  onClick={startGame}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 transition-all font-mono text-xs"
                >
                  RECOMPILAR (ENTER)
                </button>
                <button
                  onClick={closeModal}
                  className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold rounded-xl transition-all font-mono text-xs"
                >
                  SAIR
                </button>
              </div>
            </div>
          )}

          {/* Paused Overlay */}
          {gameState === "paused" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 animate-fade-in">
              <h2 className="text-2xl font-bold text-white font-mono tracking-wide mb-6">
                COMPILAÇÃO PAUSADA
              </h2>
              <button
                onClick={resumeGame}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl font-mono text-sm transition-all shadow-lg shadow-purple-600/30"
              >
                CONTINUAR (P)
              </button>
            </div>
          )}
        </div>

        {/* Mobile controls & Desktop instructions */}
        <div className="w-full mt-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-purple-500/10 pt-4">
          {/* Instructions (Desktop) */}
          <div className="hidden md:flex flex-col gap-1.5 text-left text-zinc-500 font-mono text-[10px] leading-relaxed">
            <div>
              <span className="text-purple-500">PULO:</span> Pressione <kbd className="bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded text-zinc-300 font-bold text-[9px]">Espaço</kbd> ou <kbd className="bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded text-zinc-300 font-bold text-[9px]">Seta Cima</kbd>
            </div>
            <div>
              <span className="text-purple-500">AGACHAMENTO:</span> Pressione <kbd className="bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded text-zinc-300 font-bold text-[9px]">Seta Baixo</kbd>
            </div>
            <div>
              <span className="text-purple-500">PAUSA:</span> Pressione <kbd className="bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded text-zinc-300 font-bold text-[9px]">P</kbd>
            </div>
          </div>

          {/* Touch Virtual Gamepad (Mobile) */}
          <div className="flex w-full md:w-auto justify-center items-center gap-4">
            <button
              onTouchStart={triggerMobileDuckStart}
              onTouchEnd={triggerMobileDuckEnd}
              onMouseDown={triggerMobileDuckStart}
              onMouseUp={triggerMobileDuckEnd}
              onMouseLeave={triggerMobileDuckEnd}
              className="flex-1 md:flex-none px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 text-zinc-300 border border-zinc-800 rounded-xl transition-all font-mono font-bold text-xs select-none active:scale-95"
              aria-label="Botão de Agachar"
            >
              AGACHA (⬇️)
            </button>
            <button
              onTouchStart={triggerMobileJump}
              onMouseDown={triggerMobileJump}
              className="flex-1 md:flex-none px-8 py-3.5 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white rounded-xl transition-all font-mono font-bold text-xs select-none active:scale-95 shadow-md shadow-purple-600/20"
              aria-label="Botão de Pular"
            >
              PULA (⬆️)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
