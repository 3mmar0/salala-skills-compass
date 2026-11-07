import { PageSections } from "@/components/cms/PageSections";
import { CmsLink } from "@/components/cms/CmsLink";
import { useSectionContent } from "@/lib/cms/use-section";
import { cmsIcon } from "@/lib/cms/icons";
import { policiesPage, policiesHero, policiesPolicies } from "@/lib/cms/pages/policies";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/policies")({
  head: () => meta("السياسات والشروط", "سياسة الخصوصية وشروط الاستخدام وسياسة التسجيل والاسترداد في منصة سلالة.", "/policies"),
  component: Policies,
});




function Policies() {
  return <PageSections page={policiesPage} components={{hero: HeroSection, policies: PoliciesSection}} />;
}

function HeroSection() {
  const c = useSectionContent(policiesHero);
  return (
<PageHero image={c.image} eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
  );
}

function PoliciesSection() {
  const c = useSectionContent(policiesPolicies);
  return (
<section className="container-site grid gap-10 py-24 lg:grid-cols-[220px_1fr]">
        <nav className="hidden h-fit space-y-2 lg:sticky lg:top-28 lg:block">
          {c.sections.map((s, i) => <a key={s._id ?? i} href={`#p${i}`} className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary">{s.t}</a>)}
        </nav>
        <div className="space-y-6">
          {c.sections.map((s, i) => (
            <article key={s._id ?? i} id={`p${i}`} className="rounded-2xl border bg-card p-8 shadow-soft card-fx reveal">
              <h2 className="text-2xl font-bold text-forest">{s.t}</h2>
              {s.body.split("\n").filter(Boolean).map((x, i) => <p key={i} className="mt-3 leading-8 text-muted-foreground">{x}</p>)}
            </article>
          ))}
        </div>
      </section>
  );
}
