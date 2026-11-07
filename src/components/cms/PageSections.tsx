import type { ComponentType, MouseEvent, ReactNode } from "react";
import { useCmsOptional } from "@/lib/cms/CmsProvider";
import { postToParent } from "@/lib/cms/preview";
import type { PageDef } from "@/lib/cms/schema";
import { useSectionStates } from "@/lib/cms/use-section";

/**
 * Renders a page's sections in the order and visibility set in the admin.
 * `components` maps each section key of the page definition to its component.
 */
export function PageSections({
  page,
  components = {},
  elements = {},
}: {
  page: PageDef;
  components?: Record<string, ComponentType>;
  /** Pre-built elements for sections that need props from the page (e.g. shared state). */
  elements?: Record<string, ReactNode>;
}) {
  const states = useSectionStates(page);
  const previewMode = useCmsOptional()?.previewMode ?? false;

  return (
    <>
      {states.map(({ def, visible }) => {
        const Component = components[def.key];
        const element = elements[def.key];
        if (!Component && element === undefined) return null;
        if (!visible && !previewMode) return null;
        return (
          <SectionFrame key={def.id} id={def.id} label={def.label} hidden={!visible}>
            {Component ? <Component /> : element}
          </SectionFrame>
        );
      })}
    </>
  );
}

/** Marks a block as an editable section so the admin preview can highlight and select it. */
export function SectionFrame({
  id,
  label,
  hidden = false,
  children,
}: {
  id: string;
  label: string;
  hidden?: boolean;
  children: ReactNode;
}) {
  const previewMode = useCmsOptional()?.previewMode ?? false;
  const onClickCapture = previewMode
    ? (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        postToParent({ type: "select", id });
      }
    : undefined;

  return (
    <div
      data-cms-section={id}
      data-cms-label={hidden ? `${label} · مخفي` : label}
      data-cms-hidden={hidden ? "" : undefined}
      onClickCapture={onClickCapture}
    >
      {children}
    </div>
  );
}
