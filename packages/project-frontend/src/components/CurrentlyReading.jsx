import React, { useEffect, useState } from "react";
import { fetchCurrentlyReading } from "../providers/CurrentlyReadingProvider";

const CurrentlyReading = () => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      const data = await fetchCurrentlyReading();
      if (data) {
        setBook(data);
      }
    };
    loadBook();
  }, []);

  if (!book) return <p className="text-center text-gray-500">No book currently being read.</p>;

  const progress = Math.round((book.currentPage / book.totalPages) * 100);

  return (
    <div className="flex flex-col md:flex-row items-center w-full h-full">
      <div className="w-32 md:w-48 flex-shrink-0">
        <img src={book.cover} alt={book.title} className="w-full h-auto aspect-[2/3] object-cover border-highlight rounded-xl shadow-md" />
      </div>
      <div className="flex flex-col items-center md:items-start mt-4 md:ml-6 w-full">
        <h2 className="text-xl font-bold">Currently Reading</h2>
        <p className="font-semibold">{book.title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{book.author}</p>
        <div className="mt-2 w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-sm mt-1">{progress}% complete</p>
      </div>
    </div>
  );
};

export default CurrentlyReading;
