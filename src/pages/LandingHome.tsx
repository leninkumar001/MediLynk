import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useApp } from "../context/AppContext";
import { Logo } from "../components/Logo";
import {
  Activity, Brain, Shield, Lock, Users, Share2,
  ChevronDown, Mail, Phone, MapPin, CheckCircle,
  Menu, X, ArrowRight, Zap, Database, Cloud,
  Cpu, Network, Eye, FileText, Bell, BarChart3,
  Star, TrendingUp, Globe, Layers, Search, Sparkles,
  Heart, MessageSquare, Clock, UserCheck
} from "lucide-react";

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
    const timer = setTimeout(() => setShowSplash(false), 4800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden text-slate-200" style={{ background: "#04191A" }}>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" />
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
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
   SPLASH SCREEN — Ultra Cinematic Intro
   ============================================================ */

// Stable particle positions – computed once outside the component to avoid rerenders
const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  w: 1 + (i * 7.3) % 2.2,
  left: 8 + (i * 13.7) % 84,
  top: 8 + (i * 19.3) % 84,
  gold: i % 3 !== 1,
  dur: 3.2 + (i * 1.1) % 3.8,
  delay: (i * 0.37) % 3.5,
  dy: -25 - (i * 6.1) % 35,
}));

// Radial light ray angles
const RAYS = Array.from({ length: 12 }, (_, i) => i * 30);

const SplashScreen: React.FC = () => {
  const [progress, setProgress] = React.useState(0);
  const [phase, setPhase] = React.useState<"dark" | "flash" | "reveal">("dark");

  React.useEffect(() => {
    // Phase sequencing
    const t1 = setTimeout(() => setPhase("flash"), 300);
    const t2 = setTimeout(() => setPhase("reveal"), 650);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  React.useEffect(() => {
    const start = Date.now();
    const duration = 4400;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.round(pct));
      if (pct < 100) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.08, filter: "blur(24px)" }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: "#03080a" }}
    >
      {/* ══ 1. FILM-GRAIN NOISE OVERLAY ══ */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.028,
        }}
      />

      {/* ══ 2. DEEP SPACE BACKGROUND GRADIENT ══ */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 44%, rgba(197,155,63,0.045) 0%, rgba(10,6,2,0) 65%), #03080a",
        }}
      />

      {/* ══ 3. FLASH BURST (phase: flash) ══ */}
      <AnimatePresence>
        {phase === "flash" && (
          <motion.div
            key="flash"
            className="absolute inset-0 pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 46%, rgba(255,232,140,0.22) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* ══ 4. SHOCKWAVE RING ══ */}
      {phase !== "dark" && (
        <motion.div
          className="absolute rounded-full pointer-events-none z-10"
          style={{
            top: "46%", left: "50%",
            width: 60, height: 60,
            transform: "translate(-50%,-50%)",
            border: "1.5px solid rgba(197,155,63,0.7)",
          }}
          initial={{ scale: 0.4, opacity: 0.9 }}
          animate={{ scale: 8, opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.2, 0, 0.4, 1] }}
        />
      )}

      {/* ══ 5. RADIAL LIGHT RAYS SVG ══ */}
      {phase === "reveal" && (
        <motion.div
          className="absolute pointer-events-none z-[2]"
          style={{ top: "46%", left: "50%", transform: "translate(-50%,-50%)", width: 680, height: 680 }}
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="680" height="680" viewBox="0 0 680 680" fill="none" xmlns="http://www.w3.org/2000/svg">
            {RAYS.map((angle, i) => (
              <line
                key={i}
                x1="340" y1="340"
                x2={340 + 340 * Math.cos((angle * Math.PI) / 180)}
                y2={340 + 340 * Math.sin((angle * Math.PI) / 180)}
                stroke={`rgba(197,155,63,${0.055 - i * 0.003})`}
                strokeWidth={i % 2 === 0 ? "1" : "0.5"}
                strokeLinecap="round"
              />
            ))}
          </svg>
        </motion.div>
      )}

      {/* ══ 6. MULTI-LAYER GLOW AURA ══ */}
      {phase === "reveal" && (
        <>
          {/* Outer warm aura */}
          <motion.div
            className="absolute rounded-full pointer-events-none z-[2]"
            style={{
              width: 640, height: 440,
              top: "46%", left: "50%",
              transform: "translate(-50%,-50%)",
              background: "radial-gradient(ellipse, rgba(197,155,63,0.09) 0%, transparent 68%)",
              filter: "blur(50px)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 1, 0.75], scale: [0.6, 1.05, 1] }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Mid gold bloom */}
          <motion.div
            className="absolute rounded-full pointer-events-none z-[2]"
            style={{
              width: 360, height: 260,
              top: "46%", left: "50%",
              transform: "translate(-50%,-50%)",
              background: "radial-gradient(ellipse, rgba(255,220,100,0.11) 0%, transparent 65%)",
              filter: "blur(28px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8] }}
            transition={{ delay: 0.2, duration: 1.1, ease: "easeOut" }}
          />
          {/* Inner bright core */}
          <motion.div
            className="absolute rounded-full pointer-events-none z-[3]"
            style={{
              width: 160, height: 120,
              top: "46%", left: "50%",
              transform: "translate(-50%,-50%)",
              background: "radial-gradient(ellipse, rgba(255,240,170,0.18) 0%, transparent 70%)",
              filter: "blur(16px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6] }}
            transition={{ delay: 0.4, duration: 1.0 }}
          />
        </>
      )}

      {/* ══ 7. PULSING RINGS ══ */}
      {phase === "reveal" && (
        <div className="absolute z-[3]" style={{ top: "46%", left: "50%", transform: "translate(-50%,-50%)" }}>
          {[280, 340, 400, 460].map((r, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: r, height: r,
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                border: `1px solid rgba(197,155,63,${0.13 - i * 0.025})`,
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 1, 1.04, 1], opacity: [0, 0.8, 1, 0.55] }}
              transition={{
                duration: 1.6,
                delay: 0.2 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.5, 0.8, 1],
              }}
            />
          ))}
          {/* Perpetual breathing ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 320, height: 320,
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              border: "1px solid rgba(197,155,63,0.12)",
            }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
        </div>
      )}

      {/* ══ 8. GOLD DUST PARTICLES ══ */}
      <div className="absolute inset-0 pointer-events-none z-[4]">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.w,
              height: p.w,
              left: `${p.left}%`,
              top: `${p.top}%`,
              background: p.gold ? "#C59B3F" : "#FFE8A0",
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ y: [0, p.dy, 0], opacity: [0, p.gold ? 0.7 : 0.45, 0] }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ══ 9. LOGO IMAGE — main cinematic reveal ══ */}
      <div className="relative z-[5] flex flex-col items-center" style={{ marginBottom: 10 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.62, y: 22, filter: "blur(32px) brightness(0) saturate(0)" }}
          animate={
            phase === "reveal"
              ? {
                  opacity: [0, 0.15, 1, 1],
                  scale: [0.62, 0.78, 1.04, 1],
                  y: [22, 10, -4, 0],
                  filter: [
                    "blur(32px) brightness(0) saturate(0)",
                    "blur(18px) brightness(0.5) saturate(0.4)",
                    "blur(2px) brightness(1.35) saturate(1.1)",
                    "blur(0px) brightness(1) saturate(1)",
                  ],
                }
              : {}
          }
          transition={{ duration: 1.55, ease: [0.12, 0.98, 0.26, 1], times: [0, 0.28, 0.7, 1] }}
          style={{ position: "relative" }}
        >
          {/* Logo */}
          <img
            src="/logo.png"
            alt="MediLynk AI"
            style={{
              width: 340,
              height: 340,
              objectFit: "contain",
              filter:
                "drop-shadow(0 0 55px rgba(197,155,63,0.55)) drop-shadow(0 0 110px rgba(197,155,63,0.22)) drop-shadow(0 8px 32px rgba(0,0,0,0.7))",
              userSelect: "none",
            }}
            draggable={false}
          />

          {/* ── Shimmer sweep across logo ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
            style={{ zIndex: 2 }}
          >
            <motion.div
              style={{
                position: "absolute",
                top: 0, bottom: 0,
                width: "55%",
                background:
                  "linear-gradient(105deg, transparent 30%, rgba(255,240,160,0.22) 50%, transparent 70%)",
                skewX: -12,
              }}
              initial={{ left: "-60%" }}
              animate={{ left: ["−60%", "160%"] }}
              transition={{ delay: 1.5, duration: 0.85, ease: "easeInOut" }}
            />
          </motion.div>

          {/* ── Vertical scan line ── */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: 0, right: 0, height: 2,
              background:
                "linear-gradient(90deg, transparent 10%, rgba(255,232,140,0.7) 50%, transparent 90%)",
              filter: "blur(1.5px)",
              zIndex: 3,
            }}
            initial={{ top: "8%", opacity: 0 }}
            animate={{ top: ["8%", "92%"], opacity: [0, 1, 0] }}
            transition={{ delay: 1.1, duration: 0.9, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* ══ 10. TAGLINE ══ */}
      <motion.p
        initial={{ opacity: 0, y: 12, letterSpacing: "0.12em", filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, letterSpacing: "0.3em", filter: "blur(0px)" }}
        transition={{ delay: 2.05, duration: 1.0, ease: "easeOut" }}
        className="relative z-[5] uppercase font-semibold text-center"
        style={{
          fontSize: "0.6rem",
          color: "rgba(197,155,63,0.52)",
          fontFamily: "'Space Grotesk', sans-serif",
          marginTop: 2,
        }}
      >
        — Unified Digital Health Record Platform —
      </motion.p>

      {/* ══ 11. STATUS + COUNTER ══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="relative z-[5] mt-14 flex items-center gap-3 text-xs tracking-widest"
        style={{ color: "rgba(148,163,184,0.32)", fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#C59B3F" }}
          animate={{ opacity: [1, 0.15, 1], scale: [1, 1.6, 1] }}
          transition={{ duration: 1.0, repeat: Infinity }}
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.7, duration: 0.5 }}
        >
          INITIALIZING AI HEALTH CORE
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 2.9, duration: 0.8, repeat: Infinity }}
          style={{ color: "#C59B3F" }}
        >
          ▋
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.4 }}
          style={{ color: "rgba(197,155,63,0.55)", minWidth: 36, textAlign: "right" }}
        >
          {progress}%
        </motion.span>
      </motion.div>

      {/* ══ 12. GOLD PROGRESS BAR ══ */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 2.6, duration: 0.6, ease: "easeOut" }}
        className="relative z-[5] mt-4"
        style={{ width: 240, transformOrigin: "left" }}
      >
        {/* Track */}
        <div style={{ width: "100%", height: 2, background: "rgba(197,155,63,0.1)", borderRadius: 99, overflow: "hidden" }}>
          {/* Fill */}
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #6b4a10, #C59B3F, #FFE8A0)",
              borderRadius: 99,
              boxShadow: "0 0 10px rgba(197,155,63,0.8), 0 0 20px rgba(197,155,63,0.35)",
              transition: "width 0.05s linear",
            }}
          />
        </div>
        {/* Glowing head dot */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 6, height: 6,
            background: "#FFE8A0",
            boxShadow: "0 0 8px rgba(255,232,140,1), 0 0 16px rgba(197,155,63,0.7)",
            left: `calc(${progress}% - 3px)`,
            transition: "left 0.05s linear",
          }}
        />
      </motion.div>

      {/* ══ 13. BOTTOM CORNER ACCENTS ══ */}
      {["bottom-6 left-6", "bottom-6 right-6"].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} z-[5] flex items-center gap-1.5`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.6 }}
        >
          <div style={{ width: 20, height: 1, background: "rgba(197,155,63,0.25)" }} />
          <div style={{ width: 4, height: 4, borderRadius: 99, background: "rgba(197,155,63,0.3)" }} />
          {i === 0 && (
            <span style={{ fontSize: "0.5rem", color: "rgba(197,155,63,0.3)", letterSpacing: "0.2em", fontFamily: "'Space Grotesk', sans-serif" }}>
              ML·AI
            </span>
          )}
          {i === 1 && (
            <span style={{ fontSize: "0.5rem", color: "rgba(197,155,63,0.3)", letterSpacing: "0.2em", fontFamily: "'Space Grotesk', sans-serif" }}>
              v2.0
            </span>
          )}
          <div style={{ width: 4, height: 4, borderRadius: 99, background: "rgba(197,155,63,0.3)" }} />
          <div style={{ width: 20, height: 1, background: "rgba(197,155,63,0.25)" }} />
        </motion.div>
      ))}
    </motion.div>
  );
};

/* ============================================================
   LANDING PAGE ROOT
   ============================================================ */
interface LandingProps {
  navigate: ReturnType<typeof useNavigate>;
  toggleTheme: () => void;
}

const LandingPage: React.FC<LandingProps> = ({ navigate, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
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
    { label: "Features", id: "features" },
    { label: "AI", id: "ai-capabilities" },
    { label: "Dashboard", id: "dashboard" },
    { label: "Security", id: "security" },
    { label: "How It Works", id: "how-it-works" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="relative w-full overflow-hidden" style={{ background: "#04191A" }} onMouseMove={handleMouseMove}>
      {/* Cursor glow follow */}
      <div className="pointer-events-none fixed inset-0 z-0"
        style={{ background: `radial-gradient(500px at ${mousePos.x}px ${mousePos.y}px, rgba(0,212,255,0.028), transparent 70%)` }} />

      {/* ── NAVBAR ─────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(6, 38, 39, 0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0, 212, 255, 0.07)" : "none",
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")}>
            <Logo size="sm" />
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="nav-link">{l.label}</button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate("/auth")}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors nav-link">
              Sign In
            </button>
            <button onClick={() => navigate("/auth?signup=true")}
              className="btn-primary btn-magnetic flex items-center gap-2">
              Get Started <ArrowRight size={14} />
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-xl"
            style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)", color: "#00D4FF" }}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-20 z-40 p-5 space-y-1"
            style={{ background: "rgba(6, 38, 39, 0.98)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(0, 212, 255, 0.08)" }}>
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all nav-link">
                {l.label}
              </button>
            ))}
            <div className="pt-3 border-t flex flex-col gap-2" style={{ borderColor: "rgba(0,212,255,0.08)" }}>
              <button onClick={() => { setMobileMenuOpen(false); navigate("/auth"); }} className="btn-secondary w-full text-center">Sign In</button>
              <button onClick={() => { setMobileMenuOpen(false); navigate("/auth?signup=true"); }}
                className="btn-primary w-full flex items-center justify-center gap-2">
                Get Started <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <HeroSection navigate={navigate} scrollTo={scrollTo} />
      <PartnersSection />
      <AICapabilitiesSection />
      <FeaturesSection />
      <DashboardSection />
      <SecuritySection />
      <HowItWorksSection />
      <BenefitsSection />
      <TestimonialsSection />
      <FAQSection faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
      <ContactSection />
      <FooterSection navigate={navigate} scrollTo={scrollTo} />
    </div>
  );
};

/* ============================================================
   HERO SECTION
   ============================================================ */
const HeroSection: React.FC<{ navigate: ReturnType<typeof useNavigate>; scrollTo: (id: string) => void }> = ({ navigate, scrollTo }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yP = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 digital-grid opacity-40 pointer-events-none" />

      {/* Aurora blobs */}
      <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full pointer-events-none aurora-blob"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.09) 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none aurora-blob"
        style={{ background: "radial-gradient(circle, rgba(124,92,255,0.1) 0%, transparent 65%)", filter: "blur(80px)", animationDelay: "5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,196,140,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(22)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1, height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? "#00D4FF" : i % 3 === 1 ? "#7C5CFF" : "#00C48C", opacity: 0.35,
            }}
            animate={{ y: [0, -50, 0], opacity: [0.15, 0.55, 0.15] }}
            transition={{ duration: Math.random() * 7 + 7, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 7 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* ── TEXT ── */}
          <motion.div className="flex flex-col items-start justify-center" style={{ y: yP }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>
              <div className="section-badge mb-7">
                <Sparkles size={11} /> AI-Powered Healthcare Platform
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.85 }}
              className="text-5xl sm:text-6xl lg:text-[4.25rem] font-bold leading-[1.07] tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              The Future of
              <br />
              <span className="grad-cyan-violet">Health Records</span>
              <br />
              <span style={{ color: "rgba(226,232,240,0.42)", fontSize: "0.68em", fontWeight: 400, letterSpacing: "0.01em" }}>
                is Unified.
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="mt-7 text-base sm:text-lg leading-[1.75] max-w-[480px]"
              style={{ color: "rgba(148,163,184,0.85)", fontFamily: "'Space Grotesk', sans-serif" }}>
              MediLynk AI connects every corner of your healthcare ecosystem — patients, doctors, hospitals, labs, pharmacies, and insurers — into a single intelligent lifelong record.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button onClick={() => navigate("/auth?signup=true")}
                className="btn-primary btn-magnetic flex items-center justify-center gap-2">
                Start Free Today <ArrowRight size={15} />
              </button>
              <button onClick={() => scrollTo("dashboard")}
                className="btn-secondary btn-magnetic flex items-center justify-center gap-2">
                <Eye size={15} /> See It Live
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 0.8 }}
              className="mt-12 pt-10 border-t w-full grid grid-cols-2 sm:grid-cols-4 gap-6"
              style={{ borderColor: "rgba(0,212,255,0.08)" }}>
              {[
                { val: "100%", label: "Patient Owned", c: "#00D4FF" },
                { val: "256-bit", label: "Encryption", c: "#00C48C" },
                { val: "<2s", label: "AI Analysis", c: "#7C5CFF" },
                { val: "Lifelong", label: "Record Storage", c: "#00D4FF" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-2xl font-bold" style={{ color: s.c, fontFamily: "'Space Grotesk', sans-serif" }}>{s.val}</p>
                  <p className="text-xs font-medium uppercase tracking-wider mt-0.5" style={{ color: "rgba(148,163,184,0.45)" }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── HEALTH CORE ── */}
          <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 1.1, ease: "easeOut" }}
            className="flex items-center justify-center">
            <HealthCore />
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
        onClick={() => scrollTo("partners")}>
        <span className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(148,163,184,0.35)", fontFamily: "'Space Grotesk', sans-serif" }}>scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown size={16} style={{ color: "rgba(0,212,255,0.35)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ============================================================
   HEALTH CORE — requestAnimationFrame Orbit with dynamic neural streams
   ============================================================ */
const orbitModules = [
  { label: "Patient",    icon: <Heart size={16} />,    color: "#00D4FF", angle: 0 },
  { label: "Doctor",     icon: <UserCheck size={16} />, color: "#00C48C", angle: 60 },
  { label: "Hospital",   icon: <Activity size={16} />,  color: "#7C5CFF", angle: 120 },
  { label: "Laboratory", icon: <Database size={16} />,  color: "#00D4FF", angle: 180 },
  { label: "Pharmacy",   icon: <FileText size={16} />,  color: "#00C48C", angle: 240 },
  { label: "Insurance",  icon: <Shield size={16} />,    color: "#7C5CFF", angle: 300 },
];

const HealthCore: React.FC = () => {
  const [angleOffset, setAngleOffset] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let frameId: number;
    const update = () => {
      // Slow rotation on hover for easy interaction, normal speed otherwise
      setAngleOffset(prev => (prev + (hovered ? 0.1 : 0.45)) % 360);
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [hovered]);

  const R = 170; // orbit radius px
  const CX = 210; // center x
  const CY = 210; // center y

  return (
    <div 
      className="relative" 
      style={{ width: 420, height: 420 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.065) 0%, transparent 68%)", filter: "blur(12px)" }} />

      {/* SVG layer — rings + scan beam + dynamic neural connectors */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 420" style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id="cg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#7C5CFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Core background fill */}
        <circle cx={CX} cy={CY} r={R - 10} fill="url(#cg)" />

        {/* Orbit paths */}
        <circle cx={CX} cy={CY} r={R} stroke="rgba(0,212,255,0.1)" strokeWidth="1" fill="none" strokeDasharray="4 8" />
        <circle cx={CX} cy={CY} r={R * 0.62} stroke="rgba(124,92,255,0.07)" strokeWidth="1" fill="none" strokeDasharray="2 5" />

        {/* Neural lines that follow the modules as they rotate */}
        {orbitModules.map((mod, i) => {
          const rad = ((mod.angle + angleOffset) * Math.PI) / 180;
          const mx = CX + R * Math.cos(rad);
          const my = CY + R * Math.sin(rad);
          return (
            <line 
              key={i}
              x1={CX} y1={CY}
              x2={mx} y2={my}
              stroke={mod.color}
              strokeWidth="0.8"
              strokeOpacity="0.35"
              className="neural-line"
            />
          );
        })}

        {/* Rotating scan beam */}
        <line x1={CX} y1={CY} x2={CX} y2={CY - R + 12}
          stroke="rgba(0,212,255,0.4)" strokeWidth="1.5"
          transform={`rotate(${angleOffset}, ${CX}, ${CY})`}
          strokeLinecap="round"
        />

        {/* Pulsing ring on core */}
        <circle cx={CX} cy={CY} r="54" stroke="rgba(0,212,255,0.18)" strokeWidth="1" fill="none"
          style={{ animation: "pulse-ring 3s ease-out infinite" }} />
      </svg>

      {/* Orbiting Modules */}
      {orbitModules.map((mod, i) => {
        const rad = ((mod.angle + angleOffset) * Math.PI) / 180;
        const x = CX + R * Math.cos(rad);
        const y = CY + R * Math.sin(rad);
        return (
          <div 
            key={i}
            className="absolute transition-transform duration-300 hover:scale-110"
            style={{
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <OrbitBadge label={mod.label} icon={mod.icon} color={mod.color} />
          </div>
        );
      })}

      {/* Central AI Core */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
          <div className="w-24 h-24 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.16) 0%, rgba(124,92,255,0.22) 100%)",
              border: "1px solid rgba(0,212,255,0.42)",
              boxShadow: "0 0 50px rgba(0,212,255,0.28), 0 0 100px rgba(0,212,255,0.09), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}>
            <div className="absolute inset-0 shimmer-line" />
            <Brain size={30} style={{ color: "#00D4FF" }} />
            <span className="text-[9px] font-bold mt-1 tracking-widest uppercase"
              style={{ color: "rgba(0,212,255,0.9)", fontFamily: "'Space Grotesk', sans-serif" }}>AI CORE</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* Orbit badge component */
const OrbitBadge: React.FC<{ label: string; icon: React.ReactNode; color: string }> = ({ label, icon, color }) => (
  <div className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center gap-0.5 cursor-default"
    style={{
      background: `linear-gradient(135deg, ${color}14, ${color}07)`,
      border: `1px solid ${color}38`,
      boxShadow: `0 0 18px ${color}1A`,
      backdropFilter: "blur(10px)",
    }}>
    <span style={{ color }}>{icon}</span>
    <span className="text-[8px] font-semibold tracking-wide text-center leading-tight px-0.5"
      style={{ color: "rgba(226,232,240,0.65)", fontFamily: "'Space Grotesk', sans-serif" }}>
      {label}
    </span>
  </div>
);

/* ============================================================
   PARTNERS — marquee
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
  <section id="partners" className="py-14 overflow-hidden relative">
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: "rgba(11,30,51,0.28)", borderTop: "1px solid rgba(0,212,255,0.05)", borderBottom: "1px solid rgba(0,212,255,0.05)" }} />
    <p className="text-center text-[11px] font-semibold tracking-widest uppercase mb-7"
      style={{ color: "rgba(148,163,184,0.35)", fontFamily: "'Space Grotesk', sans-serif" }}>
      Trusted by leading healthcare organizations worldwide
    </p>
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: "linear-gradient(90deg,#071426,transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: "linear-gradient(-90deg,#071426,transparent)" }} />
      <div className="marquee-track gap-3 px-3">
        {[...partners, ...partners].map((p, i) => (
          <div key={i} className="partner-badge mx-1.5">
            <span style={{ color: "#00D4FF" }}>{p.icon}</span>
            {p.name}
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   AI CAPABILITIES
   ============================================================ */
const aiCaps = [
  { icon: <Brain size={26} />, title: "Intelligent Report Parsing", desc: "Transforms complex lab panels and clinical PDFs into clear, actionable summaries in under 2 seconds.", color: "#00D4FF", tag: "Core AI" },
  { icon: <MessageSquare size={26} />, title: "Medical Jargon Translator", desc: "Converts dense clinical terminology into plain-language explanations patients can understand and act on.", color: "#00C48C", tag: "NLP Engine" },
  { icon: <TrendingUp size={26} />, title: "Timeline Trend Analysis", desc: "Detects patterns across vitals, labs, and diagnoses over time to reveal early indicators.", color: "#7C5CFF", tag: "Predictive AI" },
  { icon: <Search size={26} />, title: "Natural Language Search", desc: "Ask your health record anything in plain text — \"When did I last take penicillin?\"", color: "#00D4FF", tag: "Semantic Search" },
  { icon: <Cpu size={26} />, title: "Personalized Health Plans", desc: "Tailored recommendations for diet, medication adherence, and lifestyle interventions derived from your data.", color: "#00C48C", tag: "AI Advisor" },
  { icon: <Layers size={26} />, title: "Smart Document Sorting", desc: "Auto-classifies, dates, and tags prescriptions, scan results, and handwritten notes instantly.", color: "#7C5CFF", tag: "Document AI" },
];

const AICapabilitiesSection: React.FC = () => {
  const { ref, inView } = useInView();
  return (
    <section id="ai-capabilities" ref={ref} className="py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-20">
          <div className="section-badge mb-5 mx-auto"><Cpu size={11} /> AI Intelligence Layer</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e2e8f0" }}>
            AI That <span className="grad-cyan-emerald">Understands</span> Medicine
          </h2>
          <p className="mt-5 text-lg max-w-2xl mx-auto prose-light">
            Six layers of specialized AI intelligence working together to make your health data meaningful, not just stored.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {aiCaps.map((cap, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.09, duration: 0.6 }}
              className="glass-card feature-card gradient-border rounded-2xl p-7 group"
              style={{ "--accent": cap.color } as React.CSSProperties}>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: `${cap.color}12`, border: `1px solid ${cap.color}25`, color: cap.color }}>
                  {cap.icon}
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${cap.color}10`, color: cap.color, border: `1px solid ${cap.color}1A`, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {cap.tag}
                </span>
              </div>
              <h3 className="text-base font-bold mb-2.5" style={{ color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif" }}>{cap.title}</h3>
              <p className="text-sm leading-relaxed transition-colors duration-300 group-hover:text-slate-100" style={{ color: "rgba(148,163,184,0.8)" }}>{cap.desc}</p>
              <div className="mt-5 h-px rounded-full transition-all duration-500 group-hover:opacity-100 opacity-0"
                style={{ background: `linear-gradient(90deg, ${cap.color}, transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   PLATFORM FEATURES — bento grid
   ============================================================ */
const features = [
  { icon: <Activity size={24} />, title: "Unified Health Record", desc: "One comprehensive digital file spanning consultations, diagnostics, surgeries, vitals, and prescriptions across your entire life.", color: "#00D4FF", span: "md:col-span-4" },
  { icon: <Clock size={22} />, title: "Interactive Timeline", desc: "Navigate your complete clinical history with a fluid chronological flow. Drill into any event instantly.", color: "#00C48C", span: "md:col-span-2" },
  { icon: <Share2 size={22} />, title: "Secure Sharing", desc: "Grant temporary, revocable read access to any physician with a single toggle.", color: "#7C5CFF", span: "md:col-span-2" },
  { icon: <Cloud size={22} />, title: "Lifetime Cloud Storage", desc: "MRI scans, labs, prescriptions, vaccination cards — hosted with zero expiry and full redundancy.", color: "#00D4FF", span: "md:col-span-3" },
  { icon: <Lock size={22} />, title: "Zero-Trust Encryption", desc: "256-bit AES encryption. Your records are sealed — even our servers cannot read your data without you.", color: "#00C48C", span: "md:col-span-3" },
  { icon: <Users size={22} />, title: "Doctor Collaboration", desc: "Physicians post consultation notes, follow-ups, and prescriptions directly to your secure health folder.", color: "#7C5CFF", span: "md:col-span-2" },
];

const FeaturesSection: React.FC = () => {
  const { ref, inView } = useInView();
  return (
    <section id="features" ref={ref} className="py-28 relative scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(11,30,51,0.28) 50%, transparent 100%)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-20">
          <div className="section-badge mb-5 mx-auto"><Layers size={11} /> Platform Features</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e2e8f0" }}>
            Everything Your <span className="grad-violet-emerald">Health Needs</span>
          </h2>
          <p className="mt-5 text-lg max-w-2xl mx-auto prose-light">
            A complete suite engineered for patients, physicians, and healthcare institutions — all within one platform.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          {features.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`${f.span} glass-card feature-card gradient-border rounded-2xl p-7 group`}
              style={{ "--accent": f.color } as React.CSSProperties}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${f.color}12`, border: `1px solid ${f.color}25`, color: f.color }}>
                {f.icon}
              </div>
              <h3 className="text-base font-bold mb-2.5" style={{ color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed transition-colors duration-300 group-hover:text-slate-100" style={{ color: "rgba(148,163,184,0.78)" }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   DASHBOARD PREVIEW
   ============================================================ */
const DashboardSection: React.FC = () => {
  const { ref, inView } = useInView(0.08);
  const [tab, setTab] = useState<"overview" | "ai" | "timeline">("overview");

  const vitals = [
    { label: "Heart Rate", value: "72", unit: "bpm", color: "#00D4FF", trend: "+2" },
    { label: "Blood Pressure", value: "118/76", unit: "mmHg", color: "#00C48C", trend: "Normal" },
    { label: "Blood Glucose", value: "94", unit: "mg/dL", color: "#7C5CFF", trend: "-3" },
    { label: "SpO₂", value: "98%", unit: "saturation", color: "#00D4FF", trend: "Optimal" },
  ];
  const alerts = [
    { msg: "Annual cardiology check-up due in 12 days", color: "#FFB800" },
    { msg: "Prescription refill: Metformin 500mg", color: "#00D4FF" },
    { msg: "AI flagged abnormal LDL trend — review recommended", color: "#FF4D6D" },
  ];
  const records = [
    { title: "Lipid Panel Report", date: "Jul 28, 2026", type: "Lab", color: "#00D4FF" },
    { title: "Cardiology Consultation", date: "Jul 15, 2026", type: "Consult", color: "#00C48C" },
    { title: "MRI Knee — Right", date: "Jun 4, 2026", type: "Imaging", color: "#7C5CFF" },
  ];
  const timelineItems = [
    { date: "Jul 28, 2026", event: "Lipid Panel — Annual Blood Work", doctor: "Dr. Sarah Chen", type: "Lab", color: "#00D4FF" },
    { date: "Jul 15, 2026", event: "Cardiology Consultation — Routine", doctor: "Dr. Ravi Kumar", type: "Consult", color: "#00C48C" },
    { date: "Jun 4, 2026", event: "Right Knee MRI — Post-surgery Review", doctor: "Dr. Lisa Park", type: "Imaging", color: "#7C5CFF" },
    { date: "May 20, 2026", event: "Prescription: Metformin 500mg", doctor: "Dr. James Wilson", type: "Rx", color: "#00D4FF" },
    { date: "Apr 3, 2026", event: "Full Health Check-up — Annual", doctor: "Dr. Emily Torres", type: "Exam", color: "#00C48C" },
  ];

  return (
    <section id="dashboard" ref={ref} className="py-28 relative scroll-mt-20 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(0,212,255,0.18),transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(0,212,255,0.18),transparent)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.035) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-16">
          <div className="section-badge mb-5 mx-auto"><BarChart3 size={11} /> Live Dashboard</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e2e8f0" }}>
            Your Health, <span className="grad-cyan-violet">At a Glance</span>
          </h2>
          <p className="mt-5 text-lg max-w-2xl mx-auto prose-light">
            Real-time intelligence that visualizes your complete health picture with AI-powered insights.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50, scale: 0.97 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.85 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "rgba(4, 25, 26, 0.96)",
            border: "1px solid rgba(0, 212, 255, 0.14)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 60px rgba(0,212,255,0.04)",
          }}>
          {/* Top chrome bar */}
          <div className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid rgba(0, 212, 255, 0.07)", background: "rgba(7, 37, 38, 0.55)" }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57", opacity: 0.75 }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E", opacity: 0.75 }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28C840", opacity: 0.75 }} />
              </div>
              <span className="text-xs font-semibold" style={{ color: "rgba(148,163,184,0.45)", fontFamily: "'Space Grotesk', sans-serif" }}>
                MediLynk AI — Patient Health Dashboard
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-ring" />
              <span className="text-xs" style={{ color: "#00C48C", fontFamily: "'Space Grotesk', sans-serif" }}>Live</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-6 pt-4 pb-0">
            {(["overview", "ai", "timeline"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all"
                style={{
                  background: tab === t ? "rgba(0,212,255,0.1)" : "transparent",
                  color: tab === t ? "#00D4FF" : "rgba(148,163,184,0.4)",
                  border: tab === t ? "1px solid rgba(0,212,255,0.18)" : "1px solid transparent",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                {t === "ai" ? "AI Insights" : t === "timeline" ? "Timeline" : "Overview"}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {tab === "overview" && (
                <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 grid grid-cols-2 gap-3">
                    {vitals.map((v, i) => (
                      <div key={i} className="dash-widget group hover:translate-y-[-2px] transition-all duration-300"
                        style={{ borderColor: `${v.color}18` }}>
                        <div className="flex justify-between items-start mb-3">
                          <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(148,163,184,0.45)", fontFamily: "'Space Grotesk', sans-serif" }}>{v.label}</p>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                            style={{ background: `${v.color}12`, color: v.color, fontFamily: "'Space Grotesk', sans-serif" }}>{v.trend}</span>
                        </div>
                        <div className="flex items-end gap-1.5">
                          <span className="text-2xl font-bold" style={{ color: v.color, fontFamily: "'Space Grotesk', sans-serif" }}>{v.value}</span>
                          <span className="text-[10px] pb-1" style={{ color: "rgba(148,163,184,0.35)", fontFamily: "'Space Grotesk', sans-serif" }}>{v.unit}</span>
                        </div>
                        <svg width="100%" height="26" className="mt-2 opacity-40">
                          <polyline
                            points={[...Array(9)].map((_, j) => `${j * 14},${13 + Math.sin(j * 0.9 + i) * 8}`).join(" ")}
                            fill="none" stroke={v.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(148,163,184,0.35)", fontFamily: "'Space Grotesk', sans-serif" }}>Smart Alerts</p>
                    {alerts.map((a, i) => (
                      <div key={i} className="dash-widget hover:translate-x-1 transition-all duration-300"
                        style={{ borderLeft: `3px solid ${a.color}`, paddingLeft: "12px" }}>
                        <div className="flex items-start gap-2">
                          <Bell size={11} style={{ color: a.color, marginTop: 2, flexShrink: 0 }} />
                          <p className="text-xs leading-relaxed" style={{ color: "rgba(148,163,184,0.72)", fontFamily: "'Space Grotesk', sans-serif" }}>{a.msg}</p>
                        </div>
                      </div>
                    ))}
                    <p className="text-[10px] font-semibold uppercase tracking-wider mt-5 mb-2" style={{ color: "rgba(148,163,184,0.35)", fontFamily: "'Space Grotesk', sans-serif" }}>Quick Stats</p>
                    {[
                      { label: "Records", val: "47", c: "#00D4FF" },
                      { label: "Doctors", val: "3 Active", c: "#00C48C" },
                      { label: "AI Score", val: "94/100", c: "#7C5CFF" },
                    ].map((s, i) => (
                      <div key={i} className="dash-widget flex justify-between items-center">
                        <span className="text-xs" style={{ color: "rgba(148,163,184,0.6)", fontFamily: "'Space Grotesk', sans-serif" }}>{s.label}</span>
                        <span className="text-sm font-bold" style={{ color: s.c, fontFamily: "'Space Grotesk', sans-serif" }}>{s.val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="md:col-span-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: "rgba(148,163,184,0.35)", fontFamily: "'Space Grotesk', sans-serif" }}>Recent Health Records</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {records.map((r, i) => (
                        <div key={i} className="dash-widget flex items-center gap-4 hover:translate-x-1 transition-all duration-300 cursor-pointer group">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${r.color}12`, border: `1px solid ${r.color}22`, color: r.color }}>
                            <FileText size={15} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate" style={{ color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif" }}>{r.title}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px]" style={{ color: "rgba(148,163,184,0.35)", fontFamily: "'Space Grotesk', sans-serif" }}>{r.date}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold"
                                style={{ background: `${r.color}10`, color: r.color, fontFamily: "'Space Grotesk', sans-serif" }}>{r.type}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {tab === "ai" && (
                <motion.div key="ai" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                  className="grid md:grid-cols-2 gap-4">
                  <div className="dash-widget">
                    <div className="flex items-center gap-2 mb-4">
                      <Brain size={15} style={{ color: "#00D4FF" }} />
                      <p className="text-xs font-bold" style={{ color: "#00D4FF", fontFamily: "'Space Grotesk', sans-serif" }}>AI Health Summary</p>
                    </div>
                    <div className="space-y-3.5 text-xs leading-relaxed" style={{ color: "rgba(148,163,184,0.82)", fontFamily: "'Space Grotesk', sans-serif" }}>
                      <p>📊 <strong style={{ color: "#e2e8f0" }}>LDL Cholesterol</strong> has increased 18% over 6 months. Consider dietary adjustments.</p>
                      <p>✅ <strong style={{ color: "#e2e8f0" }}>Kidney function markers</strong> are within optimal range — no action required.</p>
                      <p>⚠️ <strong style={{ color: "#e2e8f0" }}>Blood pressure</strong> variability detected on Tuesdays — possible stress correlation.</p>
                      <p>💊 <strong style={{ color: "#e2e8f0" }}>Medication adherence</strong> score: 94% — excellent compliance this month.</p>
                    </div>
                  </div>
                  <div className="dash-widget">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap size={15} style={{ color: "#00C48C" }} />
                      <p className="text-xs font-bold" style={{ color: "#00C48C", fontFamily: "'Space Grotesk', sans-serif" }}>AI Recommendations</p>
                    </div>
                    {[
                      { text: "Increase omega-3 intake to address LDL trend", priority: "High", color: "#FF4D6D" },
                      { text: "Schedule follow-up lipid panel in 30 days", priority: "Medium", color: "#FFB800" },
                      { text: "Maintain current exercise regimen — positive cardio markers", priority: "Low", color: "#00C48C" },
                    ].map((r, i) => (
                      <div key={i} className="flex items-start gap-3 py-3" style={{ borderBottom: i < 2 ? "1px solid rgba(0,212,255,0.05)" : "none" }}>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold mt-0.5 flex-shrink-0"
                          style={{ background: `${r.color}14`, color: r.color, fontFamily: "'Space Grotesk', sans-serif" }}>{r.priority}</span>
                        <p className="text-xs" style={{ color: "rgba(148,163,184,0.82)", fontFamily: "'Space Grotesk', sans-serif" }}>{r.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {tab === "timeline" && (
                <motion.div key="timeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                  className="relative pl-8">
                  <div className="absolute left-3 top-0 bottom-0 w-px"
                    style={{ background: "linear-gradient(180deg,#00D4FF,#7C5CFF,#00C48C)" }} />
                  {timelineItems.map((ev, i) => (
                    <div key={i} className="relative mb-5 pl-6">
                      <div className="absolute -left-5 top-2 w-2.5 h-2.5 rounded-full"
                        style={{ background: ev.color, boxShadow: `0 0 8px ${ev.color}` }} />
                      <div className="dash-widget hover:translate-x-1 transition-all duration-300 cursor-default">
                        <div className="flex flex-wrap justify-between gap-2 mb-1">
                          <span className="text-[10px]" style={{ color: "rgba(148,163,184,0.38)", fontFamily: "'Space Grotesk', sans-serif" }}>{ev.date}</span>
                          <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
                            style={{ background: `${ev.color}12`, color: ev.color, fontFamily: "'Space Grotesk', sans-serif" }}>{ev.type}</span>
                        </div>
                        <p className="text-xs font-semibold" style={{ color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif" }}>{ev.event}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: "rgba(148,163,184,0.42)", fontFamily: "'Space Grotesk', sans-serif" }}>{ev.doctor}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================
   SECURITY
   ============================================================ */
const SecuritySection: React.FC = () => {
  const { ref, inView } = useInView();
  const secNodes = [
    { label: "E2E Encrypt",  icon: <Lock size={14} />,     x: 50, y: 10, color: "#00D4FF" },
    { label: "Zero Trust",   icon: <Shield size={14} />,   x: 88, y: 35, color: "#00C48C" },
    { label: "Role Access",  icon: <Users size={14} />,    x: 82, y: 75, color: "#7C5CFF" },
    { label: "Audit Log",    icon: <Eye size={14} />,      x: 50, y: 90, color: "#00D4FF" },
    { label: "Data Vault",   icon: <Database size={14} />, x: 18, y: 75, color: "#00C48C" },
    { label: "Blockchain",   icon: <Network size={14} />,  x: 12, y: 35, color: "#7C5CFF" },
  ];
  const points = [
    { text: "256-bit AES end-to-end encryption on all records", c: "#00D4FF" },
    { text: "Zero-trust architecture — no implicit trust, ever", c: "#00C48C" },
    { text: "Granular doctor-level access control toggles", c: "#7C5CFF" },
    { text: "Immutable audit log for every access event", c: "#00D4FF" },
    { text: "HIPAA-aligned data residency and governance", c: "#00C48C" },
    { text: "Continuous threat monitoring and anomaly detection", c: "#7C5CFF" },
  ];

  return (
    <section id="security" ref={ref} className="py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl overflow-hidden relative" style={{ border: "1px solid rgba(0,196,140,0.14)" }}>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,196,140,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="p-8 md:p-14 flex flex-col lg:flex-row items-center gap-14">
            {/* Text */}
            <motion.div initial={{ opacity: 0, x: -36 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75 }} className="lg:w-1/2">
              <div className="section-badge mb-6" style={{ background: "rgba(0,196,140,0.07)", border: "1px solid rgba(0,196,140,0.18)", color: "#00C48C" }}>
                <Lock size={11} /> Security & Privacy
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e2e8f0" }}>
                Your Data Has <span className="grad-violet-emerald">Zero Leaks.</span> By Design.
              </h2>
              <p className="prose-light mb-8 max-w-md">
                Built on a zero-trust foundation. Every layer — storage, transmission, and access — enforces strict security controls that you, the patient, command.
              </p>
              <div className="space-y-3.5">
                {points.map((pt, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -18 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.08 * i + 0.3, duration: 0.5 }}
                    className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${pt.c}14`, border: `1px solid ${pt.c}28` }}>
                      <CheckCircle size={11} style={{ color: pt.c }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: "rgba(226,232,240,0.78)", fontFamily: "'Space Grotesk', sans-serif" }}>{pt.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Security Node Visualization */}
            <motion.div initial={{ opacity: 0, scale: 0.82 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.85 }} className="lg:w-1/2 flex items-center justify-center">
              <div className="relative w-72 h-72 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(0,196,140,0.04) 0%, transparent 70%)" }} />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                  {secNodes.map((n, i) => secNodes.map((o, j) => j > i && (
                    <line key={`${i}-${j}`}
                      x1={n.x * 3.2} y1={n.y * 3.2} x2={o.x * 3.2} y2={o.y * 3.2}
                      stroke="rgba(0,196,140,0.1)" strokeWidth="0.8"
                      className="neural-line" style={{ animationDelay: `${(i + j) * 0.2}s` }} />
                  )))}
                  {secNodes.map((n, i) => (
                    <line key={`c-${i}`} x1={160} y1={160} x2={n.x * 3.2} y2={n.y * 3.2}
                      stroke={`${n.color}28`} strokeWidth="0.8"
                      className="neural-line" style={{ animationDelay: `${i * 0.12}s` }} />
                  ))}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,196,140,0.2), rgba(0,196,140,0.06))",
                        border: "1px solid rgba(0,196,140,0.4)",
                        boxShadow: "0 0 40px rgba(0,196,140,0.18)",
                      }}>
                      <Shield size={34} style={{ color: "#00C48C" }} />
                    </div>
                  </motion.div>
                </div>
                {secNodes.map((n, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.18 * i + 0.4, duration: 0.5 }}
                    className="absolute sec-node"
                    style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", animationDelay: `${i * 0.55}s` }}>
                    <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5"
                      style={{ background: `${n.color}10`, border: `1px solid ${n.color}30`, boxShadow: `0 0 12px ${n.color}18`, backdropFilter: "blur(8px)" }}>
                      <span style={{ color: n.color }}>{n.icon}</span>
                      <span className="text-[8px] font-semibold text-center leading-tight"
                        style={{ color: "rgba(226,232,240,0.55)", fontFamily: "'Space Grotesk', sans-serif" }}>{n.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   HOW IT WORKS
   ============================================================ */
const HowItWorksSection: React.FC = () => {
  const { ref, inView } = useInView();
  const steps = [
    { num: "01", icon: <UserCheck size={22} />, title: "Create Your Health Identity", desc: "Register in 60 seconds. Your secure lifelong health record is instantly provisioned.", color: "#00D4FF" },
    { num: "02", icon: <Cloud size={22} />, title: "Upload Your History", desc: "Drag and drop prescriptions, lab reports, scan results, vaccinations — any format.", color: "#00C48C" },
    { num: "03", icon: <Brain size={22} />, title: "AI Analyzes & Organizes", desc: "AI parses, classifies, translates, and enriches every document into actionable insights.", color: "#7C5CFF" },
    { num: "04", icon: <Share2 size={22} />, title: "Collaborate Securely", desc: "Grant temporary access to trusted doctors. Full control stays with you, always.", color: "#00D4FF" },
  ];

  return (
    <section id="how-it-works" ref={ref} className="py-28 relative scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent, rgba(11,30,51,0.38), transparent)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-20">
          <div className="section-badge mb-5 mx-auto"><Zap size={11} /> How It Works</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e2e8f0" }}>
            Four Steps to <span className="grad-cyan-violet">Total Health Control</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
            style={{ background: "linear-gradient(90deg,#00D4FF,#7C5CFF,#00C48C,#00D4FF)" }} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.11, duration: 0.65 }}
                className="flex flex-col items-center text-center group">
                <div className="relative mb-7">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{ background: `${s.color}0E`, border: `1px solid ${s.color}28`, boxShadow: `0 0 22px ${s.color}12`, color: s.color }}>
                    {s.icon}
                  </div>
                  <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: s.color, color: "#071426", fontFamily: "'Space Grotesk', sans-serif" }}>
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-base font-bold mb-2.5" style={{ color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.72)" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   BENEFITS / STATS
   ============================================================ */
const BenefitsSection: React.FC = () => {
  const { ref, inView } = useInView();
  const stats = [
    { target: 50000, suffix: "+", label: "Health Records Managed", color: "#00D4FF" },
    { target: 99,    suffix: ".9%", label: "System Uptime SLA",    color: "#00C48C" },
    { target: 2,     suffix: "s",   label: "Avg AI Analysis Time", color: "#7C5CFF" },
    { target: 256,   suffix: "-bit",label: "Encryption Standard",  color: "#00D4FF" },
  ];
  const c0 = useAnimatedCounter(stats[0].target, 2000, inView);
  const c1 = useAnimatedCounter(stats[1].target, 1500, inView);
  const c2 = useAnimatedCounter(stats[2].target, 1000, inView);
  const c3 = useAnimatedCounter(stats[3].target, 1200, inView);
  const counts = [c0, c1, c2, c3];

  return (
    <section ref={ref} className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(0,212,255,0.14),transparent)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-14">
          <div className="section-badge mb-5 mx-auto"><TrendingUp size={11} /> Platform Impact</div>
          <h2 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e2e8f0" }}>
            Numbers That <span className="grad-cyan-emerald">Speak for Themselves</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.09, duration: 0.6 }}
              className="glass-card feature-card gradient-border rounded-2xl p-8 text-center group"
              style={{ "--accent": s.color } as React.CSSProperties}>
              <p className="text-4xl md:text-5xl font-bold mb-2" style={{ color: s.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                {counts[i].toLocaleString()}{s.suffix}
              </p>
              <p className="text-xs font-medium" style={{ color: "rgba(148,163,184,0.55)", fontFamily: "'Space Grotesk', sans-serif" }}>{s.label}</p>
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
  { name: "Dr. Priya Ramachandran", role: "Cardiologist, Apollo Multi-Specialty", text: "MediLynk AI has completely transformed how I review patient histories. The AI summary is like having a brilliant assistant who has already read everything before I walk into the consultation.", avatar: "PR", color: "#00D4FF" },
  { name: "James O'Brien", role: "Patient, Managing Type 2 Diabetes", text: "I've visited 6 different hospitals over the years. Every doctor starts from scratch. With MediLynk, my complete history is available in seconds. Genuinely life-changing.", avatar: "JO", color: "#00C48C" },
  { name: "Dr. Sanjana Mehta", role: "Chief Medical Officer, ClinixNet", text: "We evaluated 11 health record platforms before choosing MediLynk AI. The security architecture, AI capabilities, and enterprise APIs are simply unmatched in this space.", avatar: "SM", color: "#7C5CFF" },
];

const TestimonialsSection: React.FC = () => {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent, rgba(11,30,51,0.3), transparent)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-16">
          <div className="section-badge mb-5 mx-auto"><Star size={11} /> Testimonials</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e2e8f0" }}>
            Trusted by <span className="grad-cyan-violet">Doctors & Patients</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.65 }}
              className="testimonial-card">
              <div className="flex gap-1 mb-5 mt-1">
                {[...Array(5)].map((_, si) => <Star key={si} size={13} fill={t.color} style={{ color: t.color }} />)}
              </div>
              <p className="text-sm leading-[1.8] mb-6 relative z-10" style={{ color: "rgba(148,163,184,0.82)", fontFamily: "'Space Grotesk', sans-serif" }}>
                {t.text}
              </p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(0,212,255,0.07)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: `${t.color}12`, border: `1px solid ${t.color}28`, color: t.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "rgba(148,163,184,0.42)", fontFamily: "'Space Grotesk', sans-serif" }}>{t.role}</p>
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
   FAQ
   ============================================================ */
const faqs = [
  { q: "What exactly is MediLynk AI?", a: "MediLynk AI is a patient-centric unified digital health record platform. It allows individuals to maintain a lifelong medical file, understand their health data through AI insights, and securely share records with trusted healthcare professionals — while retaining complete ownership of their data." },
  { q: "Is MediLynk AI a hospital management system?", a: "No. MediLynk AI is not designed for hospital billing, staff scheduling, or inventory management. It is specifically engineered to empower patients to store, organize, analyze, and share their health records using artificial intelligence." },
  { q: "How does the AI health summary work?", a: "When you upload clinical reports, our AI parses medical terminology, translates complex clinical language into plain English, aggregates historical insights from your timeline, and generates prioritized health recommendations based on your complete medical context." },
  { q: "Who can see my clinical records?", a: "Only you by default. You have granular controls to grant temporary, revocable read access to specific verified physicians. Doctors cannot access any part of your record unless you explicitly toggle authorization within your dashboard." },
  { q: "How secure is my personal health data?", a: "MediLynk AI uses 256-bit AES encryption, a zero-trust security architecture, and immutable audit logging. All data is encrypted both in transit and at rest, aligned with HIPAA-grade data governance and patient privacy standards." },
  { q: "Can I use MediLynk AI outside the US?", a: "Yes. MediLynk AI is a global platform. We are actively building compliance layers for GDPR (EU), DISHA (India), and other regional data privacy regulations in addition to our existing HIPAA-aligned framework." },
];

const FAQSection: React.FC<{ faqOpen: number | null; setFaqOpen: React.Dispatch<React.SetStateAction<number | null>> }> = ({ faqOpen, setFaqOpen }) => {
  const { ref, inView } = useInView();
  return (
    <section id="faq" ref={ref} className="py-28 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-16">
          <div className="section-badge mb-5 mx-auto"><MessageSquare size={11} /> FAQ</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e2e8f0" }}>
            Questions <span className="grad-violet-emerald">Answered</span>
          </h2>
          <p className="mt-4 prose-light">Everything about security, records, and how MediLynk AI works.</p>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div key={idx}
              initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.06, duration: 0.5 }}
              className={`faq-item ${faqOpen === idx ? "open" : ""}`}>
              <button onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-semibold pr-4 text-sm md:text-base"
                  style={{ color: faqOpen === idx ? "#00D4FF" : "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif" }}>
                  {faq.q}
                </span>
                <ChevronDown size={17} style={{ color: faqOpen === idx ? "#00D4FF" : "rgba(148,163,184,0.35)", flexShrink: 0 }}
                  className={`transition-transform duration-300 ${faqOpen === idx ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {faqOpen === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                    <div className="px-5 pb-5 text-sm leading-relaxed"
                      style={{ color: "rgba(148,163,184,0.78)", borderTop: "1px solid rgba(0,212,255,0.07)", paddingTop: "14px", fontFamily: "'Space Grotesk', sans-serif" }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
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
    <section id="contact" ref={ref} className="py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden relative"
          style={{ background: "rgba(11,30,51,0.55)", border: "1px solid rgba(0,212,255,0.09)", backdropFilter: "blur(24px)" }}>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(124,92,255,0.055) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="p-8 md:p-14 flex flex-col lg:flex-row gap-12">
            <motion.div initial={{ opacity: 0, x: -28 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.72 }} className="lg:w-1/2">
              <div className="section-badge mb-6"><Mail size={11} /> Contact Us</div>
              <h2 className="text-4xl font-bold tracking-tight mb-5"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e2e8f0" }}>
                Let's Build the <span className="grad-cyan-violet">Future of Health</span> Together.
              </h2>
              <p className="prose-light mb-10 max-w-md">
                Whether you're a hospital looking to integrate, an investor seeking partnership, or a patient with questions — we'd love to hear from you.
              </p>
              <div className="space-y-5">
                {[
                  { icon: <Mail size={16} />, label: "Email", value: "hello@medilynk.ai", color: "#00D4FF" },
                  { icon: <Phone size={16} />, label: "Phone", value: "+1 (800) MEDI-LYNK", color: "#00C48C" },
                  { icon: <MapPin size={16} />, label: "Headquarters", value: "100 AI Boulevard, Suite 404, SF, CA", color: "#7C5CFF" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}0E`, border: `1px solid ${item.color}22`, color: item.color }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "rgba(148,163,184,0.38)", fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</p>
                      <p className="text-sm font-semibold" style={{ color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif" }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 28 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.72 }} className="lg:w-1/2">
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-16 gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(0,196,140,0.1)", border: "1px solid rgba(0,196,140,0.28)" }}>
                    <CheckCircle size={26} style={{ color: "#00C48C" }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif" }}>Message Received!</h3>
                  <p className="prose-light max-w-xs text-sm">We'll get back to you within 24 hours. Thank you for reaching out.</p>
                  <button onClick={() => setSent(false)} className="btn-secondary mt-2">Send Another</button>
                </motion.div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                  {[
                    { id: "c-name",  label: "Full Name",     type: "text",  placeholder: "Dr. Jane Smith" },
                    { id: "c-email", label: "Email Address", type: "email", placeholder: "jane@hospital.org" },
                    { id: "c-org",   label: "Organization",  type: "text",  placeholder: "Apollo Health Systems (optional)" },
                  ].map(f => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="block text-[10px] font-semibold uppercase tracking-wider mb-2"
                        style={{ color: "rgba(148,163,184,0.42)", fontFamily: "'Space Grotesk', sans-serif" }}>{f.label}</label>
                      <input id={f.id} type={f.type} placeholder={f.placeholder}
                        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                        style={{ background: "rgba(7,20,38,0.8)", border: "1px solid rgba(0,212,255,0.1)", color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif" }}
                        onFocus={e => { e.target.style.borderColor = "rgba(0,212,255,0.38)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.05)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(0,212,255,0.1)"; e.target.style.boxShadow = "none"; }} />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="c-msg" className="block text-[10px] font-semibold uppercase tracking-wider mb-2"
                      style={{ color: "rgba(148,163,184,0.42)", fontFamily: "'Space Grotesk', sans-serif" }}>Message</label>
                    <textarea id="c-msg" rows={4} required
                      placeholder="Tell us about your project, questions, or partnership interest..."
                      className="w-full px-4 py-3.5 rounded-xl text-sm outline-none resize-none transition-all duration-200"
                      style={{ background: "rgba(7,20,38,0.8)", border: "1px solid rgba(0,212,255,0.1)", color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif" }}
                      onFocus={e => { e.target.style.borderColor = "rgba(0,212,255,0.38)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.05)"; }}
                      onBlur={e => { e.target.style.borderColor = "rgba(0,212,255,0.1)"; e.target.style.boxShadow = "none"; }} />
                  </div>
                  <button type="submit" className="btn-primary btn-magnetic w-full flex items-center justify-center gap-2 mt-1">
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
const FooterSection: React.FC<{ navigate: ReturnType<typeof useNavigate>; scrollTo: (id: string) => void }> = ({ navigate, scrollTo }) => {
  const cols: Record<string, { label: string; action: () => void }[]> = {
    Product:  [
      { label: "Features", action: () => scrollTo("features") },
      { label: "AI Capabilities", action: () => scrollTo("ai-capabilities") },
      { label: "Dashboard", action: () => scrollTo("dashboard") },
      { label: "Security", action: () => scrollTo("security") },
    ],
    Company: [
      { label: "About Us", action: () => scrollTo("hero") },
      { label: "How It Works", action: () => scrollTo("how-it-works") },
      { label: "Testimonials", action: () => {} },
      { label: "Contact", action: () => scrollTo("contact") },
    ],
    Legal: [
      { label: "Privacy Policy", action: () => {} },
      { label: "Terms of Service", action: () => {} },
      { label: "HIPAA Compliance", action: () => {} },
      { label: "Cookie Policy", action: () => {} },
    ],
  };

  return (
    <footer style={{ background: "#020E0F", borderTop: "1px solid rgba(0,212,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          <div className="col-span-2 flex flex-col">
            <button onClick={() => scrollTo("hero")} className="mb-5 w-fit">
              <Logo size="sm" />
            </button>
            <p className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: "rgba(148,163,184,0.45)", fontFamily: "'Space Grotesk', sans-serif" }}>
              The AI-powered unified digital health record platform. One patient. One lifelong health record. Zero compromises.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 sec-node" style={{ animationDuration: "2s" }} />
              <span className="text-xs" style={{ color: "rgba(0,196,140,0.7)", fontFamily: "'Space Grotesk', sans-serif" }}>All systems operational</span>
            </div>
          </div>

          {Object.entries(cols).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-[10px] font-bold uppercase tracking-widest mb-5"
                style={{ color: "rgba(148,163,184,0.35)", fontFamily: "'Space Grotesk', sans-serif" }}>{section}</h4>
              <ul className="space-y-3">
                {links.map(l => (
                  <li key={l.label}>
                    <button onClick={l.action} className="text-sm transition-colors duration-200 text-left"
                      style={{ color: "rgba(148,163,184,0.5)", fontFamily: "'Space Grotesk', sans-serif" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#00D4FF")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(148,163,184,0.5)")}>
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl p-8 mb-12 relative overflow-hidden text-center"
          style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.055) 0%, rgba(124,92,255,0.055) 100%)", border: "1px solid rgba(0,212,255,0.08)" }}>
          <div className="absolute inset-0 shimmer-line pointer-events-none" />
          <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e2e8f0" }}>
            Ready to take control of your <span className="grad-cyan-violet">health records?</span>
          </h3>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "rgba(148,163,184,0.5)", fontFamily: "'Space Grotesk', sans-serif" }}>
            Join thousands of patients and physicians already using MediLynk AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate("/auth?signup=true")} className="btn-primary btn-magnetic flex items-center justify-center gap-2">
              Create Free Account <ArrowRight size={14} />
            </button>
            <button onClick={() => navigate("/auth")} className="btn-secondary">Sign In</button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(0,212,255,0.05)" }}>
          <p className="text-xs" style={{ color: "rgba(148,163,184,0.28)", fontFamily: "'Space Grotesk', sans-serif" }}>
            © {new Date().getFullYear()} MediLynk AI, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Shield size={10} style={{ color: "rgba(0,196,140,0.45)" }} />
            <span className="text-xs" style={{ color: "rgba(148,163,184,0.28)", fontFamily: "'Space Grotesk', sans-serif" }}>
              HIPAA Aligned · 256-bit Encrypted · Zero Trust Architecture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
