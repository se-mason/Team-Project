<?php
// Include the database connection script
require 'connection.php';

// Check if a userId is provided (for logged-in users)
$userId = isset($_GET['userId']) ? $_GET['userId'] : null;

if ($userId) {
    // If logged in: retrieve all items not created by this user
    $stmt = $conn->prepare("SELECT itemId, title, price FROM iBayItems WHERE userId != ?");
    $stmt->bind_param("s", $userId); 
} else {
    // If not logged in: retrieve all items
    $stmt = $conn->prepare("SELECT itemId, title, price FROM iBayItems");
}
$stmt->execute();

// Get the result set from the executed query
$result = $stmt->get_result();

// Initialize an empty array to hold the listings
$listings = [];

// Fetch each row as an associative array and add it to the listings array
while($row = $result->fetch_assoc()) {
    $listings[] = $row;
}

// Set the response header to JSON and return the listings
header('Content-Type: application/json');
echo json_encode($listings);

// Clean up: close statement and database connection
$stmt->close();
$conn->close();
?>
