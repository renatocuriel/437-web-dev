import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle.jsx";

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-container text-gray-900 dark:text-gray-100 p-4 shadow-custom border-highlight">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Book Tracker</h1>

      <div className="mt-4">
        <DarkModeToggle />
      </div>

      <nav className="mt-4 space-y-2">
        <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          Dashboard
        </Link>
        <Link to="/suggested-books" className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          Suggested Books
        </Link>
        <Link to="/book-tracker" className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          Book Tracker
        </Link>
        <Link to="/to-read" className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          To Read
        </Link>
        <Link to="/finished" className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          Finished Books
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
