document.addEventListener('DOMContentLoaded', function() {
  const menu = document.querySelector('.categories-menu');
  const menuBtn = document.querySelector('.menu-btn');
  let timeoutId;

  function resetScroll() {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // Set a small delay to ensure the menu is hidden before resetting scroll
    timeoutId = setTimeout(() => {
      menu.scrollTop = 0;
    }, 300); // Match the transition duration
  }

  menuBtn.addEventListener('click', function() {
    menu.classList.toggle('active');
  });

  menu.addEventListener('mouseleave', function() {
    menu.classList.remove('active');
    resetScroll();
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
      menu.classList.remove('active');
      resetScroll();
    }
  });
}); 