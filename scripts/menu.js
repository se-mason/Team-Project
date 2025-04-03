document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('.menu-btn');
  const categoriesMenu = document.querySelector('.categories-menu');
  const categoryLinks = document.querySelectorAll('.category-link');
  const subcategoryLinks = document.querySelectorAll('.subcategory-link');
  let menuTimeout;

  // Prevent default behavior for all category and subcategory links
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
    });
  });

  subcategoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
    });
  });

  // Menu button click handler
  menuBtn.addEventListener('click', function() {
    categoriesMenu.classList.toggle('active');
    if (categoriesMenu.classList.contains('active')) {
      categoriesMenu.style.left = '0';
      categoriesMenu.style.display = 'block';
    } else {
      categoriesMenu.style.left = '-300px';
      setTimeout(() => {
        categoriesMenu.style.display = 'none';
      }, 300);
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
    categoriesMenu.style.left = '-300px';
    menuTimeout = setTimeout(() => {
      categoriesMenu.style.display = 'none';
    }, 300);
  });

  // Reset scroll position when menu is closed
  categoriesMenu.addEventListener('transitionend', function() {
    if (!categoriesMenu.classList.contains('active')) {
      categoriesMenu.scrollTop = 0;
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!categoriesMenu.contains(event.target) && !menuBtn.contains(event.target)) {
      categoriesMenu.classList.remove('active');
      categoriesMenu.style.left = '-300px';
      setTimeout(() => {
        categoriesMenu.style.display = 'none';
      }, 300);
    }
  });
}); 