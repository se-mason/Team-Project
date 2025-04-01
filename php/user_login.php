<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'connection.php';

// Read Form Data
$userId = trim($_POST['userId']);
$password = $_POST['password'];

// Check if userId already exists
$stmt = $conn->prepare("SELECT password FROM iBayMembers WHERE userId = ?");
$stmt->bind_param("s", $userId);
$stmt->execute();
$stmt->store_result();

// Error message for non existant userId
if ($stmt->num_rows == 0) {
    die("That username does not exist.");
}

// Bind the result to a variable
$stmt->bind_result($stored_hashed_password);
$stmt->fetch();

// Verify password
if (password_verify($password, $stored_hashed_password))  {
    die("Login Succesful");
} else {
    die("Password Incorrect");
}


$stmt->close();