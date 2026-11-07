import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SectionHead, ExpertCard, CtaBand, Wave, Particles, Stats, WavyBg, FloatsBg } from "@/components/site/Layout";
import { SolalaPlusFloat } from "@/components/site/SolalaPlusFloat";
import { CmsLink } from "@/components/cms/CmsLink";
import { PageSections } from "@/components/cms/PageSections";
import { meta } from "@/lib/meta";
import { cmsIcon } from "@/lib/cms/icons";
import { useSectionContent } from "@/lib/cms/use-section";
import {
  homeConsulting,
  homeCta,
  homeEntrepreneurship,
  homeExperts,
  homeHero,
  homeMethodology,
  homePage,
  homePillars,
  homeSponsors,
  homeStats,
} from "@/lib/cms/pages/home";

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
  return (
    <section className="relative min-h-[88vh] overflow-hidden text-forest-foreground">
      <img src={c.image} alt={c.title} width={1600} height={1008} className="animate-ken-burns absolute inset-0 h-full w-full object-cover" />
      <div className="bg-hero-overlay absolute inset-0" />
      <div className="animate-blob absolute -left-24 top-24 h-96 w-96 bg-gold/25 blur-3xl" />
      <div className="animate-blob absolute right-0 bottom-20 h-[28rem] w-[28rem] bg-primary/40 blur-3xl [animation-delay:-5s]" />
      <Particles n={20} />
      <Wave />
      <SolalaPlusFloat />
      <div className="container-site relative flex min-h-[88vh] flex-col justify-end pb-40">
        {c.badge && (
          <span className="animate-fade-up w-fit rounded-full bg-gold/20 px-4 py-1 text-sm font-medium text-gold backdrop-blur">{c.badge}</span>
        )}
        <h1 className="animate-fade-up delay-1 mt-5 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">{c.title}</h1>
        <p className="animate-fade-up delay-2 mt-6 max-w-2xl text-lg leading-8 opacity-90">{c.subtitle}</p>
        <div className="animate-fade-up delay-3 mt-8 flex flex-wrap gap-3">
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

function StatsSection() {
  const c = useSectionContent(homeStats);
  return <Stats items={c.items} />;
}

function Methodology() {
  const c = useSectionContent(homeMethodology);
  return (
    <section className="container-site py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <img src={c.image} alt={c.title} loading="lazy" width={1408} height={1008} className="animate-float rounded-3xl shadow-soft" />
        <div>
          <span className="text-sm font-semibold text-primary">{c.eyebrow}</span>
          <h2 className="mt-2 text-3xl font-bold text-forest md:text-4xl">{c.title}</h2>
          <p className="mt-3 text-muted-foreground">{c.subtitle}</p>
          <div className="mt-8 space-y-4">
            {c.items.map((p, i) => {
              const Icon = cmsIcon(p.icon);
              return (
                <div key={p._id ?? i} className="flex gap-4 rounded-2xl border bg-card p-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-gold shadow-soft">
                    <Icon className="h-6 w-6 icon-wiggle" />
                  </span>
                  <div>
                    <h4 className="font-bold text-forest">{p.title}</h4>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">{p.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {c.ctaLabel && (
            <CmsLink href={c.ctaHref} className="btn-primary mt-8">
              {c.ctaLabel} <ArrowLeft className="h-4 w-4" />
            </CmsLink>
          )}
        </div>
      </div>
    </section>
  );
}

function Consulting() {
  const c = useSectionContent(homeConsulting);
  return (
    <section className="relative isolate overflow-hidden bg-sand py-24">
      <WavyBg />
      <div className="container-site relative">
        <SectionHead eyebrow={c.eyebrow} title={c.title} desc={c.subtitle} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.items.map((item, i) => {
            const Icon = cmsIcon(item.icon);
            return (
              <div key={item._id ?? i} className="rounded-2xl bg-card p-7 text-center shadow-soft card-fx reveal">
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-secondary ring-4 ring-gold/30">
                  <Icon className="h-10 w-10 text-primary" />
                </span>
                <h4 className="mt-4 text-lg font-bold text-forest">{item.title}</h4>
              </div>
            );
          })}
        </div>
        {c.ctaLabel && (
          <div className="mt-10 text-center">
            <CmsLink href={c.ctaHref} className="btn-primary">{c.ctaLabel}</CmsLink>
          </div>
        )}
      </div>
    </section>
  );
}

function Entrepreneurship() {
  const c = useSectionContent(homeEntrepreneurship);
  return (
    <section className="container-site py-24">
      <SectionHead eyebrow={c.eyebrow} title={c.title} desc={c.subtitle} />
      <div className="grid gap-4 md:grid-cols-5">
        {c.items.map((item, i) => {
          const Icon = cmsIcon(item.icon);
          return (
            <div key={item._id ?? i} className="card-fx reveal relative rounded-2xl border bg-card p-6 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-gold ring-4 ring-gold/25 shadow-soft">
                <Icon className="h-7 w-7" />
              </span>
              <h5 className="mt-4 font-bold text-forest">{item.title}</h5>
            </div>
          );
        })}
      </div>
      {c.ctaLabel && (
        <div className="mt-10 text-center">
          <CmsLink href={c.ctaHref} className="btn-primary">{c.ctaLabel}</CmsLink>
        </div>
      )}
    </section>
  );
}

function Experts() {
  const c = useSectionContent(homeExperts);
  return (
    <section className="relative isolate overflow-hidden bg-muted py-24">
      <FloatsBg />
      <div className="container-site relative">
        <SectionHead eyebrow={c.eyebrow} title={c.title} desc={c.subtitle} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.items.map((e, i) => (
            <ExpertCard key={e._id ?? i} name={e.name} role={e.role} bio={e.bio} image={e.image || undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Sponsors() {
  const c = useSectionContent(homeSponsors);
  return (
    <section className="container-site py-20">
      <SectionHead eyebrow={c.eyebrow} title={c.title} desc={c.subtitle} />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {c.items.map((p, i) => (
          <div key={p._id ?? i} className="grid h-24 place-items-center rounded-2xl border border-dashed bg-card p-3 font-display text-muted-foreground">
            {p.logo ? <img src={p.logo} alt={p.name} loading="lazy" className="max-h-16 w-auto object-contain" /> : p.name}
          </div>
        ))}
      </div>
    </section>
  );
}

function Cta() {
  const c = useSectionContent(homeCta);
  return <CtaBand title={c.title} desc={c.body} label={c.ctaLabel} to={c.ctaHref} />;
}
