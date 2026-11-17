import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isAdminAuthed } from "@/lib/cms/client-store";

export const Route = createFileRoute("/admin/pages")({
  beforeLoad: () => { if (typeof window !== "undefined" && !isAdminAuthed()) throw redirect({ to: "/admin/login" }); },
  // The pages list and each editor are child routes. Rendering the outlet is
  // essential: without it /admin/pages/:pageKey changes the URL but keeps the
  // list mounted, so no editor can ever appear.
  component: Outlet,
});
