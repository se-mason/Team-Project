<?php
// This function redirects to a target URL and appends a `popup` query parameter with a message.
// It automatically handles whether the URL already has existing query parameters.

function redirectWithPopup($targetUrl, $message = "") {
    // URL-encode the message to make it safe for inclusion in a query string
    $encodedMessage = urlencode($message);

    // Check if the target URL already contains a '?' (indicating existing query parameters)
    // If so, append with '&', otherwise start with '?'
    $redirectUrl = $targetUrl . (str_contains($targetUrl, '?') ? '&' : '?') . 'popup=' . $encodedMessage;

    // Perform the redirect
    header("Location: $redirectUrl");

    // Stop further script execution
    exit();
}
?>
