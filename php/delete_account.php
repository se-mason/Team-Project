<?php
session_start();
require 'connection.php';

if (isset($_POST['userId'])) {
    $userId = $_POST['userId'];

    // Prepare SQL to delete the listing from iBayItems table
    $sql = "DELETE FROM iBayMembers WHERE userId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);

} else {
    echo "Invalid request.";
}
?>
