document.addEventListener('DOMContentLoaded', function() {
    const textEl = document.getElementById('testimonial-text');
    const nameEl = document.getElementById('testimonial-name');
    const container = document.getElementById('testimonial-container');
    let testimonials = [];
    let current = 0;

    function showTestimonial(idx) {
        container.style.opacity = 0;
        setTimeout(() => {
            textEl.textContent = `"${testimonials[idx].testimonial}"`;
            nameEl.innerHTML = `- <em>${testimonials[idx].reviewer}</em>`;
            container.style.opacity = 1;
        }, 700);
    }

    fetch('php/review_runthru.php')
        .then(response => response.json())
        .then(data => {
            testimonials = data;
            if (testimonials.length > 0) {
                showTestimonial(current);
                setInterval(() => {
                    current = (current + 1) % testimonials.length;
                    showTestimonial(current);
                }, 4000);
            }
        })
});