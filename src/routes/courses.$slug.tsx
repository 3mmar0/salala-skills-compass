import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHero, WavyBg } from "@/components/site/Layout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SpecialtyCard } from "@/components/site/SpecialtyCard";
import { getCatalog, type PublicCategory } from "@/lib/course-catalog";
import courseHero from "@/assets/h-courses.jpg";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/courses/$slug")({
  head: ({ params }) => meta("مجال تدريبي", "تخصصات ودورات منصة سلالة.", `/courses/${params.slug}`),
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const [cat, setCat] = useState<PublicCategory | null>(null);

  useEffect(() => {
    void getCatalog().then((data) => setCat(data.categories.find((item) => item.slug === slug) ?? null));
  }, [slug]);

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
      >
        <a href="#courses" className="btn-ghost-light">
          استكشف التخصصات
        </a>
      </PageHero>
      <Breadcrumbs
        items={[
          { label: "الرئيسية", to: "/" },
          { label: "البرامج التدريبية", to: "/courses" },
          { label: cat.title },
        ]}
      />
      <section id="courses" className="relative isolate overflow-hidden py-20">
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
