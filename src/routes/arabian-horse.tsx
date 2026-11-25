import { createFileRoute } from "@tanstack/react-router";
import { BreedPage } from "@/components/site/BreedSections";
import { meta } from "@/lib/meta";
import { arabianHorsePage } from "@/lib/cms/pages/arabian-horse";

export const Route = createFileRoute("/arabian-horse")({
  head: () => {
    const base = meta(
      arabianHorsePage.title,
      arabianHorsePage.description ?? "",
      arabianHorsePage.slug,
    );
    return {
      ...base,
      links: [
        ...(base.links ?? []),
        {
          rel: "preload",
          href: "/fonts/DiwaniLetter.ttf",
          as: "font",
          type: "font/ttf",
          crossOrigin: "anonymous",
        },
      ],
    };
  },
  component: () => (
    <div className="page-arabian-horse">
      <BreedPage page={arabianHorsePage} />
    </div>
  ),
});
