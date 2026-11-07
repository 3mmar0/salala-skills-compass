import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PageHero, WavyBg } from "@/components/site/Layout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { getCatalog, type PublicCategory } from "@/lib/course-catalog";
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
  useEffect(() => { void getCatalog().then((data) => setCat(data.categories.find((item) => item.slug === "animal-livestock") ?? null)); }, []);
  if (!cat) return <section className="container-site py-24 text-center text-muted-foreground">جاري تحميل التخصصات…</section>;
  return (
    <>
      <PageHero
        image={cat.image || courseHero}
        eyebrow="Solala"
        title={cat.title}
        subtitle="برامج ودورات تدريبية وتطبيقية مقدمة لتأهيل الطلاب و الخريجين والمربين لإدارة وتشغيل مزارع الثروة الحيوانية والداجنة والسمكية بأعلى كفاءة وربحية."
      >
        <a href="#courses" className="btn-ghost-light">
          استكشف الدورات المتاحة ↓
        </a>
      </PageHero>

      <Breadcrumbs
        items={[
          { label: "الرئيسية", to: "/" },
          { label: "الدورات والتدريبات", to: "/courses" },
          { label: cat.title },
        ]}
      />

      <section id="courses" className="relative isolate overflow-hidden py-20">
        <WavyBg />
        <div className="container-site relative">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-forest md:text-4xl">الدورات المتخصصة في فروع الإنتاج الحيواني</h2>
            <span className="title-line" />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {cat.specialties.map((specialty) => <Link key={specialty.id} to="/courses/$category/$specialty" params={{ category: cat.slug, specialty: specialty.slug }} className="rounded-3xl border bg-card p-6 shadow-soft"><h3 className="text-xl font-bold text-forest">{specialty.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{specialty.description}</p><span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">عرض الدورات <ArrowLeft className="h-4 w-4"/></span></Link>)}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container-site text-center">
          <h3 className="text-2xl font-bold text-primary md:text-3xl">هل تحتاج برنامج تدريب مخصص لمزرعتك أو فريقك؟</h3>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-muted-foreground">
            نقدم برامج تدريب ميدانية مخصصة للشركات والمشاريع الزراعية الكبرى، مصممة وفقاً لاحتياجات فريق العمل والإنتاج لديكم.
          </p>
          <Link to="/contact" className="btn-primary mt-8">
            طلب تدريب مخصص <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
