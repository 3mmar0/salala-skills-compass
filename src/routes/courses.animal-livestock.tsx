import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHero, WavyBg } from "@/components/site/Layout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { BranchCard } from "@/components/site/CourseCards";
import { animalLivestockCategory } from "@/data/courses";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/courses/animal-livestock")({
  head: () =>
    meta(
      animalLivestockCategory.title,
      "برامج ودورات تدريبية وتطبيقية لتأهيل الطلاب والخريجين والمربين لإدارة وتشغيل مزارع الثروة الحيوانية والداجنة والسمكية.",
      "/courses/animal-livestock",
    ),
  component: AnimalLivestockHub,
});

function AnimalLivestockHub() {
  const cat = animalLivestockCategory;
  return (
    <>
      <PageHero
        image={typeof cat.image === "string" ? cat.image : cat.image.src}
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
            <h2 className="text-3xl font-bold text-forest md:text-4xl">
              الدورات المتخصصة في فروع الإنتاج الحيواني
            </h2>
            <span className="title-line" />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {cat.branches?.map((b) => (
              <BranchCard key={b.slug} branch={b} parentPath="/courses/animal-livestock" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container-site text-center">
          <h3 className="text-2xl font-bold text-primary md:text-3xl">
            هل تحتاج برنامج تدريب مخصص لمزرعتك أو فريقك؟
          </h3>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-muted-foreground">
            نقدم برامج تدريب ميدانية مخصصة للشركات والمشاريع الزراعية الكبرى، مصممة وفقاً لاحتياجات
            فريق العمل والإنتاج لديكم.
          </p>
          <Link to="/contact" className="btn-primary mt-8">
            طلب تدريب مخصص <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
