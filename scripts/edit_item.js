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

            // Display existing images with delete option
            const carousel = document.getElementById("image-carousel");
            item.images.forEach((image, index) => {
                const imageDiv = document.createElement('div');
                imageDiv.className = 'carousel-image';
                imageDiv.setAttribute('data-image-id', image.id); // Add image ID for deletion

                const img = document.createElement('img');
                img.src = image.url; // Assuming the image object has a URL property
                img.alt = `Image ${index + 1}`;
                img.style.maxWidth = '100px'; // Thumbnail size
                imageDiv.appendChild(img);

                // Add checkbox for deletion
                const deleteCheckbox = document.createElement('input');
                deleteCheckbox.type = 'checkbox';
                deleteCheckbox.className = 'delete-checkbox';
                deleteCheckbox.dataset.imageId = image.id; // Store the image ID
                imageDiv.appendChild(deleteCheckbox);

                carousel.appendChild(imageDiv);
            });

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

// Delete selected images from the database
function deleteImages(imageIds, itemId) {
    fetch(`php/delete_image.php?itemId=${itemId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageIds })
    })
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                alert('Selected images deleted successfully.');
                location.reload(); // Refresh the page to update the image list
            } else {
                alert('Error deleting images.');
            }
        })
        .catch(err => {
            console.error("Error deleting images:", err);
            alert("Error deleting images.");
        });
}
