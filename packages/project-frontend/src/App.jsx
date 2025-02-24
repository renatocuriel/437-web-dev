import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard.jsx";
import SuggestedBooksPage from "./screens/SuggestedBooksPage.jsx";
import CurrentlyReadingPage from "./screens/CurrentlyReadingPage.jsx";
import MyListsPage from "./screens/MyListsPage.jsx";
import ProfilePage from "./screens/ProfilePage.jsx";
import Sidebar from "./navigation/Sidebar.jsx";
import Navbar from "./navigation/Navbar.jsx";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="flex bg-background text-gray-900 dark:text-gray-100 h-[100dvh] overflow-hidden">
      {/* <div className="flex bg-background text-gray-900 dark:text-gray-100"> */}
        
        {/* Sidebar: Fixed Position */}
        <div className="w-64 fixed left-0 top-0 h-screen bg-sidebar z-50 hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content: Scrollable */}
        <div className="flex-1 md:ml-64 h-full overflow-y-auto">
        {/* <div className="flex-1 md:ml-64 h-screen overflow-y-auto"> */}
          
          {/* Navbar: Sticky on Mobile */}
          <div className="fixed top-0 left-0 w-full z-20">
            <Navbar />
          </div>

          <div className="p-6 md:p-10 mt-6 md:mt-0"> {/* Adds space below navbar on mobile */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/currently-reading" element={<CurrentlyReadingPage />} />
              <Route path="/suggested-books" element={<SuggestedBooksPage />} />
              <Route path="/my-lists" element={<MyListsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

