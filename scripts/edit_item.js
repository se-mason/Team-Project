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
        document.getElementById("title").value = item.title;
        document.getElementById("description").value = item.description;
        document.getElementById("price").value = item.price;
        document.getElementById("postage").value = item.postage;
        document.getElementById("category-choice").value = item.category;
        document.getElementById("start").value = item.startDate.split("T")[0];
        document.getElementById("end").value = item.endDate.split("T")[0];
  
        // Add item ID to a hidden input (if it exists)
        const hiddenId = document.getElementById("itemId");
        if (hiddenId) hiddenId.value = item.itemId;
      })
      .catch(err => {
        console.error("Error loading item:", err);
        alert("Error loading item details.");
      });
  });
  