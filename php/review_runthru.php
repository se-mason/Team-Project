<?php
require_once('connection.php');
$reviews = [];
$result = $conn->query("SELECT reviewer, testimonial FROM iBayReviews ORDER BY reviewId ASC");
while ($row = $result->fetch_assoc()) {
    $reviews[] = $row;
}
$conn->close();
header('Content-Type: application/json');
echo json_encode($reviews);
?>