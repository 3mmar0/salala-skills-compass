import { CMS_SEED } from "./seed";
import type { CmsStore } from "./types";

const LS_KEY = "solala-cms-store-v2";
const TOKEN_KEY = "solala-admin-token";
const API_BASE = (import.meta.env["VITE_CMS_API_BASE_URL"] || "https://backend.solalaa.com/api").replace(/\/$/, "");

export function getLocalCmsStore(): CmsStore {
  if (typeof window === "undefined") return CMS_SEED;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return CMS_SEED;
    const parsed = JSON.parse(raw) as CmsStore;
    return {
      ...CMS_SEED,
      ...parsed,
      settings: { ...CMS_SEED.settings, ...parsed.settings, logo: parsed.settings?.logo ?? "" },
    };
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

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
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
    const payload = (await response.json().catch(() => null)) as { message?: string; errors?: Record<string, string[]> } | null;
    const firstError = payload?.errors ? Object.values(payload.errors)[0]?.[0] : undefined;
    throw new ApiError(firstError || payload?.message || "تعذر الاتصال بالخادم.", response.status);
  }
  return response.status === 204 ? (undefined as T) : (response.json() as Promise<T>);
}

/** Public API helper. Unlike adminApi it deliberately sends no session token. */
export async function publicApi<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { Accept: "application/json", ...(init.body && !(init.body instanceof FormData) ? { "Content-Type": "application/json" } : {}), ...init.headers },
  });
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string; errors?: Record<string, string[]> } | null;
    throw new ApiError(Object.values(payload?.errors ?? {})[0]?.[0] || payload?.message || "تعذر إرسال الطلب.", response.status);
  }
  return response.json() as Promise<T>;
}

export async function fetchCmsStore(): Promise<CmsStore> {
  try {
    const document = await adminApi<{ settings: CmsStore["settings"]; pages: CmsStore["pages"] }>("/cms");
    const store: CmsStore = {
      version: 2,
      settings: { ...CMS_SEED.settings, ...document.settings, logo: document.settings?.logo ?? "" },
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

/** Save site-wide settings. Page content is saved per page with savePageContent. */
export async function persistCmsStore(store: CmsStore): Promise<{ ok: true; mode: "server" }> {
  await adminApi("/admin/settings", { method: "PUT", body: JSON.stringify(store.settings) });
  setLocalCmsStore(store);
  return { ok: true, mode: "server" };
}

export async function updatePageRow(page: { id: number; title: string; description: string; heroTitle: string; heroSubtitle: string; published: boolean }) {
  return adminApi(`/admin/pages/${page.id}`, { method: "PUT", body: JSON.stringify(page) });
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

export type PageContentPayload = {
  slug: string;
  title: string;
  sections: { key: string; label: string; visible: boolean; position: number; content: Record<string, unknown> }[];
};

/**
 * Save every section of a page in one request.
 * Falls back to the older per-section endpoint (only for sections that already exist on the
 * server) when the server hasn't been updated with the bulk endpoint yet.
 */
export async function savePageContent(
  payload: PageContentPayload,
  existing: CmsStore["sections"],
): Promise<{ mode: "bulk" | "legacy"; skipped: string[] }> {
  try {
    await adminApi("/admin/page-content", { method: "PUT", body: JSON.stringify(payload) });
    return { mode: "bulk", skipped: [] };
  } catch (error) {
    if (!(error instanceof ApiError) || (error.status !== 404 && error.status !== 405)) throw error;
  }
  const skipped: string[] = [];
  for (const section of payload.sections) {
    const row = existing.find((s) => s.key === section.key && typeof s.id === "number");
    if (!row) {
      skipped.push(section.label);
      continue;
    }
    await adminApi(`/admin/sections/${row.id}`, {
      method: "PUT",
      body: JSON.stringify({ visible: section.visible, content: section.content }),
    });
  }
  return { mode: "legacy", skipped };
}

export async function uploadMedia(
  file: File,
  options?: { onProgress?: (percent: number) => void },
): Promise<string> {
  const form = new FormData();
  form.append("file", file);

  // XHR gives upload progress and clearer failures for large video files.
  if (options?.onProgress) {
    const media = await new Promise<{ url: string }>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${API_BASE}/admin/media`);
      xhr.setRequestHeader("Accept", "application/json");
      const auth = token();
      if (auth) xhr.setRequestHeader("Authorization", `Bearer ${auth}`);
      xhr.upload.onprogress = (event) => {
        if (!event.lengthComputable) return;
        options.onProgress?.(Math.round((event.loaded / event.total) * 100));
      };
      xhr.onload = () => {
        let payload: { message?: string; errors?: Record<string, string[]>; url?: string } | null = null;
        try {
          payload = JSON.parse(xhr.responseText) as typeof payload;
        } catch {
          payload = null;
        }
        if (xhr.status >= 200 && xhr.status < 300 && payload?.url) {
          resolve({ url: payload.url });
          return;
        }
        const firstError = payload?.errors ? Object.values(payload.errors)[0]?.[0] : undefined;
        const fallback =
          xhr.status === 413
            ? "حجم الملف أكبر من الحد المسموح على الخادم."
            : xhr.status === 0
              ? "انقطع الاتصال أثناء الرفع. حاول مرة أخرى بملف أصغر."
              : "تعذر رفع الملف.";
        reject(new ApiError(firstError || payload?.message || fallback, xhr.status || 0));
      };
      xhr.onerror = () => reject(new ApiError("انقطع الاتصال أثناء الرفع. حاول مرة أخرى.", 0));
      xhr.send(form);
    });
    return media.url;
  }

  const media = await adminApi<{ url: string }>("/admin/media", { method: "POST", body: form });
  return media.url;
}
