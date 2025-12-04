document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("loginEmail");
  const passInput = document.getElementById("loginPassword");
  const msg = document.getElementById("loginMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    emailInput.classList.remove("is-invalid");
    passInput.classList.remove("is-invalid");
    msg.textContent = "";
    msg.className = "small";

    let valid = true;

    if (!emailInput.value.includes("@")) {
      emailInput.classList.add("is-invalid");
      valid = false;
    }

    if (passInput.value.length < 6) {
      passInput.classList.add("is-invalid");
      valid = false;
    }

    if (!valid) {
      msg.textContent = "Please fix the errors above.";
      msg.classList.add("text-danger");
      return;
    }

    // LOGIN SUCCESS
    localStorage.setItem("isLoggedIn", "true");

    msg.textContent = "Sign-in successful! Redirecting...";
    msg.classList.add("text-success");

    setTimeout(() => {
      window.location.href = "appointment.html";
    }, 800);
  });

});
