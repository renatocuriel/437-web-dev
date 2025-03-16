import React, { useEffect, useState } from "react";
import { fetchLists } from "../providers/ListProvider";

const BookLists = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const loadLists = async () => {
      const data = await fetchLists();
      setLists(data || []);
    };
    loadLists();
  }, []);

  return (
    <div className="overflow-x-auto whitespace-nowrap">
      <h2 className="text-xl font-bold mb-2">📚 My Lists</h2>
      <div className="flex space-x-4">
        {lists.length > 0 ? (
          lists.map((list) => (
            <div key={list._id} className="bg-container p-4 border-highlight rounded-lg min-w-[200px]">
              <h3 className="font-semibold">{list.name}</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {list.books.slice(0, 3).map((book) => (
                  <li key={book._id}>{book.title}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No lists found.</p>
        )}
      </div>
    </div>
  );
};

export default BookLists;
