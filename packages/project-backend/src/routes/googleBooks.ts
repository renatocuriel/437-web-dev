import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY; // Make sure to add this to .env

// 📚 Search books (title, author, or genre)
router.get("/search", async (req, res) => {
    try {
        const { q, startIndex = 0 } = req.query;

        if (!q) {
            res.status(400).json({ error: "Missing search query (q)" });
            return;
        }

        const response = await axios.get(GOOGLE_BOOKS_API_URL, {
            params: {
                q,
                startIndex,
                maxResults: 12, // Fetch 12 books at a time
                key: API_KEY,
            },
        });

        const books = response.data.items?.map((item: any) => ({
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || ["Unknown Author"],
            coverImage: item.volumeInfo.imageLinks?.thumbnail || "",
            genre: item.volumeInfo.categories || ["Unknown Genre"],
            totalPages: item.volumeInfo.pageCount || 0,
            description: item.volumeInfo.description || "No description available.",
            previewLink: item.volumeInfo.previewLink || "",
        })) || [];

        res.json({ books });
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

export default router;
