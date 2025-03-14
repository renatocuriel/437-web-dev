export async function sendPostRequest(url, payload, method = "POST") {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        // Handle different HTTP response codes
        if (response.ok) {
            return await response.json();
        } else if (response.status === 400) {
            return { type: "error", message: "Username already taken." };
        } else if (response.status ===401) {
            return { type: "error", message: "Incorrect username or password." };
        } else {
            return { type: "error", message: "Something went wrong. Try again." };
        }
    } catch (error) {
        console.error("Network error:", error);
        return { type: "error", message: "Network error. Please try again." };
    }
}
