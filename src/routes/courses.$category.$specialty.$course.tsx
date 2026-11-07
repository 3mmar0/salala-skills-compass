import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/site/Layout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CourseRegistrationForm } from "@/components/site/CourseRegistrationForm";
import { getCourse, type PublicCourse } from "@/lib/course-catalog";
import courseHero from "@/assets/h-courses.jpg";

export const Route = createFileRoute("/courses/$category/$specialty/$course")({ component: CoursePage });

function CoursePage() {
  const { category, specialty, course } = Route.useParams();
  const [data, setData] = useState<PublicCourse | null>(null);
  useEffect(() => { void getCourse(category, specialty, course).then(setData); }, [category, specialty, course]);
  if (!data) return <section className="container-site py-24 text-center text-muted-foreground">جاري تحميل تفاصيل الدورة…</section>;
  return <>
    <PageHero image={data.image || courseHero} eyebrow={data.badge || data.specialtyTitle || "دورة تدريبية"} title={data.title} subtitle={data.summary}><a href="#registration-form" className="btn-gold">سجّل في الدورة</a></PageHero>
    <Breadcrumbs items={[{ label: "الرئيسية", to: "/" }, { label: "الدورات", to: "/courses" }, { label: data.categoryTitle || "", to: `/courses/${category}` }, { label: data.specialtyTitle || "", to: `/courses/${category}/${specialty}` }, { label: data.title }]} />
    <section className="container-site py-16"><div className="mx-auto max-w-4xl rounded-3xl border bg-card p-8 shadow-soft"><div className="grid gap-5 text-sm md:grid-cols-3"><div><p className="text-muted-foreground">المدرب</p><strong>{data.trainer || "يُعلن لاحقًا"}</strong></div><div><p className="text-muted-foreground">المدة</p><strong>{data.duration || "يُعلن لاحقًا"}</strong></div><div><p className="text-muted-foreground">نمط التدريب</p><strong>{data.format || "تدريب"}</strong></div></div><h2 className="mt-10 text-2xl font-bold text-forest">محاور الدورة</h2><ol className="mt-4 space-y-3 leading-8 text-muted-foreground">{data.modules.map((module, index) => <li key={module}><strong className="text-forest">{index + 1}.</strong> {module}</li>)}</ol></div></section>
    <section className="container-site pb-20"><CourseRegistrationForm track={`${category}/${specialty}`} courseId={data.id} defaultCourseTitle={data.title} courseOptions={[{ value: data.title, label: data.title }]} /></section>
  </>;
}
