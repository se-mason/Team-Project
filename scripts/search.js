// Wait for the navbar to be loaded before setting up search functionality
document.addEventListener('DOMContentLoaded', () => {
  // Function to handle search
  function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return; // Exit if search input isn't found

    const query = searchInput.value.trim();
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);

    // Preserve existing filters
    const category = params.get('category');
    const subcategory = params.get('subcategory');
    const minPrice = params.get('minPrice');
    const maxPrice = params.get('maxPrice');
    const condition = params.get('condition');
    const location = params.get('location');

    // Build new URL with search query and preserved filters
    let newUrl = 'products.html?';
    if (query) {
      newUrl += `search=${encodeURIComponent(query)}`;
    }

    // Add preserved filters
    if (category) newUrl += `&category=${encodeURIComponent(category)}`;
    if (subcategory) newUrl += `&subcategory=${encodeURIComponent(subcategory)}`;
    if (minPrice) newUrl += `&minPrice=${encodeURIComponent(minPrice)}`;
    if (maxPrice) newUrl += `&maxPrice=${encodeURIComponent(maxPrice)}`;
    if (condition) newUrl += `&condition=${encodeURIComponent(condition)}`;
    if (location) newUrl += `&location=${encodeURIComponent(location)}`;

    // Redirect to the products page with all parameters
    window.location.href = newUrl;
  }

  // Set up search functionality after navbar is loaded
  const navbarContainer = document.getElementById('navbar-container');
  if (navbarContainer) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          // Search button click handler
          const searchButton = document.querySelector('.search-button');
          if (searchButton) {
            searchButton.addEventListener('click', handleSearch);
          }

          // Enter key press handler
          const searchInput = document.getElementById('searchInput');
          if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
              }
            });
          }
        }
      });
    });

    observer.observe(navbarContainer, { childList: true, subtree: true });
  }
});