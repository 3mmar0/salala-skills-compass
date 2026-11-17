import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({
      routeTree,
      context: { queryClient: new QueryClient() },
      trailingSlash: "preserve",
    });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches the courses index with or without a trailing slash", () => {
    const router = createRouter({
      routeTree,
      context: { queryClient: new QueryClient() },
      trailingSlash: "preserve",
    });

    const withoutSlash = router.matchRoutes("/courses");
    const withSlash = router.matchRoutes("/courses/");

    expect(withoutSlash.at(-1)?.routeId).toContain("courses");
    expect(withSlash.at(-1)?.routeId).toContain("courses");
  });
});
