import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/courses/animal-livestock")({
  component: AnimalLivestockLayout,
});

function AnimalLivestockLayout() {
  return <Outlet />;
}
