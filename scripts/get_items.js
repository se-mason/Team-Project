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
  const categorySelect = document.getElementById('categorySelect');
  const minPriceInput = document.getElementById('minPrice');
  const maxPriceInput = document.getElementById('maxPrice');
  const priceSortRadios = document.querySelectorAll('input[name="priceSort"]');
  const clearFiltersBtn = document.getElementById('clearFilters');

  // Set initial category if provided in URL
  if (category && categorySelect) {
    categorySelect.value = category;
  }

  // Function to clear all filters
  function clearFilters() {
    categorySelect.value = '';
    minPriceInput.value = '';
    maxPriceInput.value = '';
    priceSortRadios.forEach(radio => radio.checked = false);
    currentPage = 1;
    fetchItems(currentPage);
  }

  // Function to build filter parameters
  function buildFilterParams() {
    const params = new URLSearchParams();
    
    // Category
    const category = categorySelect.value;
    if (category) params.append('category', category);
    
    // Price range
    const minPrice = minPriceInput.value;
    const maxPrice = maxPriceInput.value;
    if (minPrice) params.append('minPrice', parseFloat(minPrice));
    if (maxPrice) params.append('maxPrice', parseFloat(maxPrice));
    
    // Price sort
    const selectedPriceSort = document.querySelector('input[name="priceSort"]:checked');
    if (selectedPriceSort) {
      if (selectedPriceSort.value === 'lowToHigh') {
        params.append('sort', 'price_asc');
      } else if (selectedPriceSort.value === 'highToLow') {
        params.append('sort', 'price_desc');
      }
    }
    
    return params;
  }

  // Function to fetch items
  function fetchItems(page) {
    const params = buildFilterParams();
    params.append('page', page);
    
    fetch(`php/get_listings.php?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById('listings-container');
        const prevPageBtn = document.getElementById('prevPage');
        const nextPageBtn = document.getElementById('nextPage');
        const currentPageSpan = document.getElementById('currentPage');
      
        if (!Array.isArray(data.items) || data.items.length === 0) {
          container.innerHTML = '<div class="empty-state"><p>No items found matching your filters.</p></div>';
          return;
        }
      
        container.style.display = "grid";

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

  // Form submission handler
  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    currentPage = 1;
    fetchItems(currentPage);
  });

  // Clear filters button handler
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearFilters);
  }
  
  // Initial fetch
  fetchItems(currentPage);
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