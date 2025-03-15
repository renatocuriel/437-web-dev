import express from "express";
import { verifyAuthToken } from "../routes/auth";
import { FinishedBooks } from "../models/FinishedBooks";
import { User } from "../models/User";

const router = express.Router();

// 📚 Get all finished books for a user
router.get("/", verifyAuthToken, async (req, res) => {
    try {
        const user = await User.findOne( {username: res.locals.token.username} );
        const userId = user?._id;

        const finished = await FinishedBooks.findOne({ userId }).populate("books");
        res.json(finished || { books: [] });
    } catch (err) {
        console.error("Error fetching finished books:", err);
        res.status(500).json({ error: "Failed to fetch finished books" });
    }
});

export default router;
