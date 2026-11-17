import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Keep URLs clean: /courses not /courses/. Hostinger .htaccess strips
    // trailing slashes and still serves prerendered /path/index.html.
    trailingSlash: "never",
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
