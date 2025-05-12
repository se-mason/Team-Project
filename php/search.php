<?php
header("Content-Type: text/html; charset=UTF-8");

// Database connection
$conn = new mysqli("localhost", "username", "password", "database");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the search query exists
if (isset($_GET['q']) && !empty(trim($_GET['q']))) {
    $query = "%" . $_GET['q'] . "%"; // Wildcard for LIKE query

    // Prepare and execute the SQL statement
    $stmt = $conn->prepare("SELECT item_name FROM items WHERE item_name LIKE ? LIMIT 5");
    $stmt->bind_param("s", $query);
    $stmt->execute();

    $result = $stmt->get_result();

    // If results are found, display them
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "<div class='result-item'>" . htmlspecialchars($row['item_name']) . "</div>";
        }
    } else {
        // No results found
        echo "<div class='result-item'>No results found</div>";
    }

    $stmt->close();
} else {
    // Redirect to products.html if no query is provided
    redirectWithPopup('../products.html');
    exit();
}

$conn->close();
?>