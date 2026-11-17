import { Link } from "@tanstack/react-router";

export function SolalaPlusFloat() {
  return (
    <div className="solala-plus-float pointer-events-auto absolute z-10 hidden md:block">
      <Link
        to="/breed-innovation"
        className="solala-plus-float__link group flex flex-col items-center no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        title="انتقل إلى Solalaa Genome"
      >
        <div className="solala-plus-float__orb relative grid place-items-center">
          <span className="solala-plus-float__halo" aria-hidden="true" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="relative z-[1] h-[4.75rem] w-[4.75rem]"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="dnaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF4B8" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B38E22" />
              </linearGradient>
              <linearGradient id="dnaGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6ED18F" />
                <stop offset="100%" stopColor="#164B29" />
              </linearGradient>
              <radialGradient id="dnaOrbFill" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="rgba(46, 96, 62, 0.72)" />
                <stop offset="100%" stopColor="rgba(8, 28, 21, 0.88)" />
              </radialGradient>
            </defs>

            <circle cx="50" cy="50" r="46" fill="url(#dnaOrbFill)" />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="url(#dnaGoldGrad)"
              strokeWidth="1.25"
              opacity="0.55"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="url(#dnaGoldGrad)"
              strokeWidth="1.5"
              strokeDasharray="3.5 5.5"
              className="dna-spin"
            />

            <g className="dna-pulse-group" transform="rotate(-28 50 50)">
              <line x1="38" y1="20" x2="62" y2="20" className="dna-rung" />
              <line x1="42" y1="32" x2="58" y2="32" className="dna-rung" />
              <line x1="46" y1="44" x2="54" y2="44" className="dna-rung" />
              <line x1="46" y1="56" x2="54" y2="56" className="dna-rung" />
              <line x1="42" y1="68" x2="58" y2="68" className="dna-rung" />
              <line x1="38" y1="80" x2="62" y2="80" className="dna-rung" />

              <path
                d="M 38 15 C 38 32, 62 38, 62 50 C 62 62, 38 68, 38 85"
                className="dna-strand-1"
              />
              <path
                d="M 62 15 C 62 32, 38 38, 38 50 C 38 62, 62 68, 62 85"
                className="dna-strand-2"
              />

              <circle cx="38" cy="20" r="3" className="dna-node-gold dna-node-twinkle" />
              <circle cx="62" cy="20" r="3" className="dna-node-green dna-node-twinkle" style={{ animationDelay: ".4s" }} />
              <circle cx="42" cy="32" r="2.7" className="dna-node-gold dna-node-twinkle" style={{ animationDelay: ".8s" }} />
              <circle cx="58" cy="32" r="2.7" className="dna-node-green dna-node-twinkle" style={{ animationDelay: "1.2s" }} />
              <circle cx="50" cy="50" r="3.2" className="dna-node-gold dna-node-twinkle" style={{ animationDelay: ".2s" }} />
              <circle cx="58" cy="68" r="2.7" className="dna-node-gold dna-node-twinkle" style={{ animationDelay: "1s" }} />
              <circle cx="42" cy="68" r="2.7" className="dna-node-green dna-node-twinkle" style={{ animationDelay: ".6s" }} />
              <circle cx="62" cy="80" r="3" className="dna-node-gold dna-node-twinkle" style={{ animationDelay: "1.4s" }} />
              <circle cx="38" cy="80" r="3" className="dna-node-green dna-node-twinkle" style={{ animationDelay: ".3s" }} />
            </g>
          </svg>
        </div>

        <span className="solala-plus-float__chip mt-2.5 inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 py-1.5 text-[0.72rem] font-semibold tracking-[0.02em]">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
            <path
              d="M5 2c0 2.2 6 3.2 6 6s-6 3.8-6 6"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M11 2c0 2.2-6 3.2-6 6s6 3.8 6 6"
              fill="none"
              stroke="#6ED18F"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="5" cy="5" r="1.15" fill="#FFF4B8" />
            <circle cx="11" cy="8" r="1.15" fill="#A8E6CF" />
            <circle cx="5" cy="11" r="1.15" fill="#FFF4B8" />
          </svg>
          <span className="solala-plus-float__label">Solala Plus</span>
          <span className="solala-plus-float__plus" aria-hidden="true">
            +
          </span>
        </span>
      </Link>
    </div>
  );
}
