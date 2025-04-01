<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'connection.php';

// Read Form Data
$userId = trim($_POST['userId']);
$name = trim($_POST['name']);
$email = trim($_POST['email']);
$address = trim($_POST['address']);
$postcode = trim($_POST['postcode']);
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];

// Check password match
if ($password !== $confirm_password) {
    die("Passwords do not match.");
}
else {
    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
}


// Check if userId already exists
$stmt = $conn->prepare("SELECT userId FROM iBayMembers WHERE userId = ?");
$stmt->bind_param("s", $userId);
$stmt->execute();
$stmt->store_result();

// Error message for existing userId
if ($stmt->num_rows > 0) {
    die("userId already exists.");
}
$stmt->close();

// Create account with SQL statement
$stmt = $conn->prepare("INSERT INTO iBayMembers (userId, name, email, address, postcode, password) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $userId, $name, $email, $address, $postcode, $hashed_password);

// Execute the statement and check for errors
if ($stmt->execute()) {
    echo "Account created successfully!";
} else {
    echo "Error: " . $stmt->error;
}

// Close connections
$stmt->close();
$conn->close();

?>