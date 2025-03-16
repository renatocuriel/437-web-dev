const API_BASE = "/api/currently-reading";
const AUTH_HEADER = { Authorization: `Bearer ${localStorage.getItem("authToken")}` };

// 📖 Get currently reading book
export async function fetchCurrentlyReading() {
  try {
    const response = await fetch(API_BASE, { headers: AUTH_HEADER });
    if (!response.ok) throw new Error("Failed to fetch currently reading book");
    return await response.json();
  } catch (error) {
    console.error("Error fetching currently reading:", error);
    return null;
  }
}

// 📖 Set a book as currently reading
export async function setCurrentlyReading(bookId: string, currentPage: number = 1) {
  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...AUTH_HEADER },
      body: JSON.stringify({ bookId, currentPage }),
    });
    if (!response.ok) throw new Error("Failed to set currently reading");
    return await response.json();
  } catch (error) {
    console.error("Error setting currently reading:", error);
  }
}

// 🔄 Update current page
export async function updateCurrentPage(currentPage: number) {
  try {
    const response = await fetch(API_BASE, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...AUTH_HEADER },
      body: JSON.stringify({ currentPage }),
    });
    if (!response.ok) throw new Error("Failed to update progress");
    return await response.json();
  } catch (error) {
    console.error("Error updating reading progress:", error);
  }
}

// ❌ Remove from currently reading (move to finished)
export async function removeCurrentlyReading() {
  try {
    const response = await fetch(API_BASE, {
      method: "DELETE",
      headers: AUTH_HEADER,
    });
    if (!response.ok) throw new Error("Failed to remove currently reading book");
    return await response.json();
  } catch (error) {
    console.error("Error removing currently reading:", error);
  }
}
