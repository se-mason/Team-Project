function fetchSales() {
    fetch('php/get_listings.php?page=1&per_page=10') // fetch 10 items
      .then(res => res.json())
      .then(data => {
        console.log('Sales data:', data);
        const carousel = document.getElementById('sales-carousel');
        if (!carousel) return;

        carousel.innerHTML = '';

        data.items.forEach(item => {
          const imageUrl = item.images && item.images.length > 0 
            ? item.images[0] 
            : '../assets/placeholder.jpg';

          const div = document.createElement('div');
          div.className = 'sales-card';
          div.innerHTML = `
            <img src="${imageUrl}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>£${item.price}</p>
            <button onclick="viewItem(${item.itemId})">View</button>
          `;
          carousel.appendChild(div);
        });
      })
    .catch(err => console.error('Error fetching sales items:', err));
}

// Function called when the "View" button is clicked for an item
function viewItem(itemId) {
  // Redirect to the item details page
  window.location.href = `item_template.php?id=${itemId}`;
}

document.addEventListener('DOMContentLoaded', fetchSales);

