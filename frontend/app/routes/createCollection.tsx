import CreateCollectionPage from "../collections/createCollection";
import type { Route } from "./+types/createCollection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function CreateCollection() {
  return <CreateCollectionPage />;
}
