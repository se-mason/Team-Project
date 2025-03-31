<?php

// Create connection
$conn = new mysqli("localhost", "295group4", "izVVTs3MgPMHXbCNqdan", "295group4");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
