import { BrowserRouter, Routes, Route } from "react-router"; 
import { Homepage } from "./Homepage.jsx";
import { AccountSettings } from "./AccountSettings.jsx";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import MainLayout from "./MainLayout.jsx";
import { LoginPage } from "./auth/LoginPage.jsx";
import { RegisterPage } from "./auth/RegisterPage.jsx";
import { ProtectedRoute } from "./auth/ProtectedRoute.jsx";
import { useState, useEffect } from "react"; 
import { useImageFetching } from "./images/useImageFetching.js";

function App() {
    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken")); // State for auth token
    const [userName, setUserName] = useState(""); // State for account name
    const { isLoading, fetchedImages } = useImageFetching("", authToken); // Fetch images once


    // Function to extract username from token
    function getUsernameFromToken(token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
            return payload.username || "Unknown User";
        } catch (error) {
            console.error("Failed to extract username:", error);
            return "Unknown User";
        }
    }

    useEffect(() => {
        if (authToken) {
            setUserName(getUsernameFromToken(authToken)); // Set username from token
        }
    }, [authToken]);

    // Save token to localStorage when it changes
    function handleSetAuthToken(token) {
        if (token) {
            localStorage.setItem("authToken", token);
        } else {
            localStorage.removeItem("authToken");
        }
        setAuthToken(token);
    }

    function handleLogout() {
        handleSetAuthToken(null)
        setUserName(""); // Clear username on logout
    }
    
    useEffect(() => {
        console.log("Auth Token:", authToken);
    }, [authToken]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<ProtectedRoute authToken={authToken}><Homepage userName={userName} authToken={authToken} /></ProtectedRoute>} />
                    <Route path="account" element={<ProtectedRoute authToken={authToken}><AccountSettings userName={userName} setUserName={setUserName} onLogout={handleLogout}/></ProtectedRoute>} />
                    <Route path="images" element={<ProtectedRoute authToken={authToken}><ImageGallery isLoading={isLoading} fetchedImages={fetchedImages} authToken={authToken} /></ProtectedRoute>} />
                    <Route path="images/:imageId" element={<ProtectedRoute authToken={authToken}><ImageDetails fetchedImages={fetchedImages} /></ProtectedRoute>} />
                    <Route path="login" element={<LoginPage setAuthToken={handleSetAuthToken} />} />
                    <Route path="register" element={<RegisterPage setAuthToken={handleSetAuthToken} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
