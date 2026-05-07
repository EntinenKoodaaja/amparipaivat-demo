import { useId } from 'react';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export default function TokmanniBucket({ className = '', style }: Props) {
  const raw = useId();
  const u = raw.replace(/[^a-zA-Z0-9]/g, '');

  const RED = '#E3000F';
  const RED_DARK = '#B8000C';
  const RED_DARKER = '#820008';

  // TOKMANNI-tekstin asettelu (target-O TokmanniLogon tyyliin)
  const fs = 20;
  const tWidth = fs * 0.62;
  const oR = fs * 0.36;
  const kWidth = fs * 3.05;
  const gap = fs * 0.08;
  const totalW = tWidth + gap + 2 * oR + gap + kWidth;
  const startX = 100 - totalW / 2;
  const baseY = 158;
  const oCx = startX + tWidth + gap + oR;
  const oCy = baseY - fs * 0.34;

  return (
    <svg
      viewBox="0 0 200 245"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block', ...style }}
      aria-label="Tokmanni-ämpäri"
    >
      <defs>
        {/* Hienovarainen kylkivarjostus — kiinteä, ei läpikuultava */}
        <linearGradient id={`${u}body`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={RED_DARK} />
          <stop offset="25%" stopColor={RED} />
          <stop offset="75%" stopColor={RED} />
          <stop offset="100%" stopColor={RED_DARK} />
        </linearGradient>

        <filter id={`${u}sh`} x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="2" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* Punainen rautalanka-kahva — rungon takana */}
      <path
        d="M 60,76 C 60,18 140,18 140,76"
        fill="none"
        stroke={RED_DARK}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Runko + vanne + pohja varjostuksella */}
      <g filter={`url(#${u}sh)`}>
        {/* Kapeneva runko, pyöristetty pohja */}
        <path
          d="M 32,82 L 168,82 L 152,222 Q 100,232 48,222 Z"
          fill={`url(#${u}body)`}
        />

        {/* Vasemman reunan pehmeä korostus */}
        <path
          d="M 48,92 Q 56,90 62,92 L 58,212 Q 52,212 46,210 Z"
          fill="white"
          opacity="0.09"
        />

        {/* Vanne — kerrokset (ulkoreuna tumma, vanne kirkas, sisäpuoli tumma) */}
        <ellipse cx="100" cy="82" rx="68" ry="13" fill={RED_DARK} />
        <ellipse cx="100" cy="80" rx="68" ry="10" fill={RED} />
        <ellipse cx="100" cy="82" rx="58" ry="8" fill={RED_DARKER} />
        <ellipse cx="100" cy="81" rx="58" ry="5" fill="#5A0004" opacity="0.7" />
      </g>

      {/* Kahvan kiinnitysrenkaat */}
      <circle cx="60" cy="80" r="3.2" fill={RED_DARKER} />
      <circle cx="140" cy="80" r="3.2" fill={RED_DARKER} />

      {/* TOKMANNI — T + target-O + KMANNI */}
      {/* T */}
      <text
        x={startX}
        y={baseY}
        fontFamily="'Arial Black','Impact','Helvetica Neue',sans-serif"
        fontSize={fs}
        fontWeight="900"
        fill="white"
        letterSpacing="-0.5"
      >
        T
      </text>
      {/* Target O */}
      <circle cx={oCx} cy={oCy} r={oR} fill="none" stroke="white" strokeWidth={fs * 0.14} />
      <circle cx={oCx} cy={oCy} r={oR * 0.28} fill="white" />
      {/* KMANNI */}
      <text
        x={oCx + oR + gap}
        y={baseY}
        fontFamily="'Arial Black','Impact','Helvetica Neue',sans-serif"
        fontSize={fs}
        fontWeight="900"
        fill="white"
        letterSpacing="-0.5"
      >
        KMANNI
      </text>

      {/* Slogan */}
      <text
        x="100"
        y="178"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontFamily="Arial,sans-serif"
        fontSize="7"
        letterSpacing="0.2"
      >
        Fiksun ostamisen puolesta
      </text>
    </svg>
  );
}
