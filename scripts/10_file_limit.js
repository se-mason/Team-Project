document.getElementById('images').addEventListener('change', function () {
    if (this.files.length > 10) {
      alert('You can only upload up to 10 images.');
      this.value = ''; // Clear the selection
    }
});