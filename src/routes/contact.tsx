import { PageSections } from "@/components/cms/PageSections";
import { CmsLink } from "@/components/cms/CmsLink";
import { useSectionContent } from "@/lib/cms/use-section";
import { cmsIcon } from "@/lib/cms/icons";
import { contactPage, contactHero, contactContact } from "@/lib/cms/pages/contact";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/Layout";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/contact")({
  head: () => meta("تواصل معنا", "تواصل مع فريق سلالة لطلب دورة تدريبية أو استشارة أو دعم مشروعك.", "/contact"),
  component: Contact,
});

const input = "w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary";


function Contact() {
  return <PageSections page={contactPage} components={{hero: HeroSection, contact: ContactSection}} />;
}

function HeroSection() {
  const c = useSectionContent(contactHero);
  return (
<PageHero image={c.image} eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
  );
}

function ContactSection() {
  const c = useSectionContent(contactContact);
  const [sent, setSent] = useState(false);
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
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-4 md:grid-cols-2">
              <input required placeholder="الاسم بالكامل" className={input} />
              <input required type="tel" placeholder="رقم الهاتف" className={input} />
              <input required type="email" placeholder="البريد الإلكتروني" className={`${input} md:col-span-2`} />
              <select className={`${input} md:col-span-2`} defaultValue="">
                <option value="" disabled>{c.text6}</option>
                <option>{c.text7}</option><option>{c.text8}</option><option>{c.text9}</option><option>{c.text10}</option><option>{c.text11}</option>
              </select>
              <textarea required rows={5} placeholder="رسالتك" className={`${input} md:col-span-2`} />
              <button className="btn-primary w-fit">{c.text12}</button>
            </form>
          )}
        </div>
      </section>
  );
}
