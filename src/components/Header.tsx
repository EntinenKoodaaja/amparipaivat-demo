import TokmanniLogo from './TokmanniLogo';
import TokmanniBucket from './TokmanniBucket';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-tokmanni-red shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-6">

        {/* vasen: logo + ämpäripäivät */}
        <div className="flex items-center gap-4 min-w-0">
          <TokmanniLogo className="shrink-0" />
          <span className="hidden sm:inline-block h-8 w-px bg-neutral-300 shrink-0" />
          <span className="hidden sm:block text-tokmanni-red font-black tracking-wider uppercase text-sm whitespace-nowrap shrink-0">
            Ämpäripäivät
          </span>
        </div>

        {/* oikea: navigaatio */}
        <nav className="flex items-center gap-2 sm:gap-6 shrink-0">
          <a
            href="#valmiit"
            className="hidden sm:inline text-neutral-700 font-bold hover:text-tokmanni-red transition-colors whitespace-nowrap"
          >
            Valmiit ämpärit
          </a>
          <a
            href="#ai"
            className="hidden sm:inline text-neutral-700 font-bold hover:text-tokmanni-red transition-colors whitespace-nowrap"
          >
            Rakenna oma
          </a>
          <a
            href="#top"
            className="hidden sm:inline-flex bg-tokmanni-red text-white font-black px-5 py-2 rounded-full uppercase text-sm tracking-wider hover:bg-tokmanni-red-dark transition-colors shadow-md"
          >
            <span className="inline-flex items-center gap-2">
              Aloita <TokmanniBucket className="h-5 w-auto" />
            </span>
          </a>
        </nav>

      </div>
    </header>
  );
}
