import { definePage, f, section } from "../schema";
import heroImg from "@/assets/h-consulting.jpg";

export const consultingHero = section("hero", {
 label: "الواجهة الرئيسية",
 fields: [f.text("eyebrow", "العنوان التمهيدي"), f.text("title", "العنوان"), f.textarea("subtitle", "النص التعريفي"), f.image("image", "الصورة"), f.text("text4", "نص الزر"), f.url("ctaHref", "رابط الزر")],
 defaults: {
  "eyebrow": "خدمات الاستشارات التخصصية",
  "title": "استشارات مقدمة من كبار الخبراء",
  "subtitle": "نشخص، نطبق، نتابع ونقيس الأثر",
  "image": heroImg,
  "text4": "تعرف على الاستشاريين",
  "ctaHref": "#experts"
},
 legacyPageFields: { title: "heroTitle", subtitle: "heroSubtitle" },
});

export const consultingAudience = section("audience", {
 label: "مسارات الدعم الاستشاري",
 fields: [f.list("audience", "مسارات الدعم الاستشاري", "عنصر", [f.icon("icon", "الأيقونة"), f.text("e", "العنوان الصغير"), f.text("t", "العنوان"), f.textarea("d", "الوصف"), f.text("c", "الفئة"), f.url("href", "الرابط")]), f.text("eyebrow", "العنوان التمهيدي"), f.text("title", "العنوان"), f.textarea("body", "الوصف")],
 defaults: {
  "audience": [
    {
      "icon": "Building2",
      "e": "قطاع الشركات والمؤسسات",
      "t": "استشارات الشركات",
      "d": "حلول مؤسسية استراتيجية مخصصة للشركات الكبرى، المزارع الاستثمارية، عمليات التصنيع، وسلاسل الإمداد والتصدير لرفع كفاءة الإنتاج.",
      "c": "طلب استشارة الشركات",
      "href": "/contact"
    },
    {
      "icon": "User",
      "e": "قطاع الأفراد والمشاريع الناشئة",
      "t": "استشارات الأفراد",
      "d": "جلسات استشارية مرنة وموجهة لأصحاب المشاريع الناشئة، المهندسين الممارسين، والمستثمرين الجدد لتمكينهم من اتخاذ القرارات الصحيحة.",
      "c": "طلب استشارة فردية",
      "href": "/contact"
    }
  ],
  "eyebrow": "مسارات الدعم الاستشاري",
  "title": "لمن تُقدّم استشاراتنا؟",
  "body": "منظومة تغطي متطلبات قطاع الأعمال والشركات، وتلبي طموحات الأفراد والمستثمرين المستقلين."
},
});

export const consultingExperts = section("experts", {
 label: "كبار الاستشاريين",
 fields: [f.image("backgroundImage", "صورة الخلفية الزخرفية"), f.list("experts", "كبار الاستشاريين", "عنصر", [f.text("name", "الاسم"), f.text("role", "المسمى"), f.textarea("bio", "نبذة"), f.text("note", "ملاحظة"), f.image("image", "الصورة")]), f.text("eyebrow", "العنوان التمهيدي"), f.text("title", "العنوان"), f.textarea("body", "الوصف")],
 defaults: {
 "backgroundImage": "/shapes/floats.svg",
  "experts": [
    {
      "name": "د. عبد الرحمن السويدي",
      "role": "مستشار أول دراسات الجدوى والاستثمار",
      "bio": "أكثر من 20 عاماً في تقييم وتأسيس المشاريع الزراعية الاستثمارية والشركات الناشئة في الزراعة الذكية.",
      "note": "متاح للاستشارات الحضورية وعن بعد",
      "image": ""
    },
    {
      "name": "م. منى الفهد",
      "role": "استشارية بيئات الزراعة المغلقة والمائية",
      "bio": "خبيرة دولية في تركيب المحاليل وموازنة الـ pH و EC ومعالجة مشكلات النمو في أنظمة الزراعة المائية.",
      "note": "متاحة للاستشارات الحقلية والفنية",
      "image": ""
    },
    {
      "name": "م. طارق العريان",
      "role": "استشاري هندسة الري وحماية المحاصيل",
      "bio": "متخصص في إدارة المزارع الكبرى، تصميم شبكات الري المضغوط، وتشخيص ومكافحة الآفات الزراعية المتقدمة.",
      "note": "متاح للزيارات الميدانية والمخططات",
      "image": ""
    }
  ],
  "eyebrow": "نخبة الخبراء",
  "title": "فريق كبار الاستشاريين",
  "body": "نضع بين يديك عقوداً من الخبرة العملية والأكاديمية لمساعدتك في اتخاذ القرار الصائب"
},
});

export const consultingSteps = section("steps", {
 label: "خطوات الاستشارة",
 fields: [f.list("steps", "خطوات الاستشارة", "عنصر", [f.text("t", "العنوان"), f.textarea("d", "الوصف"), f.text("number", "الرقم")]), f.text("title", "العنوان"), f.textarea("body", "الوصف")],
 defaults: {
  "steps": [
    {
      "t": "تقديم الطلب",
      "d": "املأ تفاصيل مشروعك أو التحدي الزراعي الذي تواجهه ونوع الاستشارة المطلوبة.",
      "number": "1"
    },
    {
      "t": "تحديد الاستشاري",
      "d": "نقوم بتوجيه طلبك لأفضل استشاري خبير متخصص في طبيعة استفسارك.",
      "number": "2"
    },
    {
      "t": "جلسة الاستشارة",
      "d": "جلسة تفاعلية (بالتواصل أو زيارة ميدانية) لمناقشة كافة التفاصيل والحلول.",
      "number": "3"
    },
    {
      "t": "التقرير والتوصيات",
      "d": "استلام تقرير استشاري مفصل وخطة عمل تنفيذية قابلة للتطبيق مباشرة.",
      "number": "4"
    }
  ],
  "title": "كيف تبدأ استشارتك؟",
  "body": "خطوات بسيطة ومباشرة لحجز جلستك مع الاستشاري المناسب"
},
});

export const consultingClients = section("clients", {
 label: "عملاؤنا",
 fields: [f.image("backgroundImage", "صورة الخلفية الزخرفية"), f.list("clients", "عملاؤنا", "عنصر", [f.text("t", "العنوان"), f.textarea("d", "الوصف")]), f.text("eyebrow", "العنوان التمهيدي"), f.text("title", "العنوان"), f.textarea("body", "الوصف")],
 defaults: {
 "backgroundImage": "/shapes/wavy.svg",
  "clients": [
    {
      "t": "شركة الدلتا الزراعية",
      "d": "إنتاج وتصدير الخضر والفاكهة"
    },
    {
      "t": "مجموعة واحة النخيل",
      "d": "مزارع تمور وتصنيع زراعي"
    },
    {
      "t": "أجري تك للري الحديث",
      "d": "أنظمة الري والطاقة المتجددة"
    },
    {
      "t": "شركة النماء للإنتاج الحيواني",
      "d": "مزارع الألبان والتسمين الحديثة"
    }
  ],
  "eyebrow": "شركاء النجاح والثقة",
  "title": "عـمــلاؤنا",
  "body": "نعتز بتقديم الدعم الاستشاري لنخبة من كبرى الشركات والمزارع والمؤسسات الرائدة"
},
});

export const consultingCta = section("cta", {
 label: "دعوة للتواصل",
 fields: [f.text("title", "العنوان"), f.textarea("body", "الوصف"), f.text("ctaLabel", "نص الزر"), f.url("ctaHref", "رابط الزر")],
 defaults: {
  "title": "هل تحتاج استشارة عاجلة لمشروعك أو مزرعتك؟",
  "body": "تواصل معنا اليوم وسيقوم منسق الاستشارات بربطك مع الخبير الزراعي الأنسب لطلبك خلال 24 ساعة.",
  "ctaLabel": "احجز استشارتك الآن",
  "ctaHref": "/contact"
},
});

export const consultingPage = definePage({ key: "consulting", slug: "/consulting", title: "الاستشارات", sections: [consultingHero, consultingAudience, consultingExperts, consultingSteps, consultingClients, consultingCta] });
