<?php
require 'connection.php';
require_once 'popup.php';

session_start();

$userId = trim($_POST['userId']);
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT password FROM iBayMembers WHERE userId = ?");
$stmt->bind_param("s", $userId);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    redirectWithPopup("../login_page.html", "Username does not exist");
}

$stmt->bind_result($stored_hashed_password);
$stmt->fetch();

if (password_verify($password, $stored_hashed_password)) {
    $_SESSION['userId'] = $userId;
    redirectWithPopup("../main.php", "Log in successful!");
} else {
    redirectWithPopup("../login_page.html", "Incorrect password");
}

$stmt->close();
?>
