import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  COURSE_COUNTRIES,
  COURSE_GOVERNORATES,
  COURSE_SCHEDULES,
  COURSE_STATUSES,
  animalProgramSelectOptions,
} from "@/data/courses";
import {
  courseRegistrationSchema,
  type CourseRegistrationInput,
  type CourseRegistrationFormValues,
} from "@/lib/course-registration-schema";
import { submitCourseRegistration } from "@/lib/submit-course-registration";
import { adminApi } from "@/lib/cms/client-store";
import { useCmsOptional } from "@/lib/cms/CmsProvider";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const field =
  "w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary disabled:opacity-60";
const labelCls = "mb-1.5 block text-sm font-medium text-forest";
const errCls = "mt-1 text-xs text-destructive";

type CourseOption = { value: string; label: string; id?: number };

type Props = {
  track: string;
  defaultCourseTitle?: string;
  preferredCourseTitle?: string;
  courseOptions?: CourseOption[];
  title?: string;
  description?: string;
  courseId?: number;
  resolveCourseId?: (courseTitle: string) => number | undefined;
};

export function CourseRegistrationForm({
  track,
  defaultCourseTitle = "",
  preferredCourseTitle,
  courseOptions = animalProgramSelectOptions(),
  title = "استمارة التسجيل في دورات الإنتاج الحيواني",
  description = "اختر الكورس الذي ترغب في الالتحاق به واملأ البيانات التالية، وسيتواصل معك منسق البرنامج التدريبي لتأكيد التسجيل.",
  courseId,
  resolveCourseId,
}: Props) {
  const cms = useCmsOptional();
  const whatsappNumber =
    cms?.store.settings.whatsapp?.trim() || cms?.store.settings.phone?.trim() || "";

  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<CourseRegistrationInput | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CourseRegistrationFormValues, unknown, CourseRegistrationInput>({
    resolver: zodResolver(courseRegistrationSchema),
    defaultValues: {
      track,
      courseTitle: defaultCourseTitle,
      country: "",
      schedule: "",
      governorate: "",
      university: "",
      faculty: "",
      graduationYear: "",
      workplace: "",
      jobTitle: "",
      phone: "+20",
    },
  });

  useEffect(() => {
    if (preferredCourseTitle) {
      setValue("courseTitle", preferredCourseTitle, { shouldValidate: true, shouldDirty: true });
    }
  }, [preferredCourseTitle, setValue]);

  const status = watch("status");
  const country = watch("country");
  const dial = useMemo(
    () => COURSE_COUNTRIES.find((c) => c.value === country)?.dial ?? "",
    [country],
  );
  const isStudent = status === "طالب" || status === "خريج";
  const isWorker = status === "قائم بالعمل" || status === "مستثمر / صاحب مزرعة";

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      const phone =
        dial && !values.phone.trim().startsWith("+")
          ? `${dial}${values.phone.replace(/^0+/, "")}`
          : values.phone;
      const payload = { ...values, phone, track };
      const resolvedId =
        courseId ??
        resolveCourseId?.(values.courseTitle) ??
        courseOptions.find((o) => o.value === values.courseTitle)?.id;

      if (resolvedId) {
        await adminApi("/course-registrations", {
          method: "POST",
          body: JSON.stringify({ ...payload, courseId: resolvedId }),
        });
      } else {
        await submitCourseRegistration({ data: payload });
      }
      setSubmitted(payload);
      setDone(true);
    } catch (e) {
      console.error(e);
      setServerError(
        "تعذر حفظ طلب التسجيل حالياً. تحقق من الاتصال ثم أعد المحاولة، أو تواصل معنا عبر صفحة التواصل.",
      );
    }
  });

  if (done) {
    const detailsMessage = [
      "مرحباً، تم تسجيل طلب دورة عبر موقع Solala:",
      submitted?.courseTitle ? `الكورس: ${submitted.courseTitle}` : null,
      submitted?.fullName ? `الاسم: ${submitted.fullName}` : null,
      submitted?.phone ? `الهاتف: ${submitted.phone}` : null,
      submitted?.email ? `البريد: ${submitted.email}` : null,
      submitted?.status ? `الصفة: ${submitted.status}` : null,
      submitted?.schedule ? `الموعد المفضل: ${submitted.schedule}` : null,
      submitted?.country ? `البلد: ${submitted.country}` : null,
      submitted?.governorate ? `المحافظة: ${submitted.governorate}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = whatsappNumber ? buildWhatsAppUrl(whatsappNumber, detailsMessage) : "";

    return (
      <div
        id="registration-form"
        className="rounded-3xl border border-forest/10 bg-card p-8 text-center shadow-soft md:p-12"
      >
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
        <h3 className="mt-4 text-2xl font-bold text-forest">تم تسجيل طلبك بنجاح!</h3>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground leading-8">
          شكراً لك، سيتواصل معك منسق الكورس التدريبي من فريق Solala عبر الهاتف أو الواتساب لتأكيد
          موعد الدورة وتفاصيل الالتحاق.
        </p>
        {waUrl ? (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 inline-flex"
          >
            <MessageCircle className="h-5 w-5" />
            تواصل عبر واتساب لإكمال التفاصيل
          </a>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">
            رقم واتساب غير مضبوط حالياً في إعدادات الموقع. يمكنك{" "}
            <Link to="/contact" className="font-semibold text-primary underline">
              التواصل معنا
            </Link>
            .
          </p>
        )}
      </div>
    );
  }

  return (
    <div id="registration-form" className="rounded-3xl border bg-card p-6 shadow-soft md:p-10">
      <h2 className="text-2xl font-bold text-forest md:text-3xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-muted-foreground leading-8">{description}</p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4 md:grid-cols-2" noValidate>
        <div className="md:col-span-2">
          <label className={labelCls} htmlFor="courseTitle">
            الكورس المراد التسجيل به *
          </label>
          <select id="courseTitle" className={field} {...register("courseTitle")}>
            <option value="">اختر الكورس...</option>
            {courseOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {errors.courseTitle && <p className={errCls}>{errors.courseTitle.message}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="fullName">
            الاسم بالكامل *
          </label>
          <input
            id="fullName"
            className={field}
            placeholder="أدخل اسمك ثلاثي أو رباعي"
            {...register("fullName")}
          />
          {errors.fullName && <p className={errCls}>{errors.fullName.message}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="age">
            السن (العمر) *
          </label>
          <input
            id="age"
            type="number"
            min={15}
            max={80}
            className={field}
            placeholder="مثال: 25"
            {...register("age")}
          />
          {errors.age && <p className={errCls}>{errors.age.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelCls} htmlFor="status">
            الصفة *
          </label>
          <select id="status" className={field} {...register("status")}>
            <option value="">اختر صفتك الحالية...</option>
            {COURSE_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.status && <p className={errCls}>{errors.status.message}</p>}
        </div>

        {isStudent && (
          <>
            <div>
              <label className={labelCls} htmlFor="university">
                اسم الجامعة (للطلاب والخريجين) *
              </label>
              <input
                id="university"
                className={field}
                placeholder="مثال: جامعة القاهرة"
                {...register("university")}
              />
              {errors.university && <p className={errCls}>{errors.university.message}</p>}
            </div>
            <div>
              <label className={labelCls} htmlFor="faculty">
                اسم الكلية / المعهد *
              </label>
              <input
                id="faculty"
                className={field}
                placeholder="مثال: كلية الزراعة / الطب البيطري"
                {...register("faculty")}
              />
              {errors.faculty && <p className={errCls}>{errors.faculty.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className={labelCls} htmlFor="graduationYear">
                سنة التخرج *
              </label>
              <input
                id="graduationYear"
                className={field}
                placeholder="مثال: دفعة 2024"
                {...register("graduationYear")}
              />
              {errors.graduationYear && <p className={errCls}>{errors.graduationYear.message}</p>}
            </div>
          </>
        )}

        {isWorker && (
          <>
            <div>
              <label className={labelCls} htmlFor="workplace">
                جهة العمل / اسم المزرعة *
              </label>
              <input
                id="workplace"
                className={field}
                placeholder="مثال: مزرعة الوفاء للإنتاج الحيواني"
                {...register("workplace")}
              />
              {errors.workplace && <p className={errCls}>{errors.workplace.message}</p>}
            </div>
            <div>
              <label className={labelCls} htmlFor="jobTitle">
                المسمى الوظيفي والتخصص *
              </label>
              <input
                id="jobTitle"
                className={field}
                placeholder="مثال: مهندس إنتاج حيواني / طبيب بيطري"
                {...register("jobTitle")}
              />
              {errors.jobTitle && <p className={errCls}>{errors.jobTitle.message}</p>}
            </div>
          </>
        )}

        <div className="md:col-span-2">
          <label className={labelCls} htmlFor="schedule">
            المجموعة والموعد المفضل *
          </label>
          <select id="schedule" className={field} {...register("schedule")}>
            <option value="">اختر الموعد المناسب لك...</option>
            {COURSE_SCHEDULES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          {errors.schedule && <p className={errCls}>{errors.schedule.message}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="country">
            البلد (الدولة) *
          </label>
          <select id="country" className={field} {...register("country")}>
            <option value="">اختر الدولة...</option>
            {COURSE_COUNTRIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {errors.country && <p className={errCls}>{errors.country.message}</p>}
        </div>

        {country === "مصر" && (
          <div>
            <label className={labelCls} htmlFor="governorate">
              المحافظة (داخل مصر) *
            </label>
            <select id="governorate" className={field} {...register("governorate")}>
              <option value="">اختر المحافظة...</option>
              {COURSE_GOVERNORATES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.governorate && <p className={errCls}>{errors.governorate.message}</p>}
          </div>
        )}

        <div>
          <label className={labelCls} htmlFor="phone">
            رقم الهاتف / واتساب *
          </label>
          <input
            id="phone"
            type="tel"
            dir="ltr"
            className={`${field} text-start`}
            placeholder="مثال: +20 10xxxxxxxx"
            {...register("phone")}
          />
          {errors.phone && <p className={errCls}>{errors.phone.message}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="email">
            البريد الإلكتروني *
          </label>
          <input
            id="email"
            type="email"
            dir="ltr"
            className={`${field} text-start`}
            placeholder="example@domain.com"
            {...register("email")}
          />
          {errors.email && <p className={errCls}>{errors.email.message}</p>}
        </div>

        <input type="hidden" {...register("track")} value={track} />

        {serverError && (
          <div className="md:col-span-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {serverError}{" "}
            <Link to="/contact" className="underline">
              تواصل معنا
            </Link>
          </div>
        )}

        <div className="md:col-span-2">
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> جاري الحفظ...
              </>
            ) : (
              "تأكيد إرسال طلب التسجيل"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
