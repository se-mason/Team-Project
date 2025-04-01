// Utility function to extract the 'popup' query parameter from the URL
function getPopupMessage() {
    const params = new URLSearchParams(window.location.search);
    return params.get('popup'); // Returns the message string, or null if not found
}

// Run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const message = getPopupMessage(); // Get the popup message from the URL

    if (message) {
        const popup = document.getElementById("popup"); // Find the popup element on the page

        if (popup) {
            // Set the popup text to the decoded message (in case it's URL encoded)
            popup.textContent = decodeURIComponent(message);

            // Make the popup visible and apply styling/animation class
            popup.style.display = "block";
            popup.classList.add("show");

            // Hide the popup after 3 seconds
            setTimeout(() => {
                popup.classList.remove("show");
                popup.style.display = "none";

                // Clean up the URL by removing the ?popup=... parameter without refreshing the page
                window.history.replaceState({}, document.title, window.location.pathname);
            }, 3000);
        }
    }
});
