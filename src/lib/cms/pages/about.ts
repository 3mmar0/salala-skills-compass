import { definePage, f, section } from "../schema";
import fields from "@/assets/fields.jpg";
import heroImg from "@/assets/h-about.jpg";

export const aboutHero = section("hero", {
 label: "الواجهة الرئيسية",
 fields: [f.text("eyebrow", "العنوان التمهيدي"), f.text("title", "العنوان"), f.textarea("subtitle", "النص التعريفي"), f.image("image", "الصورة")],
 defaults: {
  "eyebrow": "من نحن",
  "title": "Solala is...",
  "subtitle": "طموحنا ورسالتنا: منظومة زراعية متكاملة لتمكين الكوادر وقيادة المشاريع.",
  "image": heroImg
},
 legacyPageFields: { title: "heroTitle", subtitle: "heroSubtitle" },
});

export const aboutVision = section("vision", {
 label: "الرؤية والرسالة",
 fields: [f.text("eyebrow", "العنوان التمهيدي"), f.text("title", "العنوان"), f.text("text2", "عنوان الرؤية"), f.textarea("text3", "نص الرؤية"), f.text("text4", "عنوان الرسالة"), f.textarea("text5", "نص الرسالة"), f.text("imageAlt", "وصف الصورة"), f.image("image", "الصورة")],
 defaults: {
  "eyebrow": "طموحنا ورسالتنا",
  "title": "رؤيتنا ورسالتنا في Solala",
  "text2": "رؤيتنا",
  "text3": "أن نكون المنظومة الزراعية المتكاملة والمرجع الأول في العالم العربي لتمكين الكوادر، وتوفير الاستشارات التخصصية، وقيادة وإدارة المشاريع الزراعية وفق أعلى معايير الجودة والاستدامة.",
  "text4": "رسالتنا",
  "text5": "نقدم حلولاً متكاملة ترتكز على التدريب التطبيقي، والاستشارات الفنية والإدارية للمشاريع الزراعية، ودعم المستثمرين والمهندسين، وتحويل التحديات إلى نجاحات على أرض الواقع.",
  "imageAlt": "حقول زراعية",
  "image": fields
},
});

export const aboutValues = section("values", {
 label: "قيمنا العليا",
 fields: [f.image("backgroundImage", "صورة الخلفية الزخرفية"), f.list("values", "قيمنا العليا", "عنصر", [f.icon("icon", "الأيقونة"), f.text("t", "العنوان"), f.textarea("d", "الوصف")]), f.text("title", "العنوان"), f.textarea("body", "الوصف")],
 defaults: {
 "backgroundImage": "/shapes/wavy.svg",
  "values": [
    {
      "icon": "Lightbulb",
      "t": "الابتكار المستمر",
      "d": "نبحث دوماً عن أحدث التقنيات ونطور حلولاً هندسية تناسب البيئات والمناخات الزراعية المختلفة."
    },
    {
      "icon": "Leaf",
      "t": "الاستدامة البيئية",
      "d": "نضع الحفاظ على الموارد المائية وحماية التربة في قلب كل حل وممارسة زراعية نقدمها."
    },
    {
      "icon": "ShieldCheck",
      "t": "الجودة والموثوقية",
      "d": "نلتزم بأعلى المعايير العالمية في تركيب وتوريد وإدارة الأنظمة الزراعية لضمان استدامة المشاريع."
    }
  ],
  "title": "قيـمنا العـليا",
  "body": "القيم العليا المبني عليها الأعمال في سلالة"
},
});

export const aboutTeam = section("team", {
 label: "فريق العمل",
 fields: [f.list("team", "فريق العمل", "عنصر", [f.text("name", "الاسم"), f.text("role", "المسمى"), f.textarea("bio", "نبذة"), f.image("image", "الصورة"), f.text("note", "ملاحظة")]), f.text("eyebrow", "العنوان التمهيدي"), f.text("title", "العنوان"), f.textarea("body", "الوصف")],
 defaults: {
  "team": [
    {
      "name": "د. أحمد المهدي",
      "role": "كبير خبراء التربة والتغذية",
      "bio": "خبرة أكثر من 15 عاماً في الإشراف على المشاريع الزراعية وتطوير المحاليل المغذية للزراعة المائية.",
      "image": "",
      "note": ""
    },
    {
      "name": "م. سارة القحطاني",
      "role": "مديرة أنظمة البيوت المحمية",
      "bio": "متخصصة في هندسة التحكم بالمناخ الداخلي والأتمتة الذكية لبيئات الزراعة المحمية والمغلقة.",
      "image": "",
      "note": ""
    },
    {
      "name": "م. عمر الشريف",
      "role": "مهندس الري والذكاء الاصطناعي",
      "bio": "يقود تصميم شبكات الري الدقيق وتطبيق خوارزميات الاستشعار عن بعد ومسح الحقول بالدرونز.",
      "image": "",
      "note": ""
    }
  ],
  "eyebrow": "الخبراء والمهندسون",
  "title": "فريق عمل Solala",
  "body": "نخبة من المهندسين الزراعيين وخبراء التكنولوجيا الحيوية المكرسين لتعليمك وتدريبك"
},
});

export const aboutCta = section("cta", {
 label: "دعوة للتواصل",
 fields: [f.text("title", "العنوان"), f.textarea("body", "الوصف"), f.text("ctaLabel", "نص الزر"), f.url("ctaHref", "رابط الزر")],
 defaults: {
  "title": "انضم إلى مجتمع Solala",
  "body": "تواصل معنا لمعرفة كيف يمكننا دعم مسيرتك المهنية أو مشروعك الزراعي.",
  "ctaLabel": "تواصل معنا",
  "ctaHref": "/contact"
},
});

export const aboutPage = definePage({ key: "about", slug: "/about", title: "عن سلالة", sections: [aboutHero, aboutVision, aboutValues, aboutTeam, aboutCta] });
