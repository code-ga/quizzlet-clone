import React, { useState, useEffect } from "react";
import { type Collection } from "../types/index";
import { getCollections } from "../services/collectionService";
import LoadingPage from "../components/LoadingPage";
import { Link } from "react-router";
import ErrorPage from "../components/ErrorPage";

function HomePage() {
  const [collections, setCollections] = useState<Record<string, Collection>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      setError(null);
      try {
        const fetchedCollections = await getCollections();
        setLoading(false);
        setError(null);
        setCollections(fetchedCollections);
      } catch (error) {
        console.error("Error fetching collections:", error);
        setError("An error occurred while fetching collections.");
        setLoading(false);
      }
    };

    fetchCollections();
  },[]);

  return loading ? (
    <LoadingPage />
  ) : error ? (
    <ErrorPage error={error} />
  ) : (
    <div className="dark:bg-gray-900 dark:text-white container mx-auto p-4">
      <div className=" mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">My Collections</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.values(collections || {}).map((collection) => (
            <div
              key={collection.id}
              className="bg-gray-800 dark:bg-gray-700 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-lg font-semibold mb-2">{collection.name}</h2>
              <p className="text-gray-400 dark:text-gray-300">
                {collection.description}
              </p>
              {/* Add buttons or links for interacting with the collection (e.g., view, edit, delete) */}
              <div className="flex flex-col">
                <Link
                  to={`/collection/${collection.id}`}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Collection
                </Link>
                <Link
                  to={`/collection/${collection.id}/delete`}
                  className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete Collection
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
