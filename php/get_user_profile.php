<?php
// Include the database connection script
require 'connection.php';

// Start the session
session_start();

// Check if user is logged in
if (!isset($_SESSION['userId'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(["error" => "User not logged in"]);
    exit;
}

// Get user ID from session
$userId = $_SESSION['userId'];

// Prepare SQL query to get user information
$stmt = $conn->prepare("SELECT name, email, address, postcode FROM iBayUsers WHERE userId = ?");
$stmt->bind_param("s", $userId);
$stmt->execute();

// Get the result
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    // Set the response header to JSON
    header('Content-Type: application/json');
    echo json_encode([
        "name" => $row['name'],
        "email" => $row['email'],
        "address" => $row['address'],
        "postcode" => $row['postcode']
    ]);
} else {
    http_response_code(404); // Not found
    echo json_encode(["error" => "User not found"]);
}

// Clean up
$stmt->close();
$conn->close();
?> 