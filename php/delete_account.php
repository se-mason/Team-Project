<?php
session_start();
require 'connection.php';
require_once 'popup.php';

// Log userId for debugging purposes
error_log("User ID: " . $_SESSION['userId']); // Logs the current userId in the session

if (isset($_SESSION['userId'])) {
    $userId = $_SESSION['userId'];

    // Prepare SQL to delete the listing from iBayMembers table
    $sql = "DELETE FROM iBayMembers WHERE userId = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        // Log error if statement preparation failed
        error_log("Error preparing SQL: " . $conn->error);
        redirectWithPopup("../main.php", "Account Deletion Failed.");
        exit;
    }

    $stmt->bind_param("i", $userId);

    // Execute the statement
    if ($stmt->execute()) {
        // Log successful deletion
        error_log("Account deleted for userId: " . $userId);
        unset($_SESSION['userId']); // Unset the session userId
        
        redirectWithPopup("../main.php", "Account Deleted. Bye Bye");
    } else {
        // Log execution error
        error_log("Error executing query: " . $stmt->error);
        redirectWithPopup("../main.php", "Account Deletion Failed.");
    }

    $stmt->close();
} else {
    redirectWithPopup("../main.php", "Account Deletion Failed.");
}
?>
