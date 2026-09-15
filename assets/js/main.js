/* ===== Theme toggle (initial theme is set by the inline script in <head>) ===== */
(function () {
  const toggle = document.getElementById("theme-toggle");
  const icon = toggle.querySelector("i");
  const root = document.documentElement;
  syncIcon();

  toggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    if (next === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    syncIcon();
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  function syncIcon() {
    icon.className = root.getAttribute("data-theme") === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
})();

/* ===== Highlight the nav link for the section currently in view ===== */
(function () {
  const links = Array.from(document.querySelectorAll(".nav-links a"));
  const sections = links.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  const nav = document.querySelector(".topnav");
  let ticking = false;

  function update() {
    ticking = false;
    const offset = nav.offsetHeight + 24;
    const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
    let current = 0;
    sections.forEach(function (sec, i) {
      if (sec && sec.getBoundingClientRect().top <= offset) current = i;
    });
    if (atBottom) current = sections.length - 1;
    links.forEach(function (a, i) { a.classList.toggle("active", i === current); });
  }

  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

document.getElementById("year").textContent = new Date().getFullYear();
