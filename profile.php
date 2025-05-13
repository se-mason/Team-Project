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
  <link rel="stylesheet" href="stylesheets/signup.css" />

</head>
<body>
  <!-- Load navbar -->
  <?php include 'html-assets/navbar.php'; ?>

  <main>
  <div class="signup-wrapper">
    <div class="signup-container">
      <h2><i class="fas fa-user"></i> Your Account Details</h2>
      <form action="php/user_editp.php" method="POST" id="signupForm" novalidate>
        <div class="input-group">
          <i class="fas fa-user"></i>
          <input type="text" name="userId" placeholder="Username" required />
        </div>
        <div class="input-group">
          <i class="fas fa-id-card"></i>
          <input type="text" name="name" placeholder="Full Name" required />
        </div>
        <div class="input-group">
          <i class="fas fa-envelope"></i>
          <input type="email" name="email" placeholder="Email Address" required />
        </div>
        <div class="input-group">
          <i class="fas fa-home"></i>
          <input type="text" name="address" placeholder="Address" required />
        </div>
        <div class="input-group">
          <i class="fas fa-map-marker-alt"></i>
          <input type="text" name="postcode" id="postcode" placeholder="Postcode" required />
        </div>
        <div class="input-group">
          <i class="fas fa-lock"></i>
          <input type="password" name="password" id="password" placeholder="Change Password" required />
        </div>
        <div class="input-group">
          <i class="fas fa-lock"></i>
          <input type="password" name="confirm_password" id="confirmPassword" placeholder="Confirm New Password" required />
        </div>
        <input type="submit" value="Edit Account" class="signup-btn" />
      </form>
    </div>
  </div>

  </main>

  <script>
    const userId = <?php echo json_encode($_SESSION['userId']); ?>;
    console.log('User ID:', userId);
  </script>

  <!-- Scripts -->
  <script src="scripts/popup.js"></script>
  <script src="scripts/footer_loader.js"></script>
  <script src="scripts/edit_user.js"></script>


</body>
</html>
