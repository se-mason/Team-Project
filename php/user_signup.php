<?php
require 'connection.php';
require_once 'popup.php';

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
    redirectWithPopup("../user_signup.html", "Passwords do not match");
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
    redirectWithPopup("../user_signup.html", "Username already exists");
}
$stmt->close();

// Check if email already exists
$stmt = $conn->prepare("SELECT email FROM iBayMembers WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

// Error message for existing userId
if ($stmt->num_rows > 0) {
    redirectWithPopup("../user_signup.html", "Email already asscociated with account");
}
$stmt->close();

// Create account with SQL statement
$stmt = $conn->prepare("INSERT INTO iBayMembers (userId, name, email, address, postcode, password) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $userId, $name, $email, $address, $postcode, $hashed_password);

// Execute the statement and check for errors
if ($stmt->execute()) {
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
    
    redirectWithPopup("../standard_index.html", "Account created successfully");

} else {
    redirectWithPopup("../user_signup.html", "Error");

}

// Close connections
$stmt->close();
$conn->close();

?>