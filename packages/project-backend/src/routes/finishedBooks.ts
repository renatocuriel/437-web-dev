import express from "express";
import { verifyAuthToken } from "../routes/auth";
import { FinishedBooks } from "../models/FinishedBooks";

const router = express.Router();

// 📚 Get all finished books for a user
router.get("/", verifyAuthToken, async (req, res) => {
    try {
        const userId = res.locals.token._id;
        const finished = await FinishedBooks.findOne({ userId }).populate("books");
        res.json(finished || { books: [] });
    } catch (err) {
        console.error("Error fetching finished books:", err);
        res.status(500).json({ error: "Failed to fetch finished books" });
    }
});

// ✅ Mark a book as finished
router.post("/", verifyAuthToken, async (req, res) => {
    try {
        const { bookId } = req.body;
        const userId = res.locals.token._id;

        await FinishedBooks.findOneAndUpdate(
            { userId },
            { $addToSet: { books: bookId } },
            { upsert: true, new: true }
        );

        res.json({ message: "Book marked as finished." });
    } catch (err) {
        console.error("Error marking book as finished:", err);
        res.status(500).json({ error: "Failed to mark book as finished" });
    }
});

export default router;
