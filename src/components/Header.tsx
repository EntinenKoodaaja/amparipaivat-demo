import TokmanniLogo from './TokmanniLogo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-tokmanni-red shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-6">

        {/* Brand-pari: logo + kampanjan alaotsikko pinottuna */}
        <div className="flex flex-col min-w-0 shrink-0">
          <TokmanniLogo className="h-9 sm:h-11" />
          <span className="hidden sm:block text-[10px] font-bold tracking-widest uppercase text-neutral-500 mt-0.5">
            Kesän Ämpäripäivät 2026
          </span>
        </div>

        {/* Navigaatio */}
        <nav className="flex items-center gap-2 sm:gap-6 shrink-0">
          <a
            href="#valmiit"
            className="hidden sm:inline text-neutral-700 font-bold hover:text-tokmanni-red transition-colors whitespace-nowrap"
          >
            Valmiit ämpärit
          </a>
          <a
            href="#rakenna"
            className="hidden sm:inline text-neutral-700 font-bold hover:text-tokmanni-red transition-colors whitespace-nowrap"
          >
            Rakenna oma
          </a>
        </nav>

      </div>
    </header>
  );
}
