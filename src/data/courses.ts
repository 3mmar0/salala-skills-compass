import type { StaticImageData } from "react";
import courseHero from "@/assets/h-courses.jpg";
import animalHubImg from "@/assets/courses/animal-hub.jpg";
import animalCourse1 from "@/assets/courses/animal-course-1.jpg";
import animalCourse2 from "@/assets/courses/animal-course-2.jpg";
import animalCourse3 from "@/assets/courses/animal-course-3.jpg";
import poultryImg from "@/assets/courses/poultry.jpg";
import fishImg from "@/assets/courses/fish.jpg";

export type CourseModule = string;

export type CourseProgram = {
  id: string;
  orderLabel: string;
  badge: string;
  format: string;
  title: string;
  trainer: string;
  hours: string;
  modules: CourseModule[];
  image: string | StaticImageData;
};

export type CourseBranch = {
  slug: string;
  title: string;
  description: string;
  image: string | StaticImageData;
  /** When false, only the short description from the reference hub is available. */
  detailAvailable: boolean;
  programs?: CourseProgram[];
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
};

export type CourseCategory = {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  featured?: boolean;
  image: string | StaticImageData;
  /** Full nested content exists in the reference site */
  detailAvailable: boolean;
  path: string;
  branches?: CourseBranch[];
};

export const COURSE_STATUSES = ["طالب", "خريج", "قائم بالعمل", "مستثمر / صاحب مزرعة"] as const;
export const COURSE_SCHEDULES = [
  {
    value: "المجموعة المسائية (أونلاين تفاعلي Zoom)",
    label: "المجموعة المسائية (أيام الأسبوع أونلاين عبر Zoom)",
  },
  {
    value: "مجموعة عطلة نهاية الأسبوع (مكثف)",
    label: "مجموعة عطلة نهاية الأسبوع (الجمعة والسبت مكثف)",
  },
  { value: "برنامج المعايشة الميدانية الكاملة", label: "برنامج المعايشة والتدريب الحقلي المباشر" },
] as const;
export const COURSE_COUNTRIES = [
  { value: "مصر", label: "مصر (+20)", dial: "+20" },
  { value: "المملكة العربية السعودية", label: "المملكة العربية السعودية (+966)", dial: "+966" },
  { value: "الإمارات العربية المتحدة", label: "الإمارات العربية المتحدة (+971)", dial: "+971" },
  { value: "الكويت", label: "الكويت (+965)", dial: "+965" },
  { value: "قطر", label: "قطر (+974)", dial: "+974" },
  { value: "البحرين", label: "البحرين (+973)", dial: "+973" },
  { value: "سلطنة عمان", label: "سلطنة عمان (+968)", dial: "+968" },
  { value: "الأردن", label: "الأردن (+962)", dial: "+962" },
  { value: "العراق", label: "العراق (+964)", dial: "+964" },
  { value: "ليبيا", label: "ليبيا (+218)", dial: "+218" },
  { value: "السودان", label: "السودان (+249)", dial: "+249" },
  { value: "دولة أخرى", label: "دولة أخرى", dial: "" },
] as const;
export const COURSE_GOVERNORATES = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "القليوبية",
  "الدقهلية",
  "الشرقية",
  "المنوفية",
  "الغربية",
  "كفر الشيخ",
  "البحيرة",
  "الفيوم",
  "بني سويف",
  "المنيا",
  "أسيوط",
  "سوهاج",
  "الإسماعيلية",
  "السويس",
  "بورسعيد",
  "محافظة أخرى",
] as const;

export const animalPrograms: CourseProgram[] = [
  {
    id: "dairy-cattle",
    orderLabel: "الكورس الأول",
    badge: "إنتاج الحليب والألبان",
    format: "تدريب معتمد + حقل",
    title: "كورس إدارة وتغذية مزارع أبقار الحليب",
    trainer: "د. مصطفى الشناوي",
    hours: "36 ساعة تدريبية (6 أسابيع)",
    image: animalCourse1,
    modules: [
      "حساب الاحتياجات الغذائية لأبقار الحليب وتركيب العلائق وحفظ السيلاج.",
      "تشغيل وإدارة المحالب الآلية، معايير جودة الحليب ومكافحة التهاب الضرع.",
      "دورات التناسل، كشف الشياع، برامج التلقيح الاصطناعي ومتابعة العشار.",
      "إدارة قطعان الفطام والعجلات البديلة ومعايير التحويل الغذائي.",
    ],
  },
  {
    id: "beef-fattening",
    orderLabel: "الكورس الثاني",
    badge: "إنتاج اللحوم الحمراء",
    format: "تدريب معتمد + حقل",
    title: "كورس اقتصاديات وتسمين العجول والمجترات",
    trainer: "م. أحمد عبد الرازق",
    hours: "30 ساعة تدريبية (5 أسابيع)",
    image: animalCourse2,
    modules: [
      "مواصفات اختيار وشراء عجول التسمين واختبارات الصحة الأولية.",
      "برامج التعليف التدريجي ومعدلات التحويل اليومي للوصول للوزن المثالي.",
      "الإجراءات الوقائية، التحصينات الدورية وبروتوكولات علاج نزلات التنفس.",
      "دراسات الجدوى، حساب تكلفة الكيلوجرام لحم قائم وتوقيتات البيع المربحة.",
    ],
  },
  {
    id: "sheep-goats",
    orderLabel: "الكورس الثالث",
    badge: "المجترات الصغيرة",
    format: "تدريب معتمد + حقل",
    title: "كورس الإنتاج المكثف للأغنام والماعز",
    trainer: "د. هاني سلامة",
    hours: "24 ساعة تدريبية (4 أسابيع)",
    image: animalCourse3,
    modules: [
      "السلالات التجارية المناسبة للتربية المكثفة والتأقلم المناخي.",
      "برامج الدفع الغذائي (Flushing) ومضاعفة نسب التوائم والخصوبة.",
      "نظم إيواء الحظائر الاقتصادية، التهوية والتحكم في الإجهاد الحراري.",
      "الرعاية البيطرية للمواليد الجدد وبرامج التحصين ضد التسمم المعوي والجدري.",
    ],
  },
  {
    id: "biosecurity",
    orderLabel: "الكورس الرابع",
    badge: "الصحة والوقاية المزرعية",
    format: "تدريب معتمد + حقل",
    title: "كورس الرعاية البيطرية والأمن الحيوي بالمزارع",
    trainer: "د. طارق المنشاوي",
    hours: "28 ساعة تدريبية (4 أسابيع)",
    image: animalHubImg,
    modules: [
      "أسس وبروتوكولات الأمن الحيوي وحجر الحيوانات الجديدة وتطهير المركبات.",
      "الكشف المبكر عن الأمراض الباطنية والنزلات المعوية وحالات التسمم الغذائي.",
      "جداول التحصينات المعتمدة والتعامل الآمن مع اللقاحات والأمصال.",
      "الإسعافات الأولية لحالات النفاخ، عسر الولادة وإصابات الحوافر الميدانية.",
    ],
  },
];

export const animalLivestockCategory: CourseCategory = {
  slug: "animal-livestock",
  title: "الإنتاج الحيواني والداجني والسمكي",
  shortTitle: "الإنتاج الحيواني",
  description: "تدريبات متخصصة في الانتاج الحيواني والداجني والسمكي",
  featured: true,
  image: animalHubImg,
  detailAvailable: true,
  path: "/courses/animal-livestock",
  branches: [
    {
      slug: "animal",
      title: "الإنتاج الحيواني",
      description:
        "يشمل فروع تربية وتغذية ورعاية مجترات اللحم والألبان (الأبقار، الجاموس، الأغنام والماعز) ودوراتها التطبيقية.",
      image: animalHubImg,
      detailAvailable: true,
      heroEyebrow: "دليل البرامج التخصصية المعتمدة",
      heroTitle: "دورات قطاع الإنتاج الحيواني",
      heroSubtitle:
        "اختر دورتك التدريبية التخصصية من بين 4 برامج مهنية متقدمة يقدمها نخبة من كبار الخبراء والاستشاريين، لربط المعرفة العلمية بالتطبيق الميداني المباشر.",
      programs: animalPrograms,
    },
    {
      slug: "poultry",
      title: "الإنتاج الداجني",
      description:
        "يشمل فروع دجاج التسمين، دجاج البياض، الأمهات، ونظم العنابر المغلقة والتحكم البيئي المتطورة.",
      image: poultryImg,
      detailAvailable: false,
    },
    {
      slug: "fish",
      title: "الإنتاج السمكي",
      description:
        "يشمل فروع الاستزراع المكثف، تقنيات البيوفلوك وRAS، جودة المياه، وتفريخ وتغذية الأسماك البحرية والنيلية.",
      image: fishImg,
      detailAvailable: false,
    },
  ],
};

/** Categories listed on the reference courses hub. Only animal-livestock has published nested pages. */
export const courseCategories: CourseCategory[] = [
  animalLivestockCategory,
  {
    slug: "plant-production",
    title: "الإنتاج النباتي (محاصيل - خضر - فاكهة - زينة)",
    shortTitle: "الإنتاج النباتي",
    description:
      "تدريبات متخصصة في الإنتاج النباتي بأقسامه ( الخضر- المحاصيل الزراعية- أشجار الفاكهة- الزهور والزينة وتنسيق الحدائق)",
    featured: true,
    image: courseHero,
    detailAvailable: false,
    path: "/courses/plant-production",
  },
  {
    slug: "plant-protection",
    title: "وقاية نبات (أمراض النبات - الحشرات - المبيدات)",
    shortTitle: "وقاية نبات",
    description: "أمراض النبات - الحشرات - المبيدات",
    image: courseHero,
    detailAvailable: false,
    path: "/courses/plant-protection",
  },
  {
    slug: "food-processing",
    title: "التصنيع الغذائي (ألبان - صناعات غذائية)",
    shortTitle: "التصنيع الغذائي",
    description: "ألبان - صناعات غذائية",
    image: courseHero,
    detailAvailable: false,
    path: "/courses/food-processing",
  },
  {
    slug: "agricultural-engineering",
    title: "الهندسة الزراعية",
    description: "برامج وتدريبات في الهندسة الزراعية.",
    image: courseHero,
    detailAvailable: false,
    path: "/courses/agricultural-engineering",
  },
  {
    slug: "land-water",
    title: "الأراضي والمياه",
    description: "برامج وتدريبات في الأراضي والمياه.",
    image: courseHero,
    detailAvailable: false,
    path: "/courses/land-water",
  },
  {
    slug: "biotechnology",
    title: "التكنولوجيا الحيوية (علم الوراثة - ميكروبيولوجي)",
    shortTitle: "التكنولوجيا الحيوية",
    description: "علم الوراثة - ميكروبيولوجي",
    image: courseHero,
    detailAvailable: false,
    path: "/courses/biotechnology",
  },
  {
    slug: "economics-management",
    title: "اقتصاديات وإدارة المشاريع",
    description: "برامج وتدريبات في اقتصاديات وإدارة المشاريع.",
    image: courseHero,
    detailAvailable: false,
    path: "/courses/economics-management",
  },
];

export function getCategory(slug: string) {
  return courseCategories.find((c) => c.slug === slug);
}

export function getAnimalBranch(slug: string) {
  return animalLivestockCategory.branches?.find((b) => b.slug === slug);
}

export function animalProgramSelectOptions() {
  return animalPrograms.map((p) => ({
    value: p.title,
    label: `${p.title} (${p.hours.split(" ")[0]} ساعة - ${p.trainer})`,
  }));
}
