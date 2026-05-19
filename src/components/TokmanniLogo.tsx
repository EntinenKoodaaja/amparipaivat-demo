import { useLayoutEffect, useRef, useState } from 'react';

interface Props {
  className?: string;
}

export default function TokmanniLogo({ className }: Props) {
  const color = '#E3000F';
  const h = 64;
  const r = h * 0.38;
  const gap = h * 0.02;       // tiivis välimatka T-O-KMANNI
  const tWidthFallback = h * 0.55; // arvio jos getBBox ei vielä ole ajettu

  // Mittaa T-kirjaimen todellinen leveys renderöinnin jälkeen, jotta O istuu
  // tiiviisti T:n vieressä riippumatta käytetystä fontista (Arial Black vs
  // Impact vs system fallback)
  const tRef = useRef<SVGTextElement>(null);
  const [tWidth, setTWidth] = useState(tWidthFallback);

  useLayoutEffect(() => {
    // getBBox on saatavilla vain oikeassa selainympäristössä, ei jsdomissa
    const measured = tRef.current?.getBBox?.().width;
    if (measured && measured > 0) setTWidth(measured);
  }, []);

  const cx = tWidth + gap + r;
  const cy = h * 0.48;

  return (
    <svg
      viewBox={`0 0 520 ${h}`}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Tokmanni"
      className={className}
      style={{ width: 'auto', display: 'block' }}
    >
      {/* T */}
      <text
        ref={tRef}
        x="0"
        y={h * 0.82}
        fontFamily="'Arial Black','Impact','Helvetica Neue',sans-serif"
        fontSize={h}
        fontWeight="900"
        fill={color}
        letterSpacing="-1"
      >
        T
      </text>

      {/* Target O */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={h * 0.14} />
      <circle cx={cx} cy={cy} r={r * 0.28} fill={color} />

      {/* KMANNI */}
      <text
        x={cx + r + gap}
        y={h * 0.82}
        fontFamily="'Arial Black','Impact','Helvetica Neue',sans-serif"
        fontSize={h}
        fontWeight="900"
        fill={color}
        letterSpacing="-1"
      >
        KMANNI
      </text>
    </svg>
  );
}
