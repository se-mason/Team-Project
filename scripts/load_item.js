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
      const navDots = carousel.querySelector('.carousel-nav');
      let currentImageIndex = 0;
      
      if (item.images && item.images.length > 0) {
        // Create image elements
        item.images.forEach((imageUrl, index) => {
          const img = document.createElement('img');
          img.src = imageUrl;
          img.className = 'carousel-image';
          img.alt = `Item image ${index + 1}`;
          if (index === 0) img.classList.add('active');
          carousel.insertBefore(img, navDots);
          
          // Create navigation dot
          const dot = document.createElement('div');
          dot.className = 'carousel-dot';
          if (index === 0) dot.classList.add('active');
          dot.addEventListener('click', () => {
            currentImageIndex = index;
            showImage(index);
          });
          navDots.appendChild(dot);
        });
        
        // Set up carousel navigation
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        
        prevBtn.addEventListener('click', () => {
          currentImageIndex = (currentImageIndex - 1 + item.images.length) % item.images.length;
          showImage(currentImageIndex);
        });
        
        nextBtn.addEventListener('click', () => {
          currentImageIndex = (currentImageIndex + 1) % item.images.length;
          showImage(currentImageIndex);
        });
        
        // Show first image
        showImage(0);
      } else {
        // No images, show placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'carousel-image active';
        placeholder.style.display = 'flex';
        placeholder.style.flexDirection = 'column';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.height = '100%';
        placeholder.style.color = '#666';
        placeholder.innerHTML = `
          <i class="fas fa-image fa-5x" style="margin-bottom: 1rem; color: #601a8a;"></i>
          <p style="font-size: 1.2rem; margin: 0;">No images available</p>
          <p style="font-size: 0.9rem; margin-top: 0.5rem; color: #888;">This item has no images</p>
        `;
        carousel.insertBefore(placeholder, navDots);
        
        // Hide navigation elements when no images
        carousel.querySelector('.carousel-prev').style.display = 'none';
        carousel.querySelector('.carousel-next').style.display = 'none';
        navDots.style.display = 'none';
      }
    })
    
    .catch(err => {
      console.error("Error loading item:", err);
      document.getElementById("item-title").textContent = "Error loading item details.";
    });
});

function showImage(index) {
  const images = document.querySelectorAll('.carousel-image');
  const dots = document.querySelectorAll('.carousel-dot');
  
  images.forEach(img => img.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  images[index].classList.add('active');
  dots[index].classList.add('active');
}
