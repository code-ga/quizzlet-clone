import React, { useState } from "react";
import { Link, useParams } from "react-router";
import {
  getCollection,
  addQuestionToCollection,
  updateQuestion,
  deleteQuestion,
} from "../services/collectionService";
import type { Collection, Question } from "../types";
import {
  AddQuestionModal,
  DeleteModal,
  EditQuestionModal,
} from "../components/QuestionModal";

function ViewCollectionPage({
  preFetchCollection,
}: {
  preFetchCollection: Collection;
}) {
  const { id: collectionId } = useParams();
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState({
    isOpen: false,
    questionId: "",
  });
  const [editModalOpen, setEditModalOpen] = useState({
    isOpen: false,
    questionId: "",
    question: "",
    answer: "",
  });
  const [collection, setCollection] = useState<Collection>(preFetchCollection);

  const handleAddQuestion = async (question: string, answer: string) => {
    if (question.trim() === "" || answer.trim() === "") {
      return;
    }

    try {
      await addQuestionToCollection(collectionId!, question, answer);
      // Refresh the collection data after adding a question
      const updatedCollection = await getCollection({ id: collectionId! });
      setCollection(updatedCollection);
    } catch (error) {
      console.error("Error adding question:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      await deleteQuestion(collectionId!, questionId);
      // Refresh the collection data after deleting a question
      const updatedCollection = await getCollection({ id: collectionId! });
      setCollection(updatedCollection);
      setDeleteModalOpen({ isOpen: false, questionId: "" });
    } catch (error) {
      console.error("Error deleting question:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const handleEditQuestion = async (
    questionId: string,
    question: string,
    answer: string
  ) => {
    try {
      const updatedCollection = await updateQuestion(
        collectionId!,
        questionId,
        question,
        answer
      );
      setCollection(updatedCollection);
      setEditModalOpen({
        isOpen: false,
        questionId: "",
        question: "",
        answer: "",
      });
    } catch (error) {
      console.error("Error updating question:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  return (
    <div className="container mx-auto px-20 mt-10">
      {collection && (
        <>
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-4">{collection.name}</h1>
              <p className="mb-4">{collection.description}</p>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => setIsAddQuestionModalOpen(true)}
            >
              Add Question
            </button>
          </div>
          <div className="mb-12 flex">
            <Link
              to={`/collection/${collectionId}/exam`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Take Exam
            </Link>
            <Link
              to={`/collection/${collectionId}/flashcard`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Flashcard
            </Link>
          </div>
          <table className="w-full border mt-12">
            <thead>
              <tr>
                <th className="p-2 border bg-gray-800">Question</th>
                <th className="p-2 border bg-gray-800">Answer</th>
                <th className="p-2 border bg-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(collection.questions).map((question: Question) => (
                <tr key={question.id}>
                  <td className="p-2 border break-words max-w-2xl">
                    {question.question}
                  </td>
                  <td className="p-2 border break-words max-w-xl">
                    {question.answer}
                  </td>
                  <td className="p-2 border">
                    {/* Add edit button here if needed */}
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() =>
                        setDeleteModalOpen({
                          isOpen: true,
                          questionId: question.id,
                        })
                      }
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2"
                      onClick={() =>
                        setEditModalOpen({
                          isOpen: true,
                          questionId: question.id,
                          question: question.question,
                          answer: question.answer,
                        })
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <AddQuestionModal
            isOpen={isAddQuestionModalOpen}
            onClose={() => setIsAddQuestionModalOpen(false)}
            onAddQuestion={(question, answer) =>
              handleAddQuestion(question, answer)
            }
          />
          <DeleteModal
            isOpen={deleteModalOpen.isOpen}
            onClose={() =>
              setDeleteModalOpen({ isOpen: false, questionId: "" })
            }
            onDelete={() => handleDeleteQuestion(deleteModalOpen.questionId)}
          />
          {editModalOpen.isOpen && (
            <EditQuestionModal
              isOpen={editModalOpen.isOpen}
              onClose={() =>
                setEditModalOpen({
                  isOpen: false,
                  questionId: "",
                  question: "",
                  answer: "",
                })
              }
              onEdit={(questionId, question, answer) =>
                handleEditQuestion(questionId, question, answer)
              }
              initialQuestion={editModalOpen.question}
              initialAnswer={editModalOpen.answer}
              id={editModalOpen.questionId}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ViewCollectionPage;
