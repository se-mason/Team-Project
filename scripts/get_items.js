// Wait for the DOM content to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
  // Constants
  const ITEMS_PER_PAGE = 9;
  let currentPage = 1;
  let totalItems = 0;

  // Retrieve the logged-in user's ID from sessionStorage
  const userId = sessionStorage.getItem("userId");

  // Get URL parameters
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  const subcategory = params.get('subcategory');
  const search = params.get('search');

  // Detect the current page from the URL
  const currentPagePath = window.location.pathname.split("/").pop() || "main.php";

  // Get the filter form and elements
  const filterForm = document.getElementById('filterForm');
  const categorySelect = document.getElementById('category');
  const subcategorySelect = document.getElementById('subcategory');
  const minPriceInput = document.getElementById('minPrice');
  const maxPriceInput = document.getElementById('maxPrice');
  const conditionCheckboxes = document.querySelectorAll('input[name="condition"]');
  const locationSelect = document.getElementById('location');
  const priceSortRadios = document.querySelectorAll('input[name="priceSort"]');

  // Initialize subcategories based on selected category
  function initializeSubcategories() {
    const category = categorySelect.value;
    subcategorySelect.innerHTML = '<option value="">All Subcategories</option>';
    
    if (category) {
      const subcategories = getSubcategories(category);
      subcategories.forEach(sub => {
        const option = document.createElement('option');
        option.value = sub;
        option.textContent = sub;
        subcategorySelect.appendChild(option);
      });
      subcategorySelect.disabled = false;
    } else {
      subcategorySelect.disabled = true;
    }
  }

  // Get subcategories for a given category
  function getSubcategories(category) {
    const subcategories = {
      'Electronics': ['Phones', 'Laptops', 'Tablets', 'Accessories'],
      'Clothing': ['Men', 'Women', 'Kids', 'Accessories'],
      'Home': ['Furniture', 'Decor', 'Kitchen', 'Garden'],
      'Sports': ['Equipment', 'Clothing', 'Accessories'],
      'Books': ['Fiction', 'Non-Fiction', 'Textbooks', 'Comics'],
      'Other': ['Miscellaneous']
    };
    return subcategories[category] || [];
  }

  // Build filter parameters
  function buildFilterParams() {
    const params = new URLSearchParams();
    
    // Category and subcategory
    const category = categorySelect.value;
    const subcategory = subcategorySelect.value;
    if (category) params.append('category', category);
    if (subcategory) params.append('subcategory', subcategory);
    
    // Price range
    const minPrice = minPriceInput.value;
    const maxPrice = maxPriceInput.value;
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    
    // Condition
    const selectedConditions = Array.from(conditionCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
    if (selectedConditions.length > 0) {
      params.append('condition', selectedConditions.join(','));
    }
    
    // Location
    const location = locationSelect.value;
    if (location) params.append('location', location);
    
    // Price sort
    const selectedPriceSort = document.querySelector('input[name="priceSort"]:checked');
    if (selectedPriceSort) {
      params.append('priceSort', selectedPriceSort.value);
    }
    
    return params;
  }

  // Function to fetch items
  function fetchItems(page) {
    let phpEndpoint;
    let queryParams = new URLSearchParams();
    
    if (currentPagePath === "my_listings.php") {
      phpEndpoint = "/php/get_listings.php";
      queryParams.append("user_only", "true");
    } else {
      phpEndpoint = "/php/get_listings.php";
    }
    
    // Add pagination
    queryParams.append("page", page);
    queryParams.append("per_page", ITEMS_PER_PAGE); 
    
    // Add filters
    const filterParams = buildFilterParams();
    filterParams.forEach((value, key) => queryParams.append(key, value));
    
    // Final full URL
    phpEndpoint += "?" + queryParams.toString();
    

    // Fetch item listings from the appropriate backend endpoint
    fetch(phpEndpoint)
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById('listings-container');
        const emptyState = document.getElementById('empty-state');
        const prevPageBtn = document.getElementById('prevPage');
        const nextPageBtn = document.getElementById('nextPage');
        const currentPageSpan = document.getElementById('currentPage');
      
        if (!Array.isArray(data.items) || data.items.length === 0) {
          if (emptyState) {
            emptyState.classList.remove('hidden');
          }
          container.innerHTML = '';
          return;
        }
      
        if (emptyState) {
          emptyState.classList.add('hidden');
        }
        if (container) {
          container.style.display = "grid"; // Show grid once items are added
        }

        // Update total items and pagination
        totalItems = data.total || data.items.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        
        // Update pagination controls
        prevPageBtn.disabled = page <= 1;
        nextPageBtn.disabled = page >= totalPages;
        currentPageSpan.textContent = page;
      
        // Clear existing items
        container.innerHTML = '';
      
        // Add new items
        data.items.forEach(item => {
          const div = document.createElement('div');
          div.className = 'listing-item';
      
          // Use the first image, fallback to placeholder
          const imageUrl = item.images && item.images.length > 0 
            ? item.images[0] 
            : '../assets/placeholder.jpg'
      
          div.innerHTML = `
            <div class="item-card">
              <img src="${imageUrl}" alt="${item.title}" class="item-thumbnail">
              <h3>${item.title}</h3>
              <p>£${item.price}</p>
              <button onclick="viewItem(${item.itemId})">View</button>
            </div>
          `;
      
          container.appendChild(div);
        });
      })
      .catch(err => {
        console.error("Error fetching listings:", err);
      });
  }

  // Set up pagination event listeners
  const prevPageBtn = document.getElementById('prevPage');
  const nextPageBtn = document.getElementById('nextPage');

  if (prevPageBtn && nextPageBtn) {
    prevPageBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        fetchItems(currentPage);
      }
    });

    nextPageBtn.addEventListener('click', () => {
      currentPage++;
      fetchItems(currentPage);
    });
  }

  // Set up filter event listeners
  if (currentPagePath === "products.php") {
    // Category select change
    const categorySelect = document.getElementById('categorySelect');
    const subcategorySelect = document.getElementById('subcategorySelect');
    
    if (categorySelect) {
      categorySelect.addEventListener('change', () => {
        currentPage = 1;
        fetchItems(currentPage);
      });
    }

    // Price range inputs
    const priceInputs = document.querySelectorAll('.price-input');
    priceInputs.forEach(input => {
      input.addEventListener('change', () => {
        currentPage = 1;
        fetchItems(currentPage);
      });
    });

    // Condition checkboxes
    const conditionCheckboxes = document.querySelectorAll('input[name="condition"]');
    conditionCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        currentPage = 1;
        fetchItems(currentPage);
      });
    });

    // Location select
    const locationSelect = document.querySelector('.location-select');
    if (locationSelect) {
      locationSelect.addEventListener('change', () => {
        currentPage = 1;
        fetchItems(currentPage);
      });
    }
  }

  // Event Listeners
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize subcategories
    initializeSubcategories();
    
    // Category change handler
    categorySelect.addEventListener('change', initializeSubcategories);
    
    // Form submission handler
    filterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      fetchItems(1); // Reset to first page when applying new filters
    });
    
    // Initial fetch
    fetchItems(currentPage);
  });
});

const itemsPerPage = 12;
let currentPage = 1;

// Function to render products for the current page
function renderProducts(page) {
  const listingsContainer = document.getElementById("listings-container");
  listingsContainer.innerHTML = ""; // Clear previous products

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToDisplay = products.slice(startIndex, endIndex);

  productsToDisplay.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "item-card";
      productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="item-thumbnail">
          <h3>${product.name}</h3>
          <p>£${product.price}</p>
          <button>View Details</button>
      `;
      listingsContainer.appendChild(productCard);
  });
}

// Function to render pagination controls
function renderPagination() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = ""; // Clear previous pagination buttons

  const totalPages = Math.ceil(products.length / itemsPerPage);

  if (totalPages <= 1) return; // No pagination needed if only one page

  for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.className = i === currentPage ? "active" : "";
      button.addEventListener("click", () => {
          currentPage = i;
          renderProducts(currentPage);
          renderPagination();
      });
      paginationContainer.appendChild(button);
  }
}

// Initial render
renderProducts(currentPage);
renderPagination();

// Function called when the "View" button is clicked for an item
function viewItem(id) {
  // Redirect to item detail page with query parameter
  window.location.href = `item_template.php?id=${id}`;
}
