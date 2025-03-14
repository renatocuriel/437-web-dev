import { UsernamePasswordForm } from "./UsernamePasswordForm.jsx";
import { sendPostRequest } from "../utils/sendPostRequest.js";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export function RegisterPage({ setAuthToken }) {
    const navigate = useNavigate();

    async function handleRegister(data) {
        console.log("Registering user:", data);

        const response = await sendPostRequest("/auth/register", data);

        if (response.token) {
            setAuthToken(response.token);
            localStorage.setItem("authToken", response.token);
            console.log("User registered. Auth token:", response.token);
            navigate("/");
            return { type: "success", message: "Registration successful!" };
        }

        return response;
    }

    return (
        <div className="flex flex-col items-center mt-6 md:mt-0">
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
            <div className="bg-container p-6 w-full max-w-md border-highlight rounded-lg">
                <UsernamePasswordForm onSubmit={handleRegister} />
                <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in here</Link>
                </p>
            </div>
        </div>
    );
}
