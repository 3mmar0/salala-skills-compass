import { createFileRoute } from "@tanstack/react-router";
import { BreedPage } from "@/components/site/BreedSections";
import { meta } from "@/lib/meta";
import { largeAnimalPage } from "@/lib/cms/pages/large-animal";

export const Route = createFileRoute("/large-animal")({
  head: () => meta(largeAnimalPage.title, largeAnimalPage.description ?? "", largeAnimalPage.slug),
  component: () => <BreedPage page={largeAnimalPage} />,
});
