<?php
session_start();
require_once 'connection.php';

header('Content-Type: application/json');

// Ensure the user is logged in
if (!isset($_SESSION['userId'])) {
    echo json_encode(['success' => false, 'error' => 'User not logged in']);
    exit;
}

$userId = $_SESSION['userId']; // Get userId from session

// Query to retrieve user data, excluding the password
$sql = "SELECT userId, name, email, address, postcode FROM users WHERE userId = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $userId);
$stmt->execute();
$result = $stmt->get_result();

// If no user is found, return an error
if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'error' => 'User not found']);
    exit;
}

// Fetch the user data
$user = $result->fetch_assoc();

// Return the user data as JSON
echo json_encode(['success' => true, 'user' => $user]);
exit;
?>
