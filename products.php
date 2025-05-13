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
    <link rel="stylesheet" href="stylesheets/my_listings.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
<main>

    <!-- Load navbar -->
    <?php include 'html-assets/navbar.php'; ?>

    <div class="page-layout">

        <aside class="filters-sidebar">
            <h2>Filters</h2>
            <form id="filterForm">
                <div class="filters-section">
                    <div class="category-filters">
                        <select class="category-select" id="categorySelect" name="category">
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
                    <div class="price-range-vertical">
                        <input type="number" class="price-input" id="minPrice" name="minPrice" placeholder="Min">
                        <input type="number" class="price-input" id="maxPrice" name="maxPrice" placeholder="Max">
                    </div>
                </div>
                <div class="filter-section">
                    <h4>Sort By Price</h4>
                    <label><input type="radio" name="priceSort" value="lowToHigh"> Price: Low to High</label>
                    <label><input type="radio" name="priceSort" value="highToLow"> Price: High to Low</label>
                </div>
                <button type="submit" class="apply-filters-btn">Apply Filters</button>
            </form>
        </aside>


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
</main>

<!-- Scripts -->
<script src="scripts/popup.js"></script>
<script src="scripts/footer_loader.js"></script>

<!-- Load items -->
<script src="scripts/get_items.js"></script>

</body>
</html> 