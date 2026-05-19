require('dotenv').config();
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId:process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSEGIND_SENDER_ID,
  appId: process.env.APP_ID
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



// Header Section
document.addEventListener("DOMContentLoaded", function () {
    // Toggle Mobile Menu
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("nav-active");
    });

    // Hero Section Animation
    const heroContent = document.querySelector(".hero-content");
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(30px)";

    setTimeout(() => {
        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateY(0)";
        heroContent.style.transition = "all 1s ease-in-out";
    }, 500);
});

//Destinations
document.addEventListener("DOMContentLoaded", function () {
    // Add a slight delay animation for each card
    const destinationCards = document.querySelectorAll(".destination-card");
    
    destinationCards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
            card.style.transition = "all 0.8s ease-in-out";
        }, index * 200);
    });
});

//Exclusive Tour Packages
document.addEventListener("DOMContentLoaded", function () {
    // Add a slight delay animation for each package card
    const packageCards = document.querySelectorAll(".package-card");
    packageCards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
            card.style.transition = "all 0.8s ease-in-out";
        }, index * 200);
    });
});

//About Us
document.addEventListener("DOMContentLoaded", function () {
    // About Us animation
    const aboutContent = document.querySelector(".about-content");
    aboutContent.style.opacity = "0";
    aboutContent.style.transform = "translateX(-30px)";

    setTimeout(() => {
        aboutContent.style.opacity = "1";
        aboutContent.style.transform = "translateX(0)";
        aboutContent.style.transition = "all 0.8s ease-in-out";
    }, 300);

    // Trust Factors Animation
    const trustFactors = document.querySelectorAll(".factor");
    
    trustFactors.forEach((factor, index) => {
        factor.style.opacity = "0";
        factor.style.transform = "translateY(30px)";
        setTimeout(() => {
            factor.style.opacity = "1";
            factor.style.transform = "translateY(0)";
            factor.style.transition = "all 0.8s ease-in-out";
        }, index * 200);
    });
});

//Testimonials & Reviews
document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    const testimonials = document.querySelectorAll(".testimonial");

    function showTestimonial(n) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove("active");
            if (i === n) testimonial.classList.add("active");
        });
    }

    function nextTestimonial() {
        index = (index + 1) % testimonials.length;
        showTestimonial(index);
    }

    function prevTestimonial() {
        index = (index - 1 + testimonials.length) % testimonials.length;
        showTestimonial(index);
    }

    setInterval(nextTestimonial, 3000); // Auto-slide every 3 seconds

    document.getElementById("feedback-form").addEventListener("submit", function (event) {
        event.preventDefault();
        document.getElementById("feedback-status").textContent = "Thank you for your feedback!";
        this.reset();
    });
});

//Contact us
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent actual form submission

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Simple validation
        if (name === "" || email === "" || message === "") {
            formStatus.textContent = "Please fill out all fields.";
            formStatus.style.color = "red";
            return;
        }

        if (!validateEmail(email)) {
            formStatus.textContent = "Please enter a valid email address.";
            formStatus.style.color = "red";
            return;
        }

        // Simulate form submission (can be replaced with actual backend API)
        setTimeout(() => {
            formStatus.textContent = "Thank you! Your message has been sent.";
            formStatus.style.color = "green";
            addDoc(collection(db, "contacts"), {
                name: name,
                email: email,
                message: message,
                timestamp: new Date()
            }).then(() => {
                console.log("Contact form data saved successfully.");
            }).catch((error) => {
                console.error("Error saving contact form data: ", error);
            });
            contactForm.reset();
        }, 1000);
    });

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});



//Login

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".destination-card").forEach(card => {
      card.addEventListener("click", () => {
        const dest = encodeURIComponent(card.id);           // "Maharashtra"
        location.href = `./info/spec_dest.html?dest=${dest}`;
      });
    });
  });

//Booking
document.addEventListener("DOMContentLoaded", () => {
      const params = new URLSearchParams(window.location.search);
      const destination = params.get("destination") || "Selected Place";
      document.getElementById("destinationName").textContent = destination;
      document.getElementById("destination").value = destination;

      document.getElementById("bookingForm").addEventListener("submit", (e) => {
        e.preventDefault();
       const name=document.getElementById("name").value.trim();
       const email=document.getElementById("email").value.trim();
        const phone= document.getElementById("phone").value.trim();
        const date= document.getElementById("date").value.trim();
        const destination = document.getElementById("destination").value.trim();
        const people = document.getElementById("people").value.trim();
        addDoc(collection(db, "bookings"), {
          name: name,
          email: email,
          phone: phone,
          date: date,
          destination: destination,
          people: people,
          timestamp: new Date()
        }).then(() => {
          console.log("Booking data saved successfully.");
        }).catch((error) => {
          console.error("Error saving booking data: ", error);
        });
        alert(`Thank you for booking your trip to ${destination}!\nOur team will contact you shortly.`);
        e.target.reset();
      });
    });


document.addEventListener("DOMContentLoaded", () => {
    const bookButtons = document.querySelectorAll(".book-btn");
    
    bookButtons.forEach(button => {
        button.addEventListener("click", () => {
            const placeName = button.parentElement.querySelector("h2").innerText;
            alert(`Booking confirmed for ${placeName}!`);
        });
    });
});

function goBack() {
    window.history.back();
}
