import { useState } from "react";

export function ImageEditForm({ onImageUpdated, authToken }) {
    const [imageId, setImageId] = useState("");
    const [imageName, setImageName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit() {
        if (!imageId || !imageName) {
            alert("Please enter an Image ID and a new name.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`/api/images/${imageId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
                body: JSON.stringify({ name: imageName }),
            });

            if (response.ok) {
                alert("Image name updated successfully!");
                onImageUpdated(); // Refresh UI after update
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            alert("An error occurred while updating the image.");
            console.error(error);
        } finally {
            setImageId("");
            setImageName("");
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h3>Edit Image Name</h3>
            <label style={{ display: "block" }}>
                Image ID:
                <input
                    type="text"
                    value={imageId}
                    disabled={isLoading}
                    onChange={(e) => setImageId(e.target.value)}
                />
            </label>
            <label style={{ display: "block" }}>
                New Image Name:
                <input
                    type="text"
                    value={imageName}
                    disabled={isLoading}
                    onChange={(e) => setImageName(e.target.value)}
                />
            </label>
            <button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Updating..." : "Send Request"}
            </button>
        </div>
    );
}
