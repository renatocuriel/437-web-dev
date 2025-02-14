import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="md:hidden flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">📚 Book Tracker</h1>
      <div className="space-x-4">
        <Link to="/" className="text-sm hover:underline">Home</Link>
        <Link to="/book-tracker" className="text-sm hover:underline">Tracker</Link>
        <Link to="/to-read" className="text-sm hover:underline">To Read</Link>
        <Link to="/finished" className="text-sm hover:underline">Finished</Link>
      </div>
    </nav>
  );
};

export default Navbar;
