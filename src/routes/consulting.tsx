import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, User } from "lucide-react";
import { PageHero, SectionHead, ExpertCard, CtaBand , WavyBg, FloatsBg } from "@/components/site/Layout";
import { meta } from "@/lib/meta";
import heroImg from "@/assets/h-consulting.jpg";

export const Route = createFileRoute("/consulting")({
  head: () => meta("الاستشارات", "استشارات زراعية متخصصة للشركات والأفراد يقدمها كبار الخبراء في سلالة.", "/consulting"),
  component: Consulting,
});

const experts = [
  { name: "د. عبد الرحمن السويدي", role: "مستشار أول دراسات الجدوى والاستثمار", bio: "أكثر من 20 عاماً في تقييم وتأسيس المشاريع الزراعية الاستثمارية والشركات الناشئة في الزراعة الذكية.", note: "متاح للاستشارات الحضورية وعن بعد" },
  { name: "م. منى الفهد", role: "استشارية بيئات الزراعة المغلقة والمائية", bio: "خبيرة دولية في تركيب المحاليل وموازنة الـ pH و EC ومعالجة مشكلات النمو في أنظمة الزراعة المائية.", note: "متاحة للاستشارات الحقلية والفنية" },
  { name: "م. طارق العريان", role: "استشاري هندسة الري وحماية المحاصيل", bio: "متخصص في إدارة المزارع الكبرى، تصميم شبكات الري المضغوط، وتشخيص ومكافحة الآفات الزراعية المتقدمة.", note: "متاح للزيارات الميدانية والمخططات" },
];
const steps = [
  { t: "تقديم الطلب", d: "املأ تفاصيل مشروعك أو التحدي الزراعي الذي تواجهه ونوع الاستشارة المطلوبة." },
  { t: "تحديد الاستشاري", d: "نقوم بتوجيه طلبك لأفضل استشاري خبير متخصص في طبيعة استفسارك." },
  { t: "جلسة الاستشارة", d: "جلسة تفاعلية (بالتواصل أو زيارة ميدانية) لمناقشة كافة التفاصيل والحلول." },
  { t: "التقرير والتوصيات", d: "استلام تقرير استشاري مفصل وخطة عمل تنفيذية قابلة للتطبيق مباشرة." },
];
const clients = [
  { t: "شركة الدلتا الزراعية", d: "إنتاج وتصدير الخضر والفاكهة" },
  { t: "مجموعة واحة النخيل", d: "مزارع تمور وتصنيع زراعي" },
  { t: "أجري تك للري الحديث", d: "أنظمة الري والطاقة المتجددة" },
  { t: "شركة النماء للإنتاج الحيواني", d: "مزارع الألبان والتسمين الحديثة" },
];

function Consulting() {
  return (
    <>
      <PageHero image={heroImg} eyebrow="خدمات الاستشارات التخصصية" title="استشارات مقدمة من كبار الخبراء" subtitle="نشخص، نطبق، نتابع ونقيس الأثر">
        <a href="#experts" className="btn-gold">تعرف على الاستشاريين</a>
      </PageHero>
      <section className="container-site py-24">
        <SectionHead eyebrow="مسارات الدعم الاستشاري" title="لمن تُقدّم استشاراتنا؟" desc="منظومة تغطي متطلبات قطاع الأعمال والشركات، وتلبي طموحات الأفراد والمستثمرين المستقلين." />
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { icon: Building2, e: "قطاع الشركات والمؤسسات", t: "استشارات الشركات", d: "حلول مؤسسية استراتيجية مخصصة للشركات الكبرى، المزارع الاستثمارية، عمليات التصنيع، وسلاسل الإمداد والتصدير لرفع كفاءة الإنتاج.", c: "طلب استشارة الشركات" },
            { icon: User, e: "قطاع الأفراد والمشاريع الناشئة", t: "استشارات الأفراد", d: "جلسات استشارية مرنة وموجهة لأصحاب المشاريع الناشئة، المهندسين الممارسين، والمستثمرين الجدد لتمكينهم من اتخاذ القرارات الصحيحة.", c: "طلب استشارة فردية" },
          ].map(({ icon: I, e, t, d, c }) => (
            <div key={t} className="rounded-3xl border bg-card p-9 shadow-soft card-fx reveal">
              <I className="h-10 w-10 text-primary" />
              <span className="mt-4 block text-sm text-muted-foreground">{e}</span>
              <h3 className="mt-1 text-2xl font-bold text-forest">{t}</h3>
              <p className="mt-3 leading-8 text-muted-foreground">{d}</p>
              <Link to="/contact" className="btn-primary mt-6">{c}</Link>
            </div>
          ))}
        </div>
      </section>
      <section id="experts" className="relative isolate overflow-hidden bg-muted py-24">
        <FloatsBg />
        <div className="container-site relative">
          <SectionHead eyebrow="نخبة الخبراء" title="فريق كبار الاستشاريين" desc="نضع بين يديك عقوداً من الخبرة العملية والأكاديمية لمساعدتك في اتخاذ القرار الصائب" />
          <div className="grid gap-5 md:grid-cols-3">{experts.map((e) => <ExpertCard key={e.name} {...e} />)}</div>
        </div>
      </section>
      <section className="container-site py-24">
        <SectionHead title="كيف تبدأ استشارتك؟" desc="خطوات بسيطة ومباشرة لحجز جلستك مع الاستشاري المناسب" />
        <div className="grid gap-5 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.t} className="rounded-2xl border bg-card p-6">
              <span className="font-display text-4xl font-bold text-gold">{i + 1}</span>
              <h5 className="mt-3 font-bold text-forest">{s.t}</h5>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="relative isolate overflow-hidden bg-sand py-24">
        <WavyBg />
        <div className="container-site relative">
          <SectionHead eyebrow="شركاء النجاح والثقة" title="عـمــلاؤنا" desc="نعتز بتقديم الدعم الاستشاري لنخبة من كبرى الشركات والمزارع والمؤسسات الرائدة" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clients.map((c) => (
              <div key={c.t} className="rounded-2xl bg-card p-6 text-center shadow-soft card-fx reveal">
                <h5 className="font-bold text-forest">{c.t}</h5>
                <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="هل تحتاج استشارة عاجلة لمشروعك أو مزرعتك؟" desc="تواصل معنا اليوم وسيقوم منسق الاستشارات بربطك مع الخبير الزراعي الأنسب لطلبك خلال 24 ساعة." label="احجز استشارتك الآن" />
    </>
  );
}
