import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, collection, onSnapshot, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ---------- 1. Firebase config (reuse yours) ---------- */
const firebaseConfig = {
  apiKey: "AIzaSyAU7bpPFgnSEtRfcQ_Aq75_5zGkB-uaHX4",
  authDomain: "travelgo-9439b.firebaseapp.com",
  projectId: "travelgo-9439b",
  storageBucket: "travelgo-9439b.appspot.com",
  messagingSenderId: "72325616660",
  appId: "1:72325616660:web:a3448e709856e622a04301"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

/* ---------- 2. Helpers ---------- */
function el(tag, attrs = {}, ...children) {
  const element = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => element[k] = v);
  children.forEach(c => element.appendChild(
    typeof c === "string" ? document.createTextNode(c) : c
  ));
  return element;
}

function makeDeleteButton(colName, id) {
  const btn = el("button", { className: "danger", textContent: "Delete" });
  btn.addEventListener("click", async () => {
    if (confirm("Delete this record?")) {
      await deleteDoc(doc(db, colName, id));
    }
  });
  return btn;
}

/* ---------- 3. Live Booking table ---------- */
const bookingTbody = document.querySelector("#bookingTable tbody");
const bookingCount = document.getElementById("bookingCount");

onSnapshot(collection(db, "bookings"), snap => {
  bookingTbody.innerHTML = "";                             // clear
  snap.forEach(docSnap => {
    const b = docSnap.data();
    bookingTbody.appendChild(
      el("tr", {},
        el("td", {}, b.destination),
        el("td", {}, b.name),
        el("td", {}, b.email),
        el("td", {}, b.date),
        el("td", {}, b.people),
        el("td", {}, makeDeleteButton("bookings", docSnap.id))
      )
    );
  });
  bookingCount.textContent = `(${snap.size})`;
});

/* ---------- 4. Live Contact table ---------- */
const contactTbody = document.querySelector("#contactTable tbody");
const contactCount = document.getElementById("contactCount");

onSnapshot(collection(db, "contacts"), snap => {
  contactTbody.innerHTML = "";
  snap.forEach(docSnap => {
    const c = docSnap.data();
    contactTbody.appendChild(
      el("tr", {},
        el("td", {}, c.name),
        el("td", {}, c.email),
        el("td", {}, c.message),
        el("td", {}, new Date(c.timestamp || Date.now()).toLocaleString()),
        el("td", {}, makeDeleteButton("contacts", docSnap.id))
      )
    );
  });
  contactCount.textContent = `(${snap.size})`;
});
