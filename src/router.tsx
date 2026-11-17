import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Hostinger + prerender autoSubfolderIndex serve pages as /path/index.html,
    // so Apache redirects /path → /path/. Keep the client router on the same
    // trailing-slash URLs to avoid hydration/match failures.
    trailingSlash: "always",
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
