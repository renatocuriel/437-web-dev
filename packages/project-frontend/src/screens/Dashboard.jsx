import ProfileCard from "../components/ProfileCard";
import CurrentlyReading from "../components/CurrentlyReading";
import BookList from "../components/BookList";
import SuggestedBooks from "../components/SuggestedBooks";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Currently Reading - Takes Left Half on Web */}
        <div className="bg-container md:col-span-2">
          <CurrentlyReading />
        </div>
        
        {/* To Read and Finished Books */}
        <div className="bg-container md:col-span-1">
          <BookList title="To Read" books={["The Pragmatic Programmer", "Clean Code", "Refactoring"]} />
          <BookList title="Finished Books" books={["The Pragmatic Programmer", "Clean Code", "Refactoring"]} />
        </div>
      </div>

      {/* Profile Card at the bottom */}
      <div className="bg-container mt-6">
        <ProfileCard />
      </div>

      {/* Suggested Books Section */}
      <div className="bg-container mt-6">
        <SuggestedBooks books={["The Pragmatic Programmer", "Clean Code", "Refactoring", "Design Patterns"]} limit={3} />
      </div>
    </div>
  );
};

export default Dashboard;