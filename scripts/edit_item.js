let imageElements = [];
let currentImageIndex = 0;

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

            if (item.images && Array.isArray(item.images) && item.images.length > 0) {
                // Create image elements
                item.images.forEach((imageData, index) => {
                    const img = document.createElement('img');
                    img.src = imageData.image; // Base64-encoded image
                    img.className = 'carousel-image';
                    img.dataset.imageId = imageData.imageId;

                    img.alt = `Item image ${index + 1}`;
                    if (index === 0) img.classList.add('active');
                    carousel.insertBefore(img, navDots);

                    imageElements.push(img);


                    // Create delete button
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.type = 'button';
                    deleteBtn.dataset.imageId = imageData.imageId; // Make sure imageId is set correctly
                    deleteBtn.addEventListener('click', (e) => {
                        const imageId = e.target.dataset.imageId;  // Get the imageId from the clicked button

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

                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();  // Prevent any default behavior (if needed)
                    currentImageIndex = (currentImageIndex - 1 + item.images.length) % item.images.length;
                    showImage(currentImageIndex);
                });
                
                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();  // Prevent any default behavior (if needed)
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

function deleteImage(imageId, itemId) {
    fetch(`php/delete_image.php?itemId=${itemId}&imageId=${imageId}`, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(response => {
        if (response.success) {
            alert(response.message);

            // Remove the image and the corresponding navigation dot
            const imageToRemove = document.querySelector(`img[data-image-id="${imageId}"]`);
            const dotToRemove = document.querySelector(`.carousel-dot[data-image-id="${imageId}"]`);
            const indexToRemove = imageElements.findIndex(img => img.dataset.imageId === imageId);
            if (indexToRemove !== -1) {
                imageElements[indexToRemove].remove();
                imageElements.splice(indexToRemove, 1);
                }


            if (imageToRemove) {
                imageToRemove.remove();  // Remove the image from DOM
            }
            if (dotToRemove) {
                dotToRemove.remove();  // Remove the corresponding navigation dot from DOM
            }

            // Adjust active image if the current one is deleted
            if (imageToRemove && imageToRemove.classList.contains('active')) {
                currentImageIndex = (currentImageIndex >= imageElements.length) ? 0 : currentImageIndex;
                showImage(currentImageIndex);
            }
            location.reload();


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
    imageElements.forEach(img => img.classList.remove('active'));
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach(dot => dot.classList.remove('active'));

    if (imageElements[index]) imageElements[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
}
