  const fileInput = document.getElementById('fileInput');
  const addMoreBtn = document.getElementById('addMoreBtn');
  const previewList = document.getElementById('previewList');
  const form = document.getElementById('listingForm');

  let selectedFiles = [];

  addMoreBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    const newFiles = Array.from(e.target.files);

    // Merge and enforce limit of 10
    const combined = selectedFiles.concat(newFiles).slice(0, 10);
    selectedFiles = combined;

    // Update preview
    updatePreview();

    // Clear file input so same file can be re-added if needed
    fileInput.value = '';
  });

  function updatePreview() {
    previewList.innerHTML = '';
    selectedFiles.forEach((file, index) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.maxHeight = '60px';
        img.style.margin = '5px';
        li.appendChild(img);
        previewList.appendChild(li);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    selectedFiles.forEach(file => {
      formData.append('images[]', file);
    });

    fetch(form.action, {
      method: 'POST',
      body: formData
    }).then(response => response.text())
      .then(result => {
        console.log(result);
        window.location.href = '../profile.php'; // or show popup
      })
      .catch(error => {
        alert('Error submitting form: ' + error.message);
      });
  });
