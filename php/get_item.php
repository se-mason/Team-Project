<?php
require_once("connection.php");

if (!isset($_GET['id'])) {
    echo json_encode(["error" => "No item ID provided."]);
    exit;
}

$itemId = intval($_GET['id']);

// Fetch item details
$itemSql = "SELECT title, description, price, start, finish, postage FROM iBayItems WHERE itemId = ?";
$itemStmt = $conn->prepare($itemSql);
$itemStmt->bind_param("i", $itemId);
$itemStmt->execute();
$itemResult = $itemStmt->get_result();

if ($itemResult->num_rows === 0) {
    echo json_encode(["error" => "Item not found."]);
    exit;
}

$item = $itemResult->fetch_assoc();

while ($row = $result->fetch_assoc()) {
    $itemId = $row['itemId'];

    // Fetch FIRST image blob for this item
    $imgStmt = $conn->prepare("SELECT image, mimeType FROM iBayImages WHERE itemId = ?");
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

// Build response
$response = [
    "title" => $item['title'],
    "description" => $item['description'],
    "price" => $item['price'],
    "startDate" => $item['start'],
    "endDate" => $item['finish'],
    "postage" => $item['postage'],
    "images" => $images
];

echo json_encode($response);
?>
