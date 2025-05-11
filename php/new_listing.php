<?php
require 'connection.php';
require_once 'popup.php';

// Start the session if you need to check if a user is logged in
session_start();

// Redirect with a popup if user is not logged in, catcehes log out when on listing page
if (!isset($_SESSION['userId'])) {
    require_once 'popup.php';
    redirectWithPopup('../login_page.html', 'Please log in to list an item');
}

// Read POST data safely
$title = trim($_POST['title']);
$category = $_POST['category'];
$price = floatval($_POST['price']);
$postage = trim($_POST['postage']);
$description = trim($_POST['description']);
$start = $_POST['start'] ?: null; // Optional field
$finish = $_POST['finish'];

// Additional validation
if ($price < 0 || $price > 1000000) {
    redirectWithPopup('../new_listing.html', 'Invalid price entered');
}

if (!$finish) {
    redirectWithPopup('../new_listing.html', 'You must enter an finish date');
}

// Check that finish date is not before start date (if start date provided)
if ($start && strtotime($start) > strtotime($finish)) {
    redirectWithPopup('../new_listing.html', 'Finish date must be after start date');
}


$stmt = $conn->prepare("INSERT INTO iBayItems (userId, title, category, price, postage, description, start, finish) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssss", $_SESSION['userId'], $title, $category, $price, $postage, $description, $start, $finish);
$stmt->execute();
$stmt->close();

// Get ID of newly created item
$itemId = $conn->insert_id;

// Process uploaded images
$maxFiles = 10;
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

if (!empty($_FILES['images']['name'][0])) {
    $fileCount = count($_FILES['images']['name']);

    if ($fileCount > $maxFiles) {
        redirectWithPopup('../new_listing.html', 'You can only upload up to 10 images.');
    }

    for ($i = 0; $i < $fileCount; $i++) {
        $tmpName = $_FILES['images']['tmp_name'][$i];
        $fileName = $_FILES['images']['name'][$i];
        $fileSize = $_FILES['images']['size'][$i];
        $fileType = mime_content_type($tmpName);

        if (!in_array($fileType, $allowedTypes)) {
            continue; // Skip unsupported types
        }

        $imageData = file_get_contents($tmpName);

        $stmtImg = $conn->prepare("INSERT INTO iBayImages (image, mimeType, imageSize, itemId) VALUES (?, ?, ?, ?)");
        $stmtImg->bind_param("ssii", $imageData, $fileType, $fileSize, $itemId);
        $stmtImg->send_long_data(0, $imageData); // Required for BLOBs in some configs
        $stmtImg->execute();
        $stmtImg->close();
    }
}


// Redirect with confirmation
require_once 'popup.php';
redirectWithPopup('../my_listings.html', 'Listing created successfully');
?>
