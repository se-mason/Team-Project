document.addEventListener('DOMContentLoaded', () => {
    const userId = sessionStorage.getItem("userId");
  
    if (!userId) {
      console.error("No user ID found in sessionStorage.");
      return;
    }
  
    fetch(`../php/get_user_listings.php?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById('listings-container');
        if (!container) {
          console.error("Missing #listings-container in HTML.");
          return;
        }
  
        data.forEach(item => {
          const div = document.createElement('div');
          div.className = 'listing-item';
          div.innerHTML = `
            <h3>${item.title}</h3>
            <p>£${item.price}</p>
            <button onclick="viewItem(${item.itemId})">View</button>
          `;
          container.appendChild(div);
        });
      })
      .catch(err => {
        console.error("Error fetching listings:", err);
      });
  });
  
  function viewItem(id) {
    window.location.href = `item.html?id=${id}`;
  }
  