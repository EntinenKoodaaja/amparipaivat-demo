import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PresetBuckets from './components/PresetBuckets';
import AiBucketGenerator from './components/AiBucketGenerator';
import BucketBuilder from './components/BucketBuilder';
import CheckoutView from './components/CheckoutView';
import ScrollVideoTransition from './components/ScrollVideoTransition';
import AiResultSection from './components/AiResultSection';
import { products } from './data/products';

export default function App() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bucketName, setBucketName] = useState('Oma ämpäri');
  const [showCheckout, setShowCheckout] = useState(false);
  const [aiResultIds, setAiResultIds] = useState<string[] | null>(null);
  const [showBucketBuilder, setShowBucketBuilder] = useState(false);

  const MAX_PRODUCTS = 8;

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < MAX_PRODUCTS) {
        next.add(id);
      }
      return next;
    });

  const remove = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

  const clear = () => setSelected(new Set());

  const loadPreset = (ids: string[], name?: string) => {
    setSelected(new Set(ids));
    setBucketName(name ?? 'Oma ämpäri');
    setShowBucketBuilder(true);
    setTimeout(() => {
      document.getElementById('rakenna')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleAiResult = (ids: string[]) => {
    setSelected(new Set(ids));
    setBucketName('Oma ämpäri');
    setAiResultIds(ids);
  };

  const handleEditAi = () => {
    setShowBucketBuilder(true);
    setTimeout(() => {
      document.getElementById('rakenna')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const selectedProducts = products.filter((p) => selected.has(p.id));

  if (showCheckout) {
    return (
      <CheckoutView
        selectedProducts={selectedProducts}
        bucketName={bucketName}
        onBack={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <ScrollVideoTransition />
        <PresetBuckets onSelect={(bucket) => loadPreset(bucket.tuoteIdt, bucket.nimi)} />
        <AiBucketGenerator onResult={handleAiResult} />
        {aiResultIds && (
          <AiResultSection
            selectedIds={aiResultIds}
            onEdit={handleEditAi}
            onCheckout={() => setShowCheckout(true)}
          />
        )}
        {showBucketBuilder && (
          <BucketBuilder
            selected={selected}
            onToggle={toggle}
            onRemove={remove}
            onClear={clear}
            onCheckout={() => setShowCheckout(true)}
          />
        )}
      </main>
      <footer className="bg-tokmanni-red text-white py-8 mt-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-bold tracking-wide">TOKMANNI · ÄMPÄRIPÄIVÄT 2026</p>
          <p className="text-sm opacity-90">Halvalla hyvää kesää! <span aria-hidden="true">☀️</span></p>
        </div>
      </footer>
    </div>
  );
}
