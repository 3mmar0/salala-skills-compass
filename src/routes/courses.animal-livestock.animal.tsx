import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHero, WavyBg } from "@/components/site/Layout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ProgramCard } from "@/components/site/CourseCards";
import { CourseRegistrationForm } from "@/components/site/CourseRegistrationForm";
import { getAnimalBranch } from "@/data/courses";
import { meta } from "@/lib/meta";

const branch = getAnimalBranch("animal")!;

export const Route = createFileRoute("/courses/animal-livestock/animal")({
  head: () =>
    meta(
      branch.title,
      branch.heroSubtitle ?? branch.description,
      "/courses/animal-livestock/animal",
    ),
  component: AnimalProductionPage,
});

function AnimalProductionPage() {
  const programs = branch.programs ?? [];
  return (
    <>
      <PageHero
        image={typeof branch.image === "string" ? branch.image : branch.image.src}
        eyebrow={branch.heroEyebrow ?? "دليل البرامج التخصصية المعتمدة"}
        title={branch.heroTitle ?? branch.title}
        subtitle={branch.heroSubtitle}
      >
        <a href="#programs" className="btn-gold">
          استعراض الكورسات الـ {programs.length}
        </a>
        <a href="#registration-form" className="btn-ghost-light">
          الذهاب لاستمارة التسجيل
        </a>
      </PageHero>

      <Breadcrumbs
        items={[
          { label: "الرئيسية", to: "/" },
          { label: "الدورات والتدريبات", to: "/courses" },
          { label: "الإنتاج الحيواني والداجني والسمكي", to: "/courses/animal-livestock" },
          { label: branch.title },
        ]}
      />

      <section id="programs" className="relative isolate overflow-hidden py-20">
        <WavyBg />
        <div className="container-site relative space-y-8">
          <div className="text-center">
            <span className="text-sm font-semibold text-primary">برامج تدريبية احترافية</span>
            <h2 className="mt-2 text-3xl font-bold text-forest md:text-4xl">
              الكورسات التدريبية في الإنتاج الحيواني
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground leading-8">
              كل دورة مصممة بعناية لتغطي محاور عملية دقيقة، معتمدة بعدد ساعات معتمد وإشراف نخبة من
              أكفأ الاستشاريين.
            </p>
          </div>
          {programs.map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
      </section>

      <section className="container-site pb-20">
        <p className="mb-4 text-sm font-semibold text-primary">التسجيل المباشر</p>
        <CourseRegistrationForm track="animal-production" />
      </section>

      <section className="bg-muted py-16">
        <div className="container-site text-center">
          <h3 className="text-2xl font-bold text-primary md:text-3xl">
            هل تبحث عن برنامج تدريبي مخصص لمؤسستك؟
          </h3>
          <p className="mt-3 text-muted-foreground">نوفر حقائب تدريبية مخصصة لمؤسستك</p>
          <Link to="/contact" className="btn-primary mt-8">
            طلب تدريب مخصص <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
