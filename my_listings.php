<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Listings | iBay</title>
  <link rel="icon" type="image/png" href="iBay i.png" />
  <link rel="stylesheet" href="stylesheets/mainstyle.css" />
  <link rel="stylesheet" href="stylesheets/items.css" />
  <link rel="stylesheet" href="stylesheets/my_listings.css" />
  <link rel="stylesheet" href="stylesheets/my_listings.css" />

  <link rel="stylesheet" href="stylesheets/popup.css" />

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
  
</head>
<body>
  <!-- Load navbar -->
  <?php include 'html-assets/navbar.php'; ?>

  <main>
    <div class="items-container">
      <div class="listings-header">
        <h1>My Listings</h1>
        <a href="new_listing.php" class="new-listing-btn">
          <i class="fas fa-plus"></i> New Listing
        </a>
      </div>

      <div class="page-layout">

        <!-- Listings Section -->
        <section class="main-scroll-area">
              <div class="listings-grid" id="listings-container"></div>

              <div id="pagination-controls" class="pagination-controls">
              <button id="prevPage">Previous</button>
              <span id="currentPage">1</span>
              <button id="nextPage">Next</button>
              </div>
          </section>
      </div>
    </div>
  </main>

  <!-- Scripts -->
  <script src="scripts/popup.js"></script>
  <script src="scripts/footer_loader.js"></script>

  <!-- Load items -->
  <script src="scripts/get_items.js"></script>
</body>
</html> 