<?php
session_start();
require 'connection.php';
require_once 'popup.php';

header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['userId'])) {
    echo json_encode(["success" => false, "error" => "User not logged in."]);
    exit;
}

// Check if itemId is passed in the URL
if (isset($_SESSION['itemId'])) {
    $itemId = $_SESSION['itemId'];  // Retrieve itemId from session
    echo "Item ID from session: " . $itemId;
} else {
    echo "Item ID not found in session.";
}

$userId = $_SESSION['userId'];

// Get data from the POST request
$title      = $_POST['title'];
$description= $_POST['description'];
$price      = $_POST['price'];
$postage    = $_POST['postage'];
$category   = $_POST['category'];
$start      = $_POST['start'];
$end        = $_POST['finish'];

// Prepare SQL query to update the item
$sql = "UPDATE iBayItems
        SET title=?, description=?, price=?, postage=?, category=?, start=?, finish=?
        WHERE itemId=? AND userId=?";
$stmt = $conn->prepare($sql);

// Make sure start and end dates are formatted correctly
$startDate = date("Y-m-d", strtotime($start));
$endDate = date("Y-m-d", strtotime($end));

// Bind parameters and execute
$stmt->bind_param("ssdssssii", $title, $description, $price, $postage, $category, $startDate, $endDate, $itemId, $userId);
$stmt->execute();

// Handle image upload
if (!empty($_FILES['newImages']['name'][0])) {
    $fileCount = count($_FILES['newImages']['name']);
    for ($i = 0; $i < $fileCount; $i++) {
        $imageName = $_FILES['newImages']['name'][$i];
        $imageTmpName = $_FILES['newImages']['tmp_name'][$i];
        $imageData = file_get_contents($imageTmpName);

        // Insert the new image into the database
        $stmt = $conn->prepare("INSERT INTO iBayImages (itemId, image) VALUES (?, ?)");
        $stmt->bind_param("is", $itemId, $imageData);

        if ($stmt->execute()) {
            // Success: return a success message or redirect
            unset($_SESSION['itemId']);
            redirectWithPopup("../my_listings.php", "Item Updated!");
        
        } else {
            // Error: return the error message
            unset($_SESSION['itemId']);
            redirectWithPopup("../my_listings.php", "Update Failed");
        }
    }
}

redirectWithPopup("../my_listings.php", "Item Updated!");

?>