import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { CMS_SEED } from "./seed";
import { fetchCmsStore, persistCmsStore } from "./client-store";
import type { CmsPage, CmsSection, CmsStore, SiteSettings } from "./types";

type CmsContextValue = {
  store: CmsStore;
  loading: boolean;
  saving: boolean;
  lastSaveMode: "server" | "local" | null;
  refresh: () => Promise<void>;
  saveStore: (next: CmsStore) => Promise<void>;
  updateSettings: (settings: SiteSettings) => Promise<void>;
  updateSection: (section: CmsSection) => Promise<void>;
  addSection: (section: CmsSection) => Promise<void>;
  removeSection: (id: string) => Promise<void>;
  updatePage: (page: CmsPage, previousSlug?: string) => Promise<void>;
  addPage: (page: CmsPage) => Promise<void>;
  removePage: (slug: string) => Promise<void>;
};

const CmsContext = createContext<CmsContextValue | null>(null);

export function CmsProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<CmsStore>(CMS_SEED);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaveMode, setLastSaveMode] = useState<"server" | "local" | null>(null);

  const refresh = async () => {
    setLoading(true);
    const next = await fetchCmsStore();
    setStore(next);
    setLoading(false);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const saveStore = async (next: CmsStore) => {
    setSaving(true);
    setStore(next);
    const res = await persistCmsStore(next);
    setLastSaveMode(res.mode);
    setSaving(false);
  };

  const value = useMemo<CmsContextValue>(
    () => ({
      store,
      loading,
      saving,
      lastSaveMode,
      refresh,
      saveStore,
      updateSettings: async (settings) => {
        await saveStore({ ...store, settings });
      },
      updateSection: async (section) => {
        await saveStore({
          ...store,
          sections: store.sections.map((s) => (s.id === section.id ? section : s)),
        });
      },
      addSection: async (section) => {
        await saveStore({ ...store, sections: [...store.sections, section] });
      },
      removeSection: async (id) => {
        await saveStore({ ...store, sections: store.sections.filter((s) => s.id !== id) });
      },
      updatePage: async (page, previousSlug?: string) => {
        const key = previousSlug ?? page.slug;
        await saveStore({
          ...store,
          pages: store.pages.map((p) => (p.slug === key ? page : p)),
        });
      },
      addPage: async (page) => {
        await saveStore({ ...store, pages: [...store.pages, page] });
      },
      removePage: async (slug) => {
        await saveStore({ ...store, pages: store.pages.filter((p) => p.slug !== slug) });
      },
    }),
    [store, loading, saving, lastSaveMode],
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
