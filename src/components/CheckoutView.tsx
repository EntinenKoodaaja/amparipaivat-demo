import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Product } from '../data/products';
import { BONUS_PRODUCT } from '../data/products';
import TokmanniBucket from './TokmanniBucket';

interface Props {
  selectedProducts: Product[];
  bucketName: string;
  onBack: () => void;
}

type Delivery = 'store' | 'home';

const DELIVERY_OPTIONS = [
  {
    id: 'store' as Delivery,
    ikoni: '🏪',
    nimi: 'Nouda myymälästä',
    teksti: 'Nouda lähimmästä Tokmannista',
    hinta: 0,
    hintateksti: 'Ilmainen',
    alaotsikko: 'Valmis noudettavaksi 2h sisällä',
  },
  {
    id: 'home' as Delivery,
    ikoni: '🚚',
    nimi: 'Kotiinkuljetus',
    teksti: 'Toimitus suoraan ovellesi',
    hinta: 5.99,
    hintateksti: '+ 5,99 €',
    alaotsikko: 'Toimitus 1–3 arkipäivää',
  },
];

const containerVariants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] as const, staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function CheckoutView({ selectedProducts, bucketName, onBack }: Props) {
  const [delivery, setDelivery] = useState<Delivery>('store');
  const [ordered, setOrdered] = useState(false);

  const hasBonus = selectedProducts.length >= 5;
  const bucketCost = hasBonus ? 0 : 3.99;
  const productsTotal = selectedProducts.reduce((sum, p) => sum + p.hinta, 0);
  const deliveryCost = delivery === 'home' ? 5.99 : 0;
  const grandTotal = productsTotal + bucketCost + deliveryCost;

  const fmt = (n: number) => `${n.toFixed(2).replace('.', ',')} €`;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-neutral-50"
    >
      <div className="max-w-2xl mx-auto px-5 sm:px-6 py-6 sm:py-10">

        {/* Takaisin-linkki */}
        <motion.button
          variants={itemVariants}
          onClick={onBack}
          className="flex items-center gap-2 text-tokmanni-red font-bold hover:opacity-70 transition-opacity mb-8"
        >
          ← Muokkaa ämpäriä
        </motion.button>

        {/* 1. TILAUKSEN YHTEENVETO */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl border-2 border-neutral-100 shadow-sm overflow-hidden mb-6">
          <div className="bg-tokmanni-red px-5 sm:px-6 py-4 sm:py-5">
            <h1 className="text-white font-black text-xl sm:text-2xl md:text-3xl leading-tight flex items-center gap-2 sm:gap-3">
              Sinun ämpärisi <TokmanniBucket className="h-7 sm:h-9 w-auto" />
            </h1>
            {bucketName && bucketName !== 'Oma ämpäri' && (
              <p className="text-white/80 font-bold mt-1">{bucketName}</p>
            )}
          </div>

          <ul className="divide-y divide-neutral-100 px-5 sm:px-6">
            {selectedProducts.map((p) => (
              <li key={p.id} className="flex items-center gap-3 py-3">
                <span aria-hidden="true" className="text-xl leading-none">{p.ikoni}</span>
                <span className="flex-1 font-medium text-neutral-800">{p.nimi}</span>
                <span className="font-bold text-neutral-700">{fmt(p.hinta)}</span>
              </li>
            ))}
            {/* Ämpäri — ilmainen ≥5 tuotteella, muuten 3,99 € */}
            <li className={`flex items-center gap-3 py-3 -mx-5 sm:-mx-6 px-5 sm:px-6 ${hasBonus ? 'bg-yellow-50' : ''}`}>
              <TokmanniBucket className="h-7 w-auto flex-shrink-0" />
              <div className="flex-1">
                <span className="font-medium text-neutral-800">{BONUS_PRODUCT.nimi}</span>
                {hasBonus && (
                  <span className="ml-2 text-xs font-black text-yellow-600 uppercase tracking-wide">Kampanjaetu</span>
                )}
              </div>
              {hasBonus
                ? <span className="font-black text-green-600">Ilmainen</span>
                : <span className="font-black text-neutral-700">{fmt(bucketCost)}</span>
              }
            </li>
          </ul>

          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-t-2 border-neutral-100 bg-neutral-50">
            <span className="font-black text-neutral-700 uppercase tracking-wide text-xs sm:text-sm">
              Tuotteet yhteensä
            </span>
            <span className="text-xl sm:text-2xl font-black text-tokmanni-red">{fmt(productsTotal)}</span>
          </div>
        </motion.div>

        {/* 2. TOIMITUSTAPA */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="font-black text-lg sm:text-xl mb-3 text-neutral-900">Toimitustapa</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {DELIVERY_OPTIONS.map((opt) => {
              const isSelected = delivery === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setDelivery(opt.id)}
                  className={`text-left rounded-2xl border-2 p-4 sm:p-5 transition-all ${
                    isSelected
                      ? 'border-tokmanni-red bg-red-50'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span aria-hidden="true" className="text-3xl leading-none">{opt.ikoni}</span>
                    <span
                      className={`font-black text-lg ${
                        isSelected ? 'text-tokmanni-red' : 'text-neutral-700'
                      }`}
                    >
                      {opt.hintateksti}
                    </span>
                  </div>
                  <p className={`font-black text-base ${isSelected ? 'text-tokmanni-red' : 'text-neutral-900'}`}>
                    {opt.nimi}
                  </p>
                  <p className="text-sm text-neutral-500 mt-0.5">{opt.teksti}</p>
                  <p className="text-xs font-bold text-neutral-400 mt-2">{opt.alaotsikko}</p>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 3. LOPPUSUMMA */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl border-2 border-neutral-100 shadow-sm px-5 sm:px-6 py-4 sm:py-5 mb-6 space-y-2">
          <div className="flex justify-between text-neutral-600 font-medium">
            <span>Tuotteet ({selectedProducts.length} kpl)</span>
            <span>{fmt(productsTotal)}</span>
          </div>
          <div className="flex justify-between text-neutral-600 font-medium">
            <span>Toimitus</span>
            <span>{deliveryCost === 0 ? 'Ilmainen' : fmt(deliveryCost)}</span>
          </div>
          <div className="flex justify-between text-neutral-600 font-medium">
            <span>Ämpäri</span>
            <span>{hasBonus ? 'Ilmainen' : fmt(bucketCost)}</span>
          </div>
          <div className="flex justify-between items-baseline pt-3 border-t-2 border-neutral-100">
            <span className="font-black text-neutral-900 text-base sm:text-lg uppercase tracking-wide">Yhteensä</span>
            <span className="font-black text-tokmanni-red text-2xl sm:text-3xl">{fmt(grandTotal)}</span>
          </div>
        </motion.div>

        {/* 4. TILAA-NAPPI */}
        <motion.div variants={itemVariants}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setOrdered(true)}
            className="w-full bg-tokmanni-red text-white font-black py-4 sm:py-5 rounded-full uppercase tracking-wider text-base sm:text-lg shadow-lg hover:bg-tokmanni-red-dark transition-colors"
          >
            <span className="inline-flex items-center gap-2 sm:gap-3">
              Tilaa ämpäri! <TokmanniBucket className="h-6 sm:h-7 w-auto" />
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Tilaus vastaanotettu -modal */}
      <AnimatePresence>
        {ordered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-tokmanni-red/90 backdrop-blur-sm px-6"
            onClick={() => setOrdered(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-10 max-w-md w-full text-center shadow-2xl"
            >
              <div aria-hidden="true" className="text-6xl sm:text-7xl mb-3 sm:mb-4">🎉</div>
              <h2 className="text-2xl sm:text-3xl font-black text-tokmanni-red mb-2">
                Tilaus vastaanotettu!
              </h2>
              <p className="text-neutral-600 font-medium text-base sm:text-lg mb-4 sm:mb-6">
                Saat vahvistuksen sähköpostiisi.
              </p>
              <p className="text-neutral-400 text-sm mb-4 sm:mb-6">
                (Tämä on demo — oikeaa tilausta ei lähetetty)
              </p>
              <button
                onClick={() => setOrdered(false)}
                className="bg-tokmanni-red text-white font-black px-6 sm:px-8 py-3 rounded-full uppercase tracking-wider hover:bg-tokmanni-red-dark transition-colors text-sm sm:text-base"
              >
                Sulje
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
