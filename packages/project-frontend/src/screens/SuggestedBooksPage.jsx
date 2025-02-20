import SuggestedBooks from "../components/SuggestedBooks";

const SuggestedBooksPage = () => {
  const allBooks = [
    "The Pragmatic Programmer",
    "Clean Code",
    "Refactoring",
    "Design Patterns",
    "You Don’t Know JS",
    "Eloquent JavaScript",
    "JavaScript: The Good Parts",
    "Code Complete",
    "The Mythical Man-Month",
    "Introduction to Algorithms",
  ];

  return (
    <div>
      <div className="text-center p-6">
        <h1 className="text-2xl font-bold">Suggested Books</h1>
      </div>
      <div className="bg-container mx-auto p-6">
        <SuggestedBooks books={allBooks} />
      </div>
    </div>
  );
};

export default SuggestedBooksPage;
