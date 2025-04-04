// Function to handle search across the site
function handleSearch(searchTerm, updateUrl = true) {
    console.log('Searching for:', searchTerm); // Debug log
    
    // If we're already on the products page
    if (window.location.pathname.includes('products.html')) {
        if (updateUrl) {
            // Only update URL when explicitly requested (button click or Enter)
            const params = new URLSearchParams(window.location.search);
            params.set('search', searchTerm);
            window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
        }
        
        // Remove any existing no results messages
        const existingNoResults = document.querySelector('.no-results');
        if (existingNoResults) existingNoResults.remove();
        
        // Always show no results message since there are no products yet
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = '<i class="fas fa-search"></i><p>No products found matching your search.</p>';
        document.querySelector('.products-grid').appendChild(noResults);
        
        // Hide all product cards
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.style.display = 'none';
        });
    } else {
        // If we're on any other page, redirect to products page with search term
        window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Search functionality initialized'); // Debug log
    
    const searchBars = document.querySelectorAll('.search-bar');
    const searchButtons = document.querySelectorAll('.search-button');

    // Handle search input - only filter products, don't update URL
    searchBars.forEach(searchBar => {
        searchBar.addEventListener('input', debounce(function() {
            if (window.location.pathname.includes('products.html')) {
                handleSearch(this.value, false);
            }
        }, 300));

        // Handle Enter key - update URL and filter
        searchBar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch(this.value, true);
            }
        });
    });

    // Handle search button clicks - update URL and filter
    searchButtons.forEach(button => {
        button.addEventListener('click', function() {
            const searchBar = this.closest('.search-container').querySelector('.search-bar');
            handleSearch(searchBar.value, true);
        });
    });
    
    // Show initial no results message on products page
    if (window.location.pathname.includes('products.html')) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = '<i class="fas fa-search"></i><p>No products found matching your search.</p>';
        document.querySelector('.products-grid').appendChild(noResults);
        
        // Hide all product cards
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.style.display = 'none';
        });
    }
}); 