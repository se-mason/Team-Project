<?php
session_start();
require 'connection.php';

header('Content-Type: application/json');

if (!isset($_SESSION['userId'])) {
    echo json_encode(["success" => false, "error" => "User not logged in."]);
    exit;
}

$userId = $_SESSION['userId'];

$itemId     = $_POST['itemId'];
$title      = $_POST['title'];
$description= $_POST['description'];
$price      = $_POST['price'];
$postage    = $_POST['postage'];
$category   = $_POST['category'];
$start      = $_POST['start'];
$end        = $_POST['finish'];

$sql = "UPDATE iBayItems
        SET title=?, description=?, price=?, postage=?, category=?, start=?, finish=?
        WHERE itemId=? AND userId=?";
$stmt = $conn->prepare($sql);

// Make sure start and end dates are correctly formatted as strings
$startDate = date("Y-m-d", strtotime($start));
$endDate = date("Y-m-d", strtotime($end));

$stmt->bind_param("ssdssssii", $title, $description, $price, $postage, $category, $startDate, $endDate, $itemId, $userId);

if ($stmt->execute()) {
    redirectWithPopup("../my_listings.php", "Edit Successful!");
} else {
    redirectWithPopup("../my_listings.php", "Edit Unseccessful");
}
?>
