<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Listing | iBay</title>
  <link rel="icon" type="image/png" href="iBay i.png" />
  <link rel="stylesheet" href="stylesheets/mainstyle.css" />
  <link rel="stylesheet" href="stylesheets/my_listings.css" />

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />


</head>
<body>
    <!-- Load navbar -->
    <?php include 'html-assets/navbar.php'; ?>

  <main class="listings-container">
    <div class="listings-header">
      <h1>Add New Listing</h1>
      <a href="my_listings.php" class="new-listing-btn">
        <i class="fas fa-arrow-right"></i> My Listings
      </a>
    </div>
    
    <!-- Body section -->
    <div>
      <form id="listingForm" action="php/add_listing.php" method="POST" enctype="multipart/form-data">


          <!-- POST to hide the input information from the browser  -->

          <!-- Drop down menu for category-->
          <div class="listings-filters">

            <input type="text" name="title" placeholder="Item Name" required />

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
            <input type="number" id="price" placeholder="Price (£)" name="price" min="0" max="1000001" step="0.01" required>


          </div>

          <div class="listings-filters">
          
            <!-- Date mangement-->
            <label for="start">Bid start date:</label>
            <input type="date" id="start" name="start"/>

            <label for="end">Bid end date:</label>
            <input type="date" id="end" name="finish" required/>

          </div>

          <div class="listings-filters">
            <!-- Postage-->
            <input type="text" name="postage" placeholder="Postage Information" required />

            <!-- Description text area-->
            <textarea id="description" name="description" rows="6" placeholder="Enter a detailed Item description..." required></textarea>

          </div>

          <div class="listings-filters">
            <label>Upload up to 10 images:</label><br>
            <input type="file" name="images[]" accept="image/*" multiple required>
          </div>

          <input type="submit" value="List Item" class="new-listing-btn" />
          
        </form>

  </div>

  </main>

  

  <!-- Scripts -->
  <script src="scripts/popup.js"></script>
  <script src="scripts/footer_loader.js"></script>

</body>
</html>
