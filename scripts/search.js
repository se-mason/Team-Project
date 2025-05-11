document.querySelector(".search-button").addEventListener("click", function () {
    const query = document.getElementById("searchInput").value.trim();
    if (query) {
        // Redirect to the products page with the search query as a URL parameter
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    } else {
        // Redirect to the products page without a search query
        window.location.href = `products.html`;
    }
});