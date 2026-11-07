import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  CheckCircle2,
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
import { breedPage, breedHero, breedIntro, breedGenetics, breedPackage, breedOffers, breedMissions, breedForm, breedCta } from "@/lib/cms/pages/breed";

export const Route = createFileRoute("/breed-innovation")({
  head: () =>
    meta(
      "مركز ابتكار السلالات",
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
            {c.items.map((item, i) => (
              <div key={item._id ?? i} className="rounded-3xl border bg-card p-8 shadow-soft card-fx reveal">
                <Sparkles className="h-8 w-8 text-gold-dark" />
                <h3 className="mt-4 text-xl font-bold text-forest">{item.t}</h3>
                <p className="mt-3 leading-8 text-muted-foreground">{item.d}</p>
              </div>
            ))}
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
  const [phonePrefix, setPhonePrefix] = useState(c.defaultPhonePrefix);
  function onSubmit(e: FormEvent) { e.preventDefault(); setSent(true); }

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
                  <select required className={input} defaultValue="">
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
                  <select required className={input} defaultValue={c.activities[0]?.text ?? ""}>
                    {c.activities.map((item, i) => (
                      <option key={item._id ?? i} value={item.text}>
                        {item.text}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  {c.text16 ? (<span className="mb-2 block text-sm font-medium text-forest">{c.text16}</span>) : null}
                  <input required placeholder={c.text2} className={input} />
                </label>
                <label className="md:col-span-2">
                  {c.text17 ? (<span className="mb-2 block text-sm font-medium text-forest">{c.text17}</span>) : null}
                  <input placeholder={c.text3} className={input} />
                </label>
                <label>
                  {c.text18 ? (<span className="mb-2 block text-sm font-medium text-forest">{c.text18}</span>) : null}
                  <select
                    required
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
                  <input required type="email" placeholder={c.text4} className={input} />
                </label>
                <label className="md:col-span-2">
                  {c.text22 ? (<span className="mb-2 block text-sm font-medium text-forest">
                    {c.text22}
                  </span>) : null}
                  <textarea
                    rows={5}
                    placeholder={c.text5}
                    className={input}
                  />
                </label>
                <button type="submit" className="btn-primary w-fit">
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
