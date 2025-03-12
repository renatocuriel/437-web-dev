import { UsernamePasswordForm } from "./UsernamePasswordForm.jsx";
import { sendPostRequest } from "../utils/sendPostRequest.js";
import { useNavigate } from "react-router";

export function LoginPage({ setAuthToken }) {
    const navigate = useNavigate();

    async function handleLogin(data) {
        console.log("Attempting login:", data);

        const response = await sendPostRequest("/auth/login", data);

        if (response.token) {
            setAuthToken(response.token); // Store the auth token
            console.log("Authentication token:", response.token);
            navigate("/"); // Redirect to homepage
            return { type: "success", message: "Login successful!" };
        }

        return response; // Return error message if login fails
    }

    return (
        <>
            <h2>Login</h2>
            <UsernamePasswordForm onSubmit={handleLogin} />
            <p>
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </>
    );
}
