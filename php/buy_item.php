<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'connection.php';
require_once 'popup.php';

if (!isset($_SESSION['userId'])) {
    error_log("No user session");
    redirectWithPopup("../login_page.html", "You need to log in to buy something!");
    exit;
}

if (isset($_POST['itemId'])) {
    $itemId = intval($_POST['itemId']);
    error_log("Deleting item ID: $itemId");

    $sql = "DELETE FROM iBayItems WHERE itemId = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        error_log("Prepare error: " . $conn->error);
        echo "error";
        exit;
    }

    $stmt->bind_param("i", $itemId);

    if ($stmt->execute()) {
        error_log("Item deleted");

        $sqlDeleteImages = "DELETE FROM iBayImages WHERE itemId = ?";
        $stmtDeleteImages = $conn->prepare($sqlDeleteImages);
        if ($stmtDeleteImages) {
            $stmtDeleteImages->bind_param("i", $itemId);
            $stmtDeleteImages->execute();
            error_log("Images deleted");
        } else {
            error_log("Image delete prepare failed: " . $conn->error);
        }

        $stmt->close();
        $conn->close();

        redirectWithPopup("../thank_you.php", "Item Bought");
        exit;
    } else {
        error_log("Execute error: " . $stmt->error);
        echo "error";
    }
} else {
    error_log("POST missing itemId");
    echo "error";
}

?>