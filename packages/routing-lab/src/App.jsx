import { BrowserRouter, Routes, Route } from "react-router"; // Using react-router
import { Homepage } from "./Homepage.jsx";
import { AccountSettings } from "./AccountSettings.jsx";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import MainLayout from "./MainLayout.jsx";
import { useState } from "react"; // Import useState for managing state
import { useImageFetching } from "./images/useImageFetching.js"; // Import the fetching function

function App() {
    const [userName, setUserName] = useState("John Doe"); // State for account name
    const { isLoading, fetchedImages } = useImageFetching(""); // Fetch images once

    return (
        <BrowserRouter>
            <Routes>
                {/* Wrap all routes inside MainLayout to prevent duplicate headers */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Homepage userName={userName} />} />
                    <Route path="account" element={<AccountSettings userName={userName} setUserName={setUserName} />} />
                    <Route path="images" element={<ImageGallery isLoading={isLoading} fetchedImages={fetchedImages} />} />
                    <Route path="images/:imageId" element={<ImageDetails fetchedImages={fetchedImages} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
