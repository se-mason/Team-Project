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
$sql = "UPDATE users SET name = ?, email = ?, address = ?, postcode = ?";

if (!empty($password)) {
    // If the password is provided, hash it before updating
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $sql .= ", password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $name, $email, $address, $postcode, $hashedPassword);
} else {
    // If no password is provided, exclude the password field from the update
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $name, $email, $address, $postcode);
}

$stmt->execute();
$stmt->close();
$conn->close();

header('Location: my_account.php'); // Redirect after update
exit;
