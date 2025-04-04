document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.account-section');

    // Handle navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Check for hash in URL and show corresponding section
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetNav = document.querySelector(`[data-section="${hash}"]`);
        if (targetNav) {
            targetNav.click();
        }
    }
}); 