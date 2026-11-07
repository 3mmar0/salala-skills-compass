import { useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Copy,
  ImageUp,
  Link2,
  Loader2,
  Plus,
  RotateCcw,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CMS_ICONS, cmsIcon } from "@/lib/cms/icons";
import { uploadMedia } from "@/lib/cms/client-store";
import { blankItem, newItemId, type FieldDef, type ListField, type ListItem, type ScalarField, type SectionContent } from "@/lib/cms/schema";

export const fieldInput =
  "w-full rounded-xl border border-forest/15 bg-white px-3.5 py-2.5 text-sm text-forest outline-none transition placeholder:text-forest/35 focus:border-primary focus:ring-2 focus:ring-primary/15";

function FieldLabel({ label, hint, onReset }: { label: string; hint?: string | undefined; onReset?: (() => void) | undefined }) {
  return (
    <div className="mb-1.5 flex items-center justify-between gap-2">
      <span className="text-[13px] font-semibold text-forest">{label}</span>
      <span className="flex items-center gap-2">
        {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            title="استرجاع النص الأصلي"
            className="rounded-md p-1 text-forest/40 transition hover:bg-muted hover:text-primary"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        )}
      </span>
    </div>
  );
}

/** Edits all fields of one section. */
export function SectionFieldsEditor({
  fields,
  value,
  defaults,
  onChange,
}: {
  fields: FieldDef[];
  value: SectionContent;
  defaults: SectionContent;
  onChange: (next: SectionContent) => void;
}) {
  return (
    <div className="space-y-5">
      {fields.map((field) => {
        const current = value[field.name];
        const def = defaults[field.name];
        if (field.type === "list") {
          return (
            <ListInput
              key={field.name}
              field={field}
              items={Array.isArray(current) ? current : []}
              onChange={(items) => onChange({ ...value, [field.name]: items })}
              onReset={def !== undefined && JSON.stringify(def) !== JSON.stringify(current) ? () => onChange({ ...value, [field.name]: def }) : undefined}
            />
          );
        }
        const str = typeof current === "string" ? current : "";
        const defStr = typeof def === "string" ? def : "";
        return (
          <div key={field.name}>
            <FieldLabel
              label={field.label}
              hint={field.hint}
              onReset={str !== defStr ? () => onChange({ ...value, [field.name]: defStr }) : undefined}
            />
            <ScalarInput field={field} value={str} onChange={(v) => onChange({ ...value, [field.name]: v })} />
          </div>
        );
      })}
    </div>
  );
}

export function ScalarInput({ field, value, onChange }: { field: ScalarField; value: string; onChange: (v: string) => void }) {
  switch (field.type) {
    case "textarea":
      return (
        <textarea
          dir={field.dir}
          rows={Math.min(8, Math.max(3, Math.ceil(value.length / 60)))}
          className={`${fieldInput} resize-y leading-7`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "image":
      return <ImageInput value={value} onChange={onChange} />;
    case "icon":
      return <IconInput value={value} onChange={onChange} />;
    case "url":
      return (
        <div className="relative">
          <Link2 className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-forest/30" />
          <input dir="ltr" className={`${fieldInput} pe-9 text-left`} value={value} placeholder="/contact" onChange={(e) => onChange(e.target.value)} />
        </div>
      );
    default:
      return <input dir={field.dir} className={fieldInput} value={value} onChange={(e) => onChange(e.target.value)} />;
  }
}

export function ImageInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showUrl, setShowUrl] = useState(false);

  const upload = async (file?: File) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الصورة أكبر من 5 ميجابايت.");
      return;
    }
    setUploading(true);
    try {
      onChange(await uploadMedia(file));
      toast.success("تم رفع الصورة");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "تعذر رفع الصورة");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="rounded-xl border border-forest/15 bg-white p-2.5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="group relative grid h-20 w-28 shrink-0 place-items-center overflow-hidden rounded-lg bg-muted"
          aria-label="تغيير الصورة"
        >
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageUp className="h-6 w-6 text-forest/30" />
          )}
          <span className="absolute inset-0 grid place-items-center bg-forest/60 text-xs font-semibold text-forest-foreground opacity-0 transition group-hover:opacity-100">
            {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : "تغيير"}
          </span>
        </button>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-forest disabled:opacity-60"
          >
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImageUp className="h-3.5 w-3.5" />}
            {uploading ? "جاري الرفع…" : "رفع صورة"}
          </button>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setShowUrl((v) => !v)}
              className="flex-1 rounded-lg border border-forest/15 px-2 py-1.5 text-[11px] font-medium text-forest/70 hover:bg-muted"
            >
              رابط صورة
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="rounded-lg border border-forest/15 px-2 py-1.5 text-forest/50 hover:bg-destructive/10 hover:text-destructive"
                aria-label="إزالة الصورة"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
      {showUrl && (
        <input dir="ltr" className={`${fieldInput} mt-2 text-left text-xs`} placeholder="https://…" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => void upload(e.target.files?.[0])} />
    </div>
  );
}

export function IconInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const Icon = cmsIcon(value);
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className={`${fieldInput} flex items-center gap-3 text-right`}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-secondary text-primary">
            <Icon className="h-4 w-4" />
          </span>
          <span className="flex-1 text-forest/70">اختر أيقونة</span>
          <ChevronDown className="h-4 w-4 text-forest/40" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-2" align="start">
        <div className="grid grid-cols-6 gap-1">
          {Object.entries(CMS_ICONS).map(([name, I]) => (
            <button
              key={name}
              type="button"
              title={name}
              onClick={() => {
                onChange(name);
                setOpen(false);
              }}
              className={`grid h-10 place-items-center rounded-lg transition ${name === value ? "bg-primary text-primary-foreground" : "text-forest hover:bg-secondary"}`}
            >
              <I className="h-4 w-4" />
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function ListInput({
  field,
  items,
  onChange,
  onReset,
}: {
  field: ListField;
  items: ListItem[];
  onChange: (items: ListItem[]) => void;
  onReset?: (() => void) | undefined;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const keyOf = (item: ListItem, i: number) => item["_id"] || `i${i}`;

  const update = (index: number, patch: Partial<ListItem>) =>
    onChange(items.map((item, i) => (i === index ? ({ ...item, ...patch } as ListItem) : item)));
  const move = (index: number, dir: -1 | 1) => {
    const j = index + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[index], next[j]] = [next[j] as ListItem, next[index] as ListItem];
    onChange(next);
  };
  const add = () => {
    const item = { ...blankItem(field), _id: newItemId() };
    onChange([...items, item]);
    setOpen(item._id);
  };
  const duplicate = (index: number) => {
    const copy = { ...(items[index] as ListItem), _id: newItemId() };
    const next = [...items];
    next.splice(index + 1, 0, copy);
    onChange(next);
    setOpen(copy._id);
  };

  return (
    <div>
      <FieldLabel label={`${field.label} (${items.length})`} hint={field.hint} onReset={onReset} />
      <div className="space-y-2">
        {items.map((item, index) => {
          const k = keyOf(item, index);
          const isOpen = open === k;
          const title = (field.titleField && item[field.titleField]) || `${field.itemLabel} ${index + 1}`;
          const iconField = field.fields.find((x) => x.type === "icon");
          const imageField = field.fields.find((x) => x.type === "image");
          const ItemIcon = iconField ? cmsIcon(item[iconField.name]) : null;
          const thumb = imageField ? item[imageField.name] : "";
          return (
            <div key={k} className={`overflow-hidden rounded-xl border bg-white transition ${isOpen ? "border-primary/40 shadow-soft" : "border-forest/10"}`}>
              <div className="flex items-center gap-2 px-2.5 py-2">
                <button type="button" onClick={() => setOpen(isOpen ? null : k)} className="flex min-w-0 flex-1 items-center gap-2.5 text-right">
                  <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-lg bg-secondary text-xs font-bold text-primary">
                    {thumb ? <img src={thumb} alt="" className="h-full w-full object-cover" /> : ItemIcon ? <ItemIcon className="h-4 w-4" /> : index + 1}
                  </span>
                  <span className="truncate text-sm font-medium text-forest">{title}</span>
                  <ChevronDown className={`ms-auto h-4 w-4 shrink-0 text-forest/40 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className="flex shrink-0 items-center">
                  <IconBtn label="لأعلى" disabled={index === 0} onClick={() => move(index, -1)}><ArrowUp className="h-3.5 w-3.5" /></IconBtn>
                  <IconBtn label="لأسفل" disabled={index === items.length - 1} onClick={() => move(index, 1)}><ArrowDown className="h-3.5 w-3.5" /></IconBtn>
                  <IconBtn label="تكرار" onClick={() => duplicate(index)}><Copy className="h-3.5 w-3.5" /></IconBtn>
                  <IconBtn label="حذف" danger onClick={() => onChange(items.filter((_, i) => i !== index))}><Trash2 className="h-3.5 w-3.5" /></IconBtn>
                </div>
              </div>
              {isOpen && (
                <div className="space-y-4 border-t border-forest/10 bg-muted/30 p-3.5">
                  {field.fields.map((sub) => (
                    <div key={sub.name}>
                      <FieldLabel label={sub.label} hint={sub.hint} />
                      <ScalarInput field={sub} value={item[sub.name] ?? ""} onChange={(v) => update(index, { [sub.name]: v })} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-forest/25 py-2.5 text-sm font-semibold text-primary transition hover:border-primary hover:bg-secondary/50"
      >
        <Plus className="h-4 w-4" /> إضافة {field.itemLabel}
      </button>
    </div>
  );
}

function IconBtn({ label, onClick, disabled, danger, children }: { label: string; onClick: () => void; disabled?: boolean; danger?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-md p-1.5 transition disabled:opacity-25 ${danger ? "text-forest/40 hover:bg-destructive/10 hover:text-destructive" : "text-forest/40 hover:bg-muted hover:text-forest"}`}
    >
      {children}
    </button>
  );
}
