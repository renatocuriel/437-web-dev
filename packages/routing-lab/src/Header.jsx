import { Link } from "react-router"; // Import Link from react-router
import "./Header.css";

export function Header() {
    return (
        <header>
            <h1>My cool site</h1>
            <div>
                <label htmlFor="dark-mode-switch">
                    Some switch (dark mode?) <input type="checkbox" id="dark-mode-switch" />
                </label>
                <nav>
                    {/* Replace <a> with <Link> */}
                    <Link to="/">Home</Link>
                    <Link to="/images">Image Gallery</Link>
                    <Link to="/account">Account</Link>
                    {/* <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link> */}
                </nav>
            </div>
        </header>
    );
}
