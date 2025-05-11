<?php
// Include the database connection script
require 'connection.php';

// Check if a userId is provided (for logged-in users)
$userId = isset($_GET['userId']) ? $_GET['userId'] : null;

// Get category and subcategory filters
$category = isset($_GET['category']) ? $_GET['category'] : null;
$subcategory = isset($_GET['subcategory']) ? $_GET['subcategory'] : null;

// Build the SQL query based on filters
$sql = "SELECT itemId, title, price FROM iBayItems WHERE 1=1";
$params = array();
$types = "";

if ($userId) {
    $sql .= " AND userId != ?";
    $params[] = $userId;
    $types .= "s";
}

if ($category) {
    $sql .= " AND category = ?";
    $params[] = $category;
    $types .= "s";
}

if ($subcategory) {
    $sql .= " AND subcategory = ?";
    $params[] = $subcategory;
    $types .= "s";
}

// Prepare and execute the query
$stmt = $conn->prepare($sql);
if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
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
