import { useState } from "react";
import booksMockData from "../assets/mockBooks.json"; // Mock book data for now
import mockSearchResults from "../assets/mockSearchResults.json"; // Mock search results for now

const SuggestedBooksPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Suggested Books</h1>
      
      {/* Search Bar */}
      <div className="flex bg-container justify-center mb-6">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-lg p-3 border rounded-lg dark:bg-gray-800 border-highlight"
        />
        <button onClick={handleSearch} className="ml-3 btn-primary">Search</button>
      </div>
      
      {/* Auto-suggested books carousel */}
      <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
      <div className="flex overflow-x-auto space-x-4 justify-between p-2 bg-container border-highlight rounded-lg">
        {booksMockData.slice(0, 5).map((book, index) => (
          <div key={index} className="min-w-[150px]">
            <img src={book.cover} alt={book.title} className="w-36 h-52 object-cover rounded-lg shadow-md border-highlight hover:scale-105 transition-transform" />
            <p className="text-sm mt-2 text-center">{book.title}</p>
          </div>
        ))}
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
            <div key={index} className="bg-container p-4 rounded-lg shadow-md border-highlight hover:scale-105 transition-transform">
              <img src={book.cover} alt={book.title} className="w-full h-48 object-cover rounded-lg" />
              <h3 className="text-lg font-bold mt-2">{book.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{book.author}</p>
              <button className="btn-primary mt-3 w-full">Add to List</button>
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
