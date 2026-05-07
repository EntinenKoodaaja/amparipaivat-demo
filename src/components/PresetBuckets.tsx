import { motion } from 'framer-motion';
import { presetBuckets } from '../data/presetBuckets';
import { products } from '../data/products';
import TokmanniBucket from './TokmanniBucket';

interface Props {
  onSelect: (ids: string[]) => void;
}

const THEME_EMOJIS: Record<string, string> = {
  festari: '🎪',
  sauna: '🧖',
  retki: '⛺',
};

export default function PresetBuckets({ onSelect }: Props) {
  return (
    <section id="valmiit" className="bg-neutral-50 py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="mb-6 sm:mb-10">
          <span className="inline-block bg-white border-2 border-tokmanni-red text-tokmanni-red font-black uppercase tracking-widest text-[10px] sm:text-xs px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3">
            Valmiit ämpärit
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
            Valitse valmis <span className="text-tokmanni-red">teemaämpäri</span>
          </h2>
          <p className="mt-2 text-neutral-500 text-base sm:text-lg max-w-xl">
            Asiantuntijat ovat koonneet parhaat yhdistelmät — yksi klikkaus ja olet valmis.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {presetBuckets.map((bucket) => {
            const bucketProducts = products.filter((p) =>
              bucket.tuoteIdt.includes(p.id),
            );
            const total = bucketProducts.reduce((sum, p) => sum + p.hinta, 0);

            return (
              <motion.div
                key={bucket.id}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md border-2 flex flex-col cursor-default"
                style={{ borderColor: bucket.teemaväri }}
              >
                {/* Värillinen header */}
                <div
                  className="px-6 pt-6 pb-5 text-white"
                  style={{ backgroundColor: bucket.teemaväri }}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -6, 0] }}
                    transition={{ duration: 0.5 }}
                    className="mb-3 inline-block"
                  >
                    <div className="relative inline-block">
                      <TokmanniBucket className="h-20 w-auto drop-shadow-md" />
                      <span className="absolute -top-1 -right-3 text-2xl leading-none">
                        {THEME_EMOJIS[bucket.id]}
                      </span>
                    </div>
                  </motion.div>
                  <h3 className="font-black text-2xl leading-tight">{bucket.nimi}</h3>
                  <p className="text-white/85 text-sm mt-1 leading-snug">{bucket.kuvaus}</p>
                </div>

                {/* Tuotelista */}
                <div className="px-6 py-5 flex-1">
                  <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-3">
                    Sisältää ({bucketProducts.length} tuotetta)
                  </p>
                  <ul className="space-y-2">
                    {bucketProducts.map((p) => (
                      <li key={p.id} className="flex items-center gap-2">
                        <span className="text-lg leading-none">{p.ikoni}</span>
                        <span className="flex-1 text-sm text-neutral-700 font-medium leading-tight">
                          {p.nimi}
                        </span>
                        <span className="text-sm font-bold text-neutral-500">
                          {p.hinta.toFixed(2)} €
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer: hinta + nappi */}
                <div className="px-6 pb-6">
                  <div className="flex items-baseline justify-between mb-4 pt-4 border-t border-neutral-100">
                    <span className="text-sm font-bold text-neutral-500 uppercase tracking-wide">
                      Yhteensä
                    </span>
                    <span
                      className="text-3xl font-black"
                      style={{ color: bucket.teemaväri }}
                    >
                      {total.toFixed(2).replace('.', ',')} €
                    </span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelect(bucket.tuoteIdt)}
                    className="w-full text-white font-black py-3 rounded-full uppercase tracking-wider text-sm shadow-md transition-opacity hover:opacity-90"
                    style={{ backgroundColor: bucket.teemaväri }}
                  >
                    Valitse tämä →
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
