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
        const categorySelect = document.getElementById('categorySelect');
        categorySelect.value = params.category;
        categorySelect.dispatchEvent(new Event('change')); // Trigger change event to enable subcategory
        
        if (params.subcategory) {
            const subcategorySelect = document.getElementById('subcategorySelect');
            subcategorySelect.value = params.subcategory;
            subcategorySelect.dispatchEvent(new Event('change')); // Trigger change event to apply filter
        }
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const subcategory = urlParams.get('subcategory');

    // Initialize category and subcategory selects
    const categorySelect = document.getElementById('categorySelect');
    const subcategorySelect = document.getElementById('subcategorySelect');

    // Handle category selection
    categorySelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        
        // Clear and disable subcategory select
        subcategorySelect.innerHTML = '<option value="">Select Subcategory</option>';
        subcategorySelect.disabled = !selectedCategory;

        // If a category is selected, populate subcategories
        if (selectedCategory && categories[selectedCategory]) {
            categories[selectedCategory].forEach(subcategory => {
                const option = document.createElement('option');
                option.value = subcategory.toLowerCase().replace(/\s+/g, '-');
                option.textContent = subcategory;
                subcategorySelect.appendChild(option);
            });
        }

        // Update URL and filter products
        updateUrlAndFilter();
    });

    // Handle subcategory selection
    subcategorySelect.addEventListener('change', function() {
        updateUrlAndFilter();
    });

    // If category is specified in URL, set the selects
    if (category) {
        categorySelect.value = category;
        categorySelect.dispatchEvent(new Event('change'));
        
        if (subcategory) {
            subcategorySelect.value = subcategory;
        }
    }

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

    // Handle category checkbox changes
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                this.parentElement.classList.add('active');
            } else {
                this.parentElement.classList.remove('active');
            }
            filterProducts();
        });
    });

    // Handle other filter changes
    const priceInputs = document.querySelectorAll('.price-input');
    const conditionCheckboxes = document.querySelectorAll('input[name="condition"]');
    const locationSelect = document.querySelector('.location-select');

    [].forEach.call([...priceInputs, ...conditionCheckboxes, locationSelect], element => {
        element.addEventListener('change', filterProducts);
    });

    // Function to update URL and filter products
    function updateUrlAndFilter() {
        const params = new URLSearchParams(window.location.search);
        
        if (categorySelect.value) {
            params.set('category', categorySelect.value);
        } else {
            params.delete('category');
        }
        
        if (subcategorySelect.value) {
            params.set('subcategory', subcategorySelect.value);
        } else {
            params.delete('subcategory');
        }
        
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
        filterProducts();
    }

    // Function to filter products based on selected filters
    function filterProducts() {
        const selectedCategory = categorySelect.value;
        const selectedSubcategory = subcategorySelect.value;
        const searchTerm = document.getElementById('productSearch').value.toLowerCase();
        const minPrice = document.getElementById('minPrice').value;
        const maxPrice = document.getElementById('maxPrice').value;
        const selectedConditions = Array.from(document.querySelectorAll('input[name="condition"]:checked'))
            .map(checkbox => checkbox.value);
        const selectedLocation = locationSelect.value;

        // TODO: Implement actual filtering logic with your backend
        console.log('Filtering products with:', {
            category: selectedCategory,
            subcategory: selectedSubcategory,
            priceRange: { min: minPrice, max: maxPrice },
            conditions: selectedConditions,
            location: selectedLocation
        });
    }

    // Initial filter
    filterProducts();
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
    const category = document.getElementById('categorySelect').value;
    const subcategory = document.getElementById('subcategorySelect').value;
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
    document.getElementById('categorySelect').value = '';
    document.getElementById('subcategorySelect').value = '';
    document.getElementById('subcategorySelect').disabled = true;
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