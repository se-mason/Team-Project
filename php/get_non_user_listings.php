<?php
// Include the database connection script
require 'connection.php';

// Check if a userId is provided (for logged-in users)
$userId = isset($_GET['userId']) ? $_GET['userId'] : null;

// Get category and subcategory filters
$category = isset($_GET['category']) ? $_GET['category'] : null;
$subcategory = isset($_GET['subcategory']) ? $_GET['subcategory'] : null;

// Get pagination parameters
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$per_page = isset($_GET['per_page']) ? (int)$_GET['per_page'] : 6;
$offset = ($page - 1) * $per_page;

// Build the SQL query based on filters
$sql = "SELECT SQL_CALC_FOUND_ROWS itemId, title, price FROM iBayItems WHERE 1=1";
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

// Add pagination
$sql .= " LIMIT ? OFFSET ?";
$params[] = $per_page;
$params[] = $offset;
$types .= "ii";

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

// Get total number of items (without pagination)
$total_result = $conn->query("SELECT FOUND_ROWS()");
$total = $total_result->fetch_row()[0];

// Set the response header to JSON and return the listings with pagination info
header('Content-Type: application/json');
echo json_encode([
    'items' => $listings,
    'total' => $total,
    'page' => $page,
    'per_page' => $per_page,
    'total_pages' => ceil($total / $per_page)
]);

// Clean up: close statement and database connection
$stmt->close();
$conn->close();
?>
