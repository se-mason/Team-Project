<?php
require 'connection.php';
$userId = $_GET['userId']; // Get userId from the query string

$query = "SELECT * FROM iBayMembers WHERE userId = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    $picStmt = $conn->prepare("SELECT 1 FROM iBayProfilePictures WHERE userId = ?");
    $picStmt->bind_param("s", $userId);
    $picStmt->execute();
    $picResult = $picStmt->get_result();

    $user['hasProfilePic'] = $picResult->num_rows > 0 ? true : false;
    $picStmt->close();

    echo json_encode($user); // Return the user data as JSON
} else {
    echo json_encode(['error' => 'User not found']);
}
?>
