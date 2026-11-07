import type { SectionContent } from "./schema";

/** Live-preview protocol between the admin editor and the site in an iframe. */
export const PREVIEW_PARAM = "cms-preview";

export type PreviewSectionState = {
  content: SectionContent;
  visible: boolean;
  position: number;
};

export type PreviewMessage =
  | { source: "solala-cms"; type: "ready"; path: string }
  | { source: "solala-cms"; type: "select"; id: string }
  | { source: "solala-cms"; type: "draft"; sections: Record<string, PreviewSectionState> }
  | { source: "solala-cms"; type: "focus"; id: string | null; scroll?: boolean };

export function isPreviewFrame() {
  if (typeof window === "undefined") return false;
  try {
    return window.parent !== window && new URLSearchParams(window.location.search).has(PREVIEW_PARAM);
  } catch {
    return false;
  }
}

export function isPreviewMessage(data: unknown): data is PreviewMessage {
  return Boolean(data && typeof data === "object" && (data as { source?: string }).source === "solala-cms");
}

export function postToParent(message: { type: "ready"; path: string } | { type: "select"; id: string }) {
  window.parent.postMessage({ source: "solala-cms", ...message }, window.location.origin);
}
