function getPopupMessage() {
    const params = new URLSearchParams(window.location.search);
    return params.get('popup');
}

document.addEventListener("DOMContentLoaded", () => {
    const message = getPopupMessage();
    if (message) {
        const popup = document.getElementById("popup");
        if (popup) {
            popup.textContent = decodeURIComponent(message);
            popup.style.display = "block";
            popup.classList.add("show");

            setTimeout(() => {
                popup.classList.remove("show");
                popup.style.display = "none";
                window.history.replaceState({}, document.title, window.location.pathname);
            }, 3000);
        }
    }
});
