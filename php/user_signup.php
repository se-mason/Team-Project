<?php
require 'php/connection.php';

// Read Form Data
$fullname = trim($_POST['fullname']);
$username = trim($_POST['username']);
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


// Check if username already exists
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

// Error message for existing username
if ($stmt->num_rows > 0) {
    die("Username already exists.");
}
$stmt->close();

// Create account with SQL statement
$stmt = $conn->prepare("INSERT INTO users (fullname, username, email, address, postcode, password) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $fullname, $username, $email, $address, $postcode, $hashed_password);

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