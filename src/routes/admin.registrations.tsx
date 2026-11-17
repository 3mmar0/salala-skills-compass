import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { BriefcaseBusiness, ClipboardList, Lightbulb, MessageSquareText } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { adminApi, isAdminAuthed } from "@/lib/cms/client-store";
import { adminMeta } from "@/lib/meta";

type Tab = "courses" | "link" | "entrepreneurship" | "inquiries";
type Status = "new" | "contacted" | "accepted" | "closed";

type CourseRow = { id: number; course_title: string; full_name: string; email: string; phone: string; country: string; state: string; created_at: string };
type LinkRow = {
  id: number; intent: string; full_name: string; company_name?: string | null; email?: string | null; phone: string;
  opportunity?: string | null; location?: string | null; hiring_needs?: string | null; cv_path?: string | null;
  linkedin?: string | null; status: string; created_at: string;
};
type EntreRow = {
  id: number; full_name: string; phone: string; email?: string | null; project_title?: string | null;
  stage?: string | null; idea?: string | null; linkedin?: string | null; cv_path?: string | null; status: string; created_at: string;
};
type InquiryRow = {
  id: number; source: string; full_name?: string | null; phone?: string | null; email?: string | null;
  subject?: string | null; payload?: string | Record<string, unknown> | null; file_path?: string | null; status: string; created_at: string;
};

const API_BASE = (import.meta.env["VITE_CMS_API_BASE_URL"] || "https://backend.solalaa.com/api").replace(/\/$/, "");
const statuses: Status[] = ["new", "contacted", "accepted", "closed"];
const statusLabel: Record<string, string> = { new: "جديد", contacted: "تم التواصل", accepted: "مقبول", closed: "مغلق" };
const sourceLabel: Record<string, string> = { contact: "تواصل معنا", landscape: "لاندسكيب", breed: "Solalaa Genome" };
const intentLabel: Record<string, string> = { seeker: "باحث عن عمل", employer: "يبحث عن موظفين" };

export const Route = createFileRoute("/admin/registrations")({
  head: () => adminMeta("الاستبيانات والطلبات", "متابعة كل الاستبيانات والطلبات الواردة لمنصة سلالة.", "/admin/registrations"),
  beforeLoad: () => {
    if (typeof window !== "undefined" && !isAdminAuthed()) throw redirect({ to: "/admin/login" });
  },
  component: Submissions,
});

function Submissions() {
  const [tab, setTab] = useState<Tab>("courses");
  const [status, setStatus] = useState("");

  return (
    <AdminShell
      title="الاستبيانات والطلبات"
      desc="كل طلبات الدورات، SOLALAA LINK، ريادة الأعمال، ونماذج التواصل تظهر هنا للمتابعة."
      actions={
        <Link to="/admin/pages/$pageKey" params={{ pageKey: "solalaa-link" }} className="inline-flex items-center gap-2 rounded-xl border border-forest/15 bg-white px-3 py-2 text-sm font-semibold hover:border-primary/40">
          <BriefcaseBusiness className="h-4 w-4" />إدارة الوظائف
        </Link>
      }
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <TabBtn active={tab === "courses"} onClick={() => setTab("courses")} icon={ClipboardList} label="الدورات" />
          <TabBtn active={tab === "link"} onClick={() => setTab("link")} icon={BriefcaseBusiness} label="SOLALAA LINK" />
          <TabBtn active={tab === "entrepreneurship"} onClick={() => setTab("entrepreneurship")} icon={Lightbulb} label="ريادة الأعمال" />
          <TabBtn active={tab === "inquiries"} onClick={() => setTab("inquiries")} icon={MessageSquareText} label="التواصل والاستشارات" />
        </div>
        <select className="rounded-xl border border-forest/15 bg-white px-4 py-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">كل الحالات</option>
          {statuses.map((s) => <option key={s} value={s}>{statusLabel[s]}</option>)}
        </select>
      </div>

      {tab === "courses" && <CoursesTable status={status} />}
      {tab === "link" && <LinkTable status={status} />}
      {tab === "entrepreneurship" && <EntreTable status={status} />}
      {tab === "inquiries" && <InquiriesTable status={status} />}
    </AdminShell>
  );
}

function TabBtn({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof ClipboardList; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${active ? "bg-forest text-forest-foreground" : "border border-forest/15 bg-white text-forest hover:border-primary/40"}`}
    >
      <Icon className="h-4 w-4" />{label}
    </button>
  );
}

function StatusSelect({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  return (
    <select className="rounded-lg border border-forest/15 bg-white px-2 py-1" value={value} onChange={(e) => onChange(e.target.value)}>
      {statuses.map((s) => <option key={s} value={s}>{statusLabel[s]}</option>)}
    </select>
  );
}

function FileLink({ path }: { path?: string | null | undefined }) {
  if (!path) return <span className="text-muted-foreground">—</span>;
  return <a className="font-semibold text-primary underline-offset-2 hover:underline" href={`${API_BASE}/media/${path}`} target="_blank" rel="noreferrer">تحميل</a>;
}

function Shell({ headers, children, empty, count }: { headers: string[]; children: ReactNode; empty: string; count: number }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-forest/10 bg-white shadow-soft">
      <table className="w-full min-w-[860px] text-right text-sm">
        <thead className="bg-muted/70 text-muted-foreground">
          <tr>{headers.map((h) => <th key={h} className="p-4">{h}</th>)}</tr>
        </thead>
        <tbody>
          {children}
          {count === 0 && <tr><td colSpan={headers.length} className="p-10 text-center text-muted-foreground">{empty}</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function CoursesTable({ status }: { status: string }) {
  const [rows, setRows] = useState<CourseRow[]>([]);
  const load = async () => {
    const r = await adminApi<{ registrations: { data: CourseRow[] } }>(`/admin/course-registrations${status ? `?state=${status}` : ""}`);
    setRows(r.registrations.data);
  };
  useEffect(() => { void load(); }, [status]);
  const update = async (id: number, next: string) => {
    await adminApi(`/admin/course-registrations/${id}`, { method: "PUT", body: JSON.stringify({ state: next }) });
    await load();
  };

  return (
    <Shell headers={["المتقدم", "الدورة", "التواصل", "التاريخ", "الحالة"]} empty="لا توجد تسجيلات ضمن هذا الفلتر." count={rows.length}>
      {rows.map((row) => (
        <tr key={row.id} className="border-t border-forest/10">
          <td className="p-4 font-semibold">{row.full_name}<span className="mt-1 block text-xs font-normal text-muted-foreground">{row.country}</span></td>
          <td className="p-4">{row.course_title}</td>
          <td className="p-4" dir="ltr">{row.email}<br />{row.phone}</td>
          <td className="p-4 text-muted-foreground">{new Date(row.created_at).toLocaleDateString("ar-EG")}</td>
          <td className="p-4"><StatusSelect value={row.state} onChange={(next) => void update(row.id, next)} /></td>
        </tr>
      ))}
    </Shell>
  );
}

function LinkTable({ status }: { status: string }) {
  const [rows, setRows] = useState<LinkRow[]>([]);
  const load = async () => {
    const r = await adminApi<{ applications: { data: LinkRow[] } }>(`/admin/link-applications${status ? `?status=${status}` : ""}`);
    setRows(r.applications.data);
  };
  useEffect(() => { void load(); }, [status]);
  const update = async (id: number, next: string) => {
    await adminApi(`/admin/link-applications/${id}`, { method: "PUT", body: JSON.stringify({ status: next }) });
    await load();
  };

  return (
    <Shell headers={["المتقدم", "النوع", "التفاصيل", "المرفقات", "التاريخ", "الحالة"]} empty="لا توجد طلبات SOLALAA LINK ضمن هذا الفلتر." count={rows.length}>
      {rows.map((row) => (
        <tr key={row.id} className="border-t border-forest/10">
          <td className="p-4 font-semibold">
            {row.full_name}
            <span className="mt-1 block text-xs font-normal text-muted-foreground" dir="ltr">{row.phone}{row.email ? ` · ${row.email}` : ""}</span>
          </td>
          <td className="p-4">{intentLabel[row.intent] ?? row.intent}</td>
          <td className="p-4 text-sm leading-6">
            {row.intent === "employer" ? (
              <><span className="font-semibold">{row.company_name}</span><span className="mt-1 block text-muted-foreground">{row.hiring_needs}</span></>
            ) : (
              <><span className="font-semibold">{row.opportunity}</span><span className="mt-1 block text-muted-foreground">{row.location}</span></>
            )}
          </td>
          <td className="space-y-1 p-4 text-sm">
            <div><FileLink path={row.cv_path} /></div>
            {row.linkedin ? <a className="block text-primary" href={row.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> : null}
          </td>
          <td className="p-4 text-muted-foreground">{new Date(row.created_at).toLocaleDateString("ar-EG")}</td>
          <td className="p-4"><StatusSelect value={row.status} onChange={(next) => void update(row.id, next)} /></td>
        </tr>
      ))}
    </Shell>
  );
}

function EntreTable({ status }: { status: string }) {
  const [rows, setRows] = useState<EntreRow[]>([]);
  const load = async () => {
    const r = await adminApi<{ applications: { data: EntreRow[] } }>(`/admin/entrepreneurship-applications${status ? `?status=${status}` : ""}`);
    setRows(r.applications.data);
  };
  useEffect(() => { void load(); }, [status]);
  const update = async (id: number, next: string) => {
    await adminApi(`/admin/entrepreneurship-applications/${id}`, { method: "PUT", body: JSON.stringify({ status: next }) });
    await load();
  };

  return (
    <Shell headers={["المتقدم", "المشروع", "الفكرة", "المرفقات", "التاريخ", "الحالة"]} empty="لا توجد طلبات ريادة أعمال ضمن هذا الفلتر." count={rows.length}>
      {rows.map((row) => (
        <tr key={row.id} className="border-t border-forest/10">
          <td className="p-4 font-semibold">
            {row.full_name}
            <span className="mt-1 block text-xs font-normal text-muted-foreground" dir="ltr">{row.phone}{row.email ? ` · ${row.email}` : ""}</span>
          </td>
          <td className="p-4 text-sm">
            <span className="font-semibold">{row.project_title || "—"}</span>
            <span className="mt-1 block text-muted-foreground">{row.stage || ""}</span>
          </td>
          <td className="max-w-xs p-4 text-sm leading-6 text-muted-foreground">{row.idea}</td>
          <td className="space-y-1 p-4 text-sm">
            <div><FileLink path={row.cv_path} /></div>
            {row.linkedin ? <a className="block text-primary" href={row.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> : null}
          </td>
          <td className="p-4 text-muted-foreground">{new Date(row.created_at).toLocaleDateString("ar-EG")}</td>
          <td className="p-4"><StatusSelect value={row.status} onChange={(next) => void update(row.id, next)} /></td>
        </tr>
      ))}
    </Shell>
  );
}

function InquiriesTable({ status }: { status: string }) {
  const [rows, setRows] = useState<InquiryRow[]>([]);
  const load = async () => {
    const r = await adminApi<{ inquiries: { data: InquiryRow[] } }>(`/admin/inquiries${status ? `?status=${status}` : ""}`);
    setRows(r.inquiries.data);
  };
  useEffect(() => { void load(); }, [status]);
  const update = async (id: number, next: string) => {
    await adminApi(`/admin/inquiries/${id}`, { method: "PUT", body: JSON.stringify({ status: next }) });
    await load();
  };

  return (
    <Shell headers={["المرسل", "المصدر", "الموضوع / التفاصيل", "مرفق", "التاريخ", "الحالة"]} empty="لا توجد استبيانات تواصل ضمن هذا الفلتر." count={rows.length}>
      {rows.map((row) => {
        const payload = typeof row.payload === "string" ? safeJson(row.payload) : (row.payload ?? {});
        return (
          <tr key={row.id} className="border-t border-forest/10">
            <td className="p-4 font-semibold">
              {row.full_name}
              <span className="mt-1 block text-xs font-normal text-muted-foreground" dir="ltr">{row.phone}{row.email ? ` · ${row.email}` : ""}</span>
            </td>
            <td className="p-4">{sourceLabel[row.source] ?? row.source}</td>
            <td className="max-w-sm p-4 text-sm leading-6">
              <span className="font-semibold">{row.subject || "—"}</span>
              <span className="mt-1 block text-muted-foreground">{summarizePayload(payload)}</span>
            </td>
            <td className="p-4"><FileLink path={row.file_path} /></td>
            <td className="p-4 text-muted-foreground">{new Date(row.created_at).toLocaleDateString("ar-EG")}</td>
            <td className="p-4"><StatusSelect value={row.status} onChange={(next) => void update(row.id, next)} /></td>
          </tr>
        );
      })}
    </Shell>
  );
}

function safeJson(raw: string) {
  try { return JSON.parse(raw) as Record<string, unknown>; } catch { return { raw }; }
}

function summarizePayload(payload: Record<string, unknown>) {
  const message = typeof payload["message"] === "string" ? payload["message"] : "";
  const extras = Object.entries(payload)
    .filter(([key]) => key !== "message")
    .slice(0, 4)
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(" · ");
  return [message, extras].filter(Boolean).join(" — ") || "—";
}
