import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, Leaf, Sparkles, Mail, Phone, Facebook, Linkedin, Twitter } from "lucide-react";
import { useCmsOptional } from "@/lib/cms/CmsProvider";
import { CmsLink } from "@/components/cms/CmsLink";

export const NAV = [
  { to: "/", label: "الرئيسية" },
  { to: "/about", label: "عن سلالة" },
  { to: "/courses", label: "الدورات والتدريبات" },
  { to: "/consulting", label: "الاستشارات" },
  { to: "/breed-innovation", label: "مركز ابتكار السلالات" },
  { to: "/entrepreneurship", label: "ريادة الأعمال والمشاريع" },
  { to: "/library", label: "المكتبة" },
  { to: "/landscape", label: "اللاندسكيب" },
] as const;

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="سلالة - الصفحة الرئيسية"
      className={`inline-flex overflow-hidden rounded-xl ${light ? "bg-white p-1.5" : ""}`}
    >
      <img src="/solala-logo.png" alt="Solala سلالة" width={142} height={147} className="h-12 w-auto" />
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
  const cms = useCmsOptional();
  const settings = cms?.store.settings;
  const tagline =
    settings?.tagline ||
    "منصة متكاملة متخصصة في التدريب، الاستشارات، وإدارة وتشغيل المشاريع الاستثمارية لتعزيز الإنتاجية والاستدامة.";
  const email = settings?.email || "info@yourcompany.example.com";
  const phone = settings?.phone || "+1 555-555-5556";
  const siteName = settings?.siteName || "Solala";
  const socials = [
    { I: Facebook, href: settings?.facebook || "#", label: "Facebook" },
    { I: Twitter, href: settings?.twitter || "#", label: "X" },
    { I: Linkedin, href: settings?.linkedin || "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="container-site grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-md leading-8 opacity-80">{tagline}</p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ I, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="grid h-10 w-10 place-items-center rounded-full border border-forest-foreground/20 hover:bg-forest-foreground/10"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h5 className="mb-4 font-bold text-gold">روابط مفيدة</h5>
          <ul className="space-y-2 text-sm opacity-85">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-gold">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="mb-4 font-bold text-gold">تواصل معنا</h5>
          <ul className="space-y-3 text-sm opacity-85">
            <li>
              <Link to="/contact" className="hover:text-gold">
                نموذج التواصل
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${email}`} className="hover:text-gold" dir="ltr">
                {email}
              </a>
            </li>
            <li className="flex items-center gap-2" dir="ltr">
              <Phone className="h-4 w-4" />
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-gold">
                {phone}
              </a>
            </li>
            {settings?.address ? <li className="opacity-85">{settings.address}</li> : null}
          </ul>
        </div>
      </div>
      <div className="border-t border-forest-foreground/10 py-5 text-center text-sm opacity-70">
        © {new Date().getFullYear()} {siteName} — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}

export function Wave({ className = "" }: { className?: string }) {
  const d = "M0,64 C120,96 240,32 360,48 C480,64 600,112 720,96 C840,80 960,24 1080,32 C1200,40 1320,88 1440,64 L1440,120 L0,120 Z";
  return (
    <div dir="ltr" className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden md:h-32 ${className}`}>
      <svg className="wave-track-slow absolute bottom-0 left-0 h-full fill-background opacity-40" viewBox="0 0 2880 120" preserveAspectRatio="none">
        <path d={d} /><path d={d} transform="translate(1440 0)" />
      </svg>
      <svg className="wave-track absolute bottom-0 left-0 h-[80%] fill-background" viewBox="0 0 2880 120" preserveAspectRatio="none">
        <path d={d} /><path d={d} transform="translate(1440 0)" />
      </svg>
    </div>
  );
}

export function Particles({ n = 14 }: { n?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="particle" style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i * 0.7) % 9}s`, animationDuration: `${7 + (i % 5) * 1.5}s`, width: 4 + (i % 4) * 2, height: 4 + (i % 4) * 2 }} />
      ))}
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle, image, children }: { eyebrow: string; title: string; subtitle?: string; image: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden text-forest-foreground">
      <img src={image} alt={title} width={1600} height={912} className="animate-ken-burns absolute inset-0 h-full w-full object-cover" />
      <div className="bg-hero-overlay absolute inset-0" />
      <div className="animate-blob absolute -left-24 top-10 h-80 w-80 bg-gold/25 blur-3xl" />
      <div className="animate-blob absolute -right-20 bottom-0 h-96 w-96 bg-primary/40 blur-3xl [animation-delay:-6s]" />
      <Particles />
      <div className="container-site relative pb-36 pt-24 md:pb-44 md:pt-32">
        <span className="animate-fade-up inline-block rounded-full bg-gold/20 px-4 py-1 text-sm font-medium text-gold backdrop-blur">{eyebrow}</span>
        <h1 className="animate-fade-up delay-1 mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
        {subtitle && <p className="animate-fade-up delay-2 mt-5 max-w-2xl text-lg leading-8 opacity-90">{subtitle}</p>}
        {children && <div className="animate-fade-up delay-3 mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
      <Wave />
    </section>
  );
}

export function SectionHead({ eyebrow, title, desc }: { eyebrow?: string; title: string; desc?: string }) {
  return (
    <div className="reveal relative mx-auto mb-12 max-w-2xl text-center">
      <Leaf className="leaf-float pointer-events-none absolute -top-2 right-0 h-8 w-8 text-gold/60 md:-right-10" />
      <Leaf className="leaf-float pointer-events-none absolute bottom-0 left-0 h-6 w-6 -scale-x-100 text-primary-light/50 [animation-delay:-3s] md:-left-10" />
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-sm font-semibold text-primary">
          <Sparkles className="h-4 w-4 text-gold-dark" /> {eyebrow}
        </span>
      )}
      <h2 className="text-shimmer mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
      <span className="title-line" />
      {desc && <p className="mt-4 leading-8 text-muted-foreground">{desc}</p>}
    </div>
  );
}

const DEFAULT_STATS = [
  { value: "5000", suffix: "+", label: "متدرب ومتدربة" },
  { value: "120", suffix: "+", label: "برنامج تدريبي" },
  { value: "350", suffix: "+", label: "استشارة منجزة" },
  { value: "40", suffix: "+", label: "خبير ومستشار" },
];

export function Stats({ items = DEFAULT_STATS }: { items?: { value: string; suffix: string; label: string }[] }) {
  return (
    <section className="bg-forest-gradient relative overflow-hidden py-16 text-forest-foreground">
      <Particles n={10} />
      <div className="container-site relative grid grid-cols-2 gap-8 text-center md:grid-cols-4">
        {items.map((i, index) => (
          <div key={`${i.label}-${index}`} className="reveal">
            <Counter to={Number(String(i.value).replace(/[^\d.]/g, "")) || 0} suffix={i.suffix} />
            <p className="mt-2 opacity-80">{i.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1600);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref} className="font-display text-4xl font-bold text-gold md:text-5xl">{v.toLocaleString("ar-EG")}{suffix}</span>;
}

export function ExpertCard({ name, role, bio, note, image }: { name: string; role: string; bio: string; note?: string | undefined; image?: string | undefined }) {
  const initials = name.replace(/^(د\.|م\.)\s*/, "").split(" ").map((w) => w[0]).slice(0, 2).join(" ");
  return (
    <div className="group card-fx reveal rounded-2xl border bg-card p-6 shadow-soft">
      {image ? (
        <img src={image} alt={name} loading="lazy" className="h-16 w-16 rounded-2xl object-cover" />
      ) : (
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-secondary font-display text-xl font-bold text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
          {initials}
        </div>
      )}
      <h4 className="mt-5 text-lg font-bold text-forest">{name}</h4>
      <p className="text-sm font-medium text-primary">{role}</p>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{bio}</p>
      {note && <p className="mt-4 inline-block rounded-full bg-muted px-3 py-1 text-xs text-foreground">{note}</p>}
    </div>
  );
}

export function CtaBand({ title, desc, to = "/contact", label }: { title: string; desc: string; to?: string; label: string }) {
  return (
    <section className="container-site py-20">
      <div className="bg-forest-gradient relative overflow-hidden reveal rounded-3xl p-10 text-center text-forest-foreground md:p-16">
        <Particles n={8} />
        <div className="animate-blob absolute -right-16 -top-16 h-56 w-56 bg-gold/20 blur-3xl" />
        <h3 className="text-2xl font-bold md:text-4xl">{title}</h3>
        <p className="mx-auto mt-4 max-w-2xl leading-8 opacity-85">{desc}</p>
        {label ? <CmsLink href={to} className="btn-gold btn-glow mt-8">{label}</CmsLink> : null}
      </div>
    </section>
  );
}

export function WavyBg({ className = "" }: { className?: string }) {
  return <img src="/shapes/wavy.svg" alt="" aria-hidden className={`pointer-events-none absolute inset-0 -z-0 h-full w-full object-cover opacity-90 ${className}`} />;
}

export function FloatsBg({ className = "" }: { className?: string }) {
  return <img src="/shapes/floats.svg" alt="" aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60 ${className}`} />;
}
