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
  
        // Add item ID to a hidden input (if it exists)
        const hiddenId = document.getElementById("itemId");
        if (hiddenId) hiddenId.value = item.itemId;
      })
      .catch(err => {
        console.error("Error loading item:", err);
        alert("Error loading item details.");
      });
  });
  