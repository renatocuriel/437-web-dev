import express from "express";
import { verifyAuthToken } from "../routes/auth";
import { List } from "../models/List";
import { User } from "../models/User";

const router = express.Router();

// ➕ Create a new list
router.post("/", verifyAuthToken, async (req, res) => {
    try {
        const { listName } = req.body;
        const user = await User.findOne({ username: res.locals.token.username });
        const userId = user?._id;

        await List.findOneAndUpdate(
            { listName },
            { userId, listName },
            { upsert: true, new: true}
        );

        res.status(201).json({ message: "List created successfully" });
    } catch (err) {
        console.error("Error creating list:", err);
        res.status(500).json({ error: "Failed to create list" });
    }
});

// 📚 Get all lists for the logged-in user
router.get("/", verifyAuthToken, async (req, res) => {
    try {
        const user = await User.findOne({ username: res.locals.token.username });
        const userId = user?._id;
        const lists = await List.find({ userId }).populate("books");
        res.json(lists);
    } catch (err) {
        console.error("Error fetching lists:", err);
        res.status(500).json({ error: "Failed to fetch lists" });
    }
});

// 📌 Add a book to a list
router.post("/:listId/add", verifyAuthToken, async (req, res) => {
    try {
        const { bookId } = req.body;
        const { listId } = req.params;

        const updatedList = await List.findByIdAndUpdate(
            listId,
            { $addToSet: { books: bookId } },
            { new: true }
        ).populate("books");

        res.json(updatedList);
    } catch (err) {
        console.error("Error adding book to list:", err);
        res.status(500).json({ error: "Failed to add book to list" });
    }
});

// ❌ Remove a book from a list
router.delete("/:listId/book/:bookId", verifyAuthToken, async (req, res) => {
    try {
        const { listId, bookId } = req.params;

        const updatedList = await List.findByIdAndUpdate(
            listId,
            { $pull: { books: bookId } }, // Removes the book from the list
            { new: true }
        ).populate("books");

        if (!updatedList) {
            res.status(404).json({ error: "List not found" });
            return;
        }

        res.json(updatedList);
    } catch (err) {
        console.error("Error removing book from list:", err);
        res.status(500).json({ error: "Failed to remove book from list" });
    }
});

// 🗑 Delete a list
router.delete("/:listId", verifyAuthToken, async (req, res) => {
    try {
        const { listId } = req.params;
        const deletedList = await List.findByIdAndDelete(listId);

        if (!deletedList) {
            res.status(404).json({ error: "List not found" });
            return;
        }

        res.json({ message: "List deleted successfully" });
    } catch (err) {
        console.error("Error deleting list:", err);
        res.status(500).json({ error: "Failed to delete list" });
    }
});

export default router;
