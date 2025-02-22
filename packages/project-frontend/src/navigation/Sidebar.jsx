import { Link, useLocation } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle.jsx";

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `block py-2 px-4 rounded ${
      location.pathname === path
        ? "bg-gray-300 dark:bg-gray-800 font-bold"
        : "hover:bg-gray-200 dark:hover:bg-gray-700"
  }`;

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-container text-gray-900 dark:text-gray-100 p-4 shadow-custom border-highlight">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Book Tracker</h1>

      <div className="mt-4">
        <DarkModeToggle />
      </div>

      <nav className="mt-4 space-y-2">
        <Link to="/" className={linkClass("/")}>Dashboard</Link>
        <Link to="/currently-reading" className={linkClass("/currently-reading")}>Currently Reading</Link>
        <Link to="/suggested-books" className={linkClass("/suggested-books")}>Suggested Books</Link>
        <Link to="/my-lists" className={linkClass("/my-lists")}>My Lists</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
