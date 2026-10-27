import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Beef, Wheat, Bug, Milk, Tractor, Droplets, Dna, Briefcase, Search, ArrowLeft } from "lucide-react";
import { PageHero, SectionHead, CtaBand } from "@/components/site/Layout";
import { meta } from "@/lib/meta";
import heroImg from "@/assets/h-courses.jpg";

export const Route = createFileRoute("/courses")({
  head: () => meta("الدورات والتدريبات", "مجالات التدريب الزراعي في سلالة: الإنتاج الحيواني والنباتي، وقاية النبات، التصنيع الغذائي وغيرها."),
  component: Courses,
});

const fields = [
  { icon: Beef, t: "الإنتاج الحيواني والداجني والسمكي", d: "برامج تدريبية متقدمة في رعاية وتغذية وإدارة قطعان الإنتاج الحيواني والداجني والاستزراع السمكي." },
  { icon: Wheat, t: "الإنتاج النباتي", s: "محاصيل - خضر - فاكهة - زينة", d: "تقنيات الزراعة الحديثة، البيوت المحمية، وإدارة المحاصيل الاستراتيجية والبستانية بكفاءة عالية." },
  { icon: Bug, t: "وقاية نبات", s: "أمراض النبات - الحشرات - المبيدات", d: "تشخيص الآفات وبرامج المكافحة المتكاملة والاستخدام الآمن للمبيدات." },
  { icon: Milk, t: "التصنيع الغذائي", s: "ألبان - صناعات غذائية", d: "خطوط التصنيع، الجودة وسلامة الغذاء، وتطوير المنتجات الغذائية." },
  { icon: Tractor, t: "الهندسة الزراعية", d: "الميكنة الزراعية، أنظمة الري الحديثة، والطاقة المتجددة في المزارع." },
  { icon: Droplets, t: "الأراضي والمياه", d: "تحليل التربة، استصلاح الأراضي، وإدارة الموارد المائية بكفاءة." },
  { icon: Dna, t: "التكنولوجيا الحيوية", s: "وراثة - ميكروبيولوجي", d: "زراعة الأنسجة، التحسين الوراثي، والتطبيقات الميكروبية في الزراعة." },
  { icon: Briefcase, t: "اقتصاديات وإدارة المشاريع", d: "دراسات الجدوى، إدارة التكاليف، والتسويق الزراعي." },
];

function Courses() {
  const [q, setQ] = useState("");
  const list = fields.filter((f) => (f.t + (f.s ?? "") + f.d).includes(q.trim()));
  return (
    <>
      <PageHero image={heroImg} eyebrow="الدورات والتدريبات" title="Solala وجهتك الرئيسية دائماً" subtitle="اختر مجالك التخصصي وابدأ رحلتك">
        <label className="flex w-full max-w-lg items-center gap-2 rounded-full bg-card px-5 py-3 text-foreground">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث عن مجال تدريبي..." className="w-full bg-transparent outline-none" />
        </label>
      </PageHero>
      <section className="container-site py-24">
        <SectionHead title="مجالات التدريب" desc="اختر تخصصك وابدأ رحلتك.." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map(({ icon: I, t, s, d }) => (
            <div key={t} className="group flex flex-col rounded-2xl border bg-card p-6 shadow-soft card-fx reveal transition hover:-translate-y-1 hover:border-primary">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary transition group-hover:bg-primary group-hover:text-primary-foreground"><I /></span>
              <h4 className="mt-5 text-lg font-bold text-forest">{t}</h4>
              {s && <p className="text-xs font-medium text-primary">({s})</p>}
              <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{d}</p>
              <Link to="/contact" className="mt-5 flex items-center gap-1 text-sm font-semibold text-primary">عرض التفاصيل <ArrowLeft className="h-4 w-4" /></Link>
            </div>
          ))}
          {list.length === 0 && <p className="col-span-full text-center text-muted-foreground">لا توجد نتائج مطابقة.</p>}
        </div>
      </section>
      <CtaBand title="هل تبحث عن تدريب مخصص لمزرعتك أو شركتك؟" desc="نوفر حقائب تدريبية واستشارات ميدانية مصممة خصيصاً لتلبية متطلبات الشركات والمزارع الخاصة وفرق العمل الزراعي." label="طلب استشارة أو تدريب مخصص" />
    </>
  );
}
