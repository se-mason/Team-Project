// Wait for the DOM content to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
  // Retrieve the logged-in user's ID from sessionStorage
  const userId = sessionStorage.getItem("userId");

  // If no userId is found, log an error and exit early
  if (!userId) {
    console.error("No user ID found in sessionStorage.");
    return;
  }

  // Fetch the user's item listings from the backend PHP script
  fetch(`../php/get_user_listings.php?userId=${userId}`)
    .then(res => res.json()) // Convert the response into JSON format
    .then(data => {
      // Get the container element where listings will be displayed
      const container = document.getElementById('listings-container');

      // If the container doesn't exist, log an error and stop
      if (!container) {
        console.error("Missing #listings-container in HTML.");
        return;
      }

      // Loop through each listing returned from the backend
      data.forEach(item => {
        // Create a new div element for each listing
        const div = document.createElement('div');
        div.className = 'listing-item'; // Apply styling class

        // Add item title, price, and a view button to the div
        div.innerHTML = `
          <h3>${item.title}</h3>
          <p>£${item.price}</p>
          <button onclick="viewItem(${item.itemId})">View</button>
        `;

        // Append the new item element to the listings container
        container.appendChild(div);
      });
    })
    .catch(err => {
      // Log any errors that occur during fetch
      console.error("Error fetching listings:", err);
    });
});

// Function called when the "View" button is clicked for an item
function viewItem(id) {
  // Redirect the browser to the item detail page with the item's ID as a query parameter
  window.location.href = `item_template.html?id=${id}`;
}
