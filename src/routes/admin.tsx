import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { isAdminAuthed } from "@/lib/cms/client-store";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  beforeLoad: ({ location }) => {
    if (typeof window === "undefined") return;
    const path = location.pathname;
    if (path === "/admin/login") return;
    if (!isAdminAuthed()) {
      throw redirect({ to: "/admin/login" });
    }
  },
});

function AdminLayout() {
  return <Outlet />;
}
