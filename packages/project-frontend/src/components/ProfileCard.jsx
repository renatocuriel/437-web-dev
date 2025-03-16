import React, { useEffect, useState } from "react";
import { fetchUserData } from "../providers/UserProvider";
import { fetchFinishedBooks } from "../providers/BookProvider";

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await fetchUserData();
      setUser(userData);
    };

    const loadFinishedBooks = async () => {
      const books = await fetchFinishedBooks();
      const total = books.reduce((sum, book) => sum + (book.totalPages || 0), 0);
      setTotalPages(total);
    };

    loadUserData();
    loadFinishedBooks();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <img src={user?.profileImage || "/userProfilePics/default_profile.jpg"} alt="Profile" className="w-24 h-24 object-contain border-highlight rounded-md shadow-md" />
      <h2 className="text-xl font-bold mt-2">{user?.username || "User"}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{user?.bio || "No bio available."}</p>
      <p className="text-sm mt-2">📖 Total Pages Read: <span className="font-semibold">{totalPages}</span></p>
    </div>
  );
};

export default ProfileCard;
