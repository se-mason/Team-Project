// Wait for the DOM content to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
  // Retrieve the logged-in user's ID from sessionStorage
  const userId = sessionStorage.getItem("userId");

  // Detect the current page from the URL (e.g., 'profile.html' or 'home.html')
  // If the URL ends in '/' (i.e., home page), default to 'home.html'
  const currentPage = window.location.pathname.split("/").pop() || "html/home.html";

  // Determine which PHP file to call based on the page
  let phpEndpoint = "";

  if (currentPage === "html/profile.html") {
    // Profile page: must have a logged-in user
    if (!userId) {
      console.error("No user ID found in sessionStorage.");
      return;
    }
    phpEndpoint = `../php/get_user_listings.php?userId=${userId}`;
  } else if (currentPage === "html/home.html") {
    // Homepage: show all items not posted by the user if logged in, or all items if not
    phpEndpoint = userId 
      ? `../php/get_non_user_listings.php?userId=${userId}`
      : `../php/get_non_user_listings.php`;
  } else {
    // For unsupported pages, do nothing
    console.warn("This page does not require item loading.");
    return;
  }

  // Fetch item listings from the appropriate backend endpoint
  fetch(phpEndpoint)
    .then(res => res.json())
    .then(data => {
      // Validate that we received an array
      if (!Array.isArray(data)) {
        console.error("Expected an array but received:", data);
        return;
      }

      // Get the container where listings will be rendered
      const container = document.getElementById('listings-container');
      if (!container) {
        console.error("Missing #listings-container in HTML.");
        return;
      }

      // For each listing, create and append a display block
      data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'listing-item'; // For CSS styling

        // Insert item title, price, and view button
        div.innerHTML = `
          <h3>${item.title}</h3>
          <p>£${item.price}</p>
          <button onclick="viewItem(${item.itemId})">View</button>
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
