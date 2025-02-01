export function createHeader() {
    // Create the header container
    const header = document.createElement("header");

    // Add my class for styling
    header.classList.add("navbar");

    // Set inner HTML for the header
    header.innerHTML = `
        <h1>Diego Curiel</h1>
        <nav>
            <ul>
                <li><a href="./index.html">Home</a></li>
                <li><a href="./projects.html">Projects</a></li>
                <li><a href="./favoritefoods.html">Favorite Foods</a></li>
            </ul>
        </nav>
    `;

    // Highlight the active page
    let currentPage = window.location.pathname.split("/").pop();
    if (!currentPage) {
        currentPage = "index.html"; // Default to index.html if URL is "/"
    }

    // Select all navigation links
    const links = header.querySelectorAll("nav a");

    links.forEach(link => {
        // Normalize href and compare
        const linkHref = link.getAttribute("href").replace("./", "");
        if (currentPage === linkHref) {
            link.classList.add("active"); // Add 'active' class to highlight the current page
        }
    });

    return header;
}

// Insert the header when the page is fully loaded
window.addEventListener("load", () => {
    const body = document.querySelector("body");
    
    // Remove the existing header (if any)
    const existingHeader = document.querySelector(".navbar");
    if (existingHeader) {
        existingHeader.remove();
    }

    // Create and insert the new header
    const header = createHeader();
    body.prepend(header); // Insert at the top of the page
});