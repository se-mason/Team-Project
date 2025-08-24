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
$hobbies = $_POST['hobbies'];
$password = $_POST['password'];

// Start the update query
$sql = "UPDATE iBayMembers SET name = ?, email = ?, address = ?, postcode = ?, hobbies = ? WHERE userId = ?";

if (!empty($password)) {
    // If the password is provided, hash it before updating
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $sql = "UPDATE iBayMembers SET name = ?, email = ?, address = ?, postcode = ?, hobbies = ?, password = ? WHERE userId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssss", $name, $email, $address, $postcode, $hobbies, $hashedPassword, $userId);
} else {
    // If no password is provided, exclude the password field from the update
    $sql = "UPDATE iBayMembers SET name = ?, email = ?, address = ?, postcode = ?, hobbies = ? WHERE userId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $name, $email, $address, $postcode, $hobbies, $userId);
}

if (!$stmt->execute()) {
    // Check if execution is successful
    echo "Error executing query: " . $stmt->error;
    exit;
}

$stmt->close();

if (isset($_FILES['profilePic']) && $_FILES['profilePic']['error'] === UPLOAD_ERR_OK) {
    $imgData = file_get_contents($_FILES['profilePic']['tmp_name']); // Get image binary data

    // Check if record already exists
    $check = $conn->prepare("SELECT userId FROM iBayProfilePictures WHERE userId = ?");
    $check->bind_param("s", $userId);
    $check->execute();
    $result = $check->get_result();

    if ($result->num_rows > 0) {
        // Update existing profile picture
        $update = $conn->prepare("UPDATE iBayProfilePictures SET image = ? WHERE userId = ?");
        $update->bind_param("bs", $null, $userId);
        $update->send_long_data(0, $imgData);
        $update->execute();
        $update->close();
    } else {
        // Insert new profile picture
        $insert = $conn->prepare("INSERT INTO iBayProfilePictures (userId, image) VALUES (?, ?)");
        $insert->bind_param("sb", $userId, $null);
        $insert->send_long_data(1, $imgData);
        $insert->execute();
        $insert->close();
    }
    $check->close();
}

$conn->close();

header('Location: ../profile.php'); // Redirect after update
exit;
?>
