import type { Collection } from "../types";

export async function getCollections(): Promise<Record<string, Collection>> {
  const data = await fetch("http://localhost:3000/api/collections");
  const collections = await data.json();
  return collections
}

export async function createCollection(collection: { name: string; description: string }): Promise<Collection> {
  const response = await fetch("http://localhost:3000/api/collections", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(collection),
  });

  if (!response.ok) {
    throw new Error("Failed to create collection");
  }

  return response.json();
}

export async function getCollection({ id }: { id: string }): Promise<Collection> {
  const response = await fetch("http://localhost:3000/api/collection/" + id);
  const collections = await response.json();
  return collections;
}

export async function addQuestionToCollection(collectionId: string, question: string, answer: string): Promise<Collection> {
  const response = await fetch("http://localhost:3000/api/collection/" + collectionId + "/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, answer }),
  });

  if (!response.ok) {
    throw new Error("Failed to add question");
  }

  return response.json();
}

export async function removeQuestionFromCollection(collectionId: string, questionId: string): Promise<Collection> {
  const response = await fetch("http://localhost:3000/api/collection/" + collectionId + "/questions/" + questionId, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to remove question");
  }

  return response.json();
}

export async function deleteCollection(collectionId: string): Promise<Collection> {
  const response = await fetch("http://localhost:3000/api/collection/" + collectionId, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete collection");
  }

  return response.json();
}

export async function updateCollection(collectionId: string, collection: Collection): Promise<Collection> {
  const response = await fetch("http://localhost:3000/api/collection/" + collectionId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(collection),
  });

  if (!response.ok) {
    throw new Error("Failed to update collection");
  }

  return response.json();

}

export async function updateQuestion(collectionId: string, questionId: string, question: string, answer: string): Promise<Collection> {
  const response = await fetch("http://localhost:3000/api/collection/" + collectionId + "/questions/" + questionId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, answer }),
  });

  if (!response.ok) {
    throw new Error("Failed to update question");
  }

  return response.json();
}