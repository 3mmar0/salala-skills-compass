import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Building2,
  CheckCircle2,
  Clock3,
  FileUp,
  Handshake,
  Loader2,
  MapPin,
  Send,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { PageSections } from "@/components/cms/PageSections";
import { PageHero } from "@/components/site/Layout";
import { useSectionContent } from "@/lib/cms/use-section";
import { publicApi } from "@/lib/cms/client-store";
import { linkApply, linkHero, linkJourney, linkOpportunities, linkServices, solalaaLinkPage } from "@/lib/cms/pages/solalaa-link";
import { meta } from "@/lib/meta";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/solalaa-link")({
  head: () => meta("SOLALAA LINK | الوظائف والتوظيف", "خدمة سلالة لربط الكفاءات بفرص العمل والتدريب، مع ترشيح ومتابعة واضحة.", "/solalaa-link"),
  component: SolalaaLink,
});

type Intent = "seeker" | "employer";

function SolalaaLink() {
  const [selectedOpportunity, setSelectedOpportunity] = useState("");
  const [intent, setIntent] = useState<Intent>("seeker");

  function pickOpportunity(title: string) {
    setSelectedOpportunity(title);
    setIntent("seeker");
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function pickIntent(next: Intent) {
    setIntent(next);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <PageSections
      page={solalaaLinkPage}
      components={{ services: Services, journey: Journey }}
      elements={{
        hero: <Hero onIntent={pickIntent} />,
        opportunities: <Opportunities selected={selectedOpportunity} onSelect={pickOpportunity} />,
        apply: (
          <Apply
            intent={intent}
            onIntent={setIntent}
            selectedOpportunity={selectedOpportunity}
            onOpportunity={setSelectedOpportunity}
          />
        ),
      }}
    />
  );
}

function Hero({ onIntent }: { onIntent: (intent: Intent) => void }) {
  const c = useSectionContent(linkHero);
  const eyebrow = [c.brand, c.eyebrow].filter(Boolean).join(" · ");
  return (
    <PageHero image={c.image || heroImg} eyebrow={eyebrow} title={c.title} subtitle={c.subtitle}>
      <button type="button" onClick={() => onIntent("seeker")} className="btn-gold">
        <Send className="h-4 w-4" />
        {c.jobCta}
      </button>
      <button type="button" onClick={() => onIntent("employer")} className="btn-ghost-light">
        <Building2 className="h-4 w-4" />
        {c.companyCta}
      </button>
    </PageHero>
  );
}

const serviceIcons = { building: Building2, user: UserRound, handshake: Handshake } as const;

function Services() {
  const c = useSectionContent(linkServices);
  return (
    <section className="bg-[#f6f8f3] py-20">
      <div className="container-site">
        <Title title={c.title} subtitle={c.subtitle} />
        <div className="grid gap-5 md:grid-cols-3">
          {c.items.map((item, i) => {
            const Icon = serviceIcons[item.icon as keyof typeof serviceIcons] ?? Handshake;
            return (
              <article key={item._id ?? i} className="reveal card-fx border-t-4 border-[#d7b257] bg-white p-7 shadow-[0_16px_35px_rgba(16,60,43,.08)]">
                <Icon className="h-9 w-9 text-[#185b38]" strokeWidth={1.5} />
                <h2 className="mt-7 text-xl font-bold text-[#123c2b]">{item.title}</h2>
                <p className="mt-3 leading-8 text-slate-600">{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const c = useSectionContent(linkJourney);
  return (
    <section className="py-20">
      <div className="container-site">
        <Title title={c.title} subtitle={c.subtitle} />
        <ol className="grid gap-0 overflow-hidden rounded-2xl border border-[#123c2b]/10 md:grid-cols-3">
          {c.items.map((item, i) => (
            <li key={item._id ?? i} className="reveal relative border-b border-[#123c2b]/10 bg-white p-7 last:border-0 md:border-b-0 md:border-e">
              <span className="font-display text-5xl font-bold text-[#d7b257]/70">0{i + 1}</span>
              <h2 className="mt-8 text-xl font-bold text-[#123c2b]">{item.title}</h2>
              <p className="mt-3 leading-8 text-slate-600">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Opportunities({ selected, onSelect }: { selected: string; onSelect: (title: string) => void }) {
  const c = useSectionContent(linkOpportunities);
  return (
    <section className="bg-[#103c2b] py-20 text-white">
      <div className="container-site">
        <Title dark title={c.title} subtitle={c.subtitle} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {c.items.map((item, i) => {
            const active = selected === item.title;
            return (
              <article
                key={item._id ?? i}
                className={`reveal flex flex-col border p-6 transition ${active ? "border-[#edcf7e] bg-white/[.12] ring-1 ring-[#edcf7e]/60" : "border-white/15 bg-white/[.055] hover:border-white/35"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <BriefcaseBusiness className="h-7 w-7 shrink-0 text-[#edcf7e]" strokeWidth={1.4} />
                  <span className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/80">{item.type}</span>
                </div>
                <h2 className="mt-6 text-lg font-bold">{item.title}</h2>
                <p className="mt-2 text-sm text-[#edcf7e]">{item.company}</p>
                <dl className="mt-5 space-y-2 text-sm text-white/70">
                  <div className="flex gap-2"><MapPin className="h-4 w-4 shrink-0" />{item.field} · {item.mode}</div>
                  <div className="flex gap-2"><Clock3 className="h-4 w-4 shrink-0" />{item.experience}</div>
                </dl>
                <button type="button" onClick={() => onSelect(item.title)} className="mt-6 inline-flex items-center gap-2 self-start text-sm font-bold text-[#edcf7e] hover:text-white">
                  قدّم لهذه الفرصة <span aria-hidden>←</span>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Apply({
  intent,
  onIntent,
  selectedOpportunity,
  onOpportunity,
}: {
  intent: Intent;
  onIntent: (intent: Intent) => void;
  selectedOpportunity: string;
  onOpportunity: (value: string) => void;
}) {
  const c = useSectionContent(linkApply);
  const opportunities = useSectionContent(linkOpportunities);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [cvName, setCvName] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");
    try {
      await publicApi("/link-applications", { method: "POST", body: new FormData(e.currentTarget) });
      setState("success");
      setCvName("");
      e.currentTarget.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "تعذر إرسال الطلب.");
    }
  }

  return (
    <section id="apply" className="scroll-mt-24 bg-[#eef3e9] py-20">
      <div className="container-site grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
        <div className="reveal">
          <p className="font-display text-sm font-bold text-[#a37c1e]">SOLALAA LINK</p>
          <h2 className="mt-3 text-3xl font-bold text-[#123c2b]">{c.title}</h2>
          <p className="mt-4 max-w-md leading-8 text-slate-600">{c.subtitle}</p>
          <div className="mt-8 flex gap-3 rounded-xl bg-white p-4 text-sm leading-7 text-[#185b38]">
            <ShieldCheck className="h-6 w-6 shrink-0 text-[#b18b2f]" />
            نحفظ بياناتك لاستخدامها في الترشيح والتواصل المهني فقط.
          </div>
        </div>

        <form onSubmit={submit} className="reveal grid gap-4 rounded-2xl bg-white p-6 shadow-[0_18px_48px_rgba(16,60,43,.1)] sm:grid-cols-2">
          <div className="sm:col-span-2">
            <p className="mb-3 text-sm font-semibold text-[#123c2b]">أنا أبحث عن…</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <IntentCard
                active={intent === "seeker"}
                title="فرصة عمل"
                desc="قدّم سيرتك الذاتية على وظيفة مناسبة"
                icon={UserRound}
                onClick={() => onIntent("seeker")}
              />
              <IntentCard
                active={intent === "employer"}
                title="موظفين / كفاءات"
                desc="اطلب ترشيح مرشحين لشركتك"
                icon={Building2}
                onClick={() => onIntent("employer")}
              />
            </div>
            <input type="hidden" name="intent" value={intent} />
          </div>

          {intent === "seeker" ? (
            <>
              <Field label="الاسم بالكامل" name="full_name" required />
              <Field label="رقم الهاتف أو واتساب" name="phone" required type="tel" dir="ltr" />
              <Field label="البريد الإلكتروني" name="email" type="email" dir="ltr" />
              <Field label="المحافظة / الدولة" name="location" required />
              <Field label="المؤهل الدراسي" name="education" required />
              <Field label="التخصص" name="specialty" required />
              <Field label="سنوات الخبرة" name="experience" />
              <label className="grid gap-1.5 text-sm font-semibold text-[#123c2b]">
                <span>الوظيفة المتقدم لها *</span>
                <select
                  name="opportunity"
                  required
                  value={selectedOpportunity}
                  onChange={(e) => onOpportunity(e.target.value)}
                  className="h-11 rounded-lg border border-[#123c2b]/15 bg-white px-3 font-normal outline-none focus:border-[#185b38]"
                >
                  <option value="">اختر فرصة</option>
                  {opportunities.items.map((x, i) => (
                    <option key={x._id ?? i} value={x.title}>{x.title}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-semibold text-[#123c2b]">
                <span>نوع العمل المفضل</span>
                <select name="work_type" className="h-11 rounded-lg border border-[#123c2b]/15 bg-white px-3 font-normal outline-none focus:border-[#185b38]">
                  <option>دوام كامل</option>
                  <option>دوام جزئي</option>
                  <option>عقد</option>
                  <option>تدريب</option>
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-semibold text-[#123c2b] sm:col-span-2">
                <span>نبذة مختصرة</span>
                <textarea name="bio" rows={4} className="rounded-lg border border-[#123c2b]/15 p-3 font-normal outline-none focus:border-[#185b38]" />
              </label>
              <label className="grid cursor-pointer gap-1.5 text-sm font-semibold text-[#123c2b] sm:col-span-2">
                <span>السيرة الذاتية (PDF / Word) *</span>
                <span className="flex h-12 items-center justify-between gap-3 rounded-lg border border-dashed border-[#123c2b]/25 bg-[#f7faf4] px-3 font-normal">
                  <span className="truncate text-slate-600">{cvName || "اختر ملف السيرة الذاتية"}</span>
                  <span className="inline-flex items-center gap-1 text-[#185b38]"><FileUp className="h-4 w-4" />رفع</span>
                </span>
                <input
                  required
                  name="cv"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf"
                  className="sr-only"
                  onChange={(e) => setCvName(e.target.files?.[0]?.name ?? "")}
                />
              </label>
            </>
          ) : (
            <>
              <Field label="اسم المسؤول" name="full_name" required />
              <Field label="اسم الشركة / الجهة" name="company_name" required />
              <Field label="رقم الهاتف أو واتساب" name="phone" required type="tel" dir="ltr" />
              <Field label="البريد الإلكتروني" name="email" type="email" dir="ltr" />
              <Field label="الموقع / المحافظة" name="location" />
              <label className="grid gap-1.5 text-sm font-semibold text-[#123c2b]">
                <span>نوع التعاقد المطلوب</span>
                <select name="work_type" className="h-11 rounded-lg border border-[#123c2b]/15 bg-white px-3 font-normal outline-none focus:border-[#185b38]">
                  <option>دوام كامل</option>
                  <option>دوام جزئي</option>
                  <option>عقد</option>
                  <option>تدريب</option>
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-semibold text-[#123c2b] sm:col-span-2">
                <span>ما الكفاءات التي تبحث عنها؟ *</span>
                <textarea name="hiring_needs" required rows={4} className="rounded-lg border border-[#123c2b]/15 p-3 font-normal outline-none focus:border-[#185b38]" placeholder="المسمى، التخصص، عدد المرشحين، ونمط العمل…" />
              </label>
              <Field label="رابط LinkedIn للشركة (اختياري)" name="linkedin" dir="ltr" />
            </>
          )}

          <label className="flex items-start gap-2 text-xs leading-6 text-slate-600 sm:col-span-2">
            <input required name="consent" value="1" type="checkbox" className="mt-1 accent-[#185b38]" />
            {c.consent}
          </label>
          {state === "success" && (
            <p className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800 sm:col-span-2">
              <CheckCircle2 className="h-4 w-4" />{c.success}
            </p>
          )}
          {state === "error" && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">{error}</p>}
          <button disabled={state === "sending"} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#123c2b] px-5 font-bold text-white transition hover:bg-[#185b38] disabled:opacity-60 sm:col-span-2">
            {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {c.submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}

function IntentCard({
  active,
  title,
  desc,
  icon: Icon,
  onClick,
}: {
  active: boolean;
  title: string;
  desc: string;
  icon: typeof UserRound;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-4 text-right transition ${active ? "border-[#185b38] bg-[#eef6f0] shadow-[0_10px_24px_rgba(16,60,43,.08)]" : "border-[#123c2b]/12 bg-[#fbfcf9] hover:border-[#185b38]/40"}`}
    >
      <span className={`grid h-10 w-10 place-items-center rounded-lg ${active ? "bg-[#185b38] text-white" : "bg-white text-[#185b38]"}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span className="mt-3 block text-sm font-bold text-[#123c2b]">{title}</span>
      <span className="mt-1 block text-xs leading-6 text-slate-600">{desc}</span>
    </button>
  );
}

function Field({ label, name, required, type = "text", dir }: { label: string; name: string; required?: boolean; type?: string; dir?: "ltr" | "rtl" }) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-[#123c2b]">
      <span>{label}{required ? " *" : ""}</span>
      <input name={name} required={required} type={type} dir={dir} className="h-11 rounded-lg border border-[#123c2b]/15 px-3 font-normal outline-none focus:border-[#185b38]" />
    </label>
  );
}

function Title({ title, subtitle, dark = false }: { title: string; subtitle: string; dark?: boolean }) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 className={`text-3xl font-bold ${dark ? "text-white" : "text-[#123c2b]"}`}>{title}</h2>
      <p className={`mt-3 leading-8 ${dark ? "text-white/70" : "text-slate-600"}`}>{subtitle}</p>
    </div>
  );
}
