import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle.jsx";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

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
    <nav className="flex items-center justify-between bg-gray-800 text-white p-4 md:hidden">
      {/* Hamburger Button (Mobile Only) */}
      <button
        ref={buttonRef}
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-2xl text-white"
      >
        ☰
      </button>

      {/* Centered Title */}
      <h1 className="text-lg font-bold">📚 Book Tracker</h1>

      {/* Dark Mode Toggle */}
      <DarkModeToggle />


      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div ref={dropdownRef} className="absolute top-14 left-0 w-full bg-gray-800 text-white p-4 shadow-md">
          <Link to="/" className="block py-2" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
          <Link to="/book-tracker" className="block py-2" onClick={() => setMenuOpen(false)}>
            Book Tracker
          </Link>
          <Link to="/to-read" className="block py-2" onClick={() => setMenuOpen(false)}>
            To Read
          </Link>
          <Link to="/finished" className="block py-2" onClick={() => setMenuOpen(false)}>
            Finished Books
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
