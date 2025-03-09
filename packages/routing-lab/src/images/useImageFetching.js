import { useEffect, useState } from "react";

const IMAGES = [
    {
        id: "0",
        src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg",
        name: "Blue merle herding sheep"
    },
    {
        id: "1",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Huskiesatrest.jpg/2560px-Huskiesatrest.jpg",
        name: "Huskies"
    },
    {
        id: "2",
        src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Taka_Shiba.jpg",
        name: "Shiba"
    },
    {
        id: "3",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/2560px-Felis_catus-cat_on_snow.jpg",
        name: "Tabby cat"
    },
    {
        id: "4",
        src: "https://upload.wikimedia.org/wikipedia/commons/8/84/Male_and_female_chicken_sitting_together.jpg",
        name: "Chickens"
    }
];

/**
 * Fetches images from the backend.
 *
 * @param {string} imageId - The image ID to fetch, or all images if an empty string.
 * @returns {{isLoading: boolean, fetchedImages: ImageData[]}} fetch state and data
 */
export function useImageFetching(imageId = "") {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedImages, setFetchedImages] = useState([]);

    useEffect(() => {
        async function fetchImages() {
            setIsLoading(true);
            try {
                const endpoint = imageId ? `/api/images?createdBy=${imageId}` : "/api/images";
                const response = await fetch(endpoint);

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
    }, [imageId]); // Runs when `imageId` changes

    return { isLoading, fetchedImages };
}
