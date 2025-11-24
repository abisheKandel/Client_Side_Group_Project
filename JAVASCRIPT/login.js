// Simple client-side validation for login page
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const messageBox = document.getElementById('loginMessage');

  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // stop normal form submit

    // Clear previous state
    emailInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');
    messageBox.textContent = '';
    messageBox.className = ''; // remove previous Bootstrap text-* classes

    let valid = true;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Very simple email check
    if (!email || !email.includes('@')) {
      emailInput.classList.add('is-invalid');
      valid = false;
    }

    // Simple password rule: at least 6 characters
    if (!password || password.length < 6) {
      passwordInput.classList.add('is-invalid');
      valid = false;
    }

    if (!valid) {
      messageBox.textContent = 'Please correct the highlighted fields.';
      messageBox.classList.add('text-danger');
      return;
    }

    // Success – treat as logged in
messageBox.textContent = 'Login successful. Redirecting to your appointment page...';
messageBox.classList.add('text-success');

// mark user as logged in for other pages
localStorage.setItem("isLoggedIn", "true");

// Redirect to appointment page after a short delay
setTimeout(function () {
  window.location.href = "appointment.html";  // same folder as login.html
}, 1200);

  });
});
