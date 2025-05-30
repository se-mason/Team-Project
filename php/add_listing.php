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
    redirectWithPopup('../new_listing.php', 'Invalid price entered');
}

if (!$finish) {
    redirectWithPopup('../new_listing.php', 'You must enter an finish date');
}

// Check that finish date is not before start date (if start date provided)
if ($start && strtotime($start) > strtotime($finish)) {
    redirectWithPopup('../new_listing.php', 'Finish date must be after start date');
}


$stmt = $conn->prepare("INSERT INTO iBayItems (userId, title, category, price, postage, description, start, finish) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssss", $_SESSION['userId'], $title, $category, $price, $postage, $description, $start, $finish);
$stmt->execute();
$stmt->close();

// Get ID of newly created item
$itemId = $conn->insert_id;

// Process uploaded images
// Process uploaded images
$maxFiles = 10;
$allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
$uploadErrors = [];

if (!empty($_FILES['images']['name'][0])) {
    $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    foreach ($_FILES['images']['tmp_name'] as $index => $tmpName) {
        $fileName = $_FILES['images']['name'][$index];
        $fileTmp = $_FILES['images']['tmp_name'][$index];
        $fileError = $_FILES['images']['error'][$index];

        if ($fileError !== UPLOAD_ERR_OK) continue;

        $ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $fileTmp);
        finfo_close($finfo);

        if (!in_array($mimeType, $allowedMimeTypes) || !in_array($ext, $allowedExtensions)) continue;

        // Save image to DB
        $imageData = file_get_contents($fileTmp);
        $stmt = $conn->prepare("INSERT INTO iBayImages (itemId, image, mimeType) VALUES (?, ?, ?)");
        $stmt->bind_param("iss", $itemId, $imageData, $mimeType);
        $stmt->execute();
        $stmt->close();
    }
}


if (!empty($uploadErrors)) {
    redirectWithPopup("../new_listing.php", "Some images failed to upload: " . implode(', ', $uploadErrors));
    exit;
}

// Redirect with confirmation
require_once 'popup.php';
redirectWithPopup('../my_listings.php', 'Listing created successfully');
?>
