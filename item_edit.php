<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Edit Listing | iBay</title>
  <link rel="icon" type="image/png" href="iBay i.png" />
  <link rel="stylesheet" href="stylesheets/mainstyle.css" />
  <link rel="stylesheet" href="stylesheets/my_listings.css" />
  <link rel="stylesheet" href="stylesheets/item_template.css" />

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />


</head>
<body>
    <!-- Load navbar -->
    <?php include 'html-assets/navbar.php'; 

    if (isset($_GET['id'])) {
    $_SESSION['itemId'] = $_GET['id'];  // Store itemId in session
    }?>

  <main class="listings-container">
    <div class="listings-header" style="position: relative;">
      <h1>Edit Listing</h1>
      <a href="my_listings.php" class="new-listing-btn">
        <i class="fas fa-arrow-right"></i> My Listings
      </a>
      <button class="delete-listing-btn" type="button" onclick="deleteListing()">
        <i class="fas fa-trash"></i> Delete Listing
      </button>
    </div>

    <!-- Body section -->
    <div>
      <form id="listingForm" action="php/edit_listing.php" method="POST" enctype="multipart/form-data">


          <!-- POST to hide the input information from the browser  -->

          <!-- Drop down menu for category-->
          <div class="listings-filters">

            <input type="text" name="title" id='item-title' placeholder="Item Name" required />

            <select id="category-choice" name="category" required>
              <option value="" disabled selected hidden>Select a category</option>
              <option value="collectables">Collectables & antiques</option>
              <option value="electronics">Electronics</option>
              <option value="home">Home & garden</option>
              <option value="sporting">Sporting goods</option>
              <option value="jewellery">Jewellery & watches</option>
              <option value="fashion">Fashion</option>
              <option value="motors">Motors</option>
              <option value="toys">Toys & games</option>
              <option value="other">Other categories</option>
            </select>

            <!-- Price, capped at 1 million-->
            <input type="number" id="item-price" placeholder="Price (£)" name="price" min="0" max="1000001" step="0.01" required>


          </div>

          <div class="listings-filters">
          
            <!-- Date mangement-->
            <label for="start">Bid start date:</label>
            <input type="date" id="start-date" name="start"/>

            <label for="end">Bid end date:</label>
            <input type="date" id="end-date" name="finish" required/>

          </div>

          <div class="listings-filters">
            <!-- Postage-->
            <input type="text" id='postage' name="postage" placeholder="Postage Information" required />

            <!-- Description text area-->
            <textarea id="item-description" name="description" rows="6" placeholder="Enter a detailed Item description..." required></textarea>

          </div>

          <div class="listings-filters">
            <!-- Existing Images Section -->
            <div id="image-carousel">
              <button class="carousel-arrow carousel-prev"><i class="fas fa-chevron-left"></i></button>
              <button class="carousel-arrow carousel-next"><i class="fas fa-chevron-right"></i></button>
              <div class="carousel-nav"></div>
            </div>
          </div>
          <div class="listings-filters">
            <label>Upload up to 10 images:</label><br>
            <input type="file" name="newImages[]" multiple />
          </div>
          <input type="hidden" name="itemId" id="itemId">

          <input type="submit" value="Save" class="new-listing-btn" />
          
        </form>

        <form action="php/delete_listing.php" method="POST" style="display: inline;">
        <input type="hidden" name="itemId" value="<?php echo $_SESSION['itemId']; ?>" />
        <button type="submit" class="new-listing-btn" onclick="return confirm('Are you sure you want to delete this listing?');">
          Delete Listing
        </button>
      </form>

  </div>

  </main>

  

  <!-- Scripts -->
  <script src="scripts/popup.js"></script>
  <script src="scripts/footer_loader.js"></script>
  <script src="scripts/edit_item.js"></script>

  <script>
  function deleteListing() {
    if (confirm('Are you sure you want to delete this listing? This cannot be undone.')) {
      // You may want to use AJAX or a form POST for real deletion
      window.location.href = 'php/delete_listing.php?id=<?php echo isset($_GET['id']) ? intval($_GET['id']) : 0; ?>';
    }
  }
  </script>

</body>
</html>
