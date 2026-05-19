import TokmanniBucket from './TokmanniBucket';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-tokmanni-red text-white min-h-screen flex flex-col justify-center">
      {/* Subtle background glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-16 -left-16 w-96 h-96 rounded-full bg-yellow-300 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-orange-200 blur-3xl" />
      </div>

      {/* Scrolling marquee text — taustakerros */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div className="absolute top-[18%] left-0 right-0 overflow-hidden -rotate-3">
          <div
            className="flex whitespace-nowrap opacity-[0.10]"
            style={{ animation: 'marquee 35s linear infinite' }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white px-6"
              >
                Ämpäripäivät 2026 ·
              </span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-[22%] left-0 right-0 overflow-hidden rotate-2">
          <div
            className="flex whitespace-nowrap opacity-[0.08]"
            style={{ animation: 'marquee-reverse 45s linear infinite' }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-yellow-200 px-6"
              >
                Ämpäripäivät 2026 ·
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto w-full px-5 sm:px-6 grid md:grid-cols-[1fr_1.25fr] gap-2 md:gap-4 items-center min-h-screen py-12 sm:py-20 md:py-28">
        {/* Left: text content */}
        <div className="text-center md:text-left">
          <span className="inline-block bg-yellow-300 text-tokmanni-red font-black uppercase tracking-widest text-[10px] sm:text-xs px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-6 shadow-md">
            <span aria-hidden="true">☀️</span> Kesä 2026
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-4 sm:mb-6 tracking-tight">
            Rakenna
            <br />
            unelmiesi
            <br />
            <span className="inline-flex items-center gap-2 bg-white text-tokmanni-red px-3 sm:px-4 py-1 rounded-2xl rotate-[-2deg] mt-2">
              ämpäri <TokmanniBucket className="h-8 sm:h-10 w-auto" />
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-medium opacity-95 mb-6 sm:mb-8 max-w-md mx-auto md:mx-0">
            Valitse valmis teemaämpäri tai täytä omasi
            Tokmannin parhailla kesätuotteilla. Halvalla,
            hauskasti ja helposti!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto md:max-w-none md:mx-0">
            <a
              href="#rakenna"
              className="inline-flex justify-center items-center bg-white text-tokmanni-red font-black px-6 sm:px-7 py-3.5 sm:py-4 rounded-full uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-transform text-sm sm:text-base"
            >
              Rakenna oma →
            </a>
            <a
              href="#valmiit"
              className="inline-flex justify-center items-center bg-transparent border-2 border-white text-white font-black px-6 sm:px-7 py-3.5 sm:py-4 rounded-full uppercase tracking-wider hover:bg-white hover:text-tokmanni-red transition-colors text-sm sm:text-base"
            >
              Katso valmiit
            </a>
          </div>
        </div>

        {/* Right: large bucket photo */}
        <div className="relative flex items-end justify-center md:justify-end">
          <div className="relative">
            {/* Starburst sale badge */}
            <div className="absolute -top-3 sm:-top-6 left-2 sm:left-4 z-10 -rotate-[12deg]">
              <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-xl">
                <defs>
                  <radialGradient id="badge-grad" cx="40%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#FFE535" />
                    <stop offset="100%" stopColor="#F5B800" />
                  </radialGradient>
                </defs>
                <polygon
                  points="50,2 57.02,14.69 68.37,5.65 70,20.07 83.94,16.06 79.93,30 94.35,31.63 85.31,42.98 98,50 85.31,57.02 94.35,68.37 79.93,70 83.94,83.94 70,79.93 68.37,94.35 57.02,85.31 50,98 42.98,85.31 31.63,94.35 30,79.93 16.06,83.94 20.07,70 5.65,68.37 14.69,57.02 2,50 14.69,42.98 5.65,31.63 20.07,30 16.06,16.06 30,20.07 31.63,5.65 42.98,14.69"
                  fill="url(#badge-grad)"
                />
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#E3000F"
                  fontFamily="'Arial Black','Helvetica Neue',sans-serif"
                  fontSize="22"
                  fontWeight="900"
                >
                  -40%
                </text>
              </svg>
            </div>

            <div className="relative overflow-hidden">
              <img
                src="/tokmanni-bucket-photo.webp"
                alt="Tokmanni ämpäri"
                width={1024}
                height={1024}
                className="h-[38vh] sm:h-[55vh] md:h-[60vh] lg:h-[80vh] w-auto block"
                style={{ maxHeight: '680px' }}
              />
              {/* Häivytä valkoiset reunat heroväriin */}
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#E3000F] to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-[#E3000F] to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-[#E3000F] to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[#E3000F] to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <svg
        className="block w-full h-12 sm:h-20 text-white"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
        />
      </svg>
    </section>
  );
}
