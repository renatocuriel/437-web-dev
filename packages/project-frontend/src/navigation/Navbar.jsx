import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import DarkModeToggle from "../components/DarkModeToggle.jsx";

const Navbar = ( {onLogout} ) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const linkClass = (path) =>
    `block py-2 px-4 rounded ${
      location.pathname === path
        ? "bg-gray-300 dark:bg-gray-800 font-bold"
        : "hover:bg-gray-200 dark:hover:bg-gray-700"
  }`;

  const pageTitles = {
    "/": "Dashboard",
    "/currently-reading": "Currently Reading",
    "/suggested-books": "Suggested Books",
    "/my-lists": "My Lists",
    "/profile": "Profile",
  };

  const pageTitle = pageTitles[location.pathname];

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if dropdownRef exists and if click happened outside but not on the button
      if (menuOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)
            && buttonRef.current && !buttonRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    // Attach event listener when menu is open
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup: Remove event listener when menu is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    // <nav className="fixed w-full top-0 left-0 flex items-center justify-between bg-container text-gray-900 dark:text-gray-100 md:hidden border-highlight">
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between bg-container text-gray-900 dark:text-gray-100 py-1 px-4 md:hidden border-highlight shadow-md h-14">
    {/* <nav className="fixed flex w-full bottom-0 items-center justify-between bg-container text-gray-900 dark:text-gray-100 p-4 md:hidden border-highlight"> */}
      <button ref={buttonRef} onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-gray-900 dark:text-white">
        ☰
      </button>

      <h1 className="text-lg font-bold text-gray-900 dark:text-white">{pageTitle}</h1>

      <DarkModeToggle />

      {menuOpen && (
        <div ref={dropdownRef} className="absolute top-13 left-0 w-full bg-container text-gray-900 dark:text-white p-4 border-highlight shadow-custom">
          <Link to="/" className={linkClass("/")} onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/currently-reading" className={linkClass("/currently-reading")} onClick={() => setMenuOpen(false)}>Currently Reading</Link>
          <Link to="/suggested-books" className={linkClass("/suggested-books")} onClick={() => setMenuOpen(false)}>Suggested Books</Link>
          <Link to="/my-lists" className={linkClass("/my-lists")} onClick={() => setMenuOpen(false)}>My Lists</Link>
          <Link to="/profile" className={linkClass("/profile")} onClick={() => setMenuOpen(false)}>Profile</Link>

          {/* Logout Button */}
          <button 
            onClick={() => {
              onLogout();
              navigate("/login");
            }} 
            className="mt-4 w-full py-2 rounded-lg bg-red-400 text-white hover:bg-red-500 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
