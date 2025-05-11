<?php
// Include the database connection script
require 'connection.php';

// Check if a userId is provided (for logged-in users)
$userId = isset($_GET['userId']) ? $_GET['userId'] : null;

// Get all filter parameters
$category = isset($_GET['category']) ? $_GET['category'] : null;
$subcategory = isset($_GET['subcategory']) ? $_GET['subcategory'] : null;
$search = isset($_GET['search']) ? $_GET['search'] : null;
$minPrice = isset($_GET['minPrice']) ? floatval($_GET['minPrice']) : null;
$maxPrice = isset($_GET['maxPrice']) ? floatval($_GET['maxPrice']) : null;
$condition = isset($_GET['condition']) ? $_GET['condition'] : null;
$location = isset($_GET['location']) ? $_GET['location'] : null;

// Get pagination parameters
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$per_page = isset($_GET['per_page']) ? (int)$_GET['per_page'] : 6;
$offset = ($page - 1) * $per_page;

// Build the SQL query based on filters
$sql = "SELECT SQL_CALC_FOUND_ROWS i.itemId, i.title, i.price, i.condition, i.location, i.images 
        FROM iBayItems i WHERE 1=1";
$params = array();
$types = "";

if ($userId) {
    $sql .= " AND i.userId != ?";
    $params[] = $userId;
    $types .= "s";
}

if ($category) {
    $sql .= " AND i.category = ?";
    $params[] = $category;
    $types .= "s";
}

if ($subcategory) {
    $sql .= " AND i.subcategory = ?";
    $params[] = $subcategory;
    $types .= "s";
}

if ($search) {
    $sql .= " AND (i.title LIKE ? OR i.description LIKE ?)";
    $searchParam = "%" . $search . "%";
    $params[] = $searchParam;
    $params[] = $searchParam;
    $types .= "ss";
}

if ($minPrice !== null) {
    $sql .= " AND i.price >= ?";
    $params[] = $minPrice;
    $types .= "d";
}

if ($maxPrice !== null) {
    $sql .= " AND i.price <= ?";
    $params[] = $maxPrice;
    $types .= "d";
}

if ($condition) {
    $sql .= " AND i.condition = ?";
    $params[] = $condition;
    $types .= "s";
}

if ($location) {
    $sql .= " AND i.location = ?";
    $params[] = $location;
    $types .= "s";
}

// Add pagination
$sql .= " ORDER BY i.itemId DESC LIMIT ? OFFSET ?";
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
    // Convert images string to array if it exists
    if (isset($row['images'])) {
        $row['images'] = json_decode($row['images'], true) ?: [];
    }
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

// Clean up
$stmt->close();
$conn->close();
?>
