<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Account | iBay</title>
  <link rel="icon" type="image/png" href="../iBay i.png" />
  <link rel="stylesheet" href="stylesheets/mainstyle.css" />
  <link rel="stylesheet" href="stylesheets/my_listings.css" />
  <link rel="stylesheet" href="stylesheets/signup.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
</head>
<body>
  <!-- Load navbar -->
  <?php include 'html-assets/navbar.php'; ?>

  <main>
    <div class="profile-container">
      <div class="profile-picture">
        <img src="../assets/default-profile.png" alt="Profile Picture">
        <button class="change-photo-btn">
          <i class="fas fa-camera"></i> Change Photo
        </button>
      </div>

      <div class="personal-info">
        <div class="info-group">
          <label>Username:</label>
          <span class="value" id="username">Loading...</span>
        </div>
        <div class="info-group">
          <label>Name:</label>
          <span class="value" id="name">Loading...</span>
        </div>
        <div class="info-group">
          <label>Email:</label>
          <span class="value" id="email">Loading...</span>
        </div>
        <div class="info-group">
          <label>Address:</label>
          <span class="value" id="address">Loading...</span>
        </div>
        <div class="info-group">
          <label>Postcode:</label>
          <span class="value" id="postcode">Loading...</span>
        </div>
      </div>
    </div>
  </main>

  <!-- Scripts -->
  <script src="scripts/popup.js"></script>
  <script src="scripts/footer_loader.js"></script>

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      // Get user ID from session storage
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        window.location.href = "login_page.html";
        return;
      }

      // Set username from session storage
      document.getElementById("username").textContent = userId;

      // Fetch user profile data from PHP endpoint
      fetch("../php/get_user_profile.php")
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to fetch profile data");
          }
          return response.json();
        })
        .then(data => {
          // Update the profile information
          document.getElementById("name").textContent = data.name || "Not provided";
          document.getElementById("email").textContent = data.email || "Not provided";
          document.getElementById("address").textContent = data.address || "Not provided";
          document.getElementById("postcode").textContent = data.postcode || "Not provided";
        })
        .catch(error => {
          console.error("Error fetching profile data:", error);
          // Show error state in the UI
          document.getElementById("name").textContent = "Error loading data";
          document.getElementById("email").textContent = "Error loading data";
          document.getElementById("address").textContent = "Error loading data";
          document.getElementById("postcode").textContent = "Error loading data";
        });
    });
  </script>
</body>
</html>
