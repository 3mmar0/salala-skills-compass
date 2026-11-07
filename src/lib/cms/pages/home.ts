import hero from "@/assets/hero.jpg";
import fields from "@/assets/fields.jpg";
import { definePage, f, section } from "../schema";

export const homeHero = section("hero", {
  label: "الواجهة الرئيسية",
  description: "الصورة الكبيرة والعنوان وأزرار البداية.",
  fields: [
    f.text("badge", "الشارة أعلى العنوان"),
    f.text("title", "العنوان الرئيسي"),
    f.textarea("subtitle", "النص التعريفي"),
    f.image("image", "صورة الخلفية"),
    f.text("primaryLabel", "نص الزر الأول"),
    f.url("primaryHref", "رابط الزر الأول"),
    f.text("secondaryLabel", "نص الزر الثاني"),
    f.url("secondaryHref", "رابط الزر الثاني"),
  ],
  defaults: {
    badge: "منصـــة Solala",
    title: "تدريب، استشارات، ريادة أعمال",
    subtitle: "منصة متكاملة للتعلم والتطوير، تهدف إلى تنمية المهارات، ودعم الابتكار، وفتح آفاق جديدة للفرص المهنية وريادة الأعمال.",
    image: hero,
    primaryLabel: "من نحن",
    primaryHref: "/about",
    secondaryLabel: "بوابة الخدمات",
    secondaryHref: "/courses",
  },
  legacyPageFields: { title: "heroTitle", subtitle: "heroSubtitle" },
});

export const homePillars = section("pillars", {
  label: "ركائز سلالة",
  description: "البطاقات الثلاث أسفل الواجهة.",
  fields: [f.list("items", "البطاقات", "بطاقة", [f.icon(), f.text("title", "العنوان"), f.textarea("description", "الوصف")])],
  defaults: {
    items: [
      { icon: "GraduationCap", title: "سد الفجوة", description: "بين التعليم الأكاديمي وسوق العمل" },
      { icon: "Users", title: "تطوير ودعم", description: "المهارات الشخصية والفنية للأفراد والشركات" },
      { icon: "Lightbulb", title: "المساهمة", description: "في دفع عجلة الابتكار وريادة الأعمال" },
    ],
  },
});

export const homeStats = section("stats", {
  label: "الأرقام والإحصائيات",
  fields: [
    f.list("items", "الأرقام", "رقم", [
      f.text("value", "الرقم", { dir: "ltr", hint: "أرقام فقط، مثل 5000" }),
      f.text("suffix", "اللاحقة", { hint: "مثل +" }),
      f.text("label", "الوصف"),
    ], { titleField: "label" }),
  ],
  defaults: {
    items: [
      { value: "5000", suffix: "+", label: "متدرب ومتدربة" },
      { value: "120", suffix: "+", label: "برنامج تدريبي" },
      { value: "350", suffix: "+", label: "استشارة منجزة" },
      { value: "40", suffix: "+", label: "خبير ومستشار" },
    ],
  },
});

export const homeMethodology = section("methodology", {
  label: "منهجية التدريب",
  fields: [
    f.text("eyebrow", "العنوان الصغير"),
    f.text("title", "العنوان"),
    f.textarea("subtitle", "الوصف"),
    f.image("image", "الصورة"),
    f.list("items", "المراحل", "مرحلة", [f.icon(), f.text("title", "العنوان"), f.textarea("description", "الوصف")]),
    f.text("ctaLabel", "نص الزر"),
    f.url("ctaHref", "رابط الزر"),
  ],
  defaults: {
    eyebrow: "منظومة التعلم العملي",
    title: "منهجية التدريب",
    subtitle: "برامج تطبيقية مدروسة تدمج بين الأساس العلمي والممارسة الحقلية المباشرة",
    image: fields,
    items: [
      { icon: "Briefcase", title: "التأهيل لسوق العمل", description: "برامج تدريبية وتطبيقية متوافقة مع متطلبات سوق العمل الزراعي المعاصر." },
      { icon: "RefreshCw", title: "التدريب المستمر", description: "مواكبة دورية ومستمرة لتطوير مهارات المهندسين والفنيين والمستثمرين." },
      { icon: "Cpu", title: "التعرّف على أحدث التقنيات", description: "تطبيقات الزراعة الذكية، إدارة الري الحديث، وأساليب المكافحة الحيوية." },
    ],
    ctaLabel: "الانتقال إلى دليل التدريب",
    ctaHref: "/courses",
  },
});

export const homeConsulting = section("consulting", {
  label: "خدمة الاستشارات",
  fields: [
    f.text("eyebrow", "العنوان الصغير"),
    f.text("title", "العنوان"),
    f.textarea("subtitle", "الوصف"),
    f.list("items", "الخدمات", "خدمة", [f.icon(), f.text("title", "اسم الخدمة")]),
    f.text("ctaLabel", "نص الزر"),
    f.url("ctaHref", "رابط الزر"),
  ],
  defaults: {
    eyebrow: "دعم استشاري متخصص",
    title: "خدمة الاستشارات",
    subtitle: "حلول استشارية متكاملة مصممة لتلبية متطلبات المستثمرين، أصحاب المزارع والشركات",
    items: [
      { icon: "Zap", title: "استشارة سريعة" },
      { icon: "MapPin", title: "استشارة ميدانية" },
      { icon: "CalendarClock", title: "متابعة دورية" },
      { icon: "TrendingUp", title: "استشارة استثمارية" },
    ],
    ctaLabel: "اطلب استشارة",
    ctaHref: "/consulting",
  },
});

export const homeEntrepreneurship = section("entrepreneurship", {
  label: "الابتكار وريادة الأعمال",
  fields: [
    f.text("eyebrow", "العنوان الصغير"),
    f.text("title", "العنوان"),
    f.textarea("subtitle", "الوصف"),
    f.list("items", "الخطوات", "خطوة", [f.icon(), f.text("title", "اسم الخطوة")]),
    f.text("ctaLabel", "نص الزر"),
    f.url("ctaHref", "رابط الزر"),
  ],
  defaults: {
    eyebrow: "منظومة تحويل الأفكار إلى واقع",
    title: "الابتكار وريادة الأعمال",
    subtitle: "نرافقك من شرارة الفكرة الأولى وحتى إطلاق المشروع وتوسعه في الأسواق",
    items: [
      { icon: "Lightbulb", title: "حاضنة الأفكار" },
      { icon: "Hammer", title: "بناء المشروع" },
      { icon: "Rocket", title: "تطوير المشروع" },
      { icon: "Handshake", title: "الربط الاستثماري" },
      { icon: "Store", title: "الانخراط السوقي" },
    ],
    ctaLabel: "اكتشف تفاصيل برامج ريادة الأعمال",
    ctaHref: "/entrepreneurship",
  },
});

export const homeExperts = section("experts", {
  label: "خبراء Solala",
  fields: [
    f.text("eyebrow", "العنوان الصغير"),
    f.text("title", "العنوان"),
    f.textarea("subtitle", "الوصف"),
    f.list("items", "الخبراء", "خبير", [
      f.text("name", "الاسم"),
      f.text("role", "المسمى"),
      f.textarea("bio", "نبذة"),
      f.image("image", "الصورة الشخصية", { hint: "اختيارية — تظهر الأحرف الأولى بدونها" }),
    ]),
  ],
  defaults: {
    eyebrow: "خبرات حقلية وأكاديمية",
    title: "خبراء Solala",
    subtitle: "يقوم بالتدريب والاستشارات خبراء متمرسون في مختلف المجالات.",
    items: [
      { name: "د. أحمد عبد الرحمن", role: "استشاري الإنتاج النباتي والبيوت المحمية", bio: "أكثر من 18 عاماً في إدارة مزارع الخضر والفاكهة والتغذية النباتية المتكاملة.", image: "" },
      { name: "م. طارق فاروق", role: "رئيس قطاع التدريب الحيواني والداجني", bio: "خبير تغذية المجترات وإدارة عنابر التسمين والإنتاج الداجني والمزارع السمكية.", image: "" },
      { name: "د. سارة المنشاوي", role: "استشارية وقاية النبات والمكافحة الحيوية", bio: "متخصصة في برامج المكافحة المتكاملة للآفات (IPM) والاستخدام الرشيد للمركبات.", image: "" },
      { name: "م. يوسف النجار", role: "مستشار إداريات وسلاسل الإمداد الزراعي", bio: "خبير دراسات الجدوى وإدارة التكاليف وسجلات التوثيق واعتمادات التصدير الزراعي.", image: "" },
    ],
  },
});

export const homeSponsors = section("sponsors", {
  label: "رعاة Solala",
  fields: [
    f.text("eyebrow", "العنوان الصغير"),
    f.text("title", "العنوان"),
    f.textarea("subtitle", "الوصف"),
    f.list("items", "الرعاة", "راعٍ", [f.text("name", "الاسم"), f.image("logo", "الشعار", { hint: "اختياري — يظهر الاسم بدونه" })]),
  ],
  defaults: {
    eyebrow: "شركاء النجاح والدعم",
    title: "رعاة Solala",
    subtitle: "نعتز بشراكتنا الاستراتيجية مع كبرى الكيانات والمؤسسات الداعمة لمسيرة التطوير والابتكار وريادة الأعمال.",
    items: [
      { name: "شريك استراتيجي", logo: "" },
      { name: "راعٍ ذهبي", logo: "" },
      { name: "شريك أكاديمي", logo: "" },
      { name: "شريك تقني", logo: "" },
    ],
  },
});

export const homeCta = section("cta", {
  label: "دعوة التواصل",
  fields: [f.text("title", "العنوان"), f.textarea("body", "النص"), f.text("ctaLabel", "نص الزر"), f.url("ctaHref", "رابط الزر")],
  defaults: {
    title: "ابدأ رحلتك مع Solala اليوم",
    body: "سواء كنت طالباً أو مهندساً أو مستثمراً، لدينا البرنامج المناسب لك.",
    ctaLabel: "تواصل معنا",
    ctaHref: "/contact",
  },
});

export const homePage = definePage({
  key: "home",
  slug: "/",
  title: "الرئيسية",
  description: "الصفحة الرئيسية للموقع",
  sections: [homeHero, homePillars, homeStats, homeMethodology, homeConsulting, homeEntrepreneurship, homeExperts, homeSponsors, homeCta],
});
