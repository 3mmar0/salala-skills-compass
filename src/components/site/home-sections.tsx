import { ArrowLeft } from "lucide-react";
import { SectionHead, ExpertCard, CtaBand, Stats, WavyBg, FloatsBg } from "@/components/site/Layout";
import { CmsLink } from "@/components/cms/CmsLink";
import { cmsIcon } from "@/lib/cms/icons";
import { useSectionContent } from "@/lib/cms/use-section";
import {
  homeConsulting,
  homeCta,
  homeEntrepreneurship,
  homeExperts,
  homeMethodology,
  homeSponsors,
  homeStats,
  homeVideo,
} from "@/lib/cms/pages/home";

export function StatsSection() {
  const c = useSectionContent(homeStats);
  return <Stats items={c.items} />;
}

export function Methodology() {
  const c = useSectionContent(homeMethodology);
  return (
    <section className="container-site py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <img
          src={c.image}
          alt={c.title}
          loading="lazy"
          decoding="async"
          width={1408}
          height={1008}
          className="animate-float rounded-3xl shadow-soft"
        />
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

export function VideoSection() {
  const c = useSectionContent(homeVideo);
  const items = Array.isArray(c.items) ? c.items : [];
  return (
    <section className="container-site py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-sm font-semibold text-primary">{c.eyebrow}</span>
          <h2 className="mt-2 text-3xl font-bold text-forest md:text-4xl">{c.title}</h2>
          <p className="mt-3 text-muted-foreground leading-8">{c.subtitle}</p>
          {items.length > 0 && (
            <div className="mt-8 space-y-4">
              {items.map((p, i) => {
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
          )}
          {c.ctaLabel && (
            <CmsLink href={c.ctaHref} className="btn-primary mt-8">
              {c.ctaLabel} <ArrowLeft className="h-4 w-4" />
            </CmsLink>
          )}
        </div>
        <div className="overflow-hidden rounded-3xl border bg-card shadow-soft">
          {c.src ? (
            <video
              className="aspect-video w-full bg-forest/90 object-cover"
              src={c.src}
              poster={c.poster || undefined}
              controls
              playsInline
              preload="metadata"
            >
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
          ) : c.poster ? (
            <img src={c.poster} alt={c.title} loading="lazy" decoding="async" className="aspect-video w-full object-cover" />
          ) : (
            <div className="grid aspect-video place-items-center bg-forest/90 px-6 text-center text-forest-foreground/80">
              <p className="max-w-sm text-sm leading-7 md:text-base">
                الفيديو التعريفي سيظهر هنا بعد رفعه من لوحة الإدارة.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Consulting() {
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

export function Entrepreneurship() {
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

export function Experts() {
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

export function Sponsors() {
  const c = useSectionContent(homeSponsors);
  const items = c.items.filter((p) => p.logo || p.name);
  const loop = items.length > 0 ? [...items, ...items] : [];
  return (
    <section className="py-20">
      <div className="container-site">
        <SectionHead eyebrow={c.eyebrow} title={c.title} desc={c.subtitle} />
      </div>
      {loop.length > 0 && (
        <div className="mt-10 overflow-hidden" dir="ltr" aria-label={c.title}>
          <div className="sponsors-marquee flex items-center gap-10 px-4 md:gap-14">
            {loop.map((p, i) => (
              <figure key={`${p._id ?? p.name}-${i}`} className="flex w-36 shrink-0 flex-col items-center gap-3 md:w-44">
                {p.logo ? (
                  <img src={p.logo} alt={p.name || ""} loading="lazy" className="h-16 w-auto max-w-full object-contain md:h-20" />
                ) : null}
                {p.name ? (
                  <figcaption dir="rtl" className="text-center font-display text-sm text-muted-foreground md:text-base">
                    {p.name}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function Cta() {
  const c = useSectionContent(homeCta);
  return <CtaBand title={c.title} desc={c.body} label={c.ctaLabel} to={c.ctaHref} />;
}
