const BookList = ({ title, books }) => {
    return (
      <div className="border-highlight p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <ul className="list-disc pl-4">
          {books.map((book, index) => (
            <li key={index} className="py-1">{book}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default BookList;
  