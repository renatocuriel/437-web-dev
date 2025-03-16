
import { useState, useEffect } from "react";
import { fetchCurrentlyReading, updateCurrentPage, removeCurrentlyReading, setCurrentlyReading } from "../providers/CurrentlyReadingProvider";
import { addBook } from "../providers/BookProvider";
import AddCurrentlyReading from "../components/AddCurrentlyReading";

const CurrentlyReadingPage = () => {
  const [currentlyReading, setCurrentlyReadingBook] = useState(null);
  const [currentPage, setCurrentPage] = useState("");

  // 🟢 Fetch currently reading book on mount
  useEffect(() => {
    const loadCurrentlyReading = async () => {
      const book = await fetchCurrentlyReading();
      if (book && book.bookId) {
        setCurrentlyReadingBook(book.bookId);
        setCurrentPage(book.currentPage);
      }
    };
    loadCurrentlyReading();
  }, []);

  // 🔄 Handle updating reading progress
  const handleUpdateProgress = async (newPage) => {
    await updateCurrentPage(newPage);
    setCurrentPage(newPage);
  };

  // ✅ Handle finishing the book (removes from currently reading)
  const handleFinishBook = async () => {
    await removeCurrentlyReading();
    setCurrentlyReadingBook(null);
    setCurrentPage(1);
  };

  // ➕ Handle manually adding a book and setting it as currently reading
  const handleManualAddBook = async (bookData) => {
    const newBook = await addBook(bookData);

    if (newBook && newBook._id) {
      await setCurrentlyReading(newBook._id);
      setCurrentlyReadingBook(newBook);
    }
  };

  // 🧮 Calculate progress percentage
  const progress = currentlyReading
    ? ((currentPage / currentlyReading.totalPages) * 100).toFixed(2)
    : 0;

  return (
    <div className="container mt-6 md:mt-0">
      <h1 className="hidden text-2xl font-bold text-center mb-6">Currently Reading</h1>

      <div className="bg-container p-6 rounded-lg shadow-md">
        <div className="border-highlight p-6 rounded-lg">
          {currentlyReading ? (
            <div className="flex flex-col md:flex-row items-center md:items-start">
              {/* Book Cover */}
              <img
                src={currentlyReading.coverImage}
                alt={currentlyReading.title}
                className="aspect-[2/3] object-cover border-highlight rounded-xl shadow-md"
              />

              {/* Book Details */}
              <div className="md:ml-6 mt-4 md:mt-0 w-full">
                <h1 className="text-center md:text-left text-2xl font-bold">{currentlyReading.title}</h1>
                <h2 className="text-center md:text-left text-lg text-gray-600 dark:text-gray-300">
                  {currentlyReading.author.join(", ")}
                </h2>
                <p className="mt-2 text-sm">
                  {currentlyReading.description || "No description available."}
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
                    value={currentPage}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      if (newValue >= 0 && newValue <= currentlyReading.totalPages) {
                        handleUpdateProgress(newValue);
                      }
                    }}
                    className="w-full p-2 mt-1 border rounded-lg dark:bg-gray-800 border-highlight"
                    placeholder={`0 / ${currentlyReading.totalPages}`}
                  />
                  <span className="text-gray-500 dark:text-gray-400">/ {currentlyReading.totalPages}</span>

                </div>

                {/* Finish Button */}
                <button onClick={handleFinishBook} className="btn-primary md:mx-0 mx-auto block mt-4">
                  Mark as Finished
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No book currently being read.</p>
          )}
        </div>
      </div>

      {/* ➕ Manually Add a Book */}
      <div className="bg-container mt-8 rounded-lg shadow-md">
        <AddCurrentlyReading onUpdate={handleManualAddBook} />
      </div>
    </div>
  );
};

export default CurrentlyReadingPage;
