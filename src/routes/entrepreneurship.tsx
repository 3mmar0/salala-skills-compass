import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb, Hammer, Rocket, Handshake, Store } from "lucide-react";
import { PageHero, SectionHead, CtaBand , WavyBg } from "@/components/site/Layout";
import { meta } from "@/lib/meta";
import heroImg from "@/assets/h-entre.jpg";

export const Route = createFileRoute("/entrepreneurship")({
  head: () => meta("ريادة الأعمال والمشاريع", "برامج سلالة لاحتضان الأفكار وبناء وتطوير المشاريع الزراعية وربطها بالمستثمرين."),
  component: Page,
});

const stages = [
  { icon: Lightbulb, t: "حاضنة الأفكار", d: "ورش لتوليد الأفكار وتقييمها واختبار جدواها المبدئية مع خبراء القطاع.", items: ["جلسات عصف ذهني", "تقييم الفكرة", "نموذج العمل"] },
  { icon: Hammer, t: "بناء المشروع", d: "تحويل الفكرة إلى مشروع قائم بخطة عمل ودراسة جدوى ونموذج أولي.", items: ["دراسة الجدوى", "خطة التشغيل", "النموذج الأولي"] },
  { icon: Rocket, t: "تطوير المشروع", d: "رفع الكفاءة التشغيلية وتطوير المنتجات والعمليات لتحقيق النمو.", items: ["تحسين العمليات", "إدارة الجودة", "التحول الرقمي"] },
  { icon: Handshake, t: "الربط الاستثماري", d: "تجهيز ملف الاستثمار وربط المشاريع بالمستثمرين وجهات التمويل.", items: ["ملف المستثمر", "جلسات العرض", "جهات التمويل"] },
  { icon: Store, t: "الانخراط السوقي", d: "دعم دخول الأسواق المحلية والتصدير وبناء شبكة العملاء.", items: ["استراتيجية التسويق", "قنوات التوزيع", "التصدير"] },
];

function Page() {
  return (
    <>
      <PageHero image={heroImg} eyebrow="منظومة تحويل الأفكار إلى واقع" title="الابتكار وريادة الأعمال" subtitle="نرافقك من شرارة الفكرة الأولى وحتى إطلاق المشروع وتوسعه في الأسواق." />
      <section className="relative isolate overflow-hidden py-24">
        <WavyBg />
        <div className="container-site relative">
        <SectionHead title="مراحل رحلتك الريادية" desc="خمس مراحل متكاملة تأخذ فكرتك الزراعية إلى مشروع ناجح ومستدام" />
        <div className="space-y-5">
          {stages.map(({ icon: I, t, d, items }) => (
            <div key={t} className="grid items-center gap-6 rounded-3xl border bg-card p-7 shadow-soft card-fx reveal md:grid-cols-[auto_1fr_auto]">
              <div className="flex items-center gap-4">
                <span className="grid h-20 w-20 place-items-center rounded-2xl bg-primary text-gold ring-4 ring-gold/25 shadow-soft"><I className="h-9 w-9" /></span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-forest">{t}</h3>
                <p className="mt-1 leading-7 text-muted-foreground">{d}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((x) => <span key={x} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">{x}</span>)}
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>
      <CtaBand title="لديك فكرة مشروع زراعي؟" desc="قدّم فكرتك الآن وسيتواصل معك فريق ريادة الأعمال لتقييمها وتحديد المرحلة المناسبة." label="قدّم فكرتك" />
    </>
  );
}
