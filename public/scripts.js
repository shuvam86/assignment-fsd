document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    var firstNameInput = document.querySelector(
      'input[type="text"][placeholder="First Name"]'
    );
    var lastNameInput = document.querySelector(
      'input[type="text"][placeholder="Last Name"]'
    );
    var emailInput = document.querySelector(
      'input[type="email"][placeholder="Email"]'
    );
    var usernameInput = document.querySelector(
      'input[type="text"][placeholder="Username"]'
    );
    var passwordInput = document.querySelector(
      'input[type="password"][placeholder="Password"]'
    );
    var confirmPasswordInput = document.querySelector(
      'input[type="password"][placeholder="Confirm Password"]'
    );

    if (firstNameInput.value.trim() === "") {
      alert("Please enter your First Name");
      event.preventDefault();
      return;
    }

    if (lastNameInput.value.trim() === "") {
      alert("Please enter your Last Name");
      event.preventDefault();
      return;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      alert("Please enter a valid email address");
      event.preventDefault();
      return;
    }

    if (usernameInput.value.trim() === "") {
      alert("Please enter a Username");
      event.preventDefault();
      return;
    }

    if (passwordInput.value.trim().length < 8) {
      alert("Password must be at least 8 characters long");
      event.preventDefault();
      return;
    }

    if (confirmPasswordInput.value.trim() === "") {
      alert("Please confirm your Password");
      event.preventDefault();
      return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
      alert("Passwords do not match");
      event.preventDefault();
      return;
    }
  });

  fetch('/kk', {
    method: 'POST',
    headers: {
        Authorization: 'Bearer abcdxyz',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        usernameInput:'ll',
        password:'ll',
    }),
})
    .then((res) => {
        return res.json();
    })
    .then((data) => console.log(data));
});


// document.addEventListener("DOMContentLoaded", function () {
//     var form = document.querySelector("#registration-form");
  
//     form.addEventListener("submit", async function (event) {
//       event.preventDefault();
  
//       var formData = new FormData(form);
  
//       try {
//         // Send form data to the server using fetch
//         const response = await fetch('/kk', {
//           method: 'POST',
//           body: formData
//         });
  
//         // Check if the request was successful
//         if (response.ok) {
//           alert("User created successfully!");
//           // Redirect or do something else on success
//         } else {
//           // Handle errors
//           const errorMessage = await response.text();
//           throw new Error(errorMessage);
//         }
//       } catch (error) {
//         // Handle any errors
//         console.error('Error:', error);
//         alert("An error occurred. Please try again later.");
//       }
//     });
//   });
