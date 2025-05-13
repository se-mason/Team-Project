<!-- Item template for viewing a listing -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Item Details | iBay</title>
  <link rel="icon" type="image/png" href="iBay i.png" />
  <!-- Link to shared stylesheet for consistent styling -->
  <link rel="stylesheet" href="stylesheets/mainstyle.css" />
  <link rel="stylesheet" href="stylesheets/item_template.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
</head>
<body>

  <!-- Load navbar -->
  <?php include 'html-assets/navbar.php'; ?>

  <!-- Section to display item details fetched from the database -->
  <div class="item-details">
    <!-- Title of the item (set by JavaScript) -->
    <h1 id="item-title"></h1>

    <!-- Image carousel -->
    <div id="image-carousel">
      <!-- Images will be loaded here by JavaScript -->
      <button class="carousel-arrow carousel-prev">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="carousel-arrow carousel-next">
        <i class="fas fa-chevron-right"></i>
      </button>
      <div class="carousel-nav">
        <!-- Navigation dots will be added by JavaScript -->
      </div>
    </div>

    <!-- Item information -->
    <div class="item-info">
      <div class="item-info-section">
        <h3>Item Details</h3>
        <p id="item-description"></p>
        <p><strong>Price:</strong> £<span id="item-price"></span></p>
        <p><strong>Postage:</strong> <span id="postage"></span></p>
      </div>

      <div class="item-info-section">
        <h3>Auction Information</h3>
        <p><strong>Start Date:</strong> <span id="start-date"></span></p>
        <p><strong>End Date:</strong> <span id="end-date"></span></p>
        <p><strong>Time Remaining:</strong> <span id="countdown-timer"></span></p>
        <button id="bid-button">Place Bid</button>
      </div>
    </div>
  </div>

  <!-- Script to dynamically insert the navbar, footer and popups -->
  <script src="scripts/popup.js"></script>
  <script src="scripts/footer_loader.js"></script>

  <!-- Script to load the item details from the server using item ID from URL -->
  <script src="scripts/load_item.js"></script>
</body>
</html>
