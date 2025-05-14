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
  <?php include 'html-assets/navbar.php';

  $userId = $_SESSION['userId']; // Get the userId from PHP session
?>
<script>
  // Set userId to sessionStorage from PHP session
  sessionStorage.setItem('userId', '<?php echo $userId; ?>');
</script>>

  <main>
  <div class="signup-wrapper">
    <div class="signup-container">
      <h2><i class="fas fa-user"></i> Your Account Details</h2>
      <form action="php/user_edit.php" method="POST" id="signupForm" novalidate>
        <div class="input-group">
          <i class="fas fa-user"></i>
          <input type="text" name="userId" id="userId" placeholder="Username" required />
        </div>
        <div class="input-group">
          <i class="fas fa-id-card"></i>
          <input type="text" name="name" id="name" placeholder="Full Name" required />
        </div>
        <div class="input-group">
          <i class="fas fa-envelope"></i>
          <input type="email" name="email" id="email" placeholder="Email Address" required />
        </div>
        <div class="input-group">
          <i class="fas fa-home"></i>
          <input type="text" name="address" id="address" placeholder="Address" required />
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
      <form action="php/delete_account.php" method="POST" style="display: inline;">
        <input type="hidden" name="userId" value="<?php echo $_SESSION['userId']; ?>" />
        <button type="submit" class="new-listing-btn delete-listing" onclick="return confirm('Are you sure you want to delete your account?');">
          <i class="fas fa-trash"></i> Delete Account
        </button>
      </form>
    </div>
  </div>

  </main>
  <!-- Scripts -->
  <script src="scripts/popup.js"></script>
  <script src="scripts/footer_loader.js"></script>
  <script src="scripts/edit_user.js"></script>


</body>
</html>
