<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Account | iBay</title>
  <link rel="icon" type="image/png" href="iBay i.png" />
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

</body>
</html>
