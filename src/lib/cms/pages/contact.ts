import { definePage, f, section } from "../schema";
import heroImg from "@/assets/h-contact.jpg";

export const contactHero = section("hero", {
 label: "الواجهة الرئيسية",
 fields: [f.text("eyebrow", "العنوان التمهيدي"), f.text("title", "العنوان"), f.textarea("subtitle", "النص التعريفي"), f.image("image", "الصورة")],
 defaults: {
  "eyebrow": "تواصل معنا",
  "title": "نسعد بتواصلك",
  "subtitle": "اترك رسالتك وسيتواصل معك فريقنا في أقرب وقت.",
  "image": heroImg
},
 legacyPageFields: { title: "heroTitle", subtitle: "heroSubtitle" },
});

export const contactContact = section("contact", {
 label: "التواصل والنموذج",
 fields: [f.text("text0", "عنوان البريد"), f.text("text1", "البريد الإلكتروني"), f.text("text2", "عنوان الهاتف"), f.text("text3", "رقم الهاتف"), f.text("text4", "عنوان رسالة النجاح"), f.text("text5", "نص رسالة النجاح"), f.text("text6", "عنوان خانة نوع الطلب"), f.text("text7", "خيار ١"), f.text("text8", "خيار ٢"), f.text("text9", "خيار ٣"), f.text("text10", "خيار ٤"), f.text("text11", "خيار ٥"), f.text("text12", "نص زر الإرسال")],
 defaults: {
  "text0": "البريد الإلكتروني",
  "text1": "info@yourcompany.example.com",
  "text2": "الهاتف",
  "text3": "+1 555-555-5556",
  "text4": "تم استلام رسالتك",
  "text5": "شكراً لك، سنتواصل معك قريباً.",
  "text6": "نوع الطلب",
  "text7": "دورة تدريبية",
  "text8": "استشارة شركات",
  "text9": "استشارة فردية",
  "text10": "ريادة الأعمال",
  "text11": "أخرى",
  "text12": "إرسال"
},
});

export const contactPage = definePage({ key: "contact", slug: "/contact", title: "تواصل معنا", sections: [contactHero, contactContact] });
