const API_BASE = "/api/lists";
const AUTH_HEADER = { Authorization: `Bearer ${localStorage.getItem("authToken")}` };

// 🟢 Fetch all lists
export async function fetchLists() {
  try {
    const response = await fetch(API_BASE, { headers: AUTH_HEADER });
    if (!response.ok) throw new Error("Failed to fetch lists");
    return await response.json();
  } catch (error) {
    console.error("Error fetching lists:", error);
    return [];
  }
}

// ➕ Create a new list
export async function createList(listName: string, description: string) {
  try {
    console.log(AUTH_HEADER);
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...AUTH_HEADER },
      body: JSON.stringify({ listName, description }),
    });
    if (!response.ok) throw new Error("Failed to create list");
    return await response.json();
  } catch (error) {
    console.error("Error creating list:", error);
  }
}

// 📌 Add a book to a list
export async function addBookToList(listId: string, bookId: string) {
  try {
    const response = await fetch(`${API_BASE}/${listId}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...AUTH_HEADER },
      body: JSON.stringify({ bookId }),
    });
    if (!response.ok) throw new Error("Failed to add book");
    return await response.json();
  } catch (error) {
    console.error("Error adding book:", error);
  }
}

// ❌ Remove a book from a list
export async function removeBookFromList(listId: string, bookId: string) {
  try {
    const response = await fetch(`${API_BASE}/${listId}/book/${bookId}`, {
      method: "DELETE",
      headers: AUTH_HEADER,
    });
    if (!response.ok) throw new Error("Failed to remove book");
    return await response.json();
  } catch (error) {
    console.error("Error removing book:", error);
  }
}

// 🗑 Delete a list
export async function deleteList(listId: string) {
  try {
    const response = await fetch(`${API_BASE}/${listId}`, {
      method: "DELETE",
      headers: AUTH_HEADER,
    });
    if (!response.ok) throw new Error("Failed to delete list");
    return await response.json();
  } catch (error) {
    console.error("Error deleting list:", error);
  }
}
