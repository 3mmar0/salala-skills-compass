import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Dna,
  Database,
  FlaskConical,
  LineChart,
  Network,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { PageHero, SectionHead, CtaBand, WavyBg, FloatsBg } from "@/components/site/Layout";
import { meta } from "@/lib/meta";

import { CmsLink } from "@/components/cms/CmsLink";
import { PageSections } from "@/components/cms/PageSections";
import { useSectionContent } from "@/lib/cms/use-section";
import { cmsIcon } from "@/lib/cms/icons";
import { publicApi } from "@/lib/cms/client-store";
import { breedPage, breedHero, breedIntro, breedGenetics, breedPackage, breedOffers, breedMissions, breedForm, breedCta } from "@/lib/cms/pages/breed";

export const Route = createFileRoute("/breed-innovation")({
  head: () =>
    meta(
      "Solalaa Genome",
      "Solalaa Genome: الانتخاب الجينومي وتحسين برامج تربية الدواجن مع الحفاظ على هوية السلالة.",
      "/breed-innovation",
    ),
  component: BreedInnovation,
});

const input =
  "w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:border-primary";

function BreedInnovation() {
  return <PageSections page={breedPage} components={{hero: Hero, intro: Intro, genetics: Genetics, package: Package, offers: Offers, missions: Missions, form: Form, cta: Cta}} />;
}

function Hero() {
  const c = useSectionContent(breedHero);
  return (
      <PageHero
        image={c.image}
        eyebrow={c.text1}
        title={c.text2}
        subtitle={c.text3}
      >
        {c.text5 ? (<CmsLink href={c.text4} className="btn-gold">
          {c.text5} <ArrowLeft className="h-4 w-4" />
        </CmsLink>) : null}
      </PageHero>
  );
}

function Intro() {
  const c = useSectionContent(breedIntro);
  return (
      <section className="container-site py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {c.image ? <img
            src={c.image}
            alt={c.text1}
            loading="lazy"
            width={1080}
            height={721}
            className="rounded-3xl shadow-soft"
          /> : null}
          <div>
            {c.text2 ? (<span className="text-sm font-semibold text-primary">{c.text2}</span>) : null}
            {c.text3 ? (<h2 className="mt-2 text-3xl font-bold text-forest md:text-4xl">{c.text3}</h2>) : null}
            {c.text4 ? (<p className="mt-4 leading-8 text-muted-foreground">
              {c.text4}
            </p>) : null}
            {c.text5 ? (<p className="mt-3 leading-8 text-muted-foreground">
              {c.text5}
            </p>) : null}
            {c.text6 ? (<p className="mt-4 border-b border-gold pb-1 text-lg font-semibold text-gold-dark">
              {c.text6}
            </p>) : null}
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {c.highlights.map((item, i) => (
                <li key={item._id ?? i} className="flex items-start gap-2 text-sm leading-7 text-forest">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
  );
}

function Genetics() {
  const c = useSectionContent(breedGenetics);
  return (
      <section className="relative isolate overflow-hidden bg-muted py-24">
        <FloatsBg />
        <div className="container-site relative">
          <SectionHead
            eyebrow={c.text1}
            title={c.text2}
            desc={c.text3}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border bg-card p-8 shadow-soft card-fx reveal">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary">
                <TrendingUp className="h-7 w-7" />
              </span>
              {c.text4 ? (<h3 className="mt-5 text-xl font-bold text-forest">{c.text4}</h3>) : null}
              {c.text5 ? (<p className="mt-3 leading-8 text-muted-foreground">
                {c.text5}
              </p>) : null}
              {c.text6 ? (<p className="mt-3 leading-8 text-muted-foreground">
                {c.text6}
              </p>) : null}
              {c.text7 ? (<p className="mt-5 rounded-2xl border-r-4 border-primary bg-secondary/60 px-4 py-3 text-sm leading-7 text-forest">
                {c.text7}
              </p>) : null}
            </article>
            <article className="rounded-3xl border bg-card p-8 shadow-soft card-fx reveal">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary">
                <LineChart className="h-7 w-7" />
              </span>
              {c.text8 ? (<h3 className="mt-5 text-xl font-bold text-forest">{c.text8}</h3>) : null}
              {c.text9 ? (<p className="mt-3 leading-8 text-muted-foreground">
                {c.text9}
              </p>) : null}
              {c.text10 ? (<p className="mt-3 leading-8 text-muted-foreground">
                {c.text10}
              </p>) : null}
              {c.text11 ? (<p className="mt-5 rounded-2xl border-r-4 border-gold bg-muted px-4 py-3 text-sm leading-7 text-forest">
                {c.text11}
              </p>) : null}
            </article>
          </div>
        </div>
      </section>
  );
}

/** Cards whose title names one of the breed pages link to it when no link is set in the admin. */
const BREED_CARD_LINKS: [RegExp, string][] = [
  [/خيل|خيول/, "/arabian-horse"],
  [/إبل|ابل|هجن/, "/solalaa-camel"],
  [/دواجن/, "/poultry"],
  [/الحيوانات|ماشية|أبقار/, "/large-animal"],
];

function breedCardHref(title: string) {
  return BREED_CARD_LINKS.find(([pattern]) => pattern.test(title))?.[1] ?? "";
}

function Package() {
  const c = useSectionContent(breedPackage);
  return (
      <section className="relative isolate overflow-hidden py-24">
        <WavyBg />
        <div className="container-site relative">
          <SectionHead
            eyebrow={c.text1}
            title={c.text2}
            desc={c.text3}
          />
          <div className="grid gap-5 md:grid-cols-2">
            {c.items.map((item, i) => {
              const href = item.href?.trim() || breedCardHref(item.t);
              const body = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <Sparkles className="h-8 w-8 text-gold-dark" />
                    {href ? (
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-primary transition group-hover:bg-primary group-hover:text-gold">
                        <ArrowLeft className="h-5 w-5" />
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-forest">{item.t}</h3>
                  <p className="mt-3 leading-8 text-muted-foreground">{item.d}</p>
                </>
              );
              const cls = "group block rounded-3xl border bg-card p-8 shadow-soft card-fx reveal";
              return href ? (
                <CmsLink key={item._id ?? i} href={href} className={`${cls} cursor-pointer hover:border-primary/40`}>
                  {body}
                </CmsLink>
              ) : (
                <div key={item._id ?? i} className={cls}>
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>
  );
}

function Offers() {
  const c = useSectionContent(breedOffers);
  return (
      <section className="container-site py-24">
        <SectionHead
          eyebrow={c.text1}
          title={c.text2}
          desc={c.text3}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.items.map((item, i) => {
            const I = item.icon === "Network" ? Network : item.icon === "Database" ? Database : cmsIcon(item.icon);
            return (
            <div key={item._id ?? i} className="rounded-2xl border bg-card p-6 text-center shadow-soft card-fx reveal">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-gold ring-4 ring-gold/25">
                <I className="h-7 w-7" />
              </span>
              <h4 className="mt-4 font-bold text-forest">{item.t}</h4>
            </div>
          ); })}
        </div>
      </section>
  );
}

function Missions() {
  const c = useSectionContent(breedMissions);
  return (
      <section className="relative isolate overflow-hidden bg-sand py-24">
        <WavyBg />
        <div className="container-site relative">
          <SectionHead
            eyebrow={c.text1}
            title={c.text2}
            desc={c.text3}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {c.items.map((m, i) => (
              <article key={m._id ?? i} className="rounded-3xl border bg-card p-8 shadow-soft card-fx reveal">
                <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                  {m.badge}
                </span>
                <div className="mt-4 flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary font-display text-xl font-bold text-gold">
                    {m.number}
                  </span>
                  <h3 className="text-xl font-bold text-forest">{m.t}</h3>
                </div>
                <p className="mt-4 leading-8 text-muted-foreground">{m.d}</p>
                <ul className="mt-5 space-y-2">
                  {c.points.filter((point) => point.mission === m.reference).map((item, i) => (
                    <li key={item._id ?? i} className="flex items-start gap-2 text-sm leading-7 text-forest">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
  );
}

function Form() {
  const c = useSectionContent(breedForm);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [phonePrefix, setPhonePrefix] = useState(c.defaultPhonePrefix);
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await publicApi("/inquiries", {
        method: "POST",
        body: JSON.stringify({
          source: "breed",
          full_name: data.get("full_name"),
          phone: data.get("phone"),
          email: data.get("email"),
          subject: data.get("service"),
          payload: {
            activity: data.get("activity"),
            organization: data.get("organization"),
            country: data.get("country"),
            message: data.get("notes"),
          },
        }),
      });
      setSent(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر إرسال الطلب.");
    } finally {
      setSending(false);
    }
  }

  return (
      <section id="genome-form" className="container-site py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4 text-gold-dark" /> {c.text6}
            </span>
            {c.text7 ? (<h2 className="mt-4 text-3xl font-bold text-forest md:text-4xl">{c.text7}</h2>) : null}
            {c.text8 ? (<p className="mt-4 leading-8 text-muted-foreground">
              {c.text8}
            </p>) : null}
            {c.text9 ? (<p className="mt-3 text-sm leading-7 text-muted-foreground">
              {c.text9}
            </p>) : null}
          </div>
          <div className="rounded-3xl border bg-card p-8 shadow-soft">
            {sent ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
                {c.text10 ? (<h3 className="mt-4 text-2xl font-bold text-forest">{c.text10}</h3>) : null}
                {c.text11 ? (<p className="mt-2 leading-8 text-muted-foreground">
                  {c.text11}
                </p>) : null}
                {c.text12 ? (<CmsLink href={c.text1} className="btn-primary mt-8 inline-flex">
                  {c.text12}
                </CmsLink>) : null}
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
                <label className="md:col-span-2">
                  {c.text13 ? (<span className="mb-2 block text-sm font-medium text-forest">{c.text13}</span>) : null}
                  <select required name="service" className={input} defaultValue="">
                    <option value="" disabled>
                      {c.text14}
                    </option>
                    {c.services.map((item, i) => (
                      <option key={item._id ?? i} value={item.text}>
                        {item.text}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  {c.text15 ? (<span className="mb-2 block text-sm font-medium text-forest">{c.text15}</span>) : null}
                  <select required name="activity" className={input} defaultValue={c.activities[0]?.text ?? ""}>
                    {c.activities.map((item, i) => (
                      <option key={item._id ?? i} value={item.text}>
                        {item.text}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  {c.text16 ? (<span className="mb-2 block text-sm font-medium text-forest">{c.text16}</span>) : null}
                  <input required name="full_name" placeholder={c.text2} className={input} />
                </label>
                <label className="md:col-span-2">
                  {c.text17 ? (<span className="mb-2 block text-sm font-medium text-forest">{c.text17}</span>) : null}
                  <input name="organization" placeholder={c.text3} className={input} />
                </label>
                <label>
                  {c.text18 ? (<span className="mb-2 block text-sm font-medium text-forest">{c.text18}</span>) : null}
                  <select
                    required
                    name="country"
                    className={input}
                    defaultValue=""
                    onChange={(e) => {
                      const found = c.countries.find((country) => country.label === e.target.value);
                      if (found) setPhonePrefix(found.prefix);
                    }}
                  >
                    <option value="" disabled>
                      {c.text19}
                    </option>
                    {c.countries.map((item, i) => (
                      <option key={item._id ?? i} value={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  {c.text20 ? (<span className="mb-2 block text-sm font-medium text-forest">{c.text20}</span>) : null}
                  <input
                    required
                    name="phone"
                    type="tel"
                    dir="ltr"
                    defaultValue={phonePrefix}
                    key={phonePrefix}
                    placeholder={c.phonePlaceholder.replace("{prefix}", phonePrefix)}
                    className={input}
                  />
                </label>
                <label className="md:col-span-2">
                  {c.text21 ? (<span className="mb-2 block text-sm font-medium text-forest">{c.text21}</span>) : null}
                  <input required name="email" type="email" placeholder={c.text4} className={input} />
                </label>
                <label className="md:col-span-2">
                  {c.text22 ? (<span className="mb-2 block text-sm font-medium text-forest">
                    {c.text22}
                  </span>) : null}
                  <textarea
                    name="notes"
                    rows={5}
                    placeholder={c.text5}
                    className={input}
                  />
                </label>
                {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700 md:col-span-2">{error}</p>}
                <button disabled={sending} type="submit" className="btn-primary inline-flex w-fit items-center gap-2">
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {c.text23}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
  );
}

function Cta() {
  const c = useSectionContent(breedCta);
  return (
      <CtaBand
        title={c.text1}
        desc={c.text2}
        label={c.text3}
        to={c.text4}
      />
  );
}
