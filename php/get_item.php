<?php
require_once("connection.php");

if (!isset($_GET['id'])) {
    echo json_encode(["error" => "No item ID provided."]);
    exit;
}

$itemId = intval($_GET['id']);

// Prepare item query
$itemSql = "SELECT title, description, price, start AS startDate, finish AS endDate, postage, category FROM iBayItems WHERE itemId = ?";
$itemStmt = $conn->prepare($itemSql);

if (!$itemStmt) {
    echo json_encode(["error" => "Failed to prepare item statement: " . $conn->error]);
    exit;
}

$itemStmt->bind_param("i", $itemId);
$itemStmt->execute();

$itemResult = $itemStmt->get_result();

if (!$itemResult || $itemResult->num_rows === 0) {
    echo json_encode(["error" => "Item not found or failed to retrieve."]);
    exit;
}

$item = $itemResult->fetch_assoc();


$imageSql = "SELECT image, mimeType FROM iBayImages WHERE itemId = ?";
$imageStmt = $conn->prepare($imageSql);

if (!$imageStmt) {
    echo json_encode(["error" => "Failed to prepare image statement: " . $conn->error]);
    exit;
}

$imageStmt->bind_param("i", $itemId);
$imageStmt->execute();
$imageResult = $imageStmt->get_result();

$images = [];
while ($row = $imageResult->fetch_assoc()) {
    $base64 = base64_encode($row['image']);
    $images[] = "data:" . $row['mimeType'] . ";base64," . $base64;
}

$item['images'] = $images;

// Output JSON
header('Content-Type: application/json');
echo json_encode($item);

?>
