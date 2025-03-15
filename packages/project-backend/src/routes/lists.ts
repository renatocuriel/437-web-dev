import express from "express";
import { verifyAuthToken } from "../routes/auth";
import { List } from "../models/List";

const router = express.Router();

// 📚 Get all lists for the logged-in user
router.get("/", verifyAuthToken, async (req, res) => {
    try {
        const userId = res.locals.token._id;
        const lists = await List.find({ userId }).populate("books");
        res.json(lists);
    } catch (err) {
        console.error("Error fetching lists:", err);
        res.status(500).json({ error: "Failed to fetch lists" });
    }
});

// ➕ Create a new list
router.post("/", verifyAuthToken, async (req, res) => {
    try {
        const { listName } = req.body;
        const userId = res.locals.token._id;

        const newList = new List({ userId, listName, books: [] });
        await newList.save();

        res.status(201).json(newList);
    } catch (err) {
        console.error("Error creating list:", err);
        res.status(500).json({ error: "Failed to create list" });
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

export default router;
