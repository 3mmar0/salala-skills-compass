import { useEffect, useState } from "react";
import { CmsLink } from "@/components/cms/CmsLink";
import { homeHero } from "@/lib/cms/pages/home";
import { useSectionContent } from "@/lib/cms/use-section";

const DNA_PAIRS = 10;

function isVideoUrl(url: string) {
  return /\.(mp4|webm)(?:$|\?)/i.test(url) || /\/api\/media\/.+\.(mp4|webm)$/i.test(url);
}

function DnaStage() {
  return (
    <div className="solala-plus-float__stage">
      <div className="solala-plus-float__dna3d">
        {Array.from({ length: DNA_PAIRS }, (_, i) => (
          <div key={i} className="solala-plus-float__pair" style={{ ["--i" as string]: i }}>
            <span className="solala-plus-float__node solala-plus-float__node--gold" />
            <span className="solala-plus-float__rung" />
            <span className="solala-plus-float__node solala-plus-float__node--teal" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SolalaPlusFloat() {
  const c = useSectionContent(homeHero);
  const label = (c.genomeLabel || "Solalaa Genome").trim() || "Solalaa Genome";
  const href = (c.genomeHref || "/breed-innovation").trim() || "/breed-innovation";
  const video = (c.genomeVideo || "").trim();
  const media = (c.genomeMedia || "").trim();
  const activeMedia = video || media;
  const showVideo = Boolean(video) || (Boolean(media) && isVideoUrl(media));
  // Defer heavy GIF/video so it does not compete with the hero LCP image.
  const [allowMedia, setAllowMedia] = useState(false);

  useEffect(() => {
    if (!activeMedia) return;
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof win.requestIdleCallback === "function") {
      const id = win.requestIdleCallback(() => setAllowMedia(true), { timeout: 2500 });
      return () => win.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setAllowMedia(true), 1500);
    return () => window.clearTimeout(id);
  }, [activeMedia]);

  return (
    <div className="solala-plus-float pointer-events-auto absolute z-30 block">
      <CmsLink
        href={href || "/breed-innovation"}
        className="solala-plus-float__link group relative z-30 flex flex-col items-center no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        <div
          className="solala-plus-float__orb relative grid place-items-center"
          aria-hidden={activeMedia ? undefined : true}
          title={label}
        >
          <span className="solala-plus-float__orb-face" />
          <span className="solala-plus-float__halo" />
          <span className="solala-plus-float__ring" />

          {activeMedia && allowMedia ? (
            <div className="solala-plus-float__media">
              {showVideo ? (
                <video
                  src={video || media}
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={label}
                />
              ) : (
                <img src={media} alt={label} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              )}
            </div>
          ) : (
            <DnaStage />
          )}
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
          <span className="solala-plus-float__label">{label}</span>
        </span>
      </CmsLink>
    </div>
  );
}
