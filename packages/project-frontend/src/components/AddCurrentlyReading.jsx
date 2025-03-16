import { useState } from "react";

const AddCurrentlyReading = ({ onUpdate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Prevents duplicate submissions

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate input
    if (!title || !author || !totalPages || isNaN(totalPages) || totalPages <= 0) {
      alert("Please enter valid book details.");
      return;
    }

    setLoading(true); // 🔄 Prevent duplicate submissions

    try {
      // ✅ Call the `onUpdate` function (which connects to backend)
      await onUpdate({
        title,
        author: author.split(",").map((a) => a.trim()), // ✅ Supports multiple authors
        coverImage: cover || "https://via.placeholder.com/150", // Default placeholder
        currentPage: 1, // Always starts at page 1
        totalPages: parseInt(totalPages, 10),
        genre: genre ? genre.split(",").map((g) => g.trim()) : [], // ✅ Supports multiple genres
        description: description || "No description available.",
      });

      // ✅ Reset form fields after successful update
      setTitle("");
      setAuthor("");
      setCover("");
      setTotalPages("");
      setGenre("");
      setDescription("");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try again.");
    } finally {
      setLoading(false); // ✅ Enable button again
    }
  };

  return (
    <div className="bg-container border-highlight p-6 rounded-lg">
      <h2 className="text-xl text-center font-bold mb-4">Update Current Read</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-800 border-highlight"
        />
        <input
          type="text"
          placeholder="Author(s) (comma-separated)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-800 border-highlight"
        />
        <input
          type="text"
          placeholder="Cover Image URL (optional)"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-800 border-highlight"
        />
        <input
          type="number"
          placeholder="Total Pages"
          value={totalPages}
          onChange={(e) => setTotalPages(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-800 border-highlight"
        />
        <input
          type="text"
          placeholder="Genre(s) (optional, comma-separated)"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-800 border-highlight"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-800 border-highlight"
        />
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Updating..." : "Start Reading"}
        </button>
      </form>
    </div>
  );
};

export default AddCurrentlyReading;
