import { createFileRoute } from "@tanstack/react-router";
import { Eye, Target, Lightbulb, Leaf, ShieldCheck } from "lucide-react";
import fields from "@/assets/fields.jpg";
import { PageHero, SectionHead, ExpertCard, CtaBand } from "@/components/site/Layout";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/about")({
  head: () => meta("عن سلالة", "رؤية ورسالة وقيم منصة سلالة وفريق خبرائها من المهندسين الزراعيين."),
  component: About,
});

const values = [
  { icon: Lightbulb, t: "الابتكار المستمر", d: "نبحث دوماً عن أحدث التقنيات ونطور حلولاً هندسية تناسب البيئات والمناخات الزراعية المختلفة." },
  { icon: Leaf, t: "الاستدامة البيئية", d: "نضع الحفاظ على الموارد المائية وحماية التربة في قلب كل حل وممارسة زراعية نقدمها." },
  { icon: ShieldCheck, t: "الجودة والموثوقية", d: "نلتزم بأعلى المعايير العالمية في تركيب وتوريد وإدارة الأنظمة الزراعية لضمان استدامة المشاريع." },
];
const team = [
  { name: "د. أحمد المهدي", role: "كبير خبراء التربة والتغذية", bio: "خبرة أكثر من 15 عاماً في الإشراف على المشاريع الزراعية وتطوير المحاليل المغذية للزراعة المائية." },
  { name: "م. سارة القحطاني", role: "مديرة أنظمة البيوت المحمية", bio: "متخصصة في هندسة التحكم بالمناخ الداخلي والأتمتة الذكية لبيئات الزراعة المحمية والمغلقة." },
  { name: "م. عمر الشريف", role: "مهندس الري والذكاء الاصطناعي", bio: "يقود تصميم شبكات الري الدقيق وتطبيق خوارزميات الاستشعار عن بعد ومسح الحقول بالدرونز." },
];

function About() {
  return (
    <>
      <PageHero eyebrow="من نحن" title="Solala is..." subtitle="طموحنا ورسالتنا: منظومة زراعية متكاملة لتمكين الكوادر وقيادة المشاريع." />
      <section className="container-site py-24">
        <SectionHead eyebrow="طموحنا ورسالتنا" title="رؤيتنا ورسالتنا في Solala" />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="rounded-2xl border bg-card p-7 shadow-soft card-fx reveal">
              <Eye className="h-8 w-8 text-primary" />
              <h3 className="mt-3 text-xl font-bold text-forest">رؤيتنا</h3>
              <p className="mt-2 leading-8 text-muted-foreground">أن نكون المنظومة الزراعية المتكاملة والمرجع الأول في العالم العربي لتمكين الكوادر، وتوفير الاستشارات التخصصية، وقيادة وإدارة المشاريع الزراعية وفق أعلى معايير الجودة والاستدامة.</p>
            </div>
            <div className="rounded-2xl border bg-card p-7 shadow-soft card-fx reveal">
              <Target className="h-8 w-8 text-primary" />
              <h3 className="mt-3 text-xl font-bold text-forest">رسالتنا</h3>
              <p className="mt-2 leading-8 text-muted-foreground">نقدم حلولاً متكاملة ترتكز على التدريب التطبيقي، والاستشارات الفنية والإدارية للمشاريع الزراعية، ودعم المستثمرين والمهندسين، وتحويل التحديات إلى نجاحات على أرض الواقع.</p>
            </div>
          </div>
          <img src={fields} alt="حقول زراعية" loading="lazy" width={1408} height={1008} className="rounded-3xl shadow-soft reveal" />
        </div>
      </section>
      <section className="bg-sand py-24">
        <div className="container-site">
          <SectionHead title="قيـمنا العـليا" desc="القيم العليا المبني عليها الأعمال في سلالة" />
          <div className="grid gap-5 md:grid-cols-3">
            {values.map(({ icon: I, t, d }) => (
              <div key={t} className="rounded-2xl bg-card p-8 shadow-soft card-fx reveal">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground"><I /></span>
                <h4 className="mt-5 text-lg font-bold text-forest">{t}</h4>
                <p className="mt-2 leading-7 text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container-site py-24">
        <SectionHead eyebrow="الخبراء والمهندسون" title="فريق عمل Solala" desc="نخبة من المهندسين الزراعيين وخبراء التكنولوجيا الحيوية المكرسين لتعليمك وتدريبك" />
        <div className="grid gap-5 md:grid-cols-3">{team.map((e) => <ExpertCard key={e.name} {...e} />)}</div>
      </section>
      <CtaBand title="انضم إلى مجتمع Solala" desc="تواصل معنا لمعرفة كيف يمكننا دعم مسيرتك المهنية أو مشروعك الزراعي." label="تواصل معنا" />
    </>
  );
}
