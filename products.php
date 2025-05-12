<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Products | iBay</title>
    <link rel="icon" type="image/png" href="../iBay logo.png">
    <link rel="stylesheet" href="stylesheets/mainstyle.css">
    <link rel="stylesheet" href="stylesheets/items.css">
    <link rel="stylesheet" href="stylesheets/products.css">
    <link rel="stylesheet" href="../stylesheets/my_listings.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Load navbar -->
    <?php include 'html-assets/navbar.php'; ?>

    <main>
        <aside class="filters-sidebar">
            <h2>Filters</h2>
                <div class="filters-section">
                    <div class="category-filters">
                        <select class="category-select" id="categorySelect">
                            <option value="">All Categories</option>
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
                    </div>
                </div>
                <div class="filter-section">
                    <h4>Price Range</h4>
                    <div class="price-range">
                        <input type="number" placeholder="Min" class="price-input">
                        <span>to</span>
                        <input type="number" placeholder="Max" class="price-input">
                    </div>
                </div>
                <div class="filter-section">
                    <h4>Condition</h4>
                    <label><input type="checkbox" name="condition" value="new"> New</label>
                    <label><input type="checkbox" name="condition" value="used"> Used</label>
                    <label><input type="checkbox" name="condition" value="refurbished"> Refurbished</label>
                </div>
                <div class="filter-section">
                    <h4>Location</h4>
                    <select class="location-select">
                        <option value="">All Locations</option>
                        <option value="uk">United Kingdom</option>
                        <option value="us">United States</option>
                        <option value="eu">Europe</option>
                    </select>
                </div>
            </aside>


            <!-- Listings Section -->
            <section class="listings-section">
                <div id="listings-container" class="listings-grid"></div>
                <div id="empty-state" class="empty-state hidden">
                    <i class="fas fa-box-open"></i>
                    <p>No items found.</p>
                </div>
                <div id="pagination" class="pagination">
                    <button id="prevPage">Previous</button>
                    <span id="currentPage">1</span>
                    <button id="nextPage">Next</button>
                </div>
            </section>
    </main>

    <!-- Scripts -->
    <script src="scripts/popup.js"></script>
    <script src="scripts/footer_loader.js"></script>

    <!-- Load items -->
    <script src="scripts/get_items.js"></script>

</body>
</html> 