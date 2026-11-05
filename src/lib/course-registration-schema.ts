import { z } from "zod";

export const courseRegistrationSchema = z
  .object({
    courseTitle: z.string().min(1, "اختر الكورس"),
    fullName: z.string().min(3, "الاسم مطلوب"),
    age: z.coerce.number().min(15, "الحد الأدنى 15").max(80, "الحد الأقصى 80"),
    status: z.enum(["طالب", "خريج", "قائم بالعمل", "مستثمر / صاحب مزرعة"]),
    university: z.string().optional(),
    faculty: z.string().optional(),
    graduationYear: z.string().optional(),
    workplace: z.string().optional(),
    jobTitle: z.string().optional(),
    schedule: z.string().min(1, "اختر الموعد"),
    country: z.string().min(1, "اختر الدولة"),
    governorate: z.string().optional(),
    phone: z.string().min(8, "رقم الهاتف مطلوب"),
    email: z.string().email("بريد إلكتروني غير صالح"),
    track: z.string().min(1),
  })
  .superRefine((data, ctx) => {
    if (data.status === "طالب" || data.status === "خريج") {
      if (!data.university?.trim()) {
        ctx.addIssue({ code: "custom", message: "اسم الجامعة مطلوب", path: ["university"] });
      }
      if (!data.faculty?.trim()) {
        ctx.addIssue({ code: "custom", message: "اسم الكلية مطلوب", path: ["faculty"] });
      }
      if (!data.graduationYear?.trim()) {
        ctx.addIssue({ code: "custom", message: "سنة التخرج مطلوبة", path: ["graduationYear"] });
      }
    }
    if (data.status === "قائم بالعمل" || data.status === "مستثمر / صاحب مزرعة") {
      if (!data.workplace?.trim()) {
        ctx.addIssue({ code: "custom", message: "جهة العمل مطلوبة", path: ["workplace"] });
      }
      if (!data.jobTitle?.trim()) {
        ctx.addIssue({ code: "custom", message: "المسمى الوظيفي مطلوب", path: ["jobTitle"] });
      }
    }
    if (data.country === "مصر" && !data.governorate?.trim()) {
      ctx.addIssue({ code: "custom", message: "المحافظة مطلوبة داخل مصر", path: ["governorate"] });
    }
  });

export type CourseRegistrationInput = z.infer<typeof courseRegistrationSchema>;
