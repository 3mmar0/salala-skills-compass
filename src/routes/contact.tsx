import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/Layout";
import { meta } from "@/lib/meta";
import heroImg from "@/assets/h-contact.jpg";

export const Route = createFileRoute("/contact")({
  head: () => meta("تواصل معنا", "تواصل مع فريق سلالة لطلب دورة تدريبية أو استشارة أو دعم مشروعك."),
  component: Contact,
});

const input = "w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary";

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero image={heroImg} eyebrow="تواصل معنا" title="نسعد بتواصلك" subtitle="اترك رسالتك وسيتواصل معك فريقنا في أقرب وقت." />
      <section className="container-site grid gap-8 py-24 lg:grid-cols-3">
        <div className="space-y-4">
          <div className="rounded-2xl border bg-card p-6"><Mail className="text-primary" /><p className="mt-3 font-semibold">البريد الإلكتروني</p><p className="text-muted-foreground">info@yourcompany.example.com</p></div>
          <div className="rounded-2xl border bg-card p-6"><Phone className="text-primary" /><p className="mt-3 font-semibold">الهاتف</p><p className="text-muted-foreground" dir="ltr">+1 555-555-5556</p></div>
        </div>
        <div className="rounded-3xl border bg-card p-8 shadow-soft lg:col-span-2">
          {sent ? (
            <div className="py-16 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
              <h3 className="mt-4 text-2xl font-bold text-forest">تم استلام رسالتك</h3>
              <p className="mt-2 text-muted-foreground">شكراً لك، سنتواصل معك قريباً.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-4 md:grid-cols-2">
              <input required placeholder="الاسم بالكامل" className={input} />
              <input required type="tel" placeholder="رقم الهاتف" className={input} />
              <input required type="email" placeholder="البريد الإلكتروني" className={`${input} md:col-span-2`} />
              <select className={`${input} md:col-span-2`} defaultValue="">
                <option value="" disabled>نوع الطلب</option>
                <option>دورة تدريبية</option><option>استشارة شركات</option><option>استشارة فردية</option><option>ريادة الأعمال</option><option>أخرى</option>
              </select>
              <textarea required rows={5} placeholder="رسالتك" className={`${input} md:col-span-2`} />
              <button className="btn-primary w-fit">إرسال</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
