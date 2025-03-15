import express from "express";
import { verifyAuthToken } from "../routes/auth";
import { Book } from "../models/Book"; // Import Mongoose Model

const router = express.Router();

// 📚 Get all books in database (optional filter by title/author)
router.get("/", verifyAuthToken, async (req, res) => {
    try {
        const { search } = req.query;
        const filter = search ? { title: { $regex: search, $options: "i" } } : {};
        const books = await Book.find(filter);
        res.json(books);
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

// // 📖 Add a new book to the database
// router.post("/", verifyAuthToken, async (req, res) => {
//     try {
//         const book = new Book(req.body);
//         await book.save();
//         res.status(201).json(book);
//     } catch (err) {
//         console.error("Error adding book:", err);
//         res.status(500).json({ error: "Failed to add book" });
//     }
// });

// 📖 Add a new book (if it doesn't already exist)
router.post("/", verifyAuthToken, async (req, res) => {
    try {
        const { title, author, coverImage } = req.body;

        // ✅ Check if the book already exists in the database
        let book = await Book.findOne({ title, author });

        if (!book) {
            book = new Book(req.body); // ✅ Create a new book only if it doesn't exist
            await book.save();
            console.log(`📚 New book added: ${title}`);
        } else {
            console.log(`🔍 Book already exists: ${title}`);
        }

        res.status(201).json(book); // ✅ Return the book (new or existing)
    } catch (err) {
        console.error("❌ Error adding book:", err);
        res.status(500).json({ error: "Failed to add book" });
    }
});

export default router;
