import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { products, type Product } from '../data/products';
import TokmanniBucket from './TokmanniBucket';

interface Props {
  open: boolean;
  selectedIds: string[];
  onClose: () => void;
  onCheckout?: () => void;
}

const CONFETTI_COLORS = ['#E3000F', '#FFD93D', '#FF6B9D', '#27AE60', '#3498DB', '#FFFFFF'];

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

export default function BucketAnimation({ open, selectedIds, onClose, onCheckout }: Props) {
  const items: Product[] = useMemo(
    () => products.filter((p) => selectedIds.includes(p.id)),
    [selectedIds],
  );

  const [phase, setPhase] = useState<'flying' | 'shake' | 'confetti'>('flying');

  // Confetti-paloja generoidaan kerran per avaus
  const confetti = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: randomBetween(-300, 300),
        y: randomBetween(-500, -200),
        rotate: randomBetween(-360, 360),
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: randomBetween(0, 0.4),
        size: randomBetween(8, 16),
      })),
    [open],
  );

  // Vaihevaihtelut: tuotteet lentää → ämpäri tärisee → konfetit
  useEffect(() => {
    if (!open) {
      setPhase('flying');
      return;
    }
    const flightDuration = 0.4 * items.length + 800; // ms
    const t1 = window.setTimeout(() => setPhase('shake'), flightDuration);
    const t2 = window.setTimeout(() => setPhase('confetti'), flightDuration + 500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [open, items.length]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-tokmanni-red/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Tausta: aurinkoinen sädekehä */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vmax] h-[120vmax] opacity-20"
              style={{
                background:
                  'repeating-conic-gradient(from 0deg, #FFD93D 0deg 20deg, transparent 20deg 40deg)',
              }}
            />
          </motion.div>

          {/* Sulje-nappi */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-tokmanni-red font-black text-xl shadow-lg hover:scale-110 transition-transform z-10"
            aria-label="Sulje"
          >
            ×
          </button>

          {/* Lavastus */}
          <div className="relative w-full max-w-2xl h-[80vh] sm:h-[600px] px-4 flex items-end justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lentävät tuotteet */}
            {items.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{
                  x: randomBetween(-180, 180),
                  y: -400,
                  rotate: randomBetween(-180, 180),
                  scale: 1.4,
                  opacity: 0,
                }}
                animate={{
                  x: randomBetween(-30, 30),
                  y: -120,
                  rotate: randomBetween(-15, 15),
                  scale: 0.5,
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.18,
                  ease: [0.25, 1.5, 0.5, 1],
                  opacity: { times: [0, 0.2, 0.8, 1], duration: 0.9, delay: i * 0.18 },
                }}
                className="absolute bottom-28 sm:bottom-32 text-5xl sm:text-6xl drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' }}
              >
                {p.ikoni}
              </motion.div>
            ))}

            {/* Ämpäri */}
            <motion.div
              className="relative z-10"
              animate={
                phase === 'shake'
                  ? { rotate: [0, -8, 8, -6, 6, -3, 3, 0], y: [0, -10, 0, -8, 0] }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <TokmanniBucket className="h-40 sm:h-56 w-auto drop-shadow-2xl" />

                {/* "Täyttyminen" — keltainen ylivuoto-glow ämpärin yläpuolella */}
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: Math.min(1, items.length / 8),
                    opacity: 0.6,
                  }}
                  transition={{
                    duration: 0.4 * items.length,
                    ease: 'easeOut',
                  }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-12 w-32 h-20 origin-bottom rounded-full bg-yellow-300 blur-2xl"
                />
              </div>

              {/* Hyppivä laskuri */}
              <motion.div
                key={phase}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: phase === 'confetti' ? [1, 1.2, 1] : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-8 bg-yellow-300 text-tokmanni-red font-black text-xl sm:text-2xl rounded-full w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center shadow-xl border-4 border-white"
              >
                {items.length}
              </motion.div>
            </motion.div>

            {/* Confetti */}
            {phase === 'confetti' &&
              confetti.map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                  animate={{ x: c.x, y: c.y, rotate: c.rotate, opacity: 0 }}
                  transition={{ duration: 1.6, delay: c.delay, ease: 'easeOut' }}
                  className="absolute bottom-40 left-1/2 rounded-sm"
                  style={{
                    width: c.size,
                    height: c.size * 0.4,
                    backgroundColor: c.color,
                  }}
                />
              ))}

            {/* Onnistumisteksti */}
            <AnimatePresence>
              {phase === 'confetti' && (
                <motion.div
                  initial={{ y: 50, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="absolute top-6 sm:top-12 left-1/2 -translate-x-1/2 text-center w-[90%] sm:w-auto"
                >
                  <div className="bg-white text-tokmanni-red font-black text-2xl sm:text-3xl md:text-5xl px-5 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-2xl rotate-[-2deg] tracking-tight">
                    Ämpäri kasattu! 🎉
                  </div>
                  <p className="text-white font-bold mt-3 sm:mt-4 text-base sm:text-lg">
                    Halvalla hyvää kesää! ☀️
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Jatka-nappi confetti-vaiheessa */}
          <AnimatePresence>
            {phase === 'confetti' && (
              <motion.button
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                  onCheckout?.();
                }}
                className="absolute bottom-6 sm:bottom-10 bg-white text-tokmanni-red font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-full uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-transform text-sm sm:text-base"
              >
                Jatka tilaukseen →
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
