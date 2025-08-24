<?php
require 'connection.php';
require_once 'popup.php';
session_start();

// Read Form Data
$userId = trim($_POST['userId']);
$name = trim($_POST['name']);
$email = trim($_POST['email']);
$address = trim($_POST['address']);
$postcode = trim($_POST['postcode']);
$hobbies = trim($_POST['hobbies']);
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
$stmt = $conn->prepare("INSERT INTO iBayMembers (userId, name, email, address, postcode, hobbies, password) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $userId, $name, $email, $address, $postcode, $hobbies, $hashed_password);

// Execute the statement and check for errors
if ($stmt->execute()) {
    if (isset($_FILES['profilePic']) && $_FILES['profilePic']['error'] === UPLOAD_ERR_OK) {
        $imgData = file_get_contents($_FILES['profilePic']['tmp_name']);
        $picStmt = $conn->prepare("INSERT INTO iBayProfilePictures (userId, image) VALUES (?, ?)");
        $picStmt->bind_param("sb", $userId, $null);
        $picStmt->send_long_data(1, $imgData);
        $picStmt->execute();
        $picStmt->close();
    }

    $_SESSION['userId'] = $userId;
    redirectWithPopup("../main.php", "Account created successfully");

} else {
    redirectWithPopup("../user_signup.html", "Error");

}

// Close connections
$stmt->close();
$conn->close();

?>