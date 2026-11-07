import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Particles, WavyBg } from "@/components/site/Layout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CmsLink } from "@/components/cms/CmsLink";
import { PageSections } from "@/components/cms/PageSections";
import { getCatalog, type PublicCategory } from "@/lib/course-catalog";
import { useSectionContent } from "@/lib/cms/use-section";
import { coursesCatalog, coursesCustomTraining, coursesHero, coursesPage } from "@/lib/cms/pages/courses";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/courses/")({
  head: () =>
    meta(
      "الدورات والتدريبات",
      "مجالات التدريب الزراعي في سلالة: الإنتاج الحيواني والنباتي، وقاية النبات، التصنيع الغذائي وغيرها.",
      "/courses",
    ),
  component: Courses,
});

function Courses() {
  const [q, setQ] = useState("");
  return (
    <PageSections
      page={coursesPage}
      components={{ customTraining: CustomTraining }}
      elements={{ hero: <Hero q={q} setQ={setQ} />, catalog: <Catalog q={q} /> }}
    />
  );
}

function Hero({ q, setQ }: { q: string; setQ: (v: string) => void }) {
  const c = useSectionContent(coursesHero);
  return (
    <>
      <section className="relative overflow-hidden text-forest-foreground">
        <img src={c.image} alt={c.title} width={1600} height={1008} className="animate-ken-burns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-forest/70" />
        <Particles />
        <div className="container-site relative flex flex-col items-center py-28 text-center md:py-36">
          {c.logoText && (
            <span dir="ltr" className="logo-hero animate-fade-up text-6xl md:text-8xl">
              {c.logoText}
            </span>
          )}
          <h1 className="animate-fade-up delay-1 mt-2 text-4xl font-bold md:text-6xl">{c.title}</h1>
          <p className="animate-fade-up delay-2 mt-4 text-lg opacity-80">{c.subtitle}</p>
          <label className="animate-fade-up delay-3 mt-8 flex w-full max-w-xl items-center gap-2 rounded-xl bg-card px-4 py-3 text-foreground shadow-soft">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={c.searchPlaceholder}
              className="w-full bg-transparent outline-none"
              aria-label="ابحث عن مجال تدريبي"
            />
            <Search className="h-5 w-5 text-muted-foreground" />
          </label>
        </div>
        <svg className="absolute bottom-0 left-0 h-16 w-full fill-background md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,100 C360,0 1080,0 1440,100 Z" />
        </svg>
      </section>
      <Breadcrumbs items={[{ label: "الرئيسية", to: "/" }, { label: "الدورات والتدريبات" }]} />
    </>
  );
}

function Catalog({ q }: { q: string }) {
  const c = useSectionContent(coursesCatalog);
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [catalogError, setCatalogError] = useState(false);
  useEffect(() => {
    void getCatalog()
      .then((data) => setCategories(data.categories))
      .catch(() => setCatalogError(true));
  }, []);
  const query = q.trim();
  const featured = useMemo(
    () => categories.filter((cat, index) => index < 2 && `${cat.title} ${cat.description}`.includes(query)),
    [categories, query],
  );
  const others = useMemo(
    () => categories.filter((cat, index) => index >= 2 && `${cat.title} ${cat.description}`.includes(query)),
    [categories, query],
  );

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24">
      <WavyBg />
      <div className="container-site relative">
        <div className="mb-14 text-center">
          <h2 className="text-shimmer text-4xl font-bold md:text-5xl">{c.title}</h2>
          <span className="title-line" />
          <p className="mt-3 text-muted-foreground">{c.subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((cat) => (
            <CatalogCard key={cat.slug} category={cat} cta={c.cardCta} featured />
          ))}
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((cat) => (
            <CatalogCard key={cat.slug} category={cat} cta={c.cardCta} />
          ))}
        </div>
        {featured.length + others.length === 0 && (
          <p className="text-center text-muted-foreground">{catalogError ? "تعذر تحميل الدورات حاليًا." : c.emptyText}</p>
        )}
      </div>
    </section>
  );
}

function CustomTraining() {
  const c = useSectionContent(coursesCustomTraining);
  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="absolute left-1/2 top-10 h-72 w-72 animate-blob rounded-full bg-gold/15 blur-3xl" />
      <div className="container-site relative grid items-end gap-8 md:grid-cols-[1fr_40%]">
        <div className="reveal py-20 text-center">
          <h3 className="text-3xl font-bold text-primary md:text-5xl md:leading-tight">{c.title}</h3>
          <p className="mt-5 leading-8 text-foreground/80">{c.body}</p>
          {c.ctaLabel && (
            <CmsLink href={c.ctaHref} className="btn-primary mt-8 rounded-xl px-10 py-4">
              {c.ctaLabel} <ArrowLeft className="h-4 w-4" />
            </CmsLink>
          )}
        </div>
        {c.image && <img src={c.image} alt="" aria-hidden className="hidden h-72 w-full object-contain object-bottom md:block" />}
      </div>
    </section>
  );
}

function CatalogCard({ category, featured, cta }: { category: PublicCategory; featured?: boolean; cta: string }) {
  return (
    <Link
      to="/courses/$slug"
      params={{ slug: category.slug }}
      className={`card-fx flex flex-col rounded-3xl border bg-card p-6 shadow-soft ${featured ? "border-gold" : ""}`}
    >
      {category.image && <img src={category.image} alt="" className="mb-5 h-28 w-28 rounded-2xl object-cover" />}
      <h3 className="text-xl font-bold text-forest">{category.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{category.description}</p>
      <span className="mt-6 text-sm font-semibold text-primary">{cta}</span>
    </Link>
  );
}
