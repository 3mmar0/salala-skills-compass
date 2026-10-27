import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, FileText, PlayCircle, Download } from "lucide-react";
import { PageHero, SectionHead } from "@/components/site/Layout";
import { meta } from "@/lib/meta";
import heroImg from "@/assets/h-library.jpg";

export const Route = createFileRoute("/library")({
  head: () => meta("المكتبة", "مكتبة سلالة: كتب وأدلة ومقالات وفيديوهات تعليمية في المجالات الزراعية."),
  component: Library,
});

const types = { book: { l: "كتاب", i: BookOpen }, guide: { l: "دليل", i: FileText }, video: { l: "فيديو", i: PlayCircle } } as const;
type T = keyof typeof types;
const items: { t: string; d: string; k: T; c: string }[] = [
  { t: "أساسيات الزراعة المائية", d: "دليل عملي لتركيب وتشغيل أنظمة الهيدروبونيك.", k: "guide", c: "الإنتاج النباتي" },
  { t: "المكافحة المتكاملة للآفات", d: "مرجع شامل لبرامج IPM في المحاصيل الحقلية.", k: "book", c: "وقاية النبات" },
  { t: "تصميم شبكات الري بالتنقيط", d: "سلسلة فيديوهات تطبيقية خطوة بخطوة.", k: "video", c: "الهندسة الزراعية" },
  { t: "تغذية الدواجن الحديثة", d: "علائق متوازنة وإدارة العنابر.", k: "guide", c: "الإنتاج الحيواني" },
  { t: "دراسة جدوى مزرعة سمكية", d: "نموذج جاهز قابل للتعديل.", k: "book", c: "إدارة المشاريع" },
  { t: "تحليل التربة وتفسير النتائج", d: "كيف تقرأ تقرير المعمل وتبني برنامج التسميد.", k: "video", c: "الأراضي والمياه" },
];

function Library() {
  const [f, setF] = useState<T | "all">("all");
  const list = items.filter((x) => f === "all" || x.k === f);
  return (
    <>
      <PageHero image={heroImg} eyebrow="المكتبة" title="مكتبة المعرفة الزراعية" subtitle="كتب، أدلة عملية، وفيديوهات تعليمية يعدّها خبراء Solala." />
      <section className="container-site py-24">
        <SectionHead title="تصفح المحتوى" />
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {(["all", "book", "guide", "video"] as const).map((k) => (
            <button key={k} onClick={() => setF(k)} className={`rounded-full px-5 py-2 text-sm font-medium transition ${f === k ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-primary"}`}>
              {k === "all" ? "الكل" : types[k].l}
            </button>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((x) => {
            const I = types[x.k].i;
            return (
              <div key={x.t} className="rounded-2xl border bg-card p-6 shadow-soft card-fx reveal">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary"><I /></span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs">{types[x.k].l}</span>
                </div>
                <h4 className="mt-5 text-lg font-bold text-forest">{x.t}</h4>
                <p className="text-xs font-medium text-primary">{x.c}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{x.d}</p>
                <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary"><Download className="h-4 w-4" /> قريباً</button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
