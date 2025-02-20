import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard.jsx";
import SuggestedBooksPage from "./screens/SuggestedBooksPage.jsx";
import BookTracker from "./screens/BookTracker.jsx";
import Finished from "./screens/Finished.jsx";
import ToRead from "./screens/ToRead.jsx";
import Sidebar from "./navigation/Sidebar.jsx";
import Navbar from "./navigation/Navbar.jsx";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="flex bg-background text-gray-900 dark:text-gray-100">
        
        {/* Sidebar: Fixed Position */}
        <div className="w-64 fixed left-0 top-0 h-screen bg-sidebar z-50 hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content: Scrollable */}
        <div className="flex-1 md:ml-64 h-screen overflow-y-auto">
          
          {/* Navbar: Sticky on Mobile */}
          <div className="md:static fixed top-0 left-0 w-full">
            <Navbar />
          </div>

          <div className="p-6 mt-14 md:mt-0"> {/* Adds space below navbar on mobile */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/book-tracker" element={<BookTracker />} />
              <Route path="/suggested-books" element={<SuggestedBooksPage />} />
              <Route path="/to-read" element={<ToRead />} />
              <Route path="/finished" element={<Finished />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

