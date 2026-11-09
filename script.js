/* Shared by every page (loaded in <head>).
   Part 1 runs immediately so the saved theme is applied before the page paints (no flash). */
(function () {
  try {
    var saved = localStorage.getItem("theme");
    var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    document.documentElement.setAttribute("data-theme", saved || (prefersLight ? "light" : "dark"));
  } catch (e) {}
})();

/* Part 2 runs once the page is ready. */
document.addEventListener("DOMContentLoaded", function () {
  var root = document.documentElement;

  // Dark / light toggle (remembered across all pages)
  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // Mobile menu
  var menuBtn = document.getElementById("menu-btn");
  var links = document.getElementById("nav-links");
  if (menuBtn && links) {
    menuBtn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open);
    });
  }

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});