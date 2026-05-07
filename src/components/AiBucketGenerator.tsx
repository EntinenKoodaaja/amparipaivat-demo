import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { generateBucketFromPrompt, AiServiceError } from '../services/aiService';
import BucketAnimation from './BucketAnimation';

interface Props {
  onResult: (ids: string[]) => void;
}

const LOADING_MESSAGES = [
  'AI kokoaa ämpäriäsi...',
  'Etsitään parhaita tuotteita...',
  'Tarkistetaan budjettia...',
  'Viimeistellään ämpäriä...',
];

const PROMPT_VINKIT = [
  'Festariämpäri kavereiden kanssa, budjetti 30€',
  'Saunailta kahdelle, halutaan myös herkkuja',
  'Päiväretki lapsiperheelle metsään',
];

export default function AiBucketGenerator({ onResult }: Props) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultIds, setResultIds] = useState<string[] | null>(null);
  const [animating, setAnimating] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);

  const cycleLoadingMessage = () => {
    const interval = window.setInterval(() => {
      setLoadingIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1400);
    return () => window.clearInterval(interval);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setError(null);
    setLoading(true);
    setLoadingIndex(0);
    const stopCycle = cycleLoadingMessage();

    try {
      const ids = await generateBucketFromPrompt(prompt);
      setResultIds(ids);
      onResult(ids);
      setAnimating(true);
    } catch (err) {
      const message =
        err instanceof AiServiceError
          ? err.message
          : 'Jokin meni pieleen. Yritä uudelleen.';
      setError(message);
    } finally {
      stopCycle();
      setLoading(false);
    }
  };

  return (
    <section
      id="ai"
      className="relative bg-tokmanni-red text-white overflow-hidden py-12 sm:py-16 md:py-20"
    >
      {/* dekoratiiviset taustaelementit */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-yellow-300 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <span className="inline-block bg-yellow-300 text-tokmanni-red font-black uppercase tracking-widest text-[10px] sm:text-xs px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4 shadow-md">
            ✨ AI-generaattori
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-3">
            Anna AI:n koota <br className="sm:hidden" />
            <span className="bg-white text-tokmanni-red px-3 py-0.5 rounded-xl inline-block rotate-[-1deg]">
              täydellinen ämpärisi
            </span>
          </h2>
          <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto">
            Kuvaile millaisen ämpärin haluat — AI valitsee parhaat tuotteet puolestasi.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white text-neutral-900 rounded-2xl p-4 sm:p-6 shadow-2xl"
        >
          <label htmlFor="ai-prompt" className="block text-sm font-black uppercase tracking-widest text-tokmanni-red mb-2">
            Kuvaile ämpärisi
          </label>
          <textarea
            id="ai-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="esim. festariämpäri kavereiden kanssa, budjetti 30€, tarvitsen hygieniatuotteita ja snackseja"
            rows={4}
            disabled={loading}
            className="w-full bg-neutral-50 border-2 border-neutral-200 focus:border-tokmanni-red focus:bg-white rounded-xl px-4 py-3 text-base outline-none transition-colors resize-none disabled:opacity-60"
            style={{ fontSize: '16px' }}
          />

          <div className="flex flex-wrap gap-2 mt-3">
            {PROMPT_VINKIT.map((vinkki) => (
              <button
                key={vinkki}
                type="button"
                onClick={() => setPrompt(vinkki)}
                disabled={loading}
                className="text-xs font-bold text-tokmanni-red bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full border border-red-200 transition-colors disabled:opacity-60"
              >
                💡 {vinkki}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 bg-red-50 border-2 border-tokmanni-red text-tokmanni-red font-bold px-4 py-3 rounded-xl text-sm"
              >
                ⚠️ {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="mt-5 w-full bg-tokmanni-red text-white font-black py-4 rounded-full uppercase tracking-wider text-base shadow-lg
              hover:bg-tokmanni-red-dark active:scale-[0.98] transition-all
              disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
              flex items-center justify-center gap-2"
          >
            {loading ? (
              <AnimatePresence mode="wait">
                <motion.span
                  key={loadingIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-2"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                    className="inline-block"
                  >
                    ✨
                  </motion.span>
                  {LOADING_MESSAGES[loadingIndex]}
                </motion.span>
              </AnimatePresence>
            ) : (
              <>Luo ämpäri ✨</>
            )}
          </button>

          {!prompt.trim() && !loading && (
            <p className="mt-3 text-center text-sm text-neutral-500">
              Kirjoita kuvaus tai valitse vinkki yllä ↑
            </p>
          )}
        </form>
      </div>

      {/* Animaatio AI-vastauksen tultua */}
      {resultIds && (
        <BucketAnimation
          open={animating}
          selectedIds={resultIds}
          onClose={() => {
            setAnimating(false);
            setTimeout(() => {
              document.getElementById('ai-result')?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
          }}
        />
      )}
    </section>
  );
}
