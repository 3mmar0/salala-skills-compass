import { definePage, f, section } from "../schema";
import heroImg from "@/assets/h-library.jpg";

export const libraryHero = section("hero", {
 label: "الواجهة الرئيسية",
 fields: [f.text("eyebrow", "العنوان التمهيدي"), f.text("title", "العنوان"), f.textarea("subtitle", "النص التعريفي"), f.image("image", "الصورة")],
 defaults: {
  "items": [
    {
      "t": "أساسيات الزراعة المائية",
      "d": "دليل عملي لتركيب وتشغيل أنظمة الهيدروبونيك.",
      "k": "guide",
      "c": "الإنتاج النباتي"
    },
    {
      "t": "المكافحة المتكاملة للآفات",
      "d": "مرجع شامل لبرامج IPM في المحاصيل الحقلية.",
      "k": "book",
      "c": "وقاية النبات"
    },
    {
      "t": "تصميم شبكات الري بالتنقيط",
      "d": "سلسلة فيديوهات تطبيقية خطوة بخطوة.",
      "k": "video",
      "c": "الهندسة الزراعية"
    },
    {
      "t": "تغذية الدواجن الحديثة",
      "d": "علائق متوازنة وإدارة العنابر.",
      "k": "guide",
      "c": "الإنتاج الحيواني"
    },
    {
      "t": "دراسة جدوى مزرعة سمكية",
      "d": "نموذج جاهز قابل للتعديل.",
      "k": "book",
      "c": "إدارة المشاريع"
    },
    {
      "t": "تحليل التربة وتفسير النتائج",
      "d": "كيف تقرأ تقرير المعمل وتبني برنامج التسميد.",
      "k": "video",
      "c": "الأراضي والمياه"
    }
  ],
  "eyebrow": "المكتبة",
  "title": "مكتبة المعرفة الزراعية",
  "subtitle": "كتب، أدلة عملية، وفيديوهات تعليمية يعدّها خبراء Solala.",
  "image": heroImg
},
 legacyPageFields: { title: "heroTitle", subtitle: "heroSubtitle" },
});

export const libraryResources = section("resources", {
 label: "محتوى المكتبة",
 fields: [f.image("backgroundImage", "صورة الخلفية الزخرفية"), f.list("items", "محتوى المكتبة", "عنصر", [f.text("t", "العنوان"), f.textarea("d", "الوصف"), f.text("k", "النوع (guide / book / video)", { dir: "ltr" }), f.text("c", "الفئة")]), f.text("title", "العنوان"), f.text("text2", "نص «قريباً»"), f.text("allLabel", "نص «الكل»"), f.text("bookLabel", "نص زر الكتاب"), f.text("guideLabel", "نص زر الدليل"), f.text("videoLabel", "نص زر الفيديو")],
 defaults: {
 "backgroundImage": "/shapes/floats.svg",
  "items": [
    {
      "t": "أساسيات الزراعة المائية",
      "d": "دليل عملي لتركيب وتشغيل أنظمة الهيدروبونيك.",
      "k": "guide",
      "c": "الإنتاج النباتي"
    },
    {
      "t": "المكافحة المتكاملة للآفات",
      "d": "مرجع شامل لبرامج IPM في المحاصيل الحقلية.",
      "k": "book",
      "c": "وقاية النبات"
    },
    {
      "t": "تصميم شبكات الري بالتنقيط",
      "d": "سلسلة فيديوهات تطبيقية خطوة بخطوة.",
      "k": "video",
      "c": "الهندسة الزراعية"
    },
    {
      "t": "تغذية الدواجن الحديثة",
      "d": "علائق متوازنة وإدارة العنابر.",
      "k": "guide",
      "c": "الإنتاج الحيواني"
    },
    {
      "t": "دراسة جدوى مزرعة سمكية",
      "d": "نموذج جاهز قابل للتعديل.",
      "k": "book",
      "c": "إدارة المشاريع"
    },
    {
      "t": "تحليل التربة وتفسير النتائج",
      "d": "كيف تقرأ تقرير المعمل وتبني برنامج التسميد.",
      "k": "video",
      "c": "الأراضي والمياه"
    }
  ],
  "title": "تصفح المحتوى",
  "text2": " قريباً",
  "allLabel": "الكل",
  "bookLabel": "كتاب",
  "guideLabel": "دليل",
  "videoLabel": "فيديو"
},
});

export const libraryPage = definePage({ key: "library", slug: "/library", title: "المكتبة", sections: [libraryHero, libraryResources] });
