document.addEventListener('DOMContentLoaded', function() {
    const categoriesMenu = document.querySelector('.categories-menu');
    if (categoriesMenu) {
        // Create a basic menu structure
        categoriesMenu.innerHTML = `
            <div class="menu-header">
                <h3>Categories</h3>
            </div>
            <div class="category-section">
                <h4 class="category-title"><a href="products.html?category=collectables" class="category-link">Collectables & antiques</a></h4>
                <ul class="subcategory-list">
                    <li class="subcategory-item"><a href="products.html?category=collectables&subcategory=collectables" class="subcategory-link">Collectables</a></li>
                    <li class="subcategory-item"><a href="products.html?category=collectables&subcategory=antiques" class="subcategory-link">Antiques</a></li>
                    <li class="subcategory-item"><a href="products.html?category=collectables&subcategory=sports-memorabilia" class="subcategory-link">Sports memorabilia</a></li>
                    <li class="subcategory-item"><a href="products.html?category=collectables&subcategory=coins" class="subcategory-link">Coins</a></li>
                    <li class="subcategory-item"><a href="products.html?category=collectables&subcategory=other" class="subcategory-link">Other</a></li>
                </ul>
            </div>
            <div class="category-section">
                <h4 class="category-title"><a href="products.html?category=electronics" class="category-link">Electronics</a></h4>
                <ul class="subcategory-list">
                    <li class="subcategory-item"><a href="products.html?category=electronics&subcategory=mobile-phones" class="subcategory-link">Mobile phones</a></li>
                    <li class="subcategory-item"><a href="products.html?category=electronics&subcategory=sound-vision" class="subcategory-link">Sound & vision</a></li>
                    <li class="subcategory-item"><a href="products.html?category=electronics&subcategory=video-games" class="subcategory-link">Video games</a></li>
                    <li class="subcategory-item"><a href="products.html?category=electronics&subcategory=computers-tablets" class="subcategory-link">Computers & tablets</a></li>
                    <li class="subcategory-item"><a href="products.html?category=electronics&subcategory=other" class="subcategory-link">Other</a></li>
                </ul>
            </div>
            <div class="category-section">
                <h4 class="category-title"><a href="products.html?category=home" class="category-link">Home & garden</a></h4>
                <ul class="subcategory-list">
                    <li class="subcategory-item"><a href="products.html?category=home&subcategory=garden" class="subcategory-link">Garden</a></li>
                    <li class="subcategory-item"><a href="products.html?category=home&subcategory=appliances" class="subcategory-link">Appliances</a></li>
                    <li class="subcategory-item"><a href="products.html?category=home&subcategory=diy-materials" class="subcategory-link">DIY materials</a></li>
                    <li class="subcategory-item"><a href="products.html?category=home&subcategory=furniture-homeware" class="subcategory-link">Furniture & homeware</a></li>
                    <li class="subcategory-item"><a href="products.html?category=home&subcategory=other" class="subcategory-link">Other</a></li>
                </ul>
            </div>
            <div class="category-section">
                <h4 class="category-title"><a href="products.html?category=sporting" class="category-link">Sporting goods</a></h4>
                <ul class="subcategory-list">
                    <li class="subcategory-item"><a href="products.html?category=sporting&subcategory=cycling" class="subcategory-link">Cycling</a></li>
                    <li class="subcategory-item"><a href="products.html?category=sporting&subcategory=fishing" class="subcategory-link">Fishing</a></li>
                    <li class="subcategory-item"><a href="products.html?category=sporting&subcategory=fitness-running-yoga" class="subcategory-link">Fitness, running & yoga</a></li>
                    <li class="subcategory-item"><a href="products.html?category=sporting&subcategory=golf" class="subcategory-link">Golf</a></li>
                    <li class="subcategory-item"><a href="products.html?category=sporting&subcategory=other" class="subcategory-link">Other</a></li>
                </ul>
            </div>
            <div class="category-section">
                <h4 class="category-title"><a href="products.html?category=jewellery" class="category-link">Jewellery & watches</a></h4>
                <ul class="subcategory-list">
                    <li class="subcategory-item"><a href="products.html?category=jewellery&subcategory=luxury-watches" class="subcategory-link">Luxury Watches</a></li>
                    <li class="subcategory-item"><a href="products.html?category=jewellery&subcategory=costume-jewellery" class="subcategory-link">Costume jewellery</a></li>
                    <li class="subcategory-item"><a href="products.html?category=jewellery&subcategory=vintage-antique-jewellery" class="subcategory-link">Vintage & antique jewellery</a></li>
                    <li class="subcategory-item"><a href="products.html?category=jewellery&subcategory=fine-jewellery" class="subcategory-link">Fine jewellery</a></li>
                    <li class="subcategory-item"><a href="products.html?category=jewellery&subcategory=other" class="subcategory-link">Other</a></li>
                </ul>
            </div>
            <div class="category-section">
                <h4 class="category-title"><a href="products.html?category=fashion" class="category-link">Fashion</a></h4>
                <ul class="subcategory-list">
                    <li class="subcategory-item"><a href="products.html?category=fashion&subcategory=womens-clothing" class="subcategory-link">Women's clothing</a></li>
                    <li class="subcategory-item"><a href="products.html?category=fashion&subcategory=mens-clothing" class="subcategory-link">Men's clothing</a></li>
                    <li class="subcategory-item"><a href="products.html?category=fashion&subcategory=shoes" class="subcategory-link">Shoes</a></li>
                    <li class="subcategory-item"><a href="products.html?category=fashion&subcategory=kids-fashion" class="subcategory-link">Kid's fashion</a></li>
                    <li class="subcategory-item"><a href="products.html?category=fashion&subcategory=sneakers" class="subcategory-link">Sneakers</a></li>
                    <li class="subcategory-item"><a href="products.html?category=fashion&subcategory=other" class="subcategory-link">Other</a></li>
                </ul>
            </div>
            <div class="category-section">
                <h4 class="category-title"><a href="products.html?category=motors" class="category-link">Motors</a></h4>
                <ul class="subcategory-list">
                    <li class="subcategory-item"><a href="products.html?category=motors&subcategory=cars" class="subcategory-link">Cars</a></li>
                    <li class="subcategory-item"><a href="products.html?category=motors&subcategory=car-parts" class="subcategory-link">Car parts</a></li>
                    <li class="subcategory-item"><a href="products.html?category=motors&subcategory=motorcycles-scooters" class="subcategory-link">Motorcycles & scooters</a></li>
                    <li class="subcategory-item"><a href="products.html?category=motors&subcategory=motorcycle-parts" class="subcategory-link">Motorcycle parts</a></li>
                    <li class="subcategory-item"><a href="products.html?category=motors&subcategory=other" class="subcategory-link">Other</a></li>
                </ul>
            </div>
            <div class="category-section">
                <h4 class="category-title"><a href="products.html?category=toys" class="category-link">Toys & games</a></h4>
                <ul class="subcategory-list">
                    <li class="subcategory-item"><a href="products.html?category=toys&subcategory=radio-controlled" class="subcategory-link">Radio controlled</a></li>
                    <li class="subcategory-item"><a href="products.html?category=toys&subcategory=construction-toys" class="subcategory-link">Construction toys</a></li>
                    <li class="subcategory-item"><a href="products.html?category=toys&subcategory=outdoor-toys" class="subcategory-link">Outdoor toys</a></li>
                    <li class="subcategory-item"><a href="products.html?category=toys&subcategory=action-figures" class="subcategory-link">Action figures</a></li>
                    <li class="subcategory-item"><a href="products.html?category=toys&subcategory=other" class="subcategory-link">Other</a></li>
                </ul>
            </div>
            <div class="category-section">
                <h4 class="category-title"><a href="products.html?category=other" class="category-link">Other categories</a></h4>
                <ul class="subcategory-list">
                    <li class="subcategory-item"><a href="products.html?category=other&subcategory=books-comics-magazines" class="subcategory-link">Books, comics & magazines</a></li>
                    <li class="subcategory-item"><a href="products.html?category=other&subcategory=health-beauty" class="subcategory-link">Health & beauty</a></li>
                    <li class="subcategory-item"><a href="products.html?category=other&subcategory=musical-instruments" class="subcategory-link">Musical instruments</a></li>
                    <li class="subcategory-item"><a href="products.html?category=other&subcategory=business-office-industrial" class="subcategory-link">Business, office & industrial</a></li>
                    <li class="subcategory-item"><a href="products.html?category=other&subcategory=other" class="subcategory-link">Other</a></li>
                </ul>
            </div>
        `;
    }
}); 