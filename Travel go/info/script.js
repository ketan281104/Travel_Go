document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 1. read ?dest= query param ---------- */
  const dest = new URLSearchParams(location.search).get("dest") || unknown;


  /* ---------- 2. small data map (extend as you add states) ---------- */
  const DATA = {
    Maharashtra: {
      tagline: `Explore the vibrant culture and stunning caves of Maharashtra!`,
      places: [
        {
          img: "ajanta_cave.jpg",
          title: "Ajanta Caves",
          desc: "Ancient rock‑cut Buddhist caves famous for paintings."
        },
        {
          img: "ellora.jpg",
          title: "Ellora Caves",
          desc: "UNESCO site with Hindu, Jain and Buddhist temples."
        },
        {
          img: "Elephanta-Caves.jpg",
          title: "Elephanta Caves",
          desc: "Island caves housing exquisite sculptures of Lord Shiva."
        }
      ]
    },

    Rajasthan: {
      tagline: `Step into royal forts and golden deserts of Rajasthan!`,
      places: [
        {
          img: "amber_fort.jpg",
          title: "Amber Fort",
          desc: "Majestic fort overlooking Jaipur."
        },
        {
          img: "hawa_mahal.jpg",
          title: "Hawa Mahal",
          desc: "Iconic ‘Palace of Winds’ famed for its lattice windows."
        },
        {
          img: "jaisalmer_fort.jpg",
          title: "Jaisalmer Fort",
          desc: "Living fort rising from the Thar Desert."
        }
      ]
    }
    /* add more states here */
  };

  const info = DATA[dest] || { tagline: "", places: [] };

  /* ---------- 3. update every .name element ---------- */
  document.querySelectorAll(".name").forEach(el => (el.textContent = dest));

  /* ---------- 4. title & tagline ---------- */
  document.title = `${dest} Tourism`;
  const taglineEl = document.querySelector(".tagline");
  if (taglineEl) taglineEl.textContent = info.tagline;

  /* ---------- 5. render places grid ---------- */
  const placesSection = document.getElementById("places");
  if (placesSection) {
    placesSection.innerHTML = "";                     // clear template
    info.places.forEach(p => {
      placesSection.insertAdjacentHTML(
        "beforeend",
        `<div class="place">
           <img src="${dest}/${p.img}" alt="${p.title}">
           <h2>${p.title}</h2>
           <p>${p.desc}</p>
         </div>`
      );
    });
  }
});