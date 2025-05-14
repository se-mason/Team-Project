<?php
session_start();
require 'connection.php'; // Include your database connection

if (isset($_POST['itemId'])) {
    $itemId = intval($_POST['itemId']);  // Get itemId from POST

    // Prepare SQL query to delete the listing
    $sql = "DELETE FROM iBayItems WHERE itemId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $itemId);

    if ($stmt->execute()) {
        // Optionally: Delete related images (if applicable)
        $sqlDeleteImages = "DELETE FROM iBayImages WHERE itemId = ?";
        $stmtDeleteImages = $conn->prepare($sqlDeleteImages);
        $stmtDeleteImages->bind_param("i", $itemId);
        $stmtDeleteImages->execute();

        // Respond back with success
        echo "success";
    } else {
        // Respond back with failure
        echo "error";
    }

    $stmt->close();
    $conn->close();
} else {
    echo "error";  // Item ID not provided
}
?>
