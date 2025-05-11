<?php
require_once("connection.php");

if (!isset($_GET['id'])) {
    echo json_encode(["error" => "No item ID provided."]);
    exit;
}

$itemId = intval($_GET['id']);

// Fetch item details
$itemSql = "SELECT title, description, price, start, finish FROM iBayItems WHERE itemId = ?";
$itemStmt = $conn->prepare($itemSql);
$itemStmt->bind_param("i", $itemId);
$itemStmt->execute();
$itemResult = $itemStmt->get_result();

if ($itemResult->num_rows === 0) {
    echo json_encode(["error" => "Item not found."]);
    exit;
}

$item = $itemResult->fetch_assoc();

// Fetch images for this item
$imageSql = "SELECT image, mimeType FROM iBayImages WHERE itemId = ?";
$imageStmt = $conn->prepare($imageSql);
$imageStmt->bind_param("i", $itemId);
$imageStmt->execute();
$imageResult = $imageStmt->get_result();

$images = [];
while ($row = $imageResult->fetch_assoc()) {
    $base64 = base64_encode($row['image']);
    $images[] = "data:" . $row['mimeType'] . ";base64," . $base64;
}

// Build response
$response = [
    "title" => $item['title'],
    "description" => $item['description'],
    "price" => $item['price'],
    "startDate" => $item['start'],
    "endDate" => $item['finish'],
    "images" => $images
];

echo json_encode($response);
?>
