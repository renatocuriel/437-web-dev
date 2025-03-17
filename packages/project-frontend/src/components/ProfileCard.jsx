import React, { useEffect, useState } from "react";
import { fetchUserData, fetchProfilePicture } from "../providers/UserProvider";
import { fetchFinishedBooks } from "../providers/BookProvider";

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [finishedBooks, setFinishedBooks] = useState(0);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await fetchUserData();
      setUser(userData);
    };

    const loadFinishedBooks = async () => {
      const books = await fetchFinishedBooks();
      setFinishedBooks(books.length || 0);
      const total = books.reduce((sum, book) => sum + (book.totalPages || 0), 0);
      setTotalPages(total);
    };

    const loadProfilePic = async () => {
      const pic = await fetchProfilePicture();
      setProfilePic(pic);
    };

    loadUserData();
    loadFinishedBooks();
    loadProfilePic();
  }, []);

  return (
    <div className="flex flex-col justify-center h-auto">
      {user ? (
        <div className="flex flex-col md:flex-row items-center w-full h-full p-6">
          {/* Profile Picture */}
          <div className="w-32 md:w-48 flex-shrink-0 flex justify-center items-center">
            <img
              src={profilePic || "/userProfilePics/default_profile.jpg"}
              alt="Profile"
              className="max-w-full max-h-full object-contain border-highlight rounded-xl shadow-md"
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col text-center items-center mt-4 md:ml-6 w-full">
            <h2 className="text-xl font-bold">{user.username}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{user.bio || "No bio available."}</p>

            {/* Stats */}
            <p className="text-sm mt-3">
              📖 Total Pages Read: <span className="font-semibold">{totalPages}</span>
            </p>
            <p className="text-sm mt-1">
              📚 Finished Books: <span className="font-semibold">{finishedBooks}</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-center text-gray-500">User data not available.</p>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
