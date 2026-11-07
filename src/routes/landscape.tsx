import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, MapPinned, Ruler, Sparkles, Cuboid, Hammer, SunMedium } from "lucide-react";
import { PageHero, SectionHead, CtaBand, ExpertCard } from "@/components/site/Layout";
import { ChevronLeft } from "lucide-react";
import { CmsLink } from "@/components/cms/CmsLink";
import { PageSections } from "@/components/cms/PageSections";
import { useSectionContent } from "@/lib/cms/use-section";
import { cmsIcon } from "@/lib/cms/icons";
import { meta } from "@/lib/meta";
import { landscapePage, landscapeHero, landscapeBreadcrumbs, landscapeStats, landscapePhases, landscapeElements, landscapeExperts, landscapeSteps, landscapeProjects, landscapeForm, landscapeCta } from "@/lib/cms/pages/landscape";

export const Route = createFileRoute("/landscape")({
  head: () =>
    meta(
      "اللاندسكيب",
      "خدمات هندسة وتصميم اللاندسكيب: معاينة، تصميم ثلاثي الأبعاد، وتنفيذ باحتراف مع الري الذكي والإنارة البيئية.",
      "/landscape",
    ),
  component: LandscapePage,
});

const input = "w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary";

function LandscapePage() {
  return <PageSections page={landscapePage} components={{hero: HeroSection, breadcrumbs: BreadcrumbsSection, stats: StatsSection, phases: PhasesSection, elements: ElementsSection, experts: ExpertsSection, steps: StepsSection, projects: ProjectsSection, form: FormSection, cta: CtaSection}} />;
}

function HeroSection() {
  const c = useSectionContent(landscapeHero);

  return (
      <PageHero
        image={c.image}
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
      >
        {c.phasesLabel && <CmsLink href={c.phasesHref} className="btn-gold">
          {c.phasesLabel}
        </CmsLink>}
        {c.engineersLabel && <CmsLink href={c.engineersHref} className="btn-ghost-light">
          {c.engineersLabel}
        </CmsLink>}
        {c.requestLabel && <CmsLink href={c.requestHref} className="btn-primary">
          {c.requestLabel} <ArrowLeft className="h-4 w-4" />
        </CmsLink>}
      </PageHero>
  );
}

function BreadcrumbsSection() {
  const c = useSectionContent(landscapeBreadcrumbs);

  return (
<nav aria-label="مسار التنقل" className="container-site pt-6">
  <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
    {c.items.map((item, i) => {
      const last = i === c.items.length - 1;
      return <li key={item._id ?? i} className="inline-flex items-center gap-1">
        {i > 0 && <ChevronLeft className="h-3.5 w-3.5 opacity-50" aria-hidden />}
        {item.href && !last ? <CmsLink href={item.href} className="hover:text-primary">{item.label}</CmsLink> :
          <span className={last ? "font-medium text-foreground" : undefined} aria-current={last ? "page" : undefined}>{item.label}</span>}
      </li>;
    })}
  </ol>
</nav>
  );
}

function StatsSection() {
  const c = useSectionContent(landscapeStats);

  return (
      <section className="container-site -mt-8 relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {c.items.map((s, i) => (
          <div key={s._id ?? i} className="rounded-2xl border bg-card p-6 text-center shadow-soft card-fx reveal">
            <p className="font-display text-3xl font-bold text-primary">{s.v}</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </section>
  );
}

function PhasesSection() {
  const c = useSectionContent(landscapePhases);

  return (
      <section id="phases" className="relative isolate overflow-hidden py-24">
        {c.background && <img src={c.background} alt="" aria-hidden className="pointer-events-none absolute inset-0 -z-0 h-full w-full object-cover opacity-90" />}
        <div className="container-site relative">
          <SectionHead
            eyebrow={c.eyebrow}
            title={c.title}
            desc={c.desc}
          />
          <div className="space-y-8">
            {c.items.map((p, i) => (
              <article
                key={p._id ?? i}
                className={`card-fx reveal grid overflow-hidden rounded-3xl border bg-card shadow-soft lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>img]:order-2" : ""
                }`}
              >
                {p.img && <img src={p.img} alt={p.t} loading="lazy" className="h-64 w-full object-cover lg:h-full" />}
                <div className="p-7 md:p-10">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">{p.n}</span>
                  <h3 className="mt-4 text-2xl font-bold text-forest">{p.t}</h3>
                  <p className="mt-3 leading-8 text-muted-foreground">{p.d}</p>
                  <ul className="mt-5 space-y-2">
                    {[p.item1, p.item2, p.item3].filter(Boolean).map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm leading-7 text-forest">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
  );
}

function ElementsSection() {
  const c = useSectionContent(landscapeElements);

  return (
      <section className="container-site py-24">
        <SectionHead
          eyebrow={c.eyebrow}
          title={c.title}
          desc={c.desc}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {c.items.map((item, i) => {
 const { img, t, d } = item;
 const I = item.icon === "Cuboid" ? Cuboid : cmsIcon(item.icon);
 return (
            <div key={item._id ?? i} className="card-fx reveal overflow-hidden rounded-3xl border bg-card shadow-soft">
              {img && <img src={img} alt={t} loading="lazy" className="h-48 w-full object-cover" />}
              <div className="p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-gold">
                  <I className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-forest">{t}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{d}</p>
              </div>
            </div>
          ); })}
        </div>
      </section>
  );
}

function ExpertsSection() {
  const c = useSectionContent(landscapeExperts);

  return (
      <section id="engineers" className="relative isolate overflow-hidden bg-muted py-24">
        {c.background && <img src={c.background} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60" />}
        <div className="container-site relative">
          <SectionHead
            eyebrow={c.eyebrow}
            title={c.title}
            desc={c.desc}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.items.map((e, i) => (
              <ExpertCard key={e._id ?? i} {...e} />
            ))}
          </div>
        </div>
      </section>
  );
}

function StepsSection() {
  const c = useSectionContent(landscapeSteps);

  return (
      <section className="container-site py-24">
        <SectionHead
          eyebrow={c.eyebrow}
          title={c.title}
          desc={c.desc}
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {c.items.map((s, i) => (
            <div key={s._id ?? i} className="card-fx reveal rounded-3xl border bg-card p-6 shadow-soft">
              <span className="font-display text-3xl font-bold text-gold-dark">{s.n}</span>
              <h4 className="mt-3 font-bold text-forest">{s.t}</h4>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
  );
}

function ProjectsSection() {
  const c = useSectionContent(landscapeProjects);
  const [activeProject, setActiveProject] = useState("");
  const selected = c.items.find((item, i) => (item._id ?? String(i)) === activeProject) ?? c.items[0];

  return (
      <section className="relative isolate overflow-hidden bg-sand py-24">
        {c.background && <img src={c.background} alt="" aria-hidden className="pointer-events-none absolute inset-0 -z-0 h-full w-full object-cover opacity-90" />}
        <div className="container-site relative">
          <SectionHead
            eyebrow={c.eyebrow}
            title={c.title}
            desc={c.desc}
          />
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {c.items.map((tab, i) => (
              <button
                key={tab._id ?? i}
                type="button"
                onClick={() => setActiveProject(tab._id ?? String(i))}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selected === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {selected && <div className="mx-auto max-w-3xl rounded-3xl border bg-card p-8 shadow-soft reveal">
            <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold-dark">{selected.badge}</span>
            <h3 className="mt-4 text-2xl font-bold text-forest">{selected.t}</h3>
            <p className="mt-3 leading-8 text-muted-foreground">{selected.d}</p>
            <p className="mt-4 text-sm font-medium text-primary">{selected.eng}</p>
            {selected.cta && <CmsLink href={selected.ctaHref} className="btn-primary mt-6 inline-flex">
              {selected.cta} <ArrowLeft className="h-4 w-4" />
            </CmsLink>}
          </div>}
        </div>
      </section>
  );
}

function FormSection() {
  const c = useSectionContent(landscapeForm);
  const [sent, setSent] = useState(false);
  const [phonePrefix, setPhonePrefix] = useState(c.initialPhonePrefix);
  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSent(true); };

  return (
      <section id="landscape-form" className="container-site py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4 text-gold-dark" /> {c.badge}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-forest md:text-4xl">{c.title}</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              {c.body}
            </p>
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPinned className="h-4 w-4 text-primary" /> {c.survey}
              </p>
              <p className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-primary" /> {c.design}
              </p>
              <p className="flex items-center gap-2">
                <Hammer className="h-4 w-4 text-primary" /> {c.execution}
              </p>
              <p className="flex items-center gap-2">
                <SunMedium className="h-4 w-4 text-primary" /> {c.irrigation}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border bg-card p-8 shadow-soft">
            {sent ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
                <h3 className="mt-4 text-2xl font-bold text-forest">{c.successTitle}</h3>
                <p className="mt-2 leading-8 text-muted-foreground">
                  {c.successBody}
                </p>
                {c.successLabel && <CmsLink href={c.successHref} className="btn-primary mt-8 inline-flex">
                  {c.successLabel}
                </CmsLink>}
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
                <label className="md:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-forest">{c.serviceLabel}</span>
                  <select required className={input} defaultValue="">
                    <option value="" disabled>
                      {c.servicePlaceholder}
                    </option>
                    {c.services.map((item, i) => (
                      <option key={item._id ?? i} value={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-forest">{c.nameLabel}</span>
                  <input required placeholder={c.namePlaceholder} className={input} />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-forest">{c.placeLabel}</span>
                  <select required className={input} defaultValue="">
                    <option value="" disabled>
                      {c.placePlaceholder}
                    </option>
                    {c.places.map((item, i) => (
                      <option key={item._id ?? i} value={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-forest">{c.areaLabel}</span>
                  <input type="number" min={1} placeholder={c.areaPlaceholder} className={input} />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-forest">{c.countryLabel}</span>
                  <select
                    required
                    className={input}
                    defaultValue=""
                    onChange={(e) => {
                      const found = c.countries.find((country) => country.label === e.target.value);
                      if (found) setPhonePrefix(found.prefix || c.emptyPhonePrefix);
                    }}
                  >
                    <option value="" disabled>
                      {c.countryPlaceholder}
                    </option>
                    {c.countries.map((item, i) => (
                      <option key={item._id ?? i} value={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-forest">{c.phoneLabel}</span>
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
                <label>
                  <span className="mb-2 block text-sm font-medium text-forest">{c.emailLabel}</span>
                  <input required type="email" placeholder={c.emailPlaceholder} className={input} />
                </label>
                <label className="md:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-forest">{c.notesLabel}</span>
                  <textarea rows={4} placeholder={c.notesPlaceholder} className={input} />
                </label>
                <button type="submit" className="btn-primary w-fit">
                  {c.submitLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
  );
}

function CtaSection() {
  const c = useSectionContent(landscapeCta);

  return (
<CtaBand title={c.title} desc={c.body} label={c.ctaLabel} to={c.ctaHref} />
  );
}

