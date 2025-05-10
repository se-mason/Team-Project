document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get('id');

  if (!itemId) {
    document.getElementById("item-title").textContent = "No item selected.";
    return;
  }

  fetch(`../php/get_item.php?id=${itemId}`)
    .then(res => res.json())
    .then(item => {
      if (item.error) {
        document.getElementById("item-title").textContent = item.error;
        return;
      }

      document.getElementById("item-title").textContent = item.title;
      document.getElementById("item-description").textContent = item.description;
      document.getElementById("item-price").textContent = item.price;

      const imgContainer = document.getElementById("item-images");
      imgContainer.innerHTML = '';

      item.images.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.style.maxWidth = '200px';
        img.style.margin = '10px';
        imgContainer.appendChild(img);
      });
    })
    .catch(err => {
      document.getElementById("item-title").textContent = "Failed to load item.";
      console.error(err);
    });
});
