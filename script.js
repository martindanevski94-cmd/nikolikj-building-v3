/* =========================
   LANGUAGE
========================= */
function setLanguage(lang){
  localStorage.setItem("siteLanguage", lang);
  document.querySelectorAll(".mk").forEach(e => e.classList.toggle("hidden", lang !== "mk"));
  document.querySelectorAll(".en").forEach(e => e.classList.toggle("hidden", lang !== "en"));
}

/* =========================
   MOBILE MENU
========================= */
function toggleMenu(){
  document.getElementById("navMenu").classList.toggle("active");
}

/* =========================
   LIGHTBOX + GALLERY NAV
========================= */
let galleryImages = [];
let currentIndex = 0;

function openLightbox(src){
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  galleryImages = Array.from(document.querySelectorAll(".gallery-grid img"));
  currentIndex = galleryImages.findIndex(i => i.src === src);

  img.src = src;
  lightbox.classList.remove("hidden");
}

function closeLightbox(){
  document.getElementById("lightbox").classList.add("hidden");
}

function nextImage(){
  currentIndex = (currentIndex + 1) % galleryImages.length;
  document.getElementById("lightbox-img").src = galleryImages[currentIndex].src;
}

function prevImage(){
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  document.getElementById("lightbox-img").src = galleryImages[currentIndex].src;
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {

  setLanguage(localStorage.getItem("siteLanguage") || "mk");

  document.querySelectorAll("#navMenu a").forEach(a => {
    a.addEventListener("click", () => {
      document.getElementById("navMenu").classList.remove("active");
    });
  });

  document.querySelectorAll(".gallery-grid img").forEach(img => {
    img.addEventListener("click", () => openLightbox(img.src));
  });

  document.addEventListener("keydown", e => {
    if(document.getElementById("lightbox").classList.contains("hidden")) return;
    if(e.key === "ArrowRight") nextImage();
    if(e.key === "ArrowLeft") prevImage();
    if(e.key === "Escape") closeLightbox();
  });

    /* =========================
     STATS COUNT-UP ON SCROLL
  ========================= */

  const statNumbers = document.querySelectorAll(".stat-number");
  let statsStarted = false;

  function animateStats() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.dataset.target);
      const suffix = stat.dataset.suffix || "";
      let current = 0;

      const increment = Math.max(1, Math.floor(target / 60));

      const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
          clearInterval(timer);
          stat.textContent = target + suffix;
        } else {
          stat.textContent = current + suffix;
        }
      }, 20);
    });
  }

  const statsSection = document.querySelector(".stats-section");

  // 👉 ОВА Е КЛУЧНО (SAFE CHECK)
  if (statsSection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsStarted) {
          statsStarted = true;
          animateStats();
        }
      });
    }, { threshold: 0.4 });

    observer.observe(statsSection);
  }

});

