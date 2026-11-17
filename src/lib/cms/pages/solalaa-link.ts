import { definePage, f, section } from "../schema";

export const linkHero = section("hero", {
  label: "واجهة SOLALAA LINK",
  description: "رسالة خدمة التوظيف وروابط الدعوة الرئيسية.",
  fields: [
    f.text("eyebrow", "الشارة"), f.text("brand", "اسم الخدمة", { dir: "ltr" }), f.text("title", "العنوان الرئيسي"),
    f.textarea("subtitle", "النص التعريفي"), f.text("jobCta", "زر الباحث عن عمل"), f.text("companyCta", "زر الشركات"),
  ],
  defaults: {
    eyebrow: "خدمة جديدة · الوظائف والتوظيف", brand: "SOLALAA LINK", title: "نربط الكفاءات بالفرص… وننمي المسار المهني",
    subtitle: "خدمة وساطة توظيف تربط الكفاءات الزراعية والإدارية بفرص عمل وتدريب مناسبة، مع فرز ومتابعة واضحة للطرفين.",
    jobCta: "قدّم على وظيفة", companyCta: "أنا شركة وأبحث عن كفاءات",
  },
});

export const linkServices = section("services", {
  label: "لمن نقدّم الخدمة",
  fields: [f.text("title", "العنوان"), f.textarea("subtitle", "الوصف"), f.list("items", "البطاقات", "بطاقة", [f.text("title", "العنوان"), f.textarea("body", "الوصف"), f.text("icon", "الأيقونة (building / user / handshake)")])],
  defaults: { title: "حلقة وصل عملية بين الكفاءة والفرصة", subtitle: "مسار واحد واضح، من الطلب وحتى بداية العمل.", items: [
    { title: "للشركات", body: "ترشيح مرشحين مؤهلين حسب احتياج الشركة، مع فرز أولي وملف جاهز لكل مرشح.", icon: "building" },
    { title: "للمتدربين", body: "فرص عمل وتدريب تناسب تخصصك ومستواك، وتقديم مباشر بسيرتك الذاتية.", icon: "user" },
    { title: "وساطة ومتابعة", body: "ترتيب المقابلات، متابعة التقييم ودعم الطرفين بعد التعيين.", icon: "handshake" },
  ] },
});

export const linkJourney = section("journey", {
  label: "رحلة التوظيف",
  fields: [f.text("title", "العنوان"), f.textarea("subtitle", "الوصف"), f.list("items", "المراحل", "مرحلة", [f.text("title", "العنوان"), f.textarea("body", "الوصف")])],
  defaults: { title: "رحلة التوظيف في 3 مراحل", subtitle: "لا نترك الطلب في صندوق بريد؛ نتابع معك كل خطوة.", items: [
    { title: "التقديم والاستبيان", body: "أكمل بياناتك وارفع سيرتك الذاتية وحدد المجال الذي يناسبك." },
    { title: "الفرز والترشيح", body: "نراجع الملف ونطابق الخبرات مع الفرص المتاحة ونرشح الأنسب." },
    { title: "المقابلة والتعيين", body: "ننسق المقابلة ونتابع التقييم حتى توقيع العرض وبداية العمل." },
  ] },
});

export const linkOpportunities = section("opportunities", {
  label: "الفرص المتاحة",
  fields: [f.text("title", "العنوان"), f.textarea("subtitle", "الوصف"), f.list("items", "الوظائف", "وظيفة", [f.text("title", "المسمى"), f.text("company", "الجهة"), f.text("type", "نوع الفرصة"), f.text("field", "المجال"), f.text("experience", "الخبرة"), f.text("mode", "نمط العمل")])],
  defaults: { title: "فرص مختارة من شركائنا", subtitle: "اختر فرصة مناسبة ثم أرسل طلبك في دقائق.", items: [
    { title: "مهندس زراعي — الصوب والإنتاج", company: "شركة زراعية شريكة", type: "دوام كامل", field: "الإنتاج الزراعي", experience: "خبرة 1–3 سنوات", mode: "ميداني" },
    { title: "مصمم لاندسكيب", company: "شركة تنسيق حدائق شريكة", type: "عقد مشروع", field: "التصميم والتنفيذ", experience: "خبرة +1 سنة", mode: "هجين" },
    { title: "مساعد إداري", company: "مكتب إدارة أعمال شريك", type: "دوام كامل", field: "الإدارة والمكاتب", experience: "حديث التخرج", mode: "مكتبي" },
    { title: "مشرف مشتل", company: "شركة مشاتل شريكة", type: "دوام كامل", field: "المشاتل والسلالات", experience: "خبرة +2 سنوات", mode: "ميداني" },
    { title: "مسؤول مبيعات زراعية", company: "شركة مستلزمات زراعية شريكة", type: "دوام كامل", field: "المبيعات", experience: "خبرة 1–2 سنة", mode: "ميداني" },
    { title: "متدرب — برنامج تدريب عملي", company: "شركات شريكة متعددة", type: "تدريب", field: "جميع التخصصات", experience: "بدون خبرة", mode: "حسب الشركة" },
  ] },
});

export const linkApply = section("apply", {
  label: "نموذج التقديم",
  description: "نصوص نموذج طلب الوظيفة ورسالة النجاح.",
  fields: [f.text("title", "العنوان"), f.textarea("subtitle", "الوصف"), f.text("submitLabel", "نص زر الإرسال"), f.text("success", "رسالة النجاح"), f.text("consent", "نص الموافقة")],
  defaults: { title: "قدّم طلبك عبر SOLALAA LINK", subtitle: "أرسل بياناتك وسيرتك الذاتية، وسيتواصل معك فريقنا عند وجود فرصة مناسبة.", submitLabel: "إرسال الطلب", success: "تم استلام طلبك بنجاح. سنتواصل معك عند مطابقة ملفك مع فرصة مناسبة.", consent: "أوافق على حفظ بياناتي لغرض الترشيح والتواصل بشأن فرص العمل والتدريب." },
});

export const solalaaLinkPage = definePage({ key: "solalaa-link", slug: "/solalaa-link", title: "SOLALAA LINK", description: "خدمة سلالة لربط الكفاءات بفرص العمل والتدريب.", sections: [linkHero, linkServices, linkJourney, linkOpportunities, linkApply] });
