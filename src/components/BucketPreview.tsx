import { products, BONUS_PRODUCT, type Product } from '../data/products';
import TokmanniBucket from './TokmanniBucket';

interface Props {
  selected: Set<string>;
  onRemove: (id: string) => void;
  onClear: () => void;
  onAssemble?: () => void;
}

const BONUS_THRESHOLD = 5;
const MAX_PRODUCTS = 8;
const BUCKET_PRICE = 3.99;

export default function BucketPreview({ selected, onRemove, onClear, onAssemble }: Props) {
  const items: Product[] = products.filter((p) => selected.has(p.id));
  const isEmpty = items.length === 0;
  const hasBonus = items.length >= BONUS_THRESHOLD;
  const isFull = items.length >= MAX_PRODUCTS;
  const bucketCost = hasBonus ? 0 : BUCKET_PRICE;
  const total = items.reduce((sum, p) => sum + p.hinta, 0) + (isEmpty ? 0 : bucketCost);

  return (
    <div className="sticky top-24 flex flex-col rounded-2xl border-2 border-tokmanni-red overflow-hidden shadow-xl">
      {/* otsikko */}
      <div className="bg-tokmanni-red px-6 py-4 flex items-center justify-between">
        <h2 className="text-white font-black text-lg uppercase tracking-wide">
          Oma ämpäri
        </h2>
        {!isEmpty && (
          <button
            onClick={onClear}
            className="text-white/70 hover:text-white text-xs font-bold uppercase tracking-wide transition-colors"
          >
            Tyhjennä
          </button>
        )}
      </div>

      {/* ämpäri-ikoni + lista */}
      <div className="bg-white flex-1 px-6 py-6">
        <div className="flex flex-col items-center mb-4">
          <div className="relative inline-block">
            <TokmanniBucket className="h-28 w-auto drop-shadow-md" />
            {!isEmpty && (
              <span className="absolute -top-2 -right-4 bg-tokmanni-red text-white text-xs font-black rounded-full w-7 h-7 flex items-center justify-center shadow">
                {items.length}
              </span>
            )}
          </div>
          {isEmpty && (
            <p className="mt-3 text-neutral-400 text-sm font-medium text-center">
              Valitse tuotteita vasemmalta<br />täyttääksesi ämpärisi!
            </p>
          )}
        </div>

        {!isEmpty && (
          <ul className="divide-y divide-neutral-100 mb-4">
            {items.map((p) => (
              <li key={p.id} className="flex items-center gap-2 py-2">
                <span aria-hidden="true" className="text-lg leading-none">{p.ikoni}</span>
                <span className="flex-1 text-sm font-medium text-neutral-800 leading-tight">
                  {p.nimi}
                </span>
                <span className="text-sm font-bold text-neutral-700 mr-1">
                  {p.hinta.toFixed(2)} €
                </span>
                <button
                  onClick={() => onRemove(p.id)}
                  className="text-neutral-300 hover:text-tokmanni-red transition-colors leading-none text-lg"
                  aria-label={`Poista ${p.nimi}`}
                >
                  ×
                </button>
              </li>
            ))}
            {/* Ämpäri — ilmainen ≥5 tuotteella, muuten 3,99 € */}
            <li className={`flex items-center gap-2 py-2 -mx-6 px-6 rounded-b-xl ${hasBonus ? 'bg-yellow-50' : 'bg-neutral-50'}`}>
              <TokmanniBucket className="h-6 w-auto flex-shrink-0" />
              <span className="flex-1 text-sm font-medium text-neutral-800 leading-tight">
                {BONUS_PRODUCT.nimi}
                {hasBonus && (
                  <span className="ml-2 text-xs font-black text-yellow-600 uppercase tracking-wide">Kampanjaetu</span>
                )}
              </span>
              {hasBonus
                ? <span className="text-sm font-black text-green-600">Ilmainen</span>
                : <span className="text-sm font-black text-neutral-700">{BUCKET_PRICE.toFixed(2).replace('.', ',')} €</span>
              }
            </li>
          </ul>
        )}
      </div>

      {/* yhteishinta + CTA */}
      <div className="bg-neutral-50 border-t-2 border-tokmanni-red px-6 py-4">
        {/* Edistyminen bonukseen tai täynnä-ilmoitus */}
        {!isEmpty && (
          <div className="mb-3">
            {isFull ? (
              <p className="text-xs font-black text-center text-tokmanni-red uppercase tracking-wide">
                <span aria-hidden="true">🪣</span> Ämpäri täynnä! (max {MAX_PRODUCTS} tuotetta)
              </p>
            ) : hasBonus ? (
              <p className="text-xs font-black text-center text-green-600 uppercase tracking-wide">
                <span aria-hidden="true">🎁</span> Ilmainen ämpäri ansaittu!
              </p>
            ) : (
              <div>
                <div className="flex justify-between text-xs font-bold text-neutral-500 mb-1">
                  <span>Lisää {BONUS_THRESHOLD - items.length} tuotetta → ilmainen ämpäri</span>
                  <span>{items.length}/{BONUS_THRESHOLD}</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div
                    className="bg-tokmanni-red h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(items.length / BONUS_THRESHOLD) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-baseline justify-between mb-3">
          <span className="text-sm font-bold text-neutral-600 uppercase tracking-wide">Yhteensä</span>
          <span className="text-3xl font-black text-tokmanni-red">
            {total === 0 ? '0,00 €' : `${total.toFixed(2).replace('.', ',')} €`}
          </span>
        </div>
        <button
          disabled={isEmpty}
          onClick={onAssemble}
          className="w-full bg-tokmanni-red text-white font-black py-3 rounded-full uppercase tracking-wider text-sm
            hover:bg-tokmanni-red-dark active:scale-95 transition-all shadow-md
            disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {isEmpty ? 'Lisää tuotteita' : `Kokoa ämpäri! (${items.length} tuotetta)`}
        </button>
      </div>
    </div>
  );
}
