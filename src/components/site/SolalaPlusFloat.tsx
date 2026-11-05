const BREED_INNOVATION_HREF =
  "https://businessburg30odoocom.odoo.com/%D9%85%D8%B1%D9%83%D8%B2-%D8%A7%D8%A8%D8%AA%D9%83%D8%A7%D8%B1-%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%84%D8%A7%D8%AA";

export function SolalaPlusFloat() {
  return (
    <div
      className="pointer-events-auto absolute z-10 hidden md:block"
      style={{ top: 24, left: 25 }}
    >
      <a
        href={BREED_INNOVATION_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center no-underline transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        title="انتقل إلى مركز ابتكار السلالات"
      >
        <div
          className="relative flex h-[86px] w-[86px] items-center justify-center"
          style={{
            filter:
              "drop-shadow(0 0 16px rgba(212, 175, 55, 0.9)) drop-shadow(0 0 24px rgba(22, 75, 41, 0.6))",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-20 w-20" aria-hidden="true">
            <defs>
              <linearGradient id="dnaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF4B8" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B38E22" />
              </linearGradient>
              <linearGradient id="dnaGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4EBA6F" />
                <stop offset="100%" stopColor="#164B29" />
              </linearGradient>
            </defs>
            <g className="dna-pulse-group">
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="rgba(8, 28, 21, 0.45)"
                stroke="url(#dnaGoldGrad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="dna-spin"
              />
              <g transform="rotate(-30 50 50)">
                <line x1="38" y1="20" x2="62" y2="20" className="dna-rung" />
                <line x1="42" y1="32" x2="58" y2="32" className="dna-rung" />
                <line x1="48" y1="44" x2="52" y2="44" className="dna-rung" />
                <line x1="50" y1="50" x2="50" y2="50" className="dna-rung" />
                <line x1="48" y1="56" x2="52" y2="56" className="dna-rung" />
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

                <circle cx="38" cy="20" r="3" className="dna-node-gold" />
                <circle cx="62" cy="20" r="3" className="dna-node-green" />
                <circle cx="42" cy="32" r="2.8" className="dna-node-gold" />
                <circle cx="58" cy="32" r="2.8" className="dna-node-green" />
                <circle cx="50" cy="50" r="3.2" className="dna-node-gold" />
                <circle cx="58" cy="68" r="2.8" className="dna-node-gold" />
                <circle cx="42" cy="68" r="2.8" className="dna-node-green" />
                <circle cx="62" cy="80" r="3" className="dna-node-gold" />
                <circle cx="38" cy="80" r="3" className="dna-node-green" />
              </g>
            </g>
          </svg>
        </div>
        <span
          className="mt-1 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-bold tracking-wide"
          style={{
            background:
              "linear-gradient(135deg, rgba(8, 28, 21, 0.9) 0%, rgba(22, 75, 41, 0.95) 100%)",
            borderColor: "#D4AF37",
            color: "#FFF2A1",
            letterSpacing: "0.3px",
            boxShadow: "0 0 12px rgba(212, 175, 55, 0.5)",
            fontSize: "0.75rem",
          }}
        >
          +Solala plus🧬
        </span>
      </a>
    </div>
  );
}
