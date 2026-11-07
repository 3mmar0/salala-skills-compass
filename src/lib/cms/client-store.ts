import { CMS_SEED } from "./seed";
import type { CmsStore } from "./types";

const LS_KEY = "solala-cms-store-v2";
const TOKEN_KEY = "solala-admin-token";
const API_BASE = (import.meta.env.VITE_CMS_API_BASE_URL || "https://backend.solalaa.com/api").replace(/\/$/, "");

export function getLocalCmsStore(): CmsStore {
  if (typeof window === "undefined") return CMS_SEED;
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as CmsStore) : CMS_SEED;
  } catch {
    return CMS_SEED;
  }
}

function setLocalCmsStore(store: CmsStore) {
  localStorage.setItem(LS_KEY, JSON.stringify(store));
}

function token() {
  return typeof window === "undefined" ? null : sessionStorage.getItem(TOKEN_KEY);
}

export async function adminApi<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init.body && !(init.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
      ...(token() ? { Authorization: `Bearer ${token()}` } : {}),
      ...init.headers,
    },
  });
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message || "تعذر الاتصال بلوحة المحتوى.");
  }
  return response.status === 204 ? (undefined as T) : (response.json() as Promise<T>);
}

export async function fetchCmsStore(): Promise<CmsStore> {
  try {
    const document = await adminApi<{ settings: CmsStore["settings"]; pages: CmsStore["pages"] }>("/cms");
    const store: CmsStore = {
      version: 2,
      settings: document.settings,
      pages: document.pages.map(({ sections: _sections, ...page }) => page),
      sections: document.pages.flatMap((page) =>
        (page.sections ?? []).map((section) => ({
          ...section,
          pageSlug: page.slug,
          title: section.content?.title ?? section.title,
          subtitle: section.content?.subtitle ?? "",
          body: section.content?.body ?? "",
          items: section.content?.items ?? [],
        })),
      ),
    };
    setLocalCmsStore(store);
    return store;
  } catch {
    return getLocalCmsStore();
  }
}

export async function persistCmsStore(store: CmsStore): Promise<{ ok: true; mode: "server" }> {
  await adminApi("/admin/settings", { method: "PUT", body: JSON.stringify(store.settings) });
  await Promise.all(
    store.pages.filter((page) => page.id).map((page) => adminApi(`/admin/pages/${page.id}`, { method: "PUT", body: JSON.stringify(page) })),
  );
  await Promise.all(
    store.sections.filter((section) => typeof section.id === "number").map((section) => adminApi(`/admin/sections/${section.id}`, { method: "PUT", body: JSON.stringify({ visible: section.visible, content: { title: section.title, subtitle: section.subtitle, body: section.body, items: section.items } }) })),
  );
  setLocalCmsStore(store);
  return { ok: true, mode: "server" };
}

export async function loginAdmin(email: string, password: string) {
  const result = await adminApi<{ token: string; user: { name: string; email: string } }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  sessionStorage.setItem(TOKEN_KEY, result.token);
  return result.user;
}

export async function logoutAdmin() {
  try {
    await adminApi<void>("/auth/logout", { method: "POST" });
  } finally {
    sessionStorage.removeItem(TOKEN_KEY);
  }
}

export function isAdminAuthed() {
  return Boolean(token());
}

export function setAdminAuthed(value: boolean) {
  if (!value) sessionStorage.removeItem(TOKEN_KEY);
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
