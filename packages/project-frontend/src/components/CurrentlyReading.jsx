import React from "react";

const CurrentlyReading = () => {
  const book = {
    title: "The Mythical Man-Month",
    author: "Frederick P. Brooks Jr.",
    cover: "https://m.media-amazon.com/images/I/71XfsHyh2eL._SL1500_.jpg", // Example image
    currentPage: 150,
    totalPages: 322,
  };

  const progress = Math.round((book.currentPage / book.totalPages) * 100);

  return (
    <div className="border-highlight p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center">
      <img src={book.cover} alt={book.title} className="w-24 h-32 md:w-36 md:h-48 border-highlight rounded-lg shadow-md" />
      <div className="ml-4">
        <h2 className="text-xl font-bold">Currently Reading</h2>
        <p className="font-semibold">{book.title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{book.author}</p>
        
        {/* Progress Bar */}
        <div className="mt-2 w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1">{progress}% complete</p>
      </div>
    </div>
  );
};

export default CurrentlyReading;
