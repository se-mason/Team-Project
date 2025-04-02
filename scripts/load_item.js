// Wait until the DOM is fully loaded before running this script
document.addEventListener('DOMContentLoaded', () => {

    // Parse the URL parameters and extract the 'id' parameter (item ID)
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('id');
  
    // If no item ID is found in the URL, show a fallback message and stop execution
    if (!itemId) {
      document.getElementById("item-title").textContent = "No item selected.";
      return;
    }
  
    // Fetch item data from the server-side PHP script using the item ID
    fetch(`../php/get_item.php?id=${itemId}`)
      .then(res => res.json()) // Parse the JSON response
      .then(item => {
        // If the server returns an error (e.g., item not found), show it to the user
        if (item.error) {
          document.getElementById("item-title").textContent = item.error;
          return;
        }
  
        // Store and display the retrieved item data in the respective DOM elements
        document.getElementById("item-title").textContent = item.title;
        document.getElementById("item-description").textContent = item.description;
        document.getElementById("item-price").textContent = item.price;
  
        // Handle image display
        const img = document.getElementById("item-image");
        if (item.imageUrl) { // If the item has an image URL, set the image source and alt text
          img.src = item.imageUrl;
          img.alt = item.title;
          img.style.display = 'block'; // Make sure the image is visible
        }
      })
      .catch(err => {
        // Handle any network or unexpected errors
        document.getElementById("item-title").textContent = "Failed to load item.";
        console.error(err);
      });
  });
  