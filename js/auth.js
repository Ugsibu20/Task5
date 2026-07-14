/* ==========================================
   ElectroMart - auth.js
   Part 1
========================================== */

// ==========================================
// Variables
// ==========================================

let users = getFromStorage("users") || [];

// ==========================================
// Validation Patterns
// ==========================================

const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ==========================================
// Show Error
// ==========================================

function showAuthError(id, message) {

    const error = document.getElementById(id + "Error");

    if (!error) {

        const input = document.getElementById(id);

        if (input) {
            input.setCustomValidity(message);
            input.reportValidity();
        }

        return;
    }

    error.textContent = message;

}

// ==========================================
// Clear Error
// ==========================================

function clearAuthError(id) {

    const error = document.getElementById(id + "Error");

    const input = document.getElementById(id);

    if (input) input.setCustomValidity("");

    if (!error) return;

    error.textContent = "";

}

// ==========================================
// Check Email Exists
// ==========================================

function emailExists(email) {

    return users.some(user =>

        user.email.toLowerCase() ===
        email.toLowerCase()

    );

}

// ==========================================
// Validate Registration Form
// ==========================================

function validateRegistration() {

    const firstName =
        document.getElementById("firstName");

    const lastName =
        document.getElementById("lastName");

    const email =
        document.getElementById("email");

    const password =
        document.getElementById("password");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const fullName =
        document.getElementById("fullName");

    const mobile =
        document.getElementById("mobile");

    const terms =
        document.getElementById("terms");

    let valid = true;

    if (fullName && !fullName.value.trim()) {

        showAuthError(
            "fullName",
            "Full name is required"
        );

        valid = false;

    } else if (fullName) {

        clearAuthError("fullName");

    }

    if (firstName && !firstName.value.trim()) {

        showAuthError(
            "firstName",
            "First name is required"
        );

        valid = false;

    } else if (firstName) {

        clearAuthError("firstName");

    }

    if (lastName && !lastName.value.trim()) {

        showAuthError(
            "lastName",
            "Last name is required"
        );

        valid = false;

    } else if (lastName) {

        clearAuthError("lastName");

    }

    if (!email || !emailRegex.test(email.value.trim())) {

        showAuthError(
            "email",
            "Enter a valid email"
        );

        valid = false;

    } else {

        clearAuthError("email");

    }

    if (!mobile || /^[6-9]\d{9}$/.test(mobile.value.trim())) {

        if (mobile) clearAuthError("mobile");

    } else {

        showAuthError(
            "mobile",
            "Enter a valid 10-digit mobile number"
        );

        valid = false;

    }

    if (!password || password.value.length < 8) {

        showAuthError(
            "password",
            "Password must be at least 8 characters"
        );

        valid = false;

    } else {

        clearAuthError("password");

    }

    if (!confirmPassword || password.value !== confirmPassword.value) {

        showAuthError(
            "confirmPassword",
            "Passwords do not match"
        );

        valid = false;

    } else {

        clearAuthError("confirmPassword");

    }

    if (email && emailExists(email.value.trim())) {

        showAuthError(
            "email",
            "Email is already registered"
        );

        valid = false;

    }

    if (terms && !terms.checked) {

        showToast("Please accept the terms and conditions");

        valid = false;

    }

    return valid;

}

// ==========================================
// Register User
// ==========================================

function registerUser() {

    if (!validateRegistration()) {

        showToast("Please fix the highlighted errors");

        return;

    }

    const fullName =
        document.getElementById("fullName")?.value.trim();

    const nameParts = fullName ? fullName.split(/\s+/) : [];

    const firstName =
        document.getElementById("firstName")?.value.trim() ||
        nameParts.shift() ||
        "";

    const lastName =
        document.getElementById("lastName")?.value.trim() ||
        nameParts.join(" ");

    const user = {

        id: Date.now(),

        firstName,

        lastName,

        fullName:
            fullName || `${firstName} ${lastName}`.trim(),

        mobile:
            document.getElementById("mobile")?.value.trim() || "",

        email:
            document.getElementById("email").value.trim(),

        password:
            document.getElementById("password").value,

        createdAt:
            new Date().toISOString()

    };

    users.push(user);

    saveToStorage("users", users);

    showToast("Registration successful");

    setTimeout(() => {

        window.location.href = "login.html";

    }, 1000);

}

// ==========================================
// Initialize
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    users = getFromStorage("users") || [];

});

/* ==========================================
   ElectroMart - auth.js
   Part 2
========================================== */

// ==========================================
// Login Validation
// ==========================================

function validateLogin() {

    const email =
        document.getElementById("loginEmail");

    const password =
        document.getElementById("loginPassword");

    let valid = true;

    if (!emailRegex.test(email.value.trim())) {

        showAuthError(
            "loginEmail",
            "Enter a valid email"
        );

        valid = false;

    } else {

        clearAuthError("loginEmail");

    }

    if (password.value.trim().length < 8) {

        showAuthError(
            "loginPassword",
            "Enter your password"
        );

        valid = false;

    } else {

        clearAuthError("loginPassword");

    }

    return valid;

}

// ==========================================
// Authenticate User
// ==========================================

function authenticateUser(email, password) {

    return users.find(user =>

        user.email.toLowerCase() ===
        email.toLowerCase()

        &&

        user.password === password

    );

}

// ==========================================
// Save User Session
// ==========================================

function saveUserSession(user) {

    saveToStorage("currentUser", user);

    saveToStorage("isLoggedIn", true);

}

// ==========================================
// Remember Me
// ==========================================

function saveRememberMe(email) {

    const remember =
        document.getElementById("rememberMe") ||
        document.querySelector('.auth-options input[type="checkbox"]');

    if (!remember) return;

    if (remember.checked) {

        saveToStorage("rememberEmail", email);

    } else {

        localStorage.removeItem("rememberEmail");

    }

}

// ==========================================
// Load Remembered Email
// ==========================================

function loadRememberedEmail() {

    const email =
        getFromStorage("rememberEmail");

    const input =
        document.getElementById("loginEmail");

    if (email && input) {

        input.value = email;

    }

}

function bindAuthForms() {

    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const forgotLink = document.querySelector('.auth-options a[href="#"]');

    if (registerForm) {
        registerForm.addEventListener("submit", event => {
            event.preventDefault();
            registerUser();
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", event => {
            event.preventDefault();
            loginUser();
        });
    }

    if (forgotLink) {
        forgotLink.addEventListener("click", event => {
            event.preventDefault();
            forgotPassword();
        });
    }

    const togglePasswordIcon = document.getElementById("togglePassword");
    const toggleConfirmIcon = document.getElementById("toggleConfirmPassword");

    if (togglePasswordIcon) {
        const inputId = document.getElementById("loginPassword") ? "loginPassword" : "password";
        togglePasswordIcon.addEventListener("click", () => togglePassword(inputId, "togglePassword"));
    }

    if (toggleConfirmIcon) {
        toggleConfirmIcon.addEventListener("click", () => togglePassword("confirmPassword", "toggleConfirmPassword"));
    }

}

// ==========================================
// Login User
// ==========================================

function loginUser() {

    if (!validateLogin()) {

        showToast("Please enter valid login details");

        return;

    }

    const email =
        document.getElementById("loginEmail")
        .value.trim();

    const password =
        document.getElementById("loginPassword")
        .value;

    const user =
        authenticateUser(email, password);

    if (!user) {

        showToast("Invalid email or password");

        return;

    }

    saveUserSession(user);

    saveRememberMe(email);

    showToast(`Welcome ${user.firstName}!`);

    setTimeout(() => {

        window.location.href = "index.html";

    }, 1000);

}

// ==========================================
// Check Login Status
// ==========================================

function isLoggedIn() {

    return getFromStorage("isLoggedIn") === true;

}

// ==========================================
// Get Current User
// ==========================================

function getCurrentUser() {

    return getFromStorage("currentUser");

}

// ==========================================
// Initialize Login
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    users = getFromStorage("users") || [];

    loadRememberedEmail();

});

/* ==========================================
   ElectroMart - auth.js
   Part 3
========================================== */

// ==========================================
// Toggle Password Visibility
// ==========================================

function togglePassword(inputId, iconId) {

    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (!input) return;

    if (input.type === "password") {

        input.type = "text";

        if (icon) icon.classList.replace("fa-eye", "fa-eye-slash");

    } else {

        input.type = "password";

        if (icon) icon.classList.replace("fa-eye-slash", "fa-eye");

    }

}

// ==========================================
// Password Strength
// ==========================================

function checkPasswordStrength(password) {

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;

}

// ==========================================
// Update Password Strength UI
// ==========================================

function updatePasswordStrength() {

    const password =
        document.getElementById("password");

    const indicator =
        document.getElementById("passwordStrength");

    if (!password || !indicator) return;

    const score =
        checkPasswordStrength(password.value);

    let text = "";
    let color = "";

    switch (score) {

        case 0:
        case 1:
            text = "Weak";
            color = "#ef4444";
            break;

        case 2:
        case 3:
            text = "Medium";
            color = "#f59e0b";
            break;

        case 4:
        case 5:
            text = "Strong";
            color = "#22c55e";
            break;

    }

    indicator.textContent = text;
    indicator.style.color = color;

}

// ==========================================
// Logout User
// ==========================================

function logoutUser() {

    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");

    showToast("Logged out successfully");

    setTimeout(() => {

        window.location.href = "login.html";

    }, 1000);

}

// ==========================================
// Update User Information
// ==========================================

function updateUserUI() {

    const user = getCurrentUser();

    if (!user) return;

    const userName =
        document.getElementById("userName");

    const userEmail =
        document.getElementById("userEmail");

    if (userName) {

        userName.textContent =
            `${user.firstName} ${user.lastName}`;

    }

    if (userEmail) {

        userEmail.textContent =
            user.email;

    }

}

// ==========================================
// Authentication Guard
// ==========================================

function requireLogin() {

    if (!isLoggedIn()) {

        window.location.href = "login.html";

        return false;

    }

    return true;

}

// ==========================================
// Password Input Listener
// ==========================================

const passwordInput =
    document.getElementById("password");

if (passwordInput) {

    passwordInput.addEventListener(

        "input",

        updatePasswordStrength

    );

}

// ==========================================
// Initialize
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    updateUserUI();

});

/* ==========================================
   ElectroMart - auth.js
   Part 4
========================================== */

// ==========================================
// Forgot Password (Frontend Simulation)
// ==========================================

function forgotPassword() {

    const email = prompt("Enter your registered email:");

    if (!email) return;

    const user = users.find(u =>
        u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {

        showToast("Email is not registered.");

        return;

    }

    showToast(
        "Password reset link has been sent to your email (Demo)."
    );

}

// ==========================================
// Update Profile
// ==========================================

function updateProfile() {

    const currentUser = getCurrentUser();

    if (!currentUser) {

        showToast("Please login first.");

        return;

    }

    const firstName =
        document.getElementById("profileFirstName")?.value.trim();

    const lastName =
        document.getElementById("profileLastName")?.value.trim();

    const email =
        document.getElementById("profileEmail")?.value.trim();

    if (!firstName || !lastName || !emailRegex.test(email)) {

        showToast("Please enter valid profile details.");

        return;

    }

    users = users.map(user => {

        if (user.id === currentUser.id) {

            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;

            currentUser.firstName = firstName;
            currentUser.lastName = lastName;
            currentUser.email = email;

        }

        return user;

    });

    saveToStorage("users", users);
    saveToStorage("currentUser", currentUser);

    updateUserUI();

    showToast("Profile updated successfully.");

}

// ==========================================
// Change Password
// ==========================================

function changePassword() {

    const currentUser = getCurrentUser();

    if (!currentUser) {

        showToast("Please login first.");

        return;

    }

    const currentPassword =
        document.getElementById("currentPassword")?.value;

    const newPassword =
        document.getElementById("newPassword")?.value;

    const confirmPassword =
        document.getElementById("confirmNewPassword")?.value;

    if (currentPassword !== currentUser.password) {

        showToast("Current password is incorrect.");

        return;

    }

    if (newPassword.length < 8) {

        showToast("New password must be at least 8 characters.");

        return;

    }

    if (newPassword !== confirmPassword) {

        showToast("Passwords do not match.");

        return;

    }

    users = users.map(user => {

        if (user.id === currentUser.id) {

            user.password = newPassword;

            currentUser.password = newPassword;

        }

        return user;

    });

    saveToStorage("users", users);
    saveToStorage("currentUser", currentUser);

    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmNewPassword").value = "";

    showToast("Password changed successfully.");

}

// ==========================================
// Load Profile Data
// ==========================================

function loadProfile() {

    const currentUser = getCurrentUser();

    if (!currentUser) return;

    const fields = {

        profileFirstName: currentUser.firstName,

        profileLastName: currentUser.lastName,

        profileEmail: currentUser.email

    };

    Object.keys(fields).forEach(id => {

        const input = document.getElementById(id);

        if (input) {

            input.value = fields[id];

        }

    });

}

// ==========================================
// Initialize Profile
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadProfile();

});

/* ==========================================
   ElectroMart - auth.js
   Part 5 (Final)
========================================== */

// ==========================================
// Session Timeout
// ==========================================

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

let sessionTimer;

// ==========================================
// Start Session Timer
// ==========================================

function startSessionTimer() {

    clearTimeout(sessionTimer);

    sessionTimer = setTimeout(() => {

        logoutUser();

        showToast("Session expired. Please login again.");

    }, SESSION_TIMEOUT);

}

// ==========================================
// Reset Session Timer
// ==========================================

function resetSessionTimer() {

    startSessionTimer();

}

// ==========================================
// Auto Login
// ==========================================

function autoLogin() {

    const loggedIn = getFromStorage("isLoggedIn");
    const user = getFromStorage("currentUser");

    if (loggedIn && user) {

        updateUserUI();

        startSessionTimer();

    }

}

// ==========================================
// Protected Pages
// ==========================================

function protectPage() {

    const protectedPages = [

        "checkout.html",
        "payment.html",
        "success.html"

    ];

    const page = window.location.pathname
        .split("/")
        .pop();

    if (

        protectedPages.includes(page)

        &&

        !isLoggedIn()

    ) {

        window.location.href = "login.html";

    }

}

// ==========================================
// Update Navigation
// ==========================================

function updateNavigation() {

    const loginBtn =
        document.getElementById("loginBtn");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const profileBtn =
        document.getElementById("profileBtn");

    if (isLoggedIn()) {

        if (loginBtn)
            loginBtn.style.display = "none";

        if (logoutBtn)
            logoutBtn.style.display = "inline-block";

        if (profileBtn)
            profileBtn.style.display = "inline-block";

    } else {

        if (loginBtn)
            loginBtn.style.display = "inline-block";

        if (logoutBtn)
            logoutBtn.style.display = "none";

        if (profileBtn)
            profileBtn.style.display = "none";

    }

}

// ==========================================
// Clear Expired Session
// ==========================================

function clearSession() {

    localStorage.removeItem("currentUser");

    localStorage.removeItem("isLoggedIn");

}

// ==========================================
// Activity Listeners
// ==========================================

[
    "click",
    "mousemove",
    "keydown",
    "scroll"
].forEach(event => {

    document.addEventListener(event, () => {

        if (isLoggedIn()) {

            resetSessionTimer();

        }

    });

});

// ==========================================
// Storage Synchronization
// ==========================================

window.addEventListener("storage", event => {

    if (

        event.key === "currentUser"

        ||

        event.key === "isLoggedIn"

    ) {

        updateNavigation();

    }

});

// ==========================================
// Final Initialization
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    users = getFromStorage("users") || [];

    bindAuthForms();

    autoLogin();

    protectPage();

    updateNavigation();

    console.log("Authentication Module Loaded Successfully");

});
