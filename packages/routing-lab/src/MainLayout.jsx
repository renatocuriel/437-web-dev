import { Outlet } from "react-router"; // Ensure this matches your installed package
import { Header } from "./Header.jsx";

export function MainLayout() {
    return (
        <div>
            <Header />
            <div style={{ padding: "0 2em" }}>
                <Outlet /> {/* This ensures the correct page content is rendered */}
            </div>
        </div>
    );
}

export default MainLayout;
