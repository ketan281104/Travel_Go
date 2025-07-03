import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ Firebase config (corrected storageBucket)
const firebaseConfig = {
  apiKey: "AIzaSyAU7bpPFgnSEtRfcQ_Aq75_5zGkB-uaHX4",
  authDomain: "travelgo-9439b.firebaseapp.com",
  projectId: "travelgo-9439b",
  storageBucket: "travelgo-9439b.appspot.com",  // ✅ fixed
  messagingSenderId: "72325616660",
  appId: "1:72325616660:web:a3448e709856e622a04301"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Optional: add a test message to Firestore
async function adduser(username, email,password) {
  try {
    await addDoc(collection(db, "user"), { username, email,password});
    console.log("user added!");
  } catch (error) {
    console.error("Firestore error:", error);
  }
}
document.getElementById("signupForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const username = document.getElementById("username").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const errorMessage = document.getElementById("errorMessage");
            
            if (!username || !email || !password || !confirmPassword) {
                errorMessage.textContent = "All fields are required.";
                return;
            }
            
            if (password !== confirmPassword) {
                errorMessage.textContent = "Passwords do not match.";
                return;
            }
            
            errorMessage.textContent = "";
            adduser(username, email, password)
            .then(() => {
                alert("Signup successful! You can now log in.");
            })
            
            document.getElementById("signupForm").reset();
        });
   