document.addEventListener("DOMContentLoaded", () => {
    fetch("../html-assets/navbar.html")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("navbar-container").innerHTML = html;
  
        const userId = sessionStorage.getItem("userId");
        const accountSection = document.getElementById("accountSection");
  
        if (userId) {
          // Account section (logged in)
          accountSection.innerHTML = `
            <button id="accountBtn" class="account-btn">Account ▾</button>
            <div id="accountMenu" class="account-menu" style="display: none;">
              <p>Logged in as <strong>${userId}</strong></p>
              <a href="profile.html">Profile</a>
              <a href="#" id="logoutBtn">Log out</a>
            </div>
          `;
  
          document.getElementById("accountBtn").addEventListener("click", () => {
            const menu = document.getElementById("accountMenu");
            menu.style.display = menu.style.display === "block" ? "none" : "block";
          });
  
          document.getElementById("logoutBtn").addEventListener("click", () => {
            sessionStorage.removeItem("userId");
            window.location.reload();
          });
  
          // Allow Add Listing
          const addListingBtn = document.getElementById("addListingBtn");
          if (addListingBtn) {
            addListingBtn.setAttribute("href", "new_listing.html");
          }
  
        } else {
          // Account section (not logged in)
          accountSection.innerHTML = `
            <a href="login_page.html" class="account-btn">Sign In</a>
          `;
  
          // Prevent Add Listing access
          const addListingBtn = document.getElementById("addListingBtn");
          if (addListingBtn) {
            addListingBtn.addEventListener("click", function (e) {
              e.preventDefault();

              const currentUrl = new URL(window.location.href);
                currentUrl.searchParams.set("popup", "Please log in to add a listing.");
                window.location.href = currentUrl.toString();
            });
          }
        }
      })
      .catch((err) => {
        console.error("Failed to load navbar:", err);
      });
  });
  