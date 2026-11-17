import { PageSections } from "@/components/cms/PageSections";
import { useSectionContent } from "@/lib/cms/use-section";
import { cmsIcon } from "@/lib/cms/icons";
import { entrepreneurshipPage, entrepreneurshipHero, entrepreneurshipStages, entrepreneurshipCta } from "@/lib/cms/pages/entrepreneurship";
import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2, FileUp, Loader2, Send, ShieldCheck } from "lucide-react";
import { PageHero, SectionHead } from "@/components/site/Layout";
import { publicApi } from "@/lib/cms/client-store";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/entrepreneurship")({
  head: () => meta("ريادة الأعمال المتخصصة", "برامج سلالة لاحتضان الأفكار وبناء وتطوير المشاريع الزراعية وربطها بالمستثمرين.", "/entrepreneurship"),
  component: Page,
});

const input = "h-11 w-full rounded-xl border border-forest/15 bg-background px-4 font-normal outline-none focus:border-primary";

function Page() {
  return <PageSections page={entrepreneurshipPage} components={{ hero: HeroSection, stages: StagesSection, cta: CtaSection }} />;
}

function HeroSection() {
  const c = useSectionContent(entrepreneurshipHero);
  return <PageHero image={c.image} eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />;
}

function StagesSection() {
  const c = useSectionContent(entrepreneurshipStages);
  return (
    <section className="relative isolate overflow-hidden py-24">
      {c.backgroundImage && <img src={c.backgroundImage} alt="" aria-hidden className="pointer-events-none absolute inset-0 -z-0 h-full w-full object-cover opacity-90" />}
      <div className="container-site relative">
        <SectionHead title={c.title} desc={c.body} />
        <div className="space-y-5">
          {c.stages.map((item, i) => {
            const { icon, t, d, features } = item;
            const I = cmsIcon(icon);
            return (
              <div key={item._id ?? i} className="reveal grid items-center gap-6 rounded-3xl border bg-card p-7 shadow-soft card-fx md:grid-cols-[auto_1fr_auto]">
                <div className="flex items-center gap-4">
                  <span className="grid h-20 w-20 place-items-center rounded-2xl bg-primary text-gold ring-4 ring-gold/25 shadow-soft"><I className="h-9 w-9" /></span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-forest">{t}</h3>
                  <p className="mt-1 leading-7 text-muted-foreground">{d}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {features.split("\n").filter(Boolean).map((x, j) => (
                    <span key={j} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">{x}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  const c = useSectionContent(entrepreneurshipCta);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [cvName, setCvName] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!data.get("linkedin") && !(data.get("cv") instanceof File && (data.get("cv") as File).size > 0)) {
      setState("error");
      setError("أضف رابط LinkedIn أو ارفع السيرة الذاتية.");
      return;
    }
    setState("sending");
    setError("");
    try {
      await publicApi("/entrepreneurship-applications", { method: "POST", body: data });
      setState("success");
      setCvName("");
      form.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "تعذر إرسال الطلب.");
    }
  }

  return (
    <section id="apply-idea" className="scroll-mt-24 bg-muted/60 py-20">
      <div className="container-site grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div className="reveal">
          <p className="font-display text-sm font-bold text-gold-dark">ريادة الأعمال</p>
          <h2 className="mt-3 text-3xl font-bold text-forest md:text-4xl">{c.title}</h2>
          <p className="mt-4 max-w-md leading-8 text-muted-foreground">{c.body}</p>
          <div className="mt-8 flex gap-3 rounded-2xl border bg-card p-4 text-sm leading-7 text-forest">
            <ShieldCheck className="h-6 w-6 shrink-0 text-gold-dark" />
            يمكنك إرفاق LinkedIn أو رفع السيرة الذاتية — أحدهما على الأقل مطلوب.
          </div>
        </div>

        <form onSubmit={submit} className="reveal grid gap-4 rounded-3xl border bg-card p-6 shadow-soft sm:grid-cols-2 md:p-8">
          <label className="grid gap-1.5 text-sm font-semibold text-forest">
            <span>الاسم بالكامل *</span>
            <input required name="full_name" className={input} />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-forest">
            <span>رقم الهاتف *</span>
            <input required name="phone" type="tel" dir="ltr" className={input} />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-forest">
            <span>البريد الإلكتروني</span>
            <input name="email" type="email" dir="ltr" className={input} />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-forest">
            <span>اسم المشروع / الفكرة</span>
            <input name="project_title" className={input} />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-forest sm:col-span-2">
            <span>المرحلة الحالية</span>
            <select name="stage" className={input}>
              <option value="">اختر المرحلة</option>
              <option>حاضنة الأفكار</option>
              <option>بناء المشروع</option>
              <option>تطوير المشروع</option>
              <option>الربط الاستثماري</option>
              <option>الانخراط السوقي</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-forest sm:col-span-2">
            <span>وصف الفكرة *</span>
            <textarea required name="idea" rows={5} className="rounded-xl border border-forest/15 bg-background p-3 font-normal outline-none focus:border-primary" />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-forest">
            <span>رابط LinkedIn</span>
            <input name="linkedin" type="url" dir="ltr" placeholder="https://linkedin.com/in/..." className={input} />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-forest">
            <span>السيرة الذاتية (PDF / Word)</span>
            <span className="flex h-11 items-center justify-between gap-3 rounded-xl border border-dashed border-forest/20 bg-muted/40 px-3 font-normal">
              <span className="truncate text-muted-foreground">{cvName || "رفع ملف اختياري"}</span>
              <FileUp className="h-4 w-4 text-primary" />
            </span>
            <input name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf" className="sr-only" onChange={(e) => setCvName(e.target.files?.[0]?.name ?? "")} />
          </label>
          <label className="flex items-start gap-2 text-xs leading-6 text-muted-foreground sm:col-span-2">
            <input required name="consent" value="1" type="checkbox" className="mt-1 accent-primary" />
            {c.consent || "أوافق على حفظ بياناتي لغرض تقييم الفكرة والتواصل بشأن برامج ريادة الأعمال."}
          </label>
          {state === "success" && (
            <p className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 sm:col-span-2">
              <CheckCircle2 className="h-4 w-4" />{c.success || "تم استلام فكرتك بنجاح."}
            </p>
          )}
          {state === "error" && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">{error}</p>}
          <button disabled={state === "sending"} className="btn-primary inline-flex h-12 items-center justify-center gap-2 sm:col-span-2">
            {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {c.submitLabel || c.ctaLabel || "إرسال الفكرة"}
          </button>
        </form>
      </div>
    </section>
  );
}
