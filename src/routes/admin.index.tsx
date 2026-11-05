import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { FileText, PanelsTopLeft, Settings2, Download } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { exportCmsJson, isAdminAuthed } from "@/lib/cms/client-store";
import { useCms } from "@/lib/cms/CmsProvider";

export const Route = createFileRoute("/admin/")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !isAdminAuthed()) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminHome,
});

function AdminHome() {
  const { store, loading } = useCms();

  return (
    <AdminShell
      title="نظرة عامة"
      desc="حرّر إعدادات الموقع والأقسام والصفحات من مكان واحد، ثم احفظ أو صدّر النسخة الاحتياطية."
    >
      {loading ? (
        <p className="text-muted-foreground">جاري تحميل البيانات...</p>
      ) : (
        <div className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "الأقسام", value: store.sections.length, to: "/admin/sections", icon: PanelsTopLeft },
              { label: "الصفحات", value: store.pages.length, to: "/admin/pages", icon: FileText },
              { label: "البريد المعتمد", value: store.settings.email, to: "/admin/settings", icon: Settings2 },
            ].map((c) => (
              <Link
                key={c.label}
                to={c.to}
                className="rounded-2xl border border-forest/10 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-primary/30"
              >
                <c.icon className="h-5 w-5 text-gold-dark" />
                <p className="mt-4 text-xs font-semibold text-muted-foreground">{c.label}</p>
                <p className="mt-1 truncate font-display text-xl font-bold text-forest">{c.value}</p>
              </Link>
            ))}
          </div>

          <section className="rounded-3xl border border-forest/10 bg-white p-6 shadow-soft md:p-8">
            <h2 className="font-display text-xl font-bold">سجل الموقع</h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted-foreground">اسم المنصة</dt>
                <dd className="mt-1 font-semibold">{store.settings.siteName}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">الهاتف</dt>
                <dd className="mt-1 font-semibold" dir="ltr">
                  {store.settings.phone}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted-foreground">الشعار</dt>
                <dd className="mt-1 leading-7 text-muted-foreground">{store.settings.tagline}</dd>
              </div>
            </dl>
            <button type="button" className="btn-primary mt-6" onClick={() => exportCmsJson(store)}>
              <Download className="h-4 w-4" /> تصدير JSON
            </button>
          </section>

          <section className="rounded-3xl border border-dashed border-forest/20 bg-sand/40 p-6 text-sm leading-7 text-muted-foreground">
            على استضافة Hostinger الثابتة يُحفظ المحتوى في المتصفح محلياً ويمكن تصديره. على بيئة Node يُحفظ أيضاً في{" "}
            <code className="rounded bg-white px-1">.data/cms-store.json</code>.
          </section>
        </div>
      )}
    </AdminShell>
  );
}
