import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import DarkModeToggle from "../components/DarkModeToggle.jsx";

const Sidebar = ( {onLogout} ) => {
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass = (path) =>
    `block py-2 px-4 rounded ${
      location.pathname === path
        ? "py-3 px-5 bg-gray-300 dark:bg-gray-800 font-bold"
        : "hover:bg-gray-200 dark:hover:bg-gray-700"
  }`;

  const username = "Diego";

  const pageTitles = {
    "/": `Hi, ${username}!`,
    "/currently-reading": "Currently Reading",
    "/suggested-books": "Suggested Books",
    "/my-lists": "My Lists",
  };

  const pageTitle = pageTitles[location.pathname];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-container text-gray-900 dark:text-gray-100 p-4 shadow-custom border-highlight">
      <h1 className="mt-5 text-center text-xl font-bold text-gray-900 dark:text-white">Book Tracker</h1>

      <nav className="mt-10 space-y-2 flex-1">
        <Link to="/" className={linkClass("/")}>Dashboard</Link>
        <Link to="/currently-reading" className={linkClass("/currently-reading")}>Currently Reading</Link>
        <Link to="/suggested-books" className={linkClass("/suggested-books")}>Suggested Books</Link>
        <Link to="/my-lists" className={linkClass("/my-lists")}>My Lists</Link>
        <Link to="/profile" className={linkClass("/profile")}>Profile</Link>
      </nav>

      <div className="mt-auto flex flex-col gap-3 ">
        <DarkModeToggle />

        {/* Logout Button */}
        <button 
          onClick={() => {
            onLogout();
            navigate("/login");
          }} 
          className="w-full py-2 rounded-lg bg-red-400 text-white hover:bg-red-500 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
