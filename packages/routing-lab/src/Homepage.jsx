import { ImageEditForm } from "./images/ImageEditForm";

export function Homepage({ userName, authToken }) {
    return (
        <>
            <h2>Welcome, {userName}</h2>
            <p>This is the content of the home page.</p>

            <ImageEditForm onImageUpdated={() => window.location.reload()} authToken={authToken}/>
        </>
    );
}
