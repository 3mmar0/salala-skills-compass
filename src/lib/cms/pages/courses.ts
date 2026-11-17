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
    cardCta: "عرض التفاصيل",
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
  title: "البرامج التدريبية",
  description: "صفحة مجالات التدريب",
  sections: [coursesHero, coursesCatalog, coursesCustomTraining],
});
