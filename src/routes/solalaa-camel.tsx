import { createFileRoute } from "@tanstack/react-router";
import { BreedPage } from "@/components/site/BreedSections";
import { meta } from "@/lib/meta";
import { camelPage } from "@/lib/cms/pages/camel";

export const Route = createFileRoute("/solalaa-camel")({
  head: () => meta(camelPage.title, camelPage.description ?? "", camelPage.slug),
  component: () => <BreedPage page={camelPage} />,
});
