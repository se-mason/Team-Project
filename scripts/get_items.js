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
  const sort = params.get('sort');

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

  // Set initial sort if provided in URL
  if (sort) {
    const radioToCheck = sort === 'price_asc' ? 'lowToHigh' : 'highToLow';
    const radio = document.querySelector(`input[name="priceSort"][value="${radioToCheck}"]`);
    if (radio) {
      radio.checked = true;
    }
  }

  // Function to clear all filters
  function clearFilters() {
    // Clear form inputs
    categorySelect.value = '';
    minPriceInput.value = '';
    maxPriceInput.value = '';
    priceSortRadios.forEach(radio => radio.checked = false);
  
    // ✅ Clear the search bar
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.value = '';
    }
  
    // Reset page
    currentPage = 1;
  
    // Clear URL parameters
    const url = new URL(window.location.href);
    url.search = '';
    window.history.pushState({}, '', url);
  
    // Fetch items without filters
    fetchItems(currentPage);
  }
  
  // Function to build filter parameters
  function buildFilterParams() {
    const params = new URLSearchParams();
  
    // Get search term from URL
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    if (search) {
      params.append("search", search);
    }
  
    // Add other filters
    const category = categorySelect.value;
    if (category) params.append('category', category);
  
    const minPrice = minPriceInput.value;
    const maxPrice = maxPriceInput.value;
    if (minPrice) params.append('minPrice', parseFloat(minPrice));
    if (maxPrice) params.append('maxPrice', parseFloat(maxPrice));
  
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
  

  // Function to update URL with current filters
  function updateURL(params) {
    const url = new URL(window.location.href);
    url.search = params.toString();
    window.history.pushState({}, '', url);
  }

  // Function to fetch items
  function fetchItems(page) {
    const params = buildFilterParams();
    params.append('page', page);
    
    // Update URL with current filters
    updateURL(params);
    
    fetch(`php/get_listings.php?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById('listings-container');
        const prevPageBtn = document.getElementById('prevPage');
        const nextPageBtn = document.getElementById('nextPage');
        const currentPageSpan = document.getElementById('currentPage');
        const sessionUserId = data.sessionUserId;
      
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
              ${item.userId == sessionUserId
                ? `<button class="edit-button" onclick="editItem(${item.itemId})">Edit</button>`
                : `<button onclick="viewItem(${item.itemId})">View</button>`}
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

// Function called when the "View" button is clicked for an item
function viewItem(id) {
  // Redirect to item detail page with query parameter
  window.location.href = `item_template.php?id=${id}`;
}

function editItem(id) {
  // Redirect to item detail page with query parameter
  window.location.href = `item_edit.php?id=${id}`;
}