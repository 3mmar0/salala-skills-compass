import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Droplets,
  MapPinned,
  Ruler,
  Sparkles,
  Trees,
  Cuboid,
  Hammer,
  SunMedium,
} from "lucide-react";
import { PageHero, SectionHead, CtaBand, WavyBg, FloatsBg, ExpertCard } from "@/components/site/Layout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { meta } from "@/lib/meta";
import heroImg from "@/assets/landscape/hero.jpg";
import phase1 from "@/assets/landscape/phase-1.jpg";
import phase2 from "@/assets/landscape/phase-2.jpg";
import phase3 from "@/assets/landscape/phase-3.jpg";
import softscape from "@/assets/landscape/softscape.jpg";
import hardscape from "@/assets/landscape/hardscape.jpg";
import projectImg from "@/assets/landscape/project.jpg";

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

const stats = [
  { v: "+150", l: "مشروع لاندسكيب منفذ بنجاح" },
  { v: "3D / VR", l: "محاكاة ثلاثية الأبعاد قبل التنفيذ" },
  { v: "40%", l: "توفير في استهلاك المياه بنظم الري الذكي" },
  { v: "100%", l: "ضمان جودة النباتات والأعمال الإنشائية" },
];

const phases = [
  {
    n: "المرحلة الأولى",
    t: "المعاينة والرفع المساحي",
    d: "زيارة ميدانية شاملة من مهندسينا لدراسة طبيعة التربة، زوايا سطوع الشمس والرياح، قياس المناسيب والميول، وفحص مصادر مياه الري لضمان تصميم قابل للتنفيذ المستدام.",
    img: phase1,
    items: [
      "رفع مساحي دقيق بالأجهزة الهندسية",
      "تحليل ملوحة التربة والمياه واختبارات الصرف",
      "تحديد مسارات الحركة والإطلالات البصرية",
    ],
  },
  {
    n: "المرحلة الثانية",
    t: "التصميم المعماري ثلاثي الأبعاد",
    d: "إعداد مخططات الهاردسكيب (الممرات، البرجولات، الجلسات، الشلالات) والسوفتسكيب (الأشجار، المسطحات الخضراء، الزهور) مع عروض ثلاثية الأبعاد وجولات فيديو واقعية.",
    img: phase2,
    items: [
      "مخططات 2D تنفيذية ومخططات شبكات الري والإنارة",
      "ريندر واقعي 3D ليلاً ونهاراً يوضح نمو النباتات",
      "جداول حصر الكميات والتوصيف النباتي المعتمد",
    ],
  },
  {
    n: "المرحلة الثالثة",
    t: "التنفيذ الهندسي والإشراف",
    d: "تنفيذ احترافي بأعلى معايير الجودة بإشراف طاقم مهندسي الموقع؛ تركيب شبكات الري الأوتوماتيكية الذكية، أعمال التبليط والإنارة، وزراعة نباتات متكيفة عالية الحيوية.",
    img: phase3,
    items: [
      "شبكات ري ذكية بمستشعرات الرطوبة والتحكم الآلي",
      "جودة خامات الهاردسكيب والأحجار الطبيعية والإنارة",
      "برامج رعاية وصيانة دورية بعد تسليم المشروع",
    ],
  },
];

const elements = [
  {
    icon: Trees,
    img: softscape,
    t: "السوفتسكيب (Softscape)",
    d: "اختيار وتوزيع الأشجار الظليلة والنخيل والمسطحات الخضراء الطبيعية، والزهور والنباتات العطرية الملائمة مناخياً والمقاومة للجفاف وارتفاع درجات الحرارة.",
  },
  {
    icon: Cuboid,
    img: hardscape,
    t: "الهاردسكيب (Hardscape)",
    d: "الممرات الحجرية والخشبية، البرجولات والمظلات العصرية، الجلسات الخارجية وحفر النار (Fire Pits)، والشلالات والنوافير والمسطحات المائية الهادئة.",
  },
  {
    icon: Droplets,
    img: projectImg,
    t: "الري الذكي والإنارة البيئية",
    d: "شبكات ري بالتنقيط والرشاشات الدقيقة تعمل عبر لوحات تحكم ذكية، مع توزيع إضاءات ليلية خافتة موفرة للطاقة تُبرز جمال التكوينات النباتية والمعمارية.",
  },
];

const experts = [
  {
    name: "م. طارق الزيات",
    role: "رئيس قسم هندسة اللاندسكيب والتخطيط",
    bio: "خبرة أكثر من 16 عاماً في تخطيط وتصميم المساحات الخضراء والحدائق المفتوحة للكمبوندات والقصور الفاخرة.",
  },
  {
    name: "م. نورهان الشناوي",
    role: "كبير مهندسي التصميم المعماري 3D",
    bio: "متخصصة في النمذجة ثلاثية الأبعاد والمحاكاة البيئية البصرية ودمج الإضاءة الليلية التفاعلية.",
  },
  {
    name: "م. ياسين المنشاوي",
    role: "مدير الإشراف والتنفيذ الميداني",
    bio: "متخصص في إدارة مواقع التنفيذ، جودة أعمال الهاردسكيب والأحجار، وتطبيق الجداول الزمنية بدقة.",
  },
  {
    name: "م. حسام الدين فريد",
    role: "مهندس النظم الزراعية والري الذكي",
    bio: "خبير في هندسة شبكات الري الأوتوماتيكية، ملاءمة التربة والنباتات، والزراعة العضوية المستدامة.",
  },
];

const steps = [
  {
    n: "01",
    t: "طلب المعاينة وحجز الموعد",
    d: "تسجيل بيانات الموقع وتحديد موعد لزيارة طاقم المهندسين للرفع المساحي الأولي.",
  },
  {
    n: "02",
    t: "التصميم والموافقة المبدئية",
    d: "عرض المخططات ونماذج الـ 3D ومناقشة تفاصيل الخامات وتوزيع النباتات مع العميل.",
  },
  {
    n: "03",
    t: "بدء التنفيذ والإنشاء الميداني",
    d: "تجهيز التربة وشبكات البنية التحتية والري ثم تنفيذ عناصر الهاردسكيب والسوفتسكيب.",
  },
  {
    n: "04",
    t: "التسليم النهائي وجدول الرعاية",
    d: "تسليم رسمي للموقع مطروحاً معه كتيب الإرشاد وبرنامج المتابعة والصيانة الدورية.",
  },
];

const projectTypes = [
  {
    id: "villas",
    t: "لاندسكيب الفلل والقصور السكنية (Private Villas)",
    badge: "الخصوصية والراحة العائلية الفاخرة",
    d: "تصميم يركز على عزل الخصوصية بأسيجة نباتية كثيفة، مناطق لعب آمنة للأطفال، جلسات خارجية مظللة متكاملة مع إضاءة ساحرة، وشلالات أو مسابح محاطة بمسطحات خضراء دائمة النضارة.",
    eng: "المهندس المشرف المقترح: م. طارق الزيات وم. نورهان الشناوي",
    cta: "طلب معاينة الفيلا",
  },
  {
    id: "roof",
    t: "لاندسكيب الأسطح والحدائق المعلقة (Roof Gardens)",
    badge: "استغلال أمثل للمساحات الحضرية",
    d: "أنظمة متطورة تعتمد على العزل المائي والحراري المتقدم، أحواض زراعة خفيفة الوزن ونباتات مدمجة تتحمل الرياح والحرارة العالية، مع مقاعد خشبية معالجة وجلسات باربكيو مطلة.",
    eng: "المهندس المشرف المقترح: م. حسام الدين فريد وم. ياسين المنشاوي",
    cta: "طلب معاينة الروف",
  },
  {
    id: "commercial",
    t: "المشاريع الاستثمارية والتجارية والكمبوندات",
    badge: "كثافة استخدام ومتانة عالية",
    d: "تخطيط للمساحات الشاسعة وممرات المشاة والدراجات، مساحات انتظار خضراء، محطات ري ذكية مركزية، وتنسيق نباتي قليل الصيانة ومقاوم للاستهلاك العام.",
    eng: "المهندس المشرف المقترح: الفريق الهندسي المتكامل بقيادة م. طارق الزيات",
    cta: "طلب دراسة المشروع التجاري",
  },
];

const services = [
  "معاينة ميدانية ورفع مساحي للموقع",
  "تصميم لاندسكيب معماري ثلاثي الأبعاد (2D + 3D)",
  "تنفيذ متكامل (تصميم + توريد + تنفيذ + ري ذكي)",
  "تطوير وتجديد حديقة قائمة وصيانة شبكات الري",
  "استشارة هندسية مع أحد كبار المهندسين",
];

const places = [
  "فيلا خاصة / قصر سكني",
  "روف أو تراس معلق (Roof Garden)",
  "مزرعة خاصة أو استراحة",
  "كمبوند سكني أو مجمع تجاري",
  "فندق أو منتجع سياحي",
];

const countries = [
  { label: "مصر (+20)", prefix: "+20" },
  { label: "المملكة العربية السعودية (+966)", prefix: "+966" },
  { label: "الإمارات العربية المتحدة (+971)", prefix: "+971" },
  { label: "الكويت (+965)", prefix: "+965" },
  { label: "قطر (+974)", prefix: "+974" },
  { label: "البحرين (+973)", prefix: "+973" },
  { label: "سلطنة عمان (+968)", prefix: "+968" },
  { label: "الأردن (+962)", prefix: "+962" },
  { label: "العراق (+964)", prefix: "+964" },
  { label: "ليبيا (+218)", prefix: "+218" },
  { label: "دولة أخرى", prefix: "" },
];

function LandscapePage() {
  const [activeProject, setActiveProject] = useState(projectTypes[0].id);
  const [sent, setSent] = useState(false);
  const [phonePrefix, setPhonePrefix] = useState("+20");
  const selected = projectTypes.find((p) => p.id === activeProject) ?? projectTypes[0];

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHero
        image={heroImg}
        eyebrow="هندسة المناظر الطبيعية والزراعة المستدامة"
        title="خدمات هندسة وتصميم اللاندسكيب"
        subtitle="نُحوّل المساحات الخارجية إلى لوحات طبيعية بيئية تجمع بين الفخامة المعمارية والاستدامة البيئية، عبر دورة متكاملة تشمل التصميم ثنائي وثلاثي الأبعاد، المعاينة الميدانية الدقيقة، والتنفيذ الاحترافي بإشراف نخبة من كبار المهندسين."
      >
        <a href="#phases" className="btn-gold">
          مراحل خدماتنا
        </a>
        <a href="#engineers" className="btn-ghost-light">
          فريق المهندسين
        </a>
        <a href="#landscape-form" className="btn-primary">
          طلب معاينة وتصميم <ArrowLeft className="h-4 w-4" />
        </a>
      </PageHero>

      <Breadcrumbs items={[{ label: "الرئيسية", to: "/" }, { label: "اللاندسكيب" }]} />

      <section className="container-site -mt-8 relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="rounded-2xl border bg-card p-6 text-center shadow-soft card-fx reveal">
            <p className="font-display text-3xl font-bold text-primary">{s.v}</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </section>

      <section id="phases" className="relative isolate overflow-hidden py-24">
        <WavyBg />
        <div className="container-site relative">
          <SectionHead
            eyebrow="المراحل الثلاث المتكاملة"
            title="من الفكرة إلى حديقة واقعية نابضة بالحياة"
            desc="نعتمد منهجية هندسية صارمة تضمن مطابقة ما تم تصميمه على المخططات لما يتم تنفيذه على أرض الواقع بدقة متناهية."
          />
          <div className="space-y-8">
            {phases.map((p, i) => (
              <article
                key={p.t}
                className={`card-fx reveal grid overflow-hidden rounded-3xl border bg-card shadow-soft lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>img]:order-2" : ""
                }`}
              >
                <img src={p.img} alt={p.t} loading="lazy" className="h-64 w-full object-cover lg:h-full" />
                <div className="p-7 md:p-10">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">{p.n}</span>
                  <h3 className="mt-4 text-2xl font-bold text-forest">{p.t}</h3>
                  <p className="mt-3 leading-8 text-muted-foreground">{p.d}</p>
                  <ul className="mt-5 space-y-2">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm leading-7 text-forest">
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

      <section className="container-site py-24">
        <SectionHead
          eyebrow="تكامل الطبيعة مع العمارة"
          title="عناصر اللاندسكيب التي نصممها وننفذها"
          desc="نجمع بين الجوانب الحية (Softscape) والإنشائية (Hardscape) ونظم التحكم التكنولوجي لخلق بيئة متوازنة مريحة للحواس"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {elements.map(({ icon: I, img, t, d }) => (
            <div key={t} className="card-fx reveal overflow-hidden rounded-3xl border bg-card shadow-soft">
              <img src={img} alt={t} loading="lazy" className="h-48 w-full object-cover" />
              <div className="p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-gold">
                  <I className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-forest">{t}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="engineers" className="relative isolate overflow-hidden bg-muted py-24">
        <FloatsBg />
        <div className="container-site relative">
          <SectionHead
            eyebrow="فريق الخبراء الميداني"
            title="نخبة مهندسي اللاندسكيب والتصميم البيئي"
            desc="فريق هندسي متخصص يجمع بين الخبرة الأكاديمية والمهارة الحقلية في كبرى مشاريع الفلل، المجمعات السكنية، والمنتجعات السياحية."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {experts.map((e) => (
              <ExpertCard key={e.name} {...e} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-24">
        <SectionHead
          eyebrow="خطوات طلب وتنفيذ الخدمة"
          title="كيف نبدأ العمل معاً في مشروعك؟"
          desc="رحلة واضحة المعالم من التواصل الأولي حتى استلام حديقتك جاهزة بالكامل مع برامج الصيانة والضمان"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="card-fx reveal rounded-3xl border bg-card p-6 shadow-soft">
              <span className="font-display text-3xl font-bold text-gold-dark">{s.n}</span>
              <h4 className="mt-3 font-bold text-forest">{s.t}</h4>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-sand py-24">
        <WavyBg />
        <div className="container-site relative">
          <SectionHead
            eyebrow="دليل المشاريع التفاعلي"
            title="اختر نوع مشروعك لاستعراض الحل الهندسي الأنسب"
            desc="اضغط على نوع المساحة التي ترغب في تصميمها لمعرفة المكونات الهندسية الموصى بها وفترة التنفيذ التقديرية"
          />
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {[
              { id: "villas", label: "حدائق الفلل والقصور السكنية" },
              { id: "roof", label: "لاندسكيب الأسطح والتراسات (Roof Garden)" },
              { id: "commercial", label: "المجمعات التجارية والشركات والمنتجعات" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveProject(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeProject === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mx-auto max-w-3xl rounded-3xl border bg-card p-8 shadow-soft reveal">
            <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold-dark">{selected.badge}</span>
            <h3 className="mt-4 text-2xl font-bold text-forest">{selected.t}</h3>
            <p className="mt-3 leading-8 text-muted-foreground">{selected.d}</p>
            <p className="mt-4 text-sm font-medium text-primary">{selected.eng}</p>
            <a href="#landscape-form" className="btn-primary mt-6 inline-flex">
              {selected.cta} <ArrowLeft className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="landscape-form" className="container-site py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4 text-gold-dark" /> حجز موعد المعاينة والتصميم
            </span>
            <h2 className="mt-4 text-3xl font-bold text-forest md:text-4xl">ابدأ مشروع اللاندسكيب الخاص بك الآن</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              سجل تفاصيل مساحتك ونوع الخدمة المطلوبة (تصميم، معاينة، تنفيذ كامل)، وسيقوم فريق المهندسين بالتواصل معك لتحديد موعد الزيارة الميدانية.
            </p>
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPinned className="h-4 w-4 text-primary" /> معاينة ميدانية ورفع مساحي
              </p>
              <p className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-primary" /> تصميم تنفيذي وثلاثي الأبعاد
              </p>
              <p className="flex items-center gap-2">
                <Hammer className="h-4 w-4 text-primary" /> تنفيذ بإشراف هندسي كامل
              </p>
              <p className="flex items-center gap-2">
                <SunMedium className="h-4 w-4 text-primary" /> ري ذكي وإنارة بيئية
              </p>
            </div>
          </div>

          <div className="rounded-3xl border bg-card p-8 shadow-soft">
            {sent ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
                <h3 className="mt-4 text-2xl font-bold text-forest">تم استلام طلبك بنجاح!</h3>
                <p className="mt-2 leading-8 text-muted-foreground">
                  شكراً لك، سيتواصل معك فريق المهندسين لتنسيق موعد المعاينة الميدانية ومناقشة تفاصيل التصميم والتنفيذ.
                </p>
                <Link to="/contact" className="btn-primary mt-8 inline-flex">
                  تواصل معنا
                </Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
                <label className="md:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-forest">نوع الخدمة الهندسية المطلوبة *</span>
                  <select required className={input} defaultValue="">
                    <option value="" disabled>
                      اختر نوع الخدمة...
                    </option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-forest">الاسم الكريم / العميل *</span>
                  <input required placeholder="أدخل اسمك" className={input} />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-forest">طبيعة المكان أو العقار *</span>
                  <select required className={input} defaultValue="">
                    <option value="" disabled>
                      اختر طبيعة المكان...
                    </option>
                    {places.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-forest">المساحة التقديرية بالمتر المربع</span>
                  <input type="number" min={1} placeholder="مثال: 350" className={input} />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-forest">البلد (الدولة) *</span>
                  <select
                    required
                    className={input}
                    defaultValue=""
                    onChange={(e) => {
                      const found = countries.find((c) => c.label === e.target.value);
                      if (found) setPhonePrefix(found.prefix || "+");
                    }}
                  >
                    <option value="" disabled>
                      اختر الدولة...
                    </option>
                    {countries.map((c) => (
                      <option key={c.label} value={c.label}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-forest">رقم الهاتف / واتساب *</span>
                  <input
                    required
                    type="tel"
                    dir="ltr"
                    defaultValue={phonePrefix}
                    key={phonePrefix}
                    placeholder={`مثال: ${phonePrefix} 10xxxxxxxx`}
                    className={input}
                  />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-forest">البريد الإلكتروني *</span>
                  <input required type="email" placeholder="name@domain.com" className={input} />
                </label>
                <label className="md:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-forest">ملاحظات أو تفاصيل إضافية عن الموقع</span>
                  <textarea rows={4} placeholder="اكتب أي ملاحظات حول الموقع أو متطلبات التصميم..." className={input} />
                </label>
                <button type="submit" className="btn-primary w-fit">
                  إرسال طلب المعاينة والتصميم
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <CtaBand
        title="هل لديك مساحة خارجية وترغب في تحويلها إلى تحفة خضراء؟"
        desc="تواصل معنا مباشرة مع كبار مهندسي اللاندسكيب لحجز موعد الرفع المساحي والمعاينة الميدانية."
        label="حجز موعد استشارة ومعاينة"
        to="/contact"
      />
    </>
  );
}
