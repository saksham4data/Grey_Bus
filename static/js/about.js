// about.js
;(() => {
  const navToggle = document.querySelector(".nav-toggle")
  const nav = document.getElementById("site-nav")
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true"
      navToggle.setAttribute("aria-expanded", String(!expanded))
      nav.style.display = expanded ? "none" : "block"
    })
  }

  const yearEl = document.getElementById("year")
  if (yearEl) yearEl.textContent = String(new Date().getFullYear())
})()
