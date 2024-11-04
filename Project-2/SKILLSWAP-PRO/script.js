// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyBv6umEHrY1-vLr4pyG-BAcpgrgke7yzFo",
    authDomain: "swapskill-b99cd.firebaseapp.com",
    projectId: "swapskill-b99cd",
    storageBucket: "swapskill-b99cd.appspot.com",
    messagingSenderId: "447289545839",
    appId: "1:447289545839:web:1ac62ba1adf820750a299a",
    measurementId: "G-34B8RCDQ8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore

// Select DOM elements for login/signup functionality
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const socialLogin = document.querySelector('.social-login'); // Social login section
const toggleSignup = document.getElementById('toggleSignup');
const toggleLogin = document.getElementById('toggleLogin');
const logoutButton = document.getElementById('logoutButton');

// Select specific buttons for login and signup
const loginButton = loginForm?.querySelector('button[type="submit"]');
const signupButton = signupForm?.querySelector('button[type="submit"]');

// Get the loading screen element
const loadingScreen = document.getElementById('loadingScreen');

// Show the login form by default if loginForm exists
if (loginForm) {
    loginForm.classList.add('active');
    signupForm?.classList.remove('active');
    socialLogin.style.display = 'block'; // Show social login initially
}

// Switch to Signup form when the "Sign up" link is clicked
toggleSignup?.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    loginForm.classList.remove('active');
    signupForm.classList.remove('hidden');
    signupForm.classList.add('active');
});

// Switch back to Login form when the "Login" link is clicked
toggleLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.add('hidden');
    signupForm.classList.remove('active');
    loginForm.classList.remove('hidden');
    loginForm.classList.add('active');
});

// Function to show the loading screen and redirect with animation
function showLoadingScreenAndRedirect(redirectUrl, action) {
    const progressBar = loadingScreen.querySelector('.loading-bar'); // Select the progress bar element
    if (progressBar) {
        progressBar.style.width = '0'; // Reset width at the start
    }

    // Show loading screen with fade-in effect
    loadingScreen.classList.add('show', 'fade-in');

    // Start the progress bar animation
    setTimeout(() => {
        if (progressBar) {
            progressBar.style.width = '100%'; // Fill the bar
        }
    }, 0); // Ensure this runs after the loading screen is visible

    // Set the loading message based on action
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) {
        loadingMessage.textContent = {
            login: "Logging In...",
            signup: "Signing Up...",
            save: "Saving Changes...",
            logout: "Logging Out..."
        }[action] || "Loading...";
    }

    // Simulate loading time before redirecting (3 seconds for the animation)
    setTimeout(() => {
        // Add fade-out effect before redirecting
        loadingScreen.classList.add('fade-out');
        loadingScreen.classList.remove('fade-in');
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 1000); // Wait for fade-out before redirect
    }, 3000); // 3-second delay before the redirect happens
}

// Firebase Login Process
loginButton?.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission

    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const password = loginForm.querySelector('input[type="password"]').value.trim();

    if (!email || !password) {
        alert("Please fill in both email and password.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Logged in as:", user);
            showLoadingScreenAndRedirect('dashboard.html', 'login');
        })
        .catch((error) => {
            handleAuthError(error);
        });
});

// Firebase Signup Process
signupButton?.addEventListener('click', (e) => {
    e.preventDefault();

    const name = signupForm.querySelector('input[type="text"]').value.trim();
    const email = signupForm.querySelector('input[type="email"]').value.trim();
    const password = signupForm.querySelector('input[type="password"]').value.trim();

    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User registered:", user);
            showLoadingScreenAndRedirect('dashboard.html', 'signup');
        })
        .catch((error) => {
            handleAuthError(error);
        });
});

// Firebase Logout Process
logoutButton?.addEventListener('click', (e) => {
    e.preventDefault();

    signOut(auth)
        .then(() => {
            console.log("User signed out.");
            showLoadingScreenAndRedirect('login.html', 'logout');
        })
        .catch((error) => {
            handleAuthError(error);
        });
});

// Function to handle Firebase authentication errors
function handleAuthError(error) {
    switch (error.code) {
        case 'auth/wrong-password':
            alert("Incorrect password. Please try again.");
            break;
        case 'auth/user-not-found':
            alert("No user found with this email.");
            break;
        case 'auth/email-already-in-use':
            alert("This email is already registered.");
            break;
        case 'auth/invalid-email':
            alert("Invalid email address.");
            break;
        default:
            alert(`Error: ${error.message}`);
    }
}

// Placeholder for social login (future integration)
function handleSocialLogin(platform) {
    alert(`Logging in with ${platform}...`);
    showLoadingScreenAndRedirect('dashboard.html', 'login');
}

// Event listeners for social login buttons
document.getElementById('googleLogin')?.addEventListener('click', () => handleSocialLogin('Google'));
document.getElementById('facebookLogin')?.addEventListener('click', () => handleSocialLogin('Facebook'));
document.getElementById('twitterLogin')?.addEventListener('click', () => handleSocialLogin('Twitter'));

// Hamburger menu toggle for mobile navigation
document.getElementById("hamburger")?.addEventListener("click", function() {
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.toggle("active"); // Toggle the active class
});