// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
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
const db = getFirestore(app);

// Select the contact form
const contactForm = document.getElementById('contactForm');

// Handle form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert("Please fill in all the fields.");
        return;
    }

    try {
        // Add a new document in the "contacts" collection
        await addDoc(collection(db, "contacts"), {
            name: name,
            email: email,
            message: message,
            createdAt: new Date() // Store the timestamp
        });

        alert("Your message has been sent successfully!");
        contactForm.reset(); // Reset the form after submission
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("There was an error sending your message. Please try again.");
    }
});