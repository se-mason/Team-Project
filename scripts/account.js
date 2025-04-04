document.addEventListener('DOMContentLoaded', function() {
    // Get all sidebar items and sections
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const sections = document.querySelectorAll('.account-section');

    // Add click event listeners to all sidebar items
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all sidebar items and sections
            sidebarItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Get the corresponding section ID and show it
            const sectionId = this.getAttribute('href').substring(1);
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Check if there's a hash in the URL and show the corresponding section
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetSection = document.getElementById(hash);
        const targetSidebarItem = document.querySelector(`[href="#${hash}"]`);

        if (targetSection && targetSidebarItem) {
            sections.forEach(s => s.classList.remove('active'));
            sidebarItems.forEach(i => i.classList.remove('active'));
            
            targetSection.classList.add('active');
            targetSidebarItem.classList.add('active');
        }
    }
}); 