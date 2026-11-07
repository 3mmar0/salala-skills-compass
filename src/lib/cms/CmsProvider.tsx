import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { CMS_SEED } from "./seed";
import { fetchCmsStore, persistCmsStore } from "./client-store";
import { isPreviewFrame, isPreviewMessage, postToParent, type PreviewSectionState } from "./preview";
import type { CmsStore, SiteSettings } from "./types";

type CmsContextValue = {
  store: CmsStore;
  loading: boolean;
  saving: boolean;
  lastSaveMode: "server" | "local" | null;
  /** True when this page runs inside the admin live-preview frame. */
  previewMode: boolean;
  /** Unsaved section drafts pushed by the admin editor (preview frame only). */
  previewSections: Record<string, PreviewSectionState> | null;
  refresh: () => Promise<void>;
  saveStore: (next: CmsStore) => Promise<void>;
  updateSettings: (settings: SiteSettings) => Promise<void>;
};

const CmsContext = createContext<CmsContextValue | null>(null);

export function CmsProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<CmsStore>(CMS_SEED);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaveMode, setLastSaveMode] = useState<"server" | "local" | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [previewSections, setPreviewSections] = useState<Record<string, PreviewSectionState> | null>(null);

  const refresh = async () => {
    setLoading(true);
    const next = await fetchCmsStore();
    setStore(next);
    setLoading(false);
  };

  useEffect(() => {
    void refresh();
  }, []);

  // Live preview: receive drafts from the admin editor running in the parent window.
  useEffect(() => {
    if (!isPreviewFrame()) return;
    setPreviewMode(true);
    document.documentElement.setAttribute("data-cms-preview", "");

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || !isPreviewMessage(event.data)) return;
      const msg = event.data;
      if (msg.type === "draft") setPreviewSections(msg.sections);
      if (msg.type === "focus") {
        document.querySelectorAll("[data-cms-active]").forEach((el) => el.removeAttribute("data-cms-active"));
        if (!msg.id) return;
        const el = document.querySelector(`[data-cms-section="${CSS.escape(msg.id)}"]`);
        if (el) {
          el.setAttribute("data-cms-active", "");
          if (msg.scroll) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    // Keep the preview on the edited page: links don't navigate inside the frame.
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("a")) event.preventDefault();
    };
    window.addEventListener("message", onMessage);
    document.addEventListener("click", onClick, true);
    postToParent({ type: "ready", path: window.location.pathname });
    return () => {
      window.removeEventListener("message", onMessage);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  const saveStore = async (next: CmsStore) => {
    setSaving(true);
    try {
      setStore(next);
      const res = await persistCmsStore(next);
      setLastSaveMode(res.mode);
    } finally {
      setSaving(false);
    }
  };

  const value = useMemo<CmsContextValue>(
    () => ({
      store,
      loading,
      saving,
      lastSaveMode,
      previewMode,
      previewSections,
      refresh,
      saveStore,
      updateSettings: async (settings) => {
        await saveStore({ ...store, settings });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store, loading, saving, lastSaveMode, previewMode, previewSections],
  );

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error("useCms must be used within CmsProvider");
  return ctx;
}

export function useCmsOptional() {
  return useContext(CmsContext);
}
