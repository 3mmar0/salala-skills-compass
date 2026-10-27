import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, GraduationCap, Users, Lightbulb, Zap, MapPin, CalendarClock, TrendingUp } from "lucide-react";
import hero from "@/assets/hero.jpg";
import fields from "@/assets/fields.jpg";
import { SectionHead, ExpertCard, CtaBand, Wave, Particles } from "@/components/site/Layout";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/")({
  head: () => meta("الرئيسية", "منصة متكاملة للتعلم والتطوير الزراعي: تدريب، استشارات، وريادة أعمال."),
  component: Index,
});

const pillars = [
  { icon: GraduationCap, t: "سد الفجوة", d: "بين التعليم الأكاديمي وسوق العمل" },
  { icon: Users, t: "تطوير ودعم", d: "المهارات الشخصية والفنية للأفراد والشركات" },
  { icon: Lightbulb, t: "المساهمة", d: "في دفع عجلة الابتكار وريادة الأعمال" },
];
const phases = [
  { t: "التأهيل لسوق العمل", d: "برامج تدريبية وتطبيقية متوافقة مع متطلبات سوق العمل الزراعي المعاصر." },
  { t: "التدريب المستمر", d: "مواكبة دورية ومستمرة لتطوير مهارات المهندسين والفنيين والمستثمرين." },
  { t: "التعرّف على أحدث التقنيات", d: "تطبيقات الزراعة الذكية، إدارة الري الحديث، وأساليب المكافحة الحيوية." },
];
const services = [
  { icon: Zap, t: "استشارة سريعة" },
  { icon: MapPin, t: "استشارة ميدانية" },
  { icon: CalendarClock, t: "متابعة دورية" },
  { icon: TrendingUp, t: "استشارة استثمارية" },
];
const steps = ["حاضنة الأفكار", "بناء المشروع", "تطوير المشروع", "الربط الاستثماري", "الانخراط السوقي"];
const experts = [
  { name: "د. أحمد عبد الرحمن", role: "استشاري الإنتاج النباتي والبيوت المحمية", bio: "أكثر من 18 عاماً في إدارة مزارع الخضر والفاكهة والتغذية النباتية المتكاملة." },
  { name: "م. طارق فاروق", role: "رئيس قطاع التدريب الحيواني والداجني", bio: "خبير تغذية المجترات وإدارة عنابر التسمين والإنتاج الداجني والمزارع السمكية." },
  { name: "د. سارة المنشاوي", role: "استشارية وقاية النبات والمكافحة الحيوية", bio: "متخصصة في برامج المكافحة المتكاملة للآفات (IPM) والاستخدام الرشيد للمركبات." },
  { name: "م. يوسف النجار", role: "مستشار إداريات وسلاسل الإمداد الزراعي", bio: "خبير دراسات الجدوى وإدارة التكاليف وسجلات التوثيق واعتمادات التصدير الزراعي." },
];

function Index() {
  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden text-forest-foreground">
        <img src={hero} alt="مهندسون زراعيون داخل بيت محمي" width={1600} height={1008} className="animate-ken-burns absolute inset-0 h-full w-full object-cover" />
        <div className="bg-hero-overlay absolute inset-0" />
        <div className="animate-blob absolute -left-24 top-24 h-96 w-96 bg-gold/25 blur-3xl" />
        <div className="animate-blob absolute right-0 bottom-20 h-[28rem] w-[28rem] bg-primary/40 blur-3xl [animation-delay:-5s]" />
        <Particles n={20} />
        <Wave />
        <div className="container-site relative flex min-h-[88vh] flex-col justify-end pb-40">
          <span className="animate-fade-up w-fit rounded-full bg-gold/20 px-4 py-1 text-sm font-medium text-gold backdrop-blur">منصـــة Solala</span>
          <h1 className="animate-fade-up delay-1 mt-5 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            تدريب، استشارات، <span className="text-gold">ريادة أعمال</span>
          </h1>
          <p className="animate-fade-up delay-2 mt-6 max-w-2xl text-lg leading-8 opacity-90">
            منصة متكاملة للتعلم والتطوير، تهدف إلى تنمية المهارات، ودعم الابتكار، وفتح آفاق جديدة للفرص المهنية وريادة الأعمال.
          </p>
          <div className="animate-fade-up delay-3 mt-8 flex flex-wrap gap-3">
            <Link to="/about" className="btn-gold">من نحن <ArrowLeft className="h-4 w-4" /></Link>
            <Link to="/courses" className="btn-ghost-light">بوابة الخدمات</Link>
          </div>
        </div>
      </section>

      <section className="container-site -mt-20 relative z-10 grid gap-4 md:grid-cols-3">
        {pillars.map(({ icon: I, t, d }) => (
          <div key={t} className="rounded-2xl border bg-card p-7 shadow-soft card-fx reveal">
            <I className="h-8 w-8 text-primary" />
            <h3 className="mt-4 text-xl font-bold text-forest">{t}</h3>
            <p className="mt-2 text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      <section className="container-site py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img src={fields} alt="حقول زراعية بالري المحوري" loading="lazy" width={1408} height={1008} className="animate-float rounded-3xl shadow-soft" />
          <div>
            <span className="text-sm font-semibold text-primary">منظومة التعلم العملي</span>
            <h2 className="mt-2 text-3xl font-bold text-forest md:text-4xl">منهجية التدريب</h2>
            <p className="mt-3 text-muted-foreground">برامج تطبيقية مدروسة تدمج بين الأساس العلمي والممارسة الحقلية المباشرة</p>
            <div className="mt-8 space-y-4">
              {phases.map((p, i) => (
                <div key={p.t} className="flex gap-4 rounded-2xl border bg-card p-5">
                  <span className="font-display text-3xl font-bold text-gold">0{i + 1}</span>
                  <div>
                    <h4 className="font-bold text-forest">{p.t}</h4>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/courses" className="btn-primary mt-8">الانتقال إلى دليل التدريب <ArrowLeft className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="dot-grid relative overflow-hidden bg-sand py-24">
        <div className="container-site">
          <SectionHead eyebrow="دعم استشاري متخصص" title="خدمة الاستشارات" desc="حلول استشارية متكاملة مصممة لتلبية متطلبات المستثمرين، أصحاب المزارع والشركات" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: I, t }, i) => (
              <div key={t} className="rounded-2xl bg-card p-7 text-center shadow-soft card-fx reveal">
                <span className="text-xs font-semibold text-muted-foreground">الخدمة 0{i + 1}</span>
                <I className="mx-auto mt-4 h-10 w-10 text-primary" />
                <h4 className="mt-4 text-lg font-bold text-forest">{t}</h4>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center"><Link to="/consulting" className="btn-primary">اطلب استشارة</Link></div>
        </div>
      </section>

      <section className="container-site py-24">
        <SectionHead eyebrow="منظومة تحويل الأفكار إلى واقع" title="الابتكار وريادة الأعمال" desc="نرافقك من شرارة الفكرة الأولى وحتى إطلاق المشروع وتوسعه في الأسواق" />
        <div className="grid gap-4 md:grid-cols-5">
          {steps.map((s, i) => (
            <div key={s} className="card-fx reveal relative rounded-2xl border bg-card p-6 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary font-display font-bold text-primary-foreground">{i + 1}</span>
              <h5 className="mt-4 font-bold text-forest">{s}</h5>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center"><Link to="/entrepreneurship" className="btn-primary">اكتشف تفاصيل برامج ريادة الأعمال</Link></div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-site">
          <SectionHead eyebrow="خبرات حقلية وأكاديمية" title="خبراء Solala" desc="يقوم بالتدريب والاستشارات خبراء متمرسون في مختلف المجالات." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {experts.map((e) => <ExpertCard key={e.name} {...e} />)}
          </div>
        </div>
      </section>

      <section className="container-site py-20">
        <SectionHead eyebrow="شركاء النجاح والدعم" title="رعاة Solala" desc="نعتز بشراكتنا الاستراتيجية مع كبرى الكيانات والمؤسسات الداعمة لمسيرة التطوير والابتكار وريادة الأعمال." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {["شريك استراتيجي", "راعٍ ذهبي", "شريك أكاديمي", "شريك تقني"].map((p) => (
            <div key={p} className="grid h-24 place-items-center rounded-2xl border border-dashed bg-card font-display text-muted-foreground">{p}</div>
          ))}
        </div>
      </section>

      <CtaBand title="ابدأ رحلتك مع Solala اليوم" desc="سواء كنت طالباً أو مهندساً أو مستثمراً، لدينا البرنامج المناسب لك." label="تواصل معنا" />
    </>
  );
}
