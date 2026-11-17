import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowLeft, BookOpen, Clock, User } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CourseRegistrationForm } from "@/components/site/CourseRegistrationForm";
import { getCatalog, type PublicCategory, type PublicSpecialty } from "@/lib/course-catalog";
import { meta } from "@/lib/meta";
import courseHero from "@/assets/h-courses.jpg";

export const Route = createFileRoute("/courses/$category/$specialty")({
  head: ({ params }) =>
    meta("تخصص تدريبي", "كورسات وتسجيل في تخصصات منصة سلالة.", `/courses/${params.category}/${params.specialty}`),
  component: SpecialtyPage,
});

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

  const courseOptions = useMemo(
    () => (data?.specialty.courses ?? []).map((c) => ({ value: c.title, label: c.title, id: c.id })),
    [data],
  );

  if (!data) {
    return (
      <section className="container-site py-24 text-center text-muted-foreground">جاري تحميل الدورات…</section>
    );
  }

  const { specialty: spec, category: cat } = data;
  const heroImage = spec.image || cat.image || courseHero;

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-forest/10 bg-[#f6f5f1]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-40"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
        <div className="container-site relative py-16 text-center md:py-20">
          <p className="text-sm font-medium text-muted-foreground">برامج تدريبية احترافية</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-bold leading-relaxed text-forest md:text-5xl">
            {spec.heroTitle || `الكورسات التدريبية في ${spec.title}`}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
            {spec.heroSubtitle ||
              spec.description ||
              "كل دورة مصممة بعناية لتغطي محاور عملية دقيقة، معتمدة بعدد ساعات معتمد وإشراف نخبة من أكفأ الاستشاريين."}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#courses-list" className="btn-primary">
              استعرض الكورسات <ArrowDown className="h-4 w-4" />
            </a>
            <a href="#registration-form" className="btn-gold">
              سجّل الآن <ArrowLeft className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: "الرئيسية", to: "/" },
          { label: "البرامج التدريبية", to: "/courses" },
          { label: cat.title, to: `/courses/${category}` },
          { label: spec.title },
        ]}
      />

      <section id="courses-list" className="container-site py-16 md:py-20">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold text-gold-dark">الكورسات المتاحة</p>
          <h2 className="mt-2 text-3xl font-bold text-forest md:text-4xl">اختر الكورس المناسب لك</h2>
          <span className="title-line" />
        </div>

        {spec.courses.length === 0 ? (
          <p className="rounded-3xl border border-dashed bg-muted/40 py-16 text-center text-muted-foreground">
            لا توجد كورسات منشورة في هذا التخصص حالياً.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {spec.courses.map((course) => (
              <article
                key={course.id}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-forest/10 bg-card shadow-soft"
              >
                <span className="block h-1.5 w-full bg-gradient-to-l from-gold via-gold-light to-gold" />
                <div className="flex flex-1 flex-col p-7">
                  {course.badge && (
                    <span className="inline-flex w-fit rounded-full bg-forest/5 px-3 py-1 text-xs font-semibold text-forest">
                      {course.badge}
                    </span>
                  )}
                  <h3 className="mt-3 text-2xl font-bold text-forest">{course.title}</h3>
                  <p className="mt-3 flex-1 leading-7 text-muted-foreground">{course.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {course.duration && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-gold-dark" /> {course.duration}
                      </span>
                    )}
                    {course.trainer && (
                      <span className="inline-flex items-center gap-1.5">
                        <User className="h-4 w-4 text-gold-dark" /> {course.trainer}
                      </span>
                    )}
                    {course.format && (
                      <span className="inline-flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 text-gold-dark" /> {course.format}
                      </span>
                    )}
                  </div>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href="#registration-form"
                      onClick={() => setPreferredCourseTitle(course.title)}
                      className="btn-primary"
                    >
                      سجّل في هذا الكورس <ArrowLeft className="h-4 w-4" />
                    </a>
                    <Link
                      to="/courses/$category/$specialty/$course"
                      params={{ category, specialty, course: course.slug }}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
                    >
                      تفاصيل الكورس <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container-site">
          <CourseRegistrationForm
            track={`${category}/${specialty}`}
            title={`استمارة التسجيل في دورات ${spec.title}`}
            description="اختر أي كورس من تخصص هذا القسم واملأ بياناتك، وبعد التسجيل الناجح يمكنك التواصل مباشرة عبر واتساب."
            courseOptions={courseOptions.length ? courseOptions : undefined}
            preferredCourseTitle={preferredCourseTitle}
            resolveCourseId={(title) => courseOptions.find((o) => o.value === title)?.id}
          />
        </div>
      </section>
    </>
  );
}
