document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the userId from sessionStorage
    const userId = sessionStorage.getItem('userId');
    
    if (!userId) {
        console.error('No userId found in sessionStorage');
        alert('User ID not found. Please log in again.');
        return;
    }
    // Fetch user data from the server
    fetch(`php/user_data.php?userId=${userId}`)
      .then(res => {
          // Check if the response is okay (status 200)
          if (!res.ok) {
              throw new Error('Network response was not ok');
          }
          return res.json(); // Parse the response as JSON
      })
      .then(user => {
          if (user.error) {
              alert("Error loading user data: " + user.error);
              return;
          }
  
          // Populate form fields using element IDs (similar to item data)
          document.getElementById("userId").value = user.userId;
          document.getElementById("name").value = user.name;
          document.getElementById("email").value = user.email;
          document.getElementById("address").value = user.address;
          document.getElementById("postcode").value = user.postcode;
          document.getElementById("hobbies").value = user.hobbies;

          // Leave password fields empty
          document.getElementById("password").value = ''; 
          document.getElementById("confirmPassword").value = '';

          const profilePic = document.getElementById("profilePicDisplay");
          profilePic.src = `php/get_profile_pic.php?userId=${user.userId}`;
      })
      .catch(error => {
          console.error("Error fetching user data:", error);
          alert("An error occurred while loading the user data. Please try again later.");
      });
  });
  