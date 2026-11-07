import { PageSections } from "@/components/cms/PageSections";
import { CmsLink } from "@/components/cms/CmsLink";
import { useSectionContent } from "@/lib/cms/use-section";
import { cmsIcon } from "@/lib/cms/icons";
import { aboutPage, aboutHero, aboutVision, aboutValues, aboutTeam, aboutCta } from "@/lib/cms/pages/about";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, Target, Lightbulb, Leaf, ShieldCheck } from "lucide-react";
import { PageHero, SectionHead, ExpertCard, CtaBand , WavyBg } from "@/components/site/Layout";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/about")({
  head: () => meta("عن سلالة", "رؤية ورسالة وقيم منصة سلالة وفريق خبرائها من المهندسين الزراعيين.", "/about"),
  component: About,
});





function About() {
  return <PageSections page={aboutPage} components={{hero: HeroSection, vision: VisionSection, values: ValuesSection, team: TeamSection, cta: CtaSection}} />;
}

function HeroSection() {
  const c = useSectionContent(aboutHero);
  return (
<PageHero image={c.image} eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
  );
}

function VisionSection() {
  const c = useSectionContent(aboutVision);
  return (
<section className="container-site py-24">
        <SectionHead eyebrow={c.eyebrow} title={c.title} />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="rounded-2xl border bg-card p-7 shadow-soft card-fx reveal">
              <Eye className="h-8 w-8 text-primary" />
              <h3 className="mt-3 text-xl font-bold text-forest">{c.text2}</h3>
              <p className="mt-2 leading-8 text-muted-foreground">{c.text3}</p>
            </div>
            <div className="rounded-2xl border bg-card p-7 shadow-soft card-fx reveal">
              <Target className="h-8 w-8 text-primary" />
              <h3 className="mt-3 text-xl font-bold text-forest">{c.text4}</h3>
              <p className="mt-2 leading-8 text-muted-foreground">{c.text5}</p>
            </div>
          </div>
          {c.image && <img src={c.image} alt={c.imageAlt} loading="lazy" width={1408} height={1008} className="rounded-3xl shadow-soft reveal" />}
        </div>
      </section>
  );
}

function ValuesSection() {
  const c = useSectionContent(aboutValues);
  return (
<section className="relative isolate overflow-hidden bg-sand py-24">
        {c.backgroundImage && <img src={c.backgroundImage} alt="" aria-hidden className="pointer-events-none absolute inset-0 -z-0 h-full w-full object-cover opacity-90" />}
        <div className="container-site relative">
          <SectionHead title={c.title} desc={c.body} />
          <div className="grid gap-5 md:grid-cols-3">
            {c.values.map((item, i) => { const { icon, t, d } = item; const I = cmsIcon(icon); return (
              <div key={item._id ?? i} className="rounded-2xl bg-card p-8 shadow-soft card-fx reveal">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground"><I /></span>
                <h4 className="mt-5 text-lg font-bold text-forest">{t}</h4>
                <p className="mt-2 leading-7 text-muted-foreground">{d}</p>
              </div>
            ); })}
          </div>
        </div>
      </section>
  );
}

function TeamSection() {
  const c = useSectionContent(aboutTeam);
  return (
<section className="container-site py-24">
        <SectionHead eyebrow={c.eyebrow} title={c.title} desc={c.body} />
        <div className="grid gap-5 md:grid-cols-3">{c.team.map((e, i) => <ExpertCard key={e._id ?? i} {...e} />)}</div>
      </section>
  );
}

function CtaSection() {
  const c = useSectionContent(aboutCta);
  return (
<CtaBand title={c.title} desc={c.body} to={c.ctaHref} label={c.ctaLabel} />
  );
}
