import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = "sm",
  animate = false,
  className = "",
}) => {
  // Dimensions based on size prop
  const dims = {
    sm: { width: 140, height: 36, iconSize: 32, fontSize: "1.25rem", badgeSize: "10px" },
    md: { width: 260, height: 180, iconSize: 90, fontSize: "1.7rem", badgeSize: "0.85rem" },
    lg: { width: 440, height: 320, iconSize: 160, fontSize: "2.6rem", badgeSize: "1.2rem" },
  }[size] || { width: 140, height: 36, iconSize: 32, fontSize: "1.25rem", badgeSize: "10px" };

  // SVG Path coordinates for MediLynk M-emblem
  const cyanPath = "M 98,150 C 98,162 85,168 76,160 C 67,152 70,132 70,115 L 70,95 C 70,72 88,54 112,54 C 135,54 150,75 160,95";
  const bluePath = "M 160,95 C 170,75 185,54 208,54 C 232,54 250,72 250,95 L 250,115 C 250,132 253,152 244,160 C 235,168 222,162 222,150";

  // Unique SVG IDs
  const cyanGradId = `medilynk-cyan-grad-${size}`;
  const blueGradId = `medilynk-blue-grad-${size}`;
  const cyanGlowId = `medilynk-cyan-glow-${size}`;

  if (size === "sm") {
    return (
      <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
        <svg
          width={dims.iconSize}
          height={dims.iconSize}
          viewBox="0 0 320 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 ${animate ? "animate-pulse" : ""}`}
        >
          <defs>
            <linearGradient id={cyanGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="50%" stopColor="#00C9A7" />
              <stop offset="100%" stopColor="#0088A8" />
            </linearGradient>
            <linearGradient id={blueGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38B6FF" />
              <stop offset="50%" stopColor="#0077FF" />
              <stop offset="100%" stopColor="#0044CC" />
            </linearGradient>
            <filter id={cyanGlowId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* M-Ribbon Paths */}
          <path d={cyanPath} stroke={`url(#${cyanGradId})`} strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
          <path d={bluePath} stroke={`url(#${blueGradId})`} strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />

          {/* Plus Sign */}
          <g transform="translate(160, 134)">
            <rect x="-13" y="-4.5" width="26" height="9" rx="2.5" fill={`url(#${cyanGradId})`} />
            <rect x="-4.5" y="-13" width="9" height="26" rx="2.5" fill={`url(#${cyanGradId})`} />
          </g>

          {/* Glowing Tracer */}
          <path d="M 236 142 C 252 140 264 130 278 126" stroke={`url(#${cyanGradId})`} strokeWidth="2.5" filter={`url(#${cyanGlowId})`} />
          <circle cx="278" cy="126" r="4.5" fill="#00E5FF" filter={`url(#${cyanGlowId})`} />
        </svg>

        <span className="font-bold tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: dims.fontSize }}>
          Medi<span style={{ color: "#38B6FF" }}>Lynk</span>{" "}
          <span className="font-bold px-1.5 py-0.5 rounded border border-[#38B6FF]/40 ml-0.5 text-[#38B6FF]" style={{ fontSize: dims.badgeSize, background: "rgba(56, 182, 255, 0.08)" }}>
            AI
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`} style={{ width: dims.width }}>
      <svg
        width={dims.iconSize}
        height={dims.iconSize}
        viewBox="0 0 320 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={animate ? "animate-pulse" : ""}
      >
        <defs>
          <linearGradient id={cyanGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="45%" stopColor="#00C9A7" />
            <stop offset="70%" stopColor="#0088A8" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>
          <linearGradient id={blueGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38B6FF" />
            <stop offset="45%" stopColor="#0077FF" />
            <stop offset="70%" stopColor="#0044CC" />
            <stop offset="100%" stopColor="#38B6FF" />
          </linearGradient>
          <filter id={cyanGlowId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Cyan Ribbon */}
        <path d={cyanPath} stroke={`url(#${cyanGradId})`} strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />

        {/* Blue Ribbon */}
        <path d={bluePath} stroke={`url(#${blueGradId})`} strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />

        {/* Plus Sign */}
        <g transform="translate(160, 134)">
          <rect x="-13" y="-4.5" width="26" height="9" rx="2.5" fill={`url(#${cyanGradId})`} />
          <rect x="-4.5" y="-13" width="9" height="26" rx="2.5" fill={`url(#${cyanGradId})`} />
        </g>

        {/* Glowing Tracer */}
        <path d="M 236 142 C 252 140 264 130 278 126" stroke={`url(#${cyanGradId})`} strokeWidth="2.5" filter={`url(#${cyanGlowId})`} />
        <circle cx="278" cy="126" r="5" fill="#00E5FF" filter={`url(#${cyanGlowId})`} />
      </svg>

      {/* Brand Text Stack */}
      <div className="mt-4 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <span
            className="font-bold tracking-tight text-white"
            style={{
              fontSize: dims.fontSize,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Medi<span style={{ color: "#38B6FF" }}>Lynk</span>
          </span>
          <span
            className="font-bold border border-[#38B6FF] text-[#38B6FF] rounded-lg tracking-wider"
            style={{
              fontSize: dims.badgeSize,
              padding: size === "lg" ? "2px 10px" : "1px 6px",
              background: "rgba(56, 182, 255, 0.06)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            AI
          </span>
        </div>

        {/* Slogan */}
        <p
          className="uppercase tracking-[0.25em] font-semibold mt-2.5"
          style={{
            fontSize: size === "lg" ? "0.68rem" : "0.55rem",
            color: "rgba(226, 232, 240, 0.45)",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          — Unified Digital Health Record Platform —
        </p>
      </div>
    </div>
  );
};

export default Logo;
