import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PageHero, WavyBg } from "@/components/site/Layout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CmsLink } from "@/components/cms/CmsLink";
import { PageSections } from "@/components/cms/PageSections";
import { SpecialtyCard } from "@/components/site/SpecialtyCard";
import { getCatalog, type PublicCategory } from "@/lib/course-catalog";
import { useSectionContent } from "@/lib/cms/use-section";
import { livestockCustom, livestockHero, livestockPage, livestockSpecialties } from "@/lib/cms/pages/courses";
import courseHero from "@/assets/h-courses.jpg";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/courses/$slug")({
  head: ({ params }) =>
    meta(
      params.slug === "animal-livestock" ? "الإنتاج الحيواني والداجني والسمكي" : "مجال تدريبي",
      "تخصصات ودورات منصة سلالة.",
      `/courses/${params.slug}`,
    ),
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const [cat, setCat] = useState<PublicCategory | null>(null);

  useEffect(() => {
    void getCatalog().then((data) => setCat(data.categories.find((item) => item.slug === slug) ?? null));
  }, [slug]);

  // Animal-livestock keeps its richer CMS-managed hub; other categories use the shared layout.
  if (slug === "animal-livestock") {
    return (
      <PageSections
        page={livestockPage}
        components={{ cta: LivestockCustom }}
        elements={{ hero: <LivestockHero cat={cat} />, specialties: <LivestockSpecialties cat={cat} /> }}
      />
    );
  }

  if (!cat) {
    return (
      <section className="container-site py-24 text-center text-muted-foreground">جاري تحميل التخصصات…</section>
    );
  }

  return (
    <>
      <PageHero
        tall
        image={cat.image || courseHero}
        eyebrow="مجالات التدريب"
        title={cat.title}
        subtitle={cat.description}
      />
      <Breadcrumbs
        items={[
          { label: "الرئيسية", to: "/" },
          { label: "البرامج التدريبية", to: "/courses" },
          { label: cat.title },
        ]}
      />
      <section className="relative isolate overflow-hidden py-20">
        <WavyBg />
        <div className="container-site relative">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold text-muted-foreground">بوابة التخصصات</p>
            <h2 className="mt-2 text-3xl font-bold text-forest md:text-4xl">
              الدورات المتخصصة في {cat.title}
            </h2>
            <span className="title-line" />
          </div>
          {cat.specialties.length === 0 ? (
            <p className="rounded-3xl border border-dashed bg-muted/40 py-16 text-center text-muted-foreground">
              لا توجد تخصصات منشورة في هذا المجال حالياً.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cat.specialties.map((specialty) => (
                <SpecialtyCard
                  key={specialty.id}
                  categorySlug={cat.slug}
                  specialtySlug={specialty.slug}
                  title={specialty.title}
                  description={specialty.description}
                  image={specialty.image}
                  ctaLabel="دخول قسم"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function LivestockHero({ cat }: { cat: PublicCategory | null }) {
  const c = useSectionContent(livestockHero);
  const title = cat?.title ?? "الإنتاج الحيواني والداجني والسمكي";
  return (
    <>
      <PageHero tall image={c.image || cat?.image || courseHero} eyebrow={c.eyebrow} title={title} subtitle={c.subtitle}>
        {c.ctaLabel && (
          <a href="#courses" className="btn-ghost-light">
            {c.ctaLabel}
          </a>
        )}
      </PageHero>
      <Breadcrumbs
        items={[
          { label: "الرئيسية", to: "/" },
          { label: "البرامج التدريبية", to: "/courses" },
          { label: title },
        ]}
      />
    </>
  );
}

function LivestockSpecialties({ cat }: { cat: PublicCategory | null }) {
  const c = useSectionContent(livestockSpecialties);
  return (
    <section id="courses" className="relative isolate overflow-hidden py-20">
      <WavyBg />
      <div className="container-site relative">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold text-muted-foreground">بوابة التخصصات</p>
          <h2 className="mt-2 text-3xl font-bold text-forest md:text-4xl">{c.title}</h2>
          <span className="title-line" />
        </div>
        {!cat ? (
          <p className="text-center text-muted-foreground">جاري تحميل التخصصات…</p>
        ) : cat.specialties.length === 0 ? (
          <p className="rounded-3xl border border-dashed bg-muted/40 py-16 text-center text-muted-foreground">
            لا توجد تخصصات منشورة في هذا المجال حالياً.
          </p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {cat.specialties.map((specialty) => (
              <SpecialtyCard
                key={specialty.id}
                categorySlug={cat.slug}
                specialtySlug={specialty.slug}
                title={specialty.title}
                description={specialty.description}
                image={specialty.image}
                ctaLabel={c.cardCta?.includes("دخول") ? c.cardCta : "دخول قسم"}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function LivestockCustom() {
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
