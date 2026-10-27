import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import { meta } from "@/lib/meta";
import heroImg from "@/assets/h-policies.jpg";

export const Route = createFileRoute("/policies")({
  head: () => meta("السياسات والشروط", "سياسة الخصوصية وشروط الاستخدام وسياسة التسجيل والاسترداد في منصة سلالة."),
  component: Policies,
});

const sections = [
  { t: "شروط الاستخدام", p: ["باستخدامك لمنصة Solala فإنك توافق على الالتزام بهذه الشروط وجميع القوانين المعمول بها.", "يُحظر استخدام محتوى المنصة لأغراض تجارية دون إذن كتابي مسبق."] },
  { t: "سياسة الخصوصية", p: ["نجمع البيانات الضرورية فقط لتقديم خدماتنا مثل الاسم ووسيلة التواصل.", "لا نشارك بياناتك مع أي طرف ثالث إلا بموافقتك أو بموجب القانون."] },
  { t: "سياسة التسجيل والإلغاء", p: ["يتم تأكيد التسجيل في الدورات بعد استكمال البيانات المطلوبة.", "يمكن إلغاء التسجيل قبل بدء البرنامج وفق المواعيد المعلنة لكل دورة."] },
  { t: "الملكية الفكرية", p: ["جميع المواد التدريبية والمحتوى المنشور مملوكة لـ Solala أو لأصحابها المرخِّصين، ومحمية بموجب قوانين الملكية الفكرية."] },
];

function Policies() {
  return (
    <>
      <PageHero image={heroImg} eyebrow="السياسات والشروط" title="الشفافية أساس الثقة" subtitle="يرجى قراءة السياسات التالية بعناية قبل استخدام خدمات المنصة." />
      <section className="container-site grid gap-10 py-24 lg:grid-cols-[220px_1fr]">
        <nav className="hidden h-fit space-y-2 lg:sticky lg:top-28 lg:block">
          {sections.map((s, i) => <a key={s.t} href={`#p${i}`} className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary">{s.t}</a>)}
        </nav>
        <div className="space-y-6">
          {sections.map((s, i) => (
            <article key={s.t} id={`p${i}`} className="rounded-2xl border bg-card p-8 shadow-soft card-fx reveal">
              <h2 className="text-2xl font-bold text-forest">{s.t}</h2>
              {s.p.map((x) => <p key={x} className="mt-3 leading-8 text-muted-foreground">{x}</p>)}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
