import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Do not rewrite slash style on load. Hostinger CDN still has a cached
    // 301 for /courses → /courses/; "never" bounced those and caused a loop.
    // Links stay without a trailing slash; both URL forms are accepted.
    trailingSlash: "preserve",
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
