(function () {
  const toggle = document.getElementById("theme-toggle");
  const icon = toggle.querySelector("i");
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  toggle.addEventListener("click", function () {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });

  function applyTheme(theme) {
    if (theme === "dark") { root.setAttribute("data-theme", "dark"); icon.className = "fa-solid fa-sun"; }
    else { root.removeAttribute("data-theme"); icon.className = "fa-solid fa-moon"; }
  }
})();
document.getElementById("year").textContent = new Date().getFullYear();
