let searchTimeout; // Variable to store debounce timeout

document.getElementById("searchInput").addEventListener("input", function() {
    let query = this.value.trim();
    console.log("Search Query:", query);  // Debugging line

    if (query.length > 2) { 
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `search.php?q=${encodeURIComponent(query)}`, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                console.log("Response:", xhr.status, xhr.responseText); // Debug output
                document.getElementById("searchResults").innerHTML = 
                    xhr.status == 200 ? xhr.responseText : "<div class='result-item'>No results found</div>";
            }
        };
        xhr.send();
    } else {
        document.getElementById("searchResults").innerHTML = ""; 
    }
});