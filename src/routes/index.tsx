import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Wave, Particles } from "@/components/site/Layout";
import { SolalaPlusFloat } from "@/components/site/SolalaPlusFloat";
import { SmartImage } from "@/components/site/SmartImage";
import { CmsLink } from "@/components/cms/CmsLink";
import { PageSections } from "@/components/cms/PageSections";
import { lazySection } from "@/components/site/LazySection";
import { meta } from "@/lib/meta";
import { cmsIcon } from "@/lib/cms/icons";
import { useSectionContent } from "@/lib/cms/use-section";
import { homeHero, homePage, homePillars } from "@/lib/cms/pages/home";

const loadHomeSections = () => import("@/components/site/home-sections");

const StatsSection = lazySection(loadHomeSections, "StatsSection");
const Methodology = lazySection(loadHomeSections, "Methodology");
const VideoSection = lazySection(loadHomeSections, "VideoSection");
const Consulting = lazySection(loadHomeSections, "Consulting");
const Entrepreneurship = lazySection(loadHomeSections, "Entrepreneurship");
const Experts = lazySection(loadHomeSections, "Experts");
const Sponsors = lazySection(loadHomeSections, "Sponsors");
const Cta = lazySection(loadHomeSections, "Cta");

export const Route = createFileRoute("/")({
  head: () => meta("الرئيسية", "منصة متكاملة للتعلم والتطوير الزراعي: تدريب، استشارات، وريادة أعمال.", "/"),
  component: Index,
});

function Index() {
  return (
    <PageSections
      page={homePage}
      components={{
        hero: Hero,
        pillars: Pillars,
        stats: StatsSection,
        methodology: Methodology,
        video: VideoSection,
        consulting: Consulting,
        entrepreneurship: Entrepreneurship,
        experts: Experts,
        sponsors: Sponsors,
        cta: Cta,
      }}
    />
  );
}

function Hero() {
  const c = useSectionContent(homeHero);
  const title = (c.title || "").trim() || String(homeHero.defaults.title ?? "");
  const subtitle = (c.subtitle || "").trim() || String(homeHero.defaults.subtitle ?? "");
  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden text-forest-foreground">
      <SmartImage
        src={c.image}
        alt={title}
        width={1600}
        height={1008}
        fill
        priority
        className="animate-ken-burns"
        placeholderClassName="bg-forest/70"
      />
      <div className="bg-hero-overlay pointer-events-none absolute inset-0 z-[1]" />
      <div className="pointer-events-none absolute -left-24 top-24 z-[1] h-96 w-96 animate-blob bg-gold/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-20 z-[1] h-[28rem] w-[28rem] animate-blob bg-primary/40 blur-3xl [animation-delay:-5s]" />
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <Particles n={10} />
      </div>
      <Wave className="z-[2]" />
      <SolalaPlusFloat />
      <div className="container-site pointer-events-none relative z-20 flex min-h-[88vh] flex-col justify-end pb-40">
        {c.badge && (
          <span className="animate-fade-up pointer-events-auto w-fit rounded-full bg-gold/20 px-4 py-1 text-sm font-medium text-gold backdrop-blur">{c.badge}</span>
        )}
        {title ? (
          <h1 className="animate-fade-up delay-1 mt-5 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">{title}</h1>
        ) : null}
        {subtitle ? (
          <p className="animate-fade-up delay-2 mt-6 max-w-2xl text-lg leading-8 opacity-90">{subtitle}</p>
        ) : null}
        <div className="animate-fade-up delay-3 pointer-events-auto mt-8 flex flex-wrap gap-3">
          {c.primaryLabel && (
            <CmsLink href={c.primaryHref} className="btn-gold">
              {c.primaryLabel} <ArrowLeft className="h-4 w-4" />
            </CmsLink>
          )}
          {c.secondaryLabel && (
            <CmsLink href={c.secondaryHref} className="btn-ghost-light">
              {c.secondaryLabel}
            </CmsLink>
          )}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const c = useSectionContent(homePillars);
  return (
    <section className="container-site -mt-20 relative z-10 grid gap-4 md:grid-cols-3">
      {c.items.map((item, i) => {
        const Icon = cmsIcon(item.icon);
        return (
          <div key={item._id ?? i} className="rounded-2xl border bg-card p-7 shadow-soft card-fx animate-fade-up delay-3">
            <Icon className="h-8 w-8 text-primary" />
            <h3 className="mt-4 text-xl font-bold text-forest">{item.title}</h3>
            <p className="mt-2 text-muted-foreground">{item.description}</p>
          </div>
        );
      })}
    </section>
  );
}
