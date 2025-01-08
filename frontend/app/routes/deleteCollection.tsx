import DeleteCollectionPage from "../collections/deleteCollection";
import type { Route } from "./+types/deleteCollection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <DeleteCollectionPage />;
}
