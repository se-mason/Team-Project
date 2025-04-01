<?php
require 'connection.php';

if (!isset($_GET['userId'])) {
    http_response_code(400);
    echo json_encode(["error" => "User ID not provided."]);
    exit;
}

$userId = intval($_GET['userId']); // sanitize input

$sql = "SELECT itemId, title, price FROM iBayItems WHERE userId = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$listings = [];
while($row = $result->fetch_assoc()) {
    $listings[] = $row;
}

header('Content-Type: application/json');
echo json_encode($listings);

$stmt->close();
$conn->close();
?>
