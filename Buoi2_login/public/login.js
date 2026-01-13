document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const loginForm = document.getElementById("loginForm");

  // 1. Auto-focus username on load
  usernameInput.focus();

  // Function to check username
  async function checkUsername() {
    const username = usernameInput.value.trim();
    if (!username) return; // Do nothing if empty

    try {
      const response = await fetch("/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();

      if (data.valid) {
        // Correct username
        usernameInput.disabled = true;
        passwordInput.disabled = false;
        loginBtn.disabled = false; // Enable button
        passwordInput.focus();
      } else {
        // Incorrect username
        alert(data.message || "Invalid username");
        // Ensure password remains disabled
        passwordInput.disabled = true;
        loginBtn.disabled = true;
        usernameInput.focus(); // Keep focus
      }
    } catch (error) {
      console.error("Error checking username:", error);
      alert("Error checking username");
    }
  }

  // Event listener for Username
  usernameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submit
      checkUsername();
    }
  });

  // Also check on blur? The user said "without clicking mouse... if incorrect don't let switch".
  // If they TAB out, blur happens.
  usernameInput.addEventListener("blur", () => {
    // Only check if it's not already disabled (means we haven't passed yet)
    if (!usernameInput.disabled && usernameInput.value.trim() !== "") {
      checkUsername();
    }
  });

  // Handle Login Submit
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const usernameStr = usernameInput.value;
    const passwordStr = passwordInput.value;

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: usernameStr, password: passwordStr }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Login Successful");
        window.location.href = "/welcome.html";
      } else {
        alert(data.message || "Login Failed");
        // If login failed (wrong password), maybe we should clear password?
        // User didn't specify, but standard UX is clear password
        passwordInput.value = "";
        passwordInput.focus();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while logging in.");
    }
  });
});
