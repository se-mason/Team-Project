<?php
// Include the database connection script
require 'connection.php';

// Check if 'id' parameter is provided in the URL
if (!isset($_GET['id'])) {
    http_response_code(400); // Bad request
    echo json_encode(["error" => "Item ID not provided."]);
    exit;
}

// Sanitize the item ID by converting it to an integer
$itemId = $_GET['id'];

// Prepare an SQL statement to fetch the item details by itemId
$sql = "SELECT * FROM iBayItems WHERE itemId = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $itemId); // Bind the itemId as an integer
$stmt->execute();
$result = $stmt->get_result();

// If no item is found, return an error message
if ($result->num_rows === 0) {
    echo json_encode(["error" => "Item not found."]);
    exit;
}

// Fetch the item data as an associative array
$item = $result->fetch_assoc();

// Set the response header to JSON and return the item data
header('Content-Type: application/json');
echo json_encode($item);

// Clean up by closing the prepared statement and database connection
$stmt->close();
$conn->close();
?>
