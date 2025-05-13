document.addEventListener('DOMContentLoaded', () => {
    // Assuming the `userId` is available globally from the inline script
  
    // Fetch user data from the server
    fetch(`php/user_data.php?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data.success && data.user) {
          const user = data.user;
  
          // Populate form fields with user data, excluding the password
          document.querySelector('input[name="userId"]').value = user.userId;
          document.querySelector('input[name="name"]').value = user.name;
          document.querySelector('input[name="email"]').value = user.email;
          document.querySelector('input[name="address"]').value = user.address;
          document.querySelector('input[name="postcode"]').value = user.postcode;
          
          // Optionally, you can populate other fields as needed
          // Leave password fields empty
          document.querySelector('input[name="password"]').value = ''; 
          document.querySelector('input[name="confirm_password"]').value = '';
        } else {
          console.error('Failed to load user data', data.error);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  });
  