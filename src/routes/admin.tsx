import { Outlet, createFileRoute } from "@tanstack/react-router";
import { requireAdminSession } from "@/lib/admin-access";

export const Route = createFileRoute("/admin")({
  ssr: false,
  component: AdminLayout,
  beforeLoad: async ({ location }) => {
    // Hostinger normalises directory-like URLs with a trailing slash. Treat
    // /admin/login and /admin/login/ as the same public login route; every
    // other admin route is still verified against the protected API.
    const path = location.pathname.replace(/\/+$/, "") || "/";
    if (path === "/admin/login") return;
    await requireAdminSession();
  },
});

function AdminLayout() {
  return <Outlet />;
}
