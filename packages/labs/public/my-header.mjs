import { attachShadow } from "./utils.mjs";

const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
    <style>
        :host {
            display: block;
            width: 100%;
        }

        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: var(--color-primary);
            padding: var(--spacing-medium);
            position: relative;
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
    </header>
`;

class MyHeader extends HTMLElement {
    connectedCallback() {
        attachShadow(this, TEMPLATE);
        this.highlightActiveLink();
        this.setupMenuToggle();
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
            menu.classList.toggle("open"); // ✅ Toggle the "open" class
        });
    
        // Close menu when clicking outside of the header
        document.addEventListener("click", (event) => {
            if (!this.contains(event.target) && !menuButton.contains(event.target)) {
                menu.classList.remove("open");
            }
        });
    }
}


customElements.define("my-header", MyHeader);