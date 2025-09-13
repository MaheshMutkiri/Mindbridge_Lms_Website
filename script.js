// ===== Helper function to get users from localStorage =====
function getUsers() {
  let users = localStorage.getItem("students");
  return users ? JSON.parse(users) : [];
}

// ===== Helper function to save users =====
function saveUsers(users) {
  localStorage.setItem("students", JSON.stringify(users));
}

// ===== Signup =====
document.getElementById("signupForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("signupName").value;
  let email = document.getElementById("signupEmail").value;
  let password = document.getElementById("signupPassword").value;

  let users = getUsers();

  // Check if user already exists
  let existingUser = users.find(user => user.email === email);
  if (existingUser) {
    document.getElementById("signupMessage").innerText = "User already exists!";
    return;
  }

  // Add new user
  users.push({ name, email, password });
  saveUsers(users);

  document.getElementById("signupMessage").innerText = "Signup successful! You can login now.";
  document.getElementById("signupForm").reset();
});

// ===== Login =====
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  let users = getUsers();

  let validUser = users.find(user => user.email === email && user.password === password);

  if (validUser) {
    // Save current logged-in user
    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("loginMessage").innerText = "Invalid credentials!";
  }
});

// ===== Dashboard =====
if (window.location.pathname.includes("dashboard.html")) {
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    // If not logged in, redirect back to login
    window.location.href = "index.html";
  } else {
    document.getElementById("studentName").innerText = loggedInUser.name;
    document.getElementById("profileName").innerText = loggedInUser.name;
    document.getElementById("profileEmail").innerText = loggedInUser.email;
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
}


function logoutt(){

document.getElementById("logoutBtn");
    window.location.href = "index.html";

}