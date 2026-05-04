import { useState } from 'react';
import ProductGrid from './ProductGrid';
import BucketPreview from './BucketPreview';
import BucketAnimation from './BucketAnimation';

interface Props {
  selected: Set<string>;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onCheckout?: () => void;
}

export default function BucketBuilder({ selected, onToggle, onRemove, onClear, onCheckout }: Props) {
  const [animating, setAnimating] = useState(false);

  return (
    <section id="rakenna" className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-10">
        <span className="inline-block bg-tokmanni-red text-white font-black uppercase tracking-widest text-xs px-4 py-1.5 rounded-full mb-3">
          Rakenna oma
        </span>
        <h2 className="text-4xl sm:text-5xl font-black leading-tight">
          Täytä ämpärisi <span className="text-tokmanni-red">itse</span>
        </h2>
        <p className="mt-2 text-neutral-500 text-lg max-w-xl">
          Valitse mieleisesi tuotteet ja katso yhteishinta reaaliajassa.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
        <div>
          <ProductGrid selected={selected} onToggle={onToggle} isFull={selected.size >= 8} />
        </div>
        <div>
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
    </section>
  );
}
