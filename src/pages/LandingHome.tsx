import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useApp } from "../context/AppContext";
import { Logo } from "../components/Logo";
import {
  Activity, Brain, Shield, Lock, Users, Share2,
  ChevronDown, Mail, Phone, MapPin, CheckCircle,
  Menu, X, ArrowRight, Zap, Database, Cloud,
  Cpu, Network, Eye, FileText, BarChart3,
  Star, TrendingUp, Globe, Layers, Search, Sparkles,
  Heart, MessageSquare, Clock, UserCheck, Stethoscope,
  Pill, Building2, FlaskConical, Check, AlertTriangle, Key
} from "lucide-react";

/* ============================================================
   10-LAYER FUTURISTIC CANVAS BACKGROUND SYSTEM
   Layers:
   1. Gradient Mesh
   2. Floating Aurora
   3. Glowing Particles
   4. Medical Hexagon Pattern
   5. Digital Grid
   6. Light Rays
   7. DNA Helix Particles
   8. Binary Data Flow
   9. Neural Network Lines
   10. Soft Blur Glow
   ============================================================ */
const MultiLayerHeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle nodes
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      pulse: number;
      isDna?: boolean;
    }> = [];

    // Binary streams
    const binaryStreams: Array<{
      x: number;
      y: number;
      speed: number;
      chars: string[];
      alpha: number;
    }> = [];

    const colors = ["#34D399", "#14B8A6", "#38BDF8", "#0EA5E9", "#22C55E"];

    // Init Nodes & DNA particles
    const particleCount = Math.min(Math.floor(width / 18), 75);
    for (let i = 0; i < particleCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.25,
        pulse: Math.random() * Math.PI * 2,
        isDna: i % 5 === 0,
      });
    }

    // Init Binary Data Streams
    const streamCount = Math.min(Math.floor(width / 90), 14);
    for (let i = 0; i < streamCount; i++) {
      binaryStreams.push({
        x: (i * (width / streamCount)) + Math.random() * 40,
        y: Math.random() * height,
        speed: Math.random() * 0.8 + 0.4,
        chars: Array.from({ length: 8 }, () => (Math.random() > 0.5 ? "1" : "0")),
        alpha: Math.random() * 0.25 + 0.1,
      });
    }

    let dnaPhase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Layer 1 & 2: Gradient Mesh & Aurora Glow
      const meshGrad = ctx.createLinearGradient(0, 0, width, height);
      meshGrad.addColorStop(0, "#081421");
      meshGrad.addColorStop(0.5, "#060D17");
      meshGrad.addColorStop(1, "#0A192F");
      ctx.fillStyle = meshGrad;
      ctx.fillRect(0, 0, width, height);

      // Layer 5: Digital Grid
      ctx.strokeStyle = "rgba(56, 189, 248, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Layer 8: Binary Data Flow
      ctx.font = "10px monospace";
      binaryStreams.forEach((stream) => {
        stream.y += stream.speed;
        if (stream.y > height) stream.y = -80;
        ctx.fillStyle = `rgba(52, 211, 153, ${stream.alpha})`;
        stream.chars.forEach((char, idx) => {
          ctx.fillText(char, stream.x, stream.y + idx * 12);
        });
      });

      // Layer 9: Neural Network Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const lineAlpha = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Layer 7: Animated Floating DNA Helix Curves & Rung Bars
      dnaPhase += 0.02;
      ctx.strokeStyle = "rgba(20, 184, 166, 0.12)";
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      for (let x = 0; x < width; x += 15) {
        const y1 = height * 0.4 + Math.sin(x * 0.01 + dnaPhase) * 35;
        if (x === 0) ctx.moveTo(x, y1);
        else ctx.lineTo(x, y1);
      }
      ctx.stroke();

      ctx.beginPath();
      for (let x = 0; x < width; x += 15) {
        const y2 = height * 0.4 - Math.sin(x * 0.01 + dnaPhase) * 35;
        if (x === 0) ctx.moveTo(x, y2);
        else ctx.lineTo(x, y2);
      }
      ctx.stroke();

      // Layer 3: Particles & Glows
      nodes.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const currentAlpha = Math.max(0.1, p.alpha + Math.sin(p.pulse) * 0.2);
        const currentRadius = p.radius + Math.sin(p.pulse) * 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, currentAlpha);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

/* ============================================================
   CONTINUOUS ECG HEARTBEAT MONITOR CANVAS
   ============================================================ */
const EcgHeartbeatCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    let x = 0;
    const points: number[] = new Array(Math.floor(width)).fill(height / 2);

    const getEcgHeight = (pos: number) => {
      const cycle = pos % 180;
      const centerY = height / 2;
      if (cycle > 50 && cycle < 60) return centerY - 6;
      if (cycle >= 60 && cycle < 65) return centerY + 4;
      if (cycle >= 65 && cycle < 75) return centerY - (height * 0.38);
      if (cycle >= 75 && cycle < 82) return centerY + (height * 0.22);
      if (cycle >= 100 && cycle < 120) return centerY - 8;
      return centerY;
    };

    const render = () => {
      x = (x + 2.2) % width;
      const currIdx = Math.floor(x);
      points[currIdx] = getEcgHeight(x);

      ctx.clearRect(0, 0, width, height);

      // Grid line
      ctx.strokeStyle = "rgba(52, 211, 153, 0.07)";
      ctx.lineWidth = 1;
      for (let g = 0; g < width; g += 20) {
        ctx.beginPath();
        ctx.moveTo(g, 0);
        ctx.lineTo(g, height);
        ctx.stroke();
      }

      // ECG wave
      ctx.beginPath();
      ctx.strokeStyle = "#34D399";
      ctx.shadowColor = "#34D399";
      ctx.shadowBlur = 12;
      ctx.lineWidth = 2.2;

      let started = false;
      for (let i = 0; i < width; i++) {
        const val = points[i];
        if (val !== undefined) {
          if (!started) {
            ctx.moveTo(i, val);
            started = true;
          } else {
            ctx.lineTo(i, val);
          }
        }
      }
      ctx.stroke();

      // Lead cursor glow
      const headY = points[currIdx] || height / 2;
      ctx.beginPath();
      ctx.arc(currIdx, headY, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#38BDF8";
      ctx.shadowColor = "#38BDF8";
      ctx.shadowBlur = 16;
      ctx.fill();

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-16 pointer-events-none" />;
};

/* ============================================================
   ANIMATED COUNTER HOOK
   ============================================================ */
function useAnimatedCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ============================================================
   INTERSECTION HOOK
   ============================================================ */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ============================================================
   MAIN EXPORT
   ============================================================ */
export const LandingHome: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { toggleTheme } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 4400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden text-slate-100" style={{ background: "#081421" }}>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" />
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <LandingPage navigate={navigate} toggleTheme={toggleTheme} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ============================================================
   SPLASH SCREEN — Cinematic Intro
   ============================================================ */
const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  w: 1 + (i * 7.3) % 2.2,
  left: 8 + (i * 13.7) % 84,
  top: 8 + (i * 19.3) % 84,
  cyan: i % 2 === 0,
  dur: 3.2 + (i * 1.1) % 3.8,
  delay: (i * 0.37) % 3.5,
  dy: -25 - (i * 6.1) % 35,
}));

const RAYS = Array.from({ length: 12 }, (_, i) => i * 30);

const SplashScreen: React.FC = () => {
  const [progress, setProgress] = React.useState(0);
  const [phase, setPhase] = React.useState<"dark" | "flash" | "reveal">("dark");

  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase("flash"), 300);
    const t2 = setTimeout(() => setPhase("reveal"), 650);

    const start = Date.now();
    const duration = 4000;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
    };
    const anim = requestAnimationFrame(tick);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(anim);
    };
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: "#060D17" }}
    >
      <div className="absolute inset-0 pointer-events-none digital-grid opacity-30" />
      <div className="absolute inset-0 pointer-events-none aurora-bg" />

      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.w,
            height: p.w,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: p.cyan ? "#38BDF8" : "#34D399",
            boxShadow: p.cyan ? "0 0 10px #38BDF8" : "0 0 10px #34D399",
          }}
          animate={{ y: [0, p.dy, 0], opacity: [0.15, 0.85, 0.15] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Center AI Emblem */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: phase !== "dark" ? 1 : 0.6, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {RAYS.map((deg, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-48 h-0.5 pointer-events-none"
              style={{
                transformOrigin: "0% 50%",
                transform: `rotate(${deg}deg)`,
                background: "linear-gradient(90deg, rgba(56,189,248,0.4) 0%, transparent 100%)",
              }}
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 2.5, delay: i * 0.1, repeat: Infinity }}
            />
          ))}

          <div
            className="w-36 h-36 rounded-3xl flex items-center justify-center relative overflow-hidden p-1.5"
            style={{
              background: "linear-gradient(135deg, rgba(13,31,51,0.9) 0%, rgba(8,20,33,0.95) 100%)",
              border: "1px solid rgba(56,189,248,0.45)",
              boxShadow: "0 0 60px rgba(56,189,248,0.35), 0 0 120px rgba(52,211,153,0.2)",
            }}
          >
            <img src="/logo.jpeg" alt="MediLynk AI" className="w-full h-full object-cover rounded-2xl shadow-xl" />
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <div className="w-56 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(13,31,51,0.8)", border: "1px solid rgba(56,189,248,0.15)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #34D399, #14B8A6, #38BDF8)",
                boxShadow: "0 0 12px #38BDF8",
              }}
            />
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "rgba(241,245,249,0.5)", fontFamily: "'Space Grotesk', sans-serif" }}>
            Initializing MediLynk AI Platform... {Math.round(progress)}%
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ============================================================
   LANDING PAGE WRAPPER
   ============================================================ */
interface LandingProps {
  navigate: ReturnType<typeof useNavigate>;
  toggleTheme: () => void;
}

const LandingPage: React.FC<LandingProps> = ({ navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "AI Core", id: "ai-capabilities" },
    { label: "Features", id: "features" },
    { label: "Workflow", id: "workflow" },
    { label: "Network", id: "network" },
    { label: "Tech Stack", id: "tech-stack" },
    { label: "Security", id: "security" },
    { label: "Pricing", id: "pricing" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <div onMouseMove={handleMouseMove} className="relative min-h-screen">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left pointer-events-none"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #34D399, #14B8A6, #38BDF8)",
          boxShadow: "0 0 10px #38BDF8",
        }}
      />

      {/* Mouse Follower Glow */}
      <div
        className="fixed pointer-events-none z-30 w-[500px] h-[500px] rounded-full transition-transform duration-75 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, rgba(52,211,153,0.035) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* 10-Layer Futuristic Background */}
      <MultiLayerHeroBackground />

      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "glass-nav py-3.5 shadow-2xl" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 group">
            <div className="transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]">
              <Logo size="sm" />
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className="nav-link">
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate("/auth")} className="btn-secondary text-xs px-4 py-2">
              Sign In
            </button>
            <button onClick={() => navigate("/auth?signup=true")} className="btn-primary text-xs px-5 py-2">
              Get Started <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-200 p-2">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-30 glass-nav border-b p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-slate-200 font-semibold text-base py-2 hover:text-[#38BDF8]"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 border-t border-slate-700/50 flex flex-col gap-3">
              <button onClick={() => navigate("/auth")} className="btn-secondary w-full justify-center">
                Sign In
              </button>
              <button onClick={() => navigate("/auth?signup=true")} className="btn-primary w-full justify-center">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <HeroSection navigate={navigate} scrollTo={scrollTo} />

      {/* PARTNERS MARQUEE */}
      <PartnersSection />

      {/* AI CAPABILITIES & WORKFLOW */}
      <AICapabilitiesSection />
      <AIWorkflowSection />

      {/* PLATFORM FEATURES */}
      <FeaturesSection />

      {/* HOSPITAL & HEALTH NETWORK */}
      <HospitalNetworkSection />

      {/* LIVE DASHBOARD PREVIEW */}
      <DashboardSection />

      {/* INTERACTIVE TIMELINE */}
      <InteractiveTimelineSection />

      {/* SECURITY & PRIVACY */}
      <SecuritySection />

      {/* ENTERPRISE TECH STACK */}
      <TechStackSection />

      {/* BENEFITS & STATS */}
      <BenefitsSection />

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* PRICING PLANS */}
      <PricingSection />

      {/* FAQ */}
      <FAQSection faqOpen={faqOpen} setFaqOpen={setFaqOpen} />

      {/* CONTACT */}
      <ContactSection />

      {/* FOOTER */}
      <FooterSection scrollTo={scrollTo} />
    </div>
  );
};

/* ============================================================
   ANIMATED WORD FLIP HOOK
   ============================================================ */
const FLIP_WORDS = ["Hospitals", "Doctors", "Laboratories", "Pharmacies", "Insurers", "Patients"];

function useWordFlip(words: string[], interval = 2400) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words, interval]);
  return words[idx];
}

/* ============================================================
   HERO SECTION — Cinematic AI Healthcare Universe
   ============================================================ */
const HeroSection: React.FC<{ navigate: ReturnType<typeof useNavigate>; scrollTo: (id: string) => void }> = ({ navigate, scrollTo }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yP = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const flipWord = useWordFlip(FLIP_WORDS);

  return (
    <section id="hero" ref={ref} className="relative pt-32 pb-24 md:pt-44 md:pb-40 overflow-hidden">
      {/* Hero Aurora Underlayer */}
      <div className="absolute inset-0 aurora-bg pointer-events-none" />
      <div className="absolute inset-0 aurora-secondary pointer-events-none" />
      <div className="absolute inset-0 medical-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── LEFT: Hero Content ── */}
          <motion.div style={{ y: yP }} className="lg:col-span-6 space-y-8">

            {/* Animated Launch Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-[#34D399]/35 text-xs font-bold text-[#34D399] tracking-wide"
            >
              <Sparkles size={13} style={{ animation: "orbit-cw 4s linear infinite" }} />
              SIH 2025 Grand Finalist · Healthcare AI
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] pulse-ring" />
                <span className="text-[#34D399]/70">LIVE</span>
              </span>
            </motion.div>

            {/* Main Headline — Cinematic Scale */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.0]">
                <span className="text-slate-50">One Unified</span>
                <br />
                <span className="grad-cyan-teal">AI Health</span>
                <br />
                <span className="text-slate-50">Record.</span>
              </h1>
            </motion.div>

            {/* Animated Word-Flip Connector Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-400 font-medium max-w-lg leading-relaxed"
            >
              Connecting{" "}
              <span
                key={flipWord}
                className="font-bold text-slate-100 inline-block"
                style={{ animation: "breathe-float 0.4s ease-out" }}
              >
                {flipWord}
              </span>{" "}
              through one encrypted lifetime health identity.
            </motion.p>

            {/* Continuous ECG Monitor Strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="glass-card rounded-2xl p-4 max-w-lg border border-[#34D399]/20 relative overflow-hidden shimmer"
            >
              <div className="flex items-center justify-between text-xs font-semibold mb-2 text-slate-300">
                <span className="flex items-center gap-2 text-[#34D399]">
                  <Activity size={14} className="animate-pulse" /> Live Cardiac Monitor
                </span>
                <span className="font-mono text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] pulse-ring" />
                  72 BPM · Normal Sinus Rhythm
                </span>
              </div>
              <EcgHeartbeatCanvas />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button onClick={() => navigate("/auth?signup=true")} className="btn-primary text-sm">
                Get Started Free <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollTo("dashboard")} className="btn-secondary text-sm">
                <Eye size={16} /> See Platform Demo
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-wrap items-center gap-5 text-xs font-semibold text-slate-400"
            >
              <span className="flex items-center gap-1.5"><Shield size={13} className="text-[#34D399]" /> 256-Bit AES Encrypted</span>
              <span className="flex items-center gap-1.5"><Lock size={13} className="text-[#38BDF8]" /> HIPAA-Aligned</span>
              <span className="flex items-center gap-1.5"><Zap size={13} className="text-[#14B8A6]" /> 2s AI Parsing</span>
              <span className="flex items-center gap-1.5"><Globe size={13} className="text-[#34D399]" /> 50K+ Records</span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: 12-Node AI Ecosystem ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center min-h-[520px]"
          >
            {/* Multi-layer spotlight glows */}
            <div className="absolute w-[450px] h-[450px] rounded-full bg-[#38BDF8]/12 blur-3xl pointer-events-none" />
            <div className="absolute w-[380px] h-[380px] rounded-full bg-[#34D399]/10 blur-3xl pointer-events-none" />
            <div className="absolute w-[300px] h-[300px] rounded-full bg-[#14B8A6]/08 blur-2xl pointer-events-none" />

            {/* Animated Energy Rings around core */}
            {[300, 370, 440].map((size, i) => (
              <div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: size,
                  height: size,
                  border: `1px solid rgba(56, 189, 248, ${0.12 - i * 0.035})`,
                  animation: `ring-expand ${5 + i * 2}s ease-out ${i * 1.5}s infinite`,
                }}
              />
            ))}

            <HealthCoreVisual12Nodes />

            {/* Floating Glass Card 1: Vitals */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-2 glass-card rounded-2xl p-3.5 border border-[#38BDF8]/30 text-xs hidden sm:block shadow-2xl max-w-[200px]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] flex-shrink-0">
                  <Heart size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Live Vitals</p>
                  <p className="font-bold text-slate-100 text-[11px]">72 BPM · 99% SpO₂</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Glass Card 2: AI Report */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6.5, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-2 glass-card rounded-2xl p-3.5 border border-[#34D399]/30 text-xs hidden sm:block shadow-2xl max-w-[220px]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#34D399]/15 border border-[#34D399]/30 flex items-center justify-center text-[#34D399] flex-shrink-0">
                  <Brain size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">AI Parser</p>
                  <p className="font-bold text-slate-100 text-[11px]">Lipid Panel · 1.4s</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Glass Card 3: Secure Vault */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[40%] -right-8 glass-card rounded-2xl p-3 border border-[#14B8A6]/30 text-xs hidden lg:block shadow-2xl"
            >
              <div className="flex items-center gap-2 text-[#14B8A6] font-bold text-[11px]">
                <Shield size={14} /> E2E Zero-Trust
              </div>
            </motion.div>

            {/* Floating Glass Card 4: Network Status */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, delay: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-10 glass-card rounded-xl p-3 border border-[#34D399]/25 text-xs hidden lg:block shadow-2xl"
            >
              <div className="flex items-center gap-2 font-bold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#34D399] pulse-ring" />
                <span className="text-[#34D399]">12 Nodes Live</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

/* 12 Orbit Modules for AI Healthcare Matrix */
const orbitModules12 = [
  { label: "Hospital", icon: <Building2 size={15} />, color: "#38BDF8", angle: 0 },
  { label: "Doctor", icon: <Stethoscope size={15} />, color: "#34D399", angle: 30 },
  { label: "Patient", icon: <UserCheck size={15} />, color: "#14B8A6", angle: 60 },
  { label: "Insurance", icon: <Shield size={15} />, color: "#38BDF8", angle: 90 },
  { label: "Health ID", icon: <Key size={15} />, color: "#34D399", angle: 120 },
  { label: "Ambulance", icon: <AlertTriangle size={15} />, color: "#14B8A6", angle: 150 },
  { label: "Laboratory", icon: <FlaskConical size={15} />, color: "#38BDF8", angle: 180 },
  { label: "Pharmacy", icon: <Pill size={15} />, color: "#34D399", angle: 210 },
  { label: "Radiology", icon: <Eye size={15} />, color: "#14B8A6", angle: 240 },
  { label: "Blood Bank", icon: <Heart size={15} />, color: "#38BDF8", angle: 270 },
  { label: "Reports", icon: <FileText size={15} />, color: "#34D399", angle: 300 },
  { label: "Emergency", icon: <Activity size={15} />, color: "#14B8A6", angle: 330 },
];

const HealthCoreVisual12Nodes: React.FC = () => {
  const [angleOffset, setAngleOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngleOffset((prev) => (prev + 0.25) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const R = 175;
  const CX = 210;
  const CY = 210;

  return (
    <div className="relative w-[420px] h-[420px] flex items-center justify-center select-none">
      {/* SVG Connecting Node Lines & Beams */}
      <svg width="420" height="420" className="absolute inset-0 pointer-events-none">
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(56,189,248,0.18)" strokeWidth="1.5" strokeDasharray="6 6" />
        <circle cx={CX} cy={CY} r={R - 40} fill="none" stroke="rgba(52,211,153,0.12)" strokeWidth="1" />

        {orbitModules12.map((mod, i) => {
          const rad = ((mod.angle + angleOffset) * Math.PI) / 180;
          const mx = CX + R * Math.cos(rad);
          const my = CY + R * Math.sin(rad);
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={mx}
              y2={my}
              stroke={`${mod.color}35`}
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
          );
        })}
      </svg>

      {/* Orbit Badges */}
      {orbitModules12.map((mod, i) => {
        const rad = ((mod.angle + angleOffset) * Math.PI) / 180;
        const x = CX + R * Math.cos(rad);
        const y = CY + R * Math.sin(rad);
        return (
          <div
            key={i}
            className="absolute transition-transform duration-200 hover:scale-110"
            style={{
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="w-13 h-13 rounded-2xl flex flex-col items-center justify-center gap-0.5 glass p-1"
              style={{
                borderColor: `${mod.color}45`,
                boxShadow: `0 0 15px ${mod.color}25`,
              }}
            >
              <span style={{ color: mod.color }}>{mod.icon}</span>
              <span className="text-[7.5px] font-semibold text-slate-300 text-center leading-tight">
                {mod.label}
              </span>
            </div>
          </div>
        );
      })}

      {/* Central AI Core with logo.jpeg */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-28 h-28 rounded-3xl flex flex-col items-center justify-center glass border border-[#38BDF8]/60 shadow-[0_0_60px_rgba(56,189,248,0.4)] p-1 overflow-hidden"
      >
        <img src="/logo.jpeg" alt="MediLynk AI" className="w-full h-full object-cover rounded-2xl shadow-xl" />
      </motion.div>
    </div>
  );
};

/* ============================================================
   PARTNERS MARQUEE
   ============================================================ */
const partners = [
  { name: "Apollo Health", icon: <Heart size={14} /> },
  { name: "MedCloud Corp", icon: <Cloud size={14} /> },
  { name: "NeuroMed AI", icon: <Brain size={14} /> },
  { name: "LabConnect Pro", icon: <Database size={14} /> },
  { name: "PharmaSys", icon: <Shield size={14} /> },
  { name: "ClinixNet", icon: <Network size={14} /> },
  { name: "VitalCare Group", icon: <Activity size={14} /> },
  { name: "DataHealth Inc", icon: <BarChart3 size={14} /> },
  { name: "SecureMed", icon: <Lock size={14} /> },
  { name: "OmniClinic", icon: <Globe size={14} /> },
];

const PartnersSection: React.FC = () => (
  <section id="partners" className="py-12 relative overflow-hidden border-y border-slate-800/60 bg-[#060D17]/40">
    <p className="text-center text-[11px] font-semibold tracking-widest uppercase mb-6 text-slate-400">
      Trusted by leading medical networks & digital health innovators
    </p>
    <div className="flex gap-6 overflow-x-auto no-scrollbar max-w-7xl mx-auto px-4 justify-around">
      {partners.map((p, i) => (
        <div key={i} className="partner-badge flex-shrink-0">
          <span className="text-[#38BDF8]">{p.icon}</span>
          {p.name}
        </div>
      ))}
    </div>
  </section>
);

/* ============================================================
   AI CAPABILITIES
   ============================================================ */
const aiCaps = [
  { icon: <Brain size={24} />, title: "Intelligent Report Parsing", desc: "Transforms complex lab panels, blood panels, and clinical PDFs into clear, actionable summaries in under 2 seconds.", color: "#38BDF8", tag: "Core NLP" },
  { icon: <MessageSquare size={24} />, title: "Medical Jargon Translator", desc: "Converts dense clinical terminology into plain-language explanations patients can easily understand and act on.", color: "#34D399", tag: "Plain Language" },
  { icon: <TrendingUp size={24} />, title: "Timeline Trend Analysis", desc: "Detects subtle patterns across vitals, labs, and diagnoses over time to reveal early wellness indicators.", color: "#14B8A6", tag: "Predictive AI" },
  { icon: <Search size={24} />, title: "Natural Language Search", desc: "Ask your health record anything in plain text — e.g. \"When did I last take penicillin or get a tetanus shot?\"", color: "#38BDF8", tag: "Semantic Search" },
  { icon: <Cpu size={24} />, title: "Personalized Health Plans", desc: "Tailored recommendations for medication adherence, dietary guidance, and routine screenings derived from your data.", color: "#34D399", tag: "AI Advisor" },
  { icon: <Layers size={24} />, title: "Smart Document Sorting", desc: "Auto-classifies, dates, and tags prescriptions, MRI scan results, and doctor notes instantly upon upload.", color: "#14B8A6", tag: "Document AI" },
];

const AICapabilitiesSection: React.FC = () => {
  const { ref, inView } = useInView();
  return (
    <section id="ai-capabilities" ref={ref} className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="section-badge mb-4 mx-auto"><Cpu size={12} /> AI Intelligence Engine</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            AI That <span className="grad-cyan-teal">Understands</span> Medicine
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Six specialized AI intelligence layers working in harmony to make your clinical health data meaningful, structured, and actionable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiCaps.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass-card gradient-border rounded-2xl p-6 group shine-hover"
            >
              <div className="flex justify-between items-start mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${cap.color}15`, border: `1px solid ${cap.color}30`, color: cap.color }}
                >
                  {cap.icon}
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${cap.color}12`, color: cap.color, border: `1px solid ${cap.color}25` }}
                >
                  {cap.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">{cap.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   INTERACTIVE AI WORKFLOW ANIMATION
   ============================================================ */
const AIWorkflowSection: React.FC = () => {
  const { ref, inView } = useInView();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. Raw Report Upload",
      desc: "Upload unstructured PDFs, lab panel scans, handwritten prescriptions, or MRI imaging results.",
      icon: <FileText size={20} />,
      color: "#38BDF8",
      sample: "Lipid_Panel_Report_2026.pdf (1.8 MB) — Uploaded via Mobile App",
    },
    {
      title: "2. OCR & Medical NLP Parsing",
      desc: "Clinical AI extracts medical entities, numerical lab ranges, ICD-10 codes, and physician signatures.",
      icon: <Cpu size={20} />,
      color: "#34D399",
      sample: "Extracted: Cholesterol 210 mg/dL (High), HDL 54 mg/dL, Triglycerides 140 mg/dL",
    },
    {
      title: "3. Knowledge Graph Integration",
      desc: "Maps extracted parameters into your chronological health timeline alongside historical vitals.",
      icon: <Network size={20} />,
      color: "#14B8A6",
      sample: "Linked to Cardiology History: +12% Cholesterol trend over 12 months",
    },
    {
      title: "4. Actionable Patient Insights",
      desc: "Generates plain-language summaries for patients and detailed clinical briefs for consulting doctors.",
      icon: <CheckCircle size={20} />,
      color: "#38BDF8",
      sample: "AI Brief: Mild lipid elevation detected. Dietary intervention recommended prior to medication.",
    },
  ];

  return (
    <section id="workflow" ref={ref} className="py-24 relative bg-[#060D17]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="section-badge mb-4 mx-auto"><Zap size={12} /> AI Pipeline</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            How MediLynk AI <span className="grad-cyan-teal">Transforms Health Data</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Click on any step below to inspect how unstructured clinical documents turn into intelligent insights.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Step Selector Tabs */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-start gap-4 ${
                  activeStep === idx
                    ? "glass-card border-l-4 border-l-[#38BDF8] shadow-lg scale-[1.02]"
                    : "glass opacity-70 hover:opacity-100"
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}
                >
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-base">{step.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Preview Panel */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#38BDF8]/20 relative overflow-hidden min-h-[320px]">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700/50 text-xs text-slate-400">
                <span className="flex items-center gap-2 font-mono text-[#38BDF8]">
                  <Sparkles size={14} /> Pipeline Node Execution #{activeStep + 1}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#34D399]/15 text-[#34D399] font-bold text-[10px]">
                  STATUS: ACTIVE
                </span>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-slate-100">{steps[activeStep].title}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{steps[activeStep].desc}</p>

                <div className="p-4 rounded-xl bg-[#060D17]/80 border border-slate-700/60 font-mono text-xs text-slate-200">
                  <p className="text-slate-400 text-[10px] uppercase mb-1">// System Telemetry Output</p>
                  <p className="text-[#38BDF8]">{steps[activeStep].sample}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   PLATFORM FEATURES — Bento Grid
   ============================================================ */
const features = [
  { icon: <Activity size={24} />, title: "Unified Health Record", desc: "One comprehensive digital file spanning consultations, diagnostics, surgeries, vitals, and prescriptions across your entire life.", color: "#38BDF8", span: "md:col-span-4" },
  { icon: <Clock size={22} />, title: "Interactive Timeline", desc: "Navigate your complete clinical history with a fluid chronological flow. Drill into any event instantly.", color: "#34D399", span: "md:col-span-2" },
  { icon: <Share2 size={22} />, title: "Secure Sharing Controls", desc: "Grant temporary, revocable read access to any verified physician with a single toggle.", color: "#14B8A6", span: "md:col-span-2" },
  { icon: <Cloud size={22} />, title: "Lifetime Cloud Vault", desc: "MRI scans, blood panels, prescriptions, and vaccination cards — hosted with zero expiry and full redundancy.", color: "#38BDF8", span: "md:col-span-3" },
  { icon: <Lock size={22} />, title: "Zero-Trust Security", desc: "256-bit AES encryption. Your records are sealed — even our servers cannot decrypt your data without you.", color: "#34D399", span: "md:col-span-3" },
  { icon: <Users size={22} />, title: "Doctor Collaboration", desc: "Physicians post consultation notes, follow-ups, and digital prescriptions directly to your health profile.", color: "#14B8A6", span: "md:col-span-2" },
];

const FeaturesSection: React.FC = () => {
  const { ref, inView } = useInView();
  return (
    <section id="features" ref={ref} className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="section-badge mb-4 mx-auto"><Layers size={12} /> Platform Capabilities</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Everything Your <span className="grad-cyan-teal">Health Profile Needs</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Engineered for patients, doctors, and hospitals seeking a seamless healthcare ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`${f.span} glass-card gradient-border rounded-2xl p-6 group shine-hover`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${f.color}15`, border: `1px solid ${f.color}30`, color: f.color }}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   3D HEALTHCARE GLOBE CANVAS COMPONENT
   ============================================================ */
const HealthcareGlobe3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    const R = Math.min(width, height) * 0.38;
    const CX = width / 2;
    const CY = height / 2;

    let rotationY = 0;

    const globePoints: Array<{ lat: number; lon: number; isHub?: boolean; label?: string }> = [];
    
    const hubs = [
      { lat: 20.5937, lon: 78.9629, label: "India SIH Hub" },
      { lat: 37.7749, lon: -122.4194, label: "SF Cloud Vault" },
      { lat: 51.5074, lon: -0.1278, label: "London MedNet" },
      { lat: 1.3521, lon: 103.8198, label: "Singapore Node" },
      { lat: 35.6762, lon: 139.6503, label: "Tokyo AI Core" },
      { lat: 25.2048, lon: 55.2708, label: "Dubai Care Hub" }
    ];

    hubs.forEach(h => globePoints.push({ ...h, isHub: true }));

    for (let lat = -75; lat <= 75; lat += 15) {
      for (let lon = -180; lon < 180; lon += 20) {
        globePoints.push({ lat, lon });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      rotationY += 0.008;

      const radGlow = ctx.createRadialGradient(CX, CY, 0, CX, CY, R * 1.3);
      radGlow.addColorStop(0, "rgba(56, 189, 248, 0.15)");
      radGlow.addColorStop(0.7, "rgba(52, 211, 153, 0.05)");
      radGlow.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(CX, CY, R * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = radGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.22)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      const projected: Array<{ x: number; y: number; z: number; isHub?: boolean; label?: string }> = [];

      globePoints.forEach((p) => {
        const radLat = (p.lat * Math.PI) / 180;
        const radLon = ((p.lon + rotationY * (180 / Math.PI)) * Math.PI) / 180;

        const x3d = R * Math.cos(radLat) * Math.sin(radLon);
        const y3d = -R * Math.sin(radLat);
        const z3d = R * Math.cos(radLat) * Math.cos(radLon);

        if (z3d > -R * 0.2) {
          const scale = 1 + z3d / (R * 4);
          projected.push({
            x: CX + x3d * scale,
            y: CY + y3d * scale,
            z: z3d,
            isHub: p.isHub,
            label: p.label
          });
        }
      });

      const hubProjected = projected.filter(p => p.isHub);
      for (let i = 0; i < hubProjected.length; i++) {
        for (let j = i + 1; j < hubProjected.length; j++) {
          const p1 = hubProjected[i];
          const p2 = hubProjected[j];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(CX, CY, p2.x, p2.y);
          ctx.strokeStyle = "rgba(52, 211, 153, 0.35)";
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }

      projected.forEach((p) => {
        const alpha = Math.max(0.1, (p.z + R) / (2 * R));
        if (p.isHub) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = "#34D399";
          ctx.shadowColor = "#34D399";
          ctx.shadowBlur = 14;
          ctx.fill();

          if (p.label) {
            ctx.font = "9px Space Grotesk, sans-serif";
            ctx.fillStyle = "rgba(241, 245, 249, 0.9)";
            ctx.fillText(p.label, p.x + 7, p.y + 3);
          }
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.75})`;
          ctx.shadowBlur = 0;
          ctx.fill();
        }
      });

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

/* ============================================================
   HOSPITAL & HEALTH NETWORK VISUALIZATION
   ============================================================ */
const HospitalNetworkSection: React.FC = () => {
  const { ref, inView } = useInView();

  const nodes = [
    { name: "Patient App", type: "Core Hub", color: "#38BDF8", icon: <UserCheck size={18} /> },
    { name: "Apollo Hospital", type: "Hospital", color: "#34D399", icon: <Building2 size={18} /> },
    { name: "Diagnostic Lab", type: "Lab Network", color: "#14B8A6", icon: <FlaskConical size={18} /> },
    { name: "Specialist Care", type: "Doctor Portal", color: "#38BDF8", icon: <Stethoscope size={18} /> },
    { name: "Cloud Vault", type: "Storage", color: "#34D399", icon: <Cloud size={18} /> },
  ];

  return (
    <section id="network" ref={ref} className="py-24 relative bg-[#060D17]/40 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="section-badge mb-4 mx-auto"><Network size={12} /> Connected Ecosystem</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Global <span className="grad-cyan-teal">Healthcare Network</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Real-time encrypted communication between hospitals, doctors, laboratories, and patients worldwide.
          </p>
        </motion.div>

        {/* Interactive 3D Globe Representation */}
        <HealthcareGlobe3D />

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          {nodes.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-5 text-center flex flex-col items-center gap-3 border border-slate-700/50 hover:border-[#38BDF8]/40"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${n.color}15`, color: n.color, border: `1px solid ${n.color}35` }}
              >
                {n.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm">{n.name}</h4>
                <p className="text-xs text-slate-400">{n.type}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#34D399]/15 text-[#34D399] font-bold">
                CONNECTED
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   LIVE DASHBOARD PREVIEW
   ============================================================ */
const DashboardSection: React.FC = () => {
  const { ref, inView } = useInView(0.08);
  const [tab, setTab] = useState<"overview" | "ai" | "timeline">("overview");

  const vitals = [
    { label: "Heart Rate", value: "72", unit: "bpm", color: "#38BDF8", trend: "Normal" },
    { label: "Blood Pressure", value: "118/76", unit: "mmHg", color: "#34D399", trend: "Optimal" },
    { label: "Blood Glucose", value: "94", unit: "mg/dL", color: "#14B8A6", trend: "Normal" },
    { label: "SpO₂", value: "99%", unit: "saturation", color: "#38BDF8", trend: "Optimal" },
  ];

  return (
    <section id="dashboard" ref={ref} className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="section-badge mb-4 mx-auto"><BarChart3 size={12} /> Dashboard View</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Your Health, <span className="grad-cyan-teal">At a Single Glance</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Interactive patient telemetry and report monitoring interface.
          </p>
        </motion.div>

        {/* Mockup Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl overflow-hidden border border-[#38BDF8]/20 shadow-2xl"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#060D17]/80 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-semibold text-slate-400">MediLynk AI — Patient Workspace</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#34D399] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#34D399] pulse-ring" /> Live Telemetry Sync
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 px-6 pt-4 border-b border-slate-700/40">
            {(["overview", "ai", "timeline"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-colors capitalize ${
                  tab === t ? "bg-[#38BDF8]/15 text-[#38BDF8] border-t-2 border-t-[#38BDF8]" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t === "ai" ? "AI Recommendations" : t}
              </button>
            ))}
          </div>

          {/* Content Body */}
          <div className="p-6">
            {tab === "overview" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {vitals.map((v, idx) => (
                  <div key={idx} className="dash-widget">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-slate-400 font-semibold">{v.label}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#34D399]/15 text-[#34D399] font-bold">
                        {v.trend}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-slate-100">{v.value} <span className="text-xs text-slate-400 font-normal">{v.unit}</span></p>
                  </div>
                ))}
              </div>
            )}

            {tab === "ai" && (
              <div className="p-4 rounded-xl bg-[#060D17]/70 border border-slate-700/50 space-y-2 text-xs text-slate-300">
                <p className="font-bold text-[#38BDF8]">AI Health Assessment Summary:</p>
                <p>• Lipid profile indicates normal HDL/LDL ratios over recent quarter.</p>
                <p>• Recommended follow-up: Routine annual wellness check in 60 days.</p>
              </div>
            )}

            {tab === "timeline" && (
              <div className="space-y-3 text-xs">
                <div className="flex justify-between p-3 rounded-lg bg-[#060D17]/60 border border-slate-700/40">
                  <span>Jul 28, 2026 — Lipid Blood Panel Report</span>
                  <span className="text-[#34D399]">Completed</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-[#060D17]/60 border border-slate-700/40">
                  <span>Jun 14, 2026 — Cardiology Consultation Notes</span>
                  <span className="text-[#38BDF8]">Dr. S. Chen</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================
   INTERACTIVE TIMELINE SECTION
   ============================================================ */
const InteractiveTimelineSection: React.FC = () => {
  const { ref, inView } = useInView();

  const timelineEvents = [
    { date: "Jul 28, 2026", title: "Comprehensive Lipid Panel", dept: "Diagnostic Lab", status: "AI Summarized", color: "#38BDF8" },
    { date: "Jul 15, 2026", title: "Cardiology Annual Consult", dept: "Apollo Specialty", status: "Prescription Attached", color: "#34D399" },
    { date: "Jun 04, 2026", title: "Right Knee MRI Scan", dept: "Radiology Center", status: "Zero Anomalies", color: "#14B8A6" },
  ];

  return (
    <section id="timeline-section" ref={ref} className="py-24 relative bg-[#060D17]/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="section-badge mb-4 mx-auto"><Clock size={12} /> Lifelong Record</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Chronological <span className="grad-cyan-teal">Health History</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Track every diagnostic result, surgery note, and prescription on a fluid interactive timeline.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6 relative pl-6 border-l-2 border-slate-700/50">
          {timelineEvents.map((ev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-5 border border-slate-700/60 relative"
            >
              <div
                className="absolute -left-[31px] top-6 w-4 h-4 rounded-full border-2 border-[#081421]"
                style={{ background: ev.color }}
              />
              <div className="flex flex-wrap justify-between items-center gap-2 mb-1 text-xs">
                <span className="text-slate-400 font-mono">{ev.date}</span>
                <span className="px-2 py-0.5 rounded-full bg-[#34D399]/15 text-[#34D399] font-bold">
                  {ev.status}
                </span>
              </div>
              <h4 className="font-bold text-slate-100 text-base">{ev.title}</h4>
              <p className="text-xs text-slate-400 mt-1">{ev.dept}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   SECURITY & PRIVACY SECTION
   ============================================================ */
const SecuritySection: React.FC = () => {
  const { ref, inView } = useInView();

  const points = [
    "256-bit AES End-to-End Data Encryption",
    "Zero-Trust Architecture — No Implicit Access",
    "Granular Doctor-Level Permission Toggles",
    "Immutable Access Audit Logs for Every Action",
  ];

  return (
    <section id="security" ref={ref} className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#34D399]/20 relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            
            <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
              <div className="section-badge mb-4"><Lock size={12} /> Security First</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 mb-4">
                Your Health Data Has <span className="grad-cyan-teal">Zero Leaks</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                Engineered with strict zero-trust data governance. You hold the encryption keys and maintain total ownership over your medical history.
              </p>

              <div className="space-y-3">
                {points.map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-slate-200 font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#34D399]/20 text-[#34D399] flex items-center justify-center flex-shrink-0">
                      <Check size={12} />
                    </div>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7 }} className="flex justify-center">
              <div className="w-64 h-64 rounded-3xl glass border border-[#34D399]/40 flex flex-col items-center justify-center gap-3 shadow-[0_0_60px_rgba(52,211,153,0.15)]">
                <Shield size={60} className="text-[#34D399] animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">AES-256 ENCRYPTED</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   ENTERPRISE TECH STACK SECTION
   ============================================================ */
const TechStackSection: React.FC = () => {
  const { ref, inView } = useInView();

  const tech = [
    { name: "React 19 & TypeScript", desc: "Ultra-fast type-safe component architecture with concurrent rendering", icon: <Cpu size={22} />, color: "#38BDF8" },
    { name: "Clinical AI Engine", desc: "Specialized NLP report parsing & medical jargon translation", icon: <Brain size={22} />, color: "#34D399" },
    { name: "Framer Motion & Canvas", desc: "60 FPS physics-based hardware-accelerated animations", icon: <Zap size={22} />, color: "#14B8A6" },
    { name: "256-Bit AES Vault", desc: "Zero-trust encrypted database with patient key management", icon: <Lock size={22} />, color: "#38BDF8" },
    { name: "HIPAA Cloud Mesh", desc: "Multi-region redundant cloud storage with immutable audit logs", icon: <Cloud size={22} />, color: "#34D399" },
    { name: "High-Speed REST APIs", desc: "Interoperable enterprise endpoints for hospital LIMS & EHRs", icon: <Database size={22} />, color: "#14B8A6" },
  ];

  return (
    <section id="tech-stack" ref={ref} className="py-24 relative bg-[#060D17]/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="section-badge mb-4 mx-auto"><Cpu size={12} /> Enterprise Tech Architecture</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Engineered with <span className="grad-cyan-teal">Billion-Dollar Tech</span>
          </h2>
          <p className="mt-4 text-[#94a3b8] max-w-2xl mx-auto text-base sm:text-lg">
            High-performance, zero-latency clinical architecture built for enterprise scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tech.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 border border-slate-700/50 hover:border-[#38BDF8]/40"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}30` }}
              >
                {t.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">{t.name}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   BENEFITS & STATS
   ============================================================ */
const BenefitsSection: React.FC = () => {
  const { ref, inView } = useInView();

  const stats = [
    { target: 50000, suffix: "+", label: "Health Records Managed", color: "#38BDF8" },
    { target: 99, suffix: ".9%", label: "System Uptime SLA", color: "#34D399" },
    { target: 2, suffix: "s", label: "Avg AI Parsing Speed", color: "#14B8A6" },
    { target: 256, suffix: "-bit", label: "Encryption Standard", color: "#38BDF8" },
  ];

  const c0 = useAnimatedCounter(stats[0].target, 2000, inView);
  const c1 = useAnimatedCounter(stats[1].target, 1500, inView);
  const c2 = useAnimatedCounter(stats[2].target, 1000, inView);
  const c3 = useAnimatedCounter(stats[3].target, 1200, inView);
  const counts = [c0, c1, c2, c3];

  return (
    <section ref={ref} className="py-20 relative bg-[#060D17]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <p className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: s.color }}>
                {counts[i].toLocaleString()}{s.suffix}
              </p>
              <p className="text-xs text-slate-400 font-semibold">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   TESTIMONIALS
   ============================================================ */
const testimonials = [
  { name: "Dr. Priya Ramachandran", role: "Chief Cardiologist", text: "MediLynk AI has revolutionized patient intake. Reviewing full longitudinal history takes seconds before consultations.", avatar: "PR", color: "#38BDF8" },
  { name: "James O'Brien", role: "Chronic Care Patient", text: "Having all lab panels and prescriptions in one AI-organized file gives me peace of mind when seeing new specialists.", avatar: "JO", color: "#34D399" },
  { name: "Dr. Sanjana Mehta", role: "Chief Medical Officer", text: "The security architecture and granular doctor access controls make MediLynk the gold standard for patient records.", avatar: "SM", color: "#14B8A6" },
];

const TestimonialsSection: React.FC = () => {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="section-badge mb-4 mx-auto"><Star size={12} /> Testimonials</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Trusted by <span className="grad-cyan-teal">Doctors & Patients</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="testimonial-card"
            >
              <div className="flex gap-1 mb-4 text-[#38BDF8]">
                {[...Array(5)].map((_, si) => <Star key={si} size={14} fill="#38BDF8" />)}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-700/50">
                <div className="w-9 h-9 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center font-bold text-xs text-[#38BDF8]">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-100">{t.name}</p>
                  <p className="text-[10px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   PRICING SECTION — Three Premium Tiers
   ============================================================ */
const PricingSection: React.FC = () => {
  const { ref, inView } = useInView();

  const plans = [
    {
      name: "Patient",
      tagline: "Personal Health Record",
      price: "Free",
      sub: "Forever — No credit card needed",
      color: "#14B8A6",
      highlight: false,
      features: [
        "Lifelong digital health timeline",
        "Upload & AI-parse up to 25 documents/mo",
        "Natural language health search",
        "Share records with up to 3 doctors",
        "256-bit AES encrypted vault",
        "Mobile + Web access",
      ],
      cta: "Create Free Account",
    },
    {
      name: "Clinic Pro",
      tagline: "For Independent Doctors",
      price: "₹2,499",
      sub: "per month per clinic seat",
      color: "#38BDF8",
      highlight: true,
      features: [
        "Everything in Patient tier",
        "Unlimited patient record management",
        "Post consultation notes & prescriptions",
        "AI-powered patient history digest",
        "LIMS & EHR integration APIs",
        "Priority 24/7 support",
      ],
      cta: "Start 30-Day Trial",
    },
    {
      name: "Enterprise",
      tagline: "Hospital Systems & Labs",
      price: "Custom",
      sub: "Volume pricing for institutions",
      color: "#34D399",
      highlight: false,
      features: [
        "Everything in Clinic Pro tier",
        "Multi-branch hospital network hub",
        "Radiology & lab results auto-push",
        "Dedicated compliance officer",
        "Custom HIPAA / ABDM audit trails",
        "Dedicated SLA & implementation team",
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <section id="pricing" ref={ref} className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-badge mb-4 mx-auto"><Zap size={12} /> Pricing</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Simple, Transparent <span className="grad-cyan-teal">Pricing</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            From individual patients to enterprise hospital networks — every tier is built for real clinical workflows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`pricing-card relative flex flex-col rounded-3xl p-8 ${
                plan.highlight
                  ? "pricing-card-featured"
                  : "glass-card border border-slate-700/50"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold text-[#060D17] bg-gradient-to-r from-[#34D399] via-[#14B8A6] to-[#38BDF8] shadow-lg">
                    ✦ MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}35`, color: plan.color }}
                >
                  {i === 0 ? <UserCheck size={20} /> : i === 1 ? <Stethoscope size={20} /> : <Building2 size={20} />}
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-400">{plan.tagline}</p>
              </div>

              {/* Price */}
              <div className="mb-7">
                <p className="text-4xl font-bold text-slate-100 tracking-tight">
                  {plan.price}
                </p>
                <p className="text-xs text-slate-400 mt-1">{plan.sub}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${plan.color}18`, color: plan.color }}
                    >
                      <Check size={10} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  plan.highlight
                    ? "btn-primary justify-center text-center"
                    : "btn-secondary justify-center text-center"
                }`}
                style={plan.highlight ? {} : { borderColor: `${plan.color}35` }}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Enterprise note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-xs text-slate-500 mt-10"
        >
          All tiers include HIPAA-aligned security, E2E encryption, and 99.9% uptime SLA. No hidden fees.
        </motion.p>
      </div>
    </section>
  );
};

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
const faqs = [
  { q: "What is MediLynk AI?", a: "MediLynk AI is a patient-centered digital health record platform that organizes lifelong medical histories using artificial intelligence." },
  { q: "Is MediLynk AI a hospital billing system?", a: "No. MediLynk AI focuses specifically on patient health records, diagnostic panels, AI summaries, and secure doctor sharing." },
  { q: "Who controls my medical data?", a: "You retain 100% ownership and control over your records. Access can be granted or revoked at any time." },
  { q: "How secure is my personal health information?", a: "All records are protected using 256-bit AES encryption and zero-trust security standards aligned with HIPAA governance." },
];

const FAQSection: React.FC<{ faqOpen: number | null; setFaqOpen: React.Dispatch<React.SetStateAction<number | null>> }> = ({ faqOpen, setFaqOpen }) => {
  const { ref, inView } = useInView();
  return (
    <section id="faq" ref={ref} className="py-24 scroll-mt-20 bg-[#060D17]/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="section-badge mb-4 mx-auto"><MessageSquare size={12} /> FAQ</div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Frequently Asked <span className="grad-cyan-teal">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`faq-item ${faqOpen === idx ? "open" : ""}`}>
              <button
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-slate-100"
              >
                <span>{faq.q}</span>
                <ChevronDown size={18} className={`transition-transform duration-300 ${faqOpen === idx ? "rotate-180 text-[#38BDF8]" : "text-slate-400"}`} />
              </button>
              <AnimatePresence>
                {faqOpen === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-700/40 pt-3"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   CONTACT
   ============================================================ */
const ContactSection: React.FC = () => {
  const { ref, inView } = useInView();
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" ref={ref} className="py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#38BDF8]/20 relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-10">
            
            <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
              <div className="section-badge mb-4"><Mail size={12} /> Contact Us</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 mb-4">
                Let's Build the <span className="grad-cyan-teal">Future of Health</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Have questions or interested in institutional integration? Send us a message.
              </p>
              <div className="space-y-4 text-xs text-slate-300">
                <p className="flex items-center gap-3"><Mail size={16} className="text-[#38BDF8]" /> support@medilynk.ai</p>
                <p className="flex items-center gap-3"><Phone size={16} className="text-[#34D399]" /> +1 (800) MEDI-LYNK</p>
                <p className="flex items-center gap-3"><MapPin size={16} className="text-[#14B8A6]" /> San Francisco, CA</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
              {sent ? (
                <div className="text-center py-12 space-y-3">
                  <CheckCircle size={40} className="text-[#34D399] mx-auto" />
                  <h3 className="text-xl font-bold text-slate-100">Message Sent!</h3>
                  <p className="text-xs text-slate-400">Our team will respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                  <input type="text" placeholder="Full Name" required className="w-full px-4 py-3 rounded-xl bg-[#060D17]/80 border border-slate-700/60 text-xs text-slate-100 outline-none focus:border-[#38BDF8]" />
                  <input type="email" placeholder="Email Address" required className="w-full px-4 py-3 rounded-xl bg-[#060D17]/80 border border-slate-700/60 text-xs text-slate-100 outline-none focus:border-[#38BDF8]" />
                  <textarea placeholder="Message" rows={4} required className="w-full px-4 py-3 rounded-xl bg-[#060D17]/80 border border-slate-700/60 text-xs text-slate-100 outline-none focus:border-[#38BDF8] resize-none" />
                  <button type="submit" className="btn-primary w-full justify-center">
                    Send Message <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   FOOTER
   ============================================================ */
const FooterSection: React.FC<{ scrollTo: (id: string) => void }> = ({ scrollTo }) => {
  return (
    <footer className="bg-[#060D17] border-t border-slate-800/60 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <button onClick={() => scrollTo("hero")}>
            <Logo size="sm" />
          </button>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} MediLynk AI. Lifelong Health Intelligence. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Shield size={12} className="text-[#34D399]" /> 256-Bit Encrypted & HIPAA Aligned
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingHome;
