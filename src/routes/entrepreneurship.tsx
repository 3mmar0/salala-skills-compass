import { PageSections } from "@/components/cms/PageSections";
import { CmsLink } from "@/components/cms/CmsLink";
import { useSectionContent } from "@/lib/cms/use-section";
import { cmsIcon } from "@/lib/cms/icons";
import { entrepreneurshipPage, entrepreneurshipHero, entrepreneurshipStages, entrepreneurshipCta } from "@/lib/cms/pages/entrepreneurship";
import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb, Hammer, Rocket, Handshake, Store } from "lucide-react";
import { PageHero, SectionHead, CtaBand , WavyBg } from "@/components/site/Layout";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/entrepreneurship")({
  head: () => meta("ريادة الأعمال والمشاريع", "برامج سلالة لاحتضان الأفكار وبناء وتطوير المشاريع الزراعية وربطها بالمستثمرين.", "/entrepreneurship"),
  component: Page,
});




function Page() {
  return <PageSections page={entrepreneurshipPage} components={{hero: HeroSection, stages: StagesSection, cta: CtaSection}} />;
}

function HeroSection() {
  const c = useSectionContent(entrepreneurshipHero);
  return (
<PageHero image={c.image} eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
  );
}

function StagesSection() {
  const c = useSectionContent(entrepreneurshipStages);
  return (
<section className="relative isolate overflow-hidden py-24">
        {c.backgroundImage && <img src={c.backgroundImage} alt="" aria-hidden className="pointer-events-none absolute inset-0 -z-0 h-full w-full object-cover opacity-90" />}
        <div className="container-site relative">
        <SectionHead title={c.title} desc={c.body} />
        <div className="space-y-5">
          {c.stages.map((item, i) => { const { icon, t, d, features } = item; const I = cmsIcon(icon); return (
            <div key={item._id ?? i} className="grid items-center gap-6 rounded-3xl border bg-card p-7 shadow-soft card-fx reveal md:grid-cols-[auto_1fr_auto]">
              <div className="flex items-center gap-4">
                <span className="grid h-20 w-20 place-items-center rounded-2xl bg-primary text-gold ring-4 ring-gold/25 shadow-soft"><I className="h-9 w-9" /></span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-forest">{t}</h3>
                <p className="mt-1 leading-7 text-muted-foreground">{d}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {features.split("\n").filter(Boolean).map((x, i) => <span key={i} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">{x}</span>)}
              </div>
            </div>
          ); })}
        </div>
        </div>
      </section>
  );
}

function CtaSection() {
  const c = useSectionContent(entrepreneurshipCta);
  return (
<CtaBand title={c.title} desc={c.body} to={c.ctaHref} label={c.ctaLabel} />
  );
}
