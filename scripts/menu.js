document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('.menu-button');
  const categoriesMenu = document.querySelector('.categories-menu');
  const categoryLinks = document.querySelectorAll('.category-link');
  const subcategoryLinks = document.querySelectorAll('.subcategory-link');
  const accountBtn = document.querySelector('.account-btn');
  const dropdownContent = document.querySelector('.dropdown-content');
  let menuTimeout;

  // Function to reset menu scroll
  function resetMenuScroll() {
    categoriesMenu.scrollTop = 0;
  }

  // Function to close menu
  function closeMenu() {
    categoriesMenu.classList.remove('active');
    categoriesMenu.style.left = '-300px';
    setTimeout(() => {
      categoriesMenu.style.display = 'none';
      resetMenuScroll();
    }, 300);
  }

  // Menu button click handler
  menuBtn.addEventListener('click', function() {
    categoriesMenu.classList.toggle('active');
    if (categoriesMenu.classList.contains('active')) {
      categoriesMenu.style.left = '0';
      categoriesMenu.style.display = 'block';
    } else {
      closeMenu();
    }
  });

  // Mouse enter handler for menu
  categoriesMenu.addEventListener('mouseenter', function() {
    clearTimeout(menuTimeout);
    categoriesMenu.style.left = '0';
    categoriesMenu.style.display = 'block';
  });

  // Mouse leave handler for menu
  categoriesMenu.addEventListener('mouseleave', function() {
    closeMenu();
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!categoriesMenu.contains(event.target) && !menuBtn.contains(event.target)) {
      closeMenu();
    }
    // Also close dropdown if clicking outside
    if (!accountBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
      dropdownContent.style.display = 'none';
    }
  });

  // Reset scroll when menu is closed
  categoriesMenu.addEventListener('transitionend', function() {
    if (!categoriesMenu.classList.contains('active')) {
      resetMenuScroll();
    }
  });

  // Handle category and subcategory link clicks
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Allow the default navigation behavior
      // The menu will close automatically due to the click outside handler
    });
  });

  subcategoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Allow the default navigation behavior
      // The menu will close automatically due to the click outside handler
    });
  });

  // Account dropdown functionality
  accountBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  });

  // Handle logout
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'login.html';
    });
  }
}); 