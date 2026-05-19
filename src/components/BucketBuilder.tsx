import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { products } from '../data/products';
import ProductGrid from './ProductGrid';
import BucketPreview from './BucketPreview';
import BucketAnimation from './BucketAnimation';
import TokmanniBucket from './TokmanniBucket';

interface Props {
  selected: Set<string>;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onCheckout?: () => void;
}

const BONUS_THRESHOLD = 5;
const BUCKET_PRICE = 3.99;

export default function BucketBuilder({ selected, onToggle, onRemove, onClear, onCheckout }: Props) {
  const [animating, setAnimating] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const items = products.filter((p) => selected.has(p.id));
  const isEmpty = items.length === 0;
  const hasBonus = items.length >= BONUS_THRESHOLD;
  const bucketCost = hasBonus ? 0 : BUCKET_PRICE;
  const total = items.reduce((sum, p) => sum + p.hinta, 0) + (isEmpty ? 0 : bucketCost);

  return (
    <section id="rakenna" className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-16 pb-32 lg:pb-16">
      <div className="mb-6 sm:mb-10">
        <span className="inline-block bg-tokmanni-red text-white font-black uppercase tracking-widest text-[10px] sm:text-xs px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3">
          Rakenna oma
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
          Täytä ämpärisi <span className="text-tokmanni-red">itse</span>
        </h2>
        <p className="mt-2 text-neutral-500 text-base sm:text-lg max-w-xl">
          Valitse mieleisesi tuotteet ja katso yhteishinta reaaliajassa.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">
        <div>
          <ProductGrid selected={selected} onToggle={onToggle} isFull={selected.size >= 8} />
        </div>
        {/* Desktop sidebar — hidden on mobile */}
        <div className="hidden lg:block">
          <BucketPreview
            selected={selected}
            onRemove={onRemove}
            onClear={onClear}
            onAssemble={() => setAnimating(true)}
          />
        </div>
      </div>

      <BucketAnimation
        open={animating}
        selectedIds={Array.from(selected)}
        onClose={() => setAnimating(false)}
        onCheckout={onCheckout}
      />

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t-4 border-tokmanni-red shadow-[0_-8px_24px_rgba(0,0,0,0.12)]">
        <button
          type="button"
          onClick={() => !isEmpty && setMobileSheetOpen(true)}
          disabled={isEmpty}
          className="w-full px-4 py-3 flex items-center gap-3 disabled:cursor-default"
        >
          <div className="relative shrink-0">
            <TokmanniBucket className="h-12 w-auto" />
            {!isEmpty && (
              <span className="absolute -top-1 -right-2 bg-tokmanni-red text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow">
                {items.length}
              </span>
            )}
          </div>
          <div className="flex-1 text-left min-w-0">
            {isEmpty ? (
              <p className="text-sm font-bold text-neutral-500">
                Valitse tuotteita ämpäriisi
              </p>
            ) : (
              <>
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide truncate">
                  {hasBonus ? (
                    <>
                      <span aria-hidden="true">🎁</span> Ilmainen ämpäri!
                    </>
                  ) : (
                    `${items.length}/8 tuotetta`
                  )}
                </p>
                <p className="text-xl font-black text-tokmanni-red leading-tight">
                  {total.toFixed(2).replace('.', ',')} €
                </p>
              </>
            )}
          </div>
          {!isEmpty && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setAnimating(true);
              }}
              className="bg-tokmanni-red text-white font-black px-5 py-3 rounded-full uppercase tracking-wider text-xs shadow-md hover:bg-tokmanni-red-dark active:scale-95 transition-all shrink-0"
            >
              Kokoa →
            </button>
          )}
        </button>
      </div>

      {/* Mobile preview sheet */}
      <AnimatePresence>
        {mobileSheetOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end"
            onClick={() => setMobileSheetOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white"
            >
              <div className="sticky top-0 flex justify-center pt-3 pb-2 bg-white">
                <span className="block w-12 h-1.5 rounded-full bg-neutral-300" />
              </div>
              <div className="px-4 pb-6">
                <BucketPreview
                  selected={selected}
                  onRemove={onRemove}
                  onClear={onClear}
                  onAssemble={() => {
                    setMobileSheetOpen(false);
                    setAnimating(true);
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
