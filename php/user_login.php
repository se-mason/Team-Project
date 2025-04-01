<?php

require 'connection.php';
require_once 'popup.php';

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
    redirectWithPopup("../login_page.html", "Username does not exist");
}

// Bind the result to a variable
$stmt->bind_result($stored_hashed_password);
$stmt->fetch();

// Verify password
if (password_verify($password, $stored_hashed_password))  {
    // Start session for user data
    session_start();
    $_SESSION['userId'] = $userId;
    echo "
  <script>
    sessionStorage.setItem('userId', '" . htmlspecialchars($userId) . "');
    window.location.href = '../standard_index.html';
  </script>
    ";
    exit;

    redirectWithPopup("../standard_index.html", "Log in Succesful!");
} else {
    redirectWithPopup("../login_page.html", "Incorrect password");
}


$stmt->close();