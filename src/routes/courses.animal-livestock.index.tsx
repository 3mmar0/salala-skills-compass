import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PageHero, WavyBg } from "@/components/site/Layout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CmsLink } from "@/components/cms/CmsLink";
import { PageSections } from "@/components/cms/PageSections";
import { getCatalog, type PublicCategory } from "@/lib/course-catalog";
import { useSectionContent } from "@/lib/cms/use-section";
import { livestockCustom, livestockHero, livestockPage, livestockSpecialties } from "@/lib/cms/pages/courses";
import { meta } from "@/lib/meta";
import courseHero from "@/assets/h-courses.jpg";

export const Route = createFileRoute("/courses/animal-livestock/")({
  head: () =>
    meta(
      "الإنتاج الحيواني والداجني والسمكي",
      "برامج ودورات تدريبية وتطبيقية لتأهيل الطلاب والخريجين والمربين لإدارة وتشغيل مزارع الثروة الحيوانية والداجنة والسمكية.",
      "/courses/animal-livestock",
    ),
  component: AnimalLivestockHub,
});

function AnimalLivestockHub() {
  const [cat, setCat] = useState<PublicCategory | null>(null);
  useEffect(() => {
    void getCatalog().then((data) => setCat(data.categories.find((item) => item.slug === "animal-livestock") ?? null));
  }, []);
  return (
    <PageSections
      page={livestockPage}
      components={{ cta: Custom }}
      elements={{ hero: <Hero cat={cat} />, specialties: <Specialties cat={cat} /> }}
    />
  );
}

function Hero({ cat }: { cat: PublicCategory | null }) {
  const c = useSectionContent(livestockHero);
  const title = cat?.title ?? "الإنتاج الحيواني والداجني والسمكي";
  return (
    <>
      <PageHero image={c.image || cat?.image || courseHero} eyebrow={c.eyebrow} title={title} subtitle={c.subtitle}>
        {c.ctaLabel && (
          <a href="#courses" className="btn-ghost-light">
            {c.ctaLabel}
          </a>
        )}
      </PageHero>
      <Breadcrumbs
        items={[
          { label: "الرئيسية", to: "/" },
          { label: "الدورات والتدريبات", to: "/courses" },
          { label: title },
        ]}
      />
    </>
  );
}

function Specialties({ cat }: { cat: PublicCategory | null }) {
  const c = useSectionContent(livestockSpecialties);
  return (
    <section id="courses" className="relative isolate overflow-hidden py-20">
      <WavyBg />
      <div className="container-site relative">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-forest md:text-4xl">{c.title}</h2>
          <span className="title-line" />
        </div>
        {!cat ? (
          <p className="text-center text-muted-foreground">جاري تحميل التخصصات…</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {cat.specialties.map((specialty) => (
              <Link
                key={specialty.id}
                to="/courses/$category/$specialty"
                params={{ category: cat.slug, specialty: specialty.slug }}
                className="rounded-3xl border bg-card p-6 shadow-soft"
              >
                {specialty.image && <img src={specialty.image} alt="" className="mb-4 h-40 w-full rounded-2xl object-cover" />}
                <h3 className="text-xl font-bold text-forest">{specialty.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{specialty.description}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  {c.cardCta} <ArrowLeft className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Custom() {
  const c = useSectionContent(livestockCustom);
  return (
    <section className="bg-muted py-16">
      <div className="container-site text-center">
        <h3 className="text-2xl font-bold text-primary md:text-3xl">{c.title}</h3>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-muted-foreground">{c.body}</p>
        {c.ctaLabel && (
          <CmsLink href={c.ctaHref} className="btn-primary mt-8">
            {c.ctaLabel} <ArrowLeft className="h-4 w-4" />
          </CmsLink>
        )}
      </div>
    </section>
  );
}
