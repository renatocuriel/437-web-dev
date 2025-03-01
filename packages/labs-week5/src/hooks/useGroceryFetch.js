import { useState, useEffect } from "react";
import { groceryFetcher } from "../groceryFetcher";

export function useGroceryFetch(source) {
    const [groceryData, setGroceryData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isStale = false; // Prevent race conditions

        async function fetchData(source) {
            try {
                setIsLoading(true);
                setError(null);

                const data = await groceryFetcher.fetch(source);

                if (!isStale) {
                    setGroceryData(data);
                }
            } catch (error) {
                if (!isStale) {
                    setError("Error fetching data: " + error.message);
                }
            } finally {
                if (!isStale) {
                    setIsLoading(false);
                }
            }
        }

        fetchData(source);

        return () => {
            isStale = true; // Mark request as outdated if component re-renders
        };
    }, [source]); // Run whenever `source` changes

    return { groceryData, isLoading, error };
}
