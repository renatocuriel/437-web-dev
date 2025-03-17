import { useState, useEffect, useRef } from "react";
import { fetchLists, addBookToList } from "../providers/ListProvider";
import { addBook, fetchRecommendedBooks } from "../providers/BookProvider";
import { setCurrentlyReading } from "../providers/CurrentlyReadingProvider";
import mockSearchResults from "../assets/loadingSearchResults.json";

const SuggestedBooksPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [recommendedGenre, setRecommendedGenre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [carouselDropdown, setCarouselDropdown] = useState(null);
  const [userLists, setUserLists] = useState([]);
  const dropdownRef = useRef(null);
  const carouselDropdownRef = useRef(null);

  // Click outside event listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(null);
      }

      if (
        carouselDropdownRef.current &&
        !carouselDropdownRef.current.contains(event.target)
      ) {
        setCarouselDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch user lists on mount
  useEffect(() => {
    const loadLists = async () => {
      const lists = await fetchLists();
      setUserLists(lists);
    };
    loadLists();
  }, []);

  // Fetch recommended books when the page loads
  useEffect(() => {
    const loadRecommendedBooks = async () => {
      const { books, genre } = await fetchRecommendedBooks();
      setRecommendedBooks(books);
      setRecommendedGenre(genre);
    };

    loadRecommendedBooks();
  }, []);

  // Handle search query
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);

    try {
      const response = await fetch(`/api/google-books/search?q=${encodeURIComponent(searchQuery)}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });

      if (!response.ok) throw new Error("Failed to fetch books");

      const data = await response.json();
      console.log("Books data:", data);
      setSearchResults(data.books || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a book to the database before adding it to the list
  const handleAddBookToList = async (book, listId) => {
    try {
      const savedBook = await addBook({
        title: book.title,
        author: book.authors,
        coverImage: book.coverImage,
        genre: book.genre || [],
        totalPages: book.totalPages || 0,
        description: book.description || "No description available.",
        previewLink: book.previewLink || "",
      });

      if (!savedBook || !savedBook._id) {
        console.error("Failed to retrieve book ID after adding.");
        return;
      }

      // Now add the book to the selected list
      await addBookToList(listId, savedBook._id);
      alert(`Added "${book.title}" to list.`);
    } catch (error) {
      console.error("Error adding book to list:", error);
    }
  };

  // Set a book as currently reading
  const handleSetCurrentlyReading = async (book) => {
    try {
      const savedBook = await addBook({
        title: book.title,
        author: book.authors,
        coverImage: book.coverImage,
        genre: book.genre || [],
        totalPages: book.totalPages || 0,
        description: book.description || "No description available.",
        previewLink: book.previewLink || "",
      });

      if (!savedBook || !savedBook._id) {
        console.error("Failed to retrieve book ID after adding.");
        return;
      }

      await setCurrentlyReading(savedBook._id);
      alert(`Started reading "${book.title}".`);
    } catch (error) {
      console.error("Error setting currently reading:", error);
    }
  };

  return (
    <div className="mt-6 md:mt-0">
      <h1 className="hidden text-2xl font-bold text-center mb-6">Suggested Books</h1>

      {/* Search Bar */}
      <div className="bg-container mb-6">
        <div className="flex p-3 border-highlight rounded-lg justify-center">
          <input
            type="text"
            placeholder="Search for books, author, genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-lg p-3 border rounded-lg dark:bg-gray-800 border-highlight"
          />
          <button onClick={handleSearch} className="ml-3 btn-primary">Search</button>
        </div>
      </div>

      {/* Auto-suggested books carousel */}
      <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Based on your interest in <strong>{recommendedGenre || "various genres"}</strong>
      </p>

      <div className="bg-container mb-6">
        <div className="flex overflow-x-auto space-x-4 justify-between p-4 border-highlight rounded-lg">
          {recommendedBooks.length > 0 ? (
            recommendedBooks.slice(0, 5).map((book, index) => (
              <div key={index} className="relative min-w-[150px] items-center flex flex-col justify-between">
                <img
                  src={book.coverImage} 
                  alt={book.title}
                  className="w-36 h-52 rounded-sm shadow-md border-highlight hover:scale-105 transition-transform" 
                  onClick={() => setCarouselDropdown(carouselDropdown === index ? null : index)}
                />

                <p className="text-md mt-2 text-center">{book.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-3 text-center">{book.genre.join(", ")}</p>

                {carouselDropdown === index && (
                  <div ref={carouselDropdownRef} className="absolute bg-container border-highlight rounded-lg mb-2 w-40 divide-y divide-gray-600 dark:divide-gray-700">
                    {/* Set as Currently Reading */}
                    <button 
                      className="block w-full text-center p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-t-lg cursor-pointer font-semibold"
                      onClick={() => {
                        handleSetCurrentlyReading(book);
                        setCarouselDropdown(null);
                      }}
                    >
                      Set as Currently Reading
                    </button>

                    {/* User Lists */}
                    <div className="border-t border-gray-400 dark:border-gray-700">
                      {userLists.map((list) => (
                        <button 
                          key={list._id}
                          className="block w-full text-center p-2 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => {
                            handleAddBookToList(book, list._id);
                            setCarouselDropdown(null);
                          }}
                        >
                          {list.listName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center w-full">No recommendations found. Create lists and add books to get suggestions based on your tastes!</p>
          )}
        </div>
      </div>

      {/* Search Results Grid */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Search Results</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          // Loading placeholders
          mockSearchResults.map((book, index) => (
            <div key={index} className="animate-pulse bg-container p-4 rounded-lg shadow-md border-highlight">
              <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
              <h3 className="mt-2 text-gray-400 dark:text-gray-600">{book.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-600">{book.authors?.join(", ")}</p>
            </div>
          ))
        ) : searchResults.length > 0 ? (
          // Actual search results
          searchResults.map((book, index) => (
            <div key={index} className="bg-container p-4 rounded-lg shadow-md border-highlight hover:scale-105 transition-transform flex flex-col h-full">
              <img src={book.coverImage} alt={book.title} className="w-full aspect-[2/3] rounded-sm" />
              <div className="flex flex-col justify-between h-full">
                <h3 className="text-lg text-center font-bold mt-2">{book.title}</h3>
                <p className="text-sm text-center text-gray-600 dark:text-gray-300">{book.authors?.join(", ")}</p>
                {/* Dropdown for adding to list */}
                <div className="relative mt-3">
                  <button 
                    className="btn-primary w-full"
                    onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}
                  >
                    Add to List
                  </button>

                  {dropdownOpen === index && (
                    <div ref={dropdownRef} className="absolute bottom-full left-0 right-0 bg-container border border-highlight rounded-lg shadow-lg mb-2 divide-y divide-gray-600 dark:divide-gray-700">
                      {userLists.map((list) => (
                        <button 
                          key={list._id}
                          className="block w-full text-center p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
                          onClick={() => {
                            handleAddBookToList(book, list._id);
                            setDropdownOpen(null);
                          }}
                        >
                          {list.listName}
                        </button>
                      ))}
                    </div>
                  )}

                  <button 
                    className="btn-primary w-full mt-3"
                    onClick={() => setCurrentlyReading(book)}
                  >
                    Start Reading
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          // No results found message
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SuggestedBooksPage;
