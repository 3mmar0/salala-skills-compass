/**
 * Page/section content schema.
 *
 * Every editable section on the public site is described by a SectionDef:
 * the fields the admin can edit and the default content shown when nothing
 * has been saved yet. Page components read the resolved content through
 * `useSectionContent(def)`, so whatever the admin saves (or is previewing)
 * replaces the defaults.
 */

export type ScalarFieldType = "text" | "textarea" | "image" | "url" | "icon";

export type ScalarField = {
  name: string;
  label: string;
  type: ScalarFieldType;
  hint?: string;
  dir?: "ltr" | "rtl";
};

export type ListField = {
  name: string;
  label: string;
  type: "list";
  /** Singular label for one item, e.g. "خبير". */
  itemLabel: string;
  /** Field shown as the item title in the collapsed list. */
  titleField?: string | undefined;
  fields: ScalarField[];
  hint?: string | undefined;
};

export type FieldDef = ScalarField | ListField;

export type ListItem = Record<string, string>;
export type SectionValue = string | ListItem[];
export type SectionContent = Record<string, SectionValue>;

/** Content as read by page components: list items carry a stable `_id`. */
export type Resolved<T> = { [K in keyof T]: T[K] extends (infer I)[] ? (I & { _id?: string })[] : T[K] };

export type LegacyPageField = "heroTitle" | "heroSubtitle";

export type SectionDef<T extends SectionContent = SectionContent> = {
  /** Short key inside the page, e.g. "hero". */
  key: string;
  /** Global key stored on the server, e.g. "home.hero". Assigned by definePage. */
  id: string;
  label: string;
  description?: string;
  fields: FieldDef[];
  defaults: T;
  /** Older admin versions stored hero text on the page row; read it as a fallback. */
  legacyPageFields?: Partial<Record<keyof T & string, LegacyPageField>>;
  page: PageDef;
};

export type PageDef = {
  key: string;
  slug: string;
  title: string;
  description?: string;
  sections: SectionDef[];
};

type SectionInput<T extends SectionContent> = Omit<SectionDef<T>, "id" | "page" | "key">;

export function section<T extends SectionContent>(key: string, input: SectionInput<T>): SectionDef<T> {
  return { ...input, key, id: key, page: undefined as unknown as PageDef };
}

export function definePage(input: {
  key: string;
  slug: string;
  title: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sections: SectionDef<any>[];
}): PageDef {
  const page: PageDef = { ...input, sections: input.sections };
  for (const def of input.sections) {
    def.id = `${input.key}.${def.key}`;
    def.page = page;
  }
  return page;
}

type FieldExtra = Partial<Pick<ScalarField, "hint" | "dir">>;

/** Field shorthands for section definitions. */
export const f = {
  text: (name: string, label: string, extra: FieldExtra = {}): ScalarField => ({ name, label, type: "text", ...extra }),
  textarea: (name: string, label: string, extra: FieldExtra = {}): ScalarField => ({ name, label, type: "textarea", ...extra }),
  image: (name: string, label: string, extra: FieldExtra = {}): ScalarField => ({ name, label, type: "image", ...extra }),
  url: (name: string, label: string, extra: FieldExtra = {}): ScalarField => ({ name, label, type: "url", dir: "ltr", ...extra }),
  icon: (name = "icon", label = "الأيقونة"): ScalarField => ({ name, label, type: "icon" }),
  list: (
    name: string,
    label: string,
    itemLabel: string,
    fields: ScalarField[],
    extra: { titleField?: string; hint?: string } = {},
  ): ListField => ({ name, label, type: "list", itemLabel, fields, titleField: extra.titleField ?? fields.find((x) => x.type === "text")?.name, hint: extra.hint }),
};

export function blankItem(field: ListField): ListItem {
  return Object.fromEntries(field.fields.map((f) => [f.name, ""]));
}

/* ---------------- Asset references ----------------
 * Built-in images are bundled with hashed file names that change on every
 * build, so we never store those URLs. They are saved as "asset:<path>" and
 * turned back into the current URL when content is read.
 */
const assetModules = import.meta.glob("/src/assets/**/*.{jpg,jpeg,png,webp,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const assetUrlByRef = new Map<string, string>();
const assetRefByUrl = new Map<string, string>();
for (const [path, url] of Object.entries(assetModules)) {
  const ref = `asset:${path.replace(/^\/src\/assets\//, "")}`;
  assetUrlByRef.set(ref, url);
  assetRefByUrl.set(url, ref);
}

export function decodeAsset(value: string): string {
  return value.startsWith("asset:") ? (assetUrlByRef.get(value) ?? "") : value;
}

export function encodeAsset(value: string): string {
  return assetRefByUrl.get(value) ?? value;
}

function mapStrings(content: SectionContent, fn: (v: string) => string): SectionContent {
  const out: SectionContent = {};
  for (const [k, v] of Object.entries(content)) {
    out[k] = Array.isArray(v)
      ? v.map((item) => Object.fromEntries(Object.entries(item).map(([ik, iv]) => [ik, fn(String(iv ?? ""))])))
      : fn(String(v ?? ""));
  }
  return out;
}

/** Marker saved with content written by this admin version. */
export const CONTENT_VERSION = 2;

/**
 * Merge stored content over the section defaults.
 * Content written by older admin versions (no `_v`) ignores empty strings,
 * because those versions saved blank placeholders for every field.
 */
export function resolveContent<T extends SectionContent>(
  def: SectionDef<T>,
  stored?: Record<string, unknown> | null,
  pageRow?: Partial<Record<LegacyPageField, string>> | null,
): Resolved<T> {
  const out: SectionContent = { ...def.defaults };

  if (pageRow && def.legacyPageFields) {
    for (const [name, pageField] of Object.entries(def.legacyPageFields)) {
      const v = pageRow[pageField as LegacyPageField];
      if (typeof v === "string" && v.trim()) out[name] = v;
    }
  }

  if (stored && typeof stored === "object") {
    const strict = stored["_v"] === CONTENT_VERSION;
    for (const field of def.fields) {
      const v = stored[field.name];
      if (field.type === "list") {
        if (Array.isArray(v) && (strict || v.length > 0)) {
          const blank = blankItem(field);
          out[field.name] = v.map((item, i) => {
            const src = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
            const merged: ListItem = { ...blank, _id: String(src["_id"] ?? src["id"] ?? `i${i}`) };
            for (const f of field.fields) {
              const iv = src[f.name];
              if (typeof iv === "string" || typeof iv === "number") merged[f.name] = String(iv);
            }
            return merged;
          });
        }
      } else if (typeof v === "string" || typeof v === "number") {
        const s = String(v);
        if (strict || s.trim() !== "") out[field.name] = s;
      }
    }
  }

  for (const field of def.fields) {
    const list = out[field.name];
    if (field.type === "list" && Array.isArray(list)) {
      out[field.name] = list.map((item, i) => (item["_id"] ? item : { ...item, _id: `d${i}` }));
    }
  }

  return mapStrings(out, decodeAsset) as Resolved<T>;
}

/** Prepare editor content for saving: encode bundled asset URLs and tag the version. */
export function serializeContent(content: SectionContent): Record<string, unknown> {
  return { ...mapStrings(content, encodeAsset), _v: CONTENT_VERSION };
}

let idCounter = 0;
export function newItemId() {
  idCounter += 1;
  return `n${Date.now().toString(36)}${idCounter}`;
}
