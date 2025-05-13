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

  // Function to build filter parameters
  function buildFilterParams() {
    const filterParams = new URLSearchParams();
    
    // Add existing URL parameters
    if (category) filterParams.append('category', category);
    if (search) filterParams.append('search', search);

    // Add price range filters
    const minPrice = document.querySelector('input[placeholder="Min"]').value;
    const maxPrice = document.querySelector('input[placeholder="Max"]').value;
    if (minPrice) filterParams.append('minPrice', minPrice);
    if (maxPrice) filterParams.append('maxPrice', maxPrice);

    // Add condition filters
    const sort = Array.from(document.querySelectorAll('input[name="sort"]:checked'))
      .map(checkbox => checkbox.value);
    if (sort.length > 0) {
      filterParams.append('sort', sort.join(','));
    }

    // Add location filter


    return filterParams;
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
