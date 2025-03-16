// import { useState } from "react";
// import booksMockData from "../assets/mockBooks.json";

// const MyListsPage = () => {
//   const [lists, setLists] = useState([
//     { id: 1, title: "Favorites", description: "Books I love", books: [booksMockData[0], booksMockData[1]] },
//     { id: 2, title: "To Read", description: "Books I want to read", books: [booksMockData[2], booksMockData[3]] }
//   ]);
//   const [newListTitle, setNewListTitle] = useState("");
//   const [newListDesc, setNewListDesc] = useState("");

//   const createList = () => {
//     if (!newListTitle.trim()) return;
//     setLists([...lists, { id: Date.now(), title: newListTitle, description: newListDesc, books: [] }]);
//     setNewListTitle("");
//     setNewListDesc("");
//   };

//   const deleteList = (id) => {
//     setLists(lists.filter(list => list.id !== id));
//   };

//   const removeBookFromList = (listId, bookId) => {
//     setLists(lists.map(list =>
//       list.id === listId ? { ...list, books: list.books.filter(book => book.id !== bookId) } : list
//     ));
//   };

//   const setCurrentlyReading = (book) => {
//     alert(`Started reading "${book.title}"`);
//   };

//   return (
//     <div className="mt-6 md:mt-0">
//       <h1 className="hidden text-2xl font-bold text-center mb-6">My Lists</h1>

//       {/* Create New List */}
//       <div className="mb-6 bg-container"> 
//         <div className="p-4 border-highlight rounded-lg">
//           <h2 className="text-lg font-semibold mb-3">Create New List</h2>
//           <input
//             type="text"
//             placeholder="List Title"
//             value={newListTitle}
//             onChange={(e) => setNewListTitle(e.target.value)}
//             className="w-full p-2 border rounded-lg mb-2 dark:bg-gray-800 border-highlight"
//           />
//           <input
//             type="text"
//             placeholder="Optional Description"
//             value={newListDesc}
//             onChange={(e) => setNewListDesc(e.target.value)}
//             className="w-full p-2 border rounded-lg mb-4 dark:bg-gray-800 border-highlight"
//           />
//           <button onClick={createList} className="btn-primary w-full">Create List</button>
//         </div>
//       </div>
      
//       {/* Display Lists */}
//       {lists.map((list) => (
//         <div className="bg-container mb-6">
//           <div key={list.id} className="p-4 border-highlight rounded-lg">
//             <div className="flex justify-between items-center mb-3">
//               <div>
//                 <h2 className="text-xl font-semibold">{list.title}</h2>
//                 {list.description && <p className="text-sm text-gray-600 dark:text-gray-300">{list.description}</p>}
//               </div>
//               {/* <button onClick={() => deleteList(list.id)} className="text-red-500 hover:text-red-700">Delete</button> */}
//               <button 
//                 onClick={() => deleteList(list.id)}
//                 className="w-auto px-4 py-2 rounded-lg bg-red-300 text-red-900 hover:bg-red-400 hover:text-red-950 border border-red-500 transition"
//                 // className="w-auto px-4 py-2 rounded-lg text-red-600 hover:text-red-700 border border-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition"
//               >
//                 Delete
//               </button>

//             </div>

//             {/* Books in the List */}
//             {list.books.length > 0 ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {list.books.map((book) => (
//                   <div key={book.id} className="bg-container p-3 rounded-lg shadow-md border-highlight h-full flex flex-col hover:scale-105 transition-transform">
//                     <img src={book.cover} alt={book.title} className="w-full aspect-[2/3] rounded-lg mb-2" />
//                     <div className="flex flex-col flex-grow justify-between">
//                       <h3 className="text-lg text-center font-semibold">{book.title}</h3>
//                       <p className="text-sm text-center text-gray-600 dark:text-gray-300">{book.author}</p>
//                       <div className="mt-3 flex flex-col gap-2">
//                         <button onClick={() => setCurrentlyReading(book)} className="btn-primary w-full">Start Reading</button>
//                         {/* <button onClick={() => removeBookFromList(list.id, book.id)} className="text-red-500 hover:text-red-700 w-full">Remove</button> */}
//                         <button 
//                           onClick={() => removeBookFromList(list.id, book.id)} 
//                           className="w-full px-4 py-2 rounded-lg bg-red-300 text-red-900 hover:bg-red-400 hover:text-red-950 border border-red-500 transition"
//                           // className="w-full px-4 py-2 rounded-lg text-red-600 hover:text-red-700 border border-red-600 dark:bg-red-300 hover:bg-red-300 dark:hover:bg-red-900 transition"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 dark:text-gray-400">No books in this list.</p>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyListsPage;

import { useState, useEffect } from "react";
import { createList, fetchLists, deleteList, removeBookFromList } from "../providers/ListProvider";
import { setCurrentlyReading } from "../providers/CurrentlyReadingProvider";

const MyListsPage = () => {
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState("");
  const [newListDesc, setNewListDesc] = useState("");

  // 🔄 Fetch lists on mount
  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    const data = await fetchLists();
    setLists(data);
  };

  // ➕ Create a new list
  const handleCreateList = async () => {
    await createList(newListTitle, newListDesc);

    setNewListTitle("");
    setNewListDesc("");
    loadLists();
  };

  // ❌ Delete a list
  const handleDeleteList = async (listId) => {
    await deleteList(listId);
    loadLists();
  };

  // ❌ Remove a book from a list
  const handleRemoveBook = async (listId, bookId) => {
    await removeBookFromList(listId, bookId);
    loadLists();
  };

  // 📖 Mark book as currently reading
  const handleSetCurrentlyReading = async (bookId) => {
    await setCurrentlyReading(bookId);
    alert(`Started reading book!`);
  };

  return (
    <div className="mt-6 md:mt-0">
      <h1 className="hidden text-2xl font-bold text-center mb-6">My Lists</h1>

      {/* Create New List */}
      <div className="mb-6 bg-container">
        <div className="p-4 border-highlight rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Create New List</h2>
          <input
            type="text"
            placeholder="List Title"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            className="w-full p-2 border rounded-lg mb-2 dark:bg-gray-800 border-highlight"
          />
          <input
            type="text"
            placeholder="Optional Description"
            value={newListDesc}
            onChange={(e) => setNewListDesc(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4 dark:bg-gray-800 border-highlight"
          />
          <button onClick={handleCreateList} className="btn-primary w-full">Create List</button>
        </div>
      </div>

      {/* Display Lists */}
      {lists.map((list) => (
        <div key={list._id} className="bg-container mb-6">
          <div className="p-4 border-highlight rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="text-xl font-semibold">{list.listName}</h2>
                {list.description && <p className="text-sm text-gray-600 dark:text-gray-300">{list.description}</p>}
              </div>
              <button
                onClick={() => handleDeleteList(list._id)}
                className="w-auto px-4 py-2 rounded-lg bg-red-300 text-red-900 hover:bg-red-400 hover:text-red-950 border border-red-500 transition"
              >
                Delete
              </button>
            </div>

            {/* Books in the List */}
            {list.books.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {list.books.map((book) => (
                  <div key={book._id} className="bg-container p-3 rounded-lg shadow-md border-highlight h-full flex flex-col hover:scale-105 transition-transform">
                    <img src={book.coverImage} alt={book.title} className="w-full aspect-[2/3] rounded-lg mb-2" />
                    <div className="flex flex-col flex-grow justify-between">
                      <h3 className="text-lg text-center font-semibold">{book.title}</h3>
                      <p className="text-sm text-center text-gray-600 dark:text-gray-300">{book.author.join(", ")}</p>
                      <div className="mt-3 flex flex-col gap-2">
                        <button onClick={() => handleSetCurrentlyReading(book._id)} className="btn-primary w-full">Start Reading</button>
                        <button
                          onClick={() => handleRemoveBook(list._id, book._id)}
                          className="w-full px-4 py-2 rounded-lg bg-red-300 text-red-900 hover:bg-red-400 hover:text-red-950 border border-red-500 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No books in this list.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyListsPage;
