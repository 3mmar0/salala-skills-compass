import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ChevronDown, Dna, Sparkles } from "lucide-react";
import { CmsLink } from "@/components/cms/CmsLink";
import { PageSections } from "@/components/cms/PageSections";
import { SmartImage } from "@/components/site/SmartImage";
import {
  CtaBand,
  FloatsBg,
  PageHero,
  Particles,
  SectionHead,
  WavyBg,
} from "@/components/site/Layout";
import { cmsIcon } from "@/lib/cms/icons";
import type { PageDef, SectionDef } from "@/lib/cms/schema";
import { useSectionContent } from "@/lib/cms/use-section";
import type {
  BreedCardsContent,
  BreedCtaContent,
  BreedFaqContent,
  BreedHeroContent,
  BreedPillarsContent,
  BreedSpotlightContent,
  BreedStatsContent,
} from "@/lib/cms/pages/breeds-shared";

/* eslint-disable @typescript-eslint/no-explicit-any */
const RENDERERS: Record<string, (def: SectionDef<any>) => ReactNode> = {
  hero: (def) => <BreedHero def={def} />,
  pillars: (def) => <BreedPillars def={def} />,
  spotlight: (def) => <BreedSpotlight def={def} />,
  cards: (def) => <BreedCards def={def} />,
  stats: (def) => <BreedStats def={def} />,
  faq: (def) => <BreedFaq def={def} />,
  cta: (def) => <BreedCta def={def} />,
};
/* eslint-enable @typescript-eslint/no-explicit-any */

/** Renders an animal-breed page built from the `breeds-shared` section factories. */
export function BreedPage({ page }: { page: PageDef }) {
  const elements: Record<string, ReactNode> = {};
  for (const def of page.sections) {
    const render = RENDERERS[def.key];
    if (render) elements[def.key] = render(def);
  }
  return <PageSections page={page} elements={elements} />;
}

function BreedHero({ def }: { def: SectionDef<BreedHeroContent> }) {
  const c = useSectionContent(def);
  return (
    <PageHero image={c.image} eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle}>
      {c.primaryLabel ? (
        <CmsLink href={c.primaryHref} className="btn-gold btn-glow">
          {c.primaryLabel} <ArrowLeft className="h-4 w-4" />
        </CmsLink>
      ) : null}
      {c.secondaryLabel ? (
        <CmsLink href={c.secondaryHref} className="btn-ghost-light">
          {c.secondaryLabel}
        </CmsLink>
      ) : null}
    </PageHero>
  );
}

/** Animated DNA panel shown when a section has no photo. */
function DnaPanel({ badge }: { badge?: string }) {
  return (
    <div className="bg-forest-gradient relative grid aspect-[4/3] place-items-center overflow-hidden rounded-3xl shadow-soft">
      <Particles n={12} />
      <div className="animate-blob absolute -left-10 -top-10 h-48 w-48 bg-gold/25 blur-3xl" />
      <div className="animate-blob absolute -bottom-12 -right-8 h-56 w-56 bg-primary-light/30 blur-3xl [animation-delay:-5s]" />
      <span className="animate-orbit relative grid h-36 w-36 place-items-center rounded-full border border-gold/40 bg-white/5 backdrop-blur">
        <Dna className="h-16 w-16 text-gold" />
      </span>
      {badge ? <span className="sr-only">{badge}</span> : null}
    </div>
  );
}

function BreedPillars({ def }: { def: SectionDef<BreedPillarsContent> }) {
  const c = useSectionContent(def);
  return (
    <section id="pillars" className="container-site scroll-mt-24 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="reveal relative">
          <div className="animate-blob absolute -right-8 -top-8 -z-10 h-40 w-40 bg-gold/20 blur-2xl" />
          {c.image ? (
            <div className="card-fx overflow-hidden rounded-3xl shadow-soft">
              <SmartImage
                src={c.image}
                alt={c.imageBadge || c.title}
                width={1080}
                height={810}
                className="aspect-[4/3] object-cover"
                placeholderClassName="aspect-[4/3] bg-muted"
              />
            </div>
          ) : (
            <DnaPanel badge={c.imageBadge} />
          )}
          {c.imageBadge ? (
            <span className="animate-float absolute -bottom-5 right-6 inline-flex items-center gap-2 rounded-2xl bg-card px-5 py-3 text-sm font-bold text-forest shadow-soft ring-1 ring-gold/30">
              <Sparkles className="h-4 w-4 text-gold-dark" /> {c.imageBadge}
            </span>
          ) : null}
        </div>
        <div>
          {c.eyebrow ? (
            <span className="reveal inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4 text-gold-dark" /> {c.eyebrow}
            </span>
          ) : null}
          {c.title ? (
            <h2 className="text-shimmer reveal mt-3 text-3xl font-bold leading-snug md:text-4xl">
              {c.title}
            </h2>
          ) : null}
          {c.desc ? <p className="reveal mt-4 leading-8 text-muted-foreground">{c.desc}</p> : null}
          <div className="mt-8 space-y-4">
            {c.items.map((item, i) => {
              const I = cmsIcon(item.icon);
              return (
                <article
                  key={item._id ?? i}
                  className="card-fx reveal flex gap-4 rounded-2xl border bg-card p-5 shadow-soft"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-gold ring-4 ring-gold/20">
                    <I className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-bold text-forest">{item.t}</h3>
                    <p className="mt-1.5 text-sm leading-7 text-muted-foreground">{item.d}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function BreedSpotlight({ def }: { def: SectionDef<BreedSpotlightContent> }) {
  const c = useSectionContent(def);
  return (
    <section
      id="spotlight"
      className="relative isolate scroll-mt-24 overflow-hidden bg-muted py-24"
    >
      <FloatsBg />
      <div className="container-site relative grid items-start gap-12 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28">
          {c.eyebrow ? (
            <span className="reveal inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4 text-gold-dark" /> {c.eyebrow}
            </span>
          ) : null}
          {c.title ? (
            <h2 className="text-shimmer reveal mt-3 text-3xl font-bold leading-snug md:text-4xl">
              {c.title}
            </h2>
          ) : null}
          <span className="title-line mx-0!" />
          {c.desc ? <p className="reveal mt-5 leading-8 text-muted-foreground">{c.desc}</p> : null}
          {c.image ? (
            <div className="card-fx reveal mt-8 overflow-hidden rounded-3xl shadow-soft">
              <SmartImage
                src={c.image}
                alt={c.title}
                width={1080}
                height={720}
                className="aspect-[3/2] object-cover"
                placeholderClassName="aspect-[3/2] bg-muted"
              />
            </div>
          ) : null}
          {c.ctaLabel ? (
            <CmsLink href={c.ctaHref} className="btn-primary reveal mt-8 inline-flex">
              {c.ctaLabel} <ArrowLeft className="h-4 w-4" />
            </CmsLink>
          ) : null}
        </div>
        <div className="grid gap-5">
          {c.items.map((item, i) => {
            const I = cmsIcon(item.icon);
            return (
              <article
                key={item._id ?? i}
                className="card-fx reveal rounded-3xl border bg-card p-8 shadow-soft"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-secondary text-primary">
                    <I className="h-7 w-7" />
                  </span>
                  <h3 className="text-xl font-bold text-forest">{item.t}</h3>
                </div>
                <p className="mt-4 leading-8 text-muted-foreground">{item.d}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BreedCards({ def }: { def: SectionDef<BreedCardsContent> }) {
  const c = useSectionContent(def);
  return (
    <section id="cards" className="relative isolate scroll-mt-24 overflow-hidden bg-sand py-24">
      <WavyBg />
      <div className="container-site relative">
        <SectionHead eyebrow={c.eyebrow} title={c.title} desc={c.desc} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.items.map((item, i) => (
            <article
              key={item._id ?? i}
              className="card-fx reveal flex flex-col rounded-3xl border bg-card p-7 shadow-soft"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-bold text-forest">{item.t}</h3>
              {item.tag ? (
                <span className="mt-2 inline-flex w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                  {item.tag}
                </span>
              ) : null}
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BreedStats({ def }: { def: SectionDef<BreedStatsContent> }) {
  const c = useSectionContent(def);
  if (!c.items.length) return null;
  return (
    <section className="bg-forest-gradient relative overflow-hidden py-16 text-forest-foreground">
      <Particles n={10} />
      <div className="container-site relative grid grid-cols-2 gap-8 text-center md:grid-cols-4">
        {c.items.map((item, i) => (
          <div key={item._id ?? i} className="reveal">
            <StatValue value={item.value} suffix={item.suffix} />
            <p className="mt-2 opacity-80">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Counts up plain numbers (decimals included); anything else, like "1:1.5", is shown as written. */
function StatValue({ value, suffix }: { value: string; suffix: string }) {
  const raw = value.trim().replace(/,/g, "");
  const numeric = /^\d+(\.\d+)?$/.test(raw);
  const target = numeric ? Number(raw) : 0;
  const decimals = numeric ? (raw.split(".")[1]?.length ?? 0) : 0;
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !numeric) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1600);
        setV(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [numeric, target]);

  const shown = numeric
    ? v.toLocaleString("ar-EG", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : value;
  return (
    <span
      ref={ref}
      dir="ltr"
      className="inline-block font-display text-4xl font-bold text-gold md:text-5xl"
    >
      {suffix === "+" ? "+" : ""}
      {shown}
      {suffix !== "+" ? suffix : ""}
    </span>
  );
}

function BreedFaq({ def }: { def: SectionDef<BreedFaqContent> }) {
  const c = useSectionContent(def);
  return (
    <section className="container-site max-w-3xl py-24">
      <SectionHead eyebrow={c.eyebrow} title={c.title} />
      <div className="space-y-3">
        {c.items.map((item, i) => (
          <details
            key={item._id ?? i}
            className="group card-fx reveal rounded-2xl border bg-card p-6 shadow-soft"
            open={i === 0}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-forest">
              {item.q}
              <ChevronDown className="h-5 w-5 shrink-0 text-primary transition group-open:rotate-180" />
            </summary>
            <p className="mt-4 leading-8 text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function BreedCta({ def }: { def: SectionDef<BreedCtaContent> }) {
  const c = useSectionContent(def);
  return <CtaBand title={c.title} desc={c.body} label={c.label} to={c.href} />;
}
