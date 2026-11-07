import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowUp, ArrowDown, ChevronRight, Eye, EyeOff, ImageUp, Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdminField, AdminShell, adminInput } from "@/components/admin/AdminShell";
import { adminApi, isAdminAuthed } from "@/lib/cms/client-store";
import { useCms } from "@/lib/cms/CmsProvider";
import type { CmsPage, CmsSection } from "@/lib/cms/types";

export const Route = createFileRoute("/admin/pages/$pageSlug")({
  beforeLoad: () => { if (typeof window !== "undefined" && !isAdminAuthed()) throw redirect({ to: "/admin/login" }); },
  component: PageEditor,
});

function PageEditor() {
  const { pageSlug } = Route.useParams();
  const { store, refresh } = useCms();
  const page = useMemo(() => store.pages.find((item) => item.id === Number(pageSlug)), [store.pages, pageSlug]);
  const [draft, setDraft] = useState<CmsPage | null>(page ?? null);
  const [sections, setSections] = useState<CmsSection[]>([]);
  const [saving, setSaving] = useState(false);
  useEffect(() => { setDraft(page ?? null); setSections(store.sections.filter((section) => section.pageSlug === page?.slug).sort((a,b)=>(a.position ?? 0)-(b.position ?? 0))); }, [page, store.sections]);
  if (!page || !draft) return <AdminShell title="تحرير الصفحة"><p className="text-muted-foreground">جاري تحميل الصفحة…</p></AdminShell>;
  const savePage = async () => { setSaving(true); try { await adminApi(`/admin/pages/${page.id}`, { method: "PUT", body: JSON.stringify(draft) }); await refresh(); } finally { setSaving(false); } };
  const saveSection = async (section: CmsSection) => { setSaving(true); try { await adminApi(`/admin/sections/${section.id}`, { method: "PUT", body: JSON.stringify({ visible: section.visible, content: section.content ?? { title: section.title, subtitle: section.subtitle, body: section.body, items: section.items } }) }); await refresh(); } finally { setSaving(false); } };
  const move = async (index: number, direction: -1 | 1) => { const next = [...sections]; const swap = index + direction; if (swap < 0 || swap >= next.length) return; [next[index], next[swap]] = [next[swap], next[index]]; setSections(next); await adminApi(`/admin/pages/${page.id}/sections/order`, { method: "PUT", body: JSON.stringify({ sectionIds: next.map((item) => item.id) }) }); await refresh(); };
  return <AdminShell title={page.title} desc="هذه الصفحة ومقاطعها المحددة مسبقًا. يمكنك التحرير أو الإخفاء أو تغيير الترتيب فقط.">
    <Link to="/admin/pages" className="mb-6 inline-flex items-center gap-2 text-sm text-primary"><ChevronRight className="h-4 w-4" /> كل صفحات الموقع</Link>
    <section className="rounded-3xl border border-forest/10 bg-white p-6 shadow-soft"><div className="mb-5 flex items-center justify-between"><h2 className="font-display text-xl font-bold">SEO وواجهة البداية</h2><button type="button" className="btn-primary" disabled={saving} onClick={savePage}><Save className="h-4 w-4" /> حفظ الصفحة</button></div><div className="grid gap-4 md:grid-cols-2"><AdminField label="عنوان الصفحة"><input className={adminInput} value={draft.title} onChange={(e)=>setDraft({...draft,title:e.target.value})}/></AdminField><AdminField label="حالة النشر"><select className={adminInput} value={draft.published?"1":"0"} onChange={(e)=>setDraft({...draft,published:e.target.value==="1"})}><option value="1">منشورة</option><option value="0">مسودة</option></select></AdminField><AdminField label="عنوان Hero"><input className={adminInput} value={draft.heroTitle} onChange={(e)=>setDraft({...draft,heroTitle:e.target.value})}/></AdminField><AdminField label="نص Hero"><input className={adminInput} value={draft.heroSubtitle} onChange={(e)=>setDraft({...draft,heroSubtitle:e.target.value})}/></AdminField><div className="md:col-span-2"><AdminField label="وصف SEO"><textarea className={adminInput} rows={3} value={draft.description} onChange={(e)=>setDraft({...draft,description:e.target.value})}/></AdminField></div></div></section>
    <section className="mt-8 space-y-4"><div><p className="text-xs font-semibold text-gold-dark">مقاطع الصفحة</p><h2 className="mt-1 font-display text-2xl font-bold">{sections.length} مقاطع قابلة للإدارة</h2></div>{sections.map((section,index)=><SectionCard key={String(section.id)} section={section} index={index} count={sections.length} disabled={saving} onMove={move} onSave={saveSection}/>)}</section>
  </AdminShell>;
}

function SectionCard({ section, index, count, disabled, onMove, onSave }: { section: CmsSection; index:number; count:number; disabled:boolean; onMove:(index:number,direction:-1|1)=>Promise<void>; onSave:(section:CmsSection)=>Promise<void> }) {
  const [draft,setDraft] = useState(section);
  useEffect(()=>setDraft(section),[section]);
  const content = draft.content ?? { title:draft.title, subtitle:draft.subtitle, body:draft.body, items:draft.items, ctaLabel:"", ctaHref:"", image:"" };
  const update = (patch: Partial<typeof content>) => setDraft({...draft, content:{...content,...patch}});
  const upload = async (file?: File) => { if(!file) return; const form = new FormData(); form.append("file",file); const media = await adminApi<{url:string}>("/admin/media",{method:"POST",body:form}); update({image:media.url}); };
  return <article className="rounded-3xl border border-forest/10 bg-white p-5 shadow-soft"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-forest/10 pb-4"><div><p className="font-display text-lg font-bold">{content.title || draft.title}</p><p className="mt-1 text-xs text-muted-foreground" dir="ltr">{draft.key}</p></div><div className="flex items-center gap-2"><button type="button" aria-label="نقل للأعلى" className="rounded-lg border p-2 disabled:opacity-30" disabled={disabled||index===0} onClick={()=>void onMove(index,-1)}><ArrowUp className="h-4 w-4"/></button><button type="button" aria-label="نقل للأسفل" className="rounded-lg border p-2 disabled:opacity-30" disabled={disabled||index===count-1} onClick={()=>void onMove(index,1)}><ArrowDown className="h-4 w-4"/></button><button type="button" className="rounded-lg border px-3 py-2 text-xs" onClick={()=>setDraft({...draft,visible:!draft.visible})}>{draft.visible?<><Eye className="ml-1 inline h-3.5 w-3.5"/> ظاهر</>:<><EyeOff className="ml-1 inline h-3.5 w-3.5"/> مخفي</>}</button></div></div><div className="mt-4 grid gap-4 md:grid-cols-2"><AdminField label="العنوان"><input className={adminInput} value={content.title ?? ""} onChange={(e)=>update({title:e.target.value})}/></AdminField><AdminField label="العنوان الفرعي"><input className={adminInput} value={content.subtitle ?? ""} onChange={(e)=>update({subtitle:e.target.value})}/></AdminField><div className="md:col-span-2"><AdminField label="النص"><textarea rows={4} className={adminInput} value={content.body ?? ""} onChange={(e)=>update({body:e.target.value})}/></AdminField></div><AdminField label="نص زر الدعوة"><input className={adminInput} value={content.ctaLabel ?? ""} onChange={(e)=>update({ctaLabel:e.target.value})}/></AdminField><AdminField label="رابط زر الدعوة"><input dir="ltr" className={adminInput} value={content.ctaHref ?? ""} onChange={(e)=>update({ctaHref:e.target.value})}/></AdminField><AdminField label="صورة القسم"><div className="flex gap-2"><input dir="ltr" className={adminInput} value={content.image ?? ""} onChange={(e)=>update({image:e.target.value})}/><label className="grid shrink-0 cursor-pointer place-items-center rounded-xl border border-forest/20 px-3"><ImageUp className="h-5 w-5"/><input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e)=>void upload(e.target.files?.[0])}/></label></div></AdminField></div><div className="mt-5 flex justify-end"><button type="button" className="btn-primary" disabled={disabled} onClick={()=>void onSave(draft)}><Save className="h-4 w-4"/> حفظ المقطع</button></div></article>;
}
