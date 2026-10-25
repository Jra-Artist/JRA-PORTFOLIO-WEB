/* ==========================================================
   JRA PORTFOLIO — SCRIPT
   You normally don't need to edit this file.
   Add artworks in js/artworks.js instead.
   ========================================================== */

(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);

  /* ---------- Footer year ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Sticky nav + mobile menu ---------- */
  const nav = $("#nav");
  const navToggle = $("#navToggle");
  const navLinks = $("#navLinks");

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Highlight current section in nav ---------- */
  const sectionLinks = [...navLinks.querySelectorAll('a[href^="#"]:not(.btn)')];
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((a) =>
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sectionLinks.forEach((a) => {
    const target = $(a.getAttribute("href"));
    if (target) sectionObserver.observe(target);
  });

  /* ---------- Gallery (built from ARTWORKS in js/artworks.js) ---------- */
  const gallery = $("#gallery");
  const filters = $("#filters");
  const works = typeof ARTWORKS !== "undefined" ? ARTWORKS : [];

  function buildGallery() {
    gallery.innerHTML = "";

    works.forEach((art, i) => {
      const btn = document.createElement("button");
      btn.className = "work reveal";
      btn.type = "button";
      btn.dataset.category = art.category || "";
      btn.setAttribute("aria-label", `View ${art.title}`);

      const img = document.createElement("img");
      img.src = art.src;
      img.alt = art.title || "Artwork";
      img.loading = "lazy";

      // If the image file isn't there yet, show a friendly empty slot.
      img.addEventListener("error", () => {
        btn.className = "work work--empty";
        btn.disabled = true;
        btn.dataset.category = art.category || "";
        btn.innerHTML = `<span>Your artwork goes here<small>${art.src}</small></span>`;
      });

      const info = document.createElement("div");
      info.className = "work__info";
      info.innerHTML = `
        <div class="work__title">${art.title || ""}</div>
        <div class="work__meta">${[art.category, art.year].filter(Boolean).join(" · ")}</div>`;

      btn.append(img, info);
      btn.addEventListener("click", () => openLightbox(art));
      gallery.append(btn);
      revealObserver.observe(btn);
    });
  }

  function buildFilters() {
    const cats = ["All", ...new Set(works.map((w) => w.category).filter(Boolean))];
    filters.innerHTML = "";
    cats.forEach((cat, i) => {
      const b = document.createElement("button");
      b.className = "filter-btn" + (i === 0 ? " is-active" : "");
      b.type = "button";
      b.textContent = cat;
      b.addEventListener("click", () => {
        filters.querySelectorAll(".filter-btn").forEach((x) => x.classList.remove("is-active"));
        b.classList.add("is-active");
        gallery.querySelectorAll(".work").forEach((card) => {
          const show = cat === "All" || card.dataset.category === cat;
          card.classList.toggle("is-hidden", !show);
        });
      });
      filters.append(b);
    });
  }

  /* ---------- Lightbox ---------- */
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  const lightboxCaption = $("#lightboxCaption");

  function openLightbox(art) {
    lightboxImg.src = art.src;
    lightboxImg.alt = art.title || "";
    lightboxCaption.textContent = [art.title, art.category, art.year].filter(Boolean).join(" · ");
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  $("#lightboxClose").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  /* ---------- Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- Init ---------- */
  buildFilters();
  buildGallery();
})();
