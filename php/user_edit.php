<?php
session_start();
require_once 'connection.php';

if (!isset($_SESSION['userId'])) {
    header('Location: login.php');
    exit;
}

$userId = $_SESSION['userId'];
$name = $_POST['name'];
$email = $_POST['email'];
$address = $_POST['address'];
$postcode = $_POST['postcode'];
$password = $_POST['password'];

// Start the update query
$sql = "UPDATE iBayMembers SET name = ?, email = ?, address = ?, postcode = ? WHERE userId = ?";

if (!empty($password)) {
    // If the password is provided, hash it before updating
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $sql .= ", password = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        // Check for errors in preparing the statement
        echo "Error preparing statement: " . $conn->error;
        exit;
    }
    $stmt->bind_param("ssssss", $name, $email, $address, $postcode, $userId, $hashedPassword);
} else {
    // If no password is provided, exclude the password field from the update
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        // Check for errors in preparing the statement
        echo "Error preparing statement: " . $conn->error;
        exit;
    }
    $stmt->bind_param("sssss", $name, $email, $address, $postcode, $userId);
}

if (!$stmt->execute()) {
    // Check if execution is successful
    echo "Error executing query: " . $stmt->error;
    exit;
}

$stmt->close();
$conn->close();

header('Location: ../profile.php'); // Redirect after update
exit;
?>
