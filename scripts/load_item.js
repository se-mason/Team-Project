document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get('id');

  if (!itemId) {
    document.getElementById("item-title").textContent = "No item selected.";
    return;
  }

  fetch(`../php/get_item.php?id=${itemId}`)
    .then(res => res.json())
    .then(item => {
      if (item.error) {
        document.getElementById("item-title").textContent = item.error;
        return;
      }
    
      document.getElementById("item-title").textContent = item.title;
      document.getElementById("item-description").textContent = item.description;
      document.getElementById("item-price").textContent = item.price;
      document.getElementById("postage").textContent = item.postage;

    
      // Display dates
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);
      document.getElementById("start-date").textContent = startDate.toLocaleString();
      document.getElementById("end-date").textContent = endDate.toLocaleString();
    
      // Countdown
      const countdownEl = document.getElementById("countdown-timer");
      const bidBtn = document.getElementById("bid-button");
    
      function updateCountdown() {
        const now = new Date();
        const diff = endDate - now;
    
        if (diff <= 0) {
          countdownEl.textContent = "Auction ended.";
          bidBtn.disabled = true;
          bidBtn.style.opacity = 0.5;
          bidBtn.style.cursor = "not-allowed";
          clearInterval(timer);
        } else {
          const hours = Math.floor(diff / 1000 / 60 / 60);
          const minutes = Math.floor((diff / 1000 / 60) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          countdownEl.textContent = `${hours}h ${minutes}m ${seconds}s`;
        }
      }
    
      updateCountdown();
      const timer = setInterval(updateCountdown, 1000);
    
      // Load images
      const carousel = document.getElementById("image-carousel");
      carousel.innerHTML = '';
      item.images.slice(0, 10).forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.style.height = '120px';
        img.style.marginRight = '10px';
        img.style.borderRadius = '8px';
        img.style.border = '1px solid #ccc';
        carousel.appendChild(img);
      });
    })
    
    .catch(err => {
      console.error(err);
    });
});
