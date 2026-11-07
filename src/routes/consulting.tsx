import { PageSections } from "@/components/cms/PageSections";
import { CmsLink } from "@/components/cms/CmsLink";
import { useSectionContent } from "@/lib/cms/use-section";
import { cmsIcon } from "@/lib/cms/icons";
import { consultingPage, consultingHero, consultingAudience, consultingExperts, consultingSteps, consultingClients, consultingCta } from "@/lib/cms/pages/consulting";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, User } from "lucide-react";
import { PageHero, SectionHead, ExpertCard, CtaBand , WavyBg, FloatsBg } from "@/components/site/Layout";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/consulting")({
  head: () => meta("الاستشارات", "استشارات زراعية متخصصة للشركات والأفراد يقدمها كبار الخبراء في سلالة.", "/consulting"),
  component: Consulting,
});






function Consulting() {
  return <PageSections page={consultingPage} components={{hero: HeroSection, audience: AudienceSection, experts: ExpertsSection, steps: StepsSection, clients: ClientsSection, cta: CtaSection}} />;
}

function HeroSection() {
  const c = useSectionContent(consultingHero);
  return (
<PageHero image={c.image} eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle}>
        {c.text4 && <CmsLink href={c.ctaHref} className="btn-gold">{c.text4}</CmsLink>}
      </PageHero>
  );
}

function AudienceSection() {
  const c = useSectionContent(consultingAudience);
  return (
<section className="container-site py-24">
        <SectionHead eyebrow={c.eyebrow} title={c.title} desc={c.body} />
        <div className="grid gap-6 md:grid-cols-2">
          {c.audience.map((item, i) => { const { icon, e, t, d, c } = item; const I = cmsIcon(icon); return (
            <div key={item._id ?? i} className="rounded-3xl border bg-card p-9 shadow-soft card-fx reveal">
              <I className="h-10 w-10 text-primary" />
              <span className="mt-4 block text-sm text-muted-foreground">{e}</span>
              <h3 className="mt-1 text-2xl font-bold text-forest">{t}</h3>
              <p className="mt-3 leading-8 text-muted-foreground">{d}</p>
              {c && <CmsLink href={item.href} className="btn-primary mt-6">{c}</CmsLink>}
            </div>
          ); })}
        </div>
      </section>
  );
}

function ExpertsSection() {
  const c = useSectionContent(consultingExperts);
  return (
<section id="experts" className="relative isolate overflow-hidden bg-muted py-24">
        {c.backgroundImage && <img src={c.backgroundImage} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60" />}
        <div className="container-site relative">
          <SectionHead eyebrow={c.eyebrow} title={c.title} desc={c.body} />
          <div className="grid gap-5 md:grid-cols-3">{c.experts.map((e, i) => <ExpertCard key={e._id ?? i} {...e} />)}</div>
        </div>
      </section>
  );
}

function StepsSection() {
  const c = useSectionContent(consultingSteps);
  return (
<section className="container-site py-24">
        <SectionHead title={c.title} desc={c.body} />
        <div className="grid gap-5 md:grid-cols-4">
          {c.steps.map((s, i) => (
            <div key={s._id ?? i} className="rounded-2xl border bg-card p-6">
              <span className="font-display text-4xl font-bold text-gold">{s.number}</span>
              <h5 className="mt-3 font-bold text-forest">{s.t}</h5>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
  );
}

function ClientsSection() {
  const c = useSectionContent(consultingClients);
  return (
<section className="relative isolate overflow-hidden bg-sand py-24">
        {c.backgroundImage && <img src={c.backgroundImage} alt="" aria-hidden className="pointer-events-none absolute inset-0 -z-0 h-full w-full object-cover opacity-90" />}
        <div className="container-site relative">
          <SectionHead eyebrow={c.eyebrow} title={c.title} desc={c.body} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.clients.map((item, i) => (
              <div key={item._id ?? i} className="rounded-2xl bg-card p-6 text-center shadow-soft card-fx reveal">
                <h5 className="font-bold text-forest">{item.t}</h5>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}

function CtaSection() {
  const c = useSectionContent(consultingCta);
  return (
<CtaBand title={c.title} desc={c.body} to={c.ctaHref} label={c.ctaLabel} />
  );
}
