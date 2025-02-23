import { useState } from "react";
import AddCurrentlyReading from "../components/AddCurrentlyReading";

const CurrentlyReadingPage = () => {
  // const [currentPage, setCurrentPage] = useState(150); // Mock data
  // const totalPages = 322;

  const [currentlyReading, setCurrentlyReading] = useState({
    title: "The Mythical Man-Month",
    author: "Frederick P. Brooks Jr.",
    cover: "https://m.media-amazon.com/images/I/51TG5T+dd7L._SY445_SX342_.jpg",
    totalPages: 322,
    currentPage: 150, // Mock progress
    genre: "Software Engineering",
    description:
      "A classic book on software engineering, discussing project management, team coordination, and the difficulties of large-scale software development.",
  });

  // Method to update only the current page
  const updateCurrentPage = (newPage) => {
    if (newPage >= 0 && newPage <= currentlyReading.totalPages) {
      setCurrentlyReading((prev) => ({
        ...prev,
        currentPage: newPage,
      }));
    }
  };

  // const progress = Math.round((currentPage / totalPages) * 100);
  const progress = ((currentlyReading.currentPage / currentlyReading.totalPages) * 100).toFixed(2);

  return (
    <div className="container mt-6 md:mt-0">
      <div className ="bg-container p-6 rounded-lg shadow-md">
        <div className="border-highlight p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* Book Cover */}
            <img
              src={currentlyReading.cover}
              alt={currentlyReading.title}
              // className="w-40 h-60 rounded-lg shadow-md border-highlight"
              className="aspect-[2/3] object-cover border-highlight rounded-xl shadow-md"
            />

            {/* Book Details */}
            <div className="md:ml-6 mt-4 md:mt-0 w-full">
              <h1 className="text-center md:text-left text-2xl font-bold">{currentlyReading.title}</h1>
              <h2 className="text-center md:text-left text-lg text-gray-600 dark:text-gray-300">
                {currentlyReading.author}
              </h2>
              <p className="mt-2 text-sm">
                {currentlyReading.description
                  ? currentlyReading.description
                  : "No description available."}
              </p>

              {/* Progress Bar */}
              <div className="mt-4">
                <label className="block text-sm font-medium">
                  Progress: {progress}%
                </label>
                <div className="mt-1 w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Page Input */}
              <div className="mt-4">
                <label className="block text-sm font-medium">
                  Enter current page:
                </label>
                <input
                  type="number"
                  value={currentlyReading.currentPage}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue >= 0 && newValue <= currentlyReading.totalPages) {
                      updateCurrentPage(newValue);
                    }
                  }}
                  className="w-full p-2 mt-1 border rounded-lg dark:bg-gray-800 border-highlight"
                  placeholder={`0 / ${currentlyReading.totalPages}`}
                />
                {currentlyReading.currentPage && (
                  <span className="text-gray-500 dark:text-gray-400">/ {currentlyReading.totalPages}</span>
                )}
              </div>

              {/* Finish Button */}
              <button className="btn-primary md:mx-0 mx-auto block mt-4">Mark as Finished</button>
            </div>
          </div>
        </div>
      </div>
      <div className ="bg-container mt-8 rounded-lg shadow-md">
          <AddCurrentlyReading onUpdate={setCurrentlyReading}/>
      </div>
    </div>
  );
};

export default CurrentlyReadingPage;
  