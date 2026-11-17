import { PageSections } from "@/components/cms/PageSections";
import { useSectionContent } from "@/lib/cms/use-section";
import { contactPage, contactHero, contactContact } from "@/lib/cms/pages/contact";
import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, Phone, CheckCircle2, Loader2 } from "lucide-react";
import { PageHero } from "@/components/site/Layout";
import { publicApi } from "@/lib/cms/client-store";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/contact")({
  head: () => meta("تواصل معنا", "تواصل مع فريق سلالة لطلب دورة تدريبية أو استشارة أو دعم مشروعك.", "/contact"),
  component: Contact,
});

const input = "w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary";

function Contact() {
  return <PageSections page={contactPage} components={{ hero: HeroSection, contact: ContactSection }} />;
}

function HeroSection() {
  const c = useSectionContent(contactHero);
  return <PageHero image={c.image} eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />;
}

function ContactSection() {
  const c = useSectionContent(contactContact);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await publicApi("/inquiries", {
        method: "POST",
        body: JSON.stringify({
          source: "contact",
          full_name: data.get("full_name"),
          phone: data.get("phone"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });
      setSent(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر إرسال الرسالة.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="container-site grid gap-8 py-24 lg:grid-cols-3">
      <div className="space-y-4">
        <div className="rounded-2xl border bg-card p-6"><Mail className="text-primary" /><p className="mt-3 font-semibold">{c.text0}</p><p className="text-muted-foreground">{c.text1}</p></div>
        <div className="rounded-2xl border bg-card p-6"><Phone className="text-primary" /><p className="mt-3 font-semibold">{c.text2}</p><p className="text-muted-foreground" dir="ltr">{c.text3}</p></div>
      </div>
      <div className="rounded-3xl border bg-card p-8 shadow-soft lg:col-span-2">
        {sent ? (
          <div className="py-16 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
            <h3 className="mt-4 text-2xl font-bold text-forest">{c.text4}</h3>
            <p className="mt-2 text-muted-foreground">{c.text5}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
            <input required name="full_name" placeholder="الاسم بالكامل" className={input} />
            <input required name="phone" type="tel" placeholder="رقم الهاتف" className={input} />
            <input required name="email" type="email" placeholder="البريد الإلكتروني" className={`${input} md:col-span-2`} />
            <select name="subject" className={`${input} md:col-span-2`} defaultValue="">
              <option value="" disabled>{c.text6}</option>
              <option>{c.text7}</option><option>{c.text8}</option><option>{c.text9}</option><option>{c.text10}</option><option>{c.text11}</option>
            </select>
            <textarea required name="message" rows={5} placeholder="رسالتك" className={`${input} md:col-span-2`} />
            {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700 md:col-span-2">{error}</p>}
            <button disabled={sending} className="btn-primary inline-flex w-fit items-center gap-2">
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {c.text12}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
