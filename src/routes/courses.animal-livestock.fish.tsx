import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Info } from "lucide-react";
import { PageHero } from "@/components/site/Layout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { getAnimalBranch } from "@/data/courses";
import { meta } from "@/lib/meta";

const branch = getAnimalBranch("fish")!;

export const Route = createFileRoute("/courses/animal-livestock/fish")({
  head: () => meta(branch.title, branch.description, "/courses/animal-livestock/fish"),
  component: FishPage,
});

function FishPage() {
  return (
    <>
      <PageHero
        image={typeof branch.image === "string" ? branch.image : branch.image.src}
        eyebrow="الإنتاج الحيواني والداجني والسمكي"
        title={branch.title}
        subtitle={branch.description}
      />
      <Breadcrumbs
        items={[
          { label: "الرئيسية", to: "/" },
          { label: "الدورات والتدريبات", to: "/courses" },
          { label: "الإنتاج الحيواني والداجني والسمكي", to: "/courses/animal-livestock" },
          { label: branch.title },
        ]}
      />
      <section className="container-site py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border bg-card p-8 text-center shadow-soft">
          <Info className="mx-auto h-10 w-10 text-gold-dark" />
          <h2 className="mt-4 text-2xl font-bold text-forest">
            التفاصيل التفصيلية للكورسات غير متاحة بعد
          </h2>
          <p className="mt-3 leading-8 text-muted-foreground">
            في الموقع المرجعي تظهر بطاقة قسم «{branch.title}» مع الوصف أعلاه، لكن صفحة الكورسات
            الفرعية ونموذج التسجيل غير منشورين حالياً (404). لم نقم باختراع محتوى غير موجود في
            المصدر.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/courses/animal-livestock/animal" className="btn-primary">
              تصفح دورات الإنتاج الحيواني المتاحة <ArrowLeft className="h-4 w-4" />
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
