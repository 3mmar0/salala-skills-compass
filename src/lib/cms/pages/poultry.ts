import poultryImg from "@/assets/h-genome.jpg";
import { definePage } from "../schema";
import {
  breedCardsSection,
  breedCtaSection,
  breedFaqSection,
  breedHeroSection,
  breedSpotlightSection,
  breedStatsSection,
} from "./breeds-shared";

export const poultryHero = breedHeroSection({
  image: poultryImg,
  eyebrow: "Solalaa Genome · الدواجن",
  title: "علم وراثة وسلالات الدواجن",
  subtitle:
    "نحسّن صفات سلالات إنتاج البيض والتسمين والسلالات ثنائية الغرض وسلالات الزينة بأحدث تقنيات الانتخاب الوراثي.",
  primaryLabel: "أقسام وسلالات الدواجن",
  primaryHref: "#cards",
  secondaryLabel: "تطبيقات التحسين الوراثي",
  secondaryHref: "#spotlight",
});

export const poultryCards = breedCardsSection("التصنيفات الوراثية", {
  eyebrow: "التصنيفات الوراثية الكبرى",
  title: "أقسام وسلالات الدواجن",
  desc: "لكل هدف إنتاجي سلالاته وصفاته الوراثية المميزة.",
  items: [
    {
      t: "إنتاج البيض",
      tag: "اللجهورن · اللوهمان",
      d: "تحويل غذائي جيد وإنتاج سنوي مرتفع وقشرة قوية.",
    },
    {
      t: "التسمين واللحم",
      tag: "الكورنيش · الروس · الهوبارد",
      d: "نمو سريع وتوزيع مثالي للحم الصدر وكفاءة في التمثيل الغذائي.",
    },
    {
      t: "ثنائية الغرض",
      tag: "الرود آيلاند · الفيومي · البلدي المحسن",
      d: "تجمع بين التكيف البيئي وإنتاج البيض واللحم.",
    },
    {
      t: "الزينة والمعارض",
      tag: "السيراما · البراهما · السيلكي",
      d: "أشكال ريش وألوان نادرة ومعايير مخصصة للمسابقات.",
    },
  ],
});

export const poultrySpotlight = breedSpotlightSection("التقنيات الجينومية", {
  eyebrow: "تطبيقات التحسين الوراثي",
  title: "التقنيات الجينومية في تربية الدواجن",
  desc: "نحدد الجينات المرتبطة بجودة البيض وسرعة النمو والمناعة، مع تقليل الاعتماد على المعالجات الكيميائية.",
  image: poultryImg,
  ctaLabel: "",
  ctaHref: "/contact",
  items: [
    {
      icon: "Microscope",
      t: "الانتخاب بمساعدة المؤشرات الوراثية (MAS)",
      d: "اختيار الأمهات والآباء الواعدة وراثياً في الأيام الأولى بعد الفقس.",
    },
    {
      icon: "Sun",
      t: "جينات التحمل الحراري (Naked Neck و Frizzle)",
      d: "تعزيز استقرار الإنتاج في المناخ الحار.",
    },
  ],
});

export const poultryStats = breedStatsSection({
  items: [
    { value: "320", suffix: "+", label: "بيضة سنوياً للخطوط المنتخبة" },
    { value: "1:1.5", suffix: "", label: "معدل التحويل الغذائي للتسمين" },
    { value: "25", suffix: "+", label: "سلالة زينة وأصيلة موثقة" },
    { value: "99", suffix: "%", label: "نقاء وتتبع الخطوط الوراثية" },
  ],
});

export const poultryFaq = breedFaqSection({
  eyebrow: "الأسئلة الشائعة",
  title: "أسئلة حول وراثة الدواجن",
  items: [
    {
      q: "ما ميزة السلالات ثنائية الغرض؟",
      a: "مرونة اقتصادية، إذ تُستخدم الإناث لإنتاج البيض والذكور للحم، مع مناعة طبيعية قوية.",
    },
    {
      q: "بماذا تختلف سلالات الزينة؟",
      a: "تُنتخب وفق جينات الريش والشكل واللون، إضافة إلى السلوك الهادئ والحجم.",
    },
    {
      q: "كيف نعزز مناعة القطيع وراثياً؟",
      a: "عبر رسم الخرائط الجينومية لمجمع التوافق النسيجي الرئيسي (MHC) لتحديد الخطوط الأكثر مقاومة للأمراض، مما يقلل استخدام الأدوية.",
    },
  ],
});

export const poultryCta = breedCtaSection({
  title: "ابدأ تحسين سلالات دواجنك مع سلالة",
  body: "استشارات وراثية وبرامج علمية متكاملة للمزارع التجارية وقطعان الزينة.",
  label: "تواصل معنا اليوم",
  href: "/contact",
});

export const poultryPage = definePage({
  key: "poultry",
  slug: "/poultry",
  title: "الدواجن",
  description:
    "علم وراثة وسلالات الدواجن: البياض والتسمين وثنائية الغرض والزينة، والانتخاب بالمؤشرات الوراثية.",
  sections: [poultryHero, poultryCards, poultrySpotlight, poultryStats, poultryFaq, poultryCta],
});
