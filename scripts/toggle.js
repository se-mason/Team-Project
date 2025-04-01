document.addEventListener("DOMContentLoaded", function () {
    const accountSection = document.getElementById("accountSection");
    const userId = sessionStorage.getItem("userId");
  
    if (!accountSection) return;
  
    if (userId) {
      // Logged in
      accountSection.innerHTML = `
        <button id="accountBtn" class="account-btn">${userId} ▾</button>
        <div id="accountMenu" class="account-menu" style="display: none;">
          <a href="profile.html">Profile</a>
          <a href="#" id="logoutBtn">Log out</a>
        </div>
      `;
  
      // Dropdown toggle
      document.getElementById("accountBtn").addEventListener("click", function () {
        const menu = document.getElementById("accountMenu");
        menu.style.display = menu.style.display === "block" ? "none" : "block";
      });
  
      // Logout action
      document.getElementById("logoutBtn").addEventListener("click", function () {
        sessionStorage.removeItem("userId");
        window.location.reload();
      });
  
    } else {
      // Not logged in
      accountSection.innerHTML = `
        <a href="login_page.html" class="account-btn">Sign In</a>
      `;
    }
  });
  