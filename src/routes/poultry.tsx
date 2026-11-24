import { createFileRoute } from "@tanstack/react-router";
import { BreedPage } from "@/components/site/BreedSections";
import { meta } from "@/lib/meta";
import { poultryPage } from "@/lib/cms/pages/poultry";

export const Route = createFileRoute("/poultry")({
  head: () => meta(poultryPage.title, poultryPage.description ?? "", poultryPage.slug),
  component: () => <BreedPage page={poultryPage} />,
});
