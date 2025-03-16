import { fetchLists } from "./ListProvider.ts";

// Define the expected structure of a book entry
interface Book {
  genre: string[];
}

// Define the expected structure of a list entry
interface UserList {
  books: Book[];
}

const API_BASE = "/api/books";
const AUTH_HEADER = { Authorization: `Bearer ${localStorage.getItem("authToken")}` };

// 🟢 Fetch all books
export async function fetchBooks(searchQuery: string = "") {
  try {
    const response = await fetch(`${API_BASE}?search=${searchQuery}`, { headers: AUTH_HEADER });
    if (!response.ok) throw new Error("Failed to fetch books");
    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

// ➕ Add a book to the database
export async function addBook(bookData: any) {
  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...AUTH_HEADER },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) throw new Error("Failed to add book");
    return await response.json();
  } catch (error) {
    console.error("Error adding book:", error);
  }
}

// 🟢 Fetch Recommended Books Based on User’s Lists
export async function fetchRecommendedBooks() {
  try {
    const userLists = await fetchLists(); // ✅ Get user’s lists
    if (!userLists || userLists.length === 0) return { books: [], genre: null }; // ❌ No lists, return empty

    // 🔍 Extract genres from user's books
    const allGenres = new Set<string>(); // ✅ Explicitly define as a Set of strings
    userLists.forEach((list: UserList) => {
      list.books.forEach((book: Book) => {
        book.genre.forEach((genre: string) => allGenres.add(genre)); // ✅ Ensure `genre` is a string
      });
    });

    if (allGenres.size === 0) return { books: [], genre: null }; // ❌ No genres found

    const genreArray = Array.from(allGenres); // ✅ Convert Set to Array
    const randomGenre = genreArray[Math.floor(Math.random() * genreArray.length)]; // ✅ Pick random genre
    console.log(`🎯 Fetching recommendations for genre: ${randomGenre}`);

    // ✅ Call existing `/api/google-books/search?q=genre`
    const response = await fetch(`/api/google-books/search?q=${encodeURIComponent(randomGenre)}`, { headers: AUTH_HEADER });
    if (!response.ok) throw new Error("Failed to fetch recommendations");

    const data = await response.json();
    return { books: data.books || [], genre: randomGenre }; // ✅ Return books & selected genre
  } catch (error) {
    console.error("❌ Error fetching recommendations:", error);
    return { books: [], genre: null };
  }
}