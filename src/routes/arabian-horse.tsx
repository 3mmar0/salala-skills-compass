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
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Gulzar&display=swap",
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
