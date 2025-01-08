import cors from "@elysiajs/cors";
import { Elysia, t } from "elysia";
import { JSONFilePreset } from "lowdb/node";
import { v4 as uuid } from "uuid"

type Data = {
  collections: Record<string, {
    id: string;
    name: string;
    description: string;
    questions: Record<string, {
      id: string;
      question: string;
      answer: string;
    }>
  }>;
}

const defaultData: Data = {
  collections: {
  }
}
const db = await JSONFilePreset<Data>('db.json', defaultData)

const app = new Elysia().get("/", () => "Hello Elysia")
  .use(cors())
  .get("/api/collections", () => db.data.collections)
  .get("/api/collection/:id", ({ params }) => db.data.collections[params.id])
  .post("/api/collections", async ({ body }) => {
    const { name, description } = body;
    const id = uuid();
    db.data.collections[id] = {
      id,
      name,
      description,
      questions: {}
    }
    await db.write()
    return db.data.collections[id];
  }, {
    body: t.Object({
      name: t.String(),
      description: t.String(),
    })
  }).delete("/api/collection/:id", async ({ params }) => {
    delete db.data.collections[params.id]
    await db.write()
    return db.data.collections;
  })
  .post("/api/collection/:id/questions", async ({ params, body, set }) => {
    const { question, answer } = body;
    const id = uuid();
    if (!db.data.collections[params.id]) {
      set.status = 404;
      return { error: true, message: "Collection not found", status: 404 };
    }
    db.data.collections[params.id].questions[id] = {
      id,
      question,
      answer
    }
    await db.write()
    return db.data.collections[params.id];
  }, {
    body: t.Object({
      question: t.String(),
      answer: t.String(),
    }),
    params: t.Object({
      id: t.String(),
    })
  }).delete("/api/collection/:id/questions/:questionId", async ({ params }) => {
    if (!db.data.collections[params.id]) {
      return { error: true, message: "Collection not found", status: 404 };
    }
    delete db.data.collections[params.id].questions[params.questionId]
    await db.write()
    return db.data.collections[params.id];
  }).put("/api/collection/:id/questions/:questionId", async ({ params, body }) => {
    if (!db.data.collections[params.id]) {
      return { error: true, message: "Collection not found", status: 404 };
    }
    const { question, answer } = body;
    db.data.collections[params.id].questions[params.questionId] = {
      id: params.questionId,
      question,
      answer
    }
    await db.write()
    return db.data.collections[params.id];
  }, {
    body: t.Object({
      question: t.String(),
      answer: t.String(),
    }),
    params: t.Object({
      id: t.String(),
      questionId: t.String(),
    })
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
