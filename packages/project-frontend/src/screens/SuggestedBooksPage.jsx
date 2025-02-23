import { useState } from "react";
import booksMockData from "../assets/mockBooks.json"; // Mock book data for now
import mockSearchResults from "../assets/mockSearchResults.json"; // Mock search results for now

const SuggestedBooksPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  
  // Simulated search function
  const handleSearch = () => {
    setIsLoading(true);
    setSearchResults(mockSearchResults);

    setTimeout(() => {
      const filteredBooks = booksMockData.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredBooks);
      setIsLoading(false);
    }, 2000); // Simulate loading time
  };

  const userLists = ["Favorites", "Sci-Fi", "Maybe Later"];

  return (
    <div className="mt-6 md:mt-0">
      <h1 className="text-2xl font-bold text-center mb-6">Suggested Books</h1>
      
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
      <div className="bg-container mb-6">
        <div className="flex overflow-x-auto space-x-4 justify-between p-4 border-highlight rounded-lg">
          {booksMockData.slice(0, 9).map((book, index) => (
            <div key={index} className="min-w-[150px] items-center flex flex-col">
              <img src={book.cover} alt={book.title} className="w-36 h-52 object-cover rounded-sm shadow-md border-highlight hover:scale-105 transition-transform" />
              <p className="text-sm mt-2 text-center">{book.title}</p>
            </div>
          ))}
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
              <p className="text-sm text-gray-500 dark:text-gray-600">{book.author}</p>
            </div>
          ))
        ) : searchResults.length > 0 ? (
          // Actual search results
          searchResults.map((book, index) => (
            <div key={index} className="bg-container p-4 rounded-lg shadow-md border-highlight hover:scale-105 transition-transform flex flex-col h-full">
              <img src={book.cover} alt={book.title} 
              // className="w-full h-48 object-cover rounded-lg" 
              className="w-full aspect-[2/3] rounded-sm"
              />
              <div className="flex flex-col justify-between h-full">
                <h3 className="text-lg text-center font-bold mt-2">{book.title}</h3>
                <p className="text-sm text-center text-gray-600 dark:text-gray-300">{book.author}</p>
                {/* Dropdown for adding to list */}
                <div className="relative mt-3">
                  <button 
                    className="btn-primary w-full"
                    onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}
                  >
                    Add to List
                  </button>

                  {dropdownOpen === index && (
                    <div className="absolute bottom-full left-0 right-0 bg-container border border-highlight rounded-lg shadow-lg mb-2 divide-y divide-gray-600 dark:divide-gray-700">
                      {userLists.map((list, listIndex) => (
                        <button 
                          key={listIndex}
                          className="block w-full text-center p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
                          onClick={() => {
                            alert(`Added "${book.title}" to "${list}"`);
                            setDropdownOpen(null);
                          }}
                        >
                          {list}
                        </button>
                      ))}
                    </div>
                  )}
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
