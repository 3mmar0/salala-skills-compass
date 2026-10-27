import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ArrowLeft, Sprout, Droplet, Sun, BarChart3 } from "lucide-react";
import { Particles, WavyBg } from "@/components/site/Layout";
import { meta } from "@/lib/meta";
import hero from "@/assets/courses/hero.webp.asset.json";
import animal from "@/assets/courses/animal.jpg.asset.json";
import plant from "@/assets/courses/plant.jpg.asset.json";
import protect from "@/assets/courses/protect.jpg.asset.json";
import food from "@/assets/courses/food.jpg.asset.json";
import eng from "@/assets/courses/eng.jpg.asset.json";
import water from "@/assets/courses/water.jpg.asset.json";
import bio from "@/assets/courses/bio.jpg.asset.json";
import econ from "@/assets/courses/econ.jpg.asset.json";

export const Route = createFileRoute("/courses")({
  head: () => meta("الدورات والتدريبات", "مجالات التدريب الزراعي في سلالة: الإنتاج الحيواني والنباتي، وقاية النبات، التصنيع الغذائي وغيرها."),
  component: Courses,
});

const featured = [
  { img: animal.url, t: "الإنتاج الحيواني والداجني والسمكي", d: "برامج تدريبية متقدمة في رعاية وتغذية وإدارة قطعان الإنتاج الحيواني والداجني والاستزراع السمكي." },
  { img: plant.url, t: "الإنتاج النباتي (محاصيل - خضر - فاكهة - زينة)", d: "تقنيات الزراعة الحديثة، البيوت المحمية، وإدارة المحاصيل الاستراتيجية والبستانية بكفاءة عالية." },
];
const others = [
  { img: protect.url, t: "وقاية نبات (أمراض النبات - الحشرات - المبيدات)" },
  { img: food.url, t: "التصنيع الغذائي (ألبان - صناعات غذائية)" },
  { img: eng.url, t: "الهندسة الزراعية" },
  { img: water.url, t: "الأراضي والمياه" },
  { img: bio.url, t: "التكنولوجيا الحيوية (وراثة - ميكروبيولوجي)" },
  { img: econ.url, t: "اقتصاديات وإدارة المشاريع" },
];
const orbit = [Sprout, Droplet, Sun, BarChart3];

function Courses() {
  const [q, setQ] = useState("");
  const match = (t: string) => t.includes(q.trim());
  const f = featured.filter((x) => match(x.t + x.d));
  const o = others.filter((x) => match(x.t));
  return (
    <>
      <section className="relative overflow-hidden text-forest-foreground">
        <img src={hero.url} alt="مزارع يستخدم جهازاً لوحياً في الحقل" className="animate-ken-burns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-forest/70" />
        <Particles />
        <div className="pointer-events-none absolute left-6 top-6 hidden flex-col gap-6 md:flex">
          {orbit.map((I, i) => (
            <span key={i} style={{ marginLeft: [40, 100, 120, 80][i], animationDelay: `${i * 0.8}s` }} className="animate-orbit grid h-20 w-20 place-items-center rounded-full border border-gold/40 bg-forest/40 text-gold backdrop-blur">
              <I className="h-9 w-9" />
            </span>
          ))}
        </div>
        <div className="container-site relative flex flex-col items-center py-28 text-center md:py-36">
          <span dir="ltr" className="logo-hero animate-fade-up text-6xl md:text-8xl">Solala</span>
          <h1 className="animate-fade-up delay-1 mt-2 text-4xl font-bold md:text-6xl">وجهتك الرئيسية دائما</h1>
          <p className="animate-fade-up delay-2 mt-4 text-lg opacity-80">اختر مجالك التخصصي وابدأ رحلتك</p>
          <label className="animate-fade-up delay-3 mt-8 flex w-full max-w-xl items-center gap-2 rounded-xl bg-card px-4 py-3 text-foreground shadow-soft">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث عن مجال..." className="w-full bg-transparent outline-none" />
            <Search className="h-5 w-5 text-muted-foreground" />
          </label>
        </div>
        <svg className="absolute bottom-0 left-0 h-16 w-full fill-background md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,100 C360,0 1080,0 1440,100 Z" />
        </svg>
      </section>

      <section className="relative isolate overflow-hidden py-24">
        <WavyBg />
        <div className="container-site relative">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold text-primary md:text-5xl">مجالات التدريب</h2>
            <p className="mt-3 text-muted-foreground">اختر تخصصك وابدأ رحلتك..</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {f.map((x) => (
              <div key={x.t} className="card-fx reveal flex flex-col items-center rounded-3xl border-2 border-gold bg-card/95 p-7 text-center shadow-soft backdrop-blur">
                <img src={x.img} alt={x.t} loading="lazy" className="img-ring h-36 w-36 object-cover transition duration-500 hover:scale-110" />
                <h3 className="mt-5 text-xl font-bold text-primary md:text-2xl">{x.t}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{x.d}</p>
                <Link to="/contact" className="btn-primary mt-6 w-full justify-center">عرض التفاصيل <ArrowLeft className="h-4 w-4" /></Link>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {o.map((x) => (
              <div key={x.t} className="card-fx reveal flex flex-col items-center rounded-3xl border bg-card/95 p-5 text-center shadow-soft backdrop-blur">
                <img src={x.img} alt={x.t} loading="lazy" className="img-ring h-24 w-24 object-cover transition duration-500 hover:scale-110" />
                <h4 className="mt-4 flex-1 text-lg font-bold text-primary">{x.t}</h4>
                <Link to="/contact" className="mt-4 flex w-full items-center justify-center gap-1 rounded-full bg-muted py-2 text-xs font-semibold text-foreground transition hover:bg-primary hover:text-primary-foreground">عرض التفاصيل <ArrowLeft className="h-3 w-3" /></Link>
              </div>
            ))}
          </div>
          {f.length + o.length === 0 && <p className="text-center text-muted-foreground">لا توجد نتائج مطابقة.</p>}
        </div>
      </section>

      <section className="relative overflow-hidden bg-muted">
        <div className="absolute left-1/2 top-10 h-72 w-72 rounded-full bg-gold/15 blur-3xl animate-blob" />
        <div className="container-site relative grid items-end gap-8 md:grid-cols-[1fr_40%]">
          <div className="reveal py-20 text-center">
            <h3 className="text-3xl font-bold text-primary md:text-5xl md:leading-tight">هل تبحث عن تدريب مخصص لمزرعتك أو شركتك؟</h3>
            <p className="mt-5 leading-8 text-foreground/80">نوفر حقائب تدريبية واستشارات ميدانية مصممة خصيصاً لتلبية متطلبات الشركات والمزارع الخاصة وفرق العمل الزراعي.</p>
            <Link to="/contact" className="btn-primary mt-8 rounded-xl px-10 py-4">طلب استشارة أو تدريب مخصص</Link>
          </div>
          <img src="/shapes/nature.svg" alt="" aria-hidden className="hidden h-72 w-full object-contain object-bottom md:block" />
        </div>
      </section>
    </>
  );
}
