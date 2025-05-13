<?php
require 'connection.php';
session_start();

$page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
$perPage = isset($_GET['per_page']) ? max(1, (int)$_GET['per_page']) : 9;
$offset = ($page - 1) * $perPage;

$filters = [];
$params = [];
$types = "";

// Filter: User's own listings
if (!empty($_GET['user_only']) && isset($_SESSION['userId'])) {
    $filters[] = "i.userId = ?";
    $params[] = $_SESSION['userId'];
    $types .= "s";
}

// Other filters
if (!empty($_GET['category'])) {
    $filters[] = "i.category = ?";
    $params[] = $_GET['category'];
    $types .= "s";
}

if (!empty($_GET['subcategory'])) {
    $filters[] = "i.subcategory = ?";
    $params[] = $_GET['subcategory'];
    $types .= "s";
}

if (!empty($_GET['minPrice'])) {
    $filters[] = "i.price >= ?";
    $params[] = $_GET['minPrice'];
    $types .= "d";
}

if (!empty($_GET['maxPrice'])) {
    $filters[] = "i.price <= ?";
    $params[] = $_GET['maxPrice'];
    $types .= "d";
}

// Build the ORDER BY clause
$orderBy = "i.itemId DESC"; // Default sorting
if (!empty($_GET['sort'])) {
    switch ($_GET['sort']) {
        case 'price_asc':
            $orderBy = "i.price ASC";
            break;
        case 'price_desc':
            $orderBy = "i.price DESC";
            break;
    }
}

$whereClause = count($filters) ? "WHERE " . implode(" AND ", $filters) : "";

// Main query
$sql = "
    SELECT i.itemId, i.title, i.description, i.price, i.category,
           GROUP_CONCAT(im.imagePath) as images
    FROM iBayItems i
    LEFT JOIN iBayImages im ON i.itemId = im.itemId
    $whereClause
    GROUP BY i.itemId
    ORDER BY $orderBy
    LIMIT ? OFFSET ?
";

$params[] = $perPage;
$params[] = $offset;
$types .= "ii";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["error" => "SQL error: " . $conn->error]);
    exit;
}

$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();

$items = [];
while ($row = $result->fetch_assoc()) {
    // Process images
    $row['images'] = $row['images'] ? explode(',', $row['images']) : [];
    $items[] = $row;
}

// Get total count for pagination
$countSql = "
    SELECT COUNT(DISTINCT i.itemId) as total
    FROM iBayItems i
    $whereClause
";

$countStmt = $conn->prepare($countSql);
if ($countStmt) {
    if (count($params) > 2) { // Remove LIMIT and OFFSET params
        array_pop($params);
        array_pop($params);
        $types = substr($types, 0, -2);
    }
    if (!empty($types)) {
        $countStmt->bind_param($types, ...$params);
    }
    $countStmt->execute();
    $total = $countStmt->get_result()->fetch_assoc()['total'];
} else {
    $total = count($items);
}

echo json_encode([
    "items" => $items,
    "total" => $total,
    "page" => $page,
    "perPage" => $perPage
]);
?>
