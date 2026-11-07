import courseHero from "@/assets/h-courses.jpg";
import { definePage, f, section } from "../schema";

export const coursesHero = section("hero", {
  label: "الواجهة",
  fields: [
    f.text("logoText", "الكلمة الكبيرة أعلى العنوان", { dir: "ltr" }),
    f.text("title", "العنوان"),
    f.textarea("subtitle", "النص التعريفي"),
    f.image("image", "صورة الخلفية"),
    f.text("searchPlaceholder", "نص خانة البحث"),
  ],
  defaults: {
    logoText: "Solala",
    title: "وجهتك الرئيسية دائما",
    subtitle: "اختر مجالك التخصصي وابدأ رحلتك",
    image: courseHero,
    searchPlaceholder: "ابحث عن مجال...",
  },
  legacyPageFields: { title: "heroTitle", subtitle: "heroSubtitle" },
});

export const coursesCatalog = section("catalog", {
  label: "مجالات التدريب",
  description: "عنوان قائمة المجالات. البطاقات نفسها تُدار من صفحة «الدورات» في لوحة التحكم.",
  fields: [
    f.text("title", "العنوان"),
    f.text("subtitle", "النص أسفل العنوان"),
    f.text("emptyText", "نص عدم وجود نتائج"),
    f.text("cardCta", "نص رابط البطاقة"),
  ],
  defaults: {
    title: "مجالات التدريب",
    subtitle: "اختر تخصصك وابدأ رحلتك..",
    emptyText: "لا توجد نتائج مطابقة.",
    cardCta: "استكشف التخصصات ←",
  },
});

export const coursesCustomTraining = section("customTraining", {
  label: "التدريب المخصص",
  fields: [
    f.text("title", "العنوان"),
    f.textarea("body", "النص"),
    f.text("ctaLabel", "نص الزر"),
    f.url("ctaHref", "رابط الزر"),
    f.image("image", "الرسم الجانبي"),
  ],
  defaults: {
    title: "هل تبحث عن تدريب مخصص لمزرعتك أو شركتك؟",
    body: "نوفر حقائب تدريبية واستشارات ميدانية مصممة خصيصاً لتلبية متطلبات الشركات والمزارع الخاصة وفرق العمل الزراعي.",
    ctaLabel: "طلب استشارة أو تدريب مخصص",
    ctaHref: "/contact",
    image: "/shapes/nature.svg",
  },
});

export const coursesPage = definePage({
  key: "courses",
  slug: "/courses",
  title: "الدورات والتدريبات",
  description: "صفحة مجالات التدريب",
  sections: [coursesHero, coursesCatalog, coursesCustomTraining],
});

/* ---- /courses/animal-livestock ---- */

export const livestockHero = section("hero", {
  label: "الواجهة",
  description: "العنوان يأتي من اسم التصنيف في صفحة «الدورات».",
  fields: [
    f.text("eyebrow", "الشارة"),
    f.textarea("subtitle", "النص التعريفي"),
    f.image("image", "صورة الخلفية", { hint: "اتركها فارغة لاستخدام صورة التصنيف" }),
    f.text("ctaLabel", "نص الزر"),
  ],
  defaults: {
    eyebrow: "Solala",
    subtitle: "برامج ودورات تدريبية وتطبيقية مقدمة لتأهيل الطلاب و الخريجين والمربين لإدارة وتشغيل مزارع الثروة الحيوانية والداجنة والسمكية بأعلى كفاءة وربحية.",
    image: "",
    ctaLabel: "استكشف الدورات المتاحة ↓",
  },
});

export const livestockSpecialties = section("specialties", {
  label: "التخصصات",
  description: "بطاقات التخصصات تُدار من صفحة «الدورات» في لوحة التحكم.",
  fields: [f.text("title", "العنوان"), f.text("cardCta", "نص رابط البطاقة")],
  defaults: { title: "الدورات المتخصصة في فروع الإنتاج الحيواني", cardCta: "عرض الدورات" },
});

export const livestockCustom = section("cta", {
  label: "التدريب المخصص",
  fields: [f.text("title", "العنوان"), f.textarea("body", "النص"), f.text("ctaLabel", "نص الزر"), f.url("ctaHref", "رابط الزر")],
  defaults: {
    title: "هل تحتاج برنامج تدريب مخصص لمزرعتك أو فريقك؟",
    body: "نقدم برامج تدريب ميدانية مخصصة للشركات والمشاريع الزراعية الكبرى، مصممة وفقاً لاحتياجات فريق العمل والإنتاج لديكم.",
    ctaLabel: "طلب تدريب مخصص",
    ctaHref: "/contact",
  },
});

export const livestockPage = definePage({
  key: "animalLivestock",
  slug: "/courses/animal-livestock",
  title: "الإنتاج الحيواني والداجني والسمكي",
  description: "صفحة قسم الإنتاج الحيواني",
  sections: [livestockHero, livestockSpecialties, livestockCustom],
});
