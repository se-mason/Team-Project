<?php
session_start();
require_once 'connection.php';  // Include the database connection file

// Check if the necessary parameters are passed
if (isset($_GET['itemId']) && isset($_GET['imageId'])) {
    $itemId = $_GET['itemId'];  // Item ID to which the image belongs
    $imageId = $_GET['imageId'];  // The ID of the image to delete

    // Prepare SQL to delete the image based on image ID and item ID
    $sql = "DELETE FROM iBayImages WHERE itemId = ? AND imageId = ?";

    // Prepare statement
    if ($stmt = $conn->prepare($sql)) {
        // Bind parameters
        $stmt->bind_param("ii", $itemId, $imageId);

        // Execute the statement
        if ($stmt->execute()) {
            // Return a success response
            echo json_encode(['success' => true, 'message' => 'Image deleted successfully.']);
        } else {
            // Return an error response
            echo json_encode(['success' => false, 'message' => 'Error deleting image.']);
        }
        $stmt->close();
    } else {
        // Return error if SQL preparation fails
        echo json_encode(['success' => false, 'message' => 'Database error.']);
    }
} else {
    // Return an error if parameters are missing
    echo json_encode(['success' => false, 'message' => 'Missing itemId or imageId.']);
}

$conn->close();
?>
