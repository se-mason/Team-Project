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
    $targetDir = "../uploads/";
    $allowedExts = ['jpg', 'jpeg', 'png'];

    foreach ($_FILES['images']['name'] as $i => $name) {
        $tmpName = $_FILES['images']['tmp_name'][$i];
        $size = $_FILES['images']['size'][$i];
        $error = $_FILES['images']['error'][$i];

        $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
        $uniqueName = uniqid() . '.' . $ext;
        $targetFile = $targetDir . $uniqueName;

        // Check for errors
        if ($error !== UPLOAD_ERR_OK) {
            echo "Error uploading file '$name'. Code: $error<br>";
            continue;
        }

        // Validate extension and MIME
        if (!in_array($ext, $allowedExts)) {
            echo "Unsupported file type for '$name'.<br>";
            continue;
        }

        // Optionally, check file size (e.g., limit to 5MB)
        if ($size > 5 * 1024 * 1024) {
            echo "File '$name' is too large. Max 5MB.<br>";
            continue;
        }

        // Move uploaded file
        if (move_uploaded_file($tmpName, $targetFile)) {
            echo "Uploaded '$name' successfully.<br>";
            // Save path to DB if needed: $uniqueName or $targetFile
        } else {
            echo "Failed to save '$name'.<br>";
        }
    }
}

if (!empty($uploadErrors)) {
    header('Content-Type: application/json');
    redirectWithPopup("../new_listing.html", "Error with image uploads");
    exit;
}



// Redirect with confirmation
require_once 'popup.php';
redirectWithPopup('../my_listings.html', 'Listing created successfully');
?>
