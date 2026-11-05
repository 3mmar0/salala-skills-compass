import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AdminField, AdminShell, adminInput } from "@/components/admin/AdminShell";
import { isAdminAuthed } from "@/lib/cms/client-store";
import { useCms } from "@/lib/cms/CmsProvider";
import type { CmsSection, CmsSectionItem } from "@/lib/cms/types";

export const Route = createFileRoute("/admin/sections")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !isAdminAuthed()) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminSections,
});

function emptySection(): CmsSection {
  return {
    id: `section-${Date.now()}`,
    key: "custom.section",
    title: "قسم جديد",
    subtitle: "",
    body: "",
    items: [],
    visible: true,
    updatedAt: new Date().toISOString(),
  };
}

function AdminSections() {
  const { store, updateSection, addSection, removeSection, saving } = useCms();
  const [selectedId, setSelectedId] = useState<string | null>(store.sections[0]?.id ?? null);
  const selected = useMemo(
    () => store.sections.find((s) => s.id === selectedId) ?? store.sections[0] ?? null,
    [store.sections, selectedId],
  );
  const [draft, setDraft] = useState<CmsSection | null>(selected);

  useEffect(() => {
    setDraft(selected);
  }, [selected?.id, selected?.updatedAt]);

  if (!draft) {
    return (
      <AdminShell title="الأقسام">
        <button
          type="button"
          className="btn-primary"
          onClick={async () => {
            const s = emptySection();
            await addSection(s);
            setSelectedId(s.id);
            setDraft(s);
          }}
        >
          <Plus className="h-4 w-4" /> إضافة قسم
        </button>
      </AdminShell>
    );
  }

  const setItem = (id: string, patch: Partial<CmsSectionItem>) => {
    setDraft({
      ...draft,
      items: draft.items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    });
  };

  return (
    <AdminShell title="الأقسام" desc="إدارة نصوص الأقسام المشتركة (الرئيسية، الدورات، اللاندسكيب...).">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="rounded-3xl border border-forest/10 bg-white p-4 shadow-soft">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold">قائمة الأقسام</p>
            <button
              type="button"
              className="rounded-lg bg-secondary px-2 py-1 text-xs font-semibold text-primary"
              onClick={async () => {
                const s = emptySection();
                await addSection(s);
                setSelectedId(s.id);
                setDraft(s);
              }}
            >
              <Plus className="inline h-3 w-3" /> جديد
            </button>
          </div>
          <ul className="space-y-1">
            {store.sections.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(s.id);
                    setDraft(s);
                  }}
                  className={`w-full rounded-xl px-3 py-2 text-start text-sm transition ${
                    draft.id === s.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <span className="block font-medium">{s.title}</span>
                  <span className="block text-xs opacity-70" dir="ltr">
                    {s.key}
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
            await updateSection({ ...draft, updatedAt: new Date().toISOString() });
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="المفتاح (key)" hint="معرّف تقني للربط في الكود">
              <input className={adminInput} dir="ltr" value={draft.key} onChange={(e) => setDraft({ ...draft, key: e.target.value })} />
            </AdminField>
            <AdminField label="ظاهر في الموقع">
              <select
                className={adminInput}
                value={draft.visible ? "1" : "0"}
                onChange={(e) => setDraft({ ...draft, visible: e.target.value === "1" })}
              >
                <option value="1">نعم</option>
                <option value="0">لا</option>
              </select>
            </AdminField>
            <AdminField label="العنوان">
              <input className={adminInput} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
            </AdminField>
            <AdminField label="العنوان الفرعي">
              <input className={adminInput} value={draft.subtitle} onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })} />
            </AdminField>
          </div>
          <AdminField label="النص">
            <textarea
              className={adminInput}
              rows={4}
              value={draft.body}
              onChange={(e) => setDraft({ ...draft, body: e.target.value })}
            />
          </AdminField>

          <div className="border-t border-forest/10 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">عناصر القسم</h3>
              <button
                type="button"
                className="text-xs font-semibold text-primary"
                onClick={() =>
                  setDraft({
                    ...draft,
                    items: [
                      ...draft.items,
                      { id: `item-${Date.now()}`, title: "عنصر جديد", description: "" },
                    ],
                  })
                }
              >
                + إضافة عنصر
              </button>
            </div>
            <div className="space-y-3">
              {draft.items.map((it) => (
                <div key={it.id} className="grid gap-2 rounded-2xl border border-forest/10 p-3 md:grid-cols-[1fr_1fr_auto]">
                  <input
                    className={adminInput}
                    value={it.title}
                    onChange={(e) => setItem(it.id, { title: e.target.value })}
                    placeholder="العنوان"
                  />
                  <input
                    className={adminInput}
                    value={it.description}
                    onChange={(e) => setItem(it.id, { description: e.target.value })}
                    placeholder="الوصف"
                  />
                  <button
                    type="button"
                    className="rounded-xl border px-3 text-destructive"
                    onClick={() => setDraft({ ...draft, items: draft.items.filter((x) => x.id !== it.id) })}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "جاري الحفظ..." : "حفظ القسم"}
            </button>
            <button
              type="button"
              className="rounded-full border border-destructive/30 px-4 py-2 text-sm text-destructive"
              onClick={async () => {
                if (!confirm("حذف هذا القسم؟")) return;
                await removeSection(draft.id);
                setSelectedId(store.sections.find((s) => s.id !== draft.id)?.id ?? null);
              }}
            >
              حذف القسم
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
