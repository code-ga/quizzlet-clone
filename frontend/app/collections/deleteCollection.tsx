import React from "react";
import { useParams, useNavigate } from "react-router";
import { deleteCollection } from "../services/collectionService";

function DeleteCollectionPage() {
  const { id: collectionId } = useParams();
  const navigate = useNavigate();

  const handleConfirmDelete = async () => {
    try {
      await deleteCollection(collectionId!);
      navigate("/"); // Redirect to the homepage after successful deletion
    } catch (error) {
      console.error("Error deleting collection:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const handleCancelDelete = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Delete Collection</h1>
      <p>Are you sure you want to delete this collection?</p>
      <div className="flex mt-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handleConfirmDelete}
        >
          Delete
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
          onClick={handleCancelDelete}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteCollectionPage;
