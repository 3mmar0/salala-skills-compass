import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/site/Layout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
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
  useEffect(() => { void getCatalog().then((data) => setCat(data.categories.find((item) => item.slug === slug) ?? null)); }, [slug]);
  if (!cat) return <section className="container-site py-24 text-center text-muted-foreground">جاري تحميل التخصصات…</section>;

  return (
    <>
      <PageHero
        image={cat.image || courseHero}
        eyebrow="مجالات التدريب"
        title={cat.shortTitle ?? cat.title}
        subtitle={cat.description}
      />
      <Breadcrumbs
        items={[
          { label: "الرئيسية", to: "/" },
          { label: "الدورات والتدريبات", to: "/courses" },
          { label: cat.title },
        ]}
      />
      <section className="container-site py-20"><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{cat.specialties.map((specialty)=><Link key={specialty.id} to="/courses/$category/$specialty" params={{category:cat.slug,specialty:specialty.slug}} className="rounded-3xl border bg-card p-6 shadow-soft transition hover:-translate-y-1"><h2 className="text-xl font-bold text-forest">{specialty.title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{specialty.description}</p><span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">عرض الدورات <ArrowLeft className="h-4 w-4"/></span></Link>)}</div></section>
    </>
  );
}
