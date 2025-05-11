<?php
header("Content-Type: text/html; charset=UTF-8");
$conn = new mysqli("localhost", "username", "password", "database");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if ($result->num_rows == 0) {
    echo "<div class='result-item'>No results found</div>";
}

$query = "%" . $_GET['q'] . "%"; // Wildcard for LIKE query

$stmt = $conn->prepare("SELECT item_name FROM items WHERE item_name LIKE ? LIMIT 5");
$query = "%" . $_GET['q'] . "%";
$stmt->bind_param("s", $query);
$stmt->execute();

$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    echo "<div class='result-item'>" . htmlspecialchars($row['item_name']) . "</div>";
}

$stmt->close();
$conn->close();
?>