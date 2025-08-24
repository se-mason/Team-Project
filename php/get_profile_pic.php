<?php
require 'connection.php';

$userId = $_GET['userId'];

$stmt = $conn->prepare("SELECT image FROM iBayProfilePictures WHERE userId = ?");
$stmt->bind_param("s", $userId);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($image);
    $stmt->fetch();
    header("Content-Type: image/jpeg"); // adjust if storing PNG
    echo $image;
} else {
    // fallback default image
    header("Content-Type: image/png");
    readfile('../assets/placeholder.jpg');
}

$stmt->close();
$conn->close();
?>
