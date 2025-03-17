// import React, { useEffect, useState } from "react";
// import { fetchFinishedBooks } from "../providers/BookProvider";

// const FinishedBooks = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const loadBooks = async () => {
//       const data = await fetchFinishedBooks();
//       setBooks(data || []);
//     };
//     loadBooks();
//   }, []);

//   return (
//     <div className="bg-container border-highlight p-4 rounded-lg shadow-md">
//       {books.length > 0 ? (
//         // Horizontal scrolling container
//         <div className="overflow-x-auto flex space-x-4 p-2 snap-x scrollbar-hide">
//           {books.map((book) => (
//             <div key={book._id} className="min-w-[150px] flex flex-col items-center snap-start border-highlight rounded-lg shadow-md overflow-hidden">
//               <div className="w-[150px] h-[225px] flex justify-center items-center">
//                 <img
//                   src={book.coverImage}
//                   alt={book.title}
//                   className="w-full h-full object-cover border-highlight rounded-lg"
//                 />
//               </div>
//               <div className="p-2 text-center">
//                 <p className="text-sm font-semibold">{book.title}</p>
//                 <p className="text-xs text-gray-500 dark:text-gray-300">{book.author || "Unknown Author"}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 text-center">No books finished yet.</p>
//       )}
//     </div>
//   );
// };

// export default FinishedBooks;

import React, { useEffect, useState } from "react";
import { fetchFinishedBooks } from "../providers/BookProvider";

const FinishedBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchFinishedBooks();
      setBooks(data || []);
    };
    loadBooks();
  }, []);

  return (
    <div className="bg-container border-highlight p-4 rounded-lg shadow-md">
      {/* Horizontal Scroll Container */}
      <div className="overflow-x-auto flex space-x-4 p-2 snap-x scrollbar-hide">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="border-highlight min-w-[150px] flex-col justify-center items-center snap-start rounded-lg shadow-md overflow-hidden">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-[150px] h-[225px] object-cover"
              />
              <div className="p-2 text-center">
                <p className="text-sm text-wrap font-semibold">{book.title}</p>
                <p className="text-xs text-wrap text-gray-500 dark:text-gray-300">{book.author || "Unknown Author"}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No finished books yet.</p>
        )}
      </div>
    </div>
  );
};

export default FinishedBooks;
