import { UsernamePasswordForm } from "./UsernamePasswordForm.jsx";
import { sendPostRequest } from "../utils/sendPostRequest.js";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export function LoginPage({ setAuthToken }) {
    const navigate = useNavigate();

    async function handleLogin(data) {
        console.log("Attempting login:", data);

        const response = await sendPostRequest("/auth/login", data);

        if (response.token) {
            setAuthToken(response.token);
            localStorage.setItem("authToken", response.token); // Store token
            console.log("Authentication token:", response.token);
            navigate("/"); // Redirect to homepage
            return { type: "success", message: "Login successful!" };
        }

        return response;
    }

    return (
        <div className="flex flex-col items-center mt-6 md:mt-0">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <div className="bg-container p-6 w-full max-w-md border-highlight rounded-lg">
                <UsernamePasswordForm onSubmit={handleLogin} />
                <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
}
