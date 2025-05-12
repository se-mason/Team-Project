<?php
session_start();
require 'connection.php';

$userId = $_SESSION['userId'] ?? null;
$page = $_GET['page'] ?? 1;
$perPage = $_GET['per_page'] ?? 6;
$offset = ($page - 1) * $perPage;

$filters = [];
$params = [];
$types = "";

// Optional filters 
if (!empty($_GET['user_only']) && $userId) {
    $filters[] = "userId = ?";
    $params[] = $userId;
    $types .= "s";
} elseif ($userId) {
    $filters[] = "userId != ?";
    $params[] = $userId;
    $types .= "s";
}

if (!empty($_GET['category'])) {
    $filters[] = "category = ?";
    $params[] = $_GET['category'];
    $types .= "s";
}

if (!empty($_GET['search'])) {
    $filters[] = "title LIKE ?";
    $params[] = "%" . $_GET['search'] . "%";
    $types .= "s";
}

$where = $filters ? "WHERE " . implode(" AND ", $filters) : "";

$sql = "SELECT SQL_CALC_FOUND_ROWS * FROM iBayItems $where ORDER BY created_at DESC LIMIT ?, ?";
$params[] = $offset;
$params[] = $perPage;
$types .= "ii";

$stmt = $conn->prepare($sql);
$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();

$items = [];
while ($row = $result->fetch_assoc()) {
    $row['images'] = json_decode($row['images'] ?? '[]');
    $items[] = $row;
}

$totalResult = $conn->query("SELECT FOUND_ROWS() as total");
$total = $totalResult->fetch_assoc()['total'] ?? count($items);

echo json_encode(['items' => $items, 'total' => $total]);
?>
