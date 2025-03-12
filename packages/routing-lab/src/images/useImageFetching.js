import { useEffect, useState } from "react";

/**
 * Fetches images from the backend with authentication.
 *
 * @param {string} imageId - The image ID to fetch, or all images if an empty string.
 * @param {string} authToken - The authentication token for the request.
 * @returns {{isLoading: boolean, fetchedImages: ImageData[]}} fetch state and data
 */
export function useImageFetching(imageId = "", authToken) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedImages, setFetchedImages] = useState([]);

    useEffect(() => {
        console.log("Auth Token:", authToken);
    }, [authToken]);

    useEffect(() => {
        if (!authToken) {
            setFetchedImages([]); // Clear images if not logged in
            setIsLoading(false);
            return;
        }

        async function fetchImages() {
            setIsLoading(true);
            try {
                const endpoint = imageId ? `/api/images?createdBy=${imageId}` : "/api/images";
                console.log(`Fetching images from: ${endpoint}`);
                console.log(`Using auth token: ${authToken}`); // Log token

                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${authToken}`, // Send auth token
                        "Content-Type": "application/json",
                    },
                });

                console.log(`Response status: ${response.status}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch images: ${response.statusText}`);
                }

                const data = await response.json();

                // Ensure "_id" is mapped to "id" for React compatibility
                const formattedImages = data.map(img => ({
                    ...img,
                    id: img._id // Convert "_id" from MongoDB to "id" for frontend use
                }));

                setFetchedImages(formattedImages);
            } catch (error) {
                console.error("Error fetching images:", error);
                setFetchedImages([]); // Fallback to empty array on error
            } finally {
                setIsLoading(false);
            }
        }

        fetchImages();
    }, [imageId, authToken]); // ✅ Runs when `imageId` or `authToken` changes

    return { isLoading, fetchedImages };
}
