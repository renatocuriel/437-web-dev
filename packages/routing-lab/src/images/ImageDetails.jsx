import { useParams } from "react-router";

export function ImageDetails({ fetchedImages }) {
    const { imageId } = useParams(); // Get imageId from URL
    const imageData = fetchedImages.find((image) => image.id.toString() === imageId);

    if (!imageData) {
        return <h2>Image not found</h2>;
    }

    return (
        <>
            <h2>{imageData.name}</h2>
            <img className="ImageDetails-img" src={imageData.src} alt={imageData.name} />
        </>
    );
}
