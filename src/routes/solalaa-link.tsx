import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { BriefcaseBusiness, Building2, CheckCircle2, Clock3, Handshake, Loader2, MapPin, Send, ShieldCheck, UserRound, UsersRound } from "lucide-react";
import { PageSections } from "@/components/cms/PageSections";
import { useSectionContent } from "@/lib/cms/use-section";
import { publicApi } from "@/lib/cms/client-store";
import { linkApply, linkHero, linkJourney, linkOpportunities, linkServices, solalaaLinkPage } from "@/lib/cms/pages/solalaa-link";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/solalaa-link")({
  head: () => meta("SOLALAA LINK | الوظائف والتوظيف", "خدمة سلالة لربط الكفاءات بفرص العمل والتدريب، مع ترشيح ومتابعة واضحة.", "/solalaa-link"),
  component: SolalaaLink,
});

function SolalaaLink() {
  return <PageSections page={solalaaLinkPage} components={{ hero: Hero, services: Services, journey: Journey, opportunities: Opportunities, apply: Apply }} />;
}

function Hero() {
  const c = useSectionContent(linkHero);
  return <section className="relative isolate overflow-hidden bg-[#103c2b] text-white">
    <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_12%_20%,#d7b257_0,transparent_21%),radial-gradient(circle_at_85%_80%,#5d9567_0,transparent_24%)]" />
    <div className="container-site relative grid min-h-[560px] items-center gap-10 py-20 lg:grid-cols-[1.2fr_.8fr] lg:py-28">
      <div className="max-w-3xl">
        <span className="inline-flex rounded-full border border-[#d7b257]/45 bg-[#d7b257]/10 px-4 py-2 text-sm text-[#f0d483]">{c.eyebrow}</span>
        <p dir="ltr" className="mt-7 font-display text-2xl font-bold tracking-[0.12em] text-[#f0d483] sm:text-3xl">{c.brand}</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.25] sm:text-5xl lg:text-6xl">{c.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-9 text-white/80">{c.subtitle}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#apply" className="inline-flex items-center gap-2 rounded-xl bg-[#d7b257] px-5 py-3 font-bold text-[#103c2b] transition hover:bg-[#efd28d]"><Send className="h-4 w-4" />{c.jobCta}</a>
          <a href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-white/35 px-5 py-3 font-bold transition hover:bg-white/10"><Building2 className="h-4 w-4" />{c.companyCta}</a>
        </div>
      </div>
      <div className="relative mx-auto hidden w-full max-w-sm lg:block" aria-hidden="true">
        <div className="aspect-square rounded-[40%_60%_55%_45%/40%_40%_60%_60%] border border-white/15 bg-white/5 p-10 backdrop-blur-sm">
          <div className="grid h-full place-items-center rounded-[45%_55%_40%_60%/55%_45%_55%_45%] border border-[#d7b257]/45 bg-[#0a2c20] shadow-2xl"><UsersRound className="h-32 w-32 text-[#d7b257]" strokeWidth={1.1} /></div>
        </div>
        <span className="absolute -right-4 top-12 grid h-16 w-16 place-items-center rounded-2xl bg-[#d7b257] text-[#103c2b] shadow-xl"><BriefcaseBusiness /></span>
        <span className="absolute -bottom-3 left-2 grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-[#216343] text-white"><Handshake /></span>
      </div>
    </div>
  </section>;
}

const serviceIcons = { building: Building2, user: UserRound, handshake: Handshake } as const;
function Services() { const c = useSectionContent(linkServices); return <section className="bg-[#f6f8f3] py-20"><div className="container-site"><Title title={c.title} subtitle={c.subtitle} /><div className="grid gap-5 md:grid-cols-3">{c.items.map((item, i) => { const Icon = serviceIcons[item.icon as keyof typeof serviceIcons] ?? Handshake; return <article key={item._id ?? i} className="border-t-4 border-[#d7b257] bg-white p-7 shadow-[0_16px_35px_rgba(16,60,43,.08)]"><Icon className="h-9 w-9 text-[#185b38]" strokeWidth={1.5} /><h2 className="mt-7 text-xl font-bold text-[#123c2b]">{item.title}</h2><p className="mt-3 leading-8 text-slate-600">{item.body}</p></article>; })}</div></div></section>; }
function Journey() { const c = useSectionContent(linkJourney); return <section className="py-20"><div className="container-site"><Title title={c.title} subtitle={c.subtitle} /><ol className="grid gap-0 overflow-hidden rounded-2xl border border-[#123c2b]/10 md:grid-cols-3">{c.items.map((item, i) => <li key={item._id ?? i} className="relative border-b border-[#123c2b]/10 bg-white p-7 last:border-0 md:border-b-0 md:border-e"><span className="font-display text-5xl font-bold text-[#d7b257]/70">0{i + 1}</span><h2 className="mt-8 text-xl font-bold text-[#123c2b]">{item.title}</h2><p className="mt-3 leading-8 text-slate-600">{item.body}</p></li>)}</ol></div></section>; }
function Opportunities() { const c = useSectionContent(linkOpportunities); return <section className="bg-[#103c2b] py-20 text-white"><div className="container-site"><Title dark title={c.title} subtitle={c.subtitle} /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{c.items.map((item, i) => <article key={item._id ?? i} className="flex flex-col border border-white/15 bg-white/[.055] p-6"><div className="flex items-start justify-between gap-3"><BriefcaseBusiness className="h-7 w-7 shrink-0 text-[#edcf7e]" strokeWidth={1.4} /><span className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/80">{item.type}</span></div><h2 className="mt-6 text-lg font-bold">{item.title}</h2><p className="mt-2 text-sm text-[#edcf7e]">{item.company}</p><dl className="mt-5 space-y-2 text-sm text-white/70"><div className="flex gap-2"><MapPin className="h-4 w-4 shrink-0" />{item.field} · {item.mode}</div><div className="flex gap-2"><Clock3 className="h-4 w-4 shrink-0" />{item.experience}</div></dl><a href="#apply" className="mt-6 inline-flex items-center gap-2 self-start text-sm font-bold text-[#edcf7e] hover:text-white">قدّم لهذه الفرصة <span aria-hidden>←</span></a></article>)}</div></div></section>; }
function Apply() {
  const c = useSectionContent(linkApply); const opportunities = useSectionContent(linkOpportunities); const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle"); const [error, setError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setState("sending"); setError(""); try { await publicApi("/link-applications", { method: "POST", body: new FormData(e.currentTarget) }); setState("success"); e.currentTarget.reset(); } catch (err) { setState("error"); setError(err instanceof Error ? err.message : "تعذر إرسال الطلب."); } }
  return <section id="apply" className="scroll-mt-24 bg-[#eef3e9] py-20"><div className="container-site grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><div><p className="font-display text-sm font-bold text-[#a37c1e]">SOLALAA LINK</p><h2 className="mt-3 text-3xl font-bold text-[#123c2b]">{c.title}</h2><p className="mt-4 max-w-md leading-8 text-slate-600">{c.subtitle}</p><div className="mt-8 flex gap-3 rounded-xl bg-white p-4 text-sm leading-7 text-[#185b38]"><ShieldCheck className="h-6 w-6 shrink-0 text-[#b18b2f]" />نحفظ بياناتك لاستخدامها في الترشيح والتواصل المهني فقط.</div></div><form onSubmit={submit} className="grid gap-4 rounded-2xl bg-white p-6 shadow-[0_18px_48px_rgba(16,60,43,.1)] sm:grid-cols-2"><Field label="الاسم بالكامل" name="full_name" required /><Field label="رقم الهاتف أو واتساب" name="phone" required type="tel" dir="ltr" /><Field label="البريد الإلكتروني" name="email" type="email" dir="ltr" /><Field label="المحافظة / الدولة" name="location" required /><Field label="المؤهل الدراسي" name="education" required /><Field label="التخصص" name="specialty" required /><Field label="سنوات الخبرة" name="experience" /><label className="grid gap-1.5 text-sm font-semibold text-[#123c2b]"><span>الوظيفة المتقدم لها</span><select name="opportunity" required className="h-11 rounded-lg border border-[#123c2b]/15 bg-white px-3 font-normal outline-none focus:border-[#185b38]"><option value="">اختر فرصة</option>{opportunities.items.map((x, i) => <option key={x._id ?? i}>{x.title}</option>)}</select></label><label className="grid gap-1.5 text-sm font-semibold text-[#123c2b]"><span>نوع العمل المفضل</span><select name="work_type" className="h-11 rounded-lg border border-[#123c2b]/15 bg-white px-3 font-normal outline-none focus:border-[#185b38]"><option>دوام كامل</option><option>دوام جزئي</option><option>عقد</option><option>تدريب</option></select></label><label className="grid gap-1.5 text-sm font-semibold text-[#123c2b] sm:col-span-2"><span>نبذة مختصرة</span><textarea name="bio" rows={4} className="rounded-lg border border-[#123c2b]/15 p-3 font-normal outline-none focus:border-[#185b38]" /></label><label className="flex items-start gap-2 text-xs leading-6 text-slate-600 sm:col-span-2"><input required name="consent" value="1" type="checkbox" className="mt-1 accent-[#185b38]" />{c.consent}</label>{state === "success" && <p className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800 sm:col-span-2"><CheckCircle2 className="h-4 w-4" />{c.success}</p>}{state === "error" && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">{error}</p>}<button disabled={state === "sending"} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#123c2b] px-5 font-bold text-white transition hover:bg-[#185b38] disabled:opacity-60 sm:col-span-2">{state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}{c.submitLabel}</button></form></div></section>;
}
function Field({ label, name, required, type = "text", dir }: { label: string; name: string; required?: boolean; type?: string; dir?: "ltr" | "rtl" }) { return <label className="grid gap-1.5 text-sm font-semibold text-[#123c2b]"><span>{label}{required ? " *" : ""}</span><input name={name} required={required} type={type} dir={dir} className="h-11 rounded-lg border border-[#123c2b]/15 px-3 font-normal outline-none focus:border-[#185b38]" /></label>; }
function Title({ title, subtitle, dark = false }: { title: string; subtitle: string; dark?: boolean }) { return <div className="mb-10 max-w-2xl"><h2 className={`text-3xl font-bold ${dark ? "text-white" : "text-[#123c2b]"}`}>{title}</h2><p className={`mt-3 leading-8 ${dark ? "text-white/70" : "text-slate-600"}`}>{subtitle}</p></div>; }
