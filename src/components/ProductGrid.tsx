import { products, kategoriat, type Category } from '../data/products';

interface Props {
  selected: Set<string>;
  onToggle: (id: string) => void;
  isFull?: boolean;
}

export default function ProductGrid({ selected, onToggle, isFull = false }: Props) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {kategoriat.map((kat) => {
        const items = products.filter((p) => p.kategoria === kat.id);
        return (
          <div key={kat.id}>
            <h3 className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-tokmanni-red mb-2 sm:mb-3 sticky top-[57px] sm:top-[68px] bg-white/95 backdrop-blur-sm py-2 z-10 -mx-1 px-1">
              <span>{kat.ikoni}</span>
              <span>{kat.nimi}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {items.map((p) => {
                const isSelected = selected.has(p.id);
                const isDisabled = isFull && !isSelected;
                return (
                  <label
                    key={p.id}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all select-none
                      ${isDisabled
                        ? 'border-neutral-100 bg-neutral-50 opacity-40 cursor-not-allowed'
                        : isSelected
                          ? 'border-tokmanni-red bg-red-50 cursor-pointer'
                          : 'border-neutral-200 bg-white hover:border-tokmanni-red hover:bg-red-50/40 cursor-pointer'
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => !isDisabled && onToggle(p.id)}
                      disabled={isDisabled}
                      className="sr-only"
                    />
                    {/* custom checkbox */}
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                        ${isSelected
                          ? 'bg-tokmanni-red border-tokmanni-red'
                          : 'border-neutral-400 bg-white'
                        }`}
                    >
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span className="text-xl leading-none">{p.ikoni}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-neutral-900 leading-tight">{p.nimi}</p>
                      <p className="text-xs text-neutral-500 truncate">{p.kuvaus}</p>
                    </div>
                    <span className="flex-shrink-0 font-black text-tokmanni-red text-sm">
                      {p.hinta.toFixed(2)} €
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
