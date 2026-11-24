import fieldsImg from "@/assets/fields.jpg";
import { definePage } from "../schema";
import {
  breedCardsSection,
  breedCtaSection,
  breedFaqSection,
  breedHeroSection,
  breedSpotlightSection,
  breedStatsSection,
} from "./breeds-shared";

export const camelHero = breedHeroSection({
  image: fieldsImg,
  eyebrow: "Solalaa Camel",
  title: "ابتكار ووراثة سلالات الإبل العربية",
  subtitle:
    "نوظف علوم الجينوم والتقنيات الحيوية للحفاظ على نقاء سلالات الإبل العربية الأصيلة، وتحسين إنتاجيتها وقدرتها التنافسية في سباقات الهجن ومسابقات المزاين.",
  primaryLabel: "أبرز سلالات الإبل",
  primaryHref: "#cards",
  secondaryLabel: "الابتكار الوراثي للإبل",
  secondaryHref: "#spotlight",
});

export const camelCards = breedCardsSection("أبرز السلالات", {
  eyebrow: "سلالات الإبل العربية",
  title: "أبرز سلالات الإبل",
  desc: "تنوع وراثي فريد صنعته الصحراء العربية عبر القرون.",
  items: [
    {
      t: "المجاهيم",
      tag: "المزاين والحليب",
      d: "سوداء اللون ضخمة الجسم، تشتهر بغزارة الحليب ومكانتها في مسابقات المزاين.",
    },
    {
      t: "المغاتير (الوِضح)",
      tag: "الجمال والتناسق",
      d: "بيضاء اللون، من أجمل السلالات وأكثرها تناسقاً، ولها شعبية واسعة.",
    },
    {
      t: "الهجن العُمانية والحرائر",
      tag: "السباقات",
      d: "رشيقة وسريعة ومخصصة لسباقات الهجن، وتتميز بنسب وراثي دقيق.",
    },
    {
      t: "الشعل والصفر والحمر",
      tag: "قوة التحمل",
      d: "بألوان الصحراء الذهبية والبنية، تتميز بقوة التحمل وتنوع البصمات الجينية.",
    },
  ],
});

export const camelSpotlight = breedSpotlightSection("الابتكار الوراثي", {
  eyebrow: "الابتكار الوراثي للإبل",
  title: "أكبر بنك معلومات جينومي للإبل العربية",
  desc: "نعتمد على تحليل التسلسل الوراثي وتوثيق الجينات لبناء قاعدة معرفة جينومية تحمي نقاء السلالات وقيمتها.",
  image: "",
  ctaLabel: "سجّل إبلك الآن",
  ctaHref: "/contact",
  items: [
    {
      icon: "Award",
      t: "البصمة الجينية وشهادات النسب",
      d: "إصدار وثائق DNA معتمدة للهجن والفحول المتميزة لمنع الخلط وتأكيد السلالة.",
    },
    {
      icon: "ShieldCheck",
      t: "الوقاية من الأمراض الوراثية",
      d: "فحص الإبل قبل التزاوج للكشف عن الجينات الحاملة للأمراض المتنحية.",
    },
  ],
});

export const camelStats = breedStatsSection({
  items: [
    { value: "99.9", suffix: "%", label: "دقة فحص البصمة الوراثية" },
    { value: "20000", suffix: "+", label: "عينة موثقة" },
    { value: "6", suffix: "+", label: "سلالات مصنفة جينومياً" },
    { value: "1", suffix: "", label: "منظومة ابتكار وراثي متكاملة" },
  ],
});

export const camelFaq = breedFaqSection({
  eyebrow: "الأسئلة الشائعة",
  title: "أسئلة حول وراثة الإبل",
  items: [
    {
      q: "كيف يؤثر التحسين الوراثي على نتائج السباقات؟",
      a: "يساعد التحليل الجيني في تحديد الجينات المرتبطة بكفاءة العضلات والتنفس والتكيف مع الحرارة، لاختيار أفضل الفحول والسلالات.",
    },
    {
      q: "لماذا يُعد توثيق النسب بالبصمة الجينية مهماً؟",
      a: "يمنع التشكيك في نسب الإبل، ويحافظ على قيمتها السوقية وحقوق ملاكها.",
    },
    {
      q: "ماذا تقدم منصة Solalaa Camel؟",
      a: "قاعدة بيانات رقمية تربط شهادات الفحص الجيني بسجلات الملاك، مع توصيات للتزاوج وقياس نقاء الدم الوراثي.",
    },
  ],
});

export const camelCta = breedCtaSection({
  title: "وثّق سلالتك مع Solalaa Camel",
  body: "استفد من حلول الفحص الجيني والتحليل الوراثي لقطيعك أو هجنك.",
  label: "سجّل إبلك الآن",
  href: "/contact",
});

export const camelPage = definePage({
  key: "camel",
  slug: "/solalaa-camel",
  title: "Solalaa Camel",
  description: "Solalaa Camel: ابتكار ووراثة سلالات الإبل العربية، البصمة الجينية وشهادات النسب.",
  sections: [camelHero, camelCards, camelSpotlight, camelStats, camelFaq, camelCta],
});
