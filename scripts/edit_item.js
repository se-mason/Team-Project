document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('id');

    if (!itemId) {
        alert("No item selected.");
        return;
    }

    fetch(`php/get_item.php?id=${itemId}`)
        .then(res => res.json())
        .then(item => {
            if (item.error) {
                alert("Error loading item.");
                return;
            }

            // Populate form fields
            document.getElementById("item-title").value = item.title;
            document.getElementById("item-description").value = item.description;
            document.getElementById("item-price").value = item.price;
            document.getElementById("postage").value = item.postage;
            document.getElementById("category-choice").value = item.category;

            const formatDate = (dateStr) => {
                const date = new Date(dateStr);  // Create a Date object
                return date.toISOString().split("T")[0];  // Convert to yyyy-MM-dd format
            }

            document.getElementById("start-date").value = formatDate(item.startDate);
            document.getElementById("end-date").value = formatDate(item.endDate);

            // Check if images exist and is an array
            const carousel = document.getElementById("image-carousel");
            const navDots = carousel.querySelector('.carousel-nav');
            let currentImageIndex = 0;

            if (item.images && Array.isArray(item.images) && item.images.length > 0) {
                // Create image elements
                item.images.forEach((imageData, index) => {
                    const img = document.createElement('img');
                    img.src = imageData.image; // Base64-encoded image
                    img.className = 'carousel-image';
                    img.alt = `Item image ${index + 1}`;
                    if (index === 0) img.classList.add('active');
                    carousel.insertBefore(img, navDots);

                    // Create delete button
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.type = 'button';
                    deleteBtn.dataset.imageId = imageData.imageId; // Use imageId from the response
                    deleteBtn.addEventListener('click', (e) => {
                        const imageId = e.target.dataset.imageId;

                        if (imageId) {
                            deleteImage(imageId, itemId); // Call deleteImage with imageId and itemId
                        } else {
                            alert('Image ID not found.');
                        }
                    });
                    carousel.insertBefore(deleteBtn, img.nextSibling);

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
                  <p style="font-size: 1.2rem; margin: 0;">No photo yet</p>
                  <p style="font-size: 0.9rem; margin-top: 0.5rem; color: #888;"></p>
                `;
                carousel.insertBefore(placeholder, navDots);

                // Hide navigation elements when no images
                carousel.querySelector('.carousel-prev').style.display = 'none';
                carousel.querySelector('.carousel-next').style.display = 'none';
                navDots.style.display = 'none';
            }

            // Add item ID to a hidden input (if it exists)
            const hiddenId = document.getElementById("itemId");
            if (hiddenId) hiddenId.value = item.itemId;
        })
        .catch(err => {
            console.error("Error loading item:", err);
            alert("Error loading item details.");
        });

    // Handle the delete images when the save button is clicked
    document.getElementById('save-button').addEventListener('click', () => {
        const selectedImages = document.querySelectorAll('.delete-checkbox:checked');
        const imageIdsToDelete = Array.from(selectedImages).map(checkbox => checkbox.dataset.imageId);

        if (imageIdsToDelete.length > 0) {
            deleteImages(imageIdsToDelete, itemId);
        }
    });
});

// Delete an image from the database
function deleteImage(imageId, itemId) {
    fetch(`php/delete_image.php?itemId=${itemId}&imageId=${imageId}`, {
        method: 'GET',  // Use GET to pass parameters via the URL
    })
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                alert(response.message);
                location.reload(); // Refresh the page to update the image list
            } else {
                alert(response.message);
            }
        })
        .catch(err => {
            console.error("Error deleting image:", err);
            alert("Error deleting image.");
        });
}

function showImage(index) {
    const images = document.querySelectorAll('.carousel-image');
    const dots = document.querySelectorAll('.carousel-dot');
    
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    images[index].classList.add('active');
    dots[index].classList.add('active');
}
