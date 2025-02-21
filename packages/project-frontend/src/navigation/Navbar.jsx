import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle.jsx";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();

  const linkClass = (path) =>
    `block py-2 px-4 rounded ${
      location.pathname === path
        ? "bg-gray-300 dark:bg-gray-800 font-bold"
        : "hover:bg-gray-200 dark:hover:bg-gray-700"
  }`;

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
    // <nav className="relative flex items-center justify-between bg-container text-gray-900 dark:text-gray-100 p-4 md:hidden border-highlight">
    <nav className="fixed flex w-full bottom-0 items-center justify-between bg-container text-gray-900 dark:text-gray-100 p-4 md:hidden border-highlight">
      <button ref={buttonRef} onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-gray-900 dark:text-white">
        ☰
      </button>

      <h1 className="text-lg font-bold text-gray-900 dark:text-white">Book Tracker</h1>

      <DarkModeToggle />

      {menuOpen && (
        <div ref={dropdownRef} className="absolute bottom-0 left-0 w-full bg-container text-gray-900 dark:text-white p-4 border-highlight">
          {/* <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
          <Link to="/suggested-books" className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setMenuOpen(false)}>
            Suggested Books
          </Link>
          <Link to="/currently-reading" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setMenuOpen(false)}>
            Currently Reading
          </Link>
          <Link to="/to-read" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setMenuOpen(false)}>
            To Read
          </Link>
          <Link to="/finished" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setMenuOpen(false)}>
            Finished Books
          </Link> */}
        <Link to="/" className={linkClass("/")} onClick={() => setMenuOpen(false)}>Dashboard</Link>
        <Link to="/suggested-books" className={linkClass("/suggested-books")} onClick={() => setMenuOpen(false)}>Suggested Books</Link>
        <Link to="/currently-reading" className={linkClass("/currently-reading")} onClick={() => setMenuOpen(false)}>Currently Reading</Link>
        <Link to="/to-read" className={linkClass("/to-read")} onClick={() => setMenuOpen(false)}>To Read</Link>
        <Link to="/finished" className={linkClass("/finished")} onClick={() => setMenuOpen(false)}>Finished Books</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
