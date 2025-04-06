document.addEventListener("DOMContentLoaded", function () {
    fetch('../html-assets/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load footer: ' + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            const footerContainer = document.createElement('div');
            footerContainer.innerHTML = html;
            document.body.appendChild(footerContainer);
        })
        .catch(error => {
            console.error(error);
        });
});
