import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard.jsx";
import SuggestedBooksPage from "./screens/SuggestedBooksPage.jsx";
import CurrentlyReadingPage from "./screens/CurrentlyReadingPage.jsx";
import MyListsPage from "./screens/MyListsPage.jsx";
import ProfilePage from "./screens/ProfilePage.jsx";
import Sidebar from "./navigation/Sidebar.jsx";
import Navbar from "./navigation/Navbar.jsx";
import LoginPage from "./auth/LoginPage.jsx";
import RegisterPage from "./auth/RegisterPage.jsx";
import { ProtectedRoute } from "./auth/ProtectedRoute.jsx";

import { useState, useEffect } from "react";
import "./newIndex.css";

function App() {
  // 🔐 Auth state: Stores auth token (persists between sessions)
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  
  // 📌 Username state: Will be used to display the username in the UI
  const [userName, setUserName] = useState("");

  // ✅ Extracts username from JWT token
  function getUsernameFromToken(token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      return payload.username || "Unknown User";
    } catch (error) {
      console.error("Failed to extract username:", error);
      return "Unknown User";
    }
  }

  // 🎯 Updates username when authToken changes
  useEffect(() => {
    if (authToken) {
      setUserName(getUsernameFromToken(authToken));
    }
  }, [authToken]);

  // ✅ Saves authToken to localStorage & state
  function handleSetAuthToken(token) {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
    setAuthToken(token);
  }

  // 🔓 Logout function (removes token & resets username)
  function handleLogout() {
    handleSetAuthToken(null);
    setUserName(""); 
  }

  return (
    <Router>
      <Routes>
        {/* 🔓 Public Routes - Separate Layout */}
        <Route path="/login" element={<LoginPage setAuthToken={handleSetAuthToken} />} />
        <Route path="/register" element={<RegisterPage setAuthToken={handleSetAuthToken} />} />

        {/* 🔐 Protected Routes (Wrapped in Main Layout) */}
        <Route
          path="/*"
          element={
            <div className="flex bg-background text-gray-900 dark:text-gray-100 h-[100dvh] overflow-hidden">
              
              {/* 📌 Sidebar: Fixed on Desktop */}
              {authToken && (
                <div className="w-64 fixed left-0 top-0 h-screen bg-sidebar z-50 hidden md:block">
                  <Sidebar onLogout={handleLogout} />
                </div>
              )}

              {/* 📌 Main Content: Scrollable */}
              <div className="flex-1 md:ml-64 h-full overflow-y-auto">
                
                {/* 📌 Navbar: Sticky on Mobile */}
                {authToken && (
                  <div className="fixed top-0 left-0 w-full z-20">
                    <Navbar onLogout={handleLogout} />
                  </div>
                )}

                <div className="p-6 md:p-10 mt-6 md:mt-0">
                  <Routes>
                    <Route path="/" element={<ProtectedRoute authToken={authToken}><Dashboard /></ProtectedRoute>} />
                    <Route path="/currently-reading" element={<ProtectedRoute authToken={authToken}><CurrentlyReadingPage /></ProtectedRoute>} />
                    <Route path="/suggested-books" element={<ProtectedRoute authToken={authToken}><SuggestedBooksPage /></ProtectedRoute>} />
                    <Route path="/my-lists" element={<ProtectedRoute authToken={authToken}><MyListsPage /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute authToken={authToken}><ProfilePage logout={handleLogout}/></ProtectedRoute>} />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
