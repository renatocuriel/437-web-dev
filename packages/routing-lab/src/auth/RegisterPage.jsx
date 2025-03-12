import { UsernamePasswordForm } from "./UsernamePasswordForm.jsx";
import { sendPostRequest } from "../utils/sendPostRequest.js";
import { useNavigate } from "react-router";

export function RegisterPage({ setAuthToken }) {
    const navigate = useNavigate();

    async function handleRegister(data) {
        console.log("Registering user:", data);

        const response = await sendPostRequest("/auth/register", data);

        if (response.token) {
            setAuthToken(response.token); // Store the auth token
            console.log("User registered. Auth token:", response.token);
            navigate("/"); // Redirect to homepage
            return { type: "success", message: "Registration successful!" };
        }

        return response; // Return error message if registration fails
    }

    return (
        <>
            <h2>Register a New Account</h2>
            <UsernamePasswordForm onSubmit={handleRegister} />
        </>
    );
}
