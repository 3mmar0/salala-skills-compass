import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowLeft, FileText } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAdminAuthed } from "@/lib/cms/client-store";
import { useCms } from "@/lib/cms/CmsProvider";

export const Route = createFileRoute("/admin/pages")({
  beforeLoad: () => { if (typeof window !== "undefined" && !isAdminAuthed()) throw redirect({ to: "/admin/login" }); },
  component: AdminPages,
});

function AdminPages() {
  const { store, loading } = useCms();
  return <AdminShell title="صفحات الموقع" desc="اختر صفحة لتحرير SEO، واجهة البداية، والأقسام المرتبطة بها فقط.">
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {loading ? <p className="text-muted-foreground">جاري تحميل خريطة الموقع…</p> : store.pages.map((page) => (
        <Link key={page.slug} to="/admin/pages/$pageSlug" params={{ pageSlug: String(page.id) }} className="group relative overflow-hidden rounded-2xl border border-forest/10 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-gold/60">
          <FileText className="h-5 w-5 text-gold-dark" />
          <div className="mt-6 flex items-start justify-between gap-3"><div><h2 className="font-display text-xl font-bold text-forest">{page.title}</h2><p className="mt-2 text-sm text-muted-foreground">{page.description || "صفحة منشورة في خريطة الموقع"}</p></div><ArrowLeft className="mt-1 h-5 w-5 text-forest/40 transition group-hover:-translate-x-1 group-hover:text-primary" /></div>
          <div className="mt-5 flex items-center justify-between border-t border-forest/10 pt-3 text-xs"><span dir="ltr" className="text-muted-foreground">{page.slug}</span><span className={page.published ? "text-primary" : "text-gold-dark"}>{page.published ? "منشورة" : "مسودة"}</span></div>
        </Link>
      ))}
    </div>
  </AdminShell>;
}
