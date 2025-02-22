import { useState, useEffect } from "react";

const CurrentlyReadingPage = () => {
  const [currentPage, setCurrentPage] = useState(150); // Mock data
  const totalPages = 322;
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState("0d 0h 0m");

  useEffect(() => {
    const savedStartTime = localStorage.getItem("readingStartTime");
    if (savedStartTime) {
      setStartTime(new Date(savedStartTime));
    } else {
      const now = new Date();
      setStartTime(now);
      localStorage.setItem("readingStartTime", now);
    }
  }, []);

  useEffect(() => {
    if (startTime) {
      const timer = setInterval(() => {
        const now = new Date();
        const diff = now - new Date(startTime);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);

        setElapsedTime(`${days}d ${hours}h ${minutes}m`);
      }, 60000); // Update every minute

      return () => clearInterval(timer);
    }
  }, [startTime]);

  const progress = Math.round((currentPage / totalPages) * 100);

  return (
    <div className="container mx-auto p-6">
      <div className ="bg-container p-6 rounded-lg shadow-md">
      <div className="border-highlight p-6 rounded-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Book Cover */}
          <img
            src="https://m.media-amazon.com/images/I/71XfsHyh2eL._SL1500_.jpg"
            alt="The Mythical Man-Month"
            className="w-40 h-60 rounded-lg shadow-md border-highlight"
          />

          {/* Book Details */}
          <div className="md:ml-6 mt-4 md:mt-0 w-full">
            <h1 className="text-2xl font-bold">The Mythical Man-Month</h1>
            <h2 className="text-lg text-gray-600 dark:text-gray-300">
              Frederick P. Brooks Jr.
            </h2>
            <p className="mt-2 text-sm">
              A classic book on software engineering, discussing project
              management, team coordination, and the difficulties of large-scale
              software development.
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
                onChange={(e) => setCurrentPage(e.target.value)}
                className="w-full p-2 mt-1 border rounded-lg dark:bg-gray-800 border-highlight"
              />
            </div>

            {/* Reading Time */}
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Reading for: {elapsedTime}
            </p>

            {/* Finish Button */}
            <button className="btn-primary mt-4">Mark as Finished</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CurrentlyReadingPage;
  