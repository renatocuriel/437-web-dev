import { useState } from "react";

const AddCurrentlyReading = ({ onUpdate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!title || !author || !totalPages || isNaN(totalPages) || totalPages <= 0) {
      alert("Please enter valid book details.");
      return;
    }

    // Update currently reading book
    onUpdate({
      title,
      author,
      cover: cover || "https://via.placeholder.com/150", // Default placeholder if no cover URL
      currentPage: 0,
      totalPages: parseInt(totalPages, 10),
      genre,
      description,
    });

    // Reset form fields
    setTitle("");
    setAuthor("");
    setCover("");
    setTotalPages("");
    setGenre("");
    setDescription("");
  };

  return (
    <div className="bg-container border-highlight p-6 rounded-lg">
      <h2 className="text-xl text-center font-bold mb-4">Update your Current Read</h2>
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
          placeholder="Author"
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
          placeholder="Genre (optional)"
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
        <button type="submit" className="btn-primary w-full">
          Start Reading
        </button>
      </form>
    </div>
  );
};

export default AddCurrentlyReading;
