import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("create", "routes/createCollection.tsx"),
  route("collection/:id", "routes/viewCollection.tsx"),
  route("collection/:id/delete", "routes/deleteCollection.tsx"),
  route("collection/:id/exam", "routes/exam.tsx"),
  route("collection/:id/flashcard", "routes/flashcard.tsx"),
] satisfies RouteConfig;
