// Wait for the DOM content to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
  // Retrieve the logged-in user's ID from sessionStorage
  const userId = sessionStorage.getItem("userId");

  // Detect the current page from the URL (e.g., 'profile.html' or 'standard_index.html')
  // If the URL ends in '/' (i.e., home page), default to 'standard_index.html'
  const currentPage = window.location.pathname.split("/").pop() || "standard_index.html";

  // Determine which PHP file to call based on the page
  let phpEndpoint = "";

  if (currentPage === "my_listings.html") {
    // Profile page: must have a logged-in user
    if (!userId) {
      console.error("No user ID found in sessionStorage.");
      return;
    }
    phpEndpoint = `../php/get_user_listings.php?userId=${userId}`;
  } else{
    // Homepage: show all items not posted by the user if logged in, or all items if not
    phpEndpoint = userId 
      ? `../php/get_non_user_listings.php?userId=${userId}`
      : `../php/get_non_user_listings.php`;
  }

  // Fetch item listings from the appropriate backend endpoint
  fetch(phpEndpoint)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('listings-container');
      const emptyState = document.getElementById('empty-state');
    
      if (!Array.isArray(data) || data.length === 0) {
        emptyState.classList.remove('hidden');
        return;
      }
    
      emptyState.classList.add('hidden');
      container.style.display = "grid"; // Show grid once items are added

    
      data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'listing-item';
    
        // Use the first image, fallback to placeholder
        const imageUrl = item.images && item.images.length > 0 
          ? item.images[0] 
          : '../assets/placeholder.png';
    
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
      // Catch any fetch or server-side errors
      console.error("Error fetching listings:", err);
    });
});

// Function called when the "View" button is clicked for an item
function viewItem(id) {
  // Redirect to item detail page with query parameter
  window.location.href = `item_template.html?id=${id}`;
}
