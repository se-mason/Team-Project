<?php
require_once("connection.php");

// Check if the search query exists
if (isset($_GET['searchInput']) && !empty(trim($_GET['searchInput']))) {
    $query = "%" . $_GET['searchInput'] . "%"; // Wildcard for LIKE query

    // Prepare and execute the SQL statement
    $stmt = $conn->prepare("SELECT item_name FROM items WHERE item_name LIKE ? LIMIT 5");
    $stmt->bind_param("s", $query);
    $stmt->execute();

    $result = $stmt->get_result();

    // If results are found, redirect to products.html with the search query
    if ($result->num_rows > 0) {
        $stmt->close();
        $conn->close();
        header("Location: ../products.php?search=" . urlencode($_GET['searchInput']));
        exit();
    } else {
        // No results found, redirect to products.html with a "no results" flag
        $stmt->close();
        $conn->close();
        header("Location: ../products.php?search=" . urlencode($_GET['searchInput']) . "&noresults=true");
        exit();
    }
} else {
    // Redirect to products.html with a "no query" flag
    $conn->close();
    header("Location: ../products.php?noquery=true");
    exit();
}
?>