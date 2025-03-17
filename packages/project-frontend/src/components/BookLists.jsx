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
    <div className="h-[420px] overflow-y-auto space-y-6 scrollbar-hide"> 
      {/* Vertical Scrolling Container */}
      {lists.length > 0 ? (
        lists.map((list) => (
          <div key={list._id} className="bg-container border-highlight p-4 rounded-lg shadow-md">
            <h3 className="font-semibold italic text-lg mb-3">{list.listName}</h3>
            
            {/* Scrollable Horizontal Books Container */}
            <div className="overflow-x-auto flex space-x-4 p-2 snap-x scrollbar-hide">
              {list.books.slice(0, 10).map((book) => (
                <div key={book._id} className="min-w-[150px] flex-col justify-center items-center snap-start border-highlight rounded-lg shadow-md overflow-hidden">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-[150px] h-[225px] object-cover"
                  />
                  <div className="p-2 text-center">
                    <p className="text-sm font-semibold">{book.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">{book.author || "Unknown Author"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="bg-container border-highlight text-center text-gray-500">No lists found.</p>
      )}
    </div>
  );
};

export default BookLists;
