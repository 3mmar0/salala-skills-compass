import { useMemo } from "react";
import { useCmsOptional } from "./CmsProvider";
import { CONTENT_VERSION, resolveContent, type PageDef, type Resolved, type SectionContent, type SectionDef } from "./schema";
import type { PreviewSectionState } from "./preview";
import type { CmsPage, CmsSection, CmsStore } from "./types";

function storedSection(store: CmsStore, id: string): CmsSection | undefined {
  return store.sections.find((s) => s.key === id);
}

function pageRow(store: CmsStore, page: PageDef): CmsPage | undefined {
  return store.pages.find((p) => p.slug === page.slug);
}

/** Saved state of every section of a page, merged over defaults (no preview overrides). */
export function savedSectionStates(store: CmsStore, page: PageDef): Record<string, PreviewSectionState> {
  const row = pageRow(store, page);
  const stored = page.sections.map((def) => storedSection(store, def.id));
  // Positions are only trusted once the whole page was saved by this admin version.
  const useStoredOrder = stored.every((s) => s && (s.content as { _v?: number } | undefined)?._v === CONTENT_VERSION);
  const out: Record<string, PreviewSectionState> = {};
  page.sections.forEach((def, index) => {
    const s = stored[index];
    out[def.id] = {
      content: resolveContent(def, (s?.content as Record<string, unknown>) ?? null, row),
      visible: s ? s.visible !== false : true,
      position: useStoredOrder && typeof s?.position === "number" ? s.position : index,
    };
  });
  return out;
}

/** Resolved content for a section: live preview draft → saved content → defaults. */
export function useSectionContent<T extends SectionContent>(def: SectionDef<T>): Resolved<T> {
  const cms = useCmsOptional();
  const draft = cms?.previewSections?.[def.id];
  const store = cms?.store;
  return useMemo(() => {
    if (draft) return resolveContent(def, { ...draft.content, _v: CONTENT_VERSION });
    if (!store) return resolveContent(def);
    const s = storedSection(store, def.id);
    return resolveContent(def, (s?.content as Record<string, unknown>) ?? null, pageRow(store, def.page));
  }, [def, draft, store]);
}

/** Visibility/order of a page's sections, honouring preview drafts. */
export function useSectionStates(page: PageDef) {
  const cms = useCmsOptional();
  const store = cms?.store;
  const preview = cms?.previewSections;
  return useMemo(() => {
    const saved = store ? savedSectionStates(store, page) : null;
    return page.sections
      .map((def, index) => {
        const state = preview?.[def.id] ?? saved?.[def.id];
        return { def, visible: state ? state.visible : true, position: state ? state.position : index };
      })
      .sort((a, b) => a.position - b.position);
  }, [page, store, preview]);
}
