import { attachShadow } from "./utils.mjs";

const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
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

class myHeader extends HTMLElement {
    connectedCallback() {
        const shadowRoot = attachShadow(this, TEMPLATE);
    }
}

customElements.define("my-header", myHeader);