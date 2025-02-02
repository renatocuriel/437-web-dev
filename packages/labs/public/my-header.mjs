import { attachShadow } from "./utils.mjs";

const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
    Auto-rendered as a child of the custom element
`;

class myHeader extends HTMLElement {
    connectedCallback() {
        const shadowRoot = attachShadow(this, TEMPLATE);
    }
}

customElements.define("my-header", myHeader);