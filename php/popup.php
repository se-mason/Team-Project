<?php
function redirectWithPopup($targetUrl, $message = "") {
    $encodedMessage = urlencode($message);
    $redirectUrl = $targetUrl . (str_contains($targetUrl, '?') ? '&' : '?') . 'popup=' . $encodedMessage;
    header("Location: $redirectUrl");
    exit();
}
?>
