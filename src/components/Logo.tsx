import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = "sm", animate = false }) => {
  // Dimensions based on size prop
  const dims = {
    sm: { width: 140, height: 36, iconSize: 32 },
    md: { width: 260, height: 180, iconSize: 90 },
    lg: { width: 440, height: 320, iconSize: 160 },
  }[size];

  // SVG Paths
  // Gold ribbon path (left leg and curve)
  const goldPath = "M 98,150 C 98,162 85,168 76,160 C 67,152 70,132 70,115 L 70,95 C 70,72 88,54 112,54 C 135,54 150,75 160,95";
  // Silver ribbon path (right leg and curve)
  const silverPath = "M 160,95 C 170,75 185,54 208,54 C 232,54 250,72 250,95 L 250,115 C 250,132 253,152 244,160 C 235,168 222,162 222,150";

  // Animation variants for the paths
  const drawVariant = {
    hidden: { strokeDasharray: "320", strokeDashoffset: "320" },
    visible: {
      strokeDashoffset: 0,
      transition: { duration: 2.0, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const plusVariant = {
    hidden: { opacity: 0, scale: 0.6, filter: "brightness(0.5) blur(2px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "brightness(1) blur(0px)",
      transition: { delay: 1.4, duration: 0.7, ease: "easeOut" }
    }
  };

  const tracerVariant = {
    hidden: { strokeDasharray: "100", strokeDashoffset: "100", opacity: 0 },
    visible: {
      strokeDashoffset: 0,
      opacity: 1,
      transition: { delay: 1.6, duration: 1.1, ease: "easeInOut" }
    }
  };

  const textVariant = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1.8, duration: 0.8, ease: "easeOut" }
    }
  };

  // SM size layout: Icon beside Text
  if (size === "sm") {
    return (
      <div className="flex items-center gap-2.5 select-none">
        <svg
          width={dims.iconSize}
          height={dims.iconSize}
          viewBox="0 0 320 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <defs>
            <linearGradient id="gold-grad-sm" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFE5A3" />
              <stop offset="50%" stopColor="#C59B3F" />
              <stop offset="100%" stopColor="#8F6515" />
            </linearGradient>
            <linearGradient id="silver-grad-sm" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#B0B5BC" />
              <stop offset="100%" stopColor="#6E737A" />
            </linearGradient>
            <filter id="gold-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* M - Gold Ribbon */}
          <path d={goldPath} stroke="url(#gold-grad-sm)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
          {/* M - Silver Ribbon */}
          <path d={silverPath} stroke="url(#silver-grad-sm)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />

          {/* Plus Sign */}
          <g transform="translate(160, 134)">
            <rect x="-13" y="-4.5" width="26" height="9" rx="2.5" fill="url(#gold-grad-sm)" />
            <rect x="-4.5" y="-13" width="9" height="26" rx="2.5" fill="url(#gold-grad-sm)" />
          </g>

          {/* Tracer path */}
          <path d="M 236 142 C 252 140 264 130 278 126" stroke="url(#gold-grad-sm)" strokeWidth="2.5" filter="url(#gold-glow-sm)" />
          <circle cx="278" cy="126" r="4.5" fill="#FFE5A3" filter="url(#gold-glow-sm)" />
        </svg>

        <span className="font-bold text-xl tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e2e8f0" }}>
          Medi<span style={{ color: "#C59B3F" }}>Lynk</span>{" "}
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#C59B3F]/40 ml-0.5 text-[#C59B3F]" style={{ background: "rgba(197, 155, 63, 0.08)" }}>AI</span>
        </span>
      </div>
    );
  }

  // MD and LG size layout: Centered Icon + Text Stacked
  return (
    <div className="flex flex-col items-center text-center select-none" style={{ width: dims.width }}>
      {/* Dynamic SVG Icon */}
      <svg
        width={dims.iconSize}
        height={dims.iconSize}
        viewBox="0 0 320 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`gold-grad-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE5A3" />
            <stop offset="45%" stopColor="#C59B3F" />
            <stop offset="70%" stopColor="#8F6515" />
            <stop offset="100%" stopColor="#FFE5A3" />
          </linearGradient>
          <linearGradient id={`silver-grad-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#B0B5BC" />
            <stop offset="70%" stopColor="#6E737A" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <filter id={`gold-glow-${size}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Gold half */}
        <motion.path
          d={goldPath}
          stroke={`url(#gold-grad-${size})`}
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={animate ? drawVariant : undefined}
          initial={animate ? "hidden" : undefined}
          animate={animate ? "visible" : undefined}
        />

        {/* Silver half */}
        <motion.path
          d={silverPath}
          stroke={`url(#silver-grad-${size})`}
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={animate ? drawVariant : undefined}
          initial={animate ? "hidden" : undefined}
          animate={animate ? "visible" : undefined}
        />

        {/* Plus sign */}
        <motion.g
          transform="translate(160, 134)"
          variants={animate ? plusVariant : undefined}
          initial={animate ? "hidden" : undefined}
          animate={animate ? "visible" : undefined}
        >
          <rect x="-13" y="-4.5" width="26" height="9" rx="2.5" fill={`url(#gold-grad-${size})`} />
          <rect x="-4.5" y="-13" width="9" height="26" rx="2.5" fill={`url(#gold-grad-${size})`} />
        </motion.g>

        {/* Tracer line path */}
        <motion.path
          d="M 236 142 C 252 140 264 130 278 126"
          stroke={`url(#gold-grad-${size})`}
          strokeWidth="2.5"
          filter={`url(#gold-glow-${size})`}
          variants={animate ? tracerVariant : undefined}
          initial={animate ? "hidden" : undefined}
          animate={animate ? "visible" : undefined}
        />

        {/* Tracer glowing head */}
        <motion.circle
          cx="278"
          cy="126"
          r="5"
          fill="#FFE5A3"
          filter={`url(#gold-glow-${size})`}
          variants={animate ? tracerVariant : undefined}
          initial={animate ? "hidden" : undefined}
          animate={animate ? "visible" : undefined}
        />
      </svg>

      {/* Brand Text Stack */}
      <motion.div
        variants={animate ? textVariant : undefined}
        initial={animate ? "hidden" : undefined}
        animate={animate ? "visible" : undefined}
        className="mt-6 flex flex-col items-center"
      >
        <div className="flex items-center gap-3">
          <span
            className="font-bold tracking-tight text-white"
            style={{
              fontSize: size === "lg" ? "2.6rem" : "1.7rem",
              fontFamily: "'Space Grotesk', sans-serif"
            }}
          >
            Medi<span style={{ color: "#C59B3F" }}>Lynk</span>
          </span>
          <span
            className="font-bold border border-[#C59B3F] text-[#C59B3F] rounded-lg tracking-wider"
            style={{
              fontSize: size === "lg" ? "1.2rem" : "0.85rem",
              padding: size === "lg" ? "2px 10px" : "1px 6px",
              background: "rgba(197, 155, 63, 0.06)",
              fontFamily: "'Space Grotesk', sans-serif"
            }}
          >
            AI
          </span>
        </div>

        {/* Slogan */}
        <p
          className="uppercase tracking-[0.25em] font-semibold mt-3.5"
          style={{
            fontSize: size === "lg" ? "0.68rem" : "0.55rem",
            color: "rgba(226, 232, 240, 0.45)",
            fontFamily: "'Space Grotesk', sans-serif"
          }}
        >
          — Unified Digital Health Record Platform —
        </p>
      </motion.div>
    </div>
  );
};
