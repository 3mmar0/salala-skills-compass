import { PageSections } from "@/components/cms/PageSections";
import { CmsLink } from "@/components/cms/CmsLink";
import { useSectionContent } from "@/lib/cms/use-section";
import { cmsIcon } from "@/lib/cms/icons";
import { faqPage, faqHero, faqQuestions, faqCta } from "@/lib/cms/pages/faq";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { PageHero, CtaBand } from "@/components/site/Layout";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/faq")({
  head: () => meta("الأسئلة الشائعة", "إجابات عن أكثر الأسئلة شيوعاً حول دورات واستشارات وبرامج سلالة.", "/faq"),
  component: Faq,
});




function Faq() {
  return <PageSections page={faqPage} components={{hero: HeroSection, questions: QuestionsSection, cta: CtaSection}} />;
}

function HeroSection() {
  const c = useSectionContent(faqHero);
  return (
<PageHero image={c.image} eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
  );
}

function QuestionsSection() {
  const c = useSectionContent(faqQuestions);
  return (
<section className="container-site max-w-3xl py-24">
        <div className="space-y-3">
          {c.qs.map((item, i) => (
            <details key={item._id ?? i} className="group rounded-2xl border bg-card p-6 shadow-soft card-fx reveal">
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

function CtaSection() {
  const c = useSectionContent(faqCta);
  return (
<CtaBand title={c.title} desc={c.body} to={c.ctaHref} label={c.ctaLabel} />
  );
}
