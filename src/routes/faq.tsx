import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { PageHero, CtaBand } from "@/components/site/Layout";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/faq")({
  head: () => meta("الأسئلة الشائعة", "إجابات عن أكثر الأسئلة شيوعاً حول دورات واستشارات وبرامج سلالة."),
  component: Faq,
});

const qs = [
  ["كيف أسجل في دورة تدريبية؟", "اختر المجال من صفحة الدورات والتدريبات ثم تواصل معنا عبر النموذج وسيقوم فريقنا بتأكيد التسجيل وإرسال التفاصيل."],
  ["هل الدورات حضورية أم عن بعد؟", "نقدم الصيغتين؛ برامج حضورية تطبيقية في الحقول والمعامل، وبرامج عن بعد عبر منصات تفاعلية."],
  ["هل أحصل على شهادة بعد إتمام الدورة؟", "نعم، يحصل المتدرب على شهادة إتمام معتمدة من Solala بعد اجتياز متطلبات البرنامج."],
  ["كم يستغرق الرد على طلب الاستشارة؟", "يقوم منسق الاستشارات بالتواصل معك وربطك بالخبير المناسب خلال 24 ساعة."],
  ["هل تقدمون استشارات ميدانية خارج المدينة؟", "نعم، يتم ترتيب الزيارات الميدانية حسب موقع المشروع وطبيعة الاستشارة."],
  ["كيف أقدم فكرة مشروع لبرنامج ريادة الأعمال؟", "من صفحة ريادة الأعمال اضغط على «قدّم فكرتك» واملأ النموذج، وسيقيّم الفريق الفكرة ويحدد المرحلة المناسبة."],
  ["هل يمكن تصميم تدريب مخصص لشركتي؟", "بالتأكيد، نصمم حقائب تدريبية مخصصة تناسب احتياجات فرق العمل والمزارع والشركات."],
];

function Faq() {
  return (
    <>
      <PageHero eyebrow="الأسئلة الشائعة" title="لديك سؤال؟ لدينا الإجابة" subtitle="جمعنا لك أكثر الأسئلة تكراراً من المتدربين والعملاء." />
      <section className="container-site max-w-3xl py-24">
        <div className="space-y-3">
          {qs.map(([q, a]) => (
            <details key={q} className="group rounded-2xl border bg-card p-6 shadow-soft">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-forest">
                {q}
                <ChevronDown className="h-5 w-5 shrink-0 text-primary transition group-open:rotate-180" />
              </summary>
              <p className="mt-4 leading-8 text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>
      <CtaBand title="لم تجد إجابة سؤالك؟" desc="فريقنا جاهز للرد على جميع استفساراتك." label="تواصل معنا" />
    </>
  );
}
