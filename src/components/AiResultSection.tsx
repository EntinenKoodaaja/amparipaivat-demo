import { motion } from 'framer-motion';
import { products, BONUS_PRODUCT } from '../data/products';
import TokmanniBucket from './TokmanniBucket';

interface Props {
  selectedIds: string[];
  onEdit: () => void;
  onCheckout: () => void;
}

export default function AiResultSection({ selectedIds, onEdit, onCheckout }: Props) {
  const selectedProducts = products.filter((p) => selectedIds.includes(p.id));
  const hasBonus = selectedProducts.length >= 5;
  const bucketCost = hasBonus ? 0 : 3.99;
  const total = selectedProducts.reduce((sum, p) => sum + p.hinta, 0) + bucketCost;

  const orbitProducts = selectedProducts.slice(0, 6);

  return (
    <section id="ai-result" className="bg-white py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Otsikko */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-yellow-300 text-tokmanni-red font-black uppercase tracking-widest text-xs px-4 py-1.5 rounded-full mb-4 shadow-md"
          >
            ✨ AI kokosi ämpärisi
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black leading-tight"
          >
            Valmis ämpärisi{' '}
            <span className="text-tokmanni-red">on täällä!</span>
          </motion.h2>
        </div>

        {/* Ämpäri + tuotteet orbitissa */}
        <div className="flex flex-col items-center mb-14">
          <div className="relative flex items-center justify-center w-64 h-64 mb-6">
            {orbitProducts.map((p, i) => {
              const angle = (i / orbitProducts.length) * 360 - 90;
              const rad = (angle * Math.PI) / 180;
              const r = 100;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 200 }}
                  className="absolute text-3xl select-none"
                  style={{
                    left: `calc(50% + ${Math.cos(rad) * r}px - 20px)`,
                    top: `calc(50% + ${Math.sin(rad) * r}px - 20px)`,
                  }}
                >
                  {p.ikoni}
                </motion.div>
              );
            })}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 160 }}
            >
              <TokmanniBucket className="h-36 w-auto drop-shadow-2xl" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-2xl font-black text-neutral-900">
              {selectedProducts.length} tuotetta
            </p>
            <p className="text-tokmanni-red font-black text-xl">
              {total.toFixed(2).replace('.', ',')} €
            </p>
          </motion.div>
        </div>

        {/* Tuotekortit */}
        <div className="mb-12">
          <h3 className="text-2xl font-black mb-6 text-neutral-900">
            AI valitsi nämä tuotteet ämpäriisi
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {selectedProducts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="bg-neutral-50 rounded-2xl p-4 border-2 border-neutral-100 flex items-center gap-3 hover:border-tokmanni-red hover:shadow-md transition-all"
              >
                <span className="text-3xl leading-none">{p.ikoni}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate text-neutral-800">{p.nimi}</p>
                  <p className="text-xs text-neutral-500 truncate">{p.kuvaus}</p>
                  <p className="text-tokmanni-red font-black text-sm mt-0.5">
                    {p.hinta.toFixed(2).replace('.', ',')} €
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Bonus-ämpäri — vain ≥5 tuotteella */}
            {hasBonus && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + selectedProducts.length * 0.06 }}
                className="bg-yellow-50 rounded-2xl p-4 border-2 border-yellow-300 flex items-center gap-3"
              >
                <span className="text-3xl leading-none">{BONUS_PRODUCT.ikoni}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate text-neutral-800">{BONUS_PRODUCT.nimi}</p>
                  <p className="text-xs text-neutral-500 truncate">{BONUS_PRODUCT.kuvaus}</p>
                  <p className="text-green-600 font-black text-sm mt-0.5">Ilmainen! 🎁</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Toimintopainikkeet */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onEdit}
            className="inline-flex justify-center items-center border-2 border-tokmanni-red text-tokmanni-red font-black px-8 py-4 rounded-full uppercase tracking-wider hover:bg-red-50 transition-colors"
          >
            Muokkaa ämpäriä
          </button>
          <button
            onClick={onCheckout}
            className="inline-flex justify-center items-center bg-tokmanni-red text-white font-black px-8 py-4 rounded-full uppercase tracking-wider shadow-lg hover:bg-tokmanni-red-dark hover:scale-105 active:scale-95 transition-all"
          >
            Siirry kassalle →
          </button>
        </motion.div>

      </div>
    </section>
  );
}
