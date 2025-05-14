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
    echo json_encode($user); // Return the user data as JSON
} else {
    echo json_encode(['error' => 'User not found']);
}
?>
