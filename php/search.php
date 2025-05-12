
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

    // If results are found, redirect to products.html with the search query
    if ($result->num_rows > 0) {
        $stmt->close();
        $conn->close();
        header("Location: ../products.html?search=" . urlencode($_GET['q']));
        exit();
    } else {
        // No results found, redirect to products.html with a "no results" flag
        $stmt->close();
        $conn->close();
        header("Location: ../products.html?search=" . urlencode($_GET['q']) . "&noresults=true");
        exit();
    }
} else {
    // Redirect to products.html if no query is provided
    $conn->close();
    header("Location: ../products.html");
    exit();
}
?>