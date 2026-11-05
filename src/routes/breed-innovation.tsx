import { createFileRoute, Link } from "@tanstack/react-router";
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
import heroImg from "@/assets/hero.jpg";
import genomeImg from "@/assets/h-genome.jpg";

export const Route = createFileRoute("/breed-innovation")({
  head: () =>
    meta(
      "مركز ابتكار السلالات",
      "Solalaa Genome: الانتخاب الجينومي وتحسين برامج تربية الدواجن مع الحفاظ على هوية السلالة.",
      "/breed-innovation",
    ),
  component: BreedInnovation,
});

const highlights = [
  "إشراف وراثي وفني وتجاري مباشر",
  "حلول ملائمة لتحديات السوق المحلي",
];

const offers = [
  { icon: Network, t: "إنشاء عائلات النسب" },
  { icon: Database, t: "إدارة مراقبة جودة البيانات وقواعد البيانات" },
  { icon: FlaskConical, t: "حساب القيم التربوية وإدارة التزاوج الداخلي Inbreeding" },
  { icon: Dna, t: "إنشاء عشائر الأساس للتقييم" },
];

const missions = [
  {
    badge: "المهمة 1 — المرحلة التأسيسية والتصميم",
    t: "تقييم وتصميم برنامج التربية",
    d: "إجراء تقييم شامل وميداني لبرنامج التربية الحالي، ودراسة الخصائص الوراثية والظاهرية للسلالة، ووضع التصميم الأمثل لخطط الانتخاب والتزاوج.",
    items: [
      "تقييم الأداء الحالي ووضع أهداف الانتخاب الاقتصادية",
      "تصميم نظام عائلات النسب وقواعد البيانات الرقمية",
      "تدريب الكوادر وتقديم الدعم الفني",
    ],
  },
  {
    badge: "المهمة 2 — التنفيذ والمتابعة",
    t: "إنتخاب جيل جديد ومتابعة التقدم",
    d: "تنفيذ قرارات التزاوج والانتخاب الجينومي لاختيار أفراد الجيل الجديد المتميز، ومتابعة التحسن في الأداء ومعامل التحويل مع الحفاظ الصارم على الهوية المحلية.",
    items: [
      "حساب قيم التكاثر واختيار أفراد الجيل القادم بدقة",
      "دعم فني متواصل",
      "دعم تجاري لمتابعة التقدم التسويقي وتوفير التدريب العملي",
    ],
  },
];

const services = [
  "تقييم وتصميم برنامج التربية",
  "إنتخاب جيل جديد والمتابعة الفنية والبيطرية",
  "استيراد سلالات جديدة",
];

const activities = ["التسمين", "البياض", "ثنائي الغرض", "دجاج الزينة"];

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
  { label: "السودان (+249)", prefix: "+249" },
];

const input =
  "w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:border-primary";

function BreedInnovation() {
  const [sent, setSent] = useState(false);
  const [phonePrefix, setPhonePrefix] = useState("+20");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <PageHero
        image={heroImg}
        eyebrow="Solala Plus · مركز ابتكار السلالات"
        title="Solalaa Genome"
        subtitle="نُطلق إمكاناتك غير المستغلة عبر علم الوراثة المتقدم والانتخاب الجينومي. بفضل فريق خبرائنا المهرة، نساعدك على تحقيق أقصى كفاءة وأداء لمنتجات الدواجن التقليدية والتجارية مع الحفاظ الكامل على المظهر والخصائص الفريدة للسلالة الخاصة بك."
      >
        <a href="#genome-form" className="btn-gold">
          احصل على الخدمة <ArrowLeft className="h-4 w-4" />
        </a>
      </PageHero>

      <section className="container-site py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img
            src={genomeImg}
            alt="دواجن سلالة بلس الملونة عالية الأداء"
            loading="lazy"
            width={1080}
            height={721}
            className="rounded-3xl shadow-soft"
          />
          <div>
            <span className="text-sm font-semibold text-primary">شريكك الاستراتيجي في التطوير</span>
            <h2 className="mt-2 text-3xl font-bold text-forest md:text-4xl">ما هي خدمة Solalaa Genome؟</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              تمتلك Solalaa Genome فريقاً من الخبراء المهرة الذين يمكنهم إرشادك في تطوير أعمالك والارتقاء بها.
            </p>
            <p className="mt-3 leading-8 text-muted-foreground">
              مع خدمة Solalaa Genome، يمكنك تحقيق أقصى استفادة من منتجك التقليدي من الدواجن مع تحسين كفاءتك وأدائك الإنتاجي والتجاري بشكل ملحوظ.
            </p>
            <p className="mt-4 border-b border-gold pb-1 text-lg font-semibold text-gold-dark">
              مع خدمة Solalaa Genome نمكنك من استيراد واقتناء سلالات جديدة من كافة دول العالم
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm leading-7 text-forest">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-muted py-24">
        <FloatsBg />
        <div className="container-site relative">
          <SectionHead
            eyebrow="علم الوراثة التطبيقية"
            title="حقّق إمكاناتك غير المستغلة من خلال علم الوراثة"
            desc="يُحقق التحسين الوراثي قيمة مضافة في جميع جوانب أعمالك القائمة؛ فكل صفة اقتصادية قابلة للترقية والتعظيم عبر أحدث تقنيات التربية."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border bg-card p-8 shadow-soft card-fx reveal">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary">
                <TrendingUp className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-forest">القيمة الاقتصادية للانتخاب الوراثي</h3>
              <p className="mt-3 leading-8 text-muted-foreground">
                فعلى سبيل المثال، يُمكن لتحسين معامل تحويل العلف (FCR) بنسبة 2% فقط أن يُوفر مبالغ طائلة في تكاليف الأعلاف.
              </p>
              <p className="mt-3 leading-8 text-muted-foreground">
                كما يُمكن للانتخاب الوراثي أن يُحسّن إنتاج البيض، ووزن الجسم، وجودة اللحوم، وغيرها من الصفات ذات الأهمية الاقتصادية. وبفضل دعم خبرائنا في مجال التربية وعلم الوراثة، بالإضافة إلى تقنيات التربية المبتكرة، يُمكن لمنتجي الدواجن التقليديين تحقيق أفضل أداء وكفاءة مع الحفاظ على المظهر الفريد للسلالات.
              </p>
              <p className="mt-5 rounded-2xl border-r-4 border-primary bg-secondary/60 px-4 py-3 text-sm leading-7 text-forest">
                أثر استثماري مباشر: خفض تكاليف الإنتاج الإجمالية وزيادة أرباح المربي مع حماية جينات السلالة.
              </p>
            </article>
            <article className="rounded-3xl border bg-card p-8 shadow-soft card-fx reveal">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary">
                <LineChart className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-forest">ما هو الانتخاب الجينومي (Genomic Selection)؟</h3>
              <p className="mt-3 leading-8 text-muted-foreground">
                علم الجينوم هو تسلسل وتحليل جينوم الكائن الحي (الحمض النووي DNA). من خلال تحليل الأنماط الظاهرية (الصفات التي يمكننا رؤيتها وقياسها، مثل وزن الجسم) جنباً إلى جنب مع البيانات الجينومية (الحمض النووي للأفراد).
              </p>
              <p className="mt-3 leading-8 text-muted-foreground">
                هذا الربط يتيح لنا اختيار الصفات المرغوبة بدقة أكبر وملاحظة تحسنها بوتيرة أسرع بكثير. يُمكن لعلم الجينوم تسريع التحسين الوراثي، لا سيما بالنسبة للصفات التي تُقاس في مراحل متأخرة من العمر، أو لدى أحد الجنسين فقط، أو التي يصعب قياسها.
              </p>
              <p className="mt-5 rounded-2xl border-r-4 border-gold bg-muted px-4 py-3 text-sm leading-7 text-forest">
                ميزة ريادية: تسريع التحسين التراكمي وتوفير سنوات من دورات الانتخاب التقليدية البطيئة.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-24">
        <WavyBg />
        <div className="container-site relative">
          <SectionHead
            eyebrow="باقة Solalaa Genome"
            title="حسّن برنامج تربية الدواجن الخاص بك"
            desc='مع باقة خدمات Solalaa Genome: "حسّن برنامج تربية الدواجن الخاص بك"، يمكنك تحقيق أداء أفضل مع الحفاظ على الخصائص الفريدة للسلالة الخاصة بك. هدفنا هو دعمك لتحقيق أقصى استفادة من طيورك.'
          />
          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                t: "عمليات تربية مُحسّنة وتقنيات حديثة",
                d: "تطبيق بروتوكولات تربية معتمدة عالمياً وأحدث تقنيات الانتخاب الوراثي للوصول إلى أداء مُعزز للمنتجات ومعدلات تحويل متميزة.",
              },
              {
                t: "قيمة أكبر وأعمال ملائمة للمستقبل",
                d: "ومن خلال هذا التطوير، نساعدكم على تحقيق قيمة أكبر في السوق، وتطوير أعمالكم ومشاريعكم لتكون ملائمة ومستدامة للمستقبل.",
              },
            ].map((c) => (
              <div key={c.t} className="rounded-3xl border bg-card p-8 shadow-soft card-fx reveal">
                <Sparkles className="h-8 w-8 text-gold-dark" />
                <h3 className="mt-4 text-xl font-bold text-forest">{c.t}</h3>
                <p className="mt-3 leading-8 text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-24">
        <SectionHead
          eyebrow="Solala Plus"
          title="ماذا تقدّم Solalaa Genome لفريقك؟"
          desc="من خلال هذه الخدمة، ستتولى Solala Plus التنسيق مع الأخصائي الفني لديكم لتوجيه برنامج التربية نحو المستوى التالي."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map(({ icon: I, t }) => (
            <div key={t} className="rounded-2xl border bg-card p-6 text-center shadow-soft card-fx reveal">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-gold ring-4 ring-gold/25">
                <I className="h-7 w-7" />
              </span>
              <h4 className="mt-4 font-bold text-forest">{t}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-sand py-24">
        <WavyBg />
        <div className="container-site relative">
          <SectionHead
            eyebrow="اتفاقية الخدمات الوراثية"
            title="المهمتان الرئيسيتان لـ Solalaa Genome"
            desc="تنقسم اتفاقية الخدمات الوراثية إلى مهمتين استراتيجيتين؛ وخلال أيٍّ منهما نقدّم الدعم الفني بالإضافة إلى الدعم التجاري لمتابعة التقدم وتوفير التدريب."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {missions.map((m, i) => (
              <article key={m.t} className="rounded-3xl border bg-card p-8 shadow-soft card-fx reveal">
                <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                  {m.badge}
                </span>
                <div className="mt-4 flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary font-display text-xl font-bold text-gold">
                    {i + 1}
                  </span>
                  <h3 className="text-xl font-bold text-forest">{m.t}</h3>
                </div>
                <p className="mt-4 leading-8 text-muted-foreground">{m.d}</p>
                <ul className="mt-5 space-y-2">
                  {m.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-7 text-forest">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="genome-form" className="container-site py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4 text-gold-dark" /> طلب استشارة وراثية
            </span>
            <h2 className="mt-4 text-3xl font-bold text-forest md:text-4xl">تواصل مع خبراء Solalaa Genome</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              سواء كنت ترغب في تحسين برنامج تربية الدواجن الخاص بك، أو تطبيق تقنيات الانتخاب الجينومي، يسعد فريقنا التنسيق معك لوضع خطة العمل الملائمة.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              بعد الإرسال سيتواصل معك فريق Solala Plus خلال 48 ساعة لمراجعة تفاصيل برنامج التربية والبدء في التنسيق المشترك.
            </p>
          </div>
          <div className="rounded-3xl border bg-card p-8 shadow-soft">
            {sent ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
                <h3 className="mt-4 text-2xl font-bold text-forest">تم استلام طلبك بنجاح!</h3>
                <p className="mt-2 leading-8 text-muted-foreground">
                  شكراً لك، سيتواصل معك فريق خبراء سلالة بلس (Solala Plus) خلال 48 ساعة لمراجعة تفاصيل برنامج التربية والبدء في التنسيق المشترك.
                </p>
                <Link to="/contact" className="btn-primary mt-8 inline-flex">
                  تواصل معنا
                </Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
                <label className="md:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-forest">خدمة +Solala plus المطلوبة *</span>
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
                  <span className="mb-2 block text-sm font-medium text-forest">نوع النشاط *</span>
                  <select required className={input} defaultValue="التسمين">
                    {activities.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-forest">اسم المسؤول *</span>
                  <input required placeholder="أدخل اسمك" className={input} />
                </label>
                <label className="md:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-forest">اسم الشركة أو المزرعة</span>
                  <input placeholder="مثال: شركة الدواجن الوطنية" className={input} />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-forest">البلد (الدولة) *</span>
                  <select
                    required
                    className={input}
                    defaultValue=""
                    onChange={(e) => {
                      const found = countries.find((c) => c.label === e.target.value);
                      if (found) setPhonePrefix(found.prefix);
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
                <label className="md:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-forest">البريد الإلكتروني *</span>
                  <input required type="email" placeholder="name@domain.com" className={input} />
                </label>
                <label className="md:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-forest">
                    نبذة عن السلالة المحلية الحالية وتحديات برنامج التربية
                  </span>
                  <textarea
                    rows={5}
                    placeholder="وضح باختصار خصائص السلالة الخاصة بك والصفات التي ترغب في تحسينها (مثل: معامل التحويل، وزن الجسم، إنتاج البيض، أو الرغبة في إنشاء عائلات نسب)..."
                    className={input}
                  />
                </label>
                <button type="submit" className="btn-primary w-fit">
                  إرسال طلب الاستشارة الوراثية
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <CtaBand
        title="هل أنت مستعد لأخذ برنامج التربية الوراثية إلى المستوى التالي؟"
        desc="تنسيق مباشر بين خبراء Solala Plus وفريقك الفني المحلي لضمان أفضل أداء وراثي وصحي وتجاري لطيورك وسلالاتك."
        label="ابدأ التعاون مع Solalaa Genome"
        to="/contact"
      />
    </>
  );
}
