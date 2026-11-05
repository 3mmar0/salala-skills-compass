import { CMS_SEED } from "./seed";
import type { CmsStore } from "./types";
import { loadCmsStore, saveCmsStore } from "./persist";

const LS_KEY = "solala-cms-store-v1";
const AUTH_KEY = "solala-admin-auth";

export function getLocalCmsStore(): CmsStore {
  if (typeof window === "undefined") return CMS_SEED;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return CMS_SEED;
    return JSON.parse(raw) as CmsStore;
  } catch {
    return CMS_SEED;
  }
}

export function setLocalCmsStore(store: CmsStore) {
  localStorage.setItem(LS_KEY, JSON.stringify(store));
}

export async function fetchCmsStore(): Promise<CmsStore> {
  try {
    const remote = await loadCmsStore();
    if (typeof window !== "undefined") setLocalCmsStore(remote);
    return remote;
  } catch {
    return getLocalCmsStore();
  }
}

export async function persistCmsStore(store: CmsStore): Promise<{ ok: boolean; mode: "server" | "local"; error?: string }> {
  setLocalCmsStore(store);
  try {
    await saveCmsStore({ data: store });
    return { ok: true, mode: "server" };
  } catch (e) {
    return {
      ok: true,
      mode: "local",
      error: e instanceof Error ? e.message : "server unavailable",
    };
  }
}

export function isAdminAuthed() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

export function setAdminAuthed(v: boolean) {
  if (v) sessionStorage.setItem(AUTH_KEY, "1");
  else sessionStorage.removeItem(AUTH_KEY);
}

export function exportCmsJson(store: CmsStore) {
  const blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `solala-cms-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
