import { useId } from 'react';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export default function TokmanniBucket({ className = '', style }: Props) {
  const raw = useId();
  const u = raw.replace(/[^a-zA-Z0-9]/g, '');

  return (
    <svg
      viewBox="0 0 200 245"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block', ...style }}
      aria-label="Tokmanni-ämpäri"
    >
      <defs>
        {/* Main body: dark left edge → bright left-center highlight zone → medium right → dark right edge */}
        <linearGradient id={`${u}b`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#880007" />
          <stop offset="12%" stopColor="#B8000C" />
          <stop offset="30%" stopColor="#E3000F" />
          <stop offset="52%" stopColor="#E3000F" />
          <stop offset="72%" stopColor="#C8000C" />
          <stop offset="100%" stopColor="#820008" />
        </linearGradient>

        {/* Top rim: brighter, lighter */}
        <linearGradient id={`${u}rt`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A00009" />
          <stop offset="30%" stopColor="#FF3040" />
          <stop offset="55%" stopColor="#E81525" />
          <stop offset="100%" stopColor="#990009" />
        </linearGradient>

        {/* Rim inner shadow */}
        <linearGradient id={`${u}ri`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#700006" />
          <stop offset="50%" stopColor="#990009" />
          <stop offset="100%" stopColor="#500004" />
        </linearGradient>

        {/* Bottom */}
        <linearGradient id={`${u}bt`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5A0005" />
          <stop offset="50%" stopColor="#780007" />
          <stop offset="100%" stopColor="#3A0003" />
        </linearGradient>

        {/* Handle: metallic silver */}
        <linearGradient id={`${u}hd`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E0E0E0" />
          <stop offset="40%" stopColor="#C0C0C0" />
          <stop offset="100%" stopColor="#707070" />
        </linearGradient>

        {/* Ring */}
        <radialGradient id={`${u}rg`} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#707070" />
        </radialGradient>

        {/* Specular highlight: soft radial glow for the big bright spot */}
        <radialGradient id={`${u}sp`} cx="40%" cy="28%" r="55%">
          <stop offset="0%" stopColor="white" stopOpacity="0.38" />
          <stop offset="60%" stopColor="white" stopOpacity="0.10" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <filter id={`${u}sh`} x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="3" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Handle — behind body */}
      <path
        d="M 66,78 C 66,12 134,12 134,78"
        fill="none"
        stroke={`url(#${u}hd)`}
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Handle edge highlight */}
      <path
        d="M 66,78 C 66,12 134,12 134,78"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Body + rim + bottom with drop shadow */}
      <g filter={`url(#${u}sh)`}>
        {/* Body */}
        <path d="M 36,76 L 164,76 L 148,212 L 52,212 Z" fill={`url(#${u}b)`} />

        {/* Big specular highlight — the main 3D-realism element */}
        <path d="M 36,76 L 164,76 L 148,212 L 52,212 Z" fill={`url(#${u}sp)`} />

        {/* Crisp left-side gloss strip */}
        <path
          d="M 48,88 C 57,85 68,85 72,91 L 64,200 C 55,198 46,193 41,183 Z"
          fill="white"
          opacity="0.16"
        />

        {/* Thin bright edge highlight on left rim of body */}
        <path
          d="M 36,76 L 50,76 L 55,100 L 40,98 Z"
          fill="white"
          opacity="0.10"
        />

        {/* Top rim */}
        <ellipse cx="100" cy="74" rx="64" ry="13" fill={`url(#${u}rt)`} />
        {/* Rim top highlight */}
        <ellipse cx="90" cy="70" rx="40" ry="5" fill="white" opacity="0.18" />
        {/* Rim inner shadow */}
        <ellipse cx="100" cy="78" rx="57" ry="9" fill={`url(#${u}ri)`} opacity="0.7" />

        {/* Bottom */}
        <ellipse cx="100" cy="212" rx="48" ry="9" fill={`url(#${u}bt)`} />
        {/* Bottom edge darkening */}
        <ellipse cx="100" cy="214" rx="44" ry="5" fill="#200001" opacity="0.3" />
      </g>

      {/* Handle rings — on top of body */}
      <circle cx="66" cy="76" r="8" fill={`url(#${u}rg)`} />
      <circle cx="66" cy="76" r="4" fill="#D8D8D8" />
      <circle cx="134" cy="76" r="8" fill={`url(#${u}rg)`} />
      <circle cx="134" cy="76" r="4" fill="#D8D8D8" />

      {/* TOKMANNI */}
      <text
        x="100"
        y="144"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontFamily="'Arial Black','Helvetica Neue',sans-serif"
        fontSize="22"
        fontWeight="900"
        letterSpacing="-0.5"
      >
        TOKMANNI
      </text>

      {/* Slogan */}
      <text
        x="100"
        y="170"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="rgba(255,255,255,0.72)"
        fontFamily="Arial,sans-serif"
        fontSize="7.5"
        letterSpacing="0.3"
      >
        Fiksun ostamisen puolesta
      </text>
    </svg>
  );
}
