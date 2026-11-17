import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CatalogCourseCard, courseOrderLabel } from "@/components/site/CourseCards";
import { CourseRegistrationForm } from "@/components/site/CourseRegistrationForm";
import { PageHero, WavyBg } from "@/components/site/Layout";
import { animalPrograms, type CourseProgram } from "@/data/courses";
import { getCatalog, type PublicCategory, type PublicCourse, type PublicSpecialty } from "@/lib/course-catalog";
import { meta } from "@/lib/meta";
import courseHero from "@/assets/h-courses.jpg";
import animalCourse1 from "@/assets/courses/animal-course-1.jpg";
import animalCourse2 from "@/assets/courses/animal-course-2.jpg";
import animalCourse3 from "@/assets/courses/animal-course-3.jpg";
import animalHubImg from "@/assets/courses/animal-hub.jpg";
import poultryImg from "@/assets/courses/poultry.jpg";
import fishImg from "@/assets/courses/fish.jpg";

const SPECIALTY_TITLES: Record<string, string> = {
  animal: "الإنتاج الحيواني",
  poultry: "الإنتاج الداجني",
  fish: "الإنتاج السمكي",
};

export const Route = createFileRoute("/courses/$category/$specialty")({
  head: ({ params }) =>
    meta(
      SPECIALTY_TITLES[params.specialty] ?? "تخصص تدريبي",
      "كورسات وتسجيل في تخصصات منصة سلالة.",
      `/courses/${params.category}/${params.specialty}`,
    ),
  component: SpecialtyPage,
});

const COURSE_IMAGE_FALLBACKS: Record<string, string> = {
  "dairy-cattle": animalCourse1,
  "beef-fattening": animalCourse2,
  "sheep-goats": animalCourse3,
  biosecurity: animalHubImg,
};

const SPECIALTY_IMAGE_FALLBACKS: Record<string, string> = {
  animal: animalHubImg,
  poultry: poultryImg,
  fish: fishImg,
};

const STATIC_BY_SLUG = Object.fromEntries(animalPrograms.map((program) => [program.id, program])) as Record<
  string,
  CourseProgram
>;

function enrichCourse(course: PublicCourse): PublicCourse {
  const fallback = STATIC_BY_SLUG[course.slug];
  if (!fallback) return course;
  return {
    ...course,
    badge: course.badge || fallback.badge,
    format: course.format || fallback.format,
    trainer: course.trainer || fallback.trainer,
    duration: course.duration || fallback.hours,
    image: course.image || fallback.image,
    modules: course.modules?.length ? course.modules : fallback.modules,
  };
}

function SpecialtyPage() {
  const { category, specialty } = Route.useParams();
  const [data, setData] = useState<{ category: PublicCategory; specialty: PublicSpecialty } | null>(null);
  const [preferredCourseTitle, setPreferredCourseTitle] = useState("");

  useEffect(() => {
    void getCatalog().then((r) => {
      const cat = r.categories.find((x) => x.slug === category);
      const spec = cat?.specialties.find((x) => x.slug === specialty);
      if (cat && spec) setData({ category: cat, specialty: spec });
    });
  }, [category, specialty]);

  const courses = useMemo(() => (data?.specialty.courses ?? []).map(enrichCourse), [data]);

  const courseOptions = useMemo(
    () =>
      courses.map((c) => ({
        value: c.title,
        label: c.duration && c.trainer ? `${c.title} (${c.duration.replace("تدريبية ", "")} - ${c.trainer})` : c.title,
        id: c.id,
      })),
    [courses],
  );

  if (!data) {
    return (
      <section className="container-site py-24 text-center text-muted-foreground">جاري تحميل الدورات…</section>
    );
  }

  const { specialty: spec, category: cat } = data;
  const heroImage = spec.image || SPECIALTY_IMAGE_FALLBACKS[specialty] || cat.image || courseHero;
  const courseCount = courses.length;

  return (
    <>
      <PageHero
        tall
        image={heroImage}
        eyebrow="دليل البرامج التخصصية المعتمدة"
        title={spec.heroTitle || `دورات قطاع ${spec.title}`}
        subtitle={
          spec.heroSubtitle ||
          (courseCount
            ? `اختر دورتك التدريبية التخصصية من بين ${courseCount} برامج مهنية متقدمة يقدمها نخبة من كبار الخبراء والاستشاريين، لربط المعرفة العلمية بالتطبيق الميداني المباشر.`
            : spec.description ||
              "كل دورة مصممة بعناية لتغطي محاور عملية دقيقة، معتمدة بعدد ساعات معتمد وإشراف نخبة من أكفأ الاستشاريين.")
        }
      >
        <a href="#courses-list" className="btn-ghost-light">
          {courseCount ? `استعراض الكورسات الـ ${courseCount}` : "استعرض الكورسات"}
        </a>
        <a href="#registration-form" className="btn-gold">
          الذهاب لاستمارة التسجيل <ArrowLeft className="h-4 w-4" />
        </a>
      </PageHero>

      <Breadcrumbs
        items={[
          { label: "الرئيسية", to: "/" },
          { label: "البرامج التدريبية", to: "/courses" },
          { label: cat.title, to: `/courses/${category}` },
          { label: spec.title },
        ]}
      />

      <section id="courses-list" className="relative isolate overflow-hidden py-16 md:py-20">
        <WavyBg />
        <div className="container-site relative">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold text-muted-foreground">برامج تدريبية احترافية</p>
            <h2 className="mt-2 text-3xl font-bold text-forest md:text-4xl">
              الكورسات التدريبية في {spec.title}
            </h2>
            <span className="title-line" />
            <p className="mx-auto mt-4 max-w-3xl leading-8 text-muted-foreground">
              كل دورة مصممة بعناية لتغطي محاور عملية دقيقة، معتمدة بعدد ساعات معتمد وإشراف نخبة من أكفأ الاستشاريين.
            </p>
          </div>

          {courses.length === 0 ? (
            <p className="rounded-3xl border border-dashed bg-muted/40 py-16 text-center text-muted-foreground">
              لا توجد كورسات منشورة في هذا التخصص حالياً.
            </p>
          ) : (
            <div className="mx-auto flex max-w-5xl flex-col gap-8">
              {courses.map((course, index) => (
                <CatalogCourseCard
                  key={course.id}
                  course={course}
                  orderLabel={STATIC_BY_SLUG[course.slug]?.orderLabel ?? courseOrderLabel(index)}
                  fallbackImage={
                    COURSE_IMAGE_FALLBACKS[course.slug] ||
                    SPECIALTY_IMAGE_FALLBACKS[specialty] ||
                    heroImage
                  }
                  onRegister={() => setPreferredCourseTitle(course.title)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container-site">
          <CourseRegistrationForm
            track={`${category}/${specialty}`}
            title={`استمارة التسجيل في دورات ${spec.title}`}
            description="اختر الكورس الذي ترغب في الالتحاق به واملأ البيانات التالية، وسيتواصل معك منسق البرنامج التدريبي لتأكيد التسجيل."
            courseOptions={courseOptions.length ? courseOptions : undefined}
            preferredCourseTitle={preferredCourseTitle}
            resolveCourseId={(title) => courseOptions.find((o) => o.value === title)?.id}
          />
        </div>
      </section>
    </>
  );
}
