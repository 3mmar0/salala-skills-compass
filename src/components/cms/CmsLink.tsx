import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Link whose destination comes from admin-edited content.
 * Internal paths use client-side navigation; external, mailto, tel and #anchor links use a plain <a>.
 */
export function CmsLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const target = href.trim() || "/";
  const isInternal = target.startsWith("/") && !target.startsWith("//") && !target.includes("#");
  if (isInternal) {
    // Destinations are edited in the admin, so they can't be checked against the route list at build time.
    return (
      <Link to={target as "/"} className={className}>
        {children}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(target);
  return (
    <a href={target} className={className} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      {children}
    </a>
  );
}
