// Define categories and their subcategories
const categories = {
    collectables: ['Collectables', 'Antiques', 'Sports memorabilia', 'Coins', 'Other'],
    electronics: ['Mobile phones', 'Sound & vision', 'Video games', 'Computers & tablets', 'Other'],
    home: ['Garden', 'Appliances', 'DIY materials', 'Furniture & homeware', 'Other'],
    sporting: ['Cycling', 'Fishing', 'Fitness, running & yoga', 'Golf', 'Other'],
    jewellery: ['Luxury Watches', 'Costume jewellery', 'Vintage & antique jewellery', 'Fine jewellery', 'Other'],
    fashion: ['Women\'s clothing', 'Men\'s clothing', 'Shoes', 'Kid\'s fashion', 'Sneakers', 'Other'],
    motors: ['Cars', 'Car parts', 'Motorcycles & scooters', 'Motorcycle parts', 'Other'],
    toys: ['Radio controlled', 'Construction toys', 'Outdoor toys', 'Action figures', 'Other'],
    other: ['Books, comics & magazines', 'Health & beauty', 'Musical instruments', 'Business, office & industrial', 'Other']
};

// Get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        category: params.get('category'),
        subcategory: params.get('subcategory')
    };
}

// Apply URL parameters to filters
function applyUrlParams() {
    const params = getUrlParams();
    
    if (params.category) {
        const categorySelect = document.getElementById('categoryFilter');
        categorySelect.value = params.category;
        categorySelect.dispatchEvent(new Event('change')); // Trigger change event to enable subcategory
        
        if (params.subcategory) {
            const subcategorySelect = document.getElementById('subcategoryFilter');
            subcategorySelect.value = params.subcategory;
            subcategorySelect.dispatchEvent(new Event('change')); // Trigger change event to apply filter
        }
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Populate category dropdown
    const categorySelect = document.getElementById('categoryFilter');
    Object.keys(categories).forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categorySelect.appendChild(option);
    });

    // Handle category selection
    categorySelect.addEventListener('change', function() {
        const subcategorySelect = document.getElementById('subcategoryFilter');
        subcategorySelect.innerHTML = '<option value="">Select Subcategory</option>';
        
        if (this.value) {
            subcategorySelect.disabled = false;
            categories[this.value].forEach(subcategory => {
                const option = document.createElement('option');
                option.value = subcategory.toLowerCase().replace(/\s+/g, '-');
                option.textContent = subcategory;
                subcategorySelect.appendChild(option);
            });
        } else {
            subcategorySelect.disabled = true;
        }
    });

    // Handle subcategory selection
    const subcategorySelect = document.getElementById('subcategoryFilter');
    subcategorySelect.addEventListener('change', function() {
        if (this.value) {
            applyFilters();
        }
    });

    // Handle search input
    const searchInput = document.getElementById('productSearch');
    searchInput.addEventListener('input', debounce(applyFilters, 300));

    // Handle price range inputs
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    minPriceInput.addEventListener('input', debounce(applyFilters, 300));
    maxPriceInput.addEventListener('input', debounce(applyFilters, 300));

    // Handle filter buttons
    document.getElementById('applyFilters').addEventListener('click', applyFilters);
    document.getElementById('clearFilters').addEventListener('click', clearFilters);

    // Apply URL parameters when page loads
    applyUrlParams();
});

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

// Apply filters function
function applyFilters() {
    const category = document.getElementById('categoryFilter').value;
    const subcategory = document.getElementById('subcategoryFilter').value;
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;

    // Update URL with current filters
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (subcategory) params.append('subcategory', subcategory);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

    // Filter products based on selected criteria
    const products = document.querySelectorAll('.product-card');
    let hasVisibleProducts = false;

    products.forEach(product => {
        const productCategory = product.dataset.category;
        const productSubcategory = product.dataset.subcategory;
        const productName = product.querySelector('.product-title').textContent.toLowerCase();
        const productPrice = parseFloat(product.dataset.price);

        const matchesCategory = !category || productCategory === category;
        const matchesSubcategory = !subcategory || productSubcategory === subcategory;
        const matchesSearch = !searchTerm || productName.includes(searchTerm);
        const matchesPrice = (!minPrice || productPrice >= parseFloat(minPrice)) &&
                           (!maxPrice || productPrice <= parseFloat(maxPrice));

        if (matchesCategory && matchesSubcategory && matchesSearch && matchesPrice) {
            product.style.display = 'block';
            hasVisibleProducts = true;
        } else {
            product.style.display = 'none';
        }
    });

    // Show/hide no products message
    const noProductsMessage = document.querySelector('.no-products-message');
    if (noProductsMessage) {
        noProductsMessage.style.display = hasVisibleProducts ? 'none' : 'flex';
    }
}

// Clear filters function
function clearFilters() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('subcategoryFilter').value = '';
    document.getElementById('subcategoryFilter').disabled = true;
    document.getElementById('productSearch').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    
    // Clear URL parameters
    window.history.replaceState({}, '', window.location.pathname);
    
    // Reset product display
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        product.style.display = 'block';
    });
    
    const noProductsMessage = document.querySelector('.no-products-message');
    if (noProductsMessage) {
        noProductsMessage.style.display = 'none';
    }
} 