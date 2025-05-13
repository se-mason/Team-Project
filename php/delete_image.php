<?php
// delete_image.php

require 'connection.php';

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the input data
    $data = json_decode(file_get_contents('php://input'), true);
    $imageIds = $data['imageIds'] ?? [];

    if (empty($imageIds)) {
        echo json_encode(['success' => false, 'error' => 'No images to delete']);
        exit;
    }

    // Prepare the DELETE query for images
    $placeholders = implode(',', array_fill(0, count($imageIds), '?'));
    $sql = "DELETE FROM iBayImages WHERE id IN ($placeholders)";
    
    // Prepare the statement
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        // Bind the image IDs
        $stmt->bind_param(str_repeat('i', count($imageIds)), ...$imageIds);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to delete images']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Database error']);
    }
    exit;
}
?>
