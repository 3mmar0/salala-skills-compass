import { lazy, Suspense, type ComponentType } from "react";

type LazyModule = Record<string, ComponentType>;

/**
 * Code-splits a section into a shared async chunk.
 * Hero/pillars stay eager; below-fold home sections use this so the first JS
 * payload stays smaller. Suspense keeps SSR/prerender HTML intact for SEO.
 */
export function lazySection(loader: () => Promise<LazyModule>, exportName: string): ComponentType {
  const LazyComp = lazy(() =>
    loader().then((mod) => {
      const Comp = mod[exportName];
      if (!Comp) throw new Error(`lazySection: missing export "${exportName}"`);
      return { default: Comp };
    }),
  );

  return function LazySectionMount() {
    return (
      <Suspense fallback={<div className="min-h-64 animate-pulse rounded-2xl bg-muted/30" aria-hidden />}>
        <div className="[content-visibility:auto] [contain-intrinsic-size:auto_24rem]">
          <LazyComp />
        </div>
      </Suspense>
    );
  };
}
