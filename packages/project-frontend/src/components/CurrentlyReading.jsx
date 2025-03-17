// import React, { useEffect, useState } from "react";
// import { fetchCurrentlyReading } from "../providers/CurrentlyReadingProvider";

// const CurrentlyReading = () => {
//   const [book, setBook] = useState(null);

//   useEffect(() => {
//     const loadBook = async () => {
//       const data = await fetchCurrentlyReading();
//       if (data) {
//         setBook(data);
//         console.log(data);
//       }
//     };
//     loadBook();
//   }, []);

//   if (!book) return <p className="text-center text-gray-500">No book currently being read.</p>;

//   const progress = Math.round((book.currentPage / book.bookId.totalPages) * 100);

//   return (
//       <div className="flex flex-col md:flex-row items-center w-full h-full">
//       <div className="w-32 md:w-48 flex-shrink-0">
//         <img src={book.bookId.coverImage} alt={book.bookId.title} className="w-full h-auto aspect-[2/3] object-cover border-highlight rounded-xl shadow-md" />
//       </div>
//       <div className="flex flex-col text-center items-center mt-4 md:ml-6 w-full">
//         <h2 className="text-xl font-bold pb-6">Currently Reading</h2>
//         <p className="font-semibold pb-4">{book.bookId.title}</p>
//         <p className="text-sm text-gray-600 dark:text-gray-300 pb-2">{book.bookId.author}</p>
//         <div className="mt-2 w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
//           <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
//         </div>
//         <p className="text-sm mt-1">{progress}% complete</p>
//       </div>
//     </div>
//   );
// };

// export default CurrentlyReading;

// import React, { useEffect, useState } from "react";
// import { fetchCurrentlyReading } from "../providers/CurrentlyReadingProvider";

// const CurrentlyReading = () => {
//   const [book, setBook] = useState(null);

//   useEffect(() => {
//     const loadBook = async () => {
//       const data = await fetchCurrentlyReading();
//       if (!data || Object.keys(data).length === 0) {
//         setBook(null);
//       }
//       else {
//         setBook(data);
//         console.log(data);
//       }
//     };
//     loadBook();
//   }, []);

//   return (
//     <>
//     <div className="bg-container border-highlight flex flex-col md:flex-row items-center w-full ">
//       {book ? (
//         <>
//           {/* Book Cover */}
//           <div className="w-32 md:w-48 flex-shrink-0">
//             <img
//               src={book.bookId.coverImage}
//               alt={book.bookId.title}
//               className="w-full h-auto aspect-[2/3] object-cover border-highlight rounded-xl shadow-md"
//             />
//           </div>
//           {/* Book Details */}
//           <div className="flex flex-col text-center items-center mt-4 md:ml-6 w-full">
//             <p className="font-semibold text-xl pb-4">{book.bookId.title}</p>
//             <p className="text-sm text-gray-600 dark:text-gray-300 pb-2">{book.bookId.author}</p>
//             {/* Progress Bar */}
//             <div className="mt-2 w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
//               <div
//                 className="bg-green-500 h-2 rounded-full"
//                 style={{ width: `${Math.round((book.currentPage / book.bookId.totalPages) * 100)}%` }}
//               ></div>
//             </div>
//             <p className="text-sm mt-1">{Math.round((book.currentPage / book.bookId.totalPages) * 100)}% complete</p>
//           </div>
//         </>
//       ) : (
//         <p className="text-center text-gray-500 w-full">No book currently being read.</p>
//       )}
//     </div>
//     </>
//   );
// };

// export default CurrentlyReading;

import React, { useEffect, useState } from "react";
import { fetchCurrentlyReading } from "../providers/CurrentlyReadingProvider";

const CurrentlyReading = () => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      const data = await fetchCurrentlyReading();
      if (!data || Object.keys(data).length === 0) {
        setBook(null);
      } else {
        setBook(data);
        console.log(data);
      }
    };
    loadBook();
  }, []);

  return (
    <div className="flex bg-container border-highlight flex-col justify-center h-[411px]">
      {book ? (
        <div className="flex flex-col md:flex-row items-center w-full h-full p-6">
          {/* Book Cover */}
          <div className="w-32 md:w-48 flex-shrink-0 flex justify-center items-center">
            <img
              src={book.bookId.coverImage}
              alt={book.bookId.title}
              className="max-w-full max-h-full object-contain border-highlight rounded-xl shadow-md"
            />
          </div>

          {/* Book Details */}
          <div className="flex flex-col text-center items-center mt-4 md:ml-6 w-full">
            <h2 className="text-xl font-bold">{book.bookId.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{book.bookId.author}</p>
            
            {/* Progress Bar */}
            <div className="mt-2 w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${Math.round((book.currentPage / book.bookId.totalPages) * 100)}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1">
              {Math.round((book.currentPage / book.bookId.totalPages) * 100)}% complete
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-center text-gray-500">No book currently being read.</p>
        </div>
      )}
    </div>
  );
};

export default CurrentlyReading;
