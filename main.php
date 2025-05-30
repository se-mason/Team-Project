<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>iBay UK | Where deals meet desires</title>
  <link rel="icon" type="image/png" href="iBay i.png" />
  <link rel="stylesheet" href="stylesheets/mainstyle.css" />
  <link rel="stylesheet" href="stylesheets/home.css" />
  <link rel="stylesheet" href="stylesheets/popup.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
    
</head>
<body>

  <!-- Load navbar -->
  <?php include 'html-assets/navbar.php'; ?>

  <main>
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Welcome to iBay</h1>
        <p class="hero-subtitle">Your one-stop marketplace for buying and selling</p>
        <div class="hero-buttons">
          <a href="products.php" class="cta-btn primary">
            <i class="fas fa-shopping-cart"></i> Start Shopping
          </a>
          <a href="new_listing.php" class="cta-btn secondary">
            <i class="fas fa-tag"></i> Start Selling
          </a>
        </div>
      </div>
    </section>

    <section class="featured-categories">
      <h2 class="section-title">Popular Categories</h2>
      <div class="categories-grid">
        <div class="category-card">
          <i class="fas fa-mobile-alt"></i>
          <h3>Electronics</h3>
          <a href="products.php?category=electronics" class="browse-category-btn">Browse</a>
        </div>
        <div class="category-card">
          <i class="fas fa-tshirt"></i>
          <h3>Fashion</h3>
          <a href="products.php?category=fashion" class="browse-category-btn">Browse</a>
        </div>
        <div class="category-card">
          <i class="fas fa-home"></i>
          <h3>Home & Garden</h3>
          <a href="products.php?category=home" class="browse-category-btn">Browse</a>
        </div>
        <div class="category-card">
          <i class="fas fa-car"></i>
          <h3>Motors</h3>
          <a href="products.php?category=motors" class="browse-category-btn">Browse</a>
        </div>
      </div>
    </section>

     <!-- White version of featured categories

    <section class="featured-categories">
      <h2 class="section-title">How It Works</h2>
      <div class="steps-grid">
        <a href="products.php" class="step-card">
          <div class="step-icon">
            <i class="fas fa-search"></i>
          </div>
          <h3 class="step-title">Find What You Love</h3>
          <p class="step-description">Browse through millions of items across all categories</p>
        </a>
        <a href="new_listing.php" class="step-card">
          <div class="step-icon">
            <i class="fas fa-tag"></i>
          </div>
          <h3 class="step-title">List Your Items</h3>
          <p class="step-description">Create listings and reach millions of buyers</p>
        </a>
        <a href="my_listings.php" class="step-card">
          <div class="step-icon">
            <i class="fas fa-handshake"></i>
          </div>
          <h3 class="step-title">Make the Deal</h3>
          <p class="step-description">Buy and sell with confidence using our secure platform</p>
        </a>
      </div>
    </section>
-->

    <!-- Purple version of featured categories

    <section class="cta-section">
      <h2 class="cta-title">How It Works</h2>
      <div class="steps-grid">
        <a href="products.php" class="step-card">
          <div class="step-icon">
            <i class="fas fa-search"></i>
          </div>
          <h3 class="step-title">Find What You Love</h3>
          <p class="step-description">Browse through millions of items across all categories</p>
        </a>
        <a href="new_listing.php" class="step-card">
          <div class="step-icon">
            <i class="fas fa-tag"></i>
          </div>
          <h3 class="step-title">List Your Items</h3>
          <p class="step-description">Create listings and reach millions of buyers</p>
        </a>
        <a href="my_listings.php" class="step-card">
          <div class="step-icon">
            <i class="fas fa-handshake"></i>
          </div>
          <h3 class="step-title">Make the Deal</h3>
          <p class="step-description">Buy and sell with confidence using our secure platform</p>
        </a>
      </div>
    </section>
    -->
    

    <!-- Ready to get started? -->

    <section class="cta-section">
      <h2 class="cta-title">Ready to Get Started?</h2>
      <p class="cta-text">Join thousands of users finding great deals every day</p>
      <div class="cta-buttons">
        <a href="products.php" class="cta-btn primary">
          <i class="fas fa-search"></i> Explore Products
        </a>
        <a href="new_listing.php" class="cta-btn secondary">
          <i class="fas fa-tag"></i> Create Listing
        </a>
      </div>
    </section>
  </main>



  <!-- Script to handle popups, footers the navbar. these are essentials -->
  <script src="scripts/popup.js"></script>
  <script src="scripts/footer_loader.js"></script>
  <script src="scripts/menu.js"></script>
  <script src="scripts/menu_loader.js"></script>
  <script src="scripts/get_items.js"></script>

</body>
</html>
