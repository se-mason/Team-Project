<?php
require 'connection.php';
session_start();

$page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
$perPage = isset($_GET['per_page']) ? max(1, (int)$_GET['per_page']) : 9;
$offset = ($page - 1) * $perPage;

$filters = [];
$params = [];
$types = "";

if (isset($_SESSION['userId'])) {
    $referer = $_SERVER['HTTP_REFERER'] ?? '';
    $refererPage = basename(parse_url($referer, PHP_URL_PATH));

    if ($refererPage === 'my_listings.php') {
        $filters[] = "i.userId = ?";
    } else {
        $filters[] = "i.userId != ?";
    }

    $params[] = $_SESSION['userId'];
    $types .= "s";
}

if (!empty($_GET['search'])) {
    $filters[] = "(i.title LIKE ? OR i.description LIKE ?)";
    $searchTerm = "%" . $_GET['search'] . "%";
    $params[] = $searchTerm;
    $params[] = $searchTerm;
    $types .= "ss";
}

// Other filters
if (!empty($_GET['category'])) {
    $filters[] = "i.category = ?";
    $params[] = $_GET['category'];
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

if (!empty($_GET['search'])) {
    $filters[] = "(i.title LIKE ? OR i.description LIKE ?)";
    $searchTerm = '%' . $_GET['search'] . '%';
    $params[] = $searchTerm;
    $params[] = $searchTerm;
    $types .= "ss";
}

$whereClause = count($filters) ? "WHERE " . implode(" AND ", $filters) : "";

// Construct the SQL query
$sql = "SELECT * FROM iBayItems i";
if (!empty($filters)) {
    $sql .= " WHERE " . implode(" AND ", $filters);
}
// Default sort: by finish time (soonest ending first)
$orderBy = " ORDER BY i.finish ASC";

// If sort parameter is set, override the ORDER BY
if (!empty($_GET['sort'])) {
    switch ($_GET['sort']) {
        case 'price_asc':
            $orderBy = " ORDER BY i.price ASC";
            break;
        case 'price_desc':
            $orderBy = " ORDER BY i.price DESC";
            break;
    }
}

$sql .= $orderBy;


$sql .= " LIMIT ? OFFSET ?";

// Add pagination params
$params[] = $perPage;
$params[] = $offset;
$types .= "ii";

// Prepare and bind
$stmt = $conn->prepare($sql);
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