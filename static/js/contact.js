// contact.js
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

  const form = document.getElementById("contactForm")
  const success = document.getElementById("formSuccess")

  function setError(id, message) {
    const el = document.querySelector(`.error[data-for="${id}"]`)
    if (el) el.textContent = message || ""
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault()
    success.hidden = true

    const name = /** @type {HTMLInputElement} */ (document.getElementById("name"))?.value.trim()
    const email = /** @type {HTMLInputElement} */ (document.getElementById("email"))?.value.trim()
    const subject = /** @type {HTMLInputElement} */ (document.getElementById("subject"))?.value.trim()
    const message = /** @type {HTMLTextAreaElement} */ (document.getElementById("message"))?.value.trim()

    // basic validation
    let ok = true
    setError("name", "")
    setError("email", "")
    setError("subject", "")
    setError("message", "")
    if (!name) {
      setError("name", "Name is required")
      ok = false
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("email", "Valid email required")
      ok = false
    }
    if (!subject) {
      setError("subject", "Subject is required")
      ok = false
    }
    if (!message) {
      setError("message", "Message is required")
      ok = false
    }

    if (!ok) return

    // simulate send
    const messages = JSON.parse(localStorage.getItem("contactMessages") || "[]")
    messages.push({
      id: crypto?.randomUUID?.() || String(Date.now()),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    })
    localStorage.setItem("contactMessages", JSON.stringify(messages))

    form.reset()
    success.hidden = false
  })

  const yearEl = document.getElementById("year")
  if (yearEl) yearEl.textContent = String(new Date().getFullYear())
})()
