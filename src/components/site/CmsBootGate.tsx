import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useCmsOptional } from "@/lib/cms/CmsProvider";

/** Blocks public page content until the CMS API (or cache) is ready. */
export function CmsBootGate({ children }: { children: ReactNode }) {
  const cms = useCmsOptional();
  if (!cms || !cms.loading) return children;

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 py-24" role="status" aria-live="polite">
      <Loader2 className="h-9 w-9 animate-spin text-primary" aria-hidden />
      <p className="text-sm font-medium text-muted-foreground">جاري تحميل المحتوى…</p>
    </div>
  );
}
