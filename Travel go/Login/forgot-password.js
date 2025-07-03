
document.getElementById("forgotPasswordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message");
    
    if (!email) {
        message.textContent = "Please enter your email.";
        return;
    }
    
    message.style.color = "green";
    message.textContent = "A reset link has been sent to your email.";
    document.getElementById("forgotPasswordForm").reset();
});
