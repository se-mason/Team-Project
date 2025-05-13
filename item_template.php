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
  <div class="item-details-flex">
    <h1 id="item-title" class="item-title-centered"></h1>
    <div class="item-columns">
      <div class="item-images-col">
        <div class="auction-badge" id="auction-badge" style="display:none;">HOT AUCTION</div>
        <div id="image-carousel">
          <button class="carousel-arrow carousel-prev"><i class="fas fa-chevron-left"></i></button>
          <button class="carousel-arrow carousel-next"><i class="fas fa-chevron-right"></i></button>
          <div class="carousel-nav"></div>
        </div>
      </div>
      <div class="item-info-col">
        <div class="seller-info" id="seller-info"></div>
        <div class="item-price-row">
          <span id="item-price"></span>
          <button id="bid-button">Buy</button>
        </div>
        <div class="item-meta">
          <p><strong>Category:</strong> <span id="category-choice"></span></p>
          <p><strong>Postage:</strong> <span id="postage"></span></p>
          <p><strong>Time Remaining:</strong> <span id="countdown-timer"></span></p>
          <p><strong>Start Date:</strong> <span id="start-date"></span></p>
          <p><strong>End Date:</strong> <span id="end-date"></span></p>
        </div>
        <div class="item-description" id="item-description"></div>
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
