
// Run after page loads
document.addEventListener("DOMContentLoaded", () => {
  const form        = document.querySelector(".login-form");
  const emailInput  = document.getElementById("email");
  const pwdInput    = document.getElementById("password");
  const eyeBtn      = document.querySelector(".toggle-password");
  const roleToggle  = document.getElementById("roleToggle");

  // 🔒 Show/hide password
  function togglePassword() {
    const hidden = pwdInput.type === "password";
    pwdInput.type = hidden ? "text" : "password";
    eyeBtn.textContent = hidden ? "🙈" : "👁️";
  }

  eyeBtn.addEventListener("click", togglePassword);
  eyeBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      togglePassword();
    }
  });

  // 🔐 Handle login
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const pwd   = pwdInput.value;
    const role  = roleToggle.checked ? "OWNER" : "USER";

    if (!email || !pwd) {
      alert("Please fill in both fields.");
      return;
    }

    const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOK) {
      alert("Please enter a valid email address.");
      return;
    }

    alert(`Welcome, ${email}! You are logged in as ${role}.`);

    // Store to Firebase
    await addMessage(email, `Logged in as ${role}`);

    // Reset form
    form.reset();
    pwdInput.type = "password";
    eyeBtn.textContent = "👁️";
  });
});
