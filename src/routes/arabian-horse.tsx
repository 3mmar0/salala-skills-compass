import { createFileRoute } from "@tanstack/react-router";
import { BreedPage } from "@/components/site/BreedSections";
import { meta } from "@/lib/meta";
import { arabianHorsePage } from "@/lib/cms/pages/arabian-horse";

export const Route = createFileRoute("/arabian-horse")({
  head: () =>
    meta(arabianHorsePage.title, arabianHorsePage.description ?? "", arabianHorsePage.slug),
  component: () => <BreedPage page={arabianHorsePage} />,
});
