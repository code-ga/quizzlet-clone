import { Link } from "react-router";

export const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 p-4 rounded">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Quizzlet
        </Link>
        <Link
          to="/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Collection
        </Link>
      </div>
    </nav>
  );
};
