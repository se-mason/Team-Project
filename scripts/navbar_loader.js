// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => {

  // Fetch the shared navbar HTML fragment from an external file
  fetch("../html-assets/navbar.html")
    .then((response) => response.text()) // Convert the response to plain text
    .then((html) => {
      // Insert the navbar HTML into the page
      document.getElementById("navbar-container").innerHTML = html;

      // Get the userId from sessionStorage (used to determine login status)
      const userId = sessionStorage.getItem("userId");
      const accountSection = document.getElementById("accountSection");

      if (userId) {
        // 🟢 Logged-in view: show account button with dropdown and logout

        accountSection.innerHTML = `
          <button id="accountBtn" class="account-btn">${userId} ▾</button>
          <div id="accountMenu" class="account-menu" style="display: none;">
            <a href="profile.html">Profile</a>
            <a href="standard_index.html" id="logoutBtn">Log out</a>
          </div>
        `;

        // Toggle dropdown menu when account button is clicked
        document.getElementById("accountBtn").addEventListener("click", () => {
          const menu = document.getElementById("accountMenu");
          menu.style.display = menu.style.display === "block" ? "none" : "block";
        });

        // Clear session and redirect to the home page when logging out
        document.getElementById("logoutBtn").addEventListener("click", () => {
          sessionStorage.removeItem("userId");
          window.location.href = "standard_index.html"; // Redirect to home page
        });

        // Enable "Add Listing" button if it exists
        const addListingBtn = document.getElementById("addListingBtn");
        if (addListingBtn) {
          addListingBtn.setAttribute("href", "new_listing.html");
        }

      } else {
        // 🔴 Logged-out view: show "Sign In" button and block listing access

        accountSection.innerHTML = `
          <a href="login_page.html" class="account-btn">Sign In</a>
        `;

        // Disable "Add Listing" button and redirect to login with a message
        const addListingBtn = document.getElementById("addListingBtn");
        if (addListingBtn) {
          addListingBtn.addEventListener("click", function (e) {
            e.preventDefault(); // Stop default link behavior

            // Append a message to the current URL and redirect
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set("popup", "Please log in to add a listing.");
            window.location.href = currentUrl.toString();
          });
        }
      }
    })
    .catch((err) => {
      // Handle any errors while loading the navbar
      console.error("Failed to load navbar:", err);
    });
});
