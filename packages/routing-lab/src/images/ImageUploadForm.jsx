import { useState, useId } from "react";
import { useActionState } from "react";

export function ImageUploadForm({ authToken }) {
    const fileInputId = useId(); // Generate a unique ID for accessibility
    const [previewSrc, setPreviewSrc] = useState(null);
    
    async function readAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = (err) => reject(err);
            fr.readAsDataURL(file);
        });
    }

    const [result, submitAction, isPending] = useActionState(
        async (prevState, formData) => {
            const file = formData.get("image");
            const name = formData.get("name");

            if (!file || !name) {
                return { type: "error", message: "Please select an image and enter a name." };
            }

            const uploadData = new FormData();
            uploadData.append("image", file);
            uploadData.append("name", name);

            try {
                const response = await fetch("/api/images", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Include auth token
                    },
                    body: uploadData,
                });

                if (!response.ok) {
                    throw new Error("Upload failed.");
                }

                return { type: "success", message: "Image uploaded successfully!" };
            } catch (error) {
                return { type: "error", message: "Upload failed. Try again." };
            }
        },
        null
    );

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            readAsDataURL(file).then((dataUrl) => setPreviewSrc(dataUrl));
        }
    }

    return (
        <>
            {result && <p style={{ color: result.type === "error" ? "red" : "green" }}>{result.message}</p>}
            {isPending && <p>Uploading...</p>}
            
            <form action={submitAction}>
                <div>
                    <label htmlFor={fileInputId}>Choose image to upload: </label>
                    <input
                        id={fileInputId}
                        name="image"
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleFileChange}
                        disabled={isPending}
                    />
                </div>
                <div>
                    <label>
                        <span>Image title: </span>
                        <input name="name" disabled={isPending} />
                    </label>
                </div>
                <div>
                    {previewSrc && <img style={{ maxWidth: "20em" }} src={previewSrc} alt="Preview" />}
                </div>
                <button disabled={isPending}>Confirm upload</button>
            </form>
        </>
    );
}
