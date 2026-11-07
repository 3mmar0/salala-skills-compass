import { definePage, f, section } from "../schema";
import heroImg from "@/assets/h-policies.jpg";

export const policiesHero = section("hero", {
 label: "الواجهة الرئيسية",
 fields: [f.text("eyebrow", "العنوان التمهيدي"), f.text("title", "العنوان"), f.textarea("subtitle", "النص التعريفي"), f.image("image", "الصورة")],
 defaults: {
  "eyebrow": "السياسات والشروط",
  "title": "الشفافية أساس الثقة",
  "subtitle": "يرجى قراءة السياسات التالية بعناية قبل استخدام خدمات المنصة.",
  "image": heroImg
},
 legacyPageFields: { title: "heroTitle", subtitle: "heroSubtitle" },
});

export const policiesPolicies = section("policies", {
 label: "السياسات",
 fields: [f.list("sections", "السياسات", "عنصر", [f.text("t", "العنوان"), f.textarea("body", "النص")])],
 defaults: {
  "sections": [
    {
      "t": "شروط الاستخدام",
      "body": "باستخدامك لمنصة Solala فإنك توافق على الالتزام بهذه الشروط وجميع القوانين المعمول بها.\nيُحظر استخدام محتوى المنصة لأغراض تجارية دون إذن كتابي مسبق."
    },
    {
      "t": "سياسة الخصوصية",
      "body": "نجمع البيانات الضرورية فقط لتقديم خدماتنا مثل الاسم ووسيلة التواصل.\nلا نشارك بياناتك مع أي طرف ثالث إلا بموافقتك أو بموجب القانون."
    },
    {
      "t": "سياسة التسجيل والإلغاء",
      "body": "يتم تأكيد التسجيل في الدورات بعد استكمال البيانات المطلوبة.\nيمكن إلغاء التسجيل قبل بدء البرنامج وفق المواعيد المعلنة لكل دورة."
    },
    {
      "t": "الملكية الفكرية",
      "body": "جميع المواد التدريبية والمحتوى المنشور مملوكة لـ Solala أو لأصحابها المرخِّصين، ومحمية بموجب قوانين الملكية الفكرية."
    }
  ]
},
});

export const policiesPage = definePage({ key: "policies", slug: "/policies", title: "السياسات والشروط", sections: [policiesHero, policiesPolicies] });
