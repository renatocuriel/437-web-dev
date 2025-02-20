import React from "react";

const SuggestedBooks = ({ books, limit }) => {
  const displayedBooks = limit ? books.slice(0, limit) : books;

  return (
    <div className="border-highlight p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">📚 Suggested Books</h2>
      <ul>
        {displayedBooks.map((book, index) => (
          <li key={index} className="py-2 border-b last:border-none">
            {book}
          </li>
        ))}
      </ul>
      {limit && (
        <div className="mt-4 text-right">
          <a href="/suggested-books" className="hover:underline">
            View More →
          </a>
        </div>
      )}
    </div>
  );
};

export default SuggestedBooks;
