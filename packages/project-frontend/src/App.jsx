import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home.jsx";
import BookTracker from "./screens/BookTracker.jsx";
import Finished from "./screens/Finished.jsx";
import ToRead from "./screens/ToRead.jsx";
import Sidebar from "./navigation/Sidebar.jsx";
import Navbar from "./navigation/Navbar.jsx";
import DarkModeToggle from "./components/DarkModeToggle.jsx";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <DarkModeToggle />
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book-tracker" element={<BookTracker />} />
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
