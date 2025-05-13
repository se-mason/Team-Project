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

if (!empty($_GET['condition'])) {
    $conditions = explode(',', $_GET['condition']);
    $placeholders = implode(',', array_fill(0, count($conditions), '?'));
    $filters[] = "i.itemCondition IN ($placeholders)";
    foreach ($conditions as $cond) {
        $params[] = $cond;
        $types .= "s";
    }
}

if (!empty($_GET['location'])) {
    $filters[] = "i.location = ?";
    $params[] = $_GET['location'];
    $types .= "s";
}

if (!empty($_GET['search'])) {
    $filters[] = "(i.title LIKE ? OR i.description LIKE ?)";
    $searchTerm = '%' . $_GET['search'] . '%';
    $params[] = $searchTerm;
    $params[] = $searchTerm;
    $types .= "ss";
}

$whereClause = count($filters) ? "WHERE " . implode(" AND ", $filters) : "";

// Main query (without image for now)
$sql = "
    SELECT i.itemId, i.title, i.description, i.price
    FROM iBayItems i
    $whereClause
    ORDER BY i.itemId DESC
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
    $itemId = $row['itemId'];

    // Fetch FIRST image blob for this item
    $imgStmt = $conn->prepare("SELECT image, mimeType FROM iBayImages WHERE itemId = ? LIMIT 1");
    $imgStmt->bind_param("i", $itemId);
    $imgStmt->execute();
    $imgResult = $imgStmt->get_result();

    $images = [];
    if ($img = $imgResult->fetch_assoc()) {
        $base64 = base64_encode($img['image']);
        $images[] = "data:" . $img['mimeType'] . ";base64," . $base64;
    }

    $row['images'] = $images;
    $items[] = $row;
}

// Count for pagination
$countSql = "SELECT COUNT(*) as total FROM iBayItems i $whereClause";
$countStmt = $conn->prepare($countSql);
if ($types !== "ii") {
    $countTypes = substr($types, 0, -2);
    $countParams = array_slice($params, 0, -2);
    $countStmt->bind_param($countTypes, ...$countParams);
}
$countStmt->execute();
$countResult = $countStmt->get_result();
$total = $countResult->fetch_assoc()['total'] ?? count($items);

// Output JSON
echo json_encode([
    "items" => $items,
    "total" => $total
]);
?>
