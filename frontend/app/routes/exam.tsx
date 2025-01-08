import ExamPage from "../collections/ExamPage";
import ErrorPage from "../components/ErrorPage";
import { getCollection } from "../services/collectionService";
import type { Route } from "./+types/exam";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  let collection = await getCollection({ id: params.id });
  return collection;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  if (!loaderData) {
    return <ErrorPage error="Collection not found" />;
  }
  return <ExamPage collection={loaderData} />;
}
