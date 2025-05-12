<?php
if (session_status() !== PHP_SESSION_ACTIVE) session_start();
?>
<nav class="nav-container">
  <div class="header-left">
    <a href="main.php" class="logo">
      <img src="assets/iBay logo.png" alt="iBay">
    </a>
  </div>

  <div class="header-center">
    <div class="search-container">
      <input type="text" id="searchInput" class="search-bar" placeholder="Search for anything...">
      <div id="searchResults" class="search-results"></div>
      <button class="search-button">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>

  <div class="header-right">
    <div class="account-dropdown">
      <?php if (isset($_SESSION['userId'])): ?>
        <div class="dropdown">
          <button class="account-btn" onclick="toggleDropdown()">
            <i class="fas fa-user"></i> <?php echo htmlspecialchars($_SESSION['userId']); ?> ▾
          </button>
          <div class="dropdown-content" id="accountMenu">
            <a href="profile.php"><i class="fas fa-user-circle"></i> My Account</a>
            <a href="my_listings.php"><i class="fas fa-list"></i> My Listings</a>
            <a href="php/logout.php"><i class="fas fa-sign-out-alt"></i> Log out</a>
          </div>
        </div>
      <?php else: ?>
        <a href="login_page.html" class="account-btn">Sign In</a>
      <?php endif; ?>
    </div>
  </div>
</nav>

<script>
function toggleDropdown() {
  const menu = document.getElementById("accountMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}
</script>
