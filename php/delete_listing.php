<?php
session_start();
require 'connection.php';

if (isset($_POST['itemId'])) {
    $itemId = $_POST['itemId'];

    // Prepare SQL to delete the listing from iBayItems table
    $sql = "DELETE FROM iBayItems WHERE itemId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $itemId);

    if ($stmt->execute()) {
        // Optional: Delete related images from iBayImages table
        $sqlDeleteImages = "DELETE FROM iBayImages WHERE itemId = ?";
        $stmtDeleteImages = $conn->prepare($sqlDeleteImages);
        $stmtDeleteImages->bind_param("i", $itemId);
        $stmtDeleteImages->execute();

        // Redirect after deletion
        header("Location: ../my_listings.php");
        exit;
    } else {
        echo "Error deleting listing.";
    }
} else {
    echo "Invalid request.";
}
?>
