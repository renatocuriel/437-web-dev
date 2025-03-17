// import ProfileCard from "../components/ProfileCard";
// import CurrentlyReading from "../components/CurrentlyReading";
// import BookList from "../components/BookList";

// const Dashboard = () => {
//   return (
//     <div className="mt-6 md:mt-0">
//       <h1 className="hidden text-2xl font-bold text-center mb-6">Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
//         {/* Currently Reading - Takes Left Half on Web */}
//         <div className="bg-container md:col-span-3">
//           <CurrentlyReading />
//         </div>
        
//         {/* To Read and Finished Books */}
//         <div className="bg-container md:col-span-2 space-y-8">
//           <BookList title="To Read" books={["The Pragmatic Programmer", "Clean Code", "Refactoring"]} />
//           <BookList title="Finished Books" books={["The Pragmatic Programmer", "Clean Code", "Refactoring"]} />
//         </div>
//       </div>

//       {/* Profile Card at the bottom */}
//       <div className="bg-container mt-8">
//         <ProfileCard />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import ProfileCard from "../components/ProfileCard";
import CurrentlyReading from "../components/CurrentlyReading";
import BookLists from "../components/BookLists"; // Modified to use actual user data
import FinishedBooks from "../components/FinishedBooks"; // New component

const Dashboard = () => {
  return (
    <div className="mt-6 md:mt-0">
      <h1 className="hidden text-2xl font-bold text-center mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Currently Reading - Takes Left Half on Web */}
        <div className="bg-container md:col-span-3">
          <CurrentlyReading />
        </div>
        
        {/* To Read and Finished Books */}
        <div className="bg-container md:col-span-2 space-y-8">
          <BookLists /> 
          <FinishedBooks />
        </div>
      </div>

      {/* Profile Card at the bottom */}
      {/* <div className="bg-container mt-8">
        <ProfileCard />
      </div> */}
    </div>
  );
};

export default Dashboard;
