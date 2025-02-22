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
      <div className="bg-container mt-6 md:mt-0">
        <SuggestedBooks books={allBooks} />
      </div>
    </div>
  );
};

export default SuggestedBooksPage;
