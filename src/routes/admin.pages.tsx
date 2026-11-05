import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { AdminField, AdminShell, adminInput } from "@/components/admin/AdminShell";
import { isAdminAuthed } from "@/lib/cms/client-store";
import { useCms } from "@/lib/cms/CmsProvider";
import type { CmsPage } from "@/lib/cms/types";

export const Route = createFileRoute("/admin/pages")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !isAdminAuthed()) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminPages,
});

function emptyPage(): CmsPage {
  const slug = `/page-${Date.now()}`;
  return {
    slug,
    title: "صفحة جديدة",
    description: "",
    heroTitle: "",
    heroSubtitle: "",
    published: false,
    updatedAt: new Date().toISOString(),
  };
}

function AdminPages() {
  const { store, updatePage, addPage, removePage, saving } = useCms();
  const [selectedSlug, setSelectedSlug] = useState(store.pages[0]?.slug ?? "");
  const selected = useMemo(
    () => store.pages.find((p) => p.slug === selectedSlug) ?? store.pages[0] ?? null,
    [store.pages, selectedSlug],
  );
  const [draft, setDraft] = useState<CmsPage | null>(selected);
  const [originalSlug, setOriginalSlug] = useState(selected?.slug ?? "");

  useEffect(() => {
    setDraft(selected);
    setOriginalSlug(selected?.slug ?? "");
  }, [selected?.slug, selected?.updatedAt]);

  if (!draft) {
    return (
      <AdminShell title="الصفحات">
        <button
          type="button"
          className="btn-primary"
          onClick={async () => {
            const p = emptyPage();
            await addPage(p);
            setSelectedSlug(p.slug);
          }}
        >
          <Plus className="h-4 w-4" /> إضافة صفحة
        </button>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="الصفحات" desc="إدارة عناوين الصفحات، وصف SEO، ونصوص الـ Hero.">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="rounded-3xl border border-forest/10 bg-white p-4 shadow-soft">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold">الصفحات</p>
            <button
              type="button"
              className="rounded-lg bg-secondary px-2 py-1 text-xs font-semibold text-primary"
              onClick={async () => {
                const p = emptyPage();
                await addPage(p);
                setSelectedSlug(p.slug);
              }}
            >
              <Plus className="inline h-3 w-3" /> جديدة
            </button>
          </div>
          <ul className="space-y-1">
            {store.pages.map((p) => (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => setSelectedSlug(p.slug)}
                  className={`w-full rounded-xl px-3 py-2 text-start text-sm transition ${
                    draft.slug === p.slug ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <span className="block font-medium">{p.title}</span>
                  <span className="block text-xs opacity-70" dir="ltr">
                    {p.slug}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <form
          className="space-y-4 rounded-3xl border border-forest/10 bg-white p-6 shadow-soft md:p-8"
          onSubmit={async (e) => {
            e.preventDefault();
            const next = { ...draft, updatedAt: new Date().toISOString() };
            await updatePage(next, originalSlug);
            setSelectedSlug(next.slug);
            setOriginalSlug(next.slug);
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="المسار (slug)" hint="مثال: /courses أو /landscape">
              <input
                className={adminInput}
                dir="ltr"
                value={draft.slug}
                onChange={(e) => setDraft({ ...draft, slug: e.target.value.startsWith("/") ? e.target.value : `/${e.target.value}` })}
              />
            </AdminField>
            <AdminField label="منشورة">
              <select
                className={adminInput}
                value={draft.published ? "1" : "0"}
                onChange={(e) => setDraft({ ...draft, published: e.target.value === "1" })}
              >
                <option value="1">نعم</option>
                <option value="0">مسودة</option>
              </select>
            </AdminField>
            <AdminField label="عنوان الصفحة">
              <input className={adminInput} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
            </AdminField>
            <AdminField label="وصف SEO">
              <input
                className={adminInput}
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              />
            </AdminField>
            <AdminField label="عنوان الـ Hero">
              <input
                className={adminInput}
                value={draft.heroTitle}
                onChange={(e) => setDraft({ ...draft, heroTitle: e.target.value })}
              />
            </AdminField>
            <AdminField label="نص الـ Hero">
              <input
                className={adminInput}
                value={draft.heroSubtitle}
                onChange={(e) => setDraft({ ...draft, heroSubtitle: e.target.value })}
              />
            </AdminField>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "جاري الحفظ..." : "حفظ الصفحة"}
            </button>
            <button
              type="button"
              className="rounded-full border border-destructive/30 px-4 py-2 text-sm text-destructive"
              onClick={async () => {
                if (!confirm("حذف هذه الصفحة من سجل الإدارة؟")) return;
                await removePage(draft.slug);
                setSelectedSlug(store.pages.find((p) => p.slug !== draft.slug)?.slug ?? "");
              }}
            >
              حذف
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
