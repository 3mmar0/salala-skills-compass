import { Link, useRouterState } from "@tanstack/react-router";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  GraduationCap,
  ClipboardList,
  Settings2,
  Sprout,
} from "lucide-react";
import type { ReactNode } from "react";
import { logoutAdmin } from "@/lib/cms/client-store";
import { useCms } from "@/lib/cms/CmsProvider";

const NAV = [
  { to: "/admin", label: "نظرة عامة", icon: LayoutDashboard, exact: true },
  { to: "/admin/settings", label: "إعدادات الموقع", icon: Settings2 },
  { to: "/admin/pages", label: "الصفحات", icon: FileText },
  { to: "/admin/courses", label: "كتالوج الدورات", icon: GraduationCap },
  { to: "/admin/registrations", label: "التسجيلات", icon: ClipboardList },
] as const;

export function AdminShell({ children, title, desc }: { children: ReactNode; title: string; desc?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { saving, lastSaveMode } = useCms();

  return (
    <div className="admin-shell min-h-screen bg-[oklch(0.97_0.01_95)] text-forest">
      <div className="mx-auto grid min-h-screen max-w-[1400px] lg:grid-cols-[1fr_260px]">
        <main className="order-2 px-4 py-6 sm:px-8 lg:order-1 lg:py-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-forest/10 pb-6">
            <div>
              <p className="text-xs font-semibold tracking-wide text-gold-dark">سجل التحرير · Solala</p>
              <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">{title}</h1>
              {desc && <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">{desc}</p>}
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {saving ? <span className="text-primary">جاري الحفظ...</span> : null}
              {lastSaveMode === "server" && <span className="rounded-full bg-secondary px-3 py-1 text-primary">محفوظ على الخادم</span>}
              {lastSaveMode === "local" && (
                <span className="rounded-full bg-gold/20 px-3 py-1 text-gold-dark">محفوظ محلياً (الاستضافة ثابتة)</span>
              )}
            </div>
          </div>
          {children}
        </main>

        <aside className="order-1 border-b border-forest/10 bg-forest text-forest-foreground lg:order-2 lg:border-b-0 lg:border-s lg:border-forest/20">
          <div className="sticky top-0 flex h-full flex-col px-4 py-6 sm:px-5">
            <Link to="/admin" className="mb-8 flex items-center gap-3 px-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold/20 text-gold">
                <Sprout className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-bold">Solala Admin</p>
                <p className="text-xs opacity-70">إدارة محتوى المنصة</p>
              </div>
            </Link>

            <nav className="flex flex-1 flex-col gap-1">
              {NAV.map(({ to, label, icon: Icon, exact }) => {
                const active = exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                      active ? "bg-gold/20 text-gold" : "opacity-80 hover:bg-white/5 hover:opacity-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
              <Link to="/" className="block rounded-xl px-3 py-2 text-sm opacity-80 hover:bg-white/5">
                عرض الموقع
              </Link>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm opacity-80 hover:bg-white/5"
                onClick={async () => {
                  await logoutAdmin();
                  window.location.href = "/admin/login";
                }}
              >
                <LogOut className="h-4 w-4" /> تسجيل الخروج
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function AdminField({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-forest">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export const adminInput =
  "w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";
