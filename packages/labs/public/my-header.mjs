import { attachShadow } from "./utils.mjs";

const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
    <style>
        :host {
            display: block;
            width: 100%;
        }

        .navbar-right {
            display: flex;
            align-items: center;
            gap: var(--spacing-medium);
        }
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: var(--color-primary);
            padding: var(--spacing-medium);
            position: relative;
        }

        .dark-mode-toggle {
            display: flex;
            align-items: center;
            font-size: 0.9rem;
            gap: var(--spacing-small);
            cursor: pointer;
            margin-right: var(--spacing-medium);
        }

        /* ✅ Style the Checkbox */
        .dark-mode-checkbox {
            cursor: pointer;
            width: 16px;
            height: 16px;
        }
            
        .menu-button {
            display: block; /* ✅ Show button by default */
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: var(--spacing-small);
        }

        .menu-button:focus {
            outline: none;
        }

        .navbar ul {
            display: none; /* ✅ Hide menu by default */
            list-style: none; /* ✅ Removes bullet points */
            flex-direction: column;
            background-color: var(--color-primary);
            position: absolute;
            top: 60px;
            right: 0;
            width: 200px;
            padding: var(--spacing-medium);
            border-radius: var(--radius);
            box-shadow: var(--shadow);
        }

        .navbar ul.open {
            display: flex; /* ✅ Show menu when toggled */
        }

        /* Desktop: Override mobile styles */
        @media (min-width: 768px) {
            .menu-button {
                display: none; /* ✅ Hide button on larger screens */
            }

            .navbar ul {
                display: flex; /* ✅ Show menu in a row */
                list-style: none;
                gap: var(--spacing-medium); /* ✅ Add space between items */
                flex-direction: row;
                position: static;
                width: auto;
                box-shadow: none;
            }
        }

        .navbar a {
            text-decoration: none;
            font-weight: bold;
            color: #2c2c2c;
        }

        .navbar a:hover {
            text-decoration: underline;
            color: #f0f9f4;
        }

        .navbar a.active {
            color: white;
            text-decoration: underline;
            font-weight: bold;
        }
    </style>

    <header class="navbar">
        <h1>Diego Curiel</h1>

        <div class="navbar-right">
            <label class="dark-mode-toggle">
                <input type="checkbox" class="dark-mode-checkbox" autocomplete="off" />
                Dark mode
            </label>

            <div class="menu">
                <button class="menu-button">☰</button>
                <nav>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="projects.html">Projects</a></li>
                        <li><a href="favoritefoods.html">Favorite Foods</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
`;

class MyHeader extends HTMLElement {
    connectedCallback() {
        attachShadow(this, TEMPLATE);
        this.highlightActiveLink();
        this.setupMenuToggle();
        this.setupDarkModeToggle();
    }

    highlightActiveLink() {
        let currentPage = window.location.pathname.split("/").pop() || "index.html";

        if (currentPage === "") {
            currentPage = "index.html"; // Ensure it's never empty
        }

        // Normalize the current page name
        currentPage = currentPage.replace(/^\//, "");
        const links = this.shadowRoot.querySelectorAll("a");

        links.forEach(link => {
            const linkHref = link.getAttribute("href");

            // Normalize href (remove "./" and leading "/")
            const normalizedHref = linkHref.replace(/^(\.\/|\/)/, "");

            if (currentPage === normalizedHref) {
                link.classList.add("active");
            }
        });
    }

    setupMenuToggle() {
        const menuButton = this.shadowRoot.querySelector(".menu-button");
        const menu = this.shadowRoot.querySelector("ul");
    
        menuButton.addEventListener("click", () => {
            menu.classList.toggle("open"); // Toggle class
        });
    
        // Close menu when clicking outside of the header
        document.addEventListener("click", (event) => {
            if (!this.contains(event.target) && !menuButton.contains(event.target)) {
                menu.classList.remove("open");
            }
        });
    }

    setupDarkModeToggle() {
        const darkModeCheckbox = this.shadowRoot.querySelector(".dark-mode-checkbox");
    
        if (!darkModeCheckbox) {
            console.error("Dark mode checkbox not found in Shadow DOM");
            return;
        }
    
        // Load saved dark mode state from localStorage
        const isDarkMode = localStorage.getItem("darkMode") === "true";
        if (isDarkMode) {
            document.body.classList.add("dark-mode");
            darkModeCheckbox.checked = true;
        }
    
        // Listen for checkbox toggle event
        darkModeCheckbox.addEventListener("change", () => {
            if (darkModeCheckbox.checked) {
                document.body.classList.add("dark-mode");
                localStorage.setItem("darkMode", "true"); // Save preference
            } else {
                document.body.classList.remove("dark-mode");
                localStorage.setItem("darkMode", "false"); // Save preference
            }
        });
    }
}

customElements.define("my-header", MyHeader);