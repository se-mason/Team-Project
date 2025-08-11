<?php
require '../php/connection.php';

$term = isset($_GET['term']) ? $conn->real_escape_string($_GET['term']) : '';

$suggestions = [];
if ($term !== '') {
    $sql = "SELECT title FROM iBayItems WHERE title LIKE ? LIMIT 10";
    $stmt = $conn->prepare($sql);
    $likeTerm = "%$term%";
    $stmt->bind_param("s", $likeTerm);
    $stmt->execute();
    $stmt->bind_result($title);
    while ($stmt->fetch()) {
        $suggestions[] = $title;
    }
    $stmt->close();
}
header('Content-Type: application/json');
echo json_encode($suggestions);
?>