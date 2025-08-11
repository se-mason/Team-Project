document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const autocompleteList = document.getElementById('autocomplete-list');

    if (!searchInput || !autocompleteList) return;

    searchInput.addEventListener('input', function() {
        const query = this.value;
        if (query.length < 2) {
            autocompleteList.innerHTML = '';
            return;
        }
        fetch(`php/search_autocomplete.php?term=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                autocompleteList.innerHTML = '';
                data.forEach(item => {
                    const div = document.createElement('div');
                    div.textContent = item;
                    div.classList.add('autocomplete-item');
                    div.onclick = function() {
                        // Redirect to the search results page with the selected suggestion
                        window.location.href = `products.php?search=${encodeURIComponent(item)}`;
                    };
                    autocompleteList.appendChild(div);
                });
            });
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target !== searchInput) {
            autocompleteList.innerHTML = '';
        }
    });
});