export const fetchUserData = async () => {
    try {
        const response = await fetch("/api/users/me", {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch user data");
        return await response.json();
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

export const updateUsername = async (newUsername: string) => {
    try {
        const response = await fetch("/api/users/update-username", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({ newUsername }),
        });
        if (!response.ok) throw new Error("Failed to update username");
        return await response.json();
    } catch (error) {
        console.error("Error updating username:", error);
        return null;
    }
};

export const updateBio = async (bio: string) => {
    try {
        const response = await fetch("/api/users/update-bio", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({ bio }),
        });
        if (!response.ok) throw new Error("Failed to update bio");
        return await response.json();
    } catch (error) {
        console.error("Error updating bio:", error);
        return null;
    }
};

export const uploadProfilePicture = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch("/api/users/upload-profile-pic", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: formData,
        });

        if (!response.ok) throw new Error("Failed to upload profile picture");
        return await response.json();
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        return null;
    }
};

export const fetchProfilePicture = async () => {
    try {
        const response = await fetch("/api/users/profile-pic", {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch profile picture");
        const data = await response.json();
        return data.profileImage;
    } catch (error) {
        console.error("Error fetching profile picture:", error);
        return "/userProfilePics/default_profile.jpg"; // Fallback image
    }
};
