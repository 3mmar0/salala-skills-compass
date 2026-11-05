import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Info } from "lucide-react";
import { PageHero } from "@/components/site/Layout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { getCategory } from "@/data/courses";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/courses/$slug")({
  head: ({ params }) => {
    const cat = getCategory(params.slug);
    if (!cat || cat.slug === "animal-livestock") {
      return meta(
        "مجال تدريبي",
        "تفاصيل المجال التدريبي في منصة سلالة.",
        `/courses/${params.slug}`,
      );
    }
    return meta(cat.title, cat.description, cat.path);
  },
  component: CategoryPlaceholderPage,
});

function CategoryPlaceholderPage() {
  const { slug } = Route.useParams();
  const cat = getCategory(slug);
  if (!cat || cat.slug === "animal-livestock") {
    throw notFound();
  }

  return (
    <>
      <PageHero
        image={typeof cat.image === "string" ? cat.image : cat.image.src}
        eyebrow="مجالات التدريب"
        title={cat.shortTitle ?? cat.title}
        subtitle={cat.description}
      />
      <Breadcrumbs
        items={[
          { label: "الرئيسية", to: "/" },
          { label: "الدورات والتدريبات", to: "/courses" },
          { label: cat.shortTitle ?? cat.title },
        ]}
      />
      <section className="container-site py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border bg-card p-8 text-center shadow-soft">
          <Info className="mx-auto h-10 w-10 text-gold-dark" />
          <h2 className="mt-4 text-2xl font-bold text-forest">
            المحتوى التفصيلي غير منشور في المصدر المرجعي
          </h2>
          <p className="mt-3 leading-8 text-muted-foreground">
            يظهر هذا المجال في صفحة «الدورات والتدريبات» بالموقع المرجعي بالعنوان والوصف أعلاه، دون
            صفحة كورسات فرعية أو استمارة تسجيل منشورة يمكن الاعتماد عليها. لذلك نعرض البيانات
            المتاحة فقط دون اختراع تفاصيل إضافية.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/courses/animal-livestock/animal" className="btn-primary">
              الانتقال لدورات الإنتاج الحيواني المكتملة <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-ghost-light !text-forest !border-primary/30">
              طلب تدريب مخصص
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
