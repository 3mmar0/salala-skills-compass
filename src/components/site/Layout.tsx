import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Sprout, Mail, Phone, Facebook, Linkedin, Twitter } from "lucide-react";

export const NAV = [
  { to: "/", label: "الرئيسية" },
  { to: "/about", label: "عن سلالة" },
  { to: "/courses", label: "الدورات والتدريبات" },
  { to: "/consulting", label: "الاستشارات" },
  { to: "/entrepreneurship", label: "ريادة الأعمال والمشاريع" },
  { to: "/library", label: "المكتبة" },
  { to: "/faq", label: "الأسئلة الشائعة" },
  { to: "/policies", label: "السياسات والشروط" },
] as const;

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
        <Sprout className="h-5 w-5" />
      </span>
      <span className={`font-display text-xl font-bold ${light ? "text-forest-foreground" : "text-forest"}`}>
        Solala <span className="text-gold">سلالة</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur">
      <div className="container-site flex h-18 items-center justify-between gap-4 py-3">
        <Logo />
        <nav className="hidden items-center gap-1 xl:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
              activeProps={{ className: "bg-secondary text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden xl:block">
          <Link to="/contact" className="btn-primary text-sm">تواصل معنا</Link>
        </div>
        <button className="xl:hidden" aria-label="القائمة" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="container-site flex flex-col gap-1 pb-4 xl:hidden">
          {[...NAV, { to: "/contact", label: "تواصل معنا" } as const].map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-muted">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="container-site grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-md leading-8 opacity-80">
            منصة متكاملة متخصصة في التدريب، الاستشارات، وإدارة وتشغيل المشاريع الاستثمارية لتعزيز الإنتاجية والاستدامة.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Twitter, Linkedin].map((I, i) => (
              <a key={i} href="#" aria-label="social" className="grid h-10 w-10 place-items-center rounded-full border border-forest-foreground/20 hover:bg-forest-foreground/10">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h5 className="mb-4 font-bold text-gold">روابط مفيدة</h5>
          <ul className="space-y-2 text-sm opacity-85">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:text-gold">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="mb-4 font-bold text-gold">تواصل معنا</h5>
          <ul className="space-y-3 text-sm opacity-85">
            <li><Link to="/contact" className="hover:text-gold">نموذج التواصل</Link></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@yourcompany.example.com</li>
            <li className="flex items-center gap-2" dir="ltr"><Phone className="h-4 w-4" /> +1 555-555-5556</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-forest-foreground/10 py-5 text-center text-sm opacity-70">
        © {new Date().getFullYear()} Solala — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="bg-forest-gradient relative overflow-hidden text-forest-foreground">
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="container-site relative py-20 md:py-28">
        <span className="inline-block rounded-full bg-gold/15 px-4 py-1 text-sm font-medium text-gold">{eyebrow}</span>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg leading-8 opacity-85">{subtitle}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, desc }: { eyebrow?: string; title: string; desc?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && <span className="text-sm font-semibold text-primary">{eyebrow}</span>}
      <h2 className="mt-2 text-3xl font-bold text-forest md:text-4xl">{title}</h2>
      {desc && <p className="mt-4 leading-8 text-muted-foreground">{desc}</p>}
    </div>
  );
}

export function ExpertCard({ name, role, bio, note }: { name: string; role: string; bio: string; note?: string }) {
  const initials = name.replace(/^(د\.|م\.)\s*/, "").split(" ").map((w) => w[0]).slice(0, 2).join(" ");
  return (
    <div className="group rounded-2xl border bg-card p-6 shadow-soft transition hover:-translate-y-1">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-secondary font-display text-xl font-bold text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
        {initials}
      </div>
      <h4 className="mt-5 text-lg font-bold text-forest">{name}</h4>
      <p className="text-sm font-medium text-primary">{role}</p>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{bio}</p>
      {note && <p className="mt-4 inline-block rounded-full bg-muted px-3 py-1 text-xs text-foreground">{note}</p>}
    </div>
  );
}

export function CtaBand({ title, desc, to = "/contact", label }: { title: string; desc: string; to?: "/contact" | "/consulting"; label: string }) {
  return (
    <section className="container-site py-20">
      <div className="bg-forest-gradient rounded-3xl p-10 text-center text-forest-foreground md:p-16">
        <h3 className="text-2xl font-bold md:text-4xl">{title}</h3>
        <p className="mx-auto mt-4 max-w-2xl leading-8 opacity-85">{desc}</p>
        <Link to={to} className="btn-gold mt-8">{label}</Link>
      </div>
    </section>
  );
}
