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
        }
        .navbar h1 {
            font-family: var(--font-heading);
            margin: 0;
        }
        .navbar ul {
            display: flex;
            list-style: none;
            gap: var(--spacing-medium);
            margin: 0;
            padding: 0;
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
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="projects.html">Projects</a></li>
                <li><a href="favoritefoods.html">Favorite Foods</a></li>
            </ul>
        </nav>
    </header>
`;

class MyHeader extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = attachShadow(this, TEMPLATE);
        this.shadowRoot = shadowRoot;
    }

    connectedCallback() {
        this.highlightActiveLink();
    }

    highlightActiveLink() {
        let currentPage = window.location.pathname.split("/").pop() || "index.html";
    
        // Normalize by removing leading slash
        currentPage = currentPage.replace(/^\//, "");
    
        console.log("Current Page:", currentPage); // Debugging output
    
        // Select all links inside the Shadow DOM
        const links = this.shadowRoot.querySelectorAll("a");
    
        links.forEach(link => {
            const linkHref = link.getAttribute("href");
    
            // Normalize href
            const normalizedHref = linkHref.replace(/^\.\//, "").replace(/^\//, "");
    
            console.log("Comparing:", normalizedHref, "with", currentPage); // Debugging output
    
            // Compare paths
            if (currentPage === normalizedHref) {
                console.log("✅ Match found! Adding active class to:", normalizedHref);
                link.classList.add("active");
            }
        });
    }
    
}

customElements.define("my-header", MyHeader);