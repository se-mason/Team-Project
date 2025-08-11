<?php
require '../php/connection.php';

$term = isset($_GET['term']) ? $conn->real_escape_string($_GET['term']) : '';

$suggestions = [];
if ($term !== '') {
    $sql = "SELECT productName FROM Products WHERE productName LIKE ? LIMIT 10";
    $stmt = $conn->prepare($sql);
    $likeTerm = "%$term%";
    $stmt->bind_param("s", $likeTerm);
    $stmt->execute();
    $stmt->bind_result($productName);
    while ($stmt->fetch()) {
        $suggestions[] = $productName;
    }
    $stmt->close();
}
header('Content-Type: application/json');
echo json_encode($suggestions);
?>