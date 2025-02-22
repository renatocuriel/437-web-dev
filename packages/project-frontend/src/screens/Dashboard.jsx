import ProfileCard from "../components/ProfileCard";
import CurrentlyReading from "../components/CurrentlyReading";
import BookList from "../components/BookList";
import SuggestedBooks from "../components/SuggestedBooks";

const Dashboard = () => {
  return (
    <div className="mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Currently Reading - Takes Left Half on Web */}
        <div className="bg-container md:col-span-3">
          <CurrentlyReading />
        </div>
        
        {/* To Read and Finished Books */}
        <div className="bg-container md:col-span-2 space-y-6">
          <BookList title="To Read" books={["The Pragmatic Programmer", "Clean Code", "Refactoring"]} />
          <BookList title="Finished Books" books={["The Pragmatic Programmer", "Clean Code", "Refactoring"]} />
        </div>
      </div>

      {/* Suggested Books Section */}
      <div className="bg-container mt-6">
        <SuggestedBooks books={["The Pragmatic Programmer", "Clean Code", "Refactoring", "Design Patterns"]} limit={3} />
      </div>

      {/* Profile Card at the bottom */}
      <div className="bg-container mt-6">
        <ProfileCard />
      </div>
    </div>
  );
};

export default Dashboard;