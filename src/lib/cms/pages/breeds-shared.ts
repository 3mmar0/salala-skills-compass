/**
 * Section factories shared by the animal-breed pages
 * (Arabian horse, Solalaa Camel, large animals, poultry).
 *
 * Every page gets its own section objects (definePage assigns ids per page),
 * but the fields — and therefore the admin editor — are identical, so the
 * same components in `components/site/BreedSections.tsx` render all of them.
 */
import { f, section } from "../schema";

type Item<K extends string> = Record<K, string>;

export type BreedHeroContent = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export type BreedPillarsContent = {
  eyebrow: string;
  title: string;
  desc: string;
  image: string;
  imageBadge: string;
  items: Item<"icon" | "t" | "d">[];
};

export type BreedSpotlightContent = {
  eyebrow: string;
  title: string;
  desc: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
  items: Item<"icon" | "t" | "d">[];
};

export type BreedCardsContent = {
  eyebrow: string;
  title: string;
  desc: string;
  items: Item<"tag" | "t" | "d">[];
};

export type BreedStatsContent = {
  items: Item<"value" | "suffix" | "label">[];
};

export type BreedFaqContent = {
  eyebrow: string;
  title: string;
  items: Item<"q" | "a">[];
};

export type BreedCtaContent = {
  title: string;
  body: string;
  label: string;
  href: string;
};

export const breedHeroSection = (defaults: BreedHeroContent) =>
  section("hero", {
    label: "الواجهة الرئيسية",
    fields: [
      f.image("image", "صورة الخلفية"),
      f.text("eyebrow", "الشارة"),
      f.text("title", "العنوان"),
      f.textarea("subtitle", "النص التعريفي"),
      f.text("primaryLabel", "نص الزر الأول"),
      f.url("primaryHref", "رابط الزر الأول", {
        hint: "استخدم #pillars أو #spotlight أو #cards للانتقال لقسم في الصفحة",
      }),
      f.text("secondaryLabel", "نص الزر الثاني"),
      f.url("secondaryHref", "رابط الزر الثاني"),
    ],
    defaults,
  });

export const breedPillarsSection = (defaults: BreedPillarsContent) =>
  section("pillars", {
    label: "الركائز",
    fields: [
      f.text("eyebrow", "العنوان الصغير"),
      f.text("title", "العنوان"),
      f.textarea("desc", "الوصف"),
      f.image("image", "الصورة", { hint: "اتركها فارغة لعرض تصميم الحمض النووي المتحرك" }),
      f.text("imageBadge", "شارة الصورة"),
      f.list("items", "الركائز", "ركيزة", [
        f.icon("icon", "الأيقونة"),
        f.text("t", "العنوان"),
        f.textarea("d", "الوصف"),
      ]),
    ],
    defaults,
  });

export const breedSpotlightSection = (label: string, defaults: BreedSpotlightContent) =>
  section("spotlight", {
    label,
    fields: [
      f.text("eyebrow", "العنوان الصغير"),
      f.text("title", "العنوان"),
      f.textarea("desc", "الوصف"),
      f.image("image", "صورة (اختيارية)"),
      f.text("ctaLabel", "نص الزر (اختياري)"),
      f.url("ctaHref", "رابط الزر"),
      f.list("items", "البطاقات", "بطاقة", [
        f.icon("icon", "الأيقونة"),
        f.text("t", "العنوان"),
        f.textarea("d", "الوصف"),
      ]),
    ],
    defaults,
  });

export const breedCardsSection = (label: string, defaults: BreedCardsContent) =>
  section("cards", {
    label,
    fields: [
      f.text("eyebrow", "العنوان الصغير"),
      f.text("title", "العنوان"),
      f.textarea("desc", "الوصف"),
      f.list("items", "البطاقات", "بطاقة", [
        f.text("t", "العنوان"),
        f.text("tag", "الوسم"),
        f.textarea("d", "الوصف"),
      ]),
    ],
    defaults,
  });

export const breedStatsSection = (defaults: BreedStatsContent) =>
  section("stats", {
    label: "الأرقام",
    fields: [
      f.list(
        "items",
        "الأرقام",
        "رقم",
        [
          f.text("value", "القيمة", { dir: "ltr" }),
          f.text("suffix", "اللاحقة (مثل % أو +)", { dir: "ltr" }),
          f.text("label", "الوصف"),
        ],
        {
          titleField: "label",
          hint: "الأرقام البسيطة (مثل 99.9) تظهر بعدّاد متحرك، والقيم مثل 1:1.5 تظهر كما هي",
        },
      ),
    ],
    defaults,
  });

export const breedFaqSection = (defaults: BreedFaqContent) =>
  section("faq", {
    label: "الأسئلة الشائعة",
    fields: [
      f.text("eyebrow", "العنوان الصغير"),
      f.text("title", "العنوان"),
      f.list("items", "الأسئلة", "سؤال", [f.text("q", "السؤال"), f.textarea("a", "الإجابة")]),
    ],
    defaults,
  });

export const breedCtaSection = (defaults: BreedCtaContent) =>
  section("cta", {
    label: "دعوة للتواصل",
    fields: [
      f.text("title", "العنوان"),
      f.textarea("body", "النص"),
      f.text("label", "نص الزر"),
      f.url("href", "رابط الزر"),
    ],
    defaults,
  });
