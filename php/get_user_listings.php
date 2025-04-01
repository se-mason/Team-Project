<?php
// Include the database connection script
require 'connection.php';

// Check if the 'userId' query parameter was provided
if (!isset($_GET['userId'])) {
    http_response_code(400); // Bad request
    echo json_encode(["error" => "User ID not provided."]);
    exit;
}

// Sanitize the userId by converting it to an integer
$userId = intval($_GET['userId']);

// Prepare an SQL query to select item listings belonging to the given user
$sql = "SELECT itemId, title, price FROM iBayItems WHERE userId = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId); // Bind the sanitized userId as an integer
$stmt->execute();

// Get the result set from the executed query
$result = $stmt->get_result();

// Initialize an empty array to hold the listings
$listings = [];

// Fetch each row as an associative array and add it to the listings array
while($row = $result->fetch_assoc()) {
    $listings[] = $row;
}

// Set the response header to JSON and return the listings
header('Content-Type: application/json');
echo json_encode($listings);

// Clean up: close statement and database connection
$stmt->close();
$conn->close();
?>
