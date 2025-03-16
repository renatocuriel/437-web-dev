import React, { useEffect, useState } from "react";
import { fetchFinishedBooks } from "../providers/BookProvider";

const FinishedBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchFinishedBooks();
      setBooks(data || []);
    };
    loadBooks();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">✅ Finished Books</h2>
      <ul className="text-sm text-gray-600 dark:text-gray-300">
        {books.length > 0 ? (
          books.map((book) => <li key={book._id}>{book.title}</li>)
        ) : (
          <p className="text-gray-500">No books finished yet.</p>
        )}
      </ul>
    </div>
  );
};

export default FinishedBooks;
