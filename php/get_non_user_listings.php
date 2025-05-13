<?php
session_start();
require_once 'db_connect.php';

// Get filter parameters
$category = isset($_GET['category']) ? $_GET['category'] : '';
$subcategory = isset($_GET['subcategory']) ? $_GET['subcategory'] : '';
$minPrice = isset($_GET['minPrice']) ? floatval($_GET['minPrice']) : null;
$maxPrice = isset($_GET['maxPrice']) ? floatval($_GET['maxPrice']) : null;
$condition = isset($_GET['condition']) ? explode(',', $_GET['condition']) : [];
$location = isset($_GET['location']) ? $_GET['location'] : '';
$priceSort = isset($_GET['priceSort']) ? $_GET['priceSort'] : '';
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$itemsPerPage = 12;

// Build the base query
$query = "SELECT i.*, u.username 
          FROM iBayItems i 
          JOIN iBayUsers u ON i.sellerId = u.userId 
          WHERE 1=1";

$params = [];
$types = "";

// Add category filter
if (!empty($category)) {
    $query .= " AND i.category = ?";
    $params[] = $category;
    $types .= "s";
}

// Add subcategory filter
if (!empty($subcategory)) {
    $query .= " AND i.subcategory = ?";
    $params[] = $subcategory;
    $types .= "s";
}

// Add price range filters
if ($minPrice !== null) {
    $query .= " AND i.price >= ?";
    $params[] = $minPrice;
    $types .= "d";
}
if ($maxPrice !== null) {
    $query .= " AND i.price <= ?";
    $params[] = $maxPrice;
    $types .= "d";
}

// Add condition filters
if (!empty($condition)) {
    $placeholders = str_repeat('?,', count($condition) - 1) . '?';
    $query .= " AND i.condition IN ($placeholders)";
    $params = array_merge($params, $condition);
    $types .= str_repeat('s', count($condition));
}

// Add location filter
if (!empty($location)) {
    $query .= " AND i.location = ?";
    $params[] = $location;
    $types .= "s";
}

// Add price sorting
if ($priceSort === 'lowToHigh') {
    $query .= " ORDER BY i.price ASC";
} elseif ($priceSort === 'highToLow') {
    $query .= " ORDER BY i.price DESC";
} else {
    $query .= " ORDER BY i.itemId DESC"; // Default sorting by newest
}

// Add pagination
$query .= " LIMIT ? OFFSET ?";
$params[] = $itemsPerPage;
$params[] = ($page - 1) * $itemsPerPage;
$types .= "ii";

// Prepare and execute the query
$stmt = $conn->prepare($query);
if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}
$stmt->execute();
$result = $stmt->get_result();

// Get total count for pagination
$countQuery = str_replace("SELECT i.*, u.username", "SELECT COUNT(*) as total", $query);
$countQuery = preg_replace('/LIMIT \? OFFSET \?$/', '', $countQuery);
$countStmt = $conn->prepare($countQuery);
if (!empty($params)) {
    $countStmt->bind_param($types, ...array_slice($params, 0, -2));
}
$countStmt->execute();
$totalItems = $countStmt->get_result()->fetch_assoc()['total'];
$totalPages = ceil($totalItems / $itemsPerPage);

// Process results
$items = [];
while ($row = $result->fetch_assoc()) {
    // Convert images string to array
    if (isset($row['images'])) {
        $row['images'] = explode(',', $row['images']);
    }
    $items[] = $row;
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode([
    'items' => $items,
    'totalItems' => $totalItems,
    'currentPage' => $page,
    'itemsPerPage' => $itemsPerPage,
    'totalPages' => $totalPages
]);

// Clean up
$stmt->close();
$countStmt->close();
$conn->close();
?> 