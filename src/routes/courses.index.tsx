import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { Particles, WavyBg } from "@/components/site/Layout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { getCatalog, type PublicCategory } from "@/lib/course-catalog";
import { useCms } from "@/lib/cms/CmsProvider";
import { meta } from "@/lib/meta";
import courseHero from "@/assets/h-courses.jpg";

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
  const { store } = useCms();
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [catalogError, setCatalogError] = useState(false);
  useEffect(() => {
    void getCatalog().then((data) => setCategories(data.categories)).catch(() => setCatalogError(true));
  }, []);
  const customTraining = store.sections.find((s) => s.key === "courses.customTraining");
  const showCustomTraining = !customTraining || customTraining.visible;
  const page = store.pages.find((p) => p.slug === "/courses");
  const [q, setQ] = useState("");
  const query = q.trim();
  const featured = useMemo(
    () => categories.filter((c, index) => index < 2 && `${c.title} ${c.description}`.includes(query)),
    [categories, query],
  );
  const others = useMemo(
    () => categories.filter((c, index) => index >= 2 && `${c.title} ${c.description}`.includes(query)),
    [categories, query],
  );

  return (
    <>
      <section className="relative overflow-hidden text-forest-foreground">
        <img
          src={courseHero}
          alt="مزارع يستخدم جهازاً لوحياً في الحقل"
          width={1600}
          height={1008}
          className="animate-ken-burns absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-forest/70" />
        <Particles />
        <div className="container-site relative flex flex-col items-center py-28 text-center md:py-36">
          <span dir="ltr" className="logo-hero animate-fade-up text-6xl md:text-8xl">
            Solala
          </span>
          <h1 className="animate-fade-up delay-1 mt-2 text-4xl font-bold md:text-6xl">
            {page?.heroTitle || "وجهتك الرئيسية دائما"}
          </h1>
          <p className="animate-fade-up delay-2 mt-4 text-lg opacity-80">
            {page?.heroSubtitle || "اختر مجالك التخصصي وابدأ رحلتك"}
          </p>
          <label className="animate-fade-up delay-3 mt-8 flex w-full max-w-xl items-center gap-2 rounded-xl bg-card px-4 py-3 text-foreground shadow-soft">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ابحث عن مجال..."
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

      <section className="relative isolate overflow-hidden py-16 md:py-24">
        <WavyBg />
        <div className="container-site relative">
          <div className="mb-14 text-center">
            <h2 className="text-shimmer text-4xl font-bold md:text-5xl">مجالات التدريب</h2>
            <span className="title-line" />
            <p className="mt-3 text-muted-foreground">اختر تخصصك وابدأ رحلتك..</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((c) => <CatalogCard key={c.slug} category={c} featured />)}
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((c) => <CatalogCard key={c.slug} category={c} />)}
          </div>
          {featured.length + others.length === 0 && (
            <p className="text-center text-muted-foreground">{catalogError ? "تعذر تحميل الدورات حاليًا." : "لا توجد نتائج مطابقة."}</p>
          )}
        </div>
      </section>

      {showCustomTraining && (
        <section className="relative overflow-hidden bg-muted">
          <div className="absolute left-1/2 top-10 h-72 w-72 animate-blob rounded-full bg-gold/15 blur-3xl" />
          <div className="container-site relative grid items-end gap-8 md:grid-cols-[1fr_40%]">
            <div className="reveal py-20 text-center">
              <h3 className="text-3xl font-bold text-primary md:text-5xl md:leading-tight">
                {customTraining?.title || "هل تبحث عن تدريب مخصص لمزرعتك أو شركتك؟"}
              </h3>
              <p className="mt-5 leading-8 text-foreground/80">
                {customTraining?.body ||
                  "نوفر حقائب تدريبية واستشارات ميدانية مصممة خصيصاً لتلبية متطلبات الشركات والمزارع الخاصة وفرق العمل الزراعي."}
              </p>
              <Link to="/contact" className="btn-primary mt-8 rounded-xl px-10 py-4">
                طلب استشارة أو تدريب مخصص <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
            <img src="/shapes/nature.svg" alt="" aria-hidden className="hidden h-72 w-full object-contain object-bottom md:block" />
          </div>
        </section>
      )}
    </>
  );
}

function CatalogCard({ category, featured }: { category: PublicCategory; featured?: boolean }) {
  return <Link to="/courses/$slug" params={{ slug: category.slug }} className={`card-fx flex flex-col rounded-3xl border bg-card p-6 shadow-soft ${featured ? "border-gold" : ""}`}>
    {category.image && <img src={category.image} alt="" className="mb-5 h-28 w-28 rounded-2xl object-cover" />}
    <h3 className="text-xl font-bold text-forest">{category.title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{category.description}</p><span className="mt-6 text-sm font-semibold text-primary">استكشف التخصصات ←</span>
  </Link>;
}
