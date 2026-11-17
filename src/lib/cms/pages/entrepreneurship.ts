import { definePage, f, section } from "../schema";
import heroImg from "@/assets/h-entre.jpg";

export const entrepreneurshipHero = section("hero", {
 label: "الواجهة الرئيسية",
 fields: [f.text("eyebrow", "العنوان التمهيدي"), f.text("title", "العنوان"), f.textarea("subtitle", "النص التعريفي"), f.image("image", "الصورة")],
 defaults: {
  "eyebrow": "منظومة تحويل الأفكار إلى واقع",
  "title": "الابتكار وريادة الأعمال",
  "subtitle": "نرافقك من شرارة الفكرة الأولى وحتى إطلاق المشروع وتوسعه في الأسواق.",
  "image": heroImg
},
 legacyPageFields: { title: "heroTitle", subtitle: "heroSubtitle" },
});

export const entrepreneurshipStages = section("stages", {
 label: "مراحل الرحلة الريادية",
 fields: [f.image("backgroundImage", "صورة الخلفية الزخرفية"), f.list("stages", "مراحل الرحلة الريادية", "عنصر", [f.icon("icon", "الأيقونة"), f.text("t", "العنوان"), f.textarea("d", "الوصف"), f.textarea("features", "المميزات")]), f.text("title", "العنوان"), f.textarea("body", "الوصف")],
 defaults: {
 "backgroundImage": "/shapes/wavy.svg",
  "stages": [
    {
      "icon": "Lightbulb",
      "t": "حاضنة الأفكار",
      "d": "ورش لتوليد الأفكار وتقييمها واختبار جدواها المبدئية مع خبراء القطاع.",
      "features": "جلسات عصف ذهني\nتقييم الفكرة\nنموذج العمل"
    },
    {
      "icon": "Hammer",
      "t": "بناء المشروع",
      "d": "تحويل الفكرة إلى مشروع قائم بخطة عمل ودراسة جدوى ونموذج أولي.",
      "features": "دراسة الجدوى\nخطة التشغيل\nالنموذج الأولي"
    },
    {
      "icon": "Rocket",
      "t": "تطوير المشروع",
      "d": "رفع الكفاءة التشغيلية وتطوير المنتجات والعمليات لتحقيق النمو.",
      "features": "تحسين العمليات\nإدارة الجودة\nالتحول الرقمي"
    },
    {
      "icon": "Handshake",
      "t": "الربط الاستثماري",
      "d": "تجهيز ملف الاستثمار وربط المشاريع بالمستثمرين وجهات التمويل.",
      "features": "ملف المستثمر\nجلسات العرض\nجهات التمويل"
    },
    {
      "icon": "Store",
      "t": "الانخراط السوقي",
      "d": "دعم دخول الأسواق المحلية والتصدير وبناء شبكة العملاء.",
      "features": "استراتيجية التسويق\nقنوات التوزيع\nالتصدير"
    }
  ],
  "title": "مراحل رحلتك الريادية",
  "body": "خمس مراحل متكاملة تأخذ فكرتك الزراعية إلى مشروع ناجح ومستدام"
},
});

export const entrepreneurshipCta = section("cta", {
 label: "استبيان تقديم الفكرة",
 fields: [
   f.text("title", "العنوان"),
   f.textarea("body", "الوصف"),
   f.text("submitLabel", "نص زر الإرسال"),
   f.text("success", "رسالة النجاح"),
   f.text("consent", "نص الموافقة"),
   f.text("ctaLabel", "نص الزر القديم"),
   f.url("ctaHref", "رابط الزر القديم"),
 ],
 defaults: {
  "title": "لديك فكرة مشروع زراعي؟",
  "body": "قدّم فكرتك الآن مع رابط LinkedIn أو سيرتك الذاتية، وسيتواصل معك فريق ريادة الأعمال لتقييمها وتحديد المرحلة المناسبة.",
  "submitLabel": "إرسال الفكرة",
  "success": "تم استلام فكرتك بنجاح. سيتواصل معك فريق ريادة الأعمال قريبًا.",
  "consent": "أوافق على حفظ بياناتي لغرض تقييم الفكرة والتواصل بشأن برامج ريادة الأعمال.",
  "ctaLabel": "قدّم فكرتك",
  "ctaHref": "#apply-idea"
},
});

export const entrepreneurshipPage = definePage({ key: "entrepreneurship", slug: "/entrepreneurship", title: "ريادة الأعمال المتخصصة", sections: [entrepreneurshipHero, entrepreneurshipStages, entrepreneurshipCta] });
