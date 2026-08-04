import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import {
  Shield,
  Activity,
  Brain,
  Clock,
  Share2,
  Search,
  Cloud,
  Lock,
  Users,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  UserCheck
} from "lucide-react";

export const LandingHome: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-slate-200 transition-colors duration-500">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" />
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full relative z-10"
          >
            <LandingPage navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// -------------------------------------------------------------
// SPLASH SCREEN COMPONENT
// -------------------------------------------------------------
const SplashScreen: React.FC = () => {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-950 text-white overflow-hidden"
    >
      {/* Background glowing blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Circular Logo Draw Animation */}
      <div className="relative mb-8 flex items-center justify-center">
        <svg className="w-40 h-40" viewBox="0 0 100 100">
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            stroke="url(#svg-glow-gradient)"
            strokeWidth="2.5"
            fill="transparent"
            initial={{ strokeDasharray: "276", strokeDashoffset: "276" }}
            animate={{ strokeDashoffset: "0" }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="svg-glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>

        {/* Logo symbol inside */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
          className="absolute text-cyan-400"
        >
          <Activity size={56} className="animate-pulse" />
        </motion.div>
      </div>

      {/* App Name & Slogans */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400"
      >
        MediLynk AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="text-slate-400 text-sm md:text-base tracking-widest mt-2 uppercase font-medium"
      >
        AI-Powered Unified Digital Health Record Platform
      </motion.p>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="mt-8 flex items-center space-x-2 text-slate-300 border-t border-slate-800/80 pt-4 px-6"
      >
        <Sparkles size={16} className="text-emerald-400 animate-spin" style={{ animationDuration: "3s" }} />
        <span className="text-sm font-medium tracking-wide italic">"One Patient. One Lifetime Health Record."</span>
      </motion.div>
    </motion.div>
  );
};

// -------------------------------------------------------------
// LANDING PAGE COMPONENT
// -------------------------------------------------------------
interface LandingProps {
  navigate: ReturnType<typeof useNavigate>;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const LandingPage: React.FC<LandingProps> = ({ navigate, theme, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Scroll handler for smooth navigation links
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const faqs = [
    {
      q: "What is MediLynk AI?",
      a: "MediLynk AI is a patient-centric, secure medical records platform. It allows individuals to maintain a lifelong medical file and securely share it with medical professionals, keeping complete ownership of their data."
    },
    {
      q: "Is MediLynk AI a hospital management system?",
      a: "No. MediLynk AI does not manage hospital billing, staff scheduling, or ward inventory. It is specifically designed to empower patients to store, organize, and query their health records using artificial intelligence."
    },
    {
      q: "How does the AI health summary work?",
      a: "When you upload clinical reports (PDFs, images, scans), our simulated AI parses medical terminology, translates complex terms into plain language, aggregates historical insights, and generates health recommendations."
    },
    {
      q: "Who can see my clinical records?",
      a: "Only you. You have full controls to grant temporary read access to specific doctors. Doctors cannot access your records unless you manually toggle their authorization inside your dashboard."
    },
    {
      q: "Is my personal data secure?",
      a: "Yes, MediLynk AI uses mock end-to-end encryption concepts and patient-controlled authorization lists. We prioritize privacy, security, and accessibility of lifetime medical records."
    }
  ];

  return (
    <div className="grid-bg relative w-full overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-br from-cyan-500/10 to-blue-500/5 dark:from-cyan-900/10 dark:to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-[60vh] left-0 w-[30rem] h-[30rem] bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full transition-all duration-300 glass border-b border-slate-200/50 dark:border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md shadow-cyan-500/20">
              <Activity size={22} />
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-600 to-slate-950 dark:from-white dark:via-cyan-400 dark:to-slate-200">
              MediLynk <span className="text-cyan-500 dark:text-cyan-400">AI</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <button onClick={() => scrollToSection("features")} className="hover:text-cyan-500 transition-colors">Features</button>
            <button onClick={() => scrollToSection("how-it-works")} className="hover:text-cyan-500 transition-colors">How It Works</button>
            <button onClick={() => scrollToSection("ai-features")} className="hover:text-cyan-500 transition-colors">AI Insights</button>
            <button onClick={() => scrollToSection("security")} className="hover:text-cyan-500 transition-colors">Security</button>
            <button onClick={() => scrollToSection("faq")} className="hover:text-cyan-500 transition-colors">FAQ</button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-cyan-500 transition-colors">Contact</button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="px-5 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-cyan-500 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/auth?signup=true")}
              className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/15 hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-1.5"
            >
              Get Started <ArrowRight size={15} />
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-0 top-20 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 glass p-6 flex flex-col space-y-4"
          >
            <button onClick={() => scrollToSection("features")} className="text-left font-semibold py-2">Features</button>
            <button onClick={() => scrollToSection("how-it-works")} className="text-left font-semibold py-2">How It Works</button>
            <button onClick={() => scrollToSection("ai-features")} className="text-left font-semibold py-2">AI Insights</button>
            <button onClick={() => scrollToSection("security")} className="text-left font-semibold py-2">Security</button>
            <button onClick={() => scrollToSection("faq")} className="text-left font-semibold py-2">FAQ</button>
            <button onClick={() => scrollToSection("contact")} className="text-left font-semibold py-2">Contact</button>
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 flex flex-col space-y-3">
              <button onClick={() => { setMobileMenuOpen(false); navigate("/auth"); }} className="w-full py-2.5 text-center font-bold border border-slate-200 dark:border-slate-800 rounded-xl">Sign In</button>
              <button onClick={() => { setMobileMenuOpen(false); navigate("/auth?signup=true"); }} className="w-full py-2.5 text-center font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-md">Create Account</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------
          HERO SECTION
          ------------------------------------------------------------- */}
      <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32 flex flex-col items-center text-center relative">
        {/* Floating elements inside hero */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-[10%] opacity-20 dark:opacity-40 pointer-events-none hidden lg:block"
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-400 rotate-12 blur-[1px] shadow-lg shadow-cyan-400/20" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-[10%] opacity-25 dark:opacity-30 pointer-events-none hidden lg:block"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-400 blur-[2px] shadow-lg shadow-emerald-400/20" />
        </motion.div>

        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold tracking-wider uppercase mb-8 shadow-inner shadow-cyan-500/5"
        >
          <Sparkles size={13} className="animate-pulse" />
          <span>Next Generation Digital Health Record</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-[1.08] text-slate-900 dark:text-white"
        >
          Your Medical History, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500">
            Connected for Life.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-8 text-base sm:text-xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed font-medium"
        >
          Store, manage, and securely share your complete medical records with trusted healthcare professionals. Powered by AI to make your health information easier to understand and always within reach.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => navigate("/auth?signup=true")}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold rounded-xl shadow-lg shadow-cyan-500/20 hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 text-base"
          >
            <span>Create Free Account</span>
            <ArrowRight size={18} />
          </button>
          <button
            onClick={() => navigate("/auth")}
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-extrabold rounded-xl shadow-sm transition-all duration-300 flex items-center justify-center space-x-2 text-base"
          >
            <UserCheck size={18} className="text-cyan-500" />
            <span>Sign In to Dashboard</span>
          </button>
        </motion.div>

        {/* Trust Badges / Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 pt-8 border-t border-slate-200/50 dark:border-slate-800/40 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div>
            <p className="text-3xl font-extrabold text-cyan-500 dark:text-cyan-400">100%</p>
            <p className="text-xs font-semibold text-slate-400 uppercase mt-1">Patient Owned</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-blue-500">256-bit</p>
            <p className="text-xs font-semibold text-slate-400 uppercase mt-1">E2E Encrypted</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-500">Instant</p>
            <p className="text-xs font-semibold text-slate-400 uppercase mt-1">AI Report Parsing</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-purple-500">Lifelong</p>
            <p className="text-xs font-semibold text-slate-400 uppercase mt-1">Cloud Health Record</p>
          </div>
        </motion.div>
      </section>

      {/* -------------------------------------------------------------
          FEATURES SECTION
          ------------------------------------------------------------- */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Secure, Intelligent, and Lifelong
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-3 text-lg">
            A comprehensive suite of clinical features designed to put patients back in control of their health data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((feat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="glass-premium p-6 rounded-2xl flex flex-col items-start hover:shadow-xl transition-all duration-300 relative group overflow-hidden border border-slate-200/60 dark:border-slate-800/40"
            >
              {/* Highlight overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-300" />

              <div className={`p-3 rounded-xl bg-gradient-to-r ${feat.grad} text-white shadow-md mb-6 relative z-10`}>
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 relative z-10">
                {feat.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed relative z-10">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          HOW IT WORKS (TIMELINE)
          ------------------------------------------------------------- */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20 bg-slate-100/50 dark:bg-slate-950/20 rounded-3xl border border-slate-200/50 dark:border-slate-800/20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            How MediLynk AI Works
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-3 text-lg">
            Empowering patient health collaboration in four simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Connector Line */}
          <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 rounded-full" />

          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative group">
                {/* Step badge */}
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-900 border-2 border-cyan-500 shadow-lg flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-105 transition-transform duration-300 relative z-10">
                  {step.icon}
                  <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center border-2 border-white dark:border-slate-900">
                    {idx + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          AI CAPABILITIES SECTION
          ------------------------------------------------------------- */}
      <section id="ai-features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center justify-center gap-2">
            AI-Driven Medical Intelligence
            <Sparkles className="text-cyan-500 animate-pulse" />
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-3 text-lg">
            MediLynk uses specialized AI logic to translate raw, technical clinical documents into digestible patient insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiCapabilities.map((cap, index) => (
            <div key={index} className="glass-premium p-8 rounded-2xl flex flex-col relative border border-slate-200/60 dark:border-slate-800/40">
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-cyan-500 w-fit mb-6">
                {cap.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                {cap.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          SECURITY SECTION
          ------------------------------------------------------------- */}
      <section id="security" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
        <div className="glass-premium rounded-3xl p-8 md:p-12 border border-slate-200/60 dark:border-slate-800/40 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12">
          {/* Glowing particle background inside card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="lg:w-1/2 flex flex-col items-start">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase mb-6">
              <Lock size={12} />
              <span>Military-Grade Security</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              Encryption and Complete Patient Controls
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-medium">
              We believe your medical records are private. We enforce absolute confidentiality through modern security measures, ensuring you decide who gets access.
            </p>

            <ul className="space-y-4 w-full">
              {[
                "End-to-End document security protocol.",
                "Granular doctor-level read access toggle controls.",
                "Zero data leakage: healthcare providers only see records with your consent.",
                "Continuous security audit tracking of access requests."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircle size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/2 w-full flex items-center justify-center">
            {/* Elegant security-themed graphic container */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/20 dark:border-emerald-500/35 animate-spin" style={{ animationDuration: "25s" }} />
              <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-cyan-500/20 dark:border-cyan-500/35 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
              
              <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-500/30 flex flex-col items-center justify-center shadow-xl shadow-emerald-500/5 glow-emerald">
                <Shield size={64} className="text-emerald-400 animate-bounce mb-3" style={{ animationDuration: "3s" }} />
                <span className="text-sm font-bold text-slate-900 dark:text-slate-200 tracking-wider">SECURE SHIELD</span>
                <span className="text-xs font-semibold text-emerald-500 dark:text-emerald-400 mt-1 uppercase">E2EE Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          FAQ SECTION (ACCORDION)
          ------------------------------------------------------------- */}
      <section id="faq" className="max-w-4xl mx-auto px-4 py-24 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-3 text-lg">
            Answers to general questions about security, records, and our platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200/60 dark:border-slate-800/40 rounded-xl bg-white/45 dark:bg-slate-950/25 glass overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-900 dark:text-white hover:text-cyan-500 focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-slate-400 transform transition-transform duration-300 ${
                    faqOpen === idx ? "rotate-180 text-cyan-500" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {faqOpen === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/30 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          CONTACT SECTION
          ------------------------------------------------------------- */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
        <div className="glass-premium rounded-3xl p-8 md:p-12 border border-slate-200/60 dark:border-slate-800/40 flex flex-col lg:flex-row gap-12 relative overflow-hidden">
          <div className="lg:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                Let's Connect
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-md">
                Have inquiries about integration, data security compliances, or partnerships? Message us anytime.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-cyan-500/10 text-cyan-500 rounded-xl">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Email Support</p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">hello@medilynk.ai</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Phone Helpline</p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">+1 (800) MEDI-LYNK</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Headquarters</p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">100 Cybernetic Pl, Suite 404, SF, CA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            {/* Simple simulated contact form */}
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your message has been received."); }} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john.doe@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you with your health records?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold rounded-xl shadow-md hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          FOOTER
          ------------------------------------------------------------- */}
      <footer className="border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg">
              <Activity size={18} />
            </div>
            <span className="font-extrabold text-lg text-slate-900 dark:text-white">MediLynk AI</span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs font-bold text-slate-400 tracking-wider uppercase">
            <button onClick={() => scrollToSection("hero")} className="hover:text-cyan-500 transition-colors">About</button>
            <button className="hover:text-cyan-500 transition-colors cursor-not-allowed">Privacy Policy</button>
            <button className="hover:text-cyan-500 transition-colors cursor-not-allowed">Terms of Service</button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-cyan-500 transition-colors">Contact</button>
          </div>

          <p className="text-xs text-slate-400 font-semibold">
            © {new Date().getFullYear()} MediLynk AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

// -------------------------------------------------------------
// HELPER ARRAYS
// -------------------------------------------------------------
const featureCards = [
  {
    icon: <Activity size={24} />,
    title: "Unified Health Records",
    desc: "Maintain a singular comprehensive digital history of consultations, diagnosis, vitals, surgeries, and reports.",
    grad: "from-cyan-500 to-cyan-600"
  },
  {
    icon: <Brain size={24} />,
    title: "AI Health Summary",
    desc: "Instantly parse complex medical jargon into easy-to-understand key summaries and clinical insights.",
    grad: "from-blue-500 to-blue-600"
  },
  {
    icon: <Clock size={24} />,
    title: "Medical Timeline",
    desc: "A fluid, chronological interactive flow of all clinical events. Drill down into specific appointments instantly.",
    grad: "from-emerald-500 to-emerald-600"
  },
  {
    icon: <Share2 size={24} />,
    title: "Secure Sharing",
    desc: "Toggle read-only clinical folder access to registered consulting doctors on a click. Absolute patient privacy.",
    grad: "from-teal-500 to-teal-600"
  },
  {
    icon: <Search size={24} />,
    title: "Smart Search",
    desc: "Retrieve records, diagnoses, and uploaded laboratory files instantly with multi-parameter filtering.",
    grad: "from-sky-500 to-sky-600"
  },
  {
    icon: <Cloud size={24} />,
    title: "Lifetime Cloud Storage",
    desc: "Safely host diagnostic scans, MRI reports, prescriptions, and vaccination cards in our resilient cloud storage.",
    grad: "from-purple-500 to-purple-600"
  },
  {
    icon: <Lock size={24} />,
    title: "E2E Encryption",
    desc: "Patient files are sealed with enterprise grade security. Unauthorized viewers cannot read any documents.",
    grad: "from-indigo-500 to-indigo-600"
  },
  {
    icon: <Users size={24} />,
    title: "Doctor Collaboration",
    desc: "Physicians view your timeline and can directly post follow-up consultation logs and active prescriptions.",
    grad: "from-pink-500 to-pink-600"
  }
];

const steps = [
  {
    icon: <UserCheck size={36} />,
    title: "Create Account",
    desc: "Register in under a minute as a patient or consulting physician."
  },
  {
    icon: <Cloud size={36} />,
    title: "Upload Health Files",
    desc: "Drag and drop prescriptions, blood reports, vaccinations, or scans."
  },
  {
    icon: <Share2 size={36} />,
    title: "Authorize Doctors",
    desc: "Instantly share clinical folders via secure temporary access keys."
  },
  {
    icon: <Brain size={36} />,
    title: "Get AI Insights",
    desc: "Recieve diagnostic summaries and automated medical terms translation."
  }
];

const aiCapabilities = [
  {
    icon: <Brain size={24} />,
    title: "AI Report Summaries",
    desc: "Converts long clinical texts, blood counts, or lab panels into concise summaries highlighting outlier markers."
  },
  {
    icon: <Users size={24} />,
    title: "Medical Jargon Translator",
    desc: "Translates complex vocabulary (e.g. 'auscultation of wheezing', 'arthroscopy follow-up') into plain english explanations."
  },
  {
    icon: <Clock size={24} />,
    title: "Timeline Trend Analysis",
    desc: "Plots vitals fluctuations, hypertension records, and lab variations chronologically to detect systemic anomalies."
  },
  {
    icon: <Search size={24} />,
    title: "Natural Language Search",
    desc: "Query clinical records in plain text, e.g. 'Show me when I took penicillin or when my knee was operated'."
  },
  {
    icon: <Activity size={24} />,
    title: "Personalized Action Plans",
    desc: "AI recommendations for sodium reduction, fluid intake levels, or physical therapy regimens derived from logs."
  },
  {
    icon: <Shield size={24} />,
    title: "Smart Document Sorting",
    desc: "Automatically extracts date, diagnostic area, and labels to organize PDFs, photos, and handwritten prescriptions."
  }
];
