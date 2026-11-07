import { PageSections } from "@/components/cms/PageSections";
import { CmsLink } from "@/components/cms/CmsLink";
import { useSectionContent } from "@/lib/cms/use-section";
import { cmsIcon } from "@/lib/cms/icons";
import { libraryPage, libraryHero, libraryResources } from "@/lib/cms/pages/library";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, FileText, PlayCircle, Download } from "lucide-react";
import { PageHero, SectionHead , FloatsBg } from "@/components/site/Layout";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/library")({
  head: () => meta("المكتبة", "مكتبة سلالة: كتب وأدلة ومقالات وفيديوهات تعليمية في المجالات الزراعية.", "/library"),
  component: Library,
});

const types = { book: { i: BookOpen }, guide: { i: FileText }, video: { i: PlayCircle } } as const;
type T = keyof typeof types;



function Library() {
  return <PageSections page={libraryPage} components={{hero: HeroSection, resources: ResourcesSection}} />;
}

function HeroSection() {
  const c = useSectionContent(libraryHero);
  return (
<PageHero image={c.image} eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
  );
}

function ResourcesSection() {
  const c = useSectionContent(libraryResources);
  const [f, setF] = useState<T | "all">("all");
  const list = c.items.filter((x) => f === "all" || x.k === f);
  const typeLabel = (k: string) => k === "book" ? c.bookLabel : k === "guide" ? c.guideLabel : c.videoLabel;
  return (
<section className="relative isolate overflow-hidden py-24">
        {c.backgroundImage && <img src={c.backgroundImage} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60" />}
        <div className="container-site relative">
        <SectionHead title={c.title} />
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {(["all", "book", "guide", "video"] as const).map((k) => (
            <button key={k} onClick={() => setF(k)} className={`rounded-full px-5 py-2 text-sm font-medium transition ${f === k ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-primary"}`}>
              {k === "all" ? c.allLabel : typeLabel(k)}
            </button>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((x, i) => {
            const I = types[x.k as T]?.i ?? BookOpen;
            return (
              <div key={x._id ?? i} className="rounded-2xl border bg-card p-6 shadow-soft card-fx reveal">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary"><I /></span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs">{typeLabel(x.k)}</span>
                </div>
                <h4 className="mt-5 text-lg font-bold text-forest">{x.t}</h4>
                <p className="text-xs font-medium text-primary">{x.c}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{x.d}</p>
                <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary"><Download className="h-4 w-4" />{c.text2}</button>
              </div>
            );
          })}
        </div>
        </div>
      </section>
  );
}
